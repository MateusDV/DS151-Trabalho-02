// @ts-check

import React from "react";
import { useEffect, useState } from "react";
import { Button, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import styles from "../../style/styles";

const Usuario = ({ navigate, dbClient, editar }) => {
    const [navesArmazenadas, setNavesArmazenadas] = useState([]);
    const [selecionada, setSelecionada] = useState(0);
    
    useEffect(() => {
        //popula a tela ao abrir ou editar uma nave
        async function preenche() {
            try {
                const res = await dbClient.obterTodasAsNaves();
                setNavesArmazenadas(Array.from(res));
            } catch (err) {
                console.error(err);
                alert("Erro ao acessar o banco de dados.");
            }
        }
        preenche().catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if(selecionada) {
            editar(navesArmazenadas.find(x => x.id === selecionada))
        }
    }, [selecionada])

    if (navesArmazenadas.length === 0) {
        return <Text>Carregando naves armazenadas...</Text>
    }

    return (
        <View style={styles.container}>
            <Button 
                title="Logout"
                onPress={() => navigate('login')}
            />
            <Listagem naves={navesArmazenadas} selecionar={setSelecionada} />
        </View>
    );
}

export default Usuario;

const Listagem = ({ naves, selecionar }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {naves.map(nave => (
                <TouchableOpacity
                    style={styles.listItem}
                    key={nave.id}
                    onPress={() => selecionar(nave.id)}
                >
                    <Text>
                        {nave.model} - {nave.starship_class}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};