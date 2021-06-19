import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ILNullPhoto } from '../../assets';
import { Header, Profile, List, Gap } from '../../components';
import { colors, getData } from '../../utils';
import { Fire } from '../../config';
import { showMessage } from 'react-native-flash-message';

const UserProfile = ({navigation}) => {
    const [ profile, setProfile ] = useState({
        fullName: '',
        profession: '',
        photo: ILNullPhoto,
    });

    useEffect(() => {
        getData('user')
        .then(res => {
            const data = res;
            data.photo = { uri: res.photo }
            setProfile(data);
        });
    }, []);

    const signOut = () => {
        Fire.auth().signOut()
            .then(() => {
                // console.log('success logout');
                navigation.replace('GetStarted');
                showMessage({
                    message: 'Berhasil Logout',
                    type: "info",
                    backgroundColor: colors.primary,
                    color: colors.white, 
                });
            })
            .catch(err => {
                showMessage({
                    message: err.message,
                    type: "info",
                    backgroundColor: colors.error,
                    color: colors.white, 
                });
            })
    };

    return (
        <View style={styles.page}>
            <Header title="Profile" onPress={() => navigation.goBack()} />
            <Gap height={10} />
            {
                profile.fullName.length > 0 &&  <Profile name={profile.fullName} desc={profile.profession} photo={profile.photo}/>
            }           
            <Gap height={14} />
            <List 
                name="Edit Profile" 
                desc="Last Updated Yesterday" 
                type="next" 
                icon="edit-profile" 
                onPress={() => navigation.navigate('UpdateProfile')}
            />
            <List 
                name="Language" 
                desc="Available 12 languages" 
                type="next" 
                icon="language" 
            />
            <List 
                name="Give Us Rate" 
                desc="On Google Play Store" 
                type="next" 
                icon="star" 
            />
            <List 
                name="Sign Out" 
                desc="Read our guidelines" 
                type="next" 
                icon="help" 
                onPress={signOut}
            />
        </View>
    )
}

export default UserProfile;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
})
