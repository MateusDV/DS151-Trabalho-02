// @ts-check

import React from "react";
import { useEffect, useState } from "react";
import { Button, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import styles from "../../style/styles";

const AdminBanco = ({ navigate, dbClient }) => {
    const [navesArmazenadas, setNavesArmazenadas] = useState([]);
    const [selecionada, setSelecionada] = useState(0);
    
    useEffect(() => {
        //atualiza o banco de dados ao pressionar um item da lista
        if (navesArmazenadas.length > 0) {
            const selectedNave = navesArmazenadas.find((nave) => nave.id === selecionada);
            if (selectedNave) {
                dbClient.removerNave(selecionada)
                    .then(() => {
                        console.log("Nave removida do banco de dados", selectedNave);
                        alert("Nave removida do banco de dados com sucesso!");
                    })
                    .catch((error) => {
                        console.error("Erro ao remover nave do banco de dados", error);
                        alert("Erro ao remover nave do banco de dados.");
                    }
                );
            }
        }

        //popula a tela ao abrir ou remover uma nave
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

    }, [selecionada]);

    if (navesArmazenadas.length === 0) {
        return <Text>Carregando naves armazenadas...</Text>
    }

    return (
        <View style={styles.container}>
            <Button 
                title="Voltar"
                onPress={() => navigate('admin')}
            />
            <Listagem naves={navesArmazenadas} selecionar={setSelecionada} />
        </View>
    );
}

export default AdminBanco;

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