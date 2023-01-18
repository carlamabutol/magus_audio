import React, { useState, useEffect, useContext } from "react";
import { ScrollView, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions, SafeAreaView } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../../StateContext";
import { UserContext } from "../../UserContext";
const FavoritesMagus =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [unmount, setUnmount] = useState(true);
  useEffect(()=>{
    
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData1()
      global.standard="Loaded"
    });
    return unsubscribe;
  }, [navigation]);
  
  const fetchData1 = async () => {
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/liked/playlist/"+global.id);
    const data1 = await resp1.json();
    if(unmount){
    setData1(data1)}
  };
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
    const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
    global.subs_id=item.subliminal_id
    global.cover=item.cover
    global.title=item.title
    global.description=item.description
    global.category=item.category.name
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
  }
  };
  
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="Favorites"
    navigation.navigate("TodayPlaylist")
  }
  const sizes =()=>{
    if(width*2<=height){
      return scale(145);
    }else{
      return scale(110);
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
        <TouchableOpacity onPress={()=> navigation.navigate("Favorites")}  style={{backgroundColor: 'rgba(4,157,217,1)', width: scale(100), height: scale(30), borderRadius: scale(12), flexDirection: 'row', justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'white', fontWeight: 'bold', fontSize: scale(11), justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>Subliminal</Text>
        </TouchableOpacity>
        <View style={{backgroundColor: 'white', width:  scale(100), height: scale(30), borderRadius: scale(12), flexDirection: 'row',justifyContent: 'center', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}}>
          <Text style={{ color:'rgba(4,157,217,1)', fontWeight: 'bold', fontSize: scale(11), justifyContent: 'center', alignSelf: 'center', textAlign: 'center',  paddingLeft: 15, paddingRight: 15, }}>Playlist</Text>
        </View>
      </View>
      <ScrollView style={{marginTop: 20, }}>
        <FlatList
          data={data1}
          renderItem={({ item }) => (
            
            <TouchableOpacity onPress={()=> [global.playlist=item, global.myLocation="FavoritesMagus", navigation.navigate("TodayAllPlaylist")]} style={{borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginTop: 0}}>
              <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
              
              <View style={{width: Dimensions.get('window').width-sizes(), justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                <View>
                  <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes(), color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(14)}}>{item.title}</Text>
                </View>
              </View>
              
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
          style={{padding: 1, marginHorizontal: 20,}}
          showsVerticalScrollIndicator={false}
        />
        <View style={{height: space(), width: width/2}}>
        </View>   
      </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default FavoritesMagus;