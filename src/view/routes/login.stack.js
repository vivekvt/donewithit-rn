import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "../screens/login.screen";
import { RegistrationScreen } from "../screens/registration.screen";

const screens = {
    Login: {
        screen: LoginScreen
    },
    Registration: {
        screen: RegistrationScreen
    }
}

const LoginStack = createStackNavigator(screens);

export default LoginStack;