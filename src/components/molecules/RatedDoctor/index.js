import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { IconStarRate } from '../../../assets'
import { colors, fonts } from '../../../utils'

const RatedDoctor = ({name, desc, avatar, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={avatar} style={styles.avatar} />   
            <View style={styles.profile}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.job}>{desc}</Text>
            </View>       
            <View style={styles.starWrapper}>
                <IconStarRate/>
                <IconStarRate/>
                <IconStarRate/>
                <IconStarRate/>
                <IconStarRate/>
            </View>
        </TouchableOpacity>
    )
}

export default RatedDoctor;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 16,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        marginRight: 12
    },
    starWrapper: {
        flexDirection: 'row',
    },
    name: {
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        fontSize: 16
    },
    job: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 12,
        marginTop: 2
    },
    profile: {
        flex: 1,
    }
});
