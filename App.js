import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Contacts from 'expo-contacts';
import ContactList from './screens/ContactList'
import ContactInfo from './screens/ContactInfo'
import { contactMap } from './datasets/contactMap'
import _ from 'lodash'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

export default function App() {
    const [ contacts, setContacts ] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync();
                const map = _.cloneDeep(contactMap)

                if (data.length > 0) {
                    data.forEach(contact => {
                        if (contact.firstName) {
                            const firstLetter = contact.firstName[0] && contact.firstName[0].toUpperCase()

                            if (firstLetter && firstLetter.match(/[A-Z]/i)) {
                                map[firstLetter].push(contact)
                            } else {
                                map['#'].push(contact)
                            }
                        }
                    })
                    
                    // Only keep sections with contacts
                    Object.entries(map).forEach(entry => {
                        if (!entry[1].length) {
                            delete map[entry[0]]
                        }
                    })
                    
                    setContacts(map)
                }
            }
        })();
    }, []);

    const Home = ({ navigation }) => (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}>
            {contacts && 
                <ContactList 
                    contacts={contacts}
                    navigation={navigation}
                />
            }
        </View>
    )

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ title: 'Burner Contacts' }}
                />
                <Stack.Screen 
                    name="ContactInfo" 
                    component={ContactInfo} 
                    options={{ title: 'Add Contact' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}