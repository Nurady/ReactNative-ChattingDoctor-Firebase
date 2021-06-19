import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../utils';
import IsMe from './IsMe';
import Other from './Other';

const ChatItem = ({isMe, text, date, photo}) => {
    if (isMe) {
        return <IsMe text={text} date={date} />
    }
    return <Other text={text} date={date} photo={photo}/>
    // return (
    //     <View style={styles.container}>
    //         <View style={styles.chatContent}>
    //             <Text style={styles.text}>Ibu dokter, apakah memakan jeruk tiap hari itu buruk?</Text>
    //         </View>            
    //         <Text style={styles.date}>4.20 AM</Text>
    //     </View>
    // )
}

export default ChatItem;