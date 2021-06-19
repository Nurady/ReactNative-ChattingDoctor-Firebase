import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconPhotoRemove } from '../../../assets';
import { colors, fonts } from '../../../utils';

const Profile = ({ name, desc, isRemove, photo, onPress }) => {
    return (
        <View style={styles.container}>
            {
                !isRemove && (
                    <View style={styles.borderProfile}>
                    <Image source={ photo } style={styles.avatar}/>
                    {
                        isRemove && <IconPhotoRemove style={styles.removePhoto}/>
                    }                
                </View>
                )
            }           
            {
                isRemove && (
                    <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
                        <Image source={ photo } style={styles.avatar}/>
                        {
                            isRemove && <IconPhotoRemove style={styles.removePhoto}/>
                        }                
                    </TouchableOpacity>
                )
            }
            {
                name && (
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <Text style={styles.job}>{desc}</Text>
                    </View>
                )
            }            
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 110/2
    },
    removePhoto: {
        position: 'absolute',
        right: 8,
        bottom: 8
    },
    borderProfile: {
        width: 130,
        height: 130,
        borderRadius: 130/2,
        borderWidth: 1,
        borderColor: colors.borderInput,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        fontSize: 20,
        marginTop: 16,
        textAlign: 'center'
    },
    job : {
        color: colors.text.secondary,
        fontFamily: fonts.primary[400],
        fontSize: 16,
        marginTop: 0,
        textAlign: 'center'
    }
});
