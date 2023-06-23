import {useState} from 'react';
import {SafeAreaView, Text, View, TextInput} from 'react-native';
import FlatButton from '../custom/Button';
import InvisText from '../custom/HiddenText';
import { globalStyles } from '../styles/globalStyles';
import { useRouter } from 'expo-router';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { IconButton } from 'react-native-paper'

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
        setError(true);
      });
  }

  return (
    <SafeAreaView style = {globalStyles.appBody}>
      <IconButton icon='arrow-left' size = {35} 
        style={{flex:1, alignSelf:'flex-start', marginLeft: 20}} onPress={()=>{router.replace('/')}}/>
      <View style = {{flex : 9, paddingHorizontal:  15, marginHorizontal: 30, marginBottom: 150, justifyContent: 'center'}}>
        <IconButton icon='lock-reset' style = {{justifyContent:'flex-start' ,alignSelf:'center', marginBottom: 30}} size={70} />
        <Text style={[globalStyles.appMainTitle,{alignSelf: 'center', fontSize: 30, color: 'black', marginBottom: 20}]}> 
          Forgot Password 
        </Text>
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
          <FlatButton text='Proceed' onPress={() => handleReset()} />
        </View>
    </SafeAreaView>
  );
}