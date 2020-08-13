import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, Button, Alert} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
// import ImagePicker from 'react-native-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {updateTaskDetails} from '../../api/services/task.service';
import NotesScreen from './notes.screen';
import CreateNoteScreen from './create.note.screen';
import AsyncStorage from '@react-native-community/async-storage';
import {getVendorList} from '../../api/services/user.details.service';

export default class TaskDetailsScreen extends Component {
  constructor(props) {
    super(props);
    let taskDetails = props.navigation.getParam('taskDetails');
    this.state = {
      userData: {},
      taskDetails: taskDetails,
      avatarSource: undefined,
      vendors: [],
      selectedVendorId: taskDetails.vendor_assign.data.vendor_id,
      task_status: taskDetails.task_status,
      taskStatus: [
        'emp_approve',
        'emp_reject',
        'vendor_accept',
        'vendor_reject',
      ],
    };
  }

  componentDidMount() {
    this.getVendors();
  }

  render() {
    return (
      <ScrollView>
        <View style={detailPageStyle.container}>
          {this.getImages()}
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Task Id: </Text>
            <Text>{this.state.taskDetails.task_id}</Text>
          </View>
          <View>
            <Text style={detailPageStyle.labelStyle}>Task Description: </Text>
            <Text>{this.state.taskDetails.description}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Task Address: </Text>
            <Text>{this.state.taskDetails.address}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Task Location: </Text>
            <Text>{this.state.taskDetails.location}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Task Privacy: </Text>
            <Text>{this.state.taskDetails.privacy}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Client Name: </Text>
            <Text>{this.state.taskDetails.client_name}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Client Email: </Text>
            <Text>{this.state.taskDetails.client_email}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>
              Client Mobile Number:{' '}
            </Text>
            <Text> {this.state.taskDetails.client_mobile_no}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Task Status: </Text>
            <Text>{this.state.taskDetails.task_status}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Created Date: </Text>
            <Text>{this.state.taskDetails.created_at}</Text>
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Updated Date: </Text>
            <Text>{this.state.taskDetails.updated_at}</Text>
          </View>
          <View>
            <Text style={detailPageStyle.labelStyle}>Vendor: </Text>
            <RNPickerSelect
              placeholder={{
                label: 'Select a vendor',
                color: 'gray',
              }}
              value={this.state.selectedVendorId}
              items={this.state.vendors}
              onValueChange={e => {
                this.setState({
                  selectedVendorId: e,
                });
              }}
            />
          </View>
          <View style={detailPageStyle.labelContainer}>
            <Text style={detailPageStyle.labelStyle}>Vendor Name: </Text>
            <Text>{this.state.taskDetails.vendor_assign.data.vendor_name}</Text>
          </View>
          {this.setActionButtons(this.state.taskDetails.task_status)}
          <View />
        </View>
        <View style={detailPageStyle.container}>
          <NotesScreen Job_Id={this.state.taskDetails.job_id} />
        </View>
        <View style={detailPageStyle.container}>
          <CreateNoteScreen job_id={this.state.taskDetails.job_id} />
        </View>
      </ScrollView>
    );
  }
  getImages = () => {
    let task_images = this.state.taskDetails.task_images.data;
    let images = [];
    if (task_images.length) {
      images = task_images.map(task_image => (
        <Image
          source={{uri: task_image.task_image_url}}
          style={{width: 100, height: 100}}
        />
      ));
      images.push(this.defaultImage());
      return images;
    }
    return this.defaultImage();
  };
  defaultImage = () => {
    return (
      <Text>Image Picker</Text>
      // <TouchableOpacity onPress={
      //     ()=>{
      //         ImagePicker.showImagePicker({
      //             title: 'Upload task image',
      //             storageOptions: {
      //             skipBackup: true,
      //             path: './',
      //             },
      //         }, (response)=>{
      //             if(response.uri){
      //                 this.setState({avatarSource: response});
      //             }
      //         });
      //     }
      // }>
      //     <Image  source={this.state.avatarSource !== undefined ? {uri: this.state.avatarSource.uri} : require('../assets/img/user1.jpg')} style={{width:100, height:100}}/>
      // </TouchableOpacity>
    );
  };
  updateTask = () => {
    let taskDetails = this.state.taskDetails;
    let payload = {
      task_id: taskDetails.task_id,
      task_status: this.state.task_status,
      vendor_id: this.state.selectedVendorId,
      _method: 'PUT',
    };
    if (this.state.avatarSource) {
      payload['task_images[]'] = {
        filename: this.state.avatarSource.fileName,
        data: this.state.avatarSource.data,
        filetype: this.state.avatarSource.type,
      };
    } else {
      payload['task_images[]'] = null;
    }
    console.log('Payload => ', payload);
    updateTaskDetails(
      payload,
      response => {
        console.log(response.data);
        Alert.alert('Success');
      },
      error => {
        console.log(error);
      },
    );
  };
  setActionButtons = status => {
    if (!this.state.taskStatus.includes(status) || status == 'admin_created') {
      return (
        <View style={detailPageStyle.btnContainer}>
          <TouchableOpacity
            style={detailPageStyle.btnAccept}
            onPress={() => {
              if (this.state.userData.role !== null) {
                if (this.state.userData.role.role_name === 'employee') {
                  this.setState({task_status: 'emp_approve'});
                } else {
                  this.setState({task_status: 'vendor_accept'});
                }
              }
              this.updateTask();
            }}>
            <Text style={(detailPageStyle.btnTextColor, {color: '#4CAF50'})}>
              Accept
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={detailPageStyle.btnReject}
            onPress={() => {
              if (this.state.userData.role !== null) {
                if (this.state.userData.role.role_name === 'employee') {
                  this.setState({task_status: 'emp_reject'});
                } else {
                  this.setState({task_status: 'vendor_reject'});
                }
              }
              this.updateTask();
            }}>
            <Text style={(detailPageStyle.btnTextColor, {color: '#f44336'})}>
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={detailPageStyle.btnContainer}>
          <TouchableOpacity
            style={detailPageStyle.btnAccept}
            onPress={() => {
              this.updateTask();
            }}>
            <Text style={(detailPageStyle.btnTextColor, {color: '#4CAF50'})}>
              Update Task
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };
  getVendors = () => {
    onSuccess = async ({data}) => {
      await AsyncStorage.getItem('userData').then(userData => {
        this.setState({userData: JSON.parse(userData)});
      });
      let vendorList = data.map((vendor, index) => {
        return {
          label: vendor.name,
          value: vendor.id,
        };
      });
      this.setState({vendors: vendorList});
    };
    onFailure = e => {
      console.log(e);
    };
    getVendorList(onSuccess, onFailure);
  };
}

const detailPageStyle = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelContainer: {
    flexDirection: 'row',
  },
  labelStyle: {
    fontWeight: 'bold',
  },
  btnAccept: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4CAF50',
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
  },
  btnReject: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#f44336',
    borderRadius: 5,
    margin: 10,
    marginBottom: 0,
  },
  btnTextColor: {
    color: 'white',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
