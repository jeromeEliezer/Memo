import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as eva from '@eva-design/eva';

import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Button, Layout } from '@ui-kitten/components';



export default function CreateNote() {
  const [note, setNote] = React.useState('');
  const navigation = useNavigation();

  const saveNote = async () => {
    const value = await AsyncStorage.getItem('NOTES');
    const n = value ? JSON.parse(value) : [];
    n.push(note); // add new note to array
    await AsyncStorage.setItem('NOTES', JSON.stringify(n))
      .then(() => navigation.navigate('AllNotes'));
    setNote('');
  }
  return (
    <View>
      <TextInput
        value='Enter note here'
        onChangeText={setNote}
        style={{
          borderColor: 'gray',
          color: '#fff',
          borderWidth: 1,
          width: '100%',
          borderRadius: 5,
        }}
        selectionColor='#fff'
        autoFocus
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.bottom}>
        <Button style={styles.button} appearance='filled' onPress={saveNote}>CreateNote</Button>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222B45',
    color: '#fff',
    padding: 30,
    paddingTop: 80,
    width: Dimensions.get('window').width,
  },
  bottom: {
    justifyContent: 'flex-end',


  },
  button: {
    marginBottom: 30,
  }
});
