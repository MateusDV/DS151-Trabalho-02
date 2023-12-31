// @ts-check

import { useState } from 'react';
import { Text, Button, View, TextInput } from 'react-native';
import styleSheet from '../../style/styles'
import { autenticar as auth } from '../../db/clients/usuario-dbclient';
import React from 'react';


const Login = ({ navigate }) => {
	const [credenciais, setCredenciais] = useState({
		email: '',
		senha: ''
	});

	const setEmail = (em) => {
		setCredenciais(cred => ({
			...cred,
			email: em
		}));
	};

	const setSenha = (se) => {
		setCredenciais(cred => ({
			...cred,
			senha: se
		}));
	};

	const fazerLogin = () => {
		if (credenciais.email.trim() === '' || credenciais.senha.trim() === '') {
			alert("Por favor preencha seu e-mail e senha!");
		}
		else {
			auth(credenciais)
				.then(x => x.isAdmin > 0 ? navigate('admin') : navigate('usuario'))
				.catch(x => alert(x));
		}
	}

	return (
		<View>
			<Text>
				Por favor faça login para continuar.
			</Text>
			<TextInput
				style={styleSheet.textbox}
				placeholder="Digite seu login"
				onChangeText={(email) => setEmail(email)}
				autoCapitalize="none"
			/>
			<TextInput
				style={styleSheet.textbox}
				placeholder="Digite sua senha"
				onChangeText={(senha) => setSenha(senha)}
				autoCapitalize="none"
				secureTextEntry={true}
			/>
			<Button
				title="Login"
				onPress={fazerLogin}
			/>
		</View>
	);
}

export default Login;