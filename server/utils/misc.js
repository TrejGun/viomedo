export function toTitleCase(str) {
	return str.split(".")[0].replace(/(^|-)(\w)/g, (all, $1, $2) => $2.toUpperCase());
}

export function getRandomString(length = 64, type = 3) {
	const chars = [
		"0123456789",
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	];
	const result = [];
	for (let i = 0; i < length; i++) {
		result.push(chars[type].charAt(Math.floor(Math.random() * chars[type].length)));
	}
	return result.join("");
}

export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement(array = []) {
	return array[Math.floor(Math.random() * array.length)];
}

export function getType(variable) {
	return Object.prototype.toString.call(variable); // .match(/\[object (\w+)\]/i)[1]
}

export function isType(variable, type) {
	return getType(variable) === `[object ${type}]`;
}
