import React, { useState, useEffect } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ILNullPhoto } from '../../../assets'
import { colors, fonts, getData } from '../../../utils'

const HomeProfile = ({onPress}) => {
    const [profile, setProfile] = useState({
        photo: ILNullPhoto,
        fullName: '',
        profession: '',
    });

    useEffect(() => {
        getData('user').then(res => {
            // console.log('Data user: ', res);
            const data = res;
            
            data.photo = {uri: res.photo}
            // console.log('New Profile: ', data);
            setProfile(res);
        })
    }, []);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Image source={profile.photo} style={styles.avatar}/>
            <View >
                <Text style={styles.name}>{profile.fullName}</Text>
                <Text style={styles.job}>{profile.profession}</Text> 
            </View>            
        </TouchableOpacity>
    )
}

export default HomeProfile;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar : {
        height: 46,
        width: 46,
        borderRadius: 46/2,
        marginRight: 12
    },
    name: {
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        fontSize: 16,
        textTransform: 'capitalize',
    },
    job: {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 12,
        textTransform: 'capitalize',
    }
});
