import React, { useEffect, useState } from "react";
import { ImageBackground, Alert, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text, Modal } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../../app/components/FormSubmitBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
})
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
  
const Forgot =({navigation}) =>{
  const [modal, setModal] = useState(false);
  const [text1, setText1] = useState('');
  
  const userInfo={
    email: ''
  };
  const { email} =userInfo;
  const [error, setError] = useState('');
  const [text, setText] = useState('Cancel');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const forgotpass= async(email)=>{
    await fetch(global.link+`api/v1/user/send/reset/password`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email_address: email,
      })
      
    })
    .then(res =>{
      return res.json();
    })
    .then(async(result) =>{
      if(result.code==200){
        setText1("Check your Email to Reset Password!")
        setModal(true)
          let link = global.link+"user/reset/password/"+result.token
          await fetch(global.link+`api/v1/reset/password/email`, {
          method: "POST",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email, link: link
          })
        })
        return updateError('All fields are required!', setError);
      }else{
        setText1("User Does not Exist!")
        setModal(true)
        return updateError('All fields are required!', setError);

      }

    })
  }
    return( 
      <>
      <ImageBackground source={require('../../assets/Login/login.png')} style={styles.container}>
      
        <FormContainer>
        {error ?(<Modal
            animationType="none"
            transparent={true}
            visible={modal}
          >
            <View style={styles.modal}>
            </View>
            <View style={styles.modalContainer}>
              <View style={styles.content}>
                <View style={styles.alertContainer}>
                  <Text style={styles.alert}>Alert</Text>
                </View>
                <Text style={styles.modalError}>{text1}</Text>
              </View>
            </View>
          </Modal>) : null}
          <Image source={require('../../assets/Login/forgot.png')} style={styles.bg}/>
          <Text style={{  fontSize: scale(22), fontWeight: 'bold', marginTop: scale(5)}}>Forgot Password!</Text>
          <Text style={{  fontSize: scale(10),  marginTop: scale(10), marginBottom: scale(-5), lineHeight: scale(15)}}>Don't worry, it happens.</Text>
          <Text style={{  fontSize: scale(10),  marginTop: scale(10), marginBottom: scale(20), lineHeight: scale(15)}}>Please enter Email Address associated with your account.</Text>
          <Formik initialValues={userInfo} validationSchema={validationSchema} onSubmit={(values, {resetForm}) =>[forgotpass(values.email), resetForm(values= '')] }>
            {({values,errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit })=>{  
              const {email} = values
              return <> 
                <FormInput error={touched.email && errors.email} onBlur={handleBlur('email')} value={email} onChangeText={handleChange('email')} autoCapitalize='none' title='Email' placeholder='Email Address'/>
                <FormSubmitBtn onPress={handleSubmit} title='Submit'/>
            <TouchableOpacity onPress={()=>[navigation.navigate("Login")]} style={{marginTop: verticalScale(20)}}>
              <Text style={{fontSize: scale(10), fontWeight: 'bold', color: 'rgba(24,119,242,1)', textAlign: 'center'}}>{text}</Text>
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
  sub: {height: scale(40), borderRadius: 10, marginTop: scale(15),justifyContent: 'center',  alignItems: 'center', marginHorizontal: 20, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8},
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
  guideBtn: {
    width: Dimensions.get('window').width/1.5, height: 130, borderRadius: 20, justifyContent: 'center', alignItems: 'center'
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
  bg: {
    width: verticalScale(300), height: verticalScale(250), alignSelf: 'center', shadowColor: 'black', shadowOpacity: 0.4
  },
})

export default Forgot;

