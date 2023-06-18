// @ts-check

import { useState } from 'react';
import { View } from 'react-native';
import Login from './components/forms/login';
import styles from './assets/styles';
import React from 'react';

export default function App() {
	const [currentView, setCurrentView] = useState('login');

	const navigate = (view) => {
		setCurrentView(view);
	};

	return (
		<View style={styles.container}>
			{currentView === 'login' ? <Login navigate={navigate} /> : null}
		</View>
	);
}
