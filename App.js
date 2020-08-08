import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Contacts from 'expo-contacts';
import ContactList from './screens/ContactList'
import { contactMap } from './datasets/contactMap'
import _ from 'lodash'

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

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: '#fff',
            }}>
            {contacts && 
                <ContactList contacts={contacts}/>
            }
        </View>
    );
}