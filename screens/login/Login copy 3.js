import React, { useEffect, useState } from "react";
import { ImageBackground, Modal, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../../app/components/FormSubmitBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RandomText from "../text/RandomText";
import { scale, verticalScale } from "react-native-size-matters";
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().trim().min(8, 'Minimum of 8 characters').required('Password is required'),
   
})
const LoginForm =({navigation}) =>{
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [modal, setModal] = useState(false);
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
          /*AsyncStorage.setItem('first_name', first_name);
          AsyncStorage.setItem('name', name);
          AsyncStorage.setItem('email', email);
          AsyncStorage.setItem('cover', cover);
          AsyncStorage.setItem('subs', subs.toString());
          AsyncStorage.setItem('member', member);
          AsyncStorage.setItem('id', id);*/
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
    const unsubscribe = navigation.addListener('focus', () => {
      setModal(false)
    });
    return unsubscribe;
  }, [navigation]);
    return( 
      <>
      <ImageBackground source={require('../../assets/Login/login.png')} style={styles.container}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#FF6A6A', }}>
              <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#FF6A6A'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Account Deleted</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginTop: verticalScale(20), marginBottom: verticalScale(20) }}>Your account has been deleted from Magus Audio.</Text>
                <TouchableOpacity onPress={()=>setModal(false)} style={{marginBottom: verticalScale(20), width: (width-150)/2, backgroundColor: '#FF6A6A', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#FF6A6A'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
            
          </View>
          
          
        </Modal>
        <FormContainer>
          <Image source={require('../../assets/Login/email.png')} style={styles.bg}/>
          <RandomText fontSize={scale(22)} fontWeight={'bold'} message={"Hello Again!"} /> 
          <RandomText fontSize={scale(10)}  marginTop={verticalScale(10)} marginBottom={verticalScale(30)} message={"Welcome back, you've been missed!"} /> 
          <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={(values, {resetForm}) =>login(values.email, values.password)}>
            {({values,errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit })=>{  
              const {email, password} = values
              return <> 
                <FormInput error={touched.email && errors.email} onBlur={handleBlur('email')} value={email} onChangeText={handleChange('email')} autoCapitalize='none' title='Email' placeholder='Email Address'/>
                <FormInput error={touched.password && errors.password} onBlur={handleBlur('password')} value={password} onChangeText={handleChange('password')} autoCapitalize='none' secureTextEntry title='Password' placeholder='Password'/>
                {error ? (<Text style={{color: '#FF6A6A', fontSize: scale(13), marginBottom: scale(-15), marginTop: scale(-4),textAlign: 'center'}}>{error}</Text>): null}
                <FormSubmitBtn onPress={handleSubmit} title='Login'/>
                <TouchableOpacity onPress={()=> [navigation.navigate("Forgot")]} style={{marginTop: verticalScale(30), alignContent:'center'}}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <RandomText fontSize={scale(11)} fontWeight={'bold'} color={'rgba(24,119,242,1)'} message={"Forgot Password?"}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> [navigation.navigate("Signup")]} style={{marginTop: verticalScale(12), alignContent:'center', marginBottom: verticalScale(50)}}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <RandomText fontSize={scale(11)} message={"Don't have an account? "}/>
                    <RandomText fontSize={scale(11)} marginBottom={verticalScale(20)} fontWeight={'bold'} color={'rgba(24,119,242,1)'} message={"Sign up"}/>
                  </View>
                </TouchableOpacity>
              </>
             }}
          </Formik>
        </FormContainer> 
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
    width: verticalScale(300), height: verticalScale(250), alignSelf: 'center', shadowColor: 'black', shadowOpacity: 0.4
  },
})

export default LoginForm;
