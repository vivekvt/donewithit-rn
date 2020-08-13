import React, {Component} from 'react';
import {Text, StyleSheet, Image, Button, Alert} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {createNote} from '../../api/services/task.service';
// import ImagePicker from 'react-native-image-picker';

export default class CreateNoteScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        job_id: props.job_id,
        date: '',
      },
    };
  }
  render() {
    return (
      <ScrollView>
        <Text style={notesStyle.heading}>Add new note: </Text>
        <TextInput
          placeholder={'Job Id'}
          editable={false}
          value={this.state.note.job_id}
        />
        <TextInput
          placeholder={'Note Name'}
          editable={true}
          value={this.state.note.note_name}
          onChangeText={note_name => {
            this.setState({...this.state.note, note_name});
          }}
        />
        <TextInput
          placeholder={'Summary'}
          editable={true}
          value={this.state.note.summary}
          onChangeText={summary => {
            this.setState({...this.state.note, summary});
          }}
        />
        {/* <TouchableOpacity onPress={
                    ()=>{
                        ImagePicker.showImagePicker({
                            title: 'Upload task image',
                            storageOptions: {
                            skipBackup: true,
                            path: './',
                            },
                        }, (response)=>{
                            if(response.uri){
                                this.setState({...this.state.note, ["note_images[]"]: response});
                            }
                        });
                    }
                }>
                    <Image  source={this.state.note["note_images[]"] !== undefined ? {uri: this.state.note["note_images[]"]} : require('../assets/img/user1.jpg')} style={{width:100, height:100}}/>
                </TouchableOpacity> */}
        <Button title="Add Note" onPress={() => this.addNote()} />
      </ScrollView>
    );
  }

  addNote = () => {
    var newDateInst = new Date();
    var currentDate =
      newDateInst.getFullYear() +
      '-' +
      (newDateInst.getMonth() + 1) +
      '-' +
      newDateInst.getDate();
    var payload = {
      job_id: this.state.note.job_id,
      note_name: this.state.note_name,
      summary: this.state.summary,
      date: currentDate,
      'note_images[]': '',
    };
    onSuccess = ({data}) => {
      if (data.data !== undefined) {
        Alert.alert(
          'Note updated',
          'The Note has been updated successfully...',
        );
      } else {
        Alert.alert('Opps', 'Something went wrong');
      }
    };
    onFailure = e => {
      console.log(e);
    };
    createNote(payload, onSuccess, onFailure);
  };
}

var notesStyle = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
