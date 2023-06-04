import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import FlatButton from '../../custom/Button';
import { globalStyles } from '../../styles/globalStyles';

export default function Dishes( {navigation} ) {

  return (
    <SafeAreaView style={[globalStyles.appBody]}>
      <Text> Dishes! </Text>
      <FlatButton text = {'Reviews'} invert = {'n'} onPress={() => {navigation.navigate('Review')}}/>
    </SafeAreaView>
  );
}