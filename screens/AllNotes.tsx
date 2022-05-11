import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as eva from '@eva-design/eva';
import { Divider, List, ListItem } from '@ui-kitten/components';

import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Button, Layout } from '@ui-kitten/components';



export default function AllNotes() {
    const [notes, setNotes] = useState([]);
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
    const renderItem = ({ item, index }) => (
        <ListItem
          title={<Text category="h5" >{item}</Text>}
          onPress={() => navigation.navigate('Note', { 
              singleNote: item
           })}
        />
      ); 
    return (
        <View style={{ backgroundColor: '#222B45', flex:1 }}>
            <Text style={styles.title} category="h1">
                Notes
            </Text>
           <List
      style={styles.container}
      data={notes.reverse()}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}

    />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        fontSize: 20,
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
    }
});
