import React from 'react';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function Logout(props) {
    return (
        <Button 
        title='Logout'
        onPress = {async () => {
            await AsyncStorage.clear()
            .then(()=>{props.navigation.navigate('Auth');})
            .catch(console.log);
        }}/>
    );  
}