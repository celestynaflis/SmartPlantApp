import React from "react";
import {
    createStackNavigator,
    } from '@react-navigation/stack';
import { useId } from './../context/LoginProvider';
import { DefaultTheme } from "@react-navigation/native";
import PrzegladGatunku from "../screens/PrzegladGatunku";

//// Stack NAVIGATOR
/// Ten plik zawiera stos nawigacji, który odpowiedzialny jest za nawigację po wybraniu ekranu 'Gatunki'

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
            <Stack.Screen name="przegladgatunku" component={PrzegladGatunku}
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
