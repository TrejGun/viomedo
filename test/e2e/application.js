import winston from "winston";
import assert from "power-assert";
import webdriver, {By} from "selenium-webdriver";
import {gender, firstname, lastname, email, phone, age, zip} from "../utils/data";


describe("Application", () => {
	const driver = new webdriver.Builder()
		.forBrowser("chrome")
		.build();

	before(() =>
		driver.navigate().to("http://localhost:3000/application/form")
	);

	describe("insert", () => {
		it("full data", () => {
			driver.findElement(By.css(`option[value=${gender}]`)).click();
			driver.findElement(By.css("#firstname")).sendKeys(firstname);
			driver.findElement(By.css("#lastname")).sendKeys(lastname);
			driver.findElement(By.css("#email")).sendKeys(email);
			driver.findElement(By.css("#phone")).sendKeys(phone);
			driver.findElement(By.css("#age")).sendKeys(age);
			driver.findElement(By.css("#zip")).sendKeys(zip);
			driver.findElement(By.css("#lastname")).sendKeys(lastname);
			driver.findElement(By.css("#termsAccepted")).click();
			driver.findElement(By.css("[type=submit]")).click();
			driver.sleep(1000);
			driver.getCurrentUrl().then(url => {
				winston.info(url);
				assert.equal(url, "http://localhost:3000/application/success");
			});

			return driver;
		});
	});

	after(() =>
		driver.quit()
	);
});
