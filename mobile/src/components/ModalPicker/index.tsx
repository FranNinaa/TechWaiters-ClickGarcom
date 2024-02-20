import React from "react";
// Importação de componentes do React Native para construção da UI e manipulação de dimensões da tela
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from "react-native";

// Importação dos tipos para as propriedades das categorias
import { CategoryProps } from "../../pages/Order";

// Definição das propriedades esperadas pelo ModalPicker
interface ModalPickerProps{
    options: CategoryProps[];
    handleCloseModal: () => void;
    selectedItem: (item: CategoryProps) => void;
}

// Obtém as dimensões da tela para uso no estilo do componente
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')

export function ModalPicker({options, handleCloseModal, selectedItem}: ModalPickerProps){
    
 // Função chamada ao pressionar uma opção, que seleciona o item e fecha o modal
    function onPressItem(item: CategoryProps){
        selectedItem(item);
        handleCloseModal();
    }

// Mapeia cada opção para um componente TouchableOpacity, permitindo a seleção
    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>
                {item?.Nome}
            </Text>
        </TouchableOpacity>
    ))
    
    
// Renderiza o modal e suas opções dentro de um ScrollView
    return(
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {option}
                </ScrollView>
            </View>
        </TouchableOpacity>
    )
}
// Estilos para o modal e suas opções
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content:{
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#8A8A8A',
        borderRadius: 8,
    },
    option:{
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#8A8A8A'
    },
    item:{
        margin: 18,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#101026'
    }
})