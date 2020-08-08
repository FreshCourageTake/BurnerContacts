import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import * as Contacts from 'expo-contacts';
import ContactList from './screens/ContactList'
import { sortedContacts } from './datasets/sortedContacts'
import _ from 'lodash'

export default function App() {
    const [ contacts, setContacts ] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync();
                const contactMap = {}
                const contactData = _.cloneDeep(sortedContacts)

                if (data.length > 0) {
                    data.forEach(contact => {
                        if (contact.firstName) {
                            const firstLetter = contact.firstName[0] && contact.firstName[0].toUpperCase()

                            if (!firstLetter) {
                                contactMap['123'] = []
                            }

                            if (!contactMap[firstLetter]) {
                                contactMap[firstLetter] = []
                            }
                            
                            if (firstLetter && firstLetter.match(/[A-Z]/i)) {
                                contactMap[firstLetter].push(contact)
                            } else {
                                contactData['123'].push(contact)
                            }
                        }
                    })
                    
                    Object.entries(contactMap).forEach(entry => {
                        const index = contactData.findIndex(i => i.title === entry[0])

                        if (index > -1) {
                            contactData[index].data = entry[1]
                        }
                    })

                    // Only keep sections with contacts
                    console.log(contactData)
                    setContacts(contactData.filter(x => x.data.length))
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