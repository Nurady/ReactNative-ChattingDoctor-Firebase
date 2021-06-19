import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary  } from 'react-native-image-picker';
import { Button, Gap, Header, Link } from '../../components';
import { IconPhotoPlus, IconPhotoRemove, ILNullPhoto } from '../../assets';
import { colors, fonts, storeData } from '../../utils';
import { showMessage } from "react-native-flash-message";
import { Fire } from '../../config';

const UploadPhoto = ({navigation, route}) => {
    const { fullName, profession, uid } = route.params;
    const [photoForDB, setPhotoForDB] = useState('');
    const [hasPhoto, setHasPhoto] = useState(false)
    const [photo, setPhoto] = useState(ILNullPhoto);
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
              setHasPhoto(true);
            }
          });
      };

    
      const uploadAndContinue = () => {
            Fire.database()
                .ref('users/' + uid + '/')
                .update({photo: photoForDB});
                // console.log(photoForDB)
                const data = route.params;
                data.photo = photoForDB;

                storeData('user', data);

                navigation.replace('MainApp');
      };

    return (
        <View style={styles.page}>
            <Header onPress={() => navigation.goBack()} title="UPLOAD PHOTO"/>
            <View style={styles.content}>
                <View style={styles.profile}>
                    <TouchableOpacity style={styles.avatarWrapper} onPress={getImage}>
                        <Image source={photo} style={styles.avatar}/>
                        { hasPhoto && <IconPhotoRemove style={styles.IconAddPhoto}/> }
                        { !hasPhoto && <IconPhotoPlus style={styles.IconAddPhoto}/> }
                    </TouchableOpacity>
                    <Text style={styles.name}>{fullName}</Text>
                    <Text style={styles.job}>{profession}</Text>                 
                </View>                  
                <View>
                    <Button 
                        disable={!hasPhoto} 
                        title="Upload and Continue" 
                        onPress={uploadAndContinue}
                    />
                    <Gap height={30}/>
                    <Link align="center" title="Skip For This" size={16} onPress={() => navigation.replace('MainApp')}/>
                </View>
            </View>            
        </View>
    )
}

export default UploadPhoto;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex:1
    },
    content: {
        paddingHorizontal: 40,
        paddingBottom: 64,
        flex: 1,
        justifyContent: 'space-between',
    },
    avatar: {
        width: 110,
        height: 110,
        borderRadius: 110/2,
    },
    avatarWrapper: {
        width: 130,
        height: 130,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        borderRadius: 130/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    IconAddPhoto :{
        position: 'absolute',
        bottom: 8,
        right: 6
    },
    name: {
        color: colors.text.primary,
        fontSize: 24,
        fontFamily: fonts.primary[600],
        textAlign: 'center'
    },
    job: {
        color: colors.text.secondary,
        fontSize: 18,
        fontFamily: fonts.primary.normal,
        textAlign: 'center',
        marginTop: 4
    },
    profile: {
        alignItems:'center',
        justifyContent: 'center',
        flex: 1
    }
});
