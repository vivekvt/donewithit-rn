import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    Text,
    Button,
    ActivityIndicator,
    StatusBar
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import {
    getUserDetails,
    updateUserDetails
} from "../../api/services/user.details.service";
import RNPickerSelect from 'react-native-picker-select';
import {
    getRolesMasterService,
    getDistrictsMasterService,
    getStatesMasterService
} from '../../api/services/registration.service';
import Hamburger from "../components/hamburger";

class ProfileScreen extends Component {

    static navigationOptions = ({navigation})=> {
        return {
            headerLeft: () => (
                <Hamburger navigation={navigation}/>
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isloading: true,
            userInfo: '',
            userInfoEditable: false,
            updateBtnTitle: 'Edit',
            statesMaster: [],
            districtsMaster: [],
            rolesMaster: []
        }; 
    }

    componentDidMount() {
       Promise.all([
        this.getUserInfo(),
        this.addStatesToView(),
        this.addDistrictsToView(),
        this.addRolesToView()
       ])
       .then(()=>{this.setState({isloading:false})})
       .catch((error)=>{
        console.log('Error => ', error);
       });
    }

    render() {
        if (this.state.isloading) {
            return (
                <ActivityIndicator style={ProfileStyles.container}>
                    <StatusBar barStyle="light-content" />
                </ActivityIndicator>
            );
        } else {
            return (
                <View style={ProfileStyles.container}>
                    <Text style={ProfileStyles.profiltext}>Add your Profile to get more attention</Text>
                    <Image style={ProfileStyles.img1} source={require('../assets/img/user1.jpg')} />
                    <View style={ProfileStyles.emailinput}>
                        <TextInput style={ProfileStyles.emailinput1}
                            placeholder={"NAME"}
                            editable={false}
                            value={this.state.userInfo.name}
                            onChangeText={(name) => { this.setState({ userInfo: { ...this.state.userInfo, name } }) }}
                        />
                    </View>
                    <View style={ProfileStyles.emailinput}>
                        <TextInput style={ProfileStyles.emailinput1}
                            placeholder={"MOBILE NUMBER"}
                            value={this.state.userInfo.contactNo}
                            onChangeText={(contactNo) => { this.setState({ userInfo: { ...this.state.userInfo, contactNo } }) }}
                        />
                    </View>
                    <View style={ProfileStyles.emailinput}>
                        <RNPickerSelect placeholder={{ label: 'SELECT A STATE' }} style={ProfileStyles.emailinput1}
                            value={this.state.userInfo.state_id}
                            onValueChange={(state_id) => { this.setState({ userInfo: { ...this.state.userInfo, state_id } }) }}
                            items={this.state.statesMaster}
                            disabled={true}
                        />
                    </View>
                    <View style={ProfileStyles.emailinput}>
                        <RNPickerSelect placeholder={{ label: 'SELECT A DISTRICT' }}
                            style={ProfileStyles.emailinput1}
                            value={this.state.userInfo.district_id}
                            onValueChange={(district_id) => { this.setState({ userInfo: { ...this.state.userInfo, district_id } }) }}
                            items={this.state.districtsMaster}
                            disabled={true}
                        />
                    </View>
                    <View style={ProfileStyles.emailinput}>
                        <TextInput style={ProfileStyles.emailinput1}
                            placeholder={"CITY"}
                            value={this.state.userInfo.city}
                            onChangeText={(city) => { this.setState({ userInfo: { ...this.state.userInfo, city } }) }}
                        />
                    </View>
                    <View style={ProfileStyles.emailinput}>
                        <TextInput style={ProfileStyles.emailinput1}
                            placeholder={"PINCODE"}
                            value={this.state.userInfo.pinCode}
                            onChangeText={(pinCode) => { this.setState({ userInfo: { ...this.state.userInfo, pinCode } }) }}
                        />
                    </View>
                    <View style={ProfileStyles.emailinput}>
                        <TextInput style={ProfileStyles.emailinput1}
                            placeholder={"E-MAIL ID"}
                            editable={false}
                            value={this.state.userInfo.email}
                            onChangeText={(email) => { this.setState({ userInfo: { ...this.state.userInfo, email } }) }}
                        />
                    </View>
                    <View style={[{ width: "76%", margin: 10, }]}>
                        <Button
                            title="SUBMIT"
                            color="#234191"
                            onPress={() => this.onProfileSubmit()}>
                        </Button>
                    </View>
                </View>
            );
        }
    };
    getUserInfo = () => {
        return new Promise((resolve,reject)=>{
            getUserDetails(
                (response) => {
                    let _userInfo = response.data.data;
                    this.updateUserInfo(_userInfo);
                    resolve(true);
                },
                async (error) => {
                reject(error);
                await AsyncStorage.clear().then(()=>{this.props.navigation.navigate('Auth')}).catch(console.log);
            })
        })
    }

    addRolesToView() {
        return new Promise((resolve,reject)=>{
            getRolesMasterService(
                (response) => {
                manupulateRolesMaster = response.data.data;
                this.setState({
                    rolesMaster: manupulateRolesMaster.map(function (roleElement, index) {
                        return { 'label': roleElement.name, 'value': (roleElement.id).toString()};
                    }).filter((roleElement) => { if (roleElement.label != "Admin") { return roleElement } })
                 });
                 resolve(true);
                },
                (error) => {
                    reject(error);
                }
            );
        })
    }

    addStatesToView() {
        return new Promise((resolve,reject)=>{
            getStatesMasterService(
                (response) => {
                    manupulateStateMaster = response.data.data;
                    console.log(manupulateStateMaster);
                    this.setState({ 
                            statesMaster: manupulateStateMaster.map(function (stateElement) {
                            return { 'label': stateElement.name, 'value': stateElement.id };
                        })
                    });
                    resolve(true);
                }, 
                (error) => {
                    reject(error);
                }
            )
        });
    }

    addDistrictsToView() {
        return new Promise((resolve,reject)=>{
            getDistrictsMasterService((response) => {
                manupulateDistrictMaster = response.data.data;
                this.setState({ 
                    districtsMaster: manupulateDistrictMaster.map(function (districtElement) {
                        return { 'label': districtElement.name, 'value': districtElement.id  };
                    })
                });
                resolve(true);
                }, 
                (error) => { 
                    reject(error);
                }
            )
        })
    }

    onProfileSubmit = () => { 
        this.setState({isloading:true});
        let payload = {
            'mobile_no':this.state.userInfo.contactNo,
            'role_id':this.state.userInfo.role_id,
            'state_id':this.state.userInfo.state_id,
            'district_id':this.state.userInfo.district_id,
            'city':this.state.userInfo.city,
            'pin_code':this.state.userInfo.pinCode,
            '_method':'PUT',
        }
        console.log(payload);
        updateUserDetails(
            payload,
            (response) => {
                // console.log(response.data);
                let _userInfo = response.data.data;
                this.updateUserInfo(_userInfo);
                this.setState({isloading:false});
            },
            (error) => {
                console.log(error);
            }
        );
    }

    updateUserInfo = (_userInfo) => {
        let _stateData = _userInfo.state;
        let _districtData = _userInfo.district;
        let _roleData = _userInfo.role;
        this.setState({ 
            userInfo: {
                name : _userInfo.name,
                contactNo : _userInfo.contactNo,
                state_id : _stateData.id,
                district_id: _districtData.id,
                city: _userInfo.city,
                pinCode: _userInfo.pinCode,
                email: _userInfo.email, 
                selectedRole_id: (_roleData) ?  _roleData.id : ""
             }
        });
    }
}

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emailinput: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom: 0,
        width: '76%'
    },
    emailinput1: {
        fontSize: 14,
        alignSelf: 'auto',
        color: 'black',
    },
    profiltext: {
        marginBottom: 20,
        // marginTop:'8%',
        fontSize: 15
    },
    img1: {
        width: '29%',
        height: '19%',
        borderRadius: 150 / 2,
        overflow: "hidden",
    },
});

export default ProfileScreen;