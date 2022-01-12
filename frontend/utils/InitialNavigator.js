import React, { useContext } from 'react';
import Home from "../screens/Home";
import Registration from "../screens/Registration";
import Login from "../screens/Login";
import { useLogin, useId, useInitial } from './../context/LoginProvider';
import {createStackNavigator} from "@react-navigation/stack";
import DrawerNavigator from "./DrawerNavigator";
import SpeciesStackNavigator from "./SpeciesStackNavigator";
import PlantsStackNavigator from "./PlantsStackNavigator";

//Ten plik zawiera początkową nawigację (Stack - opartą o stos), która wyświetla się po uruchomieniu aplikacji
// na samym dole znajdują się warunki, które odpowiadają za zmianę nawigatora na inny niż początkowy

const Stack = createStackNavigator();

const StackNavigator =() =>{
    return (
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}
                      options={{
                          title: 'Hello!',
                          headerStyle: {
                              backgroundColor: '#98BF63',
                          },
                          cardStyle: {
                            backgroundColor: "#ffffff",
                        },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}/>
        <Stack.Screen name="Registration" component={Registration}
                      options={{
                          title: 'Rejestracja',
                          headerStyle: {
                              backgroundColor: '#98BF63',
                          },
                          cardStyle: {
                            backgroundColor: "#ffffff",
                        },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}/>
        <Stack.Screen name="Login" component={Login}
                      options={{
                          title: 'Logowanie',
                          headerStyle: {
                              backgroundColor: '#98BF63',
                          },
                          cardStyle: {
                            backgroundColor: "#ffffff",
                        },
                          headerTintColor: '#fff',
                          headerTitleStyle: {
                              fontWeight: 'bold',
                          },
                      }}
        />
    </Stack.Navigator>);
};

const InitialStack = () => {
    const { isLoggedIn } = useLogin();
    const { isChosen, isPlantChosen} = useId();
    const { initial } = useInitial();

    if((isLoggedIn === true) && (isChosen === true))
    {
        return <SpeciesStackNavigator/>
    }else if((isLoggedIn === true) && (isPlantChosen === true))
    {
        return <PlantsStackNavigator/>
    }
    else if(isLoggedIn === true)
    {
       return <DrawerNavigator initialRouteName={initial}/>
    } 
    else return <StackNavigator/>
};

export default InitialStack;