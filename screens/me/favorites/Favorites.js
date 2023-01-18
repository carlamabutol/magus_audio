import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../../StateContext";
import { UserContext } from "../../UserContext";
const Favorites =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [unmount, setUnmount] = useState(true);
  useEffect(()=>{
    findLiked()
    return()=> setUnmount(false)
  }, [data]);
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
        if(unmount){
        setData(getDifference(global.data, result.featured_track_liked));
        global.favorites=(getDifference(global.data, result.featured_track_liked))
        }
      }else{
        global.favorites=[]
        setData([])
      }
    })
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.track_title;
      });
    });
  }
  const play = (item)=>{
    global.playlist=false

    if(global.subs_id!=item.subliminal_id){
      if(global.standard=="Loaded"){
        const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
        global.subs_id=item.subliminal_id
        global.cover=item.cover
        global.title=item.title
        global.category=item.category.name
        global.description=item.description
        global.location="NotToday"
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.value="MINIMIZE"
        }
        setSubliminal(item)
        global.count=1
        for(var i=0; i<item.info.length; i++){
          global.length=item.info.length;
          if(item.info.length==2){
            global.track1=item.info[0].track_id;
            global.volume1=item.info[0].audio_type.volume/100;
            global.type1=item.info[0].audio_type.name;
            global.track2=item.info[1].track_id;
            global.volume2=item.info[1].audio_type.volume/100;
            global.type2=item.info[1].audio_type.name;

          }else if(item.info.length==3){
            global.track1=item.info[0].track_id;
            global.volume1=item.info[0].audio_type.volume/100;
            global.type1=item.info[0].audio_type.name;
            global.track2=item.info[1].track_id;
            global.volume2=item.info[1].audio_type.volume/100;
            global.type2=item.info[1].audio_type.name;
            global.track3=item.info[2].track_id;
            global.volume3=item.info[2].audio_type.volume/100;
            global.type3=item.info[2].audio_type.name;

          }else if(item.info.length==4){
            global.track1=item.info[0].track_id;
            global.volume1=item.info[0].audio_type.volume/100;
            global.type1=item.info[0].audio_type.name;
            global.track2=item.info[1].track_id;
            global.volume2=item.info[1].audio_type.volume/100;
            global.type2=item.info[1].audio_type.name;
            global.track3=item.info[2].track_id;
            global.volume3=item.info[2].audio_type.volume/100;
            global.type3=item.info[2].audio_type.name;
            global.track4=item.info[3].track_id;
            global.volume4=item.info[3].audio_type.volume/100;
            global.type4=item.info[3].audio_type.name;

          }
        }
      }else{
        console.log("Please Wait")
      }
    }else{
      setValue("")
      global.value=""
      global.modalVisible=true
    }
  };
  
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="Favorites"
    navigation.navigate("TodayPlaylist")
  }
  const sizes =()=>{
    if(width*2<=height+100){
      return scale(135);
    }else{
      return scale(105);
    }
  }
  const space=()=>{
    if(width*2<=height){
      return verticalScale(260);
    }else if(width*2<=height+100){
      return verticalScale(310);
    }else{
      return verticalScale(340);
    }
  }
  return(
    <ImageBackground source={require('../../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.navigate("MeFree1")]} style={{width: scale(38), height: scale(38),}} >
          <Image  source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
        </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: scale(21), color: '#0D0D0D', fontWeight: 'bold', }} >Favorites</Text>
        </View>
      
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <View style={{backgroundColor: 'white', width: scale(100), height: scale(30), borderRadius: scale(12), flexDirection: 'row', justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'rgba(4,157,217,1)', fontWeight: 'bold', fontSize: scale(11), justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>Subliminal</Text>
        </View>
        <TouchableOpacity onPress={()=> navigation.navigate("FavoritesMagus")} style={{backgroundColor: 'rgba(4,157,217,1)', width:  scale(100), height: scale(30), borderRadius: scale(12), flexDirection: 'row',justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'white', fontWeight: 'bold', fontSize: scale(11), justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>Playlist</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={{marginTop: 20}}>
      <FlatList
        data={global.favorites}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=> play(item)} onLongPress={()=> addToPlaylist(item)} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
            <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
            
            <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
              <View>
                <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes(), color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(14), marginBottom: 5}}>{item.title}</Text>
                <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes(), color: '#0D0D0D',  fontSize: scale(12),}}>{item.category.name}</Text>
              </View>
              <TouchableOpacity onPress={()=> [global.items=item, navigation.navigate("Three")]} style={{marginRight: -10}}>
                <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: scale(30), height: scale(30),alignSelf: 'flex-end', tintColor: 'black', shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
        style={{padding: 1, marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}
      />
      <View style={{height: space(), width: width/2}}>
      </View>   
    </ScrollView>
    </SafeAreaView>
  </ImageBackground>
  )
}

export default Favorites;