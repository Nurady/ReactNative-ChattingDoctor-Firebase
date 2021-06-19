import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChatItem, Header, InputChat } from '../../components';
import { colors, fonts, getChatTime, setDateChat, getData, showError } from '../../utils';
import { Fire } from '../../config';

const Chatting = ({navigation, route}) => {
    const dataDoctor = route.params;
    const [ chatContent, setChatContent ] = useState("");
    const [ user, setUser ] = useState({});
    const [ chatData, setChatData ] = useState([]);

    useEffect(() => {
        getDataUserFromLocal();
        const chatID = `${user.uid}_${dataDoctor.data.uid}`;
        const urlFirebase = `chatting/${chatID}/allChat/`;
        Fire.database()
            .ref(urlFirebase)
            .on('value', (snapshot) => {
                // console.log('data chat: ', snapshot.val());
                if(snapshot.val()) {
                    const dataSnapshot = snapshot.val();
                    const allDataChat = [];
                    Object.keys(dataSnapshot).map(key => {
                        const dataChat = dataSnapshot[key];
                        const newDataChat = [];
                        Object.keys(dataChat).map(itemChat => {
                            newDataChat.push({
                                id: itemChat,
                                data: dataChat[itemChat]
                            });
                        });
                        allDataChat.push({
                            id: key,
                            data: newDataChat
                        });
                    });
                    // console.log('All Data Chat: ', allDataChat);
                    setChatData(allDataChat);
                }
            });
    }, [dataDoctor.data.uid, user.uid]);

    const getDataUserFromLocal = () => {
        getData('user')
        .then(res => {
            // console.log('User Login: ', res);
            setUser(res);
        })
    };

    const chatSend = () => {
        // console.log('Chat Yang Akan Dikirim: ', chatContent);
        // console.log('user: ', user);
        const today = new Date();
       
        const data = {
            sendBy: user.uid,
            chatDate: today.getTime(),
            chatTime: getChatTime(today),
            chatContent: chatContent
        };
        const chatID = `${user.uid}_${dataDoctor.data.uid}`;
        const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
        const urlMessageUser = `messages/${user.uid}/${chatID}`;
        const urlMessageDoctor = `messages/${dataDoctor.data.uid}/${chatID}`;

        const dataHistoryChatForUser = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: dataDoctor.data.uid
        };

        const dataHistoryChatForDoctor = {
            lastContentChat: chatContent,
            lastChatDate: today.getTime(),
            uidPartner: user.uid
        };

        // console.log('Data Yang Akan Dikirim: ', data);
        // console.log('URl Yang Akan Dikirim: ', urlFirebase);

        // Kirim ke firebase
        Fire.database()
            .ref(urlFirebase)
            .push(data)
            .then(() => {
                setChatContent("");
                // Set History For User
                Fire.database()
                    .ref(urlMessageUser)
                    .set(dataHistoryChatForUser)

                // Set History For Doctor
                Fire.database()
                    .ref(urlMessageDoctor)
                    .set(dataHistoryChatForDoctor)
            })
            .catch(err => {
                showError(err.message);
            })
    }

    return (
        <View style={styles.page}>
            <Header 
                type="dark-profile" 
                title={dataDoctor.data.fullName} 
                desc={dataDoctor.data.profession} 
                photo={{uri: dataDoctor.data.photo} }
                onPress={() => navigation.goBack()}
            />
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        chatData.map(chat => {
                            return (
                                <View key={chat.id}>
                                    <Text style={styles.chatDate}>{chat.id}</Text>
                                    {
                                        chat.data.map(itemChat => {
                                            const isMe = itemChat.data.sendBy === user.uid;
                                            return <ChatItem 
                                                        key ={itemChat.id}
                                                        isMe = {isMe}
                                                        text = {itemChat.data.chatContent} 
                                                        date = {itemChat.data.chatTime} 
                                                        photo = {isMe ?  null : {uri: dataDoctor.data.photo} }
                                                    />
                                        })
                                    }
                                    {/* <ChatItem isMe/>
                                    <ChatItem />
                                    <ChatItem isMe/> */}
                                </View>
                            );
                        })
                    }    
                </ScrollView>                
            </View>            
            <InputChat 
                value={chatContent}
                onChangeText={(value) => setChatContent(value)}
                onButtonPress={chatSend}
            />
        </View>
    )
}

export default Chatting;

const styles = StyleSheet.create({
    page: {
        backgroundColor: colors.white,
        flex: 1
    },
    chatDate: {
        color: colors.text.secondary,
        fontFamily:  fonts.primary[400],
        fontSize: 11,
        textAlign: 'center',
        marginVertical: 20
    },
    content: {
        flex: 1,
        backgroundColor: colors.white
    }
});
