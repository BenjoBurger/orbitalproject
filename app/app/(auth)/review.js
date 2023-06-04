import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';

export default function Review() {

  return (
    <SafeAreaView style={[globalStyles.appBody]}>
      <Text> Review! </Text>
    </SafeAreaView>
  );
}