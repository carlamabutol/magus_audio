import React, { useEffect, useState } from "react";
import { ImageBackground, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Modal, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const Login =({navigation}) =>{
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [modal3, setModal3] = useState(true);
  const [modal, setModal] = useState(true);
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');
  const [error3, setError3] = useState('');
  const [error4, setError4] = useState('');
  const [error2, setError2] = useState('');
  const em='/\S+@\S+\.\S+/'
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2000);
  }
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const loginform= async () => {
    if(email.length==0 && password.length==0){
      return updateError('All fields are required!', setError);
    }
    if(email.length==0){
      return updateError('Email Address is required!', setError1);
    }
    if(!isValidEmail(email)){
      return updateError('Email Address is invalid!', setError1);
    }
    if(password.length==0){
      return updateError('Password is required!', setError2);
    }
    if(password.length<8){
      return updateError('Minimum of 8 characters!', setError2);
    }
    if(isValidEmail(email) && password.length>8){
      await fetch(global.link+`api/v1/user/login`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email,
          password: password
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        if(result.success==true){
          global.first_name=result.user.info.first_name;
          global.last_name=result.user.info.last_name;
          global.email=result.user.email;
          global.mainname=result.user.name;
          global.maincover=result.user.info.cover;
          global.main_cover=result.user.info.cover_name;
          global.subs =result.user.info.subscription_id;
          global.member = result.user.created_at;
          global.id =result.user.user_id;
          const id =result.user.user_id;
          AsyncStorage.setItem('id', id)
          navigation.navigate("Home")
        }else{
          return updateError('Email Address and Password are incorrect!', setError);
        }
      })
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    });
    return unsubscribe;
  }, [navigation]);
    return( 
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <ImageBackground source={require('../../assets/Login/login.png')} style={styles.container}>
        
        {error ?(<Modal
            animationType="none"
            transparent={true}
            visible={modal3}
          >
            <View style={styles.modal}>
            </View>
            <View style={styles.modalContainer}>
              <View style={styles.content}>
                <View style={styles.alertContainer}>
                  <Text style={styles.alert}>Alert</Text>
                </View>
                <Text style={styles.modalError}>{error}</Text>
              </View>
            </View>
          </Modal>) : null}
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Image source={require('../../assets/Login/email.png')} style={styles.bg}/>
              <Text style={styles.title}>Hello Again! </Text>
              <Text style={styles.subtitle}>Welcome back, you've been missed! </Text>
                <View style={styles.view}>
                  {error1 ? (<Text style={styles.error}>{error1}</Text>) : null}
                  <TextInput value={email} onChangeText={val=> setEmail(val)} autoCapitalize='none' style={styles.textinput} placeholder="Email Address"/>
                </View>
                <View style={styles.view}>
                  {error2 ? (<Text style={styles.error}>{error2}</Text>) : null}
                  <TextInput value={password} onChangeText={val=> setPassword(val)} autoCapitalize='none' secureTextEntry style={styles.textinput} placeholder="Password"/>
                </View>
                <TouchableOpacity onPress={()=> loginform()} style={styles.button}>
                  <Text style={styles.email}>Login</Text>
                </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Forgot")} style={[styles.touch]} >
                <Text style={styles.dont1}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Signup")} style={[styles.touch1]} >
                <Text style={styles.dont}>Don't have an account? </Text>
                <Text style={styles.sign}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1, justifyContent: 'center', width: width-moderateScale(60), marginHorizontal: moderateScale(30)
  },
  general: {
    marginHorizontal: moderateScale(50), width: width-moderateScale(80), flex: 1
  },
  bg: {
    width: verticalScale(300), height: verticalScale(250), alignSelf: 'center', shadowColor: 'black', shadowOpacity: 0.4
  },
  title: {
    fontSize: verticalScale(20), color: 'black', fontWeight: '600', 
  },
  subtitle: {
    fontSize: verticalScale(12), color: 'black', fontWeight: '400', marginTop: verticalScale(2), marginBottom: 10
  },
  grid: {
    marginTop: moderateScale(20)
  },
  view: {
    borderBottomColor: '#4C89C6', borderBottomWidth: 1, marginTop: verticalScale(20)
  },
  error: {
    alignSelf: 'flex-end', fontSize: verticalScale(12), color: '#FF6A6A', fontWeight: '400', textAlign: 'right', marginBottom: -verticalScale(2), marginTop: -verticalScale(12)
  },
  textinput: {
    marginBottom: moderateScale(8), fontSize: verticalScale(13), fontWeight: '500',
  },
  button: {
    backgroundColor: '#4C89C6', flexDirection: 'row', height: moderateScale(50), alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(10), marginTop: moderateScale(30)
  },
  email: {
    fontSize: scale(16), color: 'white', fontWeight: '500', textAlign: 'center'
  },
  modal: {
    height: height, width: width, flex: 1, backgroundColor: 'black', opacity: 0.4
  },
  modalContainer: {
    height: height, alignItems: 'center', justifyContent: 'center',  width: width, flex: 1, marginTop: -height
  },
  content: {
    backgroundColor: 'white', width: width-moderateScale(80), borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#6A98CA',  
  }, 
  alertContainer: {
    width: width-moderateScale(80), borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#FF6A6A'
  },
  alert: {
    textAlign: 'center', color: 'white', fontSize: verticalScale(14), fontWeight: '700', padding: scale(5), 
  },
  modalError: {
    textAlign: 'center', fontSize: verticalScale(12), marginTop: verticalScale(20), marginBottom: verticalScale(20), color: '#FF6A6A', fontWeight: '600' 
  },
  touch1: {
    marginBottom: scale(40), padding: moderateScale(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10)
  },
  touch: {
    marginBottom: moderateScale(-20), padding: moderateScale(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(20)
  },
  dont1: {
    fontSize: moderateScale(14), color: 'rgba(24,119,242,1)', 
  },
  dont: {
    fontSize: moderateScale(14), color: 'black', 
  },
  sign: {
    fontSize: moderateScale(14), color: 'rgba(24,119,242,1)', fontWeight: '700'
  }
})

export default Login;

