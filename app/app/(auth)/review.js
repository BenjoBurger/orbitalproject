import {SafeAreaView, Text} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import FlatButton from '../../custom/Button';
import { useRouter } from 'expo-router';

export default function Review() {
  const router = useRouter();

  return (
    <SafeAreaView style={[globalStyles.appBody]}>
      <Text> Review! </Text>
      <FlatButton text = {'Back'} invert = {'n'} 
        onPress={() => router.replace('/dishes')}
        />
    </SafeAreaView>
  );
}