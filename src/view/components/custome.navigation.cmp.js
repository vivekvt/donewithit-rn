import { ScrollView, TouchableNativeFeedback } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
import React, { Component } from "react";
import { View, Text,  } from 'react-native';
import { DrawerItems } from "react-navigation-drawer";
import Logout from "./logout.cmp";

export class CustomDrawerContentComponent extends Component {
    render() {
      const { navigate } = this.props.navigation;
    //   const { theme, user } = this.props;
    // const ripple = TouchableNativeFeedback.Ripple('#adacac', false);
      return (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <DrawerItems {...this.props} />
          </ScrollView>
          <View elevation={6}>
            <Logout navigation={this.props.navigation}/>
          </View>
        </View>
      );
    }
  }