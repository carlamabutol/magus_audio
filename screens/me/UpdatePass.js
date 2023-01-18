import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, Modal, TextInput, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, View, Dimensions } from "react-native";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import Moment from 'moment';
import { Camera, CameraType } from 'expo-camera';
import { scale, verticalScale } from "react-native-size-matters";

const UpdatePass =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [image, setImage] = useState(global.maincover);  
  const [text1, setText1] = useState("");
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  const [modal3, setModal3] = useState(true);
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(67,156,212,0.9)');
  const [colors, setColors] = useState('rgba(67,156,212,0.9)');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setImage(global.imageURI)
    });
    return unsubscribe;
  
   }, [navigation]);
  const texting=(val)=>{
    setText(val)
  }
  const texting1=(val)=>{
    setText1(val)
  }
  const texting2=(val)=>{
    setText2(val)
  } 
  const update = async ()=>{
    if(text=='' || text1=='' || text2==''){
      setColors('#FF6A6A')
      return updateError("All Fields are Required!", setError); 
    }else if(text1!=text2){
      setColors('#FF6A6A')
      return updateError("New Password does not Match!", setError); 
    }else{
      await fetch(`https://dev.magusaudio.com/api/v1/user/change/password/`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
          body: JSON.stringify({email: global.email, current_password: text, 
            new_password: text1, confirm_new_password: text2
          })
        })
        .then(res =>{
          return res.json();
        })
        .then((result) =>{
          if(result.success==false){
            setColors('#FF6A6A')
            return updateError("Current Password is Incorrect!", setError); 
          }else{
            setText('')
            setText1('')
            setText2('')
            setColors('#6A98CA')
            return updateError("Change Password Successfully!", setError); 

          }
        })
    }
   
  }
  const space1=()=>{
    if(global.value!="MINIMIZE"){
      return 90
    }
    else{
      return 160
    }
  }
    return (
    <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
      {error ? (
                <Modal
                animationType="slide"
                transparent={true}
                visible={modal3}
              >
              <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
              </View>
              <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
                <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: colors, }}>
                  <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: colors}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
                  </View>
                  <Text style={{textAlign: 'center', fontSize: scale(10), marginBottom: verticalScale(20),  marginTop: verticalScale(20), color: colors, fontWeight: '600' }}>{error}</Text>
                  
                </View>
              </View>
              
              
            </Modal>
                
                ):null}    
          <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: -10}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.navigate("MeFree1")]} style={{width: scale(38), height: scale(38)}} >
          <Image  source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26), marginTop: scale(4)}} />
          </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: scale(21), color: '#0D0D0D', fontWeight: 'bold', }} >Password</Text>
        </View>
        <Image source={require('../../assets/login/signup.png')} style={{width: scale(130), height: scale(130), alignSelf: 'center',}}/>
        <TextInput secureTextEntry onChangeText={val=> texting(val)} placeholder={"Current Password"} style={{borderBottomWidth: 2, marginTop: 20, borderBottomColor: 'rgba(24,119,242,0.4)', height: scale(27), fontSize: scale(11), marginBottom: 5, marginHorizontal:50}}/>
        <TextInput secureTextEntry onChangeText={val=> texting1(val)} placeholder={"New Password"} style={{borderBottomWidth: 2, marginTop: 20, borderBottomColor: 'rgba(24,119,242,0.4)', height: scale(27), fontSize: scale(11), marginBottom: 5, marginHorizontal:50}}/>
        <TextInput secureTextEntry onChangeText={val=> texting2(val)} placeholder={"Confirm New Password"} style={{borderBottomWidth: 2, marginTop: 20, borderBottomColor: 'rgba(24,119,242,0.4)', height: scale(27), fontSize: scale(11), marginBottom: 5, marginHorizontal:50}}/>
        
        <TouchableOpacity onPress={()=> update()} style={{height: scale(40), backgroundColor: '#4C89C6', borderRadius: 10, marginTop: scale(20),justifyContent: 'center',  alignItems: 'center', marginHorizontal: 50, shadowColor: 'black', shadowOffset: {width:0, height: 0}, shadowOpacity: 0.8}}>
          <Text style={{fontSize: scale(14), fontWeight: 'bold', color: '#fff'}}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate("UpdateProfile")} style={{width: width-100, marginHorizontal: 50, borderRadius: 10, padding: 8, marginTop: 15, flexDirection: 'row', borderColor: 'white', borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: scale(14)}}>Update Profile</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});


export default UpdatePass;