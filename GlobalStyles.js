import { StyleSheet, Platform } from 'react-native';
export default StyleSheet.create({
    droidSafeArea: {
        flex: 1,
        backgroundColor: '#fffff',
        paddingTop: Platform.OS === 'android' ? 23 : 0
    },
});