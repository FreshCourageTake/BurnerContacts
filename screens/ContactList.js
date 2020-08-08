import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    SectionList,
	TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import ContactListItem from '../components/ContactListItem'


export default function ContactList(props) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: Constants.statusBarHeight,
            marginHorizontal: 12
        },
        header: {
            fontSize: 24,
            opacity: .3,
            marginTop: 15
        }
    });

    const [ expandedId, setExpanded ] = useState(null);
        
    const toggleItemActions = (id) => {
        setExpanded(expandedId === id ? null : id)
    }

    return (
        <SafeAreaView style={styles.container}>
            <SectionList
                sections={props.contacts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleItemActions(item.id)}>
                        <ContactListItem 
                            contact={item} 
                            expandedId={expandedId}
                        />
			        </TouchableOpacity>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </SafeAreaView>
    )
};