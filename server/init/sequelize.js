import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import winston from "winston";
import pg from "../configs/posgress";


let db;

export function getConnection() {

	if (db) {
		return db;
	}

	db = new Sequelize(Object.assign({}, pg[process.env.NODE_ENV], {logging: winston.debug}));

	fs.readdirSync(path.join(__dirname, "../models/impl"))
		.forEach(file => {
			db.import(path.join(__dirname, "../models/impl", file));
		});

	return db;

}
