import React, { Component } from 'react';
import { Text, StyleSheet } from "react-native";
import { ScrollView } from 'react-native-gesture-handler';
import { getNotes } from "../../api/services/task.service";

export default class NotesScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            notes: []
        }
        this.getAllNotes();
    }

    render(){

        if(this.state.notes.length > 0){
            return (
                <ScrollView>
                    <Text style={notesStyle.heading}>NOTES</Text>
                    <Text>
                        {
                            JSON.stringify(this.state.notes)
                        }
                    </Text>
                </ScrollView>
            );
        }else{
            return (
            <ScrollView>
                <Text style={notesStyle.heading}>NOTES</Text>
                <Text>
                    0 Notes Found
                </Text>
            </ScrollView>
            );
        }
    }
    getAllNotes() {
        getNotes(
        ({data})=>{
            let jobId = (this.props.Job_Id).toString();
            // console.log('JOB ID => ',jobId);
            let notesOfJobId = data.data.filter((note)=>note.job_id == jobId);
            // console.log('All Notes => ',notesOfJobId);
            // console.log(data.data);
            if(notesOfJobId != undefined){
                this.setState({notes: notesOfJobId});
            }
        },
        (error)=>{
            console.log(error);
        });
    }
}

var notesStyle = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 10
    }
});