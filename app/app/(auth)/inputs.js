import {Alert, SafeAreaView, Text, View, Pressable} from 'react-native';
import FlatButton from '../../custom/Button';
import { globalStyles } from '../../styles/globalStyles';
import { auth } from "../../firebaseconfig"
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function Inputs() {
  const router = useRouter();
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/')
    })
    .catch(error => Alert.alert(error.message))
}
  return (
    <SafeAreaView style={[globalStyles.container]}>
      <Text style={[globalStyles.appMainTitle,{
        alignSelf: 'center',
        fontSize: 30, 
        color: 'black',
        }]}> 
        Ingredients 
        </Text>
      <View style={[globalStyles.container]}>
        <TextInput 
          value={input}
          onChangeText={(e) => setInput(e.target.value)}
          />
        <View style={[globalStyles.appBody, {
          justifyContent: 'flex-end'
          }]}>
        <FlatButton text = {'Create Dishes!'} invert = {'n'} onPress={()=>{router.replace("/dishes")}}/>
        <FlatButton text = {'Logout'} invert = {'n'} onPress={handleSignOut}/>
        </View>
      </View>
    </SafeAreaView>
  );
}