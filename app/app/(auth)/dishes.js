import {SafeAreaView, Text} from 'react-native';
import FlatButton from '../../custom/Button';
import { globalStyles } from '../../styles/globalStyles';
import { useRouter } from 'expo-router';

export default function Dishes() {
  const router = useRouter();

  return (
    <SafeAreaView style={[globalStyles.appBody]}>
      <Text> Dishes! </Text>
      <FlatButton text = {'Reviews'} invert = {'n'} 
        onPress={() => {router.replace('/review')}}
        />
      <FlatButton text = {'Back'} invert = {'n'} 
        onPress={() => router.replace('/inputs')}
        />
    </SafeAreaView>
  );
}