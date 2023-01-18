import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import React from 'react';
import { ScrollView, TextInput, ImageBackground, Modal, SafeAreaView, View, FlatList, Image, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect, useContext } from "react";
import { Platform } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
const MySubs = ({navigation}) => {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [ID, setID] = useState(global.id);
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const space=()=>{
    if(width*2<=height){
      return verticalScale(170);
    }else if(width*2<=height+100){
      return verticalScale(140);
    }else{
      return verticalScale(140);
    }
  }
  const fetchSubs=async()=>{
    const resp11 = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data11 = await resp11.json();
    const user=data11.filter(object=>{
      return object.user_id==global.id
    })
    global.subs=user[0].info.subscription_id
    const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal");
    const data = await resp.json();
    const array = data.filter(object=>{
      return object.subscription_id.includes(user[0].info.subscription_id)
    })
    setData(array)
    global.data=array
    global.datas=array
  }
  const play = (item)=>{
    global.shuffling=false
    global.playlist=false
  if(global.subs_id!=item.subliminal_id){
      if(global.standard=="Loaded"){
        const object = data.find(obj => obj.subliminal_id === item.subliminal_id);
        global.subs_id=item.subliminal_id
        global.cover=item.cover

        console.log(item.description)
        global.description=item.description
        global.title=item.title
        global.category=item.category.name
        global.location="NotToday"
        global.looping=false
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
    else{
      console.log("Please Wait")
    }
  }else{
    setValue("")
    global.value=""
    global.modalVisible=true
  }
  };
  
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSubs()
      global.standard="Loaded"
    });
    return unsubscribe;
  }, []);
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="MySubs"
    navigation.navigate("TodayPlaylist")
  }
  const renderItem= ({ item }) => {
    return (
    <ImageBackground style={{backgroundColor: 'rgba(4,157,217,0)', width: Dimensions.get('window').width/2-25, marginRight: -10, marginLeft: 20, marginBottom: (7), flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: scale(20)}}>
      <TouchableOpacity onPress={()=> play(item)} style={{ width: Dimensions.get('window').width/2-25,borderRadius: scale(20), }}>
        <Image source={{uri: item.cover}} style={{width: Dimensions.get('window').width/2-25, height: scale(140), borderRadius: scale(20)}}/>
        <View style={{width: Dimensions.get('window').width/2-25, height: scale(47), marginTop: -scale(47), backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: scale(20), borderBottomLeftRadius: scale(20)}}>
        </View>
        <View style={{marginTop:-scale(45), height: scale(47), justifyContent: 'space-around'}}>
          <Text numberOfLines={1} style={{ paddingLeft: 10, paddingRight: 10,color: 'white', fontWeight: 'bold', fontSize: scale(14)}}>{item.title}</Text>
          <View style={{width: Dimensions.get('window').width/2-25,justifyContent: 'space-between', marginTop: scale(-2), flexDirection: 'row'}}>
            <Text numberOfLines={1} style={{ paddingLeft: 10, color: 'white',   fontSize: scale(10), width: Dimensions.get('window').width/2-scale(68) }}>{item.category.name}</Text>
            <Text style={{marginTop: scale(3), paddingRight: 10, color: 'white',   fontSize: scale(10), marginBottom: 10 }}>1:00</Text>
          </View>
        </View>
      </TouchableOpacity>
    </ImageBackground>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
      <View style={{left: 20, ...Platform.select({android: {marginTop: -10}, ios: {marginTop: scale(5)}}), right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: Dimensions.get('window').width-40}}>
        <Text style={{  fontSize: scale(23), color: '#0D0D0D', fontWeight: 'bold', }} >My Subs</Text>
          <TouchableOpacity onPress={()=> [navigation.navigate('MysubsSearch')]} style={{marginRight: 10}}>
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: scale(26), height: scale(26), tintColor: 'black'}} />
          </TouchableOpacity>
      </View>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.title}
          style={{marginTop: 10}}
          showsHorizontalScrollIndicator={false}
        />
        <View style={{height: space(), width: width/2}}>
        </View>   
      </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default MySubs;