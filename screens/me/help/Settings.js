import React, { useState, useEffect, useContext } from "react";
import { Modal, Linking, TextInput, ImageBackground, Image, Text, TouchableOpacity, ScrollView, View, Dimensions, SafeAreaView } from "react-native";
import { moderateScale } from "react-native-size-matters";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Settings1 =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [error, setError] = useState('');
  const [color, setColor] = useState('rgba(4,157,217,1)');
  const [unmount, setUnmount] = useState(true);
  const [hide, setHide] = useState(false);
  const [states, setStates] = useState(true);
  const [text, setText] = useState('');
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height+100){
        return moderateScale(65);
      }else{
        return moderateScale(40);
      }
    }
    else{

      return moderateScale(130);
    }
  }
  const deleled=async()=>{
    await fetch(global.link+`api/v1/user/`+global.id, {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        global.deleted=true
        AsyncStorage.removeItem('id')
        global.id=null
        navigation.reset({
          index: 0, routes: [{name: "Splash"}]
        })
      })
  }
  const sample=async()=>{
    if(text==''){
      return updateError('Please enter you password.', setError);
    }else{
      await fetch(global.link+`api/v1/user/login`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: global.email,
        password: text
      })
      
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      // If user does exist
      if(result.success==true){
        setModal1(false)
        deleled()
        emails()
        
      // User does not exist
      }else if (result.success==false){
        return updateError('Entered password is incorrect.', setError);
      };      
    })
    }

  }
  const emails=async()=>{
      await fetch(global.link+`api/v1/delete/account/email`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: global.email,
      })
      
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
    })
  }
  const confirm=()=>{
    global.deleted=true
    AsyncStorage.removeItem('id')
    global.id=null
    navigation.navigate("Login")
  }
  const one=()=>{
    setStates(true)
    setHide(false)
  }
  const two=()=>{
    setStates(false)
    setHide(true)
  }
  const hideNot=()=>{
    if(hide==true){
      return(
        <TouchableOpacity onPress={()=> one()}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/9055/9055153.png'}} style={{height: moderateScale(14), width: moderateScale(14), tintColor: 'black'}}/>
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={()=> two()}>
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/159/159604.png'}} style={{height: moderateScale(14), width: moderateScale(14), tintColor: 'black'}}/>
        </TouchableOpacity>
      )
    }
  }
  const pass =()=>{
    if(global.standard=="Loaded"){
      if(global.value=="MINIMIZE"){
        global.value="OUT"
        setValue("OUT")
      }
      setModal(false)
      setModal1(true)
    }
  }
  return(
    <ImageBackground source={require('../../../assets/Me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
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
                <Text style={{textAlign: 'center', color: 'white', fontSize: moderateScale(12), fontWeight: '700', padding: moderateScale(5), }}>Delete Account</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: moderateScale(10), marginTop: moderateScale(20), color: '#6A98CA', fontWeight: '600' }}>Are you sure you want to delete your account?</Text>
              <View style={{width: width-130, marginTop: moderateScale(20), marginBottom: moderateScale(20), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>[pass()]} style={{width: (width-150)/2, backgroundColor: '#FF6A6A', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#FF6A6A'}}>
                  <Text style={{ fontSize: moderateScale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setModal(false)} style={{width: (width-150)/2, backgroundColor: 'white', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#FF6A6A'}}>
                  <Text style={{ fontSize: moderateScale(10), fontWeight: '600', textAlign: 'center', color:'#FF6A6A'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          
        </Modal>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal1}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#6A98CA', }}>
              <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#6A98CA'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: moderateScale(12), fontWeight: '700', padding: moderateScale(5), }}>Enter Password</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: moderateScale(20), borderWidth: 0.5, borderColor: '#6A98CA', padding: moderateScale(10), }}>
                <TextInput placeholder={"Password"} value={text} onChangeText={val=> setText(val)} secureTextEntry={states} style={{width: width-moderateScale(150), fontSize: moderateScale(11), color: '#6A98CA', fontWeight: '600'}}/>
                {hideNot()}
              </View>
              {error ? (<Text style={{textAlign: 'center', color: '#FF6A6A', fontSize: moderateScale(10), marginTop: moderateScale(5), fontWeight: '600' }}>{error}</Text>) : null}
              <View style={{width: width-130, marginTop: moderateScale(20), marginBottom: moderateScale(20), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>sample()} style={{width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: moderateScale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setModal1(false)} style={{width: (width-150)/2, backgroundColor: 'white', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: moderateScale(10), fontWeight: '600', textAlign: 'center', color:'#6A98CA'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          
        </Modal>  
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: (20)}, ios: {marginTop: moderateScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.goBack()]} style={{width: moderateScale(38), height: moderateScale(38)}} >
            <Image source={require('../../../assets/back.png')} style={{width: moderateScale(26), height: moderateScale(26)}} />
          </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: moderateScale(21), color: '#0D0D0D', fontWeight: 'bold', }} >Settings</Text>
        </View>
        <ScrollView style={{marginBottom: space(), marginTop: moderateScale(15) }}>
        <Image source={require('../../../assets/Me/settings2.png')} style={{width: moderateScale(280), height: moderateScale(200), alignSelf: 'center',}}/>
          <TouchableOpacity onPress={()=> setModal(true)} style={{flexDirection: 'row', marginTop: 30, left: 50, alignItems: 'center',}}>
            <View style={{width:moderateScale(39), height: moderateScale(39), backgroundColor: '#FF6A6A', borderRadius: moderateScale(30), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
              <Image source={require('../../../assets/Me/delete2.png')} style={{height: moderateScale(20), width: moderateScale(17), tintColor: 'white'}}/>
            </View>
            <Text style={{ fontSize: moderateScale(13), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Delete Account</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Settings1;
