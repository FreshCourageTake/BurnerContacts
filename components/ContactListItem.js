import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from "react-native";
import { 
	Feather,
	MaterialIcons,
} from '@expo/vector-icons';
import call from 'react-native-phone-call'
import * as SMS from 'expo-sms';
import * as MailComposer from 'expo-mail-composer';

function makeCall(phoneNumbers) {
	const args = {
		number: phoneNumbers[0].number, // String value with the number to call
		prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
	}
	   
	call(args).catch(e => {
		console.error(`Call failed: ${e}`)
	})
}

async function sendText(phoneNumbers) {
	const isAvailable = await SMS.isAvailableAsync();
	if (isAvailable) {
		await SMS.sendSMSAsync(
			[phoneNumbers[0].number]
		);
	} else {
		console.error("SMS not available on this device")
	}
}

async function sendEmail(emails) {
	const isAvailable = await MailComposer.isAvailableAsync()
	if (isAvailable) {
		await MailComposer.composeAsync({
			recipients: [emails[0].email]
		});
	} else {
		console.error("Email not available on this device")
	}
}

export default function ContactListItem ({ contact, expandedId }) {
	const styles = StyleSheet.create({
		contact: {
			backgroundColor: "white",
			padding: 15,
			borderBottomWidth: 1,
			borderBottomColor: 'black'
		},
		actions: {
			justifyContent: 'space-between',
			flexDirection: 'row',
			flexWrap: 'wrap',
			flex: 1,
			marginHorizontal: 5
		},
		action: {
			marginTop: 20,
			marginTop: 10,
			justifyContent: 'center',
			alignItems: 'center',
		}
	});
	
	return (
		<View style={styles.contact}>
			<Text>{contact.name}</Text>
			{expandedId === contact.id &&
				<View style={styles.actions}>
					{contact.phoneNumbers &&
						<TouchableOpacity 
							onPress={() => makeCall(contact.phoneNumbers)}
							style={styles.action}
						>
							<Feather name="phone" size={24} color="black" />
						</TouchableOpacity>
					}
					
					{contact.phoneNumbers &&
						<TouchableOpacity 
							onPress={() => sendText(contact.phoneNumbers)}
							style={styles.action}
						>
							<MaterialIcons name="textsms" size={24} color="black" />
						</TouchableOpacity>
					}
					
					{contact.emails &&
						<TouchableOpacity 
							onPress={() => sendEmail(contact.emails)}
							style={styles.action}
						>
							<MaterialIcons name="email" size={24} color="black" />
						</TouchableOpacity>
					}
					
					<TouchableOpacity 
						onPress={() => makeCall(contact.phoneNumbers)}
						style={styles.action}
					>
						<Feather name="info" size={24} color="black" />
					</TouchableOpacity>
				</View>
			}
		</View>
	)
}