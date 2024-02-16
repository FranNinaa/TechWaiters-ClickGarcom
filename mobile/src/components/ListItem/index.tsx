import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons'


interface ItemProps {
    data: {
        Id: string;
        produto_id: string;
        /* Observacao: string; */
        Nome: string;
        Quantidade: string | number;
    }
    deleteItem: (item_id: string) => void
}

export function ListItem({ data , deleteItem}: ItemProps) {

    function handleDeleteItem() {
        deleteItem(data.Id)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.item}>{data.Quantidade} - {data.Nome}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Feather name="trash-2" color="#FF3F4b" size={25} />
            </TouchableOpacity>
        </View>
    )
}

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