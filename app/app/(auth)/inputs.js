import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import FlatButton from '../../custom/Button';
import { globalStyles } from '../../styles/globalStyles';
import { auth } from "../../firebaseconfig"
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { FAB, TextInput, Card, IconButton } from 'react-native-paper';
import { useState } from 'react';


export default function Inputs() {
  const router = useRouter();

  const [inputs, setInputs] = useState();
  const [ingredients, setIngredients] = useState([]);

  function Ingredient(props) {
    return (
      <Card style={[globalStyles.ingredientsCard]}>
          <Card.Title
            title={props.text}
            right={() => (
              <IconButton
                icon={'delete'}
                onPress={() => removeIngredient(props.value)}
              />
            )}
          />
        </Card>
    )
  }
  const addIngredient = () => {
      Keyboard.dismiss();
      if (ingredients.length > 4) {
        Alert.alert(`Maximum of 5 Ingredients!`)
        return
      }
      if (inputs === undefined || inputs === "") {
        Alert.alert(`Please key in a valid input!`)
      }
      else {
        setIngredients([...ingredients, inputs]);
        setInputs("");
      }
  }
  const removeIngredient = (index) => {
    let ingredientsCopy = [...ingredients];
    ingredientsCopy.splice(index, 1);
    setIngredients(ingredientsCopy);
  }
  const handleSignOut = () => {
    Keyboard.dismiss();
    signOut(auth).then(() => {
      router.replace('/')
    })
    .catch(error => Alert.alert(error.message))
  }
  return (
    <SafeAreaView style={[globalStyles.container]} >
      <Text style={[globalStyles.appMainTitle,{
        alignSelf: 'center',
        fontSize: 30, 
        color: 'black',
        }]}> 
        Ingredients 
        </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? "padding" : null}
      style={[globalStyles.container, {
      }]}>
        <View style={{ 
          backgroundColor: '#eee', 
          alignItems: 'center',
          justifyContent: 'center',
          }}>
          {
            ingredients.map((item, index) => {
              return (
                <Ingredient key={index} value={index} text={item}/>
              )
            })
          }
          </View>
        <View style={[globalStyles.appBody, {
          justifyContent: 'flex-end'
          }]}>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{
              alignItems: 'center',
              width: '55%',
              }}
              mode='outlined'
              placeholder='Add Ingredients '
              value={inputs} 
              onChangeText={input => setInputs(input)}
            />
            <FAB
              style={{
                margin: 4,
                backgroundColor: '#888'
              }}
              color='white'
              icon='plus'
              onPress={()=> addIngredient()}
              />
          </View>
          <FlatButton text = {'Create Dishes!'} invert = {'n'} onPress={()=>{router.push("/dishes")}}/>
          <FlatButton text = {'Logout'} invert = {'n'} onPress={handleSignOut}/>
        </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}