import React, { Component } from  'react';
import { 
  StyleSheet, 
  View, 
  ActivityIndicator, 
  StatusBar 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginStack from "./src/view/routes/login.stack";
import UserStack from "./src/view/routes/user.stack";
import { 
  createAppContainer, 
  createSwitchNavigator
} from 'react-navigation';
import 'react-native-gesture-handler';


class AuthLoadingScreen extends Component {
  constructor(props){
    super(props);
    this.loadData();
  }
  render(){
    return (
      <View style={styles.container}>
        <ActivityIndicator/>
        <StatusBar barStyle="default" />
      </View>
    );
  };
  loadData = async() => {
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn!=='1' ? 'Auth' : 'App');
  };
}
export default createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: UserStack,
  Auth: LoginStack
  },{
    initialRouteName: 'AuthLoading'
  }
))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  }
});
