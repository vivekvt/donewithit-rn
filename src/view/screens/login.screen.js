import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import LoginService from '../../api/services/login.service';
import {clientToken} from '../../api/core/api-kit';

/**************************** MAIN CLASS - [START] *****************************/

class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator>
          <StatusBar barStyle="default" />
        </ActivityIndicator>
      );
    } else {
      return (
        <View style={loginStyles.container}>
          <Text style={loginStyles.emptytext} />
          <Image
            style={loginStyles.img1}
            source={require('../assets/img/logo.jpg')}
          />
          <Text style={loginStyles.singin}>SIGN-IN</Text>

          <View style={loginStyles.emailinput}>
            <TextInput
              //   style={loginStyles.emailinput1}
              placeholder={'EMAIL'}
              autoCompleteType={'email'}
              keyboardType={'email-address'}
              value={this.state.email}
              onChangeText={this.onUsernameChange}
              style={styles.input}
            />
          </View>

          {/* Username - [END] */}

          {/* PassWord - [START] */}
          <View style={loginStyles.emailinput}>
            <TextInput
              style={loginStyles.emailinput1}
              placeholder={'PASSWORD'}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={this.onPasswordChange}
            />
          </View>
          {/* <View style={{flex: 1}}> */}
          <Text style={loginStyles.forgetpass}>Forget Password ?</Text>
          {/* </View> */}
          {/* PassWord - [END] */}

          <View style={[{width: '76%', margin: 10, backgroundColor: 'black'}]}>
            <Button
              color="#234191"
              title="LOGIN"
              onPress={this.onPressLogin.bind(this)}
            />
          </View>
          <Text>OR</Text>
          <View style={[{margin: 10}]}>
            {/* <Button
                            title="REGISTER"
                            color="#cccccc"
                            onPress={() => this.onRegister(this.props)}>
                        </Button> */}
            <Text>
              Don't have an account ?
              <Text
                onPress={() => this.onRegister(this.props)}
                style={[{color: 'red'}]}>
                {' '}
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      );
    }
  }

  /* Helper Functions - [START] */

  onUsernameChange = email => {
    this.setState({email});
  };

  onPasswordChange = password => {
    this.setState({password});
  };

  onPressLogin() {
    this.setState({isLoading: true});
    const {email, password} = this.state;
    const payload = {email, password};

    const onSuccess = async ({data}) => {
      await AsyncStorage.setItem('userData', JSON.stringify(data.user.data));
      await AsyncStorage.setItem('isLoggedIn', '1')
        .then(() => {
          clientToken.setAccessToken(data.token);
          this.setState({isLoading: false});
          this.props.navigation.navigate('App');
        })
        .catch(function(error) {
          // console.log(error);
        });
    };

    const onFailure = error => {
      // console.log(error);
      this.setState({isLoading: false});
      Alert.alert(
        'Failed To Login',
        'You have entered wrong username or password.',
      );
    };
    LoginService(payload, onSuccess, onFailure);
  }

  onRegister(props) {
    props.navigation.navigate('Registration');
  }

  /* Helper Functions - [END] */
}

export default LoginScreen;

/**************************** MAIN CLASS - [START] *****************************/

/******************* Login Pages Styles - [START] ******************************/

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: 'darkslateblue',
    fontSize: 30,
  },
  subtext: {
    marginTop: 20,
    color: 'gray',
    fontSize: 20,
  },
  emailinput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 30,
    width: '76%',
  },
  forgetpass: {
    marginLeft: '45%',
    paddingBottom: 10,
    color: 'red',
  },
  emailinput1: {
    fontSize: 18,
    alignSelf: 'auto',
    // color: 'red',
  },
  singin: {
    marginBottom: 20,
    marginTop: '17%',
    fontSize: 23,
  },
  img1: {
    width: '30%',
    height: '10%',
  },
  emptytext: {
    marginBottom: 80,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    // padding: Styles.width * 0.1,
  },
  label: {
    fontWeight: 'bold',
    // fontSize: Styles.FontSize.medium,
    // color: Color.blackTextPrimary,
    marginTop: 20,
  },

  input: {
    borderBottomWidth: 1,
    // borderColor: text,
    height: 40,
    marginTop: 10,
    padding: 0,
    margin: 0,
    // flex: 1,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
    // color: text,
  },
  signUpButton: {
    marginTop: 20,
    // backgroundColor: Color.primary,
    borderRadius: 5,
    elevation: 1,
  },
  switchWrap: {
    // ...Styles.Common.RowCenterLeft,
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    // color: Color.blackTextSecondary,
  },
});

/******************* Login Pages Styles - [END] ******************************/
