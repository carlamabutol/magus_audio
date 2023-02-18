import React, {useEffect, useContext, useState} from "react";
import { ImageBackground, Modal, View, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import CachedImage from 'expo-cached-image'
import { Image as Image1 } from "react-native";
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
import Moment from 'moment';
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Me = ({navigation}) =>{
  const [moodList, setMoodList] = useState([]);
  const [moods, setMoods] = useState([]);
  const [myStatus, setMyStatus] = useState(false);
  const {value, setValue} = useContext(UserContext);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [status, setStatus] = useState([]);
  const [color, setColor ] = useState("");
  const myMoodList =async()=>{
    const resp = await fetch(global.link+"api/v1/moods")
    const data = await resp.json();
    setMoodList(data.data)
  }
  const myMoods = async()=>{
    await fetch(global.link+`api/v1/user/moods/history`, {
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
      const resp1 = await fetch(global.link+"api/v1/user");
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
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object2=== object1.id.toString() ;
      });
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      myMoods()
      myMoodList()
    });
    return unsubscribe;
  }, [navigation]);
  const moodsHistory = (item, index) => {
    return(
      <View style={{flexDirection: 'row', paddingVertical: moderateScale(8), paddingHorizontal: moderateScale(10), borderRadius: moderateScale(20), justifyContent: 'flex-start', alignItems: 'center', backgroundColor: item.description, marginRight: moderateScale(15)}}>
        <CachedImage source={{uri: item.image}} cacheKey={item.image_name} style={{width: moderateScale(25), height: moderateScale(25)}}/>
        <Text style={{fontSize: moderateScale(13), color: 'white', fontWeight: '600', marginLeft: moderateScale(5)}}>{item.name}</Text>
      </View>
    )
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
    navigation.reset({
      index: 0, routes: [{name: "Splash"}]
    })
  }
  const statuMe =()=>{
    if(myStatus==true){
      return(
        <>
          <Text style={{ fontSize: moderateScale(22), color: '#0D0D0D', fontWeight: '800', marginBottom: moderateScale(15), alignSelf: 'flex-start', marginTop: moderateScale(15)}} >My Status</Text>
          <View style={{marginLeft: moderateScale(10), marginRight: moderateScale(10)}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{flexDirection: 'row', marginBottom: moderateScale(10)}}>
                {
                  (getDifference(moodList, moods)).map((item, index) => {
                    if(index ==0 || index==1 || index==2){
                      return(
                        <View key={index}>
                          {moodsHistory(item, index)}
                        </View>
                      )
                    }
                  })
                }
              </View>
              <View style={{flexDirection: 'row', marginBottom: moderateScale(10)}}>
                {
                  (getDifference(moodList, moods)).map((item, index) => {
                    if(index==3 || index == 4 || index==5){
                      return(
                        <View key={index}>
                          {moodsHistory(item, index)}
                        </View>

                      )
                    }
                  })
                }
              </View>
              <View style={{flexDirection: 'row'}}>
                {
                  (getDifference(moodList, moods)).map((item, index) => {
                    if(index==6 || index==7){
                      return(
                        <View key={index}>
                          {moodsHistory(item, index)}
                        </View>
                      )
                    }
                  })
                }
              </View>
            </View>
          </View>
        </>
      )
    }
  }
  return(
    <ImageBackground source={require('../../assets/Today/today.png')} style={styles.container}>
      <SafeAreaView style={{width: width-moderateScale(30), marginHorizontal: moderateScale(15)}}>
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
        
        <View style={{flexDirection: 'row', marginBottom: moderateScale(10)}}>
          <View style={{marginTop: 15, left: 10, alignSelf: 'flex-start', borderRadius: 100, shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 0.8, shadowOffset: {width:1, height: 0}, shadowRadius: 3}}>
            <CachedImage source={{uri: global.maincover}} cacheKey={global.main_cover} style={{width: scale(80), height: scale(80), alignSelf: 'flex-start', borderRadius: 100, shadowColor: 'rgba(4,157,217,0.4)', shadowOpacity: 0.8, shadowOffset: {width:2, height: 2}, shadowRadius: 3}} />
          </View>
          <View style={{ marginTop: -5, marginLeft: 30}}>
            <Text style={{fontSize: moderateScale(16), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'flex-start', marginTop: verticalScale(33)}} >{global.mainname}</Text>
            <Text style={{fontSize: moderateScale(10), color: '#0D0D0D',  alignSelf: 'flex-start', marginTop: scale(3)}} >{global.email}</Text> 
            <Text style={{fontSize: moderateScale(10), color: '#0D0D0D',  alignSelf: 'flex-start', marginTop: scale(3)}} >Member since {Moment(global.member).format('MMM YYYY')}</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {statuMe()}
          <Text style={{ fontSize: moderateScale(22), color: '#0D0D0D', fontWeight: '800', marginBottom: moderateScale(15), alignSelf: 'flex-start', marginTop: moderateScale(15)}} >Menu</Text>
          <View style={{marginLeft: moderateScale(10), marginRight: moderateScale(10)}}>
            <TouchableOpacity onPress={()=> navigation.navigate("Favorites")} style={{flexDirection: 'row', marginBottom: moderateScale(15), alignItems: 'center'}}>
              <View style={{width: moderateScale(48), height: moderateScale(48), borderRadius: moderateScale(30), justifyContent: 'center', alignItems: 'center', backgroundColor: '#31A0FF'}}>
                <Image1 source={require('../../assets/Player/heart.png')} style={{width: moderateScale(32), tintColor: 'white', height: moderateScale(32)}}/>
              </View>
              <Text style={{fontSize: moderateScale(20), color: 'black', fontWeight: '700', marginLeft: moderateScale(10)}}>Favorites</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Playlist1")} style={{flexDirection: 'row', marginBottom: moderateScale(15), alignItems: 'center'}}>
              <View style={{width: moderateScale(48), height: moderateScale(48), borderRadius: moderateScale(30), justifyContent: 'center', alignItems: 'center', backgroundColor: '#F4D73B'}}>
                <Image1 source={require('../../assets/Me/playlist.png')} style={{width: moderateScale(32), tintColor: 'white', height: moderateScale(32)}}/>
              </View>
              <Text style={{fontSize: moderateScale(20), color: 'black', fontWeight: '700', marginLeft: moderateScale(10)}}>Playlists</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Help")} style={{flexDirection: 'row', marginBottom: moderateScale(15), alignItems: 'center'}}>
              <View style={{width: moderateScale(48), height: moderateScale(48), borderRadius: moderateScale(30), justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF5DB4'}}>
                <Image1 source={require('../../assets/Me/help.png')} style={{width: moderateScale(32), tintColor: 'white', height: moderateScale(32)}}/>
              </View>
              <Text style={{fontSize: moderateScale(20), color: 'black', fontWeight: '700', marginLeft: moderateScale(10)}}>Help</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> navigation.navigate("Settings")} style={{flexDirection: 'row', marginBottom: moderateScale(15), alignItems: 'center'}}>
              <View style={{width: moderateScale(48), height: moderateScale(48), borderRadius: moderateScale(30), justifyContent: 'center', alignItems: 'center', backgroundColor: '#BEBEBE'}}>
                <Image1 source={require('../../assets/Me/settings.png')} style={{width: moderateScale(32), tintColor: 'white', height: moderateScale(32)}}/>
              </View>
              <Text style={{fontSize: moderateScale(20), color: 'black', fontWeight: '700', marginLeft: moderateScale(10)}}>Settings</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: moderateScale(22), color: '#0D0D0D', fontWeight: '800', marginBottom: moderateScale(15), alignSelf: 'flex-start', marginTop: moderateScale(15)}} >My Account</Text>
          <TouchableOpacity onPress={()=> out()} style={{marginLeft: moderateScale(10), flexDirection: 'row', marginBottom: moderateScale(15), alignItems: 'center'}}>
            <View style={{width: moderateScale(48), height: moderateScale(48), borderRadius: moderateScale(30), justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(4,157,217,1)'}}>
              <Image1 source={require('../../assets/Me/logout.png')} style={{width: moderateScale(32), tintColor: 'white', height: moderateScale(32)}}/>
            </View>
            <Text style={{fontSize: moderateScale(20), color: 'black', fontWeight: '700', marginLeft: moderateScale(10)}}>Logout</Text>
          </TouchableOpacity>
          <View style={{height: moderateScale(235)}}></View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', backgroundColor: 'white'
  },
 
});
export default Me;