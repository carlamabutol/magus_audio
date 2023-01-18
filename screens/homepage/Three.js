import React, { useState, useEffect, useContext } from "react";
import { Modal, ImageBackground, Image, Text, TouchableOpacity, ScrollView, View, Dimensions, SafeAreaView } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const Three =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [data25, setData25] = useState([]);
  const [likes, setLikes] = useState(false);
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.track_title;
      });
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      findLiked()
    });
    return unsubscribe;
  }, []);
 
  const findLiked=async()=>{
    await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked/all`, {
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
      var arr=[]
      arr.push(result)
      if(arr[0].featured_track_liked!=undefined){
        global.favorites=(getDifference(global.data, result.featured_track_liked));
        const index =result.featured_track_liked.findIndex(object => {
          return object.track_title === global.items.title;
        })
        if(index!=-1){
          setLikes(true)
        }else{
          setLikes(false)
        }
      }else{
        setLikes(false)
        global.favorites=[]
      }

    })
  }
  const likeOrNot= async()=>{
    if(likes==true){
      await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
        body: JSON.stringify({playlist_id: global.items.subliminal_id, status:0,
          user_id: global.id, track_id: global.items.subliminal_id,
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        if(result.length!=0){
        findLiked()}
        else{
            setLikes(false)
        }
      })
    }else if(likes==false){
      await fetch(`https://dev.magusaudio.com/api/v1/track/featured/liked`, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({playlist_id: global.items.subliminal_id, status:1,
        user_id: global.id, track_id: global.items.subliminal_id,
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        findLiked()
      })
    }
  }
  const liked12=()=>{
    if(likes==false){
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/1077/1077035.png'}} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)', }}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Like</Text>
              </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={()=> likeOrNot()} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/128/2077/2077502.png'}} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)', }}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Liked</Text>
              </TouchableOpacity>
      )
    }
  }
  return(
    <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.goBack()]} style={{width: scale(38), height: scale(38)}} >
            <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
          </TouchableOpacity>
        </View>
        <Image source={{uri: global.items.cover}} style={{width: scale(155), height: scale(155), alignSelf: 'center'}} />
              <Text style={{ fontSize: scale(17), marginTop: 15, marginHorizontal: 20, color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >{global.items.title}</Text>
              <Text style={{ fontSize: scale(15), marginTop: 5, marginHorizontal: 20, color: '#505050', fontWeight: '600', alignSelf: 'center', }} >{global.items.category.name}</Text>
             
              <TouchableOpacity onPress={()=> navigation.navigate("ThreeGuide")} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/727/727239.png'}} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)'}}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Guide</Text>
              </TouchableOpacity>
              {liked12()}
              <TouchableOpacity onPress={()=> navigation.navigate("ThreePlaylist")} style={{flexDirection: 'row', marginTop: 25, paddingLeft: 30, alignItems: 'center'}}>
                <View style={{width:scale(35), height: scale(35), borderRadius: scale(35), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
                  <Image source={require('../../assets/playing/add_playlist.png')} style={{height: scale(31), width: scale(31), tintColor: 'rgba(4,157,217,1)'}}/>
                </View>
                <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Add to playlist</Text>
              </TouchableOpacity>
       
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Three;