// Importações do React, React Native, ícones, React Navigation, e a API configurada
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from "react-native";
import { Feather } from '@expo/vector-icons'

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackList } from '../../routes/app.routes'

import { api } from '../../services/api';
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from "../../components/ListItem";

// Tipagem para os parâmetros da rota e as propriedades dos itens
type RouteDetail = {
    Order: {
        mesa: number | string;
        pedido_id: string;
    }
}

export type CategoryProps = {
    Id: string;
    Nome: string;
}

type ProductsProps = {
    Id: string;
    Nome: string;
}

type ItemProps = {
    Id: string;
    produto_id: string;
    /*  Observacao: string; */
    Nome: string;
    Quantidade: string | number;
}

type OrderRouteProps = RouteProp<RouteDetail, "Order">;

export default function Order() {
// Hooks do React e React Navigation para gerenciar estados e navegação
    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation<NativeStackNavigationProp<StackList>>();

    // Estados para categoria, produto, modal e itens do pedido
    const [categoria, setCategoria] = useState<CategoryProps[] | []>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoryProps | undefined>();
    const [modalCategoria, setModalCategoria] = useState(false);
    const [produtos, setProdutos] = useState<ProductsProps[] | []>([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState<ProductsProps | undefined>();
    const [modalProduto, setModalProduto] = useState(false);
    const [quantidade, setQuantidade] = useState('1');
    const [items, setItems] = useState<ItemProps[]>([]);

     // Carrega informações das categorias e produtos da API
    useEffect(() => {
        async function loadInfo() {
            const response = await api.get('/category')

            setCategoria(response.data);
            setCategoriaSelecionada(response.data[0]);
        }
        loadInfo();
    }, [])

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/categoria/produto', {
                params: {
                    categoria_id: categoriaSelecionada?.Id
                }
            })

            setProdutos(response.data);
            setProdutoSelecionado(response.data[0]);

        }
        loadProducts();
    }, [categoriaSelecionada])

    async function handleCloseOrder() {
        try {
            await api.delete('/pedido', {
                params: {
                    pedido_id: route.params?.pedido_id
                }
            })

            navigation.goBack();
        } catch (err) {
            console.log(err)
        }
    }

    function handleChangeCategory(item: CategoryProps) {
        setCategoriaSelecionada(item);
    }

    function handleChangeProduct(item: ProductsProps) {
        setProdutoSelecionado(item);
    }
 // Função para adicionar itens ao pedido
    async function handleAdd() {
        const response = await api.post('ordemPedido/add', {
            pedido_id: route.params?.pedido_id,
            produto_id: produtoSelecionado?.Id,
            Quantidade: Number(quantidade)
        })

        let data = {
            Id: response.data.Id,
            produto_id: produtoSelecionado?.Id as string,
            Nome: produtoSelecionado?.Nome as string,
            Quantidade: quantidade
        }

        setItems(oldArray => [...oldArray, data]);
    }
// Função para remover itens do pedido
    async function handleDeleteItem(item_id: string) {
        await api.delete('/ordemPedido/remove', {
            params: {
                item_id: item_id
            }
        })

        let removeItem = items.filter(item => {
            return (item.Id !== item_id)
        })

        setItems(removeItem);
    }
// Navega para a tela de finalizar pedido
    function handleFinishOrder() {
        navigation.navigate("FinishOrder",{
            mesa: route.params?.mesa,
            pedido_id: route.params?.pedido_id,
        });
    }

    // Renderização do componente, incluindo modais para seleção de categoria e produto
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.mesa}</Text>
                {items.length === 0 && (
                    <TouchableOpacity onPress={handleCloseOrder}>
                        <Feather name="trash-2" size={28} color={"#FF3F4b"} />
                    </TouchableOpacity>
                )}
            </View>

            {categoria.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalCategoria(true)}>
                    <Text style={{ color: "#fff" }}>{categoriaSelecionada?.Nome}</Text>
                </TouchableOpacity>
            )}

            {produtos.length !== 0 && (
                <TouchableOpacity style={styles.input} onPress={() => setModalProduto(true)}>
                    <Text style={{ color: "#fff" }}>{produtoSelecionado?.Nome}</Text>
                </TouchableOpacity>
            )}

            <View style={styles.qtnContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                    placeholder="1"
                    onChangeText={setQuantidade}
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
                    disabled={items.length === 0}
                    onPress={handleFinishOrder}
                >
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                style={{ flex: 1, marginTop: 24 }}
                data={items}
                keyExtractor={(item) => item.Id}
                renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}
            />

            <Modal transparent={true} visible={modalCategoria} animationType="fade">
                <ModalPicker
                    handleCloseModal={() => setModalCategoria(false)}
                    options={categoria}
                    selectedItem={handleChangeCategory}
                />
            </Modal>

            <Modal transparent={true} visible={modalProduto} animationType="fade">
                <ModalPicker
                    handleCloseModal={() => setModalProduto(false)}
                    options={produtos}
                    selectedItem={handleChangeProduct}
                />
            </Modal>

        </View>
    )

}
// Estilos aplicados aos componentes da tela
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101026",
        paddingVertical: "5%",
        paddingEnd: "4%",
        paddingStart: "4%",

    },
    header: {
        flexDirection: "row",
        marginBottom: 12,
        alignItems: "center",
        marginTop: 24,

    },
    title: {
        fontSize: 38,
        fontWeight: "bold",
        color: "#fff",
        marginRight: 24,
    },
    input: {
        backgroundColor: "#101026",
        borderRadius: 8,
        borderColor: "#8A8A8A",
        borderWidth: 1,
        width: "100%",
        height: 40,
        marginBottom: 12,
        justifyContent: "center",
        paddingHorizontal: 8,
        color: "#fff",
        fontSize: 20,

    },
    qtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    qtdText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',

    },
    actions: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonAdd: {
        width: '20%',
        backgroundColor: '#3fd1ff',
        borderRadius: 10,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        color: '#101026',
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#3fffa3",
        borderRadius: 10,
        height: 40,
        width: "75%",
        justifyContent: "center",
        alignItems: "center",

    },
})