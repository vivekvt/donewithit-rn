import React from 'react';
import {Text, View, StyleSheet, ImageBackground, Image} from 'react-native';

import AppButton from '../components/AppButton';

function WelcomeScreen({navigation}) {
  return (
    <ImageBackground
      blurRadius={2}
      style={styles.background}
      source={require('../assets/background.jpg')}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/logo-red.png')} />
        <Text style={styles.tagline}>ACE</Text>
      </View>
      <View style={styles.button}>
        <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate('Registration')}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    position: 'absolute',
    alignItems: 'center',
    top: 70,
  },
  logo: {
    width: 100,
    height: 100,
  },
  tagline: {
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
  },
});

export default WelcomeScreen;
