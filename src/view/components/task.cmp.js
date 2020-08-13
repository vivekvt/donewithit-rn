import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Task(props) {
    return (
        <TouchableOpacity style={taskStyle.card} onPress={()=>{console.log(props.navigation.navigate("TaskDetailsStack",{taskDetails: props.task}))}}>
            <View style={taskStyle.fieldContainer}>
                <View style={taskStyle.cardImage}>
                    {
                        checkForImage(props.task)
                    }
                </View>
                <View style={taskStyle.textContent}>
                        <View style={taskStyle.fieldContainer}>
                            <Text style={taskStyle.fieldHeading}>ID: </Text>
                            <Text>{convertToString(props.task.job_id)}</Text>
                        </View>
                        <View style={taskStyle.fieldContainer}>
                            <Text style={taskStyle.fieldHeading}>LOCATION: </Text>
                            <Text>{convertToString(props.task.location)}</Text>
                        </View>
                        <View style={taskStyle.fieldContainer}>
                            <Text style={taskStyle.fieldHeading}>DESCRIPTION: </Text>
                            <Text>{convertToString(props.task.description)}</Text>
                        </View>
                        <View style={taskStyle.fieldContainer}>
                            <Text style={taskStyle.fieldHeading}>CREATED DATE: </Text>
                            <Text>{convertToString(props.task.created_at)}</Text>
                        </View>
                        <View style={taskStyle.fieldContainer}>
                            <TouchableOpacity 
                                style={taskStyle.btnNormal}
                                onPress={()=>{Linking.openURL(`tel:${props.task.client_mobile_no}`)}}
                            >
                                <Text style={taskStyle.btnTextColor,{color:"#008CBA"}}>Call</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
    );    
}

function convertToString(param){
    return param.toString();
}

function checkForImage(data) {
    if(data.task_images.data && data.task_images.data.length){
        return <Image source={{uri: data.task_images.data[0].task_image_url}} style={{width:100, height:100}}/>
    }
    return <Image source={require('../assets/img/user1.jpg')} style={{width:100, height:100}}/>
}

var taskStyle = StyleSheet.create(
    {
        card: {
            margin:10,
            padding:10,
            backgroundColor: 'white',
            borderRadius:5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        cardImage:{
            justifyContent: "center",
        },
        fieldContainer:{
            flexDirection: 'row',   
        },
        fieldHeading: {
            fontWeight: 'bold'
        },
        textContent: {
            paddingLeft:10,
        },
        btnNormal:{
            paddingHorizontal: 15,
            paddingVertical:5,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#008CBA",
            borderRadius:5,
            margin:10,
            marginBottom:0,
            marginLeft:0
        },
        btnTextColor: {
            color:"white"
        }
    }
)