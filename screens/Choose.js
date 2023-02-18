import React from "react";
import { SafeAreaView,ImageBackground, Image, View, Dimensions, Text, StyleSheet, TouchableOpacity, Button, TextInput } from "react-native";
import * as Yup from 'yup';
import { useEffect } from "react";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const Choose =({navigation}) =>{
  useEffect(() => {
    global.email="";
    global.first_name="";
    global.mainname=""
    global.maincover="";
    global.subs ="";
    global.member = "";
    global.id ="";
    global.reco=""
    global.track1=""
    global.volume1=""
    global.type1=""
    global.track2=""
    global.volume2=""
    global.type2=""
    global.track3=""
    global.volume3=""
    global.type3=""
    global.location=""
    global.count=""
    global.subs_id=""
    global.category=""
    global.selectedCategory=""
    global.selectedName=""
    global.value=""
    global.array="";
    global.title="";
    global.cover="";
    global.liked=false
    global.myPlaylist_liked=false
    global.playlist=false
    global.favorites=[]
    global.userPlaylist=[]
    global.standard="Loaded"
    global.modalVisible=false
   }, []);
    return(
      <>
        <ImageBackground source={require('../assets/Login/welcome.png')} style={styles.container}>
          <SafeAreaView style={{height: height, width: width}}>
            <View style={styles.bottomView}>
              <TouchableOpacity onPress={()=> navigation.navigate("Login")} style={styles.touch} >
                <Image style={styles.imahe} source={require('../assets/Choose/email.png')} />
                <Text style={styles.email}>Sign in with Email</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Signup")} style={styles.touch1} >
                <Text style={styles.dont}>Don't have an account? </Text>
                <Text style={styles.sign}>Sign up </Text>
              </TouchableOpacity>
            </View>
            <View style={{width: '100%', height: moderateScale(280), justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: moderateScale(170), }}>
              <Image source={require('../assets/Login/up1.png')} style={{height: moderateScale(330), width: moderateScale(330), alignSelf: 'flex-end', shadowColor: 'black', shadowOpacity: 0.3}}/>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center',
  },
  deer: {
    width: verticalScale(160), height: verticalScale(200), alignSelf: 'center', marginTop: verticalScale(100), shadowColor: 'black', shadowOpacity: 0.4
  },
  title: {
    fontSize: verticalScale(35), color: 'white', fontWeight: '900', textAlign: 'center', marginTop: verticalScale(30), textShadowColor: 'black', textShadowRadius: 3, textShadowOffset: {width: -1, height: -1.5}
  },
  subtitle: {
    fontSize: verticalScale(18), color: 'white', fontWeight: '500', textAlign: 'center', marginTop: verticalScale(5), textShadowColor: 'black', textShadowRadius: 1, textShadowOffset: {width: -1, height: -1}
  },
  touch: {
    backgroundColor: 'white', shadowColor: 'gray', shadowOpacity: 0.4, shadowOffset: {width: 1, height:1}, borderWidth: 0.4, borderColor: 'gray', width: width-(100), borderRadius: 20, padding: moderateScale(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(20)
  },
  imahe: {
    width: moderateScale(30), height: moderateScale(30), tintColor: '#4C89C6'
  },
  email: {
    fontSize: scale(16), color: 'black', marginLeft: scale(20)
  },
  touch1: {
    width: width-(100), padding: moderateScale(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: verticalScale(10)
  },
  dont: {
    fontSize: moderateScale(14), color: 'black',
  },
  sign: {
    fontSize: moderateScale(14), color: 'rgba(24,119,242,1)', fontWeight: '700'
  },
  bottomView: {
    width: '100%',
    height: moderateScale(200),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', 
    bottom: 0, borderTopRightRadius: moderateScale(25), borderTopLeftRadius: moderateScale(25)
  },
});
export default Choose;
/*<TouchableOpacity onPress={()=> navigation.navigate("Login")}  style={{marginBottom: 30,flexDirection: 'row',backgroundColor: '#1877F2', width: width-100, height: 50, borderRadius: 50,alignItems: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width:0, height: 0}}}>
            <Image source={require('../../assets/facebook.png')}style={{width: 25, height: 25, marginRight: -15, marginLeft: 30, tintColor: 'white'}}/> 
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'white', width: width-250, justifyContent: 'center', textAlign: 'center',flex: 1, flexShrink: 1, justifyContent: 'center', flexWrap: 'wrap' }}>Sign in with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginBottom: 150,flexDirection: 'row',backgroundColor: 'white', width: width-100, height: 50, borderRadius: 50,alignItems: 'center', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width:0, height: 0}}}>
            <Image source={require('../../assets/google.png')} style={{width: 25, height: 25, marginRight: -15, marginLeft: 30}}/> 
            <Text style={{fontSize: 13, fontWeight: 'bold', color: 'black', width: width-250, justifyContent: 'center', textAlign: 'center',flex: 1, flexShrink: 1, justifyContent: 'center', flexWrap: 'wrap' }}>Sign in with Google</Text>
          </TouchableOpacity> */