const mongoose = require('mongoose');
const md5 = require("md5");
const moment = require("moment");
const humanize = require("string-humanize");
const Admin = require("../models/adminModel");
const { breeds } = require("../config/catConfig");
const Category = require("../models/categoryModel");
const Breeds = require("../models/breedsModel");
mongoose.set('strictQuery', true);
const connectDb = async () => {
	try {
		const connect = await mongoose.connect(process.env.CONNECTION_STRING, {
			usenewurlparser: true,
			useunifiedtopology: true,
		});
		console.log(
			"Database connected: ",
			connect.connection.host,
			connect.connection.name
		);

		const [checkAdmin, category] = await Promise.all([
			Admin.countDocuments({}),
			Category.countDocuments({})
		]);

		if (!checkAdmin) {
			await Admin.create({
				firstName: humanize("admin"),
				lastName: humanize("social-pet"),
				email: "admin@socialpet.com",
				password: md5("Admin@11"),
				roles: 'superAdmin',
				phone: "+911111111111",
				dob: moment(new Date("01/01/1998")).format("YYYY-MM-DD[T00:00:00.000Z]")
			});
		}
		if (!category) {
			const array = ['dogs', 'cats', 'horses']
			let catArray = []
			array.forEach((data) => {
				catArray.push({ category: humanize(data) })
			})

			await Category.create(catArray);
			const petData = await Category.find({}).lean(true);
			if (petData.length) {
				let subArray = []
				for (let i = 0; i < petData.length; i++) {
					if (breeds[i]) {
						for (let j = 0; j < breeds[i].length; j++) {
							subArray.push({
								petCategory: petData[i]._id,
								petBreads: breeds[i][j]
							})
						}
					}
				}
				await Breeds.create(subArray)
			}

		}
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

module.exports = connectDb;