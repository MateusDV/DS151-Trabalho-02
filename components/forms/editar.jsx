// @ts-check

import React from "react";
import { useEffect, useState } from "react";
import { Button, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import styles from "../../style/styles";

const Editar = ({ navigate, dbClient, nave }) => {
    
    
    const atualizarNave = () => {
        dbClient.atualizarNave(nave.id, )
    }
    
    if (nave === null) {
        alert("Erro ao carregar nave.");
        navigate('usuario');
    }

    return (
        <View style={styles.container}>
            <Button 
                title="Voltar"
                onPress={() => navigate('usuario')}
            />
            {/* form com conteudos editaveis da nave */ }
            <Button 
                title="Atualizar Registro"
                onPress={() => atualizarNave()}
            />
        </View>
    );
}

export default Editar;
