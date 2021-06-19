import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts } from '../../../utils'
import { Button, Gap } from '../../atoms'
import DarkProfile from './DarkProfile'

const Header = ({ onPress, title,type, desc, photo }) => {
    if (type === 'dark-profile') {
        return <DarkProfile onPress={onPress} title={title} desc={desc} photo={photo}/>
    }
    return (
        <View style = {styles.container(type)}>        
            <Button type="icon-only" icon={type === 'dark' ? 'back-light' : 'back-dark'} onPress={onPress}/>                      
            <Text style = {styles.text(type)}>{ title }</Text>
            <Gap width={24}/>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    container: (type) => (
        {
            paddingHorizontal: 16,
            paddingVertical : 25,
            // backgroundColor: colors.white,
            backgroundColor: type === 'dark' ? colors.secondary : colors.header,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomLeftRadius: type === 'dark' ? 20 : 0,
            borderBottomRightRadius: type === 'dark' ? 20 : 0,
        }
    ),
    text: (type) => (
        {
            textAlign: 'center',
            flex: 1,
            color: type=== 'dark' ? colors.white : colors.text.primary,
            fontSize: 20,
            fontFamily: fonts.primary[600],
            textTransform: 'capitalize'
        }
    )
});