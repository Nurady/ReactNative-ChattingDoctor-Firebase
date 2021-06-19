import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ILLogo } from '../../assets';
import { Fire } from '../../config';
import { colors, fonts } from '../../utils';

const Splash = ({navigation}) => {
    useEffect(() => {
        const unsubscribe = Fire.auth().onAuthStateChanged((user) => {
            setTimeout(() => {
                if(user) {
                    navigation.replace('MainApp'); 
                   } else {
                    navigation.replace('GetStarted'); 
                   }
            }, 2000);           
        });

        return () => unsubscribe();
    }, [navigation]);

    return (
        <View style={ styles.wrapper }>
          <ILLogo/>
          <Text style={ styles.text }>My Doctor</Text>
        </View>
    )
}

export default Splash;

const styles = StyleSheet.create({
    wrapper : {
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        color : colors.text.primary,
        marginTop: 20,
        fontFamily: fonts.primary[600],
    }
});
