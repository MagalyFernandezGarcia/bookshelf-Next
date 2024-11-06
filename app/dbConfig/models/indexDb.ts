import { Sequelize } from "sequelize";
import bookBuilder from "./book.model";
import authorBuilder from "./author.model";
import pg from "pg";

console.log("test");

const dbName = process.env.POSTGRES_DB;
const dbUser = process.env.POSTGRES_USER;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbHost = process.env.POSTGRES_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
	host: dbHost,
	dialect: "postgres",
	dialectModule: pg,
});

const db = {
	sequelize: sequelize,
	Book: bookBuilder(sequelize),
	Author: authorBuilder(sequelize),
};

sequelize
	.sync()
	.then(() => console.log("Database & tables created!"))
	.catch((error) => console.error("Error synchronizing database:", error));

sequelize
	.authenticate()
	.then(() => console.log("Connection to database established successfully."))
	.catch((error) => console.error("Unable to connect to the database:", error));

export default db;
