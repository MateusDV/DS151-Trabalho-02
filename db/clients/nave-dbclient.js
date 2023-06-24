// @ts-check

import db from "../sqlitedatabase";

export default class Nave {
    constructor() {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS Starships (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, model TEXT, manufacturer TEXT, cost_in_credits TEXT, length TEXT, max_atmosphering_speed TEXT, crew TEXT, passengers TEXT, cargo_capacity TEXT, consumables TEXT, hyperdrive_rating TEXT, MGLT TEXT, starship_class TEXT, created TEXT, edited TEXT, url TEXT);"
            );
        });
    }

    createStarship(starship) {
        return new Promise((resolve, reject) => {
            this.checkStarship(starship.name)
                .then(count => count === 0 || reject(0));

            db.transaction((tx) => {
                tx.executeSql(
                    "INSERT INTO Starships (name, model, manufacturer, cost_in_credits, length, max_atmosphering_speed, crew, passengers, cargo_capacity, consumables, hyperdrive_rating, MGLT, starship_class, created, edited, url) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
                    [
                        starship.name,
                        starship.model,
                        starship.manufacturer,
                        starship.cost_in_credits,
                        starship.length,
                        starship.max_atmosphering_speed,
                        starship.crew,
                        starship.passengers,
                        starship.cargo_capacity,
                        starship.consumables,
                        starship.hyperdrive_rating,
                        starship.MGLT,
                        starship.starship_class,
                        starship.created,
                        starship.edited,
                        starship.url,
                    ],
                    (_, { rowsAffected, insertId }) => {
                        if (rowsAffected > 0) resolve(insertId);
                        else reject("Error inserting starship: " + JSON.stringify(starship));
                    },
                    (_, error) => reject(error)
                );
                
            });
        });
    }

    readAllStarships() {
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

    readStarshipById(id) {
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

    checkStarship(name) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "SELECT * FROM Starships WHERE name=?;",
                    [name],
                    (_, { rows }) => {
                        resolve(rows._array.length);
                    },
                    (_, error) => reject(error)
                );
            });
        });
    }

    updateStarship(id, updatedStarship) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(
                    "UPDATE Starships SET name=?, model=?, manufacturer=?, cost_in_credits=?, length=?, max_atmosphering_speed=?, crew=?, passengers=?, cargo_capacity=?, consumables=?, hyperdrive_rating=?, MGLT=?, starship_class=?, created=?, edited=?, url=? WHERE id=?;",
                    [
                        updatedStarship.name,
                        updatedStarship.model,
                        updatedStarship.manufacturer,
                        updatedStarship.cost_in_credits,
                        updatedStarship.length,
                        updatedStarship.max_atmosphering_speed,
                        updatedStarship.crew,
                        updatedStarship.passengers,
                        updatedStarship.cargo_capacity,
                        updatedStarship.consumables,
                        updatedStarship.hyperdrive_rating,
                        updatedStarship.MGLT,
                        updatedStarship.starship_class,
                        updatedStarship.created,
                        updatedStarship.edited,
                        updatedStarship.url,
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

    deleteStarship(id) {
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
