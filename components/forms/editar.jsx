// @ts-check

import React from "react";
import { useEffect, useState } from "react";
import { Button, ScrollView, TouchableOpacity, View, Text, TextInput } from "react-native";
import styles from "../../style/styles";
import fields from "../../assets/display-names.json";

const Editar = ({ navigate, dbClient, idNave }) => {
    const estadoInicialNave = {
        id: "",
        name: "",
        model: "",
        manufacturer: "",
        cost_in_credits: "",
        length: "",
        max_atmosphering_speed: "",
        crew: "",
        passengers: "",
        cargo_capacity: "",
        consumables: "",
        hyperdrive_rating: "",
        MGLT: "",
        starship_class: "",
        created: "",
        edited: ""
    };

    const [nave, setNave] = useState(estadoInicialNave);

    useEffect(() => {
        async function preenche() {
            try {
                const res = await dbClient.obterNavePorId(idNave);
                setNave(res);
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

    const atualizarNave = () => {
        dbClient.atualizarNave(nave.id, nave)
            .then(x => {
                console.log("Linhas alteradas: ", x);
                alert("Nave alterada com sucesso!");
                navigate("usuario");
            })
            .catch(error => {
                console.error(error);
                alert("Erro ao atualizar nave.");
            }
            );
    }

    if (nave === null) {
        return (
            <Text>Carregando nave...</Text>
        )
    }

    const handleInputChange = (name, value) => {
        setNave(prevNave => ({
            ...prevNave,
            [name]: value
        }));
    };

    const renderizarPropriedades = () => {
        return fields.map(field => (
            <View key={field.name}>
                <Text>{field.displayname}</Text>
                <TextInput
                    style={styles.textbox}
                    value={nave[field.name]}
                    onChangeText={text => handleInputChange(field.name, text)}
                />
            </View>
        ));
    };

    return (
        <ScrollView>
            <View style={styles.container}>
            {nave && renderizarPropriedades()}
            <Button
                title="Atualizar Registro"
                onPress={() => atualizarNave()}
            />
            <Button
                title="Voltar"
                onPress={() => navigate('usuario')}
            />
            </View>
        </ScrollView>
    );
}

export default Editar;
