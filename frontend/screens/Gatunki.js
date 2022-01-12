import React, {useState} from 'react';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Colors from '../constants/colors';
import {default as axios} from "axios";
import IP from '../constants/ip';
import { useId } from '../context/LoginProvider';


const Gatunki = () =>
{
    const { setIdSpecies, setIsChosen} = useId();

    const [plantsArray, setPlantsArray] = useState();

    //pobieranie kolekcji gatunków z bazy danych
    axios.get("http://"+ IP.ip +"/plants").then(resp => {
    const plants_array =[{}]=resp.data;
    setPlantsArray(plants_array)});

    // funkcja zmieniajaca stan globalnych zmiennych (hooks useContext), które są odpowiedzialne za nawigację aplikacji
        const onPressStack = (id) =>
        {
            setIsChosen(true);
            setIdSpecies(id);
        }

        // zmienna plantlist, która zawiera flatlistę z gatunkami (zmienna jest wywoływana w returnie)
        let plantList;

        plantList=(
            <FlatList 
            data={plantsArray}
            keyExtractor={(item) => item.idgatunku}
            renderItem={({ item }) =>
             (<>
             <TouchableOpacity onPress={ ()=> onPressStack(item.idgatunku) }>
            <View>
             <Text style={styles.text1}>{item.Nazwapolska}</Text>
             <Text style={styles.text2}>{item.Nazwalacina}</Text>
             </View>
             </TouchableOpacity>
             <Image style={styles.dash} source={require('../assets/dash.png')}/>
</>) }/>);

    return(
        <ScrollView>
    <View style={styles.flexbox1}>
        <View style={styles.flexbox2}>
        {plantList}
        </View>
        <Image style={styles.dash} source={require('../assets/dash.png')}/>
    </View>
    </ScrollView>

    );
}

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
        justifyContent: 'space-between',
        alignItems: 'center',
      
    },

    text1:
    {
        color: '#98BF63',
        fontSize: 17,
        fontWeight: 'bold',
        flex: 1,
        marginTop: 10,
        marginLeft:15,

        //marginRight: 10,

    },

    text2:
    {
        color: Colors.DarkGrey,
        fontSize: 15,
        fontStyle: 'italic',
        flex: 1,
        marginBottom: 10,
        marginLeft:15,
        //marginRight: 15,

    },

    dash: {
        width: Dimensions.get('window').width*1,
        height: 1,
      },

      item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },

});

export default Gatunki;