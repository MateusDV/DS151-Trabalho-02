// @ts-check

import React from "react";
import { useEffect, useState } from "react";
import { Button, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import styles from "../../style/styles";
import { CheckBox } from "react-native-web";

const Admin = ({ navigate, apiClient, dbClient }) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [navegacao, setNavegacao] = useState({
        primeira: true,
        ultima: false
    });
    const [naves, setNaves] = useState(null);
    const [selecionadas, setSelecionadas] = useState([]);

    useEffect(() => {
        async function preenche() {
            const resposta = await apiClient.obterNaves(paginaAtual);
            setNaves(resposta.results);
            setNavegacao({
                primeira: resposta.previous === null,
                ultima: resposta.next === null
            });
        }
        preenche().catch(error => {
            console.error;
            alert("Erro ao conectar à api.");
        })
    }, [paginaAtual]);

    if (naves === null) {
        return <Text>Carregando naves...</Text>
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", margin: 8, }}>
                <Button
                    title="<"
                    disabled={navegacao.primeira}
                    onPress={() => setPaginaAtual(paginaAtual - 1)}
                />
                <Text>Página {paginaAtual}</Text>
                <Button
                    title=">"
                    disabled={navegacao.ultima}
                    onPress={() => setPaginaAtual(paginaAtual + 1)}
                />
            </View>

            <Listagem naves={naves} selecionar={setSelecionadas} />
        </View>
    );
}

export default Admin;

const Listagem = ({ naves, selecionar }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {naves.map(nave => (
                <TouchableOpacity
                    style={styles.listItem}
                    key={nave.url}
                    onPress={() => {
                        selecionar(arr => [...arr, nave.key]);
                    }}
                >
                    <Text>
                        {nave.model} - {nave.starship_class}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};