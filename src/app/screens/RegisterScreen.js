import React from 'react';
import {StyleSheet, Image, ScrollView, Alert} from 'react-native';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-community/async-storage';

import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitButton} from '../components/forms/';
import {
  RegisterService,
  getRolesMasterService,
  getDistrictsMasterService,
  getStatesMasterService,
} from '../../api/services/registration.service';
import {clientToken} from '../../api/core/api-kit';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .max(40)
    .label('Name'),
  email: Yup.string()
    .required()
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(4)
    .label('Password'),
});

const LoginScreen = () => {
  return (
    <Screen style={styles.container}>
      <ScrollView>
        {/* <Image style={styles.logo} source={require("../assets/logo-red.png")} /> */}
        <AppForm
          initialValues={{
            name: 'Vivek',
            mobile_no: '7276864773',
            state_id: '1',
            district_id: '1',
            city: 'Delhi',
            pin_code: '400106',
            email: 'contactvivekvt@gmail.com',
            password: 'vivekvtvt',
            role_id: '2',
          }}
          onSubmit={values => {
            console.log(values);
            const onSucess = ({data}) => {
              console.log(data);
              Alert.alert(
                'Success',
                'You have been successfully registered, Please try to login',
                [
                  {
                    text: 'OK',
                    onPress: async () => {
                      clientToken.setAccessToken(data.token);
                      await AsyncStorage.setItem('isLoggedIn', '1')
                        .then(() => {
                          this.props.navigation.navigate('App');
                        })
                        .catch(console.log);
                    },
                  },
                ],
              );
            };
            const onFailure = error => {
              Alert.alert('Alert', 'Something went wrong please try again.');
              console.log(error);
            };
            RegisterService(values, onSucess, onFailure);
          }}
          validationSchema={validationSchema}>
          <AppFormField name="name" autoCapitalize="none" placeholder="Name" />
          <AppFormField
            name="mobile_no"
            placeholder="Mobile Number"
            keyboardType="numeric"
            maxLength={10}
          />
          <AppFormField maxLength={255} name="state_id" placeholder="State" />
          <AppFormField
            maxLength={255}
            name="district_id"
            placeholder="District"
          />
          <AppFormField maxLength={255} name="city" placeholder="City" />

          <AppFormField
            name="pin_code"
            placeholder="pincode"
            keyboardType="numeric"
            maxLength={10}
          />
          <AppFormField
            name="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <AppFormField
            name="password"
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
          />
          <AppFormField maxLength={255} name="role_id" placeholder="Role" />
          <SubmitButton title="Register" />
        </AppForm>
      </ScrollView>
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
