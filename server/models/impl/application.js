export default (sequelize, DataTypes) =>
	sequelize.define("application", {
		gender: {
			type: DataTypes.ENUM("male", "female"),
			allowNull: false,
			defaultValue: "",
			validate: {
				notEmpty: {
					msg: "notEmpty"
				},
				isIn: {
					args: [["male", "female"]],
					msg: "isIn"
				}
			}
		},
		firstname: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
			validate: {
				notEmpty: {
					msg: "notEmpty"
				},
				isAlpha: {
					msg: "isAlpha"
				}
			}
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
			validate: {
				notEmpty: {
					msg: "notEmpty"
				},
				isAlpha: {
					msg: "isAlpha"
				},
			}
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
			validate: {
				notEmpty: {
					msg: "notEmpty"
				},
				isEmail: {
					msg: "isEmail"
				}
			}
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
			validate: {
				notEmpty: {
					msg: "notEmpty"
				},
			}
		},
		age: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			validate: {
				isAge(val){
					if (!val) {
						throw new Error("notEmpty");
					}
				},
				isInt: true,
				min: {
					args: [1],
					msg: "min"
				},
				max: {
					args: [99],
					msg: "max"
				}
			}
		},
		zip: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: "",
			validate: {
				notEmpty: {
					msg: "notEmpty"
				},
				isNumeric: {
					msg: "isNumeric"
				},
				len: {
					args: [3, 5],
					msg: "len"
				}
			}
		},
		termsAccepted: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false,
			validate: {
				isIn: {
					args: [[true]],
					msg: "notEmpty"
				}
			}
		}
	});
