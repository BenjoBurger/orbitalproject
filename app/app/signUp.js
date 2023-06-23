import { SafeAreaView, Text, TextInput, View, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import FlatButton from '../custom/Button';
import { IconButton } from 'react-native-paper'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      // Signed in 
      // const user = userCredential.user;
    })
    .catch((error) => Alert.alert(error.message))
  };

  return (
    <SafeAreaView style={globalStyles.appBody}>
      <IconButton style = {{flex:1, alignSelf:'flex-start', marginLeft: 20}} icon='arrow-left' size = {35} onPress={()=>{router.replace('/')}}/>
      <View style={{flex:9 ,justifyContent:'center', marginBottom: 170}}>
        <IconButton icon='account-circle' style = {{justifyContent:'center' ,alignSelf:'center'}} size={70} />
        <Text
          style = {[globalStyles.appBodyFont, {
            fontSize: 35, fontWeight: '700', alignSelf: 'center', marginVertical: 30
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
        <FlatButton text='Sign Up' onPress={handleSignUp} invert='n'/>
      </View>
    </SafeAreaView>
  );
}