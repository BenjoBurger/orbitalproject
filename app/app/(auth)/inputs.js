import { Alert, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, Text, 
  TouchableWithoutFeedback, View , TextInput, ScrollView} from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { auth } from "../../firebaseconfig"
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { FAB, Card, Button, IconButton} from 'react-native-paper';
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
      if (ingredients.length > 10) {
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
        <Button style={{marginLeft:15, marginTop:10, alignSelf: 'flex-start'}} text='Logout' icon='arrow-left' mode='elevated' 
        buttonColor='#fff' textColor='black' onPress={handleSignOut} compact={true} >
          Logout
        </Button>
        <Button onPress={() => router.push('/dishes')}>Dishes</Button>
        <Text style={[globalStyles.appMainTitle,{
          alignSelf: 'center',
          fontSize: 30, 
          color: 'black',
          paddingBottom: 10,
          marginVertical: 10,
          }]}> 
          Ingredients 
        </Text>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? "padding" : null}
        style={globalStyles.container}>
        <ScrollView>
          <View style={{ 
            backgroundColor: '#fff', 
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
        </ScrollView>
        <View style={[globalStyles.appBody, {
          justifyContent: 'flex-end',
          backgroundColor: '#fff',
          marginVertical: 10,
          }]}>
          <View style={{flexDirection: 'row'}}>
            <TextInput style={{
              alignItems: 'center',
              width: '70%',
              borderColor: '#999',
              borderRadius: 15,
              borderWidth: 1,
              paddingHorizontal: 10,
              fontWeight: '600',
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
        </View>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}