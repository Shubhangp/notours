const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
  useNewUrlParser: true
}).then(() => console.log('DB connection successfull'));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('Data sucessfully loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data Sucessfully Deleted');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importData();
}if(process.argv[2] === '--delete'){
    deleteData();
}