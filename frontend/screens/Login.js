import React, {useState} from 'react';
import Box from '../components/boxes';
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity, Alert, Dimensions,
} from 'react-native';
import Colors from '../constants/colors';
import { useLogin } from '../context/LoginProvider';
import IP from '../constants/ip';


const Login = () =>
{
    const { setIsLoggedIn, setProfile } = useLogin();
    const [data, setData] = React.useState([]);
    const [email, onChangeEmail] = React.useState(null);
    const [haslo, onChangeHaslo] = React.useState(null);

    const emailInputHandler = (enteredEmail) => {
        onChangeEmail(enteredEmail);
    };

    const passInputHandler = (enteredHaslo) => {
        onChangeHaslo(enteredHaslo);
    };

    const showErrorAlert = () =>
        Alert.alert(
            "Blad logowania!",
            "Hasło lub login sa niepoprawne.",
        );

    const showSuccessAlert = () =>
        Alert.alert(
            "Logowanie zakonczone sukcesem",
            "Zostales przekierowany do swojego konta",
        );

        //funkcja odpowiedzialna za działania po naciśnięciu przycisku (logowanie)
    const onPressLogin = async () => {
        const axios = require('axios').default;
        const res = await axios.get("http://"+ IP.ip +"/users").then(resp => {
            const arr =[{},{}]=resp.data;
            const mailObject = {} ={email};
            const hasloObject ={}={haslo};
            const wprowadzonyMail =mailObject.email;
            const wprowadzoneHaslo= hasloObject.haslo;

            let czyzaloguje = false;
            for (let i=0; i<arr.length; i++)
            {
                if ((arr[i].mail === wprowadzonyMail)&&(arr[i].password === wprowadzoneHaslo))
                {
                    setProfile(arr[i]);
                    czyzaloguje = true;
                }

            }
            if(czyzaloguje) {
                showSuccessAlert();
                setIsLoggedIn(true);
            } else {showErrorAlert()};
        });
    };

        return(
        <ScrollView>
            <View style = {styles.container2}>
                <Text style = {styles.intro_text}>Zaloguj się do SmartPlant!</Text>
            </View>

            <TextInput
                style={styles.input}
                onChangeText={emailInputHandler}
                value={email}
                placeholder="Adres e-mail"
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={passInputHandler}
                value={haslo}
                placeholder="Haslo"
                keyboardType="default"
            />
            <View style = {styles.mountaincontainer} >
                <Image style = {styles.pic}
                       source={require('../assets/loginpic.png')}
                />
                <TouchableOpacity style={styles.loginbox} onPress={onPressLogin}>
                    <Box colorHex={Colors.Green} colorTextHex={Colors.VeryLightGrey} TextInside="Zaloguj" width={100}></Box>
                </TouchableOpacity>
                <Image style = {styles.background}
                       source={require('../assets/background.png')}
                />
                </View>

            
        </ScrollView>
    );
};

const styles =StyleSheet.create({

    container2: {
        paddingHorizontal: 10,
        paddingTop:20,
        marginBottom: 10,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: Colors.Grey,
        borderRadius: 10,
    },

    intro_text:
    {
        textAlign: 'center',
        color: Colors.Green,
        fontSize: 20,
        lineHeight:22,
        letterSpacing: 0.05,
    },

    mountaincontainer:
        {
            justifyContent: 'center',
            alignItems: 'center',
        },

    pic:
        {
            justifyContent: 'center',
            width: Dimensions.get('window').width*1,
            height: Dimensions.get('window').width*1.5,
        },

        loginbox:
        {
            marginTop: -Dimensions.get('window').width*0.7,
            width: Dimensions.get('window').width*0.9,
        },

        background:
        {
            justifyContent: 'center',
            width: Dimensions.get('window').width*1,
            height: Dimensions.get('window').width*0.3,

        }
});

export default Login;