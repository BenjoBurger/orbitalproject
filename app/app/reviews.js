import {SafeAreaView, Text} from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import FlatButton from '../custom/Button';


export default function Reviews({ navigation }) {

  return (
    <SafeAreaView style={[globalStyles.appBody]}>
      <Text> Review! </Text>
      <FlatButton text = {'Back'} invert = {'n'} 
        onPress={() => navigation.navigate('Dishes')}
        />
    </SafeAreaView>
  );
}