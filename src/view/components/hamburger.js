import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimpleLineIcons} from '@expo/vector-icons';

export default function Hamburger(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.openDrawer();
      }}
      style={{marginLeft: 10}}>
      <SimpleLineIcons name="menu" size={30} color="black" />
    </TouchableOpacity>
  );
}
