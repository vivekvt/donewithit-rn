import React, {useState} from 'react';
import {StyleSheet, Image, Alert} from 'react-native';
import * as Yup from 'yup';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import LoginService from '../../api/services/login.service';
import {clientToken} from '../../api/core/api-kit';
// import {clientToken} from '../../api/core/api-kit';

import Screen from '../components/Screen';
// import authApi from "../api/auth";
import {
  ErrorMessage,
  AppForm,
  AppFormField,
  SubmitButton,
} from '../components/forms/';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(1)
    .label('Password'),
});

const LoginScreen = props => {
  const [loginFailed, setLoginFailed] = useState(false);
  const handleSubmit = ({email, password}) => {
    // this.setState({isLoading: true});
    // const {email, password} = this.state;
    const payload = {email, password};

    const onSuccess = async ({data}) => {
      await AsyncStorage.setItem('userData', JSON.stringify(data.user.data));
      await AsyncStorage.setItem('isLoggedIn', '1')
        .then(() => {
          clientToken.setAccessToken(data.token);
          // this.setState({isLoading: false});
          props.navigation.navigate('App');
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    const onFailure = error => {
      console.log(error);
      // this.setState({isLoading: false});
      Alert.alert(
        'Failed To Login',
        'You have entered wrong username or password.',
      );
    };
    LoginService(payload, onSuccess, onFailure);

    // // this.setState({isLoading: true});
    // // const {email, password} = this.state;
    // const payload = {email, password};

    // const onSuccess = async ({data}) => {
    //   console.log(data);
    //   await AsyncStorage.setItem('userData', JSON.stringify(data.user.data));
    //   await AsyncStorage.setItem('isLoggedIn', '1')
    //     .then(() => {
    //       clientToken.setAccessToken(data.token);
    //       // this.setState({isLoading: false});
    //       props.navigation.navigate('App');
    //     })
    //     .catch(function(error) {
    //       console.log('error, ', error);
    //     });
    // };

    // const onFailure = error => {
    //   console.log('=========error');
    //   console.log(error);
    //   // this.setState({isLoading: false});
    //   // this.props.navigation.navigate('App');
    //   Alert.alert(
    //     'Failed To Login',
    //     'You have entered wrong username or password.',
    //   );
    // };
    // LoginService(payload, onSuccess, onFailure);
  };
  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo-red.png')} />
      <AppForm
        initialValues={{email: 'new@gmail.com', password: 'new'}}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <ErrorMessage
          error="Invalid email and/or password"
          visible={loginFailed}
        />
        <AppFormField
          name="email"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          icon="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <AppFormField
          name="password"
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
        />
        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
