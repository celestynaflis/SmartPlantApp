const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// const StringId = Schema.StringId;

export const UserSchema = new Schema({
    firstname: String,
    surname: String,
    mail: String,
    password: String,

});

export const SensorSchema = new Schema({
    sensorId: Number,
    humidity: Number,
});

export const PlantInfoSchema = new Schema({
    polishName: String,
    latinName: String,
    speciesId: Number,
    fertilizationInfo: String,
    wateringInfo: String,
    postionInfo: String,
    pestsInfo: String,
    temperatureInfo: String,
    humiditySummerInfo: String,
    humidityWinterInfo: String,
    repottingInfo: String,
});

export const UserPlantSchema = new Schema({
    name: String,
    species: String,
    sensorId: Number,
    userMail: String,
    repottingDate: Date,
    fertilizationDate: Date,
    wateringDate: Date,
});