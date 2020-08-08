import React from "react";
import {
    StyleSheet,
    Text,
    SafeAreaView,
} from "react-native";

export default function ContactList(props) {
    const styles = StyleSheet.create({
        input: {},
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text>Contact Info</Text>
        </SafeAreaView>
    )
};