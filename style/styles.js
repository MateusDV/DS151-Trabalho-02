//@ts-check
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	textbox: {
		height: 40,
		padding: 8,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#CCC',
		borderRadius: 4,
	},
	button: {
		backgroundColor: '#007bff',
		paddingHorizontal: 32,
		paddingVertical: 8,
		borderRadius: 4,
		margin: 5
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	listItem: {
		flexDirection: "row",
		margin: 8,
		borderColor: '#505E4D',
		borderWidth: 1, // Add border width if needed
		padding: 10, // Add padding if needed
		borderRadius: 5,
		width: '90%',
	},
	pressed: {
		backgroundColor: '#51A8FF'
	},
	checkbox: {
		alignSelf: 'center',
		marginRight: 8
	},
});

export default styles;