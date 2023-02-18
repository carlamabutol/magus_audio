import React, {useEffect, useContext, useState} from "react";
import { ImageBackground, View, SafeAreaView, StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { Image as Image1 } from "react-native";
import CachedImage from 'expo-cached-image'
import { Image } from "react-native-expo-image-cache";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
const Play_List = ({navigation}) =>{
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [list, setList] = useState([]);
  const [heart, setHeart] = useState(false);
  const [likeID, setLikeID] = useState('')
  const fetchFeatured = async () => {
    const resp = await fetch(global.link+"api/v1/track/"+global.favplaylist.playlist_id);
    const data5 = await resp.json();
    const unique=getDifference(global.data, data5.tracks)
    const array = unique.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setList(array)
  };
  const play=()=>{
    if(global.standard="Loaded"){
    global.list=list
    global.lists=list
    global.looping='no'
    global.shuffling=false
    global.playlist1=true
      global.cover=global.list[0].cover
      global.location="NotToday"
      global.title=global.list[0].title
      global.subs_id=global.list[0].subliminal_id
      global.category=global.list[0].category.name
      global.guide=global.list[0].guide
      global.description=global.list[0].description
      global.cover_name=global.list[0].cover_name
      if(value!="MINIMIZE"){
        setValue("MINIMIZE")
        global.count=1
        global.value="MINIMIZE"
      }else{global.count=1}
      setSubliminal(global.list[0])
      global.category=global.list[0].category.name
      for(var i=0; i<global.list[0].info.length; i++){
        if( global.list[0].info.length==1){
          global.track1=global.list[0].info[0].track_id;
          global.volume1= global.list[0].info[0].volume/100
          global.type1=global.list[0].info[0].audio_type.name;
          
        }else if( global.list[0].info.length==2){
          global.track1=global.list[0].info[0].track_id;
          global.volume1= global.list[0].info[0].volume/100
          global.type1=global.list[0].info[0].audio_type.name;
          
          global.track2=global.list[0].info[1].track_id;
          global.volume2= global.list[0].info[1].volume/100
          global.type2=global.list[0].info[1].audio_type.name;
          
        }else if(global.list[0].info.length==3){
          global.track1=global.list[0].info[0].track_id;
          global.volume1= global.list[0].info[0].volume/100
          global.type1=global.list[0].info[0].audio_type.name;
          
          global.track2=global.list[0].info[1].track_id;
          global.volume2= global.list[0].info[1].volume/100
          global.type2=global.list[0].info[1].audio_type.name;

          global.track3=global.list[0].info[2].track_id;
          global.volume3= global.list[0].info[2].volume/100
          global.type3=global.list[0].info[2].audio_type.name;
          
        }else if(global.list[0].info.length==4){
          global.track1=global.list[0].info[0].track_id;
          global.volume1= global.list[0].info[0].volume/100
          global.type1=global.list[0].info[0].audio_type.name;
          
          global.track2=global.list[0].info[1].track_id;
          global.volume2= global.list[0].info[1].volume/100
          global.type2=global.list[0].info[1].audio_type.name;

          global.track3=global.list[0].info[2].track_id;
          global.volume3= global.list[0].info[2].volume/100
          global.type3=global.list[0].info[2].audio_type.name;

          global.track4=global.list[0].info[3].track_id;
          global.volume4= global.list[0].info[3].volume/100
          global.type4=global.list[0].info[3].audio_type.name;
        }
      }
      global.length=global.list[0].info.length;
    }else{
      console.log('please wait')
    }
  }
  const play1=(item)=>{
    if(global.subs_id!=item.subliminal_id){
      global.list=list
      global.lists=list
      global.playlist1=true
      global.shuffling=false
      if(global.standard=="Loaded"){
        const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
        global.subs_id=item.subliminal_id
        global.cover=item.cover
        global.title=item.title
        global.category=item.category.name
        global.location="NotToday"
        global.description=item.description
        global.guide=item.guide
        global.looping='no'
        global.cover_name=item.cover_name
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.value="MINIMIZE"
        }
        setSubliminal(item)
        global.count=1
        for(var i=0; i<item.info.length; i++){
          global.length=item.info.length;
          if(item.info.length==1){
            global.track1=item.info[0].track_id;
            global.volume1=item.info[0].audio_type.volume/100;
            global.type1=item.info[0].audio_type.name;
          }else if(item.info.length==2){
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
      }
    else{
      console.log("Please Wait")
    }
  }else{
    setValue("")
    global.value=""
    global.modalVisible=true
  }
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.title === object2.title;
      });
    });
  }
  const findLiked=async()=>{
    const resp = await fetch(global.link+"api/v1/liked/playlist/"+global.id);
    const data5 = await resp.json();
    const index =data5.findIndex(object => {
      return object.title === global.favplaylist.title;
    })
    if(index!=-1){
      setHeart(true)
      setLikeID(data5[index].playlist_id)
    }else{
      setHeart(false)
      setLikeID('')
    }
  }
  const hea_rt = async()=>{
    if(heart==true){
      await fetch(global.link+"api/v1/liked/playlist/delete", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: likeID, 
          user_id: global.id
        })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        findLiked()
      })
    }else{
      await fetch(global.link+"api/v1/liked/playlist-info/add", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({playlist_id: "", featured_id: global.favplaylist.featured_id, cover: global.favplaylist.cover,
          user_id: global.id, title: global.favplaylist.title,
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
  const heartimage =()=>{
    if(heart==true){
      return(
        <TouchableOpacity onPress={()=> hea_rt()} style={{width: moderateScale(38), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
          <Image1 source={require('../../assets/Player/heart.png')} style={{width: moderateScale(24), tintColor: '#427AB3', height: moderateScale(24)}} />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={()=> hea_rt()} style={{width: moderateScale(38), borderRadius: moderateScale(20), justifyContent: 'center', alignItems: 'center', backgroundColor: '#427AB3', height: moderateScale(38), marginTop: moderateScale(10), marginRight: moderateScale(10)}} >
          <Image1 source={require('../../assets/Player/heart.png')} style={{width: moderateScale(24), tintColor: 'white', height: moderateScale(24)}} />
        </TouchableOpacity>
      )
    }
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFeatured()
      findLiked()
    });
    return unsubscribe;
  }, [navigation]);
  const space=()=>{
    if(width*2<=height){
      return moderateScale(170);
    }else if(width*2<=height+100){
      return moderateScale(210);
    }else{
      return moderateScale(210);
    }
  }
  const heightScale=()=>{
    if(width*2<=height){
      return moderateScale(180);
    }else if(width*2<=height+100){
      return moderateScale(130);
    }else{
      return moderateScale(130);
    }
  }
  return(
    <>
      <ImageBackground imageStyle={{borderBottomLeftRadius: moderateScale(200), borderBottomRightRadius: moderateScale(200),}} style={styles.container}>
      </ImageBackground>
      <SafeAreaView style={{...Platform.select({android: {marginTop: -heightScale()}, ios: {marginTop: -heightScale()}}), height: height, width: width, transform: [{scaleX: 1}]}}>
        <View style={{width: width, justifyContent: 'space-between', flexDirection: 'row'}}>
          <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: moderateScale(38), height: moderateScale(38), marginTop: moderateScale(10), marginLeft: moderateScale(10)}} >
            <Image1 source={require('../../assets/back.png')} style={{width: moderateScale(38), height: moderateScale(38)}} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row', marginRight: moderateScale(10)}}>
            {heartimage()}
          </View>
        </View>
        <Image preview={{uri: global.favplaylist.cover}} uri={global.favplaylist.cover} style={{width: moderateScale(200), height: moderateScale(200), borderRadius: moderateScale(15), alignSelf: 'center', marginBottom: moderateScale(10)}}/>
        <ScrollView showsVerticalScrollIndicator={false} style={{width: width-moderateScale(30), marginHorizontal: moderateScale(15), height: height}}>
          <View>
            <Text style={{fontSize: moderateScale(22), textAlign: 'center', fontWeight: '700'}}>{global.favplaylist.title}</Text>
            <Text style={{fontSize: moderateScale(16), lineHeight: moderateScale(22), textAlign: 'center', fontWeight: '400'}}>{global.favplaylist.description}</Text>
          </View>
          <TouchableOpacity onPress={()=> play()} style={{backgroundColor: '#427AB3', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(15), borderRadius: moderateScale(15) }}>
            <Image1 source={require('../../assets/Today/playAll.png')} style={{width: moderateScale(30), height: moderateScale(30), tintColor: 'white'}}/>
            <Text style={{fontSize: moderateScale(20), fontWeight: '600', textAlign: 'center', color: 'white', padding: moderateScale(15)}}>Play</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'column'}}>
            <View style={{marginRight: moderateScale(10)}}>
              {
                list.map((item, index) => {
                    return(
                      <TouchableOpacity onPress={()=> play1(item)} key={index} style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={styles.mainimage}>
                          <CachedImage source={{uri: item.cover}} cacheKey={item.cover_name} style={styles.image}/>
                        </View>
                        <View style={{width: width/1.8, marginLeft: moderateScale(5), height: width/4, justifyContent: 'center'}}>
                          <Text numberOfLines={2} style={styles.substitle}>{item.title}</Text>
                          <Text numberOfLines={3} style={styles.substitle1}>{item.description}</Text>
                        </View>
                      </TouchableOpacity>
                    )
                })
              }
            </View>
          </View>
          <View style={{height: moderateScale(170)}}></View>

        </ScrollView>

      </SafeAreaView>
   </>
  )
}
const space=()=>{
  if(width*2<=height){
    return moderateScale(15);
  }else if(width*2<=height+100){
    return moderateScale(25);
  }else{
    return moderateScale(30);
  }
}
const heightScale=()=>{
  if(width*2<=height){
    return moderateScale(180);
  }else if(width*2<=height+100){
    return moderateScale(130);
  }else{
    return moderateScale(130);
  }
}
const styles = StyleSheet.create({
  container: {
    width:width-scale(200), backgroundColor: 'rgba(66,122,179,1)', alignItems: 'center', justifyContent: 'flex-end', height: heightScale(), borderBottomLeftRadius: moderateScale(100), borderBottomRightRadius: moderateScale(100), alignSelf: 'center', transform: [{scaleX: 2.5}]
  },
  bg: {
    width: width, height: moderateScale(200)
  },
  featured: {
    textAlign: 'left', color: 'white', fontSize: moderateScale(30), fontWeight: '700', marginHorizontal: moderateScale(20)
  },
  mainimage: {
    width: width/3, height: width/3.5, backgroundColor: 'rgba(4,157,217,0.6)', justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(10), alignSelf: 'center', borderRadius: moderateScale(15)
  },
  mainsubs: {
    backgroundColor: 'rgba(4,157,217,0.6)', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', height: moderateScale(50), width: (width/2)-moderateScale(20), marginTop: moderateScale(-50), borderBottomLeftRadius: moderateScale(15), borderBottomRightRadius: moderateScale(15)
  },
  substitle: {
    fontWeight: '600', lineHeight: moderateScale(20), fontSize: moderateScale(15), paddingHorizontal: moderateScale(10), color: 'black', textAlign: 'left'
  },
  substitle1: {
    fontWeight: '600', marginHorizontal: moderateScale(10), marginTop: moderateScale(10), fontSize: moderateScale(11), paddingHorizontal: moderateScale(10), color: 'gray', textAlign: 'left'
  },
  image: {
    width: width/3, height: width/3.5, borderRadius: moderateScale(15)
  },
  
});
export default Play_List;

/*
 <View style={{width:width-scale(170), marginTop: -moderateScale(100), height: moderateScale(350), borderRadius: moderateScale(60), alignSelf: 'center', transform: [{scaleX: 2}], backgroundColor: 'red'}}>
      </View>
      <SafeAreaView style={{marginTop: -moderateScale(250)}}>
        

      </SafeAreaView>
*/