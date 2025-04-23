import {UserSchema, PlantInfoSchema, UserPlantSchema, SensorSchema} from "./schemas";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const json = require("./Plants.json")

const User = mongoose.model("User", UserSchema);
const Plant = mongoose.model("Plant", PlantInfoSchema);
const Sensor = mongoose.model("Sensor", SensorSchema);
const UserPlant = mongoose.model("UserPlant", UserPlantSchema);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/users", async (req, res) => {
    const requestBody = req.body;

    const user = new User();

    user.firstname = requestBody.firstname;
    user.surname = requestBody.surname;
    user.mail = requestBody.mail;
    user.password = requestBody.password;

    user.save();
    res.json(user);
});

app.put("/userplants/water/:_id", async (req, res) => {
    const userPlant = await UserPlant.findOne({_id: req.params._id});

    if (userPlant) {
        name = userPlant.name;
        userMail = userPlant.userMail;
        species = userPlant.species;
        sensorId = userPlant.sensorId
        repottingDate = userPlant.repottingDate;
        fertilizationDate = userPlant.fertilizationDate;

        userPlant.overwrite({
            name: name,
            userMail: userMail,
            species: species,
            sensorId: sensorId,
            fertilizationDate: fertilizationDate,
            repottingDate: repottingDate,
            wateringDay: req.body.wateringDay
        });

        await userPlant.save();
    } else {
        res.status(404).send();
    }

});
app.put("/userplants/przesadz/:_id", async (req, res) => {
    const userplant = await UserPlant.findOne({_id: req.params._id});
    if (userplant) {
        nazwa = userplant.nazwa;
        user_mail = userplant.user_mail;
        gatunek = userplant.gatunek;
        sensor_id = userplant.sensor_id;
        data_podlewania = userplant.data_podlewania;
        data_nawozenia = userplant.data_nawozenia;

        userplant.overwrite({
            nazwa: nazwa,
            user_mail: user_mail,
            gatunek: gatunek,
            sensor_id: sensor_id,
            data_przesadzania: req.body.data_przesadzania,
            data_nawozenia: data_nawozenia,
            data_podlewania: data_podlewania
        });
        await userplant.save();
    } else {
        res.status(404).send();
    }

});
app.put("/userplants/nawiez/:_id", async (req, res) => {
    const userplant = await UserPlant.findOne({_id: req.params._id});
    if (userplant) {
        nazwa = userplant.nazwa;
        user_mail = userplant.user_mail;
        gatunek = userplant.gatunek;
        sensor_id = userplant.sensor_id;
        data_przesadzania = userplant.data_przesadzania;
        data_podlewania = userplant.data_podlewania;

        userplant.overwrite({
            nazwa: nazwa,
            user_mail: user_mail,
            gatunek: gatunek,
            sensor_id: sensor_id,
            data_przesadzania: data_przesadzania,
            data_nawozenia: req.body.data_nawozenia,
            data_podlewania: data_podlewania
        });
        await userplant.save();
    } else {
        res.status(404).send();
    }

});

app.post("/userplants", (req, res) => {
    const user_mail = req.body.user_mail;
    const nazwa = req.body.nazwa;
    const gatunek = req.body.gatunek;
    const sensor_id = req.body.sensor_id;
    const data_przesadzania = req.body.data_przesadzania;
    const data_nawozenia = req.body.data_nawozenia;
    const data_podlewania = req.body.data_podlewania;
    const roslina = new UserPlant();

    roslina.user_mail = user_mail;
    roslina.nazwa = nazwa;
    roslina.gatunek = gatunek;
    roslina.sensor_id = sensor_id;
    roslina.data_przesadzania = data_przesadzania;
    roslina.data_nawozenia = data_nawozenia;
    roslina.data_podlewania = data_podlewania;

    roslina.save();
    res.json(req.body);
});

