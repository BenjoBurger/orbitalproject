import {Alert, SafeAreaView, Text} from 'react-native';
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
    <SafeAreaView style={[globalStyles.appBody]}>
      <Text> Inputs! </Text>
      <FlatButton text = {'Dishes'} invert = {'n'} onPress={()=>{router.replace("/dishes")}}/>
      <FlatButton text={'Logout'} onPress={handleSignOut} invert={'n'}/>
    </SafeAreaView>
  );
}