// import { View } from 'react-native';
// import { Text, Button, Checkbox } from 'react-native-paper';
// import FlatButton from '../custom/Button'
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { globalStyles } from '../styles/globalStyles';
// import { useRouter } from 'expo-router';
// import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
// import { firestoredb } from '../firebaseconfig'
// import { Drawer } from 'react-native-drawer-layout';
// import { useState, useEffect } from 'react';
// import Slider from '@react-native-community/slider';

import { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, TextInput, Alert } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import FlatButton from '../custom/Button';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { Link, useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        router.replace("/inputs")
      } 
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .catch((error) => Alert.alert(error.message))
    };

  return (
    <SafeAreaView style = {globalStyles.container}>

      <View style = {globalStyles.appHeader}>
        <Text style = {globalStyles.appMainTitle}>FOOD4THOUGHT</Text>
      </View>

      <View style = {globalStyles.appBody}>
        <Text style = {globalStyles.appBodyFont}> Say hello to endless culinary possibilities! </Text>
      </View>

      <View style = {globalStyles.appLogin}>
        <Text style = {[globalStyles.appBodyFont, 
          {fontSize: 35, fontWeight: '700', alignSelf: 'center', marginVertical: 15,}]}>
          Login
          </Text>
        <TextInput 
          style = {globalStyles.userInputs} 
          autoCapitalize='none' 
          keyboardType = 'email-address' 
          placeholder='Email' 
          value={email}
          onChangeText={text => setEmail(text)} 
          />
        <TextInput 
          style = {globalStyles.userInputs} 
          blurOnSubmit = {true}  
          placeholder='Password'
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          />

        <FlatButton text={'Sign In'} onPress={handleLogin} invert={'n'}/>
        <Link href="/password" style = {{
            borderRadius: 15,
            padding: 12, 
            margin: 10, 
            width: 280,
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
        }}>
          Forget Password
          </Link>
        <View style = {{flexDirection: 'row', alignItems: 'flex-end',}}>
            <Text style = {[globalStyles.appBodyFont, {fontSize: 15, marginTop: 200}]}>Don't have an account?&nbsp;</Text>
            <Link href="/signUp" style = {{color:'blue', fontFamily: 'Futura-Medium',}}> 
              Sign Up
              </Link>
        </View>
      </View>

    </SafeAreaView>
  );
}
