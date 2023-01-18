import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import { ImageBackground, SafeAreaView, View, FlatList, Image, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect, useContext } from "react";
import arrayShuffle from 'array-shuffle';
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
const Recommended = ({navigation}) => {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [ID, setID] = useState('');
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);
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
    setArray(array)
    global.data=array
    global.datas=array
  }
  const play = async(item1)=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+item1.featured_id);
    const data = await resp.json();
    if(data.tracks.length==1){
      if(global.subs_id!=item1.featured_id){ 
        if(global.standard=="Loaded"){
          const item = array.find(obj => obj.subliminal_id === item1.featured_id);
          global.subs_id=item.subliminal_id
          global.cover=item.cover
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
        }else{
          console.log("Please Wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }else if(data.tracks.length>1){
      
    global.playlist=item1
      global.myLocation="Recommended"
      navigation.navigate("TodayAllPlaylist")
    }
  };
  useEffect(() => {
    fetchSubs()
    setData(global.reco)
    global.standard="Loaded"
  }, []);

  const renderItem= ({ item }) => {
    return (
     
      <View style={{height: 165, width: Dimensions.get('window').width/2-25, marginRight: -10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20}}>
        <TouchableOpacity onPress={()=> play(item)}  style={{ height: 165,width: Dimensions.get('window').width/2-25,borderRadius: 20, marginBottom: 10}}>
          <Image source={{uri: item.cover}} style={{width: Dimensions.get('window').width/2-25, height: 165, borderRadius: 20}}/>
          <View style={{width: Dimensions.get('window').width/2-25, height: 40, marginTop: -40, backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
          </View>
          <View style={{marginTop:-35}}>
            <Text numberOfLines={1} style={{marginTop: 8, paddingLeft: 10, paddingRight: 10,color: '#0D0D0D', textAlign: 'center', fontWeight: 'bold',   fontSize: 13}}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
      <View style={{ flexDirection: 'row', alignItems: 'center',}}>
        <TouchableOpacity onPress={() => navigation.navigate("Today1")} style={{width: 40, height: 40, left: 15, marginBottom: -12, }} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
        <Text style={{ fontSize: 25, color: '#0D0D0D', fontWeight: 'bold', left: 10, marginTop: -5}} >Recommended For You</Text>
      
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.featured_id}
        style={{marginTop: 15, marginBottom: 130}}
        showsVerticalScrollIndicator={false}
      />
      
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#F9C2FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Recommended;