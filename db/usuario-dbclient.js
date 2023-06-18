// @ts-check

import db from "./sqlitedatabase";

db.transaction((tx) => {
	tx.executeSql(
		"CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT, isAdmin INTEGER);"
	);
});

db.transaction((tx) => {
	tx.executeSql(
		"INSERT INTO Usuarios (email, senha, isAdmin) VALUES (admin@sistema.com, admin, TRUE);"
	);
	tx.executeSql(
		"INSERT INTO Usuarios (email, senha, isAdmin) VALUES (usuario@sistema.com, usuario, FALSE);"
	);
});

export const create = (obj) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			//comando SQL modificåvel
			tx.executeSql(
				"INSERT INTO Usuarios (email, senha, isAdmin) values (?,?,?);",
				[obj.email, obj.senha, obj.isAdmin],
				(_, { rowsAffected, insertId }) => {
					if (rowsAffected > 0) resolve(insertId);
					else reject("Error inserting obj: " + JSON.stringify(obj));
				},
				(_, error) => reject(error) // erro interno em tx.executeSqI
			);
		});
	});
};

export const authenticate = (cred) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			// SQL query to select all rows from the table
			tx.executeSql(
				"SELECT isAdmin FROM Usuarios WHERE email=? AND senha=?;",
				[cred.email, cred.senha],
				(_, { rows }) => {
					if (rows._array.length > 0) {
						resolve(rows.item);
					}
					else {
						reject("Usuário ou senha incorretos!");
					}
				},
				(_, error) => reject(error) // internal error in tx.executeSql
			);
		});
	});
};