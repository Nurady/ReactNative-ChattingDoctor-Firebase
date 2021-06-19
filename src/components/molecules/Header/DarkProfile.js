import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { DummyDoctor8 } from '../../../assets';
import { colors, fonts } from '../../../utils';
import { Button } from '../../atoms';

const DarkProfile = ({onPress, title, desc, photo}) => {
    return (
        <View style={styles.container}>
            <Button type="icon-only" icon="back-light" onPress={onPress}/>
            <View style={styles.content}>
                <Text style={styles.name}>{title}</Text>
                <Text style={styles.job}>{desc}</Text>
            </View>           
            <Image source={photo} style={styles.image} />
        </View>
    )
}

export default DarkProfile;

const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.secondary,
        paddingVertical: 30,
        paddingLeft: 20,
        paddingRight: 30,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    content : {
        flex: 1
    },
    image : {
        width: 46,
        height: 46,
        borderRadius: 46/2
    },
    name : {
        color: colors.white,
        fontFamily: fonts.primary[600],
        fontSize: 20,
        textAlign: 'center'
    },
    job: {
        color: colors.text.subTitle,
        fontFamily: fonts.primary[400],
        fontSize: 14,
        textAlign: 'center',
        marginTop: 6,
        textTransform: 'capitalize'
    }
});
