import React from 'react';
import { StyleSheet, Text, View,ImageBackground} from 'react-native';
import { ILGetStarted, ILKsb, ILLogo, ILKenawa } from '../../assets';
import { Button, Gap } from '../../components';
import { colors, fonts } from '../../utils';

const GetStarted = ({navigation}) => {
    return (
        <ImageBackground source={ILGetStarted} style={styles.page}> 
            <View>
                <ILLogo />
                {/* <ILKsb /> */}
                <Text style={styles.title}>Konsultasi dengan dokter jadi lebih mudah & fleksibel</Text>
                {/* <Text style={styles.title}>Mobile App {"\n"}Sistem Pemerintahan Berbasis Elektronik</Text> */}
            </View>            
            <View>
                <Button title="Get Started" onPress={() => navigation.navigate('Register')}/>
                <Gap height={16} />
                <Button title="Sign In" type='secondary' onPress={() => navigation.navigate('Login')}/>
            </View>                     
        </ImageBackground>
    )
}

export default GetStarted;

const styles = StyleSheet.create({
    page: {
        padding: 40,
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        flex: 1
    },

    title: {
        fontSize: 28,
        marginTop: 91,
        color: colors.white,
        fontFamily: fonts.primary[600]
    }
});
