import React, { useState } from 'react';
import { StyleSheet, View , Text, TextInput} from 'react-native';
import { colors, fonts } from '../../../utils';

const Input = ({ label, value, onChangeText, secureTextEntry, disable }) => {
    // return <View style={{ height: height, width: width }} /> 
    const [border, setBorder] = useState(colors.borderInput) 
    const onFocusForm = () => {
        setBorder(colors.tertiary)
    }

    const onBlurForm = () => {
        setBorder(colors.borderInput)
    }

    return <View>
        <Text style={styles.label}> {label} </Text>
        <TextInput 
            onFocus={onFocusForm} 
            onBlur={onBlurForm} 
            style={styles.input(border)}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            editable={!disable}
            selectTextOnFocus={!disable}
        />
    </View> 
}

export default Input;
const styles = StyleSheet.create({
    input: (border) => (
        {
            borderColor: border,
            borderRadius:10,
            borderWidth: 1,
            padding: 12
        }
    ),

    label: {
        fontSize: 16,
        marginBottom: 6,
        color: colors.text.secondary,
        fontFamily: fonts.primary[600],
    }
});