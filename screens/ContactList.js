import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    SectionList
} from "react-native";
import Constants from "expo-constants";
import ContactListItem from '../components/ContactListItem'

const ContactList = (props) => (
    <SafeAreaView style={styles.container}>
        <SectionList
            sections={props.contacts}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ContactListItem contact={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        />
    </SafeAreaView>
);

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

export default ContactList;