app.post("/Plants", (req, res) => {
    const nazwapolska = req.body.nazwapolska;
    const nazwalacina = req.body.nazwalacina;
    const idgatunku = req.body.idgatunku;
    const nawozenie = req.body.nawozenie;
    const podlewanie = req.body.podlewanie;
    const stanowisko = req.body.stanowisko;
    const szkodniki = req.body.szkodniki;
    const temperatura = req.body.temperatura;
    const wilgotnosc_lato = req.body.wilgotnosc_lato;
    const wilgotnosc_zima = req.body.wilgotnosc_zima;
    const przesadzanie = req.body.przesadzanie;

    const gatunek = new Gatunek();
    gatunek.nazwapolska = nazwapolska;
    gatunek.nazwalacina = nazwalacina;
    gatunek.idgatunku = idgatunku;
    gatunek.nawozenie = nawozenie;
    gatunek.podlewanie = podlewanie;
    gatunek.stanowisko = stanowisko;
    gatunek.szkodniki = szkodniki;
    gatunek.temperatura = temperatura;
    gatunek.wilgotnosc_lato = wilgotnosc_lato;
    gatunek.wilgotnosc_zima = wilgotnosc_zima;
    gatunek.przesadzanie = przesadzanie;
    gatunek.save();
    res.json(req.body);
});

app.post("/sensors", async (req, res) => {
    const sensor = await Sensor.findOne({sensor_id: req.body.sensor_id});
    if (sensor) {
        sensor.overwrite({sensor_id: req.body.sensor_id, humidity: req.body.humidity});
        await sensor.save();
    } else {
        const sensor = new Sensor();
        sensor.sensor_id = req.body.sensor_id;
        sensor.humidity = req.body.humidity;
        sensor.save();
        res.json(req.body);
    }
});

app.get("/sensors", async (req, res) => {
    const sensors = await Sensor.find();
    res.json(sensors);
});
app.get("/sensors/:sensor_id", async (req, res) => {
    const sensors = await Sensor.find({sensor_id: req.params.sensor_id});
    res.json(sensors);
});

app.get("/userplants", async (req, res) => {
    const userplants = await UserPlant.find();
    res.json(userplants);
});
app.get("/userplants/:idrosliny", async (req, res) => {
    const userplants = await UserPlant.find({idrosliny: req.params.idrosliny});
    res.json(userplants);
});

app.get("/userplants/id/:_id", async (req, res) => {
    const userplants = await UserPlant.find({_id: req.params._id});
    res.json(userplants);
});

app.get("/userplants/:nazwa", async (req, res) => {
    const userplants = await UserPlant.find({nazwa: req.params.nazwa});
    res.json(userplants);
});
app.get("/userplants/:gatunek", async (req, res) => {
    const userplants = await UserPlant.find({gatunek: req.params.gatunek});
    res.json(userplants);
});
app.get("/userplants/:sensor_id", async (req, res) => {
    const userplants = await UserPlant.find({sensor_id: req.params.sensor_id});
    res.json(userplants);
});
app.get("/userplants/:data_przesadzania", async (req, res) => {
    const userplants = await UserPlant.find({data_przesadzania: req.params.data_przesadzania});
    res.json(userplants);
});
app.get("/userplants/:data_nawozenia", async (req, res) => {
    const userplants = await UserPlant.find({data_nawozenia: req.params.data_nawozenia});
    res.json(userplants);
});

app.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get("/users/:firstname", async (req, res) => {
    const user = await Plant.find({firstname: req.params.firstname});
    res.json(user);
});

app.get("/plants/:idgatunku", async (req, res) => {
    const plant = await Plant.find({idgatunku: req.params.idgatunku});
    res.json(plant);
});

app.get("/plants/nazwa/:Nazwapolska", async (req, res) => {
    const plant = await Plant.find({Nazwapolska: req.params.Nazwapolska});
    const id = plant[0].idgatunku;
    res.json(id);
});
app.get("/plants/wilgotnosci/:idgatunku", async (req, res) => {
    const plant = await Plant.find({idgatunku: req.params.idgatunku});
    const wilgotnosci = {
        wilgotnosc_lato: plant[0].wilgotnosc_lato, wilgotnosc_zima: plant[0].wilgotnosc_zima,
    };
    res.json(wilgotnosci);
});

