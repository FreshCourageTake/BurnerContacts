import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    SafeAreaView,
	TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import ContactListItem from '../components/ContactListItem'
import AlphaSidebar from './../libs/alpha-sidebar'
import { AntDesign } from '@expo/vector-icons';

export default function ContactList(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 12
        },
        sectionHeader: {
            fontSize: 24,
            opacity: .3,
            marginTop: 15,
        },
        header: {
            display: 'flex',
            flexDirection: 'row-reverse',
            marginTop: 15,
            marginRight: 15,
        }
    });
    
    const [ expandedId, setExpanded ] = useState(null);
        
    const toggleItemActions = (id) => {
        setExpanded(expandedId === id ? null : id)
    }

    const Item = ({ item }) => (
        <TouchableOpacity onPress={() => toggleItemActions(item.id)}>
            <ContactListItem 
                contact={item} 
                expandedId={expandedId}
            />
        </TouchableOpacity>
    )
    
    const Header = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={addContact}>
                    <AntDesign name="plus" size={24} color="black" />
                </TouchableOpacity>
            </View>
        )
    }
    
    const SectionHeader = ({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
    )

    function addContact() {
        console.log('Add Contact')
        props.navigation.navigate('ContactInfo', { title: "Add User" })
    }

    return (
        <SafeAreaView style={styles.container}>
            <AlphaSidebar
                data={props.contacts}
                renderItem={Item}
                renderHeader={Header}
                renderSectionHeader={SectionHeader}
            />
        </SafeAreaView>
    )
};