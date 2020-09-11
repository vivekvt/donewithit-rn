import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import RadioGroup from 'react-native-radio-buttons-group';
import RNPickerSelect from 'react-native-picker-select';
import {
  RegisterService,
  getRolesMasterService,
  getDistrictsMasterService,
  getStatesMasterService,
} from '../../api/services/registration.service';
import {ScrollView} from 'react-native-gesture-handler';

class RegistrationScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: () => <Hamburger navigation={navigation} />,
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      registrationFormData: {
        name: '',
        email: '',
        password: '',
        mobile_no: '',
        role_id: '',
        state_id: '',
        district_id: '',
        city: '',
        pin_code: '',
      },
      statesMaster: [],
      districtsMaster: [],
      rolesMaster: [],
    };
  }

  componentDidMount() {
    this.addStatesToView();
    this.addDistrictsToView();
    this.addRolesToView();
  }

  static navigationOptions = {
    title: 'Registration',
    headerStyle: {backgroundColor: '#ffffff'},
    // headerTitleStyle: { color: 'green' },
  };

  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicator style={RegistrationStyles.container}>
          <StatusBar barStyle="light-content" />
        </ActivityIndicator>
      );
    }
    return (
      <ScrollView>
        <View style={RegistrationStyles.container}>
          <Text style={RegistrationStyles.SIGNUP}>SIGN-UP</Text>
          <View style={RegistrationStyles.emailinput}>
            <TextInput
              style={RegistrationStyles.emailinput1}
              placeholder={'NAME'}
              value={this.state.registrationFormData.name}
              onChangeText={name => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    name,
                  },
                });
              }}
            />
          </View>
          <View style={RegistrationStyles.emailinput}>
            <TextInput
              style={RegistrationStyles.emailinput1}
              placeholder={'MOBILE NUMBER'}
              value={this.state.registrationFormData.mobile_no}
              onChangeText={mobile_no => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    mobile_no,
                  },
                });
              }}
            />
          </View>
          <View style={RegistrationStyles.emailinput}>
            <RNPickerSelect
              placeholder={{label: 'SELECT A STATE'}}
              style={RegistrationStyles.emailinput1}
              onValueChange={state_id => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    state_id,
                  },
                });
              }}
              items={this.state.statesMaster}
            />
          </View>
          <View style={RegistrationStyles.emailinput}>
            <RNPickerSelect
              placeholder={{label: 'SELECT A DISTRICT'}}
              style={RegistrationStyles.emailinput1}
              onValueChange={district_id => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    district_id,
                  },
                });
              }}
              items={this.state.districtsMaster}
            />
          </View>
          <View style={RegistrationStyles.emailinput}>
            <TextInput
              style={RegistrationStyles.emailinput1}
              placeholder={'CITY'}
              value={this.state.registrationFormData.city}
              onChangeText={city => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    city,
                  },
                });
              }}
            />
          </View>
          <View style={RegistrationStyles.emailinput}>
            <TextInput
              style={RegistrationStyles.emailinput1}
              placeholder={'PINCODE'}
              value={this.state.registrationFormData.pin_code}
              onChangeText={pin_code => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    pin_code,
                  },
                });
              }}
            />
          </View>
          <View style={RegistrationStyles.emailinput}>
            <TextInput
              style={RegistrationStyles.emailinput1}
              placeholder={'EMAIL ID'}
              value={this.state.registrationFormData.email}
              onChangeText={email => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    email,
                  },
                });
              }}
            />
          </View>
          <View style={RegistrationStyles.emailinput}>
            <TextInput
              style={RegistrationStyles.emailinput1}
              placeholder={'PASSWORD'}
              value={this.state.registrationFormData.password}
              onChangeText={password => {
                this.setState({
                  registrationFormData: {
                    ...this.state.registrationFormData,
                    password,
                  },
                });
              }}
            />
          </View>
          <View>
            <RadioGroup
              radioButtons={[
                {label: 'Employee', value: '2'},
                {label: 'Vendor', value: '3'},
              ]}
              onPress={rolesMaster => {
                this.setState(() => {
                  let userSelected = rolesMaster.find(e => e.selected == true);
                  let selectedRole_id = this.state.rolesMaster.find(
                    e => e.label == userSelected.label,
                  ).value;
                  return {
                    registrationFormData: {
                      ...this.state.registrationFormData,
                      selectedRole_id,
                    },
                  };
                });
              }}
              flexDirection="row"
            />
          </View>
          <View style={[{width: '76%', margin: 10}]}>
            <Button
              title="SUBMIT"
              color="#234191"
              onPress={() =>
                this.onPressRegister(this.state.registrationFormData)
              }
            />
          </View>
        </View>
      </ScrollView>
    );
  }

  /****************** Helper Function - [START] ************************/

  onProfile(props) {
    props.navigation.navigate('Profile');
  }

  addRolesToView() {
    onSuccess = response => {
      manupulateRolesMaster = response.data.data
        .map(function(roleElement) {
          return {label: roleElement.name, value: roleElement.id.toString()};
        })
        .filter((roleElement, index) => {
          if (roleElement.label != 'Admin') {
            if (roleElement.label == 'Employee') {
              roleElement.selected = true;
              this.setState({
                registrationFormData: {
                  ...this.state.registrationFormData,
                  role_id: roleElement.value,
                },
              });
            } else {
              roleElement.selected = false;
            }

            return roleElement;
          }
        });
      console.log(manupulateRolesMaster);
      this.setState({
        rolesMaster: manupulateRolesMaster,
        isLoading: false,
      });
    };
    onFailure = error => {
      console.log(error);
    };
    getRolesMasterService(onSuccess, onFailure);
  }

  addStatesToView() {
    onSuccess = response => {
      manupulateStateMaster = response.data.data.map(function(stateElement) {
        return {label: stateElement.name, value: stateElement.id};
      });
      this.setState({statesMaster: manupulateStateMaster});
    };
    onFailure = error => {
      console.log(error);
    };
    getStatesMasterService(onSuccess, onFailure);
  }

  addDistrictsToView() {
    onSuccess = response => {
      manupulateDistrictMaster = response.data.data.map(function(
        districtElement,
      ) {
        return {label: districtElement.name, value: districtElement.id};
      });
      this.setState({
        isLoading: false,
        districtsMaster: manupulateDistrictMaster,
      });
    };
    onFailure = error => {
      console.log(error);
    };
    getDistrictsMasterService(onSuccess, onFailure);
  }

  onPressRegister(payload) {
    console.log(payload);
    onSucess = ({data}) => {
      console.log(data);
      Alert.alert(
        'Success',
        'You have been successfully registered, Please try to login',
        [
          {
            text: 'OK',
            onPress: async () => {
              clientToken.setAccessToken(data.token);
              await AsyncStorage.setItem('isLoggedIn', '1')
                .then(() => {
                  this.props.navigation.navigate('App');
                })
                .catch(console.log);
            },
          },
        ],
      );
    };
    onFailure = error => {
      Alert.alert('Alert', 'Something went wrong please try again.');
    };
    RegisterService(payload, onSucess, onFailure);
  }
  /****************** Helper Function - [END] ************************/
}

export {RegistrationScreen};

const RegistrationStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  emailinput: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 0,
    width: '76%',
  },
  emailinput1: {
    fontSize: 14,
    alignSelf: 'auto',
    color: 'black',
  },
  SIGNUP: {
    marginBottom: 20,
    marginTop: '8%',
    fontSize: 23,
  },
});
