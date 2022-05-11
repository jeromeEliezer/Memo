import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as eva from '@eva-design/eva';
import { Divider, List, ListItem } from '@ui-kitten/components';

import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Button, Layout } from '@ui-kitten/components';



export default function Notes({ route }) {
    const [notes, setNotes] = useState([]);
    const { singleNote } = route.params;
    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            getNotes();
        }, [])
    )

    const getNotes = async () => {
        AsyncStorage.getItem('NOTES').then((notes) => {
            setNotes(JSON.parse(notes));
        });
    }
    const deleteNote = async () => {
        const newNotes = notes.filter(note => note !== singleNote);
        await AsyncStorage.setItem('NOTES', JSON.stringify(newNotes))
            .then(() => navigation.navigate('AllNotes'));
    }
    return (
        <View style={{ backgroundColor: '#222B45', flex: 1 }}>
            <Text style={styles.title} category="h1">
                Notes
            </Text>
            <Text style={{fontSize:22, margin:20}} >
               {singleNote}
            </Text>
<View style={styles.bottom}>
<Button onPress={deleteNote} style={styles.button}>
    Delete
</Button>
</View >

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        marginVertical: 4,
    },
    title: {
        textAlign: 'center',
        marginTop:50
    },
    notes: {
        fontSize:24
    },
    bottom: {
        justifyContent: 'flex-end',
    
    
      },
      button: {
        marginBottom: 30,
      }
});
