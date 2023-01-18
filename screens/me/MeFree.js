import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import React from 'react';
import { TextInput, ImageBackground, Modal, SafeAreaView, View, FlatList, Image, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import Moment from 'moment';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {scale, verticalScale } from "react-native-size-matters";
import { ScrollView } from "react-native-gesture-handler";

const MeFree = ({navigation}) => {
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [subs, setSubs ] = useState("");
  const [color, setColor ] = useState("");
  const [colorName, setColorName ] = useState("");
  const [moods, setMoods ] = useState([]);
  const [getmoods, setgetMoods ] = useState([]);
  const [subsType, setSubsType]=useState('');
  const [myStatus, setMyStatus]=useState(false);
  const [statusList, setStatusList]=useState([])
  const [unmount, setUnmount] = useState(true);
  const {value, setValue} = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const subscription =(val)=>{
    if(val===3){
      setColor('#FF6680');
    }else if(val===1){
      setColor('#BEBEBE');
    }else if(val===2){
      setColor('#C8C169');
    }else if(val===4){
      setColor('#5B9ACF');
    }else if(val===5){
      setColor('#8F6ACA');
    }else if(val===6){
      setColor('#69C8C8');
    }
    else{ setColor('black')}
  }
  const fetchDataSubliminal = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data11 = await resp1.json();
      const index =data11.findIndex(object => {
        return object.user_id === global.id;
      })
      getValue(data11[index].info.subscription_id);
      if(data11[index].info.subscription_id===3){
        setColor('#FF6680');
      }else if(data11[index].info.subscription_id===1){
        setColor('#BEBEBE');
      }else if(data11[index].info.subscription_id===2){
        setColor('#C8C169');
      }else if(data11[index].info.subscription_id===4){
        setColor('#5B9ACF');
      }else if(data11[index].info.subscription_id===5){
        setColor('#8F6ACA');
      }else if(data11[index].info.subscription_id===6){
        setColor('#69C8C8');
      }
      else{ setColor('black')}
      setSubs(data11[index].info.subscription_id)
      global.subs =data11[index].info.subscription_id;
      global.first_name=data11[index].info.first_name;
      global.last_name=data11[index].info.last_name;
      global.email=data11[index].email;
      global.mainname=data11[index].name;
      global.maincover=data11[index].info.cover;
      global.member = data11[index].created_at;

  };
  useEffect(()=>{
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDataSubliminal()
      mood();
      console.log(global.subs)
      getMoods()
      global.standard="Loaded"
    });
    return unsubscribe;
    

  }, [navigation]);
  const renderItem1 = ({item})=>{
    
    return (
      <View style={{flexDirection: "row", backgroundColor: item.description,width: scale(96), marginTop: 10, height: scale(35), borderRadius: scale(25), marginRight: 5, marginLeft: 5,}}>
        <Image source={{uri: item.image}} style={{width: scale(25), height: scale(25), justifyContent: 'center', alignSelf: 'center', marginLeft: 10,}}/>
        <Text style={{fontSize: scale(10), fontWeight: 'bold', justifyContent: 'center', alignSelf: 'center', marginLeft: 5, color: 'white',   }}>{item.name}</Text>
      </View>
    );
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object2=== object1.id.toString() ;
      });
    });
  }
  const status = () => {
    
    if(myStatus==true){
      return(
        <View>
          <Text style={{ fontSize: scale(16), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10, left: 30}} >My Status</Text>
          <FlatList
          data={getDifference(getmoods, moods)}
          renderItem={renderItem1}
          horizontal
          pagingEnabled
          keyExtractor={item => item.id}
          //extraData={selected}
          style={{marginTop: 0, marginLeft: 30, marginRight:20}}
          showsHorizontalScrollIndicator={false}
        />
        </View>
      )
    }
  }
  const mood = async()=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/moods/history`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({
      user_id: global.id
    })
    })
    .then(res =>{
      return res.json();
    })
    .then(async(result) =>{
      //.log(result.data.current_summary)
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/user");
      const data1 = await resp1.json();
      const user=data1.filter(object=>{
        return object.user_id==global.id
      })
        global.subs=user[0].info.subscription_id
        setMoods(result.data.current_summary);
        if (result.data.current_summary.length==0){
          setMyStatus(false)
        }
        else{
          setMyStatus(true)
        }
    })
} 
  const getValue =async(value)=>{
    if(value==0){
      setSubsType("Expired")
    }
    else{
      const resp = await fetch("https://dev.magusaudio.com/api/v1/subscription")
      const data = await resp.json();
      const object = data.find(obj => obj.id === Number(value));
        setSubsType(object.name)
    }
  }
  const getMoods =async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/moods")
    const data = await resp.json();
    //const object = data.find(obj => obj.id === Number(value));
    setgetMoods(data.data)
  }
  const space=()=>{
    if(global.value!="MINIMIZE"){
      return 80
    }
    else{
      return 160
    }
  }
  const out=()=>{
    if(global.standard=="Loaded"){
      if(global.value=="MINIMIZE"){
        global.value="OUT"
        setValue("OUT")
      }
      setModal(true)
    }
  }
  const finallyOut=()=>{
    AsyncStorage.removeItem('id')
    global.id=null
    navigation.navigate("Magusone")
  }
  const paying =async()=>{
    await fetch(`https://dev.node.magusaudio.com/api/v1/payment/verify/pending`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        user_id: global.id
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        if(result.message=="Pending subscription found."){
          setModal1(true)
        }else{
          navigation.navigate("PaymentTab")
        }
      })
  }
  const upgrade=()=>{
    if(subs==1){
      return(
              <TouchableOpacity onPress={()=> paying()} style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/payment.png')} style={{height: scale(38), width:  scale(38)}}/>
                <Text style={{   fontSize: scale(14), color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Upgrade</Text>
              </TouchableOpacity>
              
      )
    }
  }
  const spaces=()=>{
    if(global.value!="MINIMIZE"){
      return verticalScale(65)
    }
    else{
      return verticalScale(135);
    }
  }
  return (
      <ImageBackground source={require('../../assets/me/profilebg.png')}  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#6A98CA', }}>
              <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#6A98CA'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Logout</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginTop: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Are you sure you want to logout?</Text>
              <View style={{width: width-130, marginTop: verticalScale(20), marginBottom: verticalScale(20), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>[finallyOut()]} style={{width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> setModal(false)} style={{width: (width-150)/2, backgroundColor: 'white', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color:'#6A98CA'}}>Cancel</Text>
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
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginBottom: verticalScale(20), marginTop: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Pending subscription found!</Text>
              <TouchableOpacity onPress={()=>setModal1(false)} style={{marginBottom: verticalScale(20), width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
          </View>
          
          
        </Modal>
        
        <TouchableOpacity onPress={()=> navigation.navigate("SubName")} style={[styles.subscrip,{backgroundColor: color}]}>
          <Text style={{color: 'white', alignSelf: 'center', fontSize: scale(10), fontWeight: 'bold'}}>{subsType}</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row',}}>
          <View style={{marginTop: 15, left: 20, alignSelf: 'flex-start', borderRadius: 100, shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 0.8, shadowOffset: {width:1, height: 0}, shadowRadius: 3}}>
            <Image source={{uri: global.maincover}} style={{width: scale(80), height: scale(80), alignSelf: 'flex-start', borderRadius: 100, shadowColor: 'rgba(4,157,217,0.4)', shadowOpacity: 0.8, shadowOffset: {width:2, height: 2}, shadowRadius: 3}} />
          </View>
          <View style={{ marginTop: -5, marginLeft: 30}}>
            <Text style={{fontSize: scale(14), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: verticalScale(33)}} >{global.mainname}</Text>
            <Text style={{fontSize: scale(9), color: '#0D0D0D',  alignSelf: 'flex-start', marginTop: scale(3)}} >{global.email}</Text> 
            <Text style={{fontSize: scale(9), color: '#0D0D0D',  alignSelf: 'flex-start', marginTop: scale(3)}} >Member since {Moment(global.member).format('MMM YYYY')}</Text>
          </View>
          <TouchableOpacity onPress={()=> [global.imageURI=global.maincover, navigation.navigate("UpdateProfile")]}>
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/1827/1827933.png'}} style={{width: scale(18), height: scale(18), marginTop: 45, marginLeft: scale(32), alignSelf: 'flex-start'}} />
          </TouchableOpacity>
        </View>
        <ScrollView style={{marginBottom: spaces()}}>
        {status()}
        <Text style={{   fontSize: scale(16), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 10, left: 30}} >Menu</Text>
            <View style={{width: Dimensions.get('window').width-100, alignSelf: 'center'}}>
              <TouchableOpacity onPress={()=> navigation.navigate("Favorites")} style={{flexDirection: 'row', marginTop: 19, }}>
                <Image source={require('../../assets/me/heart.png')} style={{height: scale(38), width:  scale(38), }}/>
                <Text style={{   fontSize: scale(14), color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Favorites</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Playlist")}  style={{flexDirection: 'row', marginTop: 15, }}>
                <View style={{height: scale(38), width:  scale(38), backgroundColor: '#FFD700', borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginTop: -5}}>
                  <Image source={require('../../assets/playing/add_playlist.png')} style={{height: scale(28), width:  scale(28), tintColor: 'white'}}/>
                </View>
                <Text style={{   fontSize: scale(14), color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Playlists</Text>
              </TouchableOpacity>
              
              {upgrade()}
              <TouchableOpacity onPress={()=> navigation.navigate("Help")} style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/help.png')} style={{height: scale(38), width:  scale(38), }}/>
                <Text style={{   fontSize: scale(14), color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Help</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=> navigation.navigate("Settings")}  style={{flexDirection: 'row', marginTop: 15, }}>
                <View style={{height: scale(38), width:  scale(38), backgroundColor: '#40DEC0', borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: -5}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/3524/3524636.png'}} style={{height: scale(28), width:  scale(28), tintColor: 'white'}}/>
                </View>
                <Text style={{   fontSize: scale(14), color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Settings</Text>
              </TouchableOpacity>
            </View>
              <Text style={{ fontSize: scale(16), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 20, left: 30}} >My Account</Text>
              <TouchableOpacity onPress={()=> out()}  style={{flexDirection: 'row', marginTop: 15, marginLeft: (50) }}>
                <View style={{height: scale(38), width:  scale(38), backgroundColor: '#4C89C6', borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginTop: -5}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/152/152535.png'}} style={{height: scale(28), width:  scale(28), tintColor: 'white'}}/>
                </View>
                <Text style={{   fontSize: scale(14), color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Log Out</Text>
              </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
  );
}
const styles = StyleSheet.create({
  subscrip: {
    width: scale(95), height: scale(30), justifyContent: 'center', borderRadius:5, alignSelf: 'flex-end', borderWidth: 0.3, marginRight: 20, ...Platform.select({android: {marginTop: 20}, ios: {marginTop: 45}}), marginBottom: -15
  },
  
});

export default MeFree;
/*
<View style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/download.png')} style={{height: 42, width: 42}}/>
                <Text style={{   fontSize: 13, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Download</Text>
                
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Image source={require('../../assets/me/settings.png')} style={{height: 42, width: 42}}/>
                <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold',left: 20, justifyContent: 'center', alignSelf: 'center'}} >Settings</Text>
                          
              </View>

               <TouchableOpacity style={{}}>
            <Text style={{   fontSize: 15, color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: 12, left: 50}} >Switch Account</Text>
          </TouchableOpacity>

*/