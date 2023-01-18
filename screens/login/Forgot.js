import React, { useEffect, useState } from "react";
import { ImageBackground, Alert, Image, View, Dimensions, StyleSheet, TouchableOpacity, Button, Text, Modal } from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from "../../app/components/FormContainer";
import FormInput from "../../app/components/FormInput";
import FormSubmitBtn from "../FormSubmitBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { scale, verticalScale } from "react-native-size-matters";
const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
})
const Forgot =({navigation}) =>{
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
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
    await fetch(`https://dev.magusaudio.com/api/v1/user/send/reset/password`, {
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
        let link = "https://dev.magusaudio.com/user/reset/password/"+result.token
        await fetch(`https://dev.magusaudio.com/api/v1/reset/password/email`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, link: link
        })
        })
      }else{
        setText1("User Does not Exist!")
        setModal(true)
      }

    })
  }
    return( 
      <>
      <ImageBackground source={require('../../assets/login/bg4.png')} style={styles.container}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{height: 200, backgroundColor: 'white', width: width-100, borderRadius: 20,  alignItems: 'center', justifyContent: 'center',}}>
              <Text style={{textAlign: 'center', fontSize: 18, }}>{text1}</Text>
              <View style={{width: width-130, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=> setModal(false)} style={{width: (width-150)/2, backgroundColor: '#7EC8E3', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={{width: (width-150)/2, backgroundColor: 'rgba(4,157,217,1)', borderRadius: 20, padding: 10}}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center'}}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          
        </Modal>
        <FormContainer>
          <Image source={require('../../assets/login/forgot.png')} style={{alignSelf: 'center', marginTop: scale(-30), height: scale(200), width: scale(300)}}/>
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
})

export default Forgot;

