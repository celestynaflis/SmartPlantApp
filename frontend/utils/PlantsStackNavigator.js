import React from "react";
import {
    createStackNavigator
} from '@react-navigation/stack';
import { DefaultTheme } from "@react-navigation/native";
import PrzegladRosliny from "../screens/PrzegladRosliny";

//// Stack NAVIGATOR
/// Ten plik zawiera stos nawigacji, który odpowiedzialny jest za nawigację po wybraniu ekranu 'MojeRosliny'

const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

const Stack = createStackNavigator();

const StackNavigator = props =>
{
    return(
        <Stack.Navigator>
            <Stack.Screen name="przegladrosliny" component={PrzegladRosliny}
            options={{
                title: '',
                headerStyle: {
                    backgroundColor: '#98BF63',
                    textAlign: 'center',
                },
                cardStyle: {
                  backgroundColor: "#ffffff",
              },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}/>

        </Stack.Navigator>


    );
}

export default StackNavigator;
