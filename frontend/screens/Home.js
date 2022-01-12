import React from 'react';
import Box from '../components/boxes';
import { Text, 
  View, 
  StyleSheet,
  ScrollView, 
  Image,
  TouchableOpacity} from 'react-native';
import Colors from '../constants/colors';

const Home = ( {navigation} ) =>
{
    return(
          <ScrollView>
    
          <View style = {styles.container}>
           <Text style = {styles.logo_text}>Smart Plant</Text> 
          </View>
    
          <View style = {styles.container2}>
          <Text style = {styles.intro_text}>Twój osobisty asystent do pielęgnacji roślin</Text>
          </View>
    
          <View style = {styles.logocontainer}>
          <Image style = {styles.logo}
            source={require('../assets/Logo.png')}
          />
          </View>
    
          <View>
             <View>
             <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
                 <Box colorHex={Colors.LightGreen} colorTextHex={Colors.Green} TextInside="Rejestracja"></Box>
                 </TouchableOpacity>
         </View>

         <View>
         <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                 <Box colorHex={Colors.Green} colorTextHex={Colors.VeryLightGrey} TextInside="Logowanie"></Box>
                 </TouchableOpacity>
         </View>
         </View>
          </ScrollView>
    
);
};

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      paddingTop:30,
      marginBottom: 10,
    },
  
    container2: {
      paddingHorizontal: 10,
      paddingTop:20,
      marginBottom: 10,
    },
  
    logocontainer: 
    {
      marginTop: 80,
      marginBottom:70,
      justifyContent: 'center',
      alignItems: 'center',
    },

    logo_text:
    {
      textAlign: 'center',
      color: Colors.Green, 
      fontSize: 36,
    },
  
    intro_text:
    {
      textAlign: 'center',
      color: Colors.DarkGreen, 
      fontSize: 18,
      lineHeight:22,
      letterSpacing: 0.05,
    },
  
    logo:
    {
      justifyContent: 'center',
      width: 101,
      height: 146,
    }
  
  });

  export default Home;