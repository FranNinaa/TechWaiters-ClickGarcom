import React from "react";
// Importa componentes do React Native e a biblioteca de ícones
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'

// Define as propriedades esperadas pelo componente ListItem
interface ItemProps {
    data: {
        Id: string;
        produto_id: string;
        Nome: string;
        Quantidade: string | number;
    }
    deleteItem: (item_id: string) => void
}

// Componente funcional ListItem para renderizar informações do item e um botão de deletar
export function ListItem({ data , deleteItem}: ItemProps) {

    function handleDeleteItem() {
        deleteItem(data.Id)
    }
    return (
         // Estrutura visual do componente, utilizando Flexbox para layout
        <View style={styles.container}>
            <Text style={styles.item}>{data.Quantidade} - {data.Nome}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color="#FF3F4b" size={25} />
            </TouchableOpacity>
        </View>
    )
}
// Estilização do componente utilizando StyleSheet do React Native
const styles = StyleSheet.create({
    container: {
        backgroundColor: "101026",
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: "row",
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        borderRadius: 4,
        borderWidth: 0.3,
        borderColor: "#8a8a8a"
    },
    item: {
        color: "#fff"

    }
})