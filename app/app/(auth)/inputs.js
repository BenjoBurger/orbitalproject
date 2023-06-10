import {Alert, SafeAreaView, Text, View, Pressable} from 'react-native';
import FlatButton from '../../custom/Button';
import { globalStyles } from '../../styles/globalStyles';
import { auth } from "../../firebaseconfig"
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function Inputs() {
  const router = useRouter();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      router.replace('/')
    })
    .catch(error => Alert.alert(error.message))
}
  return (
    <SafeAreaView style={[globalStyles.container]}>
      <View style={{flexDirection: 'row'}}>
        <Pressable 
          onPress={handleSignOut}
          >
          <Text style={{
            width: 70,
            fontSize: 15, 
            color:'blue',
            fontFamily: 'Futura-Medium',
            left: 10,
            }}>
            Logout
            </Text>
        </Pressable>
      <Text style={[globalStyles.appMainTitle,{
        fontSize: 30, 
        color: 'black',
        left: 90,
        bottom: 10,
        }]}> 
        Inputs! 
        </Text>
        </View>
      <View style={[globalStyles.appBody]}>
        <FlatButton text = {'Dishes'} invert = {'n'} onPress={()=>{router.replace("/dishes")}}/>
      </View>
    </SafeAreaView>
  );
}