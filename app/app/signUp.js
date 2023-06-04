import React, {useState} from 'react';
import {SafeAreaView, Text, TextInput, Button} from 'react-native';
import FlatButton from '../custom/Button';
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';

export default function SignUp( {navigation} ) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
    })
    .catch((error) => alert(error.message))
  };

  return (
    <SafeAreaView style={globalStyles.appBody}>
      <Button onPress={() => router.back()} title="Login"
        style={{
          flex: 1,
        }}
        />
      <Text 
        style = {[globalStyles.appBodyFont, {
          fontSize: 35, fontWeight: '700', alignSelf: 'center', marginVertical: 15
          }]}>
        Create Account
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
        autoCapitalize='none' 
        placeholder='Password' 
        value={password}
        onChangeText={text => setPassword(text)} 
        />
      <Button onPress={handleSignUp} title='Sign Up'></Button>
    </SafeAreaView>
  );
}