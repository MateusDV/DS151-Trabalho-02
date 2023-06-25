// @ts-check

import db from "../sqlitedatabase";

export default class NaveDBClient {
    constructor() {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Starships (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, model TEXT, manufacturer TEXT, cost_in_credits TEXT, length TEXT, max_atmosphering_speed TEXT, crew TEXT, passengers TEXT, cargo_capacity TEXT, consumables TEXT, hyperdrive_rating TEXT, MGLT TEXT, starship_class TEXT, created TEXT, edited TEXT, url TEXT);"
            );
        });
    }

    inserirNave(nave) {
        return new Promise((resolve, reject) => {
            this.verificarSeNaveExiste(nave.name)
                .then(count => count === 0 || reject(0));

            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO Starships (name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, hyperdrive_rating, MGLT, starship_class, created, edited, url) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
                    [
                        nave.name,
                        nave.model,
                        nave.manufacturer,
                        nave.cost_in_credits,
                        nave.length,
                        nave.max_atmosphering_speed,
                        nave.crew,
                        nave.passengers,
                        nave.cargo_capacity,
                        nave.consumables,
                        nave.hyperdrive_rating,
                        nave.MGLT,
                        nave.starship_class,
                        nave.created,
                        nave.edited,
                        nave.url,
                    ],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting starship: " + JSON.stringify(nave));
                    },
                    (_, error) => reject(error)
                );

            });
        });
    }

    obterTodasAsNaves() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Starships;",
                    [],
                    (_, { rows }) => {
                        resolve(rows._array);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    obterNavePorId(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Starships WHERE id=?;",
                    [id],
                    (_, { rows }) => {
                        resolve(rows._array);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    verificarSeNaveExiste(nome) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Starships WHERE name=?;",
                    [nome],
                    (_, { rows }) => {
                        resolve(rows._array.length);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    atualizarNave(id, naveAtualizada) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE Starships SET name=?, model=?, manufacturer=?, cost_in_credits=?, length=?, max_atmosphering_speed=?, crew=?, passengers=?, cargo_capacity=?, consumables=?, hyperdrive_rating=?, MGLT=?, starship_class=?, created=?, edited=?, url=? WHERE id=?;",
                    [
                        naveAtualizada.name,
                        naveAtualizada.model,
                        naveAtualizada.manufacturer,
                        naveAtualizada.cost_in_credits,
                        naveAtualizada.length,
                        naveAtualizada.max_atmosphering_speed,
                        naveAtualizada.crew,
                        naveAtualizada.passengers,
                        naveAtualizada.cargo_capacity,
                        naveAtualizada.consumables,
                        naveAtualizada.hyperdrive_rating,
                        naveAtualizada.MGLT,
                        naveAtualizada.starship_class,
                        naveAtualizada.created,
                        naveAtualizada.edited,
                        naveAtualizada.url,
                        id,
                    ],
                    (_, { rowsAffected }) => {
                        if (rowsAffected > 0) resolve(id);
                        else reject("Error updating starship with id: " + id);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    removerNave(id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "DELETE FROM Starships WHERE id=?;",
                    [id],
                    (_, { rowsAffected }) => {
                        if (rowsAffected > 0) resolve(id);
                        else reject("Error deleting starship with id: " + id);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }
}
