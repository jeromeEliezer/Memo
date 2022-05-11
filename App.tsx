import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ApplicationProvider, BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import CreateNote from './screens/CreateNote';
import AllNotes from './screens/AllNotes';
import Notes from './screens/Notes';

const { Navigator, Screen } = createBottomTabNavigator();



const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title='Create'/>
    <BottomNavigationTab title='All Notes'/>
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Create' component={CreateNote}/>
    <Screen name='AllNotes' component={AllNotes}/>
    <Screen name='Note' component={Notes} />
  </Navigator>
);

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.dark}>
    <NavigationContainer>
    <TabNavigator/>
  </NavigationContainer>
  </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
