import notificationscreen from "../screens/notificationscreen";
import MojeRosliny from "../screens/MojeRosliny";
import Gatunki from "../screens/Gatunki";
import DodawanieRosliny from "../screens/DodawanieRosliny";
import React from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';
import { useLogin, useInitial } from './../context/LoginProvider';
import { DefaultTheme } from "@react-navigation/native";

//// DRAWER NAVIGATOR
/// Ten plik zawiera menu rozwijane wyświetlane w lewym górnym rogu aplikacji (tzw. hamburger)

//theme odpowiedzialny za białe tło aplikacji
const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'white'
    },
  };

const Drawer = createDrawerNavigator();

const CustomDrawer = props => {
    const { setIsLoggedIn, profile } = useLogin();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: '#EAF2E0',
                        marginBottom: 20,
                    }}>
                    <View>
                        <Text>{profile.firstname} {profile.surname}</Text>
                        <Text>{profile.mail}</Text>
                    </View>
                </View>
                <DrawerItemList {...props}
                />
            </DrawerContentScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 50,
                    backgroundColor: '#EAF2E0',
                    padding: 20,
                }}
                onPress={() => setIsLoggedIn(false)}
            >
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const DrawerNavigator = () => {

    const { setInitial, initial } = useInitial();
    return (
        <Drawer.Navigator
        initialRouteName= {initial}
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTitle: '',
            }}
            drawerContent={props => <CustomDrawer {...props} />
        }
        >
            <Drawer.Screen name="notificationscreen" component={notificationscreen}
                          options={{
                               drawerActiveBackgroundColor:'#F9F9F9',
                               drawerActiveTintColor:'#777777',
                               drawerInactiveTintColor: '#777777',
                               title: 'Powiadomienia',
                               headerStyle: {
                                   backgroundColor: '#98BF63',
                               },
                               headerTintColor: '#fff',
                               headerTitleStyle: {
                                   fontWeight: 'bold',
                               },
                               cardStyle: {
                                   backgroundColor:'#ffffff',
                               },
                                                           
                           }}/>
            <Drawer.Screen name="MojeRosliny" component={MojeRosliny}
                           options={{
                            drawerActiveBackgroundColor:'#F9F9F9',
                            drawerActiveTintColor:'#777777',
                            drawerInactiveTintColor: '#777777',
                               title: 'Moje Rosliny',
                               headerStyle: {
                                   backgroundColor: '#98BF63',
                               },
                               headerTintColor: '#fff',
                               headerTitleStyle: {
                                   fontWeight: 'bold',
                               },
                           }}/>
                           <Drawer.Screen name="Gatunki" component={Gatunki}
                           options={{
                            drawerActiveBackgroundColor:'#F9F9F9',
                            drawerActiveTintColor:'#777777',
                            drawerInactiveTintColor: '#777777',
                               title: 'Gatunki',
                               headerStyle: {
                                   backgroundColor: '#98BF63',
                               },
                               headerTintColor: '#fff',
                               headerTitleStyle: {
                                   fontWeight: 'bold',
                               },
                           }}/>
                           <Drawer.Screen name="DodawanieRosliny" component={DodawanieRosliny}
                           options={{
                            drawerActiveBackgroundColor:'#F9F9F9',
                            drawerActiveTintColor:'#777777',
                            drawerInactiveTintColor: '#777777',
                               title: 'Dodaj roślinę',
                               headerStyle: {
                                   backgroundColor: '#98BF63',
                               },
                               headerTintColor: '#fff',
                               headerTitleStyle: {
                                   fontWeight: 'bold',
                               },
                           }}/>
                           
                           
                           
        </Drawer.Navigator>

    );
}

export default DrawerNavigator;