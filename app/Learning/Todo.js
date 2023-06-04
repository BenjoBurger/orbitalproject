import React, {useState} from 'react';
import { StyleSheet, SafeAreaView, Text, View, Button, TextInput, FlatList, Pressable, Alert} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function App(){

  const [input, setInput] = useState('');

  const[chore, setChore] = useState([
    {name : 'Wash dishes', key: '1'},
  ])

  //To set inputs
  const inputHandler = (text) => {
    setInput(text);
  }

  //To add chores
  const addHandler = (input) => {
    if (input.trim())
    {
    setChore((prevList) => {
      return [{name: input, key: Math.random().toString()},
      ...prevList]
    })
    }
    else
    {
      Alert.alert('Error', 'Todos cannot be empty')
    }
  }

  //To remove chores
  const removeHandler = (key) => {
    setChore((prevList) => {
      return prevList.filter(item => item.key != key);
    })
  }
  
  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.topArea}>
        <Text style = {styles.whiteBold}> My Todo </Text>
      </View>
      
      <View style = {styles.midArea}>
        <TextInput 
        style = {styles.textInput}
        onChangeText = {inputHandler}
        placeholder= 'Enter Todo'
        />

        <View style = {styles.button}>
          <Button color={'white'} title = 'Add Todo' onPress = {() => addHandler(input)}/>
        </View>

        <FlatList
        data = {chore}
        renderItem = {({item}) => 
        <Pressable onPress = {() => removeHandler(item.key)}>
          <View style = {styles.list}>
            <AntDesign name = 'minuscircleo' size = {15}/>
            <Text style = {{paddingLeft: 10, paddingVertical: 5,}}> {item.name} </Text>
          </View>
        </Pressable>
        }/>

      </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container : {
    flex : 1,
  },

  topArea : {
    flex: 1,
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
  },

  midArea : {
    flex : 8,
  },

  whiteBold : {
    fontWeight: 'bold',
    color : 'white',
    fontSize: 20,
  },

  button : {
    backgroundColor: 'coral',
    color: 'white',
    marginHorizontal: 80,
    marginVertical: 20,
  },

  list : {
    flexDirection: 'row',
    borderColor : 'black',
    borderRadius: 10,
    borderColor : '#777',
    borderWidth: 1,
    borderStyle: 'dotted',
    padding: 5,
    margin: 5,
    fontWeight: '500',
    alignItems: 'center',
  },

  textInput : {
    borderColor: '#777',
    borderBottomWidth: 1,
    padding: 8,
    marginVertical: 10,
    marginHorizontal: 80,
  },
})
