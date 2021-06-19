import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Gap, Header, Input, Profile } from '../../components';
import { colors, getData, storeData } from '../../utils';
import { Fire } from '../../config';
import { showMessage } from "react-native-flash-message";
import { launchImageLibrary  } from 'react-native-image-picker';
import { ILNullPhoto } from '../../assets';

const UpdateProfile = ({navigation}) => {
    const [ profile, setProfile ] = useState({
        fullName: '',
        profession: '',
        email: '',
    });

    const [ password, setPassword ] = useState('');
    const [ photo, setPhoto ] = useState(ILNullPhoto);
    const [ photoForDB, setPhotoForDB ] = useState('');

    useEffect(() => {
        getData('user')
            .then((res) => {
                const data = res;
                setPhoto({uri: res.photo});
                setProfile(data);
            })
    }, []);

    const update = () => {
        // console.log('New Profile: ', profile);
        // console.log('New Password: ', password);

        if(password.length > 0) {
            if(password.length < 6) {
                showMessage({
                    message: 'Password Tidak Boleh Kurang dari 6 Karakter',
                    type: "info",
                    backgroundColor: colors.error,
                    color: colors.white, 
                });
            } else {
                // update Password
                updatePassword();
                updateProfileData();
                navigation.replace('MainApp');
            }
        } else {
            updateProfileData();
            navigation.replace('MainApp');
        }       
    };

    const updatePassword = () => {
        Fire.auth().onAuthStateChanged(user => {
            if(user) {
                // update password
                user.updatePassword(password)
                .catch(err=> {
                    showMessage({
                        message: err.message,
                        type: "info",
                        backgroundColor: colors.error,
                        color: colors.white, 
                    });
                })
            }
        })
    }

    const updateProfileData = () => {
        const data = profile;
        data.photo = photoForDB;

        Fire.database()
            .ref(`users/${profile.uid}/`)
            .update(data)
            .then(() => {
                // console.log('Succes Update Profile:', data);
                storeData('user', data);
            })
            .catch(err => {
                showMessage({
                    message: err.message,
                    type: "info",
                    backgroundColor: colors.error,
                    color: colors.white, 
                });
            })
    }

    const changeText = (key, value) => {
        setProfile({
            ...profile,
            [key] : value,
        })
    };

    const getImage = () => {
        launchImageLibrary(
            {quality: 0.5, maxWidth: 200, maxHeight: 200, includeBase64:true},
            response => {
            // console.log('response: ', response)
            if (response.didCancel || response.error) {
                showMessage({
                    message: 'opps,sepertinya anda tidak memilih foto',
                    type: "info",
                    backgroundColor: colors.error,
                    color: colors.white, 
                });
            } else {
            //   console.log('response getImage: ', response)
              const source = {uri: response.uri};    
              setPhotoForDB(`data:${response.type};base64, ${response.base64}`);
              setPhoto(source);
            }
          }
        )
    };

    return (
        <View style={styles.page}>
            <Header title="Edit Profile" onPress={() => navigation.goBack()}/>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <Profile isRemove photo={photo} onPress={getImage}/>
                    <Gap height={16} />
                    <Input 
                        label="Full Name" 
                        value={profile.fullName} 
                        onChangeText={(value) => changeText('fullName', value)}
                    />
                    <Gap height={10} />
                    <Input 
                        label="Pekerjaan" 
                        value={profile.profession} 
                        onChangeText={(value) => changeText('profession', value)}
                    />
                    <Gap height={10} />
                    <Input label="Email Address" value={profile.email} disable/>
                    <Gap height={10} />
                    <Input 
                        label="Password" 
                        secureTextEntry
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                    <Gap height={20} />
                    {/* <Button title="Save Profile" onPress={() => navigation.goBack('UserProfile')}/> */}
                    <Button title="Save Profile" onPress={update}/>
                </View>  
            </ScrollView>                      
        </View>
    )
}

export default UpdateProfile;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    },
    content :{
        padding: 40,
        paddingTop: 10
    }
});
