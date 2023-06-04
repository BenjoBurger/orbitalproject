import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Pressable} from 'react-native';

// To comment : Cmmd + /


export default function App() {
  
  const [name, setName] = useState('Xiao Kang');

  const pressHandler = () => {
    setName(" ");
  }

  const [people, setPeople] = useState([
    {name: 'shaun', id: '1'},
    {name: 'the', id: '2'},
    {name: 'sheep', id: '3'},
  ])

  return (
    <View style={styles.container}>
      <Text>My name is {name}</Text>

      <View style = {styles.button}>
        <Button title = "Reset" onPress = {pressHandler} />
      </View>

      <TextInput 
      style= {styles.input}
      onChangeText={(val) => setName(val)}
      placeholder='Input name'
      />

      <View style = {styles.button}>
        <FlatList 
        keyExtractor={(item) => item.id} 
        data = {people}
        renderItem={({item}) => 
        (
        <Pressable style = {({pressed}) => [{backgroundColor: pressed ? '#555' : '#aaa'}]}>
          {({pressed}) => 
            (<Text> {pressed ? 'Pressed' : item.name} </Text>)
          }
        </Pressable>
        )
        }
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderColor: '#777',
    backgroundColor: '#ccc',
    margin: 20,
    width: 100,
    borderRadius: 10,
    shadowColor: '#111',
    shadowRadius: 3,
    shadowOpacity: 0.3, 
    shadowOffset: {width: 0, height: 5},
  },
  input : {
    borderColor: '#777', 
    borderWidth: 1,
    padding: 8,
    margin: 10,
    width: 200,
  },
  press : {
    backgroundColor: '#333',
    borderRadius: 20,
  },
});