app.get("/plants/wilgotnosci_nazwa/:Nazwapolska", async (req, res) => {
    const plant = await Plant.find({Nazwapolska: req.params.nazwapolska});
    const wilgotnosci = {
        wilgotnosc_lato: plant[0].wilgotnosc_lato, wilgotnosc_zima: plant[0].wilgotnosc_zima,
    };
    res.json(wilgotnosci);
});

app.get("/plants/nazwalac/:Nazwalacina", async (req, res) => {
    const plant = await Plant.find({Nazwalacina: req.params.Nazwalacina});
    res.json(plant);
});
app.get("/plants/nawozenie/:nawozenie", async (req, res) => {
    const plant = await Plant.find({nawozenie: req.params.nawozenie});
    res.json(plant);
});
app.get("/plants/szkodniki/:szkodniki", async (req, res) => {
    const plant = await Plant.find({idgatunku: req.params.szkodniki});
    res.json(plant);
});
app.get("/plants/podlewanie/:podlewanie", async (req, res) => {
    const plant = await Plant.find({szkodniki: req.params.podlewanie});
    res.json(plant);
});
app.get("/plants/stanowisko/:stanowisko", async (req, res) => {
    const plant = await Plant.find({stanowisko: req.params.stanowisko});
    res.json(plant);
});
app.get("/plants/temperatura/:temperatura", async (req, res) => {
    const plant = await Plant.find({temperatura: req.params.temperatura});
    res.json(plant);
});
app.get("/plants/wilgotnosc_lato/:wilgotnosc_lato", async (req, res) => {
    const plant = await Plant.find({wilgotnosc_lato: req.params.wilgotnosc_lato});
    res.json(plant);
});
app.get("/plants/wilgotnosc_zima/:wilgotnosc_zima", async (req, res) => {
    const plant = await Plant.find({wilgotnosc_zima: req.params.wilgotnosc_zima});
    res.json(plant);
});
app.get("/plants/przesadzanie/:przesadzanie", async (req, res) => {
    const plant = await Plant.find({przesadzanie: req.params.przesadzanie});
    res.json(plant);
});

app.get("/plants", async (req, res) => {
    const plant = await Plant.find();
    res.json(plant);
});

const start = async () => {
    await mongoose.connect("mongodb://localhost/smartPlant_database");
//   Plant.insertMany(json).then(function(){
//     console.log("Data inserted")  // Success
// }).catch(function(error){
//     console.log(error)      // Failure
// });
    // const user= new User();
    // user.firstname="Szymon";
    // user.surname="Szymon";
    // user.mail="s@gmail.com";
    // user.password="Szymon";
    // user.user_id=1;
    // user.save();
    app.listen(3000);

    /* const sensor= new Sensor();
       sensor.sensor_id=1;
       sensor.humidity=25;
     sensor.save();
     const sensor2= new Sensor();
       sensor2.sensor_id=2;
       sensor2.humidity=30;
     sensor2.save();*/

    /*const userplant1 = new UserPlant();
    userplant1.idrosliny = 1;
    userplant1.nazwa = "Marian";
    userplant1.gatunek = "Zielistka";
    userplant1.sensor_id = 1;
    userplant1.data_nawozenia = '2021-11-30';
    userplant1.data_przesadzania = '2021-11-30';*/

    /*const userplant2 = new UserPlant();
    userplant2.idrosliny = 3;
    userplant2.nazwa = "Montera sypialnia";
    userplant2.gatunek = "Monstera Okazała";
    userplant2.sensor_id = 2;
    userplant2.data_przesadzania = '2021-11-02';
    userplant2.data_nawozenia = '2021-11-01';
    userplant2.data_podlewania = '2021-08-21';
    userplant2.user_mail = 'sj@icloud.com';*/

    /*const userplant2 = new UserPlant();
    userplant2.idrosliny = 4;
    userplant2.nazwa = "Montera sypialnia";
    userplant2.gatunek = "Monstera Okazała";
    userplant2.sensor_id = 1;
    userplant2.data_przesadzania = '2021-11-02';
    userplant2.data_nawozenia = '2021-11-01';
    userplant2.data_podlewania = '2021-08-21';
    userplant2.user_mail = 'lala@icloud.com';

    //userplant1.save();
    userplant2.save();*/

};

start();