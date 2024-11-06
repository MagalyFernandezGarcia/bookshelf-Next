import { Sequelize } from "sequelize";
import bookBuilder from "./book.model"
import authorBuilder from "./author.model"

const sequelize = new Sequelize({
	host: process.env.POSTGRES_HOST,
	dialect: "postgres",
});

const db = {
	sequelize: sequelize,
	Book : bookBuilder(sequelize),
	Author : authorBuilder(sequelize)
};


console.log(db);


