import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { IconNext, IconEditProfile, IconLanguageProfile, IconRateProfile, IconHelpProfile } from '../../../assets';
import { colors, fonts } from '../../../utils';

const List = ({ profile, name, desc, type, onPress, icon }) => {
    const Icon = () => {
        if (icon === 'edit-profile') {
            return <IconEditProfile />
        }
        if (icon === 'language') {
            return <IconLanguageProfile />
        }
        if (icon === 'rate') {
            return <IconRateProfile />
        }
        if (icon === 'help') {
            return <IconHelpProfile />
        }
        return <IconEditProfile />
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            {
                icon ? <Icon /> : <Image source={profile} style={styles.image}/>
            }
            <View style={styles.content}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.message}>{desc}</Text>
            </View>
            {
                type === 'next' &&  <IconNext />
            }
        </TouchableOpacity>
    )
}

export default List;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginLeft: 16,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingBottom: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        marginLeft: 16
    },
    image:{
        width: 46,
        height: 46,
        borderRadius: 46/2,
    },
    name: {
        color: colors.text.primary,
        fontFamily: fonts.primary[400],
        fontSize: 16
    },
    message: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[300],
        fontSize: 12,
        textTransform: 'capitalize'
    }
});
