import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ListItem from '../../app/components/lists/ListItem';

const vt = [1, 2, 3, 4, 5, 6, 7];

const TaskScreen = props => (
  <View style={styles.container}>
    <Text>Task Screen</Text>
    {vt.map(v => (
      <ListItem
        title="Vivek VT"
        subTitle="contactvivekvt@gmail.com"
        image={require('../../app/assets/mosh.jpg')}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {},
});
export default TaskScreen;
