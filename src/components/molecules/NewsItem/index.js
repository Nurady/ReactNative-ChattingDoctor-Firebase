import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors, fonts } from '../../../utils';

const NewsItem = ({title, date, image}) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.label}>{title}</Text>
                <Text style={styles.day}>{date}</Text>
            </View>
            
            <Image source={{uri: image}} style={styles.avatar}/>
        </View>
    )
}

export default NewsItem;

const styles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontFamily: fonts.primary[600],
        color: colors.text.primary,
        maxWidth: '90%'
    },
    day: {
        fontSize: 12,
        fontFamily: fonts.primary[400],
        color: colors.text.secondary,
        marginTop: 4
    },
    avatar: {
        height: 60,
        width: 80,
        borderRadius: 11,
    },
    container: {
        paddingTop: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 12,
        paddingHorizontal: 16,
        alignItems: 'center'
    },
    content: {
      flex: 1
    }
});
