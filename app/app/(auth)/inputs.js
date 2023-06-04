import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import FlatButton from '../../custom/Button';
import { globalStyles } from '../../styles/globalStyles';
import { auth } from "../../firebaseconfig"
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Inputs( {navigation} ) {

  const handleSignOut = () => {
    signOut(auth).then(() => {
      console.log(`SignOut`)
      navigation.navigate('Login')
    })
    .catch(error => alert(error.message))
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   console.error(errorCode);
    //   console.error(errorMessage);
    // });
}
  return (
    <SafeAreaView style={[globalStyles.appBody]}>
      <Text> Inputs! </Text>
      <FlatButton text = {'Dishes'} invert = {'n'} onPress={()=>{navigation.navigate('Dishes')}}/>
      <FlatButton text={'Logout'} onPress={handleSignOut} invert={'n'}/>
    </SafeAreaView>
  );
}