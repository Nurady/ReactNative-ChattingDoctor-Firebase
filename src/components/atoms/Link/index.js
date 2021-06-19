import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors, fonts } from '../../../utils';

const Link = ({ size, title, align, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.title(size, align)}>{title}</Text>
        </TouchableOpacity>
    )
}

export default Link;

const styles = StyleSheet.create({
    title: (size, align) => (
        {
        fontSize: size,
        fontFamily: fonts.primary[600],
        color: colors.text.secondary,
        textDecorationLine: 'underline',
        textAlign: align
        }
    )
});
