import {useState} from 'react';
import {SafeAreaView, Text, View, TextInput} from 'react-native';
import FlatButton from '../custom/Button';
import InvisText from '../custom/HiddenText';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


export default function Password() {
  const router = useRouter();
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [sent, setSent] =useState(false);

  const handleReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setError(false);
        setSent(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }

  return (
    <SafeAreaView style = {globalStyles.appBody}>
      <View style = {{flex : 1}}>
        <Text style={[globalStyles.appMainTitle,{
          alignSelf: 'center',
          fontSize: 30, 
          color: 'black',
          }]}> 
          Forgot Password 
        </Text>
      </View>
      <View style = {{flex : 2, paddingHorizontal: 20, marginHorizontal: 30}}>

        <Text style = {[globalStyles.appBodyFont, {marginBottom: 40, fontSize: 17, textAlign: 'center'}]}>Enter your email 
        and we will send you a link to reset your password </Text>
        <View style = {{alignItems: 'center', marginBottom: 20}}>
        <InvisText text = {'Email not found'} colour= {'red'} size = {17} disabled={!error}/>
        <InvisText text = {'Link Sent to your email!'} colour= {'black'} size = {15} disabled={!sent}/>
        </View>
        <TextInput
          style = {[globalStyles.userInputs, {marginBottom: 10}]}
          autoCapitalize='none' 
          placeholder='Email' 
          value={email}
          onChangeText={text => setEmail(text)} 
          onEndEditing={handleReset}
        />
        <FlatButton text = {'Back'} invert = {'n'} 
          onPress={()=>{router.replace('/')}}/>

      </View>
    </SafeAreaView>
  );
}