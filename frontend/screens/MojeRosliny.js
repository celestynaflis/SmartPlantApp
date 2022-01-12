import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity, FlatList,
    Dimensions,
} from 'react-native';
import {default as axios} from "axios";
import Colors from '../constants/colors';
import IP from '../constants/ip';
import { useId, useLogin } from '../context/LoginProvider';


const MojeRosliny = () =>
{
    //zmienne globalne (hooks useContext)
    const { setPlantId, setIsPlantChosen, setSensorId} = useId();
    const { profile } = useLogin();

    // zmiene stanu (hooks useState)
    const [plantsArray, setPlantsArray] = useState();

    //pobieranie roślin użytkownika z bazy danych
    axios.get("http://"+ IP.ip +"/userplants").then(resp => {
    const plants_array =[{}]=resp.data;

    //zapisywanie do tablicy user_plants_array tylko roślin do których przypisany jest zalogowany użytkownik
    let user_plants_array = [];
    for (let i=0; i< plants_array.length; i++)
            {
                if(plants_array[i].user_mail === profile.mail)
                {
                    user_plants_array.push(plants_array[i]);
                }
            };

    setPlantsArray(user_plants_array)});

    // funkcja odpowiedzialna za zmianę stanów, które potrzebne są do nawigacji
    const onPressStack = (id, sensorid) =>
        {
            setIsPlantChosen(true);
            setPlantId(id);
            setSensorId(sensorid);
        }

        //wyświetlanie pobranych z bazy roślin uzytkownika we flatLiście
    let plantList;
    plantList=(
        <FlatList 
        data={plantsArray}
        keyExtractor={(item) => item.nazwa}
        renderItem={({ item }) =>
         (<>
         <TouchableOpacity onPress={()=> onPressStack(item._id, item.sensor_id)}>
        <View style={styles.flexbox2}>
        <Image style = {styles.logo} source={require('../assets/pic.png')}/> 
        <View style={styles.flexbox3}> 
         <Text style={styles.text1}>{item.nazwa}</Text>
         <Text style={styles.text2}>{item.gatunek}</Text>
         </View> 
         </View>
         </TouchableOpacity>
         <Image style={styles.dash} source={require('../assets/dash.png')}/>
</>) }/>);
    

    return(
        <ScrollView>
            <View style={styles.flexbox1}>
                {plantList}
            </View>
        </ScrollView>
    )
};


// arkusze stylów
const styles =StyleSheet.create({

    flexbox1:
    {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    flexbox2:
    {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 15,
    },

    flexbox3:
    {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,

    },

    text1:
    {
        color: "#98BF63",
        fontSize: 20,
    },

    text2:
    {
        color: Colors.DarkGrey,
        fontSize: 10,
        fontStyle: 'italic',

    },

    dash: {
        width: Dimensions.get('window').width*1,
        height: 1,
      },

    logo: {
        borderRadius: 25,
        width: Dimensions.get('window').width*0.3,
        height: Dimensions.get('window').width*0.3,
        paddingHorizontal: 0,
        paddingTop:0,
        marginBottom: 0,
        backgroundColor: '#7722',

    },


});

export default MojeRosliny;