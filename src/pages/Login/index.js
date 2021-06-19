import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ILLogo} from '../../assets';
import { Button, Gap, Input, Link } from '../../components';
import { colors, fonts, showError, showSuccess, storeData, useForm } from '../../utils';
import { Fire } from '../../config';
import { useDispatch } from 'react-redux';

const Login = ({navigation}) => {
    const [form, setForm] = useForm({
            email: '',
            password: '',
        });

    // const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    const login = () => {
        // console.log('Form: ', form);
        // setLoading(true)
        dispatch({type: 'SET_LOADING', value: true })
        Fire.auth().signInWithEmailAndPassword(form.email, form.password)
            .then(res=> {
                // console.log('success: ', res);
                // setLoading(false);
                dispatch({type: 'SET_LOADING', value: false })
                // setForm('reset');
                Fire.database().ref(`users/${res.user.uid}/`).once('value')
                    .then(resDB => {
                        // console.log('Data User : ', resDB.val());
                        if(resDB.val()) {
                            storeData('user', resDB.val());
                            navigation.replace('MainApp');
                            showSuccess('Login Sukses');
                        }                        
                    });
            })
            .catch(err => {
                // console.log('error: ', err);
                // setLoading(false);
                dispatch({type: 'SET_LOADING', value: false });
                showError(err.message);
            });
    };

    return (
        <View style={styles.page}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Gap height={40} />
                <ILLogo />
                <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
                <Input 
                    label="Email Address" 
                    value={form.email} 
                    onChangeText={value => setForm('email', value)}
                />
                <Gap height={24} />
                <Input 
                    label="Password" 
                    value={form.password} 
                    onChangeText={value => setForm('password', value)}
                    secureTextEntry
                />
                <Gap height={10} />
                <Link title="Forgot My Password" size={12} />
                <Gap height={40} />
                {/* <Button title="Sign In" onPress={() => navigation.replace('MainApp')} /> */}
                <Button title="Sign In" onPress={login} />
                <Gap height={30} />
                <Link 
                    align="center" 
                    title="Create New Account" 
                    size={16} 
                    onPress={() => navigation.navigate('Register')} 
                />
            </ScrollView>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    page: {
        paddingHorizontal: 40,
        backgroundColor: colors.white,
        flex: 1
    },

    title: {
        fontSize: 20,
        marginTop: 40,
        marginBottom: 40,
        color: colors.text.primary,
        fontFamily: fonts.primary[600],
        maxWidth: 153
    }
});