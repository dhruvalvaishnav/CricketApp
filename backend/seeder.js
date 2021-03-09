import mongoose from "mongoose";
import dotenv from "dotenv";
import users from "./data/users.js";
import cricketers from "./data/cricketers.js";
import User from "./models/userModel.js";
import Cricketer from "./models/cricketersModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Cricketer.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleCricketers = cricketers.map((cricketer) => {
      return { ...cricketer, user: adminUser };
    });

    await Cricketer.insertMany(sampleCricketers);

    console.log("Data imported : ");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Cricketer.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed : ");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
