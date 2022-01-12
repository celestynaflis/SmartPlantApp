import React, {useState} from 'react';
import Colors from '../constants/colors';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity, 
    Dimensions
} from 'react-native';
import {default as axios} from "axios";
import IP from '../constants/ip';
import { useId } from '../context/LoginProvider';
import { useInitial } from '../context/LoginProvider';

const PrzegladGatunku = () =>
{
    const { idSpecies, setIsChosen } = useId();
    const { setInitial } = useInitial();

    ///////Poniżej useStaty, w których zapisujemy informacje z bazy w zależności od wybranego ID
    const [nazwaPL, setNazwaPL] = useState('');
    const [nazwaLac, setNazwaLac] = useState('');
    const [position, setPosition] = useState('');
    const [temperature, setTemperature] = useState('');
    const [watering, setWatering] = useState('');
    const [fertilization, setFertilization] = useState('');
    const [replanting, setReplanting] = useState('');
    const [pests, setPests] = useState('');
    const [humiditySummer, setHummiditySummer] = useState('');
    const [humidityWinter, setHummidityWinter] = useState('');

    /////Pobieramy dane z bazy, następnie pobrane dane zapisujemy do use State
    axios.get("http://"+ IP.ip +"/plants").then(resp => {
    const plants_array =[{}]=resp.data;
    setNazwaPL(plants_array[idSpecies].Nazwapolska);
    setNazwaLac(plants_array[idSpecies].Nazwalacina);
    setPosition(plants_array[idSpecies].stanowisko);
    setTemperature(plants_array[idSpecies].temperatura);
    setWatering(plants_array[idSpecies].podlewanie);
    setFertilization(plants_array[idSpecies].nawozenie);
    setReplanting(plants_array[idSpecies].przesadzanie);
    setPests(plants_array[idSpecies].szkodniki);
    setHummiditySummer(plants_array[idSpecies].wilgotnosc_lato);
    setHummidityWinter(plants_array[idSpecies].wilgotnosc_zima);
});

///Zmienne, które potrzebne są nam do przypisania do nich wartości z useState'a
    let plantname;
    let plantnamelatin;
    let plantStanowisko;
    let plantTemperature;
    let plantPodlewanie;
    let plantNawozenie;
    let plantPrzesadzanie;
    let plantSzkodniki;
    let plantWilgotnoscLato;
    let plantWilgotnoscZima;

    //funkcja formatująca wartość z bazy zapisanej dziesiętnie na wartość procentową (integer)
    const toPercents = (variable) =>
    {
        variable = variable.replace(',','.')
        var integer = Number(variable);
        integer = integer * 100;
        return integer;
    }

    ////Przypisujemy do zmiennych komponenty text, które zawierają w sobie wartości UseStatów, które nadaliśmy powyżej////
    /// w returnie musimy w odpowiednim miejscu po prostu przekazać te zmienne - np {plantname}////
        plantname = 
          (<Text>{nazwaPL}</Text>);
        plantnamelatin =
        (<Text>{nazwaLac}</Text>);
        plantStanowisko = 
        (<Text>{position}</Text>);
        plantTemperature = 
        (<Text>{temperature}</Text>);
        plantPodlewanie = 
        (<Text>{watering}</Text>);
        plantNawozenie = 
        (<Text>{fertilization}</Text>);
        plantPrzesadzanie =
        (<Text>{replanting}</Text>);
        plantSzkodniki = 
        (<Text>{pests}</Text>);
        plantWilgotnoscLato = 
        (<Text>{toPercents(humiditySummer)}</Text>);
        plantWilgotnoscZima =
        (<Text>{toPercents(humidityWinter)}</Text>);

// funkcja odpowiedzialna za nadawanie stanów do zmiennych globalnych odpowiedzialnych za nawigację aplikacji
    const goBackButton = () =>
    {
        setIsChosen(false);
        setInitial('Gatunki');
    }

    return(
        <ScrollView>
            <TouchableOpacity onPress={goBackButton}>
                <Text style={styles.plantProperties}>Powrót do listy</Text>    
            </TouchableOpacity>
                <View style={styles.flexbox2}>
                    <Text style={styles.titleText}>{plantname}</Text>
                    <Text style={styles.titleSecondText}>{plantnamelatin}</Text>
                    <Image style={styles.plantPic} source={require('../assets/plant.png')}/>
                </View>
                <View style={styles.flexbox3}>
                    <Text style={styles.plantPropertiesTitle}>Stanowisko</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantStanowisko}</Text>

                    <Text style={styles.plantPropertiesTitle}>Temperatura pomieszczenia</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantTemperature}</Text>

                    <Text style={styles.plantPropertiesTitle}>Podlewanie</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantPodlewanie}</Text>

                    <Text style={styles.plantPropertiesTitle}>Nawożenie</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantNawozenie}</Text>

                    <Text style={styles.plantPropertiesTitle}>Przesadzanie</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantPrzesadzanie}</Text>

                    <Text style={styles.plantPropertiesTitle}>Szkodniki i inne zagrożenia</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantSzkodniki}</Text>

                    <Text style={styles.plantPropertiesTitle}>Optymalna wilgotność ziemi w okresie letnim</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantWilgotnoscLato}%</Text>

                    <Text style={styles.plantPropertiesTitle}>Optymalna wilgotność ziemi w okresie zimowym</Text>
                    <Image style={styles.dash} source={require('../assets/dash.png')}/>
                    <Text style={styles.plantProperties}>{plantWilgotnoscZima}%</Text>

                </View>

        </ScrollView>
    )
};

const styles = StyleSheet.create({

    flexbox2:
    {
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },

    flexbox3:
    {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10,
    },

    plantPic:
    {
        height: Dimensions.get('window').width*0.6,
        width: Dimensions.get('window').width*0.6,
        borderRadius: 30,
    },

    titleText:
    {
        color: Colors.Green,
        fontSize: 20,
    },

    titleSecondText:
    {
        color: Colors.DarkGrey,
        fontSize: 14,
        fontStyle: 'italic',
        paddingVertical: 10,
    },

    plantPropertiesTitle:
    {
        color: Colors.DarkGrey,
        fontSize: 14,
        paddingTop: 15,
        paddingBottom:5,
    },

    plantProperties:
    {
        color: Colors.DarkGrey,
        fontSize: 12,
        paddingTop:5,
        paddingBottom:10,
    },

    dash: {
        width: Dimensions.get('window').width*1,
        height: 1,
      },
}
)

export default PrzegladGatunku;