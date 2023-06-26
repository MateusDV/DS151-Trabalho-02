// @ts-check

import React from "react";
import { Button, Text, View } from "react-native";

const AdminPrincipal = ({navigate}) => {
    return (
        <View>
            <Button 
                title="Acessar API (Adicionar registros)"
                onPress={() => navigate('admin-api')}
            />
            <Button 
                title="Acessar Banco (Remover Registros)"
                onPress={() => navigate('admin-banco')}
            />
            <Button 
                title="Logout"
                onPress={() => navigate('login')}
            />
        </View>
    );
}

export default AdminPrincipal;