import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function FlatButton({text, onPress, invert}){
    if (invert == 'y')
    {
        return (
            <Pressable onPress = {onPress}>
                <View style = {styles.buttonInvert}>
                    <Text style = {styles.buttonTextInvert}> {text} </Text>
                </View>
            </Pressable>

        )
    }

    else{
        return (
            <Pressable onPress = {onPress}>
                <View style = {styles.button}>
                    <Text style = {styles.buttonText}> {text} </Text>
                </View>
            </Pressable>

        )
    }
}

const styles = StyleSheet.create({
    button:{
        borderRadius: 15,
        padding: 12, 
        margin: 10, 
        width: 280,
        backgroundColor: '#333',
    },

    buttonInvert:{
        borderRadius: 15,
        padding: 12, 
        margin: 10, 
        width: 280,
    },

    buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },

    buttonTextInvert:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
})