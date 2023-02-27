import { StyleSheet, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';


const Tab = ({ color, tab, onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {icon && <Feather name={icon} size={28} color={color} />}

        </TouchableOpacity>
    )
}

export default Tab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,

    },
});