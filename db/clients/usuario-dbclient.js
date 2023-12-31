// @ts-check

import db from "../sqlitedatabase";

db.transaction((tx) => {
	tx.executeSql(
		"CREATE TABLE IF NOT EXISTS Usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, senha TEXT, isAdmin INTEGER);"
	);
});

db.transaction((tx) => {
	tx.executeSql(
		"INSERT INTO Usuarios (email, senha, isAdmin) VALUES ('admin', 'admin', TRUE);"
	);
	tx.executeSql(
		"INSERT INTO Usuarios (email, senha, isAdmin) VALUES ('usuario', 'usuario', FALSE);"
	);
});

export const inserir = (obj) => {
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

export const autenticar = (cred) => {
	return new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"SELECT isAdmin FROM Usuarios WHERE email=? AND senha=?;",
				[cred.email, cred.senha],
				(_, { rows }) => {
					if (rows.length > 0) {
						resolve(rows.item(0));
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