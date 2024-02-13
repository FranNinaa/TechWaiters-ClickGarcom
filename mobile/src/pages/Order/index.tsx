import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Feather } from '@expo/vector-icons'

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";

import { api } from '../../services/api';


type RouteDetail = {
    Order: {
        mesa: number | string;
        pedido_id: string;
    }
}

type CategoryProps = {
    Id: string;
    Nome: string;
}

type OrderRouteProps = RouteProp<RouteDetail, "Order">;

export default function Order() {

    const route = useRoute<OrderRouteProps>();
    const navigation = useNavigation();

    const [categoria, setCategoria] = useState<CategoryProps[] | []>([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<CategoryProps>();

    const [quantidade, setQuantidade] = useState('1')

    useEffect(() => {
        async function loadInfo(){
            const response = await api.get('/category')

            setCategoria(response.data);
            setCategoriaSelecionada(response.data[0]);
        }
        loadInfo();
    }, [])

    //erro ao excluir mesa!!!!!
    async function handleCloseOrder() {
        try {
           await api.delete('/pedido',{
            params:{
                pedido_id: route.params?.pedido_id
            }
           })

           navigation.goBack();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Mesa {route.params.mesa}</Text>
                <TouchableOpacity onPress={handleCloseOrder}>
                    <Feather name="trash-2" size={28} color={"#FF3F4b"} />
                </TouchableOpacity>
            </View>

            {categoria.length !== 0 && (
                <TouchableOpacity style={styles.input}>
                    <Text style={{ color: "#fff" }}>{categoriaSelecionada?.Nome}</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.input}>
                <Text style={{ color: "#fff" }}>Sobremesas</Text>
            </TouchableOpacity>

            <View style={styles.qtnContainer}>
                <Text style={styles.qtdText}>Quantidade</Text>
                <TextInput
                    style={[styles.input, { width: '60%', textAlign: 'center' }]}
                    placeholderTextColor="#F0F0F0"
                    keyboardType="numeric"
                    value="1"
                />
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={styles.buttonAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Avançar</Text>
                </TouchableOpacity>


            </View>

        </View>
    )

}

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