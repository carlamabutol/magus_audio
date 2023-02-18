import React, { useEffect, useState } from "react";
import { ImageBackground, TextInput, Modal, Image, View, SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, Keyboard, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../../app/components/FormSubmitBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RandomText from "../text/RandomText";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().trim().min(8, 'Minimum of 8 characters').required('Password is required'),
   
})
const LoginForm =({navigation}) =>{
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [modal3, setModal3] = useState(true);
  const [passStatus, setPassStatus] = useState(true);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent) { // Remove type here if not using TypeScript
    setKeyboardHeight(e.endCoordinates.height);
  }

  function onKeyboardDidHide() {
    setKeyboardHeight(0);
  }
let login = async (email, password)=>{
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
        // Old user
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
            navigation.reset({
              index: 0, routes: [{name: "Home"}]
            })
      // User does not exist
      }else if (result.success==false){
        return updateError('Incorrect email and password!', setError);
      };      
    })
    
};

  const userInfo={
    email: '', password: ''
  };
  const { email, password} =userInfo;
  const [error, setError] = useState('');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    const hideSubscription = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
    return( 
      <>
        <ImageBackground  source={require('../../assets/Login/signin.png')} style={styles.container}>
          
          {error ? (
                  <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modal3}
                >
                <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
                </View>
                <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
                  <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#427AB3', }}>
                    <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#427AB3'}}>
                      <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
                    </View>
                    <Text style={{textAlign: 'center', fontSize: scale(10), marginBottom: verticalScale(20),  marginTop: verticalScale(20), color: '#427AB3', fontWeight: '600' }}>{error}</Text>
                  </View>
                </View>
              </Modal>
                  ):null}
          <SafeAreaView style={{height: height, width: width}}>
            <View style={[styles.bottomView, {...Platform.select({android: {bottom: 0}, ios: {bottom: keyboardHeight}}), }]}>
              <FormContainer>
                <Text style={{color: '#427AB3', fontWeight: '700', fontSize: moderateScale(25), marginTop: moderateScale(55), marginBottom: moderateScale(10), textAlign: 'center' }}>Welcome Back!</Text>
                <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={(values, {resetForm}) =>login(values.email, values.password)}>
                  {({values,errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit })=>{  
                    const {email, password} = values
                    return <> 
                      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: moderateScale(3), marginHorizontal: 20}}>
                        {touched.email && errors.email ? (<Text style={{color: 'red', fontSize: moderateScale(11), justifyContent: 'flex-start', marginRight: moderateScale(10), marginBottom: moderateScale(-20), marginTop: moderateScale(-4)}}>{touched.email && errors.email}</Text>) : null}
                        </View>
                        <View style={{backgroundColor: 'white', elevation: 5, shadowColor: 'gray', shadowOpacity: 0.4, shadowOffset: {width: 1, height:1}, alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(10), marginTop: moderateScale(10), marginBottom: moderateScale(10), marginHorizontal:moderateScale(20), height: moderateScale(45), borderWidth: 0.4, borderColor: 'gray', flexDirection: 'row'}}>
                          <TextInput onBlur={handleBlur('email')} value={email} onChangeText={handleChange('email')} autoCapitalize='none' title='Email' placeholder='Email Address' style={{fontSize: moderateScale(13), marginLeft: moderateScale(5), width: Dimensions.get('window').width-moderateScale(110)}}/>
                          <Image source={require('../../assets/Login/1mail.png')} style={{height: moderateScale(25), width: moderateScale(25), marginLeft: moderateScale(5)}}/> 
                      </View>
                      <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginBottom: moderateScale(3), marginHorizontal: 20}}>
                        {touched.password && errors.password ? (<Text style={{color: 'red', fontSize: moderateScale(11), justifyContent: 'flex-start', marginRight: moderateScale(10), marginBottom: moderateScale(-20), marginTop: moderateScale(-4)}}>{touched.password && errors.password}</Text>) : null}
                        </View>
                        <View style={{backgroundColor: 'white', shadowColor: 'gray', elevation: 5, shadowOpacity: 0.4, shadowOffset: {width: 1, height:1}, alignItems: 'center', justifyContent: 'center', borderRadius: moderateScale(10), marginTop: moderateScale(10), marginBottom: moderateScale(10), marginHorizontal:moderateScale(20), height: moderateScale(45), borderWidth: 0.4, borderColor: 'gray', flexDirection: 'row'}}>
                          <TextInput secureTextEntry={passStatus} onBlur={handleBlur('password')} value={password} onChangeText={handleChange('password')} autoCapitalize='none' title='Password' placeholder='Password' style={{fontSize: moderateScale(13), marginLeft: moderateScale(5), width: Dimensions.get('window').width-moderateScale(110)}}/>
                          <TouchableOpacity onPress={()=> [setPassStatus(!passStatus)]}>
                            <Image source={passStatus==true ? require('../../assets/Login/pass2.png') : require('../../assets/Login/pass.png')} style={{height: moderateScale(25), width: moderateScale(25), marginLeft: moderateScale(5)}}/> 
                          </TouchableOpacity>
                      </View>
                      <FormSubmitBtn onPress={handleSubmit} title='Login'/>
                      <TouchableOpacity onPress={()=> [navigation.navigate("Forgot")]} style={{marginTop: moderateScale(12), alignContent:'center'}}>
                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                          <RandomText fontSize={moderateScale(11)} fontWeight={'bold'} color={'rgba(24,119,242,1)'} message={"Forgot Password?"}/>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=> [navigation.navigate("Signup")]} style={{marginTop: moderateScale(10), alignContent:'center', marginBottom: verticalScale(50)}}>
                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                          <RandomText fontSize={moderateScale(11)} message={"Don't have an account? "}/>
                          <RandomText fontSize={moderateScale(11)} marginBottom={moderateScale(20)} fontWeight={'bold'} color={'rgba(24,119,242,1)'} message={"Sign up"}/>
                        </View>
                      </TouchableOpacity>
                    </>
                  }}
                </Formik>
              </FormContainer> 
            </View>
            <View style={{width: '100%', height: moderateScale(280), justifyContent: 'center', alignItems: 'center', position: 'absolute', ...Platform.select({android: {bottom: moderateScale(280)}, ios: {bottom: moderateScale(280)+keyboardHeight,}}) }}>
              <Image source={require('../../assets/Login/signinn.png')} style={{height: moderateScale(270), width: moderateScale(270), alignSelf: 'flex-start', marginLeft: -moderateScale(20), shadowColor: 'black', shadowOpacity: 0.3}}/>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
    borderColor: "black",
    borderWidth: 0.5,
    height: 38,
    width: 270,
    backgroundColor: '#0F52BA',
    elevation:2,
    marginTop: 30,
    borderRadius: 5,
  },
  bg: {
    width: moderateScale(300), height: moderateScale(250), alignSelf: 'center', shadowColor: 'black', shadowOpacity: 0.4
  },
  bottomView: {
    width: '100%',
    height: moderateScale(340),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    borderTopRightRadius: moderateScale(25), borderTopLeftRadius: moderateScale(25)
  },
  bottomViews: {width: '100%', height: moderateScale(280), justifyContent: 'center', alignItems: 'center', position: 'absolute'}
})

export default LoginForm;
