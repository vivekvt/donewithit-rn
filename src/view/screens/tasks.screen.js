import React, { Component } from 'react';
import { ActivityIndicator, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getTaskList } from "../../api/services/task.service";
import Task from "../components/task.cmp";
import AsyncStorage from '@react-native-community/async-storage';
import Hamburger from "../components/hamburger";
export default class TasksScreen extends Component {

    static navigationOptions = ({navigation})=> {
        return {
            headerLeft: () => (
                <Hamburger navigation={navigation}/>
            )
        }
    };

    constructor(props){
        super(props);
        this.state = {
            taskList: []
        }
        this.getTaskListData();
    }

    render(){
        if(this.state.taskList.length > 0 ){
            return (
                <ScrollView>
                    {
                        this.state.taskList.map((task) => (<Task key={task.job_id} task={task} navigation={this.props.navigation}/>))
                    }
                </ScrollView>
            );
        }
        else {
           return (
                <ActivityIndicator>
                    <StatusBar barStyle="light-content" />
                </ActivityIndicator>
            );
        }
    }; 

    getTaskListData = async() => {
        const userData = JSON.parse(await AsyncStorage.getItem('userData'));
        const roleName = (userData.role !== null) ? userData.role.role_name : 'employee';
        getTaskList(roleName ,({data})=>{
            console.log(data);
            this.setState({taskList: data.data});
        },
        async(error) => {
            console.log('Error => ', error);
            await AsyncStorage.clear()
            .then(()=>{this.props.navigation.navigate('Auth')})
            .catch(console.log);
        });
    }   
}
