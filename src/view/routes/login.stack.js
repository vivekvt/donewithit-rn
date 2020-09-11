import {createStackNavigator} from 'react-navigation-stack';
// import LoginScreen from '../screens/login.screen';
import LoginScreen from '../../app/screens/LoginScreen';
import RegistrationScreen from '../../app/screens/RegisterScreen';
import WelcomeScreen from '../../app/screens/WelcomeScreen';
// import {RegistrationScreen} from '../screens/registration.screen';

import TaskScreen from '../screens/TaskScreen';

const screens = {
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
  },
  Registration: {
    screen: RegistrationScreen,
  },
};

const LoginStack = createStackNavigator(screens);

export default LoginStack;
