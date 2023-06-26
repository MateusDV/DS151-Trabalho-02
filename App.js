// @ts-check

import { useState } from 'react';
import { View } from 'react-native';
import Login from './components/forms/login';
import AdminPrincipal from './components/forms/admin-principal';
import AdminApi from './components/forms/admin-api';
import AdminBanco from './components/forms/admin-banco';
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
			{currentView === 'admin' ? <AdminPrincipal navigate={navigate} /> : null}
			{currentView === 'admin-api' ? <AdminApi navigate={navigate} apiClient={apiClient} dbClient={dbClient} /> : null}
			{currentView === 'admin-banco' ? <AdminBanco navigate={navigate} dbClient={dbClient} /> : null}
		</View>
	);
}
