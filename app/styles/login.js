import {useEffect, useState} from 'react';
import {SafeAreaView, Text, View, TextInput, Pressable} from 'react-native';
import { globalStyles } from './globalStyles';
import FlatButton from '../custom/Button';
import { auth } from '../firebaseconfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'expo-router';

export default function Login( {navigation} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.navigate('Inputs')
      } 
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Signed in 
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message))
      // .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.error(errorCode);
      // console.error(errorMessage);
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

        <Link><FlatButton text={'Sign In'} onPress={handleLogin} invert={'n'}/></Link>
        <FlatButton style = {{backgroundColor: 'white'}} text={'Forgot Password'} onPress={() => navigation.navigate('Password')} invert={'y'}/>

        <View style = {{flexDirection: 'row', alignItems: 'flex-end',}}>
            <Text style = {[globalStyles.appBodyFont, {fontSize: 15, marginTop: 200}]}>Don't have an account?</Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
                <Text style = {{color:'blue', fontFamily: 'Futura-Medium',}}> Sign Up</Text>
            </Pressable>
        </View>
      </View>

    </SafeAreaView>
  );
}
