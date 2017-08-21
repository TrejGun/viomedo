import winston from "winston";
import assert from "power-assert";
import supertest from "supertest";
import app from "../../server/server";
import {gender, firstname, lastname, email, phone, age, zip, termsAccepted} from "../utils/data";


/**
 * I probably should add mortes hre but i'm to lazy
 */

describe("Application", () => {
	const superTestApp = supertest(app);

	describe("insert", () => {
		it("full data", () =>
			superTestApp
				.post("/api-v1/applications")
				.type("application/json;charset=utf-8")
				.send({
					gender,
					firstname,
					lastname,
					email,
					phone,
					age,
					zip,
					termsAccepted
				})
				.expect(200)
				.then(({body}) => {
					winston.info("body", body);
					assert.equal(body.gender, gender);
					assert.equal(body.firstname, firstname);
					assert.equal(body.lastname, lastname);
					assert.equal(body.email, email);
					assert.equal(body.phone, phone);
					assert.equal(body.age, age);
					assert.equal(body.zip, zip);
					assert.equal(body.termsAccepted, termsAccepted);
				})
		);

		it("no data", () =>
			superTestApp
				.post("/api-v1/applications")
				.type("application/json;charset=utf-8")
				.send({})
				.expect(409)
				.then(({body}) => {
					winston.info("body", body);
					assert.equal(body.errors.length, 8);
					body.errors.forEach(error => {
						assert.equal(error.reason, "notEmpty", error.path);
					});
				})
		);

		it("gender", () =>
			superTestApp
				.post("/api-v1/applications")
				.type("application/json;charset=utf-8")
				.send({
					gender: "shemale",
					firstname,
					lastname,
					email,
					phone,
					age,
					zip,
					termsAccepted
				})
				.expect(409)
				.then(({body}) => {
					winston.info("body", body);
					assert.equal(body.errors.length, 1);
					assert.equal(body.errors[0].name, "gender");
					assert.equal(body.errors[0].reason, "isIn");
				})
		);

		it("firstname", () =>
			superTestApp
				.post("/api-v1/applications")
				.type("application/json;charset=utf-8")
				.send({
					gender,
					firstname: "Trej123",
					lastname,
					email,
					phone,
					age,
					zip,
					termsAccepted
				})
				.expect(409)
				.then(({body}) => {
					winston.info("body", body);
					assert.equal(body.errors.length, 1);
					assert.equal(body.errors[0].name, "firstname");
					assert.equal(body.errors[0].reason, "isAlpha");
				})
		);

		it("firstname", () =>
			superTestApp
				.post("/api-v1/applications")
				.type("application/json;charset=utf-8")
				.send({
					gender,
					firstname,
					lastname: "Gun123",
					email,
					phone,
					age,
					zip,
					termsAccepted
				})
				.expect(409)
				.then(({body}) => {
					winston.info("body", body);
					assert.equal(body.errors.length, 1);
					assert.equal(body.errors[0].name, "lastname");
					assert.equal(body.errors[0].reason, "isAlpha");
				})
		);

		it("zip < 3", () =>
			superTestApp
				.post("/api-v1/applications")
				.type("application/json;charset=utf-8")
				.send({
					gender,
					firstname,
					lastname,
					email,
					phone,
					age,
					zip: "1",
					termsAccepted
				})
				.expect(409)
				.then(({body}) => {
					winston.info("body", body);
					assert.equal(body.errors.length, 1);
					assert.equal(body.errors[0].name, "zip");
					assert.equal(body.errors[0].reason, "len");
				})
		);

		it("zip > 5", () =>
			superTestApp
				.post("/api-v1/applications")
				.type("application/json;charset=utf-8")
				.send({
					gender,
					firstname,
					lastname,
					email,
					phone,
					age,
					zip: "123456",
					termsAccepted
				})
				.expect(409)
				.then(({body}) => {
					winston.info("body", body);
					assert.equal(body.errors.length, 1);
					assert.equal(body.errors[0].name, "zip");
					assert.equal(body.errors[0].reason, "len");
				})
		);
	});
});
