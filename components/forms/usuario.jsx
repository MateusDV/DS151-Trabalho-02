// @ts-check

import React from "react";
import { useEffect, useState } from "react";
import { Button, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import styles from "../../style/styles";

const Usuario = ({ navigate, dbClient, editar }) => {
    const [navesArmazenadas, setNavesArmazenadas] = useState([]);
    
    useEffect(() => {
        //popula a tela ao abrir ou editar uma nave
        async function preenche() {
            try {
                const res = await dbClient.obterTodasAsNaves();
                setNavesArmazenadas(Array.from(res));
            } 
            catch (err) {
                console.error(err);
                alert("Erro ao acessar o banco de dados.");
            }
        }
        preenche().catch(error => {
            console.error(error);
        });
    }, []);

    if (navesArmazenadas.length === 0) {
        return <Text>Carregando naves armazenadas...</Text>
    }

    return (
        <View style={styles.container}>
            <Button 
                title="Logout"
                onPress={() => navigate('login')}
            />
            <ScrollView contentContainerStyle={styles.container}>
            {navesArmazenadas.map(nave => (
                <TouchableOpacity
                    style={styles.listItem}
                    key={nave.id}
                    onPress={() => editar(nave.id)}
                >
                    <Text>
                        {nave.model} - {nave.starship_class}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
        </View>
    );
}

export default Usuario;