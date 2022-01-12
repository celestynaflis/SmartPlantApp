import React, { useState } from 'react';
import { Text,
   View,
   StyleSheet,
   ScrollView,
   TextInput,
   TouchableOpacity,
   Alert } from 'react-native';
import IP from '../constants/ip';
import Colors from '../constants/colors';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import Box from '../components/boxes';
import {useLogin} from "../context/LoginProvider";
import {default as axios} from "axios";


const DodawanieRosliny = ({navigation}) =>
{
   const [plantName, setPlantName] = useState('');
   const [sensorID, setSensorID] = useState();
   const [species, setSpecies] = useState(); // ten usestate jest po to, aby wyjac dane z bazy

   const [isFocus, setIsFocus] = useState(false);
   const [dropdownSpecies, setDropdownSpecies] = useState(null); //tu chcemy zapisac to co uzytkownik wybierze aby wpisac to do bazy


   const [seedingDate, setSeedingDate] = useState(new Date());
   const [seedingDateAndroid, setSeedingDateAndroid] = useState(null);

   const [fertilizationDate, setFertilizationDate] = useState(new Date());
   const [fertilizationDateAndroid, setFertilizationDateAndroid] = useState(null);

   const [wateringDate, setWateringDate] = useState(new Date());
   const [wateringDateAndroid, setWateringDateAndroid] = useState(null);

// funkcje odpwiedzialne za zapisywanie wartości w zmiennych hooks zdefiniowanych powyżej
   const onChangeSeedingDate = (event, selectedDate) => {
       const currentDate = selectedDate || date;
       setSeedingDate(currentDate);
   };

   const onChangeSeedingDateAndroid = (date) =>
   {
       setSeedingDateAndroid(date);
   };

   const onChangeFertilizationDate = (event, selectedDate) => {
       const currentDate = selectedDate || date;
       setFertilizationDate(currentDate);
   };

   const onChangeFertilizationDateAndroid = (date) =>
   {
       setFertilizationDateAndroid(date);
   };

   const onChangeWateringDate = (event, selectedDate) => {
       const currentDate = selectedDate || date;
       setWateringDate(currentDate);
   };

   const onChangeWateringDateAndroid = (date) =>
   {
       setWateringDateAndroid(date);
   };
   const nameInputHandler = (enteredName) => {
       setPlantName(enteredName);
   };

   const sensorIdHandler = (ID) => {
       setSensorID(ID);
   }

   //funkcja odpowiedzialna za wyświetlanie powaidomienia o dodanej roślinie
   const showSuccessAlert = () =>{        Alert.alert(
       "Dodano nowa rosline",
       "Zostales przekierowany do widoku Twoich roslin",
      navigation.navigate('MojeRosliny'),
   );}

   //funkcja pobierająca listę gatunków z bazy
   const speciesDropdown = async () =>
   {
       const axios = require('axios').default;
       const res = await axios.get("http://"+ IP.ip +"/plants").then(resp => {
           let plants_array=[{}]=resp.data;
           setSpecies(plants_array);});

   }


   /* W lini od 101 do 198 znajdują się funkcje warunkowe, które sprawdzają z jakiego urządzenia korzysta uzytkownik
   Android czy iOS i na tej podstawie przypisuje do zmiennych z linii 97 do 99 odpowiedni format wyboru daty
   (na iOS datetimepicker a na Andoid zwykły textinput)*/

   let datePicker;
   let datePicker2;
   let datePicker3;

   if( Platform.OS === 'ios')
   {
       datePicker =(
           <>
               <Text style={styles.text}>4. Dodaj datę ostatniego przesadzania rośliny bądź datę zakupu.</Text>
               <View style={styles.datePicker}>
                   <DateTimePicker
                       testID="dateTimePicker"
                       value={seedingDate}
                       mode='date'
                       display="default"
                       onChange={onChangeSeedingDate}
                       themeVariant="light"
                   />
               </View>
           </>
       )
   }else{
       datePicker=(
           <>
               <Text style={styles.text}>4. Wpisz datę ostatniego przesadzania rośliny bądź datę zakupu w formacie RRRR-MM-DD np. 20211128.</Text>
               <TextInput
                   style={styles.input}
                   onChangeText={onChangeSeedingDateAndroid}
                   value={seedingDateAndroid}
                   placeholder="Wpisz datę we właściwym formacie"
                   keyboardType = 'numeric'
                   maxLength={11}
               />
           </>
       )
   }

   if( Platform.OS === 'ios')
   {
       datePicker2 =(
           <>
               <Text style={styles.text}>5. Dodaj datę ostatniego nawożenia rośliny (jeżeli nie pamiętasz lub nie nawoziłeś nigdy swojej rośliny, to wpisz dzisiejszą datę.)</Text>
               <View style={styles.datePicker}>
                   <DateTimePicker
                       testID="dateTimePicker"
                       value={fertilizationDate}
                       mode='date'
                       display="default"
                       onChange={onChangeFertilizationDate}
                       themeVariant="light"
                   />
               </View>
           </>
       )
   }else{
       datePicker2=(
           <>
               <Text style={styles.text}>5. Wpisz datę ostatniego nawożenia rośliny (jeżeli nie pamiętasz lub nie nawoziłeś nigdy swojej rośliny, to wpisz dzisiejszą datę w formacie RRRR-MM-DD np. 2021-11-28.</Text>
               <TextInput
                   style={styles.input}
                   onChangeText={onChangeFertilizationDateAndroid}
                   value={fertilizationDateAndroid}
                   placeholder="Wpisz datę we właściwym formacie"
                   keyboardType = 'numeric'
                   maxLength={11}
               />
           </>
       )
   }

   if( Platform.OS === 'ios')
   {
       datePicker3 =(
           <>
               <Text style={styles.text}>4. Dodaj datę ostatniego podlewania rośliny bądź datę zakupu.</Text>
               <View style={styles.datePicker}>
                   <DateTimePicker
                       testID="dateTimePicker"
                       value={wateringDate}
                       mode='date'
                       display="default"
                       onChange={onChangeWateringDate}
                       themeVariant="light"
                   />
               </View>
           </>
       )
   }else{
       datePicker3=(
           <>
               <Text style={styles.text}>4. Wpisz datę ostatniego podlewania rośliny bądź datę zakupu w formacie RRRR-MM-DD np. 2021-11-28.</Text>
               <TextInput
                   style={styles.input}
                   onChangeText={onChangeWateringDateAndroid}
                   value={wateringDateAndroid}
                   placeholder="Wpisz datę we właściwym formacie"
                   keyboardType = 'numeric'
                   maxLength={11}
               />
           </>
       )
   }

   //funkcja formatująca datę pobieraną z kalendarza 'datetimepicker' na datę w formacie YYYY-MM-DD
   const formatDate = (date) =>
   {
       let stringDate = date ? date.toString() : '';
       stringDate = stringDate.replace('Jan', '01');
       stringDate = stringDate.replace('Feb', '02');
       stringDate = stringDate.replace('Mar', '03');
       stringDate = stringDate.replace('Apr', '04');
       stringDate = stringDate.replace('May', '05');
       stringDate = stringDate.replace('Jun', '06');
       stringDate = stringDate.replace('Jul', '07');
       stringDate = stringDate.replace('Aug', '08');
       stringDate = stringDate.replace('Sep', '09');
       stringDate = stringDate.replace('Oct', '10');
       stringDate = stringDate.replace('Nov', '11');
       stringDate = stringDate.replace('Dec', '12');


       let day =[];
       let month =[];
       let year =[];

       month.push(stringDate[4]);
       month.push(stringDate[5]);

       day.push(stringDate[7]);
       day.push(stringDate[8]);

       year.push(stringDate[10]);
       year.push(stringDate[11]);
       year.push(stringDate[12]);
       year.push(stringDate[13]);

       let mongoDate=[];
       mongoDate.push(year);
       mongoDate.push('-');
       mongoDate.push(month);
       mongoDate.push('-');
       mongoDate.push(day);

       mongoDate = mongoDate.join("");

       mongoDate = mongoDate.replace(",", "");
       mongoDate = mongoDate.replace(",", "");
       mongoDate = mongoDate.replace(",", "");
       mongoDate = mongoDate.replace(",", "");
       mongoDate = mongoDate.replace(",", "");

       return mongoDate;

   }

   //w ponizszych zmiennych zapisujemy sformatowane pobrane z datetimepickera daty
   const formatedSeedingDate = formatDate(seedingDate);
   const formatedFertilizationDate = formatDate(fertilizationDate);
   const formatedWateringDate = formatDate(wateringDate);


   // Hooks useContext, która przechowuje informacje o zalogowanym użytkowniku
   const { profile } = useLogin();


   //funkcja zapisująca roślinę użytkownika w bazie danych (z podziałem na urządzenia Android i iOS)
   const createUserPlant = async () =>{

     if( Platform.OS === 'ios')
     {
        const newUserPlant = {
            nazwa: plantName,
            gatunek: dropdownSpecies,
            sensor_id: sensorID,
            data_przesadzania: formatedSeedingDate,
            data_nawozenia:  formatedFertilizationDate,
            data_podlewania: formatedWateringDate,
            user_mail: profile.mail,
        }
 
        const axios = require('axios').default;
        const res = await axios.post("http://"+ IP.ip +"/userplants", newUserPlant).then(resp => { });
        showSuccessAlert();
     }else{

        const newUserPlant = {
            nazwa: plantName,
            gatunek: dropdownSpecies,
            sensor_id: sensorID,
            data_przesadzania: seedingDateAndroid,
            data_nawozenia:  fertilizationDateAndroid,
            data_podlewania: wateringDateAndroid,
            user_mail: profile.mail,
        }
 
        const axios = require('axios').default;
        const res = await axios.post("http://"+ IP.ip +"/userplants", newUserPlant).then(resp => { });
        showSuccessAlert();

     }
       
   }

   return(
       <ScrollView style={styles.container}>
           <Text style={styles.header}>Dodaj nową roślinkę!</Text>
           <Text style={styles.text}>1. Wpisz nazwę swojej rośliny.</Text>
           <TextInput
               style={styles.input}
               onChangeText={nameInputHandler}
               value={plantName}
               placeholder="np. Zamiokulkas Salon"
               keyboardType="default"
           />
           <Text style={styles.text}>2. Wybierz gatunek rośliny.</Text>


           <Dropdown
               style={styles.input}
               placeholderStyle={dropdownSpecies? styles.dropdownText2 : styles.dropdownText}
               activeColor={Colors.LightGreen}
               data={species}
               search
               maxHeight={300}
               labelField="Nazwapolska"
               valueField="idgatunku"
               placeholder={!isFocus ? 'Wybierz gatunek...' : dropdownSpecies}
               searchPlaceholder="Szukaj..."
               value={dropdownSpecies}
               onFocus={() => setIsFocus(true)}
               onBlur={() => setIsFocus(false)}
               onChange={
                   speciesDropdown(),
                   item => {
                   setDropdownSpecies(item.Nazwapolska);
                   setIsFocus(true);
               }}
           />

           <Text style={styles.text}>3. Wpisz numer ID miernika wilgoci, który znajduje się w doniczce Twojej roślinki.</Text>
           <TextInput
               style={styles.input}
               onChangeText={sensorIdHandler}
               value={sensorID}
               placeholder="wpisz ID czujnika..."
               keyboardType="numeric"
               maxLength={2}
           />
           {datePicker}
           {datePicker2}
           {datePicker3}


           <TouchableOpacity style={styles.box} onPress={createUserPlant}>
               <Box colorHex={Colors.LightGreen} colorTextHex={Colors.Green} TextInside="Dodaj roślinę" ></Box>
           </TouchableOpacity>
       </ScrollView>
   );

}

//Arkusze stylów

const styles = StyleSheet.create(
   {
       header:
           {
               color: Colors.Green,
               fontSize: 25,
               textAlign: 'center',
               paddingTop: 10,
               paddingBottom: 20,

           },
       text:
           {
               color: Colors.Green,
               fontSize: 17,
           },

       input: {
           height: 40,
           marginTop: 10,
           marginBottom: 15,
           borderWidth: 1,
           paddingHorizontal: 10,
           borderColor: Colors.Grey,
           borderRadius: 10,

       },
       container: {
           flex: 1,
           padding: 20,
       },

       flexbox:
           {
               flexDirection: 'row',
               justifyContent: 'flex-start',
               alignItems: 'center',

           },

       dropdownText:
           {
               color: Colors.Grey,


           },
       dropdownText2:
           {
               color: '#000000',


           },

       dateText:
           {
               fontSize: 17,
               color: Colors.PastelGreen,
               fontWeight: 'bold',
           },

       datePicker:
           {
               marginTop:10,
               marginBottom: 15,
               flex: 1,
           },

       box:
           {
               marginBottom:40,

           }
   });




export default DodawanieRosliny;