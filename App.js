// @ts-check

import { useState } from 'react';
import { View } from 'react-native';
import Login from './components/forms/login';
import Admin from './components/forms/admin';
import styles from './style/styles';
import React from 'react';
import SWApiClient from './api/apiclient';
import NaveDBClient from './db/clients/nave-dbclient';

export default function App() {
	const [currentView, setCurrentView] = useState('admin');

	const apiClient = new SWApiClient();
	const dbClient = new NaveDBClient();

	const navigate = (view) => {
		setCurrentView(view);
	};

	return (
		<View style={styles.container}>
			{currentView === 'login' ? <Login navigate={navigate} /> : null}
			{currentView === 'admin' ? <Admin navigate={navigate} apiClient={apiClient} dbClient={dbClient}/> : null}
		</View>
	);
}
