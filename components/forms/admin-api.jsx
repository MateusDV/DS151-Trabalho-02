// @ts-check

import React from "react";
import { useEffect, useState } from "react";
import { Button, ScrollView, ToastAndroid, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import styles from "../../style/styles";

const AdminApi = ({ navigate, apiClient, dbClient }) => {
    const [naves, setNaves] = useState([]);
    const [navesArmazenadas, setNavesArmazenadas] = useState([]);
    const [selecionadas, setSelecionadas] = useState([]);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [navegacao, setNavegacao] = useState({
        primeira: true,
        ultima: false
    });

    //popula a tela ao abrir ou trocar de pagina
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
        });
    }, [paginaAtual]);

    function armazenarNaves() {
        
    }

    //atualiza o banco de dados ao pressionar um item da lista
    useEffect(() => {
        if (naves.length > 0) {
            
                const selectedNave = naves.find((nave) => nave.url === selecionadas[selecionadas.length - 1]);
                if (selectedNave) {
                    dbClient.inserirNave(selectedNave)
                        .then(() => {
                            console.log("Nave inserida no banco de dados:", selectedNave);
                            alert("Nave inserida no banco de dados com sucesso!");
                        })
                        .catch((error) => {
                            console.error("Erro ao inserir nave no banco de dados:", error);
                            alert("Erro ao inserir nave no banco de dados.");
                        }
                    );
                }
        }
    }, [selecionadas]);

    if (naves.length === 0) {
        return <Text>Carregando naves...</Text>
    }

    return (
        <View style={styles.container}>
            <Listagem naves={naves} selecionar={setSelecionadas} selecionadas={selecionadas} />
            <View style={{ flexDirection: "row", margin: 8, }}>
                <Button
                    title="<"
                    disabled={navegacao.primeira}
                    onPress={() => {
                        setPaginaAtual(paginaAtual - 1);
                        setNaves([]);
                        }
                    }
                />
                <Text
                    style={{margin:10}}
                >
                Página {paginaAtual}</Text>
                <Button
                    title=">"
                    disabled={navegacao.ultima}
                    onPress={() => {
                        setPaginaAtual(paginaAtual + 1);
                        setNaves([]);
                        }
                    }
                />
            </View>
        </View>
    );
}

export default AdminApi;

const Listagem = ({ naves, selecionar, selecionadas }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {naves.map(nave => (
                <TouchableOpacity
                    style={[
                        styles.listItem,
                        selecionadas.includes(nave.url) && styles.pressed
                    ]}
                    key={nave.url}
                    onPress={() => selecionar(prevSelecionadas => [...prevSelecionadas, nave.url])}
                >
                    <Text>
                        {nave.model} - {nave.starship_class}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};