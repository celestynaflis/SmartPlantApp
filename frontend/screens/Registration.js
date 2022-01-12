import React, {useState} from 'react';
import Box from '../components/boxes';
import post, {default as axios} from 'axios';
import { 
  Text,
  View, 
  StyleSheet, 
  ScrollView, 
  Alert, 
  TextInput, 
  TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';
import IP from '../constants/ip';

const Registration = ({navigation}) =>
{
  //zmienne stanu (hooks useState) przechiwujące dane z text inputów
    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [pass2, setPass2] = useState('');

    //funkcje odpowiedzialne za pobieranie danych z inputów
    const nameInputHandler = (enteredName) => {
      setName(enteredName);
    };

    const secondNameInputHandler = (enteredSecondName) => {
      setSecondName(enteredSecondName);
    };

    const emailInputHandler = (enteredEmail) => {
      var lowerEmail = enteredEmail.toLowerCase();
      setEmail(lowerEmail);
    };

    const passInputHandler = (enteredPass) => {
      setPass(enteredPass);
    };

    const pass2InputHandler = (enteredPass2) => {
      setPass2(enteredPass2);
    };

    //wyświetlanie alertów na ekranie 
    const showPassAlert = () =>
  Alert.alert(
    "Hasła nie są takie same!",
    "Hasła muszą być takie same.",
  );

  const showEmailAlert = () =>
  Alert.alert(
    "Wprowadzono niepoprawny mail",
    "Jesteś pewny, że wpisałeś odpowiedni adres email?",
  );

  const showSuccessAlert = () =>
  Alert.alert(
    "Utworzono konto",
    "Konto zostało utworzone! Możesz się zalogować.",
    navigation.navigate('Login'),
  );

  const showErrorAlert = () =>
  Alert.alert(
    "Błąd",
    "Konto nie zostało utworzone. Spróbuj ponownie.",
  );

  const showMailErrorAlert = () =>
    Alert.alert(
        "Błąd",
        "Konto o podanym adresie e-mail juz istnieje.",
    );

  const emptyInputsError = () =>
  Alert.alert(
    "Nie uzupełniono wszystkich danych",
    "Należy uzupełnić wszystkie pola.",
  );

  //funkcja sprawdzająca czy konkretne warunki rejestracji są spełnione np. te same hasła, poprawny format maila itd. (jeśli nei - wyświetlanie odpowiednich alertów)
  const showData = async () => {
    if (pass2 != pass){
      return (
          showPassAlert()
      )}
      if (email.includes("@")==false)
      {
        return(
          showEmailAlert()
        )
      }
      if(name == "" || secondName == "" || email =="" || pass=="")
      {
        return(
          emptyInputsError()
        )
      }
      

    //pobieranie ostniejących użytkowników z bazy
        const res = await axios.post("http://"+ IP.ip +"/users", newUser)
            .then((response) => {
                showSuccessAlert();
                console.log(response);
            }, (error) => {
                console.log(error);
                showErrorAlert();
            });}


      //dane nowego użytkownika
        const createAccount = async () =>{
          const newUser = {
          firstname: name,
          surname: secondName,
          mail: email,
          password: pass,
      };

        //funkcja odpowiedzialna za zapis użytkownika w bazie danych (ze wcześniejszym sprawdzeniem, czy użytkownik o takim mailu nie znajduje się już w bazie)
      const axios = require('axios').default;

        const re = await axios.get("http://"+ IP.ip +"/users").then(resp => {
            const arr =[{},{}]=resp.data;
            console.log({email});

            const mailObject = {} ={email};
            const wprowadzonyMail =mailObject.email;

            let czymailistnieje = false;
            for (let i=0; i<arr.length; i++)
            {
                if (arr[i].mail === wprowadzonyMail) czymailistnieje = true;
            }
            if(czymailistnieje) {showMailErrorAlert()} else {createAccount()} ;
        });
      }

    return(
    <ScrollView>
            <View style = {styles.container2}>
          <Text style = {styles.intro_text}>Zarejestruj się w SmartPlant!</Text>
          </View>

          <TextInput
        style={styles.input}
        onChangeText={nameInputHandler}
        value={name}
        placeholder="Imię"
        keyboardType="default"
          />

      <TextInput
        style={styles.input}
        onChangeText={secondNameInputHandler}
        value={secondName}
        placeholder="Nazwisko"
        keyboardType="default"
      />

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
        value={pass}
        placeholder="Hasło"
        keyboardType="default"
      />

      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={pass2InputHandler}
        value={pass2}
        placeholder="Powtórz hasło"
        keyboardType="default"
      />

      <View style={styles.container2}>
        <TouchableOpacity onPress={showData}>
          <Box colorHex={Colors.Green} colorTextHex={Colors.VeryLightGrey} TextInside="Załóż konto!"></Box>
        </TouchableOpacity>
      </View>
    </ScrollView>
        
    );
};

//arkusze stylów
const styles = StyleSheet.create({

    container2: {
        paddingHorizontal: 10,
        paddingTop:20,
        marginBottom: 10,
      },

      intro_text:
    {
      textAlign: 'center',
      color: Colors.Green, 
      fontSize: 20,
      lineHeight:22,
      letterSpacing: 0.05,
    },

    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: Colors.Grey,
      borderRadius: 10,
    },

});

export default Registration;