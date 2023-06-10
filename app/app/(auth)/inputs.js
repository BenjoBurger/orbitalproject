import { Alert, SafeAreaView, Text, View } from 'react-native';
import FlatButton from '../../custom/Button';
import { globalStyles } from '../../styles/globalStyles';
import { auth } from "../../firebaseconfig"
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput, FAB } from 'react-native-paper';

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

  const addIngredient = (ingredient) => {
    const newIngredient = {
      id: 1,
      ingredient: ingredient,
    }
      setList([...list, newIngredient]);
      setInput("");
  };
  
  // const IngredientList = ({ingredient, setIngredients}) => {
  //   return (

  //   )
  // }

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <Text style={[globalStyles.appMainTitle,{
        alignSelf: 'center',
        fontSize: 30, 
        color: 'black',
        }]}> 
        Ingredients 
        </Text>
      <View style={[globalStyles.container, {
        }]}>
        <View>
        </View>
        <View style={[globalStyles.appBody, {
          justifyContent: 'flex-end'
          }]}>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{
              alignItems: 'center',
              width: '60%',
              }}
              mode='outlined'
              placeholder='Add Ingredients'
              value={input}
              onChangeText={(e) => setInput(e.target.value)}
            />
            <FAB
              style={{
                margin: 4,
                backgroundColor: '#888'
              }}
              color='white'
              icon='plus'
              onPress={()=> addIngredient(input)}
              />
          </View>
          <FlatButton text = {'Create Dishes!'} invert = {'n'} onPress={()=>{router.replace("/dishes")}}/>
          <FlatButton text = {'Logout'} invert = {'n'} onPress={handleSignOut}/>
        </View>
      </View>
    </SafeAreaView>
  );
}