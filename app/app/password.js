import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import FlatButton from '../custom/Button';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';

export default function Password( {navigation} ) {
  const router = useRouter();

  return (
    <SafeAreaView style = {globalStyles.appBody}>
      <Text> Forgot Password! </Text>
      <FlatButton text = {'Back'} invert = {'n'} 
        onPress={()=>{router.replace('/')}}
        />
    </SafeAreaView>
  );
}