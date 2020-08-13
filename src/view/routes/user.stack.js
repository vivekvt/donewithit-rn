import { createStackNavigator } from "react-navigation-stack";
import ProfileScreen from "../screens/profile.screen";
import { createDrawerNavigator } from 'react-navigation-drawer';
import TasksScreen from "../screens/tasks.screen";
import TaskDetailsScreen from "../screens/task.details.screen";
import { CustomDrawerContentComponent } from "../components/custome.navigation.cmp";

const ProfileStack = createStackNavigator({
    "ProfileStack": {
        screen: ProfileScreen,
        navigationOptions: {
            headerTitle:"Profile",
            headerTitleAlign: 'center'
        }
    }
});

const TasksStack = createStackNavigator({
    "TasksStack": {
        screen: TasksScreen,
        navigationOptions: {
            headerTitle:"Tasks"
        }
    },
    "TaskDetailsStack": {
        screen: TaskDetailsScreen,
        navigationOptions: {
            headerTitle:"Tasks Details"
        }
    }
},
{
    initialRouteName: 'TasksStack',
    defaultNavigationOptions: {
        headerTitleAlign: 'center'
    }
});

const screens = {
    'Profile': {
        screen: ProfileStack
    },
    'Tasks' :{
        screen: TasksStack
    }
}

const UserStack = createDrawerNavigator(
    screens,
    {
        initialRouteName: 'Tasks',
        contentComponent: CustomDrawerContentComponent
    }
);

export default UserStack;