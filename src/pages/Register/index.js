import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Gap, Header, Input, Loading } from '../../components';
import { Fire } from '../../config';
import { colors, useForm, storeData } from '../../utils';
import { showMessage, hideMessage } from "react-native-flash-message";

const Register = ({navigation}) => {
    // const [fullName, setFullName] = useState('') 
    // const [profession, setProfession] = useState('') 
    // const [email, setEmail] = useState('') 
    // const [password, setPassword] = useState('') 

    const [form, setForm] = useForm(
        {
            fullName: '',
            profession: '',
            email: '',
            password: '',
        }
    );

    const [loading, setLoading] = useState(false)

    const onContinue = () => {
        // console.log(form)
        setLoading(true)
        Fire.auth()
            .createUserWithEmailAndPassword(form.email, form.password)
            .then((success) => {
                setLoading(false);
                setForm('reset');
                showMessage({
                    message: 'Berhasil Registrasi',
                    type: "info",
                    backgroundColor: colors.primary,
                    color: colors.white, 
                });
                const data = {
                    fullName: form.fullName,
                    profession: form.profession,
                    email: form.email,   
                    uid: success.user.uid,                 
                }
                Fire.database()
                    .ref('users/' + success.user.uid + '/')
                    .set(data)
                
                storeData('user', data);
                navigation.navigate('UploadPhoto', data)
                // console.log('sukses register: ', success)
              })
            .catch((error) => {
                const errorMessage = error.message;
                setLoading(false)
                showMessage({
                    message: errorMessage,
                    type: "info",
                    backgroundColor: colors.error,
                    color: colors.white, 
                });
                // console.log('error register: ', error)
            });            
    };

    return (
        <>
            <View style={styles.page}>
                <Header onPress={() => navigation.goBack()} title="DAFTAR AKUN"/>
                <View style={styles.content}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Gap height={24} />
                        <Input 
                            label="Full Name" 
                            value={form.fullName} 
                            onChangeText={(value) => setForm('fullName', value) }
                        />
                        <Gap height={24} />
                        <Input 
                            label="Pekerjaan" 
                            value={form.profession} 
                            onChangeText={(value) => setForm('profession', value) }
                        />
                        <Gap height={24} />
                        <Input 
                            label="Email Address" 
                            value={form.email} 
                            onChangeText={(value) => setForm('email', value) }
                        />
                        <Gap height={24} />
                        <Input 
                            label="Password" 
                            value={form.password} 
                            onChangeText={(value) => setForm('password', value) }
                            secureTextEntry
                        />
                        <Gap height={40} />
                        <Button title="Continue" onPress={onContinue}/>
                    </ScrollView>               
                </View>            
            </View>
            {
                loading && <Loading/>
            }            
        </>
    );
};

export default Register;

const styles = StyleSheet.create({
    content: {
        padding: 40,
        paddingTop: 0,
    },
    page: {
        backgroundColor: colors.white,
        flex: 1
    }
});
