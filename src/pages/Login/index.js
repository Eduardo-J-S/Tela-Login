import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard } from "react-native";
import firebase from '../../firebase/firebaseConnection';

console.disableYellowBox=true;

import { useNavigation } from "@react-navigation/native";

export default function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function cadastrar(){
        navigation.navigate('Register')
    }

    async function logar(){
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((value)=>{
            alert('Bem-vindo! '+ value.user.email);
            navigation.navigate('Home', {email: value.user.email, nome:value.user.nome})
        })
        .catch(()=>{
            alert('Algo deu errado!')
            return;
        })

        Keyboard.dismiss();
        setEmail('')
        setPassword('')
    }

    return(
        <View style={styles.container}>

            <View style={styles.viewInput}>

                <TextInput 
                style={styles.input}
                placeholder="Email"
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => setEmail(texto) }
                value={email}
                />

                <TextInput 
                style={styles.input}
                placeholder="Password"
                underlineColorAndroid='transparent'
                onChangeText={ (texto) => setPassword(texto) }
                value={password}
                />
            </View>
           
            <View style={styles.btnArea}> 
                <TouchableOpacity style={styles.btn} onPress={logar}>
                    <Text style={styles.btnTexto}>Logar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.btnAreaCad}> 
                <TouchableOpacity style={styles.btn} onPress={cadastrar}>
                    <Text style={styles.btnTexto}>Cadastrar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ccc',
        alignItems: 'center',
    },
    input:{
        height: 40,
        borderWidth: 1,
        borderColor: '#222',
        margin: 10,
        fontSize: 14,
        padding: 10,
        borderRadius: 15,
        width: 320,
        backgroundColor: '#FFF',
        marginTop: 7
    },
    viewInput:{
        marginTop: 230
    },
    btn:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor: '#002200',
        height: 40,
        borderRadius: 20
    },
    btnArea:{
        marginTop:19,
        height: 40,
        width: 320
    },
    btnTexto:{
        color: '#FFF'
    },
    btnAreaCad:{
        marginTop:10,
        height: 40,
        width: 320
    }
})