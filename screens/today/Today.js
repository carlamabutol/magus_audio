import React, { useState, useEffect, useContext } from "react";
import {StatusBar, StyleSheet, SafeAreaView, ScrollView, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions } from "react-native";
import Moment from 'moment';
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";

function Item({ id, title, image, selected, onSelect, colorPallete }) {
  return (
    <TouchableOpacity onPress={() => onSelect(id, selected)} style={[{backgroundColor: selected ? colorPallete : 'rgba(4,157,217,0.4)', paddingBottom: scale(3), paddingTop: scale(3), width: Dimensions.get('window').width/5, marginBottom: verticalScale(10), borderRadius: 5, flexDirection: 'row', marginRight: 12.5, alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',} ]}>
      <View style={{width: scale(25), height: verticalScale(20),}}>
        <Image source={{uri: image}} style={{width: verticalScale(20), height: verticalScale(20), borderTopLeftRadius: scale(10), marginLeft: scale(5) }}/>
      </View>
      <Text style={{ color: selected ? 'white' : 'white', width: Dimensions.get('window').width/5-scale(25), fontSize: scale(8), justifyContent: 'center', textAlign: 'left',   paddingLeft: 7, paddingRight: 7 }}>{title}</Text>
    </TouchableOpacity>
  );
}
function Item1({ id, title, selected1, onSelect1 }) {
  return (
    <TouchableOpacity onPress={() => onSelect1(id, selected1)} style={[{backgroundColor: selected1 ? 'rgba(4,157,217,1)' : 'rgba(4,157,217,0.4)', marginBottom: 10, height: verticalScale(28), borderRadius: scale(15), flexDirection: 'row', marginRight: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'black',}, ]}>
      <Text style={{ color: selected1 ? 'white' : 'white', fontSize: scale(9), justifyContent: 'center', alignSelf: 'center',   paddingLeft: scale(15), paddingRight: scale(15), }}>{title}</Text>
    </TouchableOpacity>
  );
}
const Today =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [ID, setID] = useState(global.id)
  const [data1, setData1] = useState([])
  const [data2, setData2] = useState([])
  const [data3, setData3] = useState([])
  const [data4, setData4] = useState([])
  const [data5, setData5] = useState([])
  const [data6, setData6] = useState([])
  const [continue1, setContinue1] = useState(false)
  const [selected, setSelected] = useState(new Map());
  const [selected1, setSelected1] = useState(new Map());
  const [array1, setArray1] = useState([]);
  const [array2, setArray2] = useState([]);
  const [unmount, setUnmount] = useState(true);
  const space=()=>{
    if(width*2<=height){
      return verticalScale(350);
    }else if(width*2<=height+100){
      return verticalScale(390);
    }else{
      return verticalScale(410);
    }
  }
  const onSelect = ((id, selected1)=>{
    const newSelected = new Map(selected);
    newSelected.set(id, !selected.get(id));
    setSelected(newSelected);
    if(selected1==false){
      array1.push(id)
      setArray1(array1)
      mood(array1.toString(),ID)
    }else{
      const filteredItems = array1.filter(item => item !== id)
      setArray1(filteredItems)
      mood(filteredItems.toString(),ID)
    }
  });
  const onSelect1 = ((id, selected)=>{
    const newSelected = new Map(selected1);
    newSelected.set(id, !selected1.get(id));
    setSelected1(newSelected);
    if(selected==false){
      array2.push(id)
      setArray2(array2)
      category(array2.toString(),ID)
      fetchData4(array1.toString(), array2.toString(), array1.length, array2.length)
    }else{
      const filteredItems = array2.filter(item => item !== id)
      setArray2(filteredItems)
      category(filteredItems.toString(),ID)
      fetchData4(array1.toString(), filteredItems.toString(), array1.length, filteredItems.length)
    }
  });
  const mood = async(id, ID)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/update/moods`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({moods: id,
      user_id: ID
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      fetchData4(id, array2.toString, id.length, array2.length)
    })
  } 
  const category = async(id, ID)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/user/update/category`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({category: id,
      user_id: ID
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
    })
  }
  const fetchData1 = async () => {
    const resp11 = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data11 = await resp11.json();
    const user=data11.filter(object=>{
      return object.user_id==global.id
    })
    const resp1 = await fetch("https://dev.magusaudio.com/api/v1/moods");
    const data1 = await resp1.json();
    if(unmount){
      global.subs=user[0].info.subscription_id
      setData1(data1.data);
    }
  };
  const fetchData = async () => {
    const resp11 = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data11 = await resp11.json();
    const user=data11.filter(object=>{
      return object.user_id==global.id
    })
      global.subs=user[0].info.subscription_id
      fetchData3()
      fetchData1()
      fetchData2()
      fetchData4()
      fetchData5()
      fetchData6()
  };
  const fetchData2 = async () => {
    const resp2 = await fetch("https://dev.magusaudio.com/api/v1/category");
    const data2 = await resp2.json();
    setData2(data2);
  };
  const fetchData3 = async () => {
    const resp3 = await fetch("https://dev.magusaudio.com/api/v1/audio/history/"+global.id);
    const data3 = await resp3.json();
    const unique = [
      ...new Map(data3.track_history.map((item) => [item["track_title"], item])).values(),
    ];
    const array = unique.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setData3(array)
    if(unique.length==0){
      setContinue1(false)
    }else{
      setContinue1(true)
    }
  };
  const fetchData4 = async (mood, category, moodlength, categorylength) => {
    if(categorylength==0 && moodlength!=0){
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category=&mood="+mood);
      const data1 = await resp1.json();
      const array = data1.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setData4(array);
    }else if(moodlength==0 && categorylength!=0){
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category="+category+"&mood=");
      const data1 = await resp1.json();
      const array = data1.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setData4(array);
    }else if(moodlength!=0 && categorylength!=0){
      const resp1 = await fetch("https://dev.magusaudio.com/api/v1/playlist/recommendation?category="+category+"&mood="+mood);
      const data1 = await resp1.json();
      const array = data1.filter(object=>{
        return object.subscription_id.includes(global.subs)
      })
      setData4(array);
    }else{
      setData4([])
    }
  };
  const fetchData5= async () => {
    const resp5 = await fetch("https://dev.magusaudio.com/api/v1/playlist/featured");
    const data5 = await resp5.json();
    const array = data5.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setData5(array);

  };
  const fetchData6= async () => {
    const resp6 = await fetch("https://dev.magusaudio.com/api/v1/playlist/discover");
    const data6 = await resp6.json();
    const array = data6.filter(object=>{
      return object.subscription_id.includes(global.subs)
    })
    setData6(array);
  };
  const subscribe = async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/user");
    const data = await resp.json();
      const index =data.findIndex(object => {
        return object.user_id=== global.id;
      })
      global.subs=data[index].subscription_id
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      fetchData()
      
      global.standard="Loaded"
    });
    return unsubscribe;
    
   }, [navigation]);
  const featured_flatlist=()=>{
    return (
      <FlatList
        data={data5}
        renderItem={({ item }) => (
                        
         <View style={{width: width/2.8, marginBottom: 10, marginRight: 5, marginLeft:5, right: 20,  shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 10,  flexDirection: 'row'}}>
            <TouchableOpacity onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "featured")]} style={{ width: width/2.35,borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={{uri: item.cover}} style={{width: width/2.9, height: width/2.9, borderRadius: scale(150), }}/>
              
              <View style={{}}>
                <Text numberOfLines={1} style={{paddingLeft: scale(25), paddingRight: scale(25), marginTop: 5, color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(11), marginBottom: 5, textAlign: 'center' }}>{item.title}</Text>
              </View>
              
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.featured_id}
        extraData={data5}
        horizontal
        pagingEnabled
        style={{paddingLeft: 2, paddingTop: 3}}
        showsHorizontalScrollIndicator={false}
      /> 
    )
   }
  const recommendedPlaying = async(item, length, location)=>{
    if(length==0){
      
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.featured_id;
      })
      global.playlist=false
      global.shuffling=false

      if(global.subs_id!=item.featured_id){
        if(global.standard=="Loaded"){
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.category=global.data[index].category.name

        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.count=1
          global.value="MINIMIZE"
        }else{global.count=1}
        setSubliminal(global.data[index])
        global.category=global.data[index].category.name
        for(var i=0; i<global.data[index].info.length; i++){
          if( global.data[index].info.length==2){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;
            
          }else if(global.data[index].info.length==3){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;
            
          }else if(global.data[index].info.length==4){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;

            global.track4=global.data[index].info[3].track_id;
            global.volume4= global.data[index].info[3].volume/100
            global.type4=global.data[index].info[3].audio_type.name;
          }
        }
        global.length=global.data[index].info.length;
        }else{
          console.log("Please Wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }else if(length==2){
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.track_id;
      })
      global.playlist=false
      if(global.subs_id!=item.track_id){
        if(global.standard=="Loaded"){
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.category=global.data[index].category.name
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.count=1
          global.value="MINIMIZE"
        }else{global.count=1}
        setSubliminal(global.data[index])
        global.category=global.data[index].category.name
        for(var i=0; i<global.data[index].info.length; i++){
          if( global.data[index].info.length==2){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;
            
          }else if(global.data[index].info.length==3){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;
            
          }else if(global.data[index].info.length==4){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;

            global.track4=global.data[index].info[3].track_id;
            global.volume4= global.data[index].info[3].volume/100
            global.type4=global.data[index].info[3].audio_type.name;
          }
        }
        global.length=global.data[index].info.length;
        }else{
          console.log("Please Wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }else if(length==-1){
      const index =global.data.findIndex(object => {
        return object.subliminal_id === item.track_id;
      })
      global.playlist=false
      global.shuffling=false

      if(global.subs_id!=item.track_id){
        if(global.standard=="Loaded"){
        global.cover=global.data[index].cover
        global.location="NotToday"
        global.title=global.data[index].title
        global.subs_id=global.data[index].subliminal_id
        global.category=global.data[index].category.name
        global.description=global.data[index].description

        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.count=1
          global.value="MINIMIZE"
        }else{global.count=1}
        setSubliminal(global.data[index])
        global.category=global.data[index].category.name
        for(var i=0; i<global.data[index].info.length; i++){
          if( global.data[index].info.length==2){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;
            
          }else if(global.data[index].info.length==3){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;
            
          }else if(global.data[index].info.length==4){
            global.track1=global.data[index].info[0].track_id;
            global.volume1= global.data[index].info[0].volume/100
            global.type1=global.data[index].info[0].audio_type.name;
            
            global.track2=global.data[index].info[1].track_id;
            global.volume2= global.data[index].info[1].volume/100
            global.type2=global.data[index].info[1].audio_type.name;

            global.track3=global.data[index].info[2].track_id;
            global.volume3= global.data[index].info[2].volume/100
            global.type3=global.data[index].info[2].audio_type.name;

            global.track4=global.data[index].info[3].track_id;
            global.volume4= global.data[index].info[3].volume/100
            global.type4=global.data[index].info[3].audio_type.name;
          }
        }
        global.length=global.data[index].info.length;
        }else{
          console.log("Please Wait")
        }
      }else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
    }
    else{
      global.playlist=item
      global.myLocation="Today1"
      navigation.navigate("TodayAllPlaylist")
    }
    fetchData3()
  }
  const addToPlaylist = (item, length) =>{
    if(length==0){
      global.playlist=item
      global.myLocation="Today1"
      navigation.navigate("TodayPlaylist")
    }else{
      global.playlist=item
      global.myLocation="Today1"
      navigation.navigate("TodayAllPlaylist")
    }
  }
  const recommendationYesOrNo=()=>{
    if (data4.length!=0){
      return(
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(10), alignItems: 'center', marginBottom: 8}}>
            <Text style={{  fontSize: scale(15), fontWeight: 'bold'}} >Featured</Text>
              <TouchableOpacity  onPress={()=> [navigation.navigate("Featured"), global.feature=data5]}style={{}}>
                <Text style={{  fontSize: scale(13), }} >See All</Text>
              </TouchableOpacity>
          </View>
            
            {featured_flatlist()}
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginBottom: 8}}>
            <Text style={{  fontSize:scale(15), fontWeight: 'bold'}} >Recommended For You</Text>
          </View>
          
          <FlatList
              data={data4}
              renderItem={({ item }) => (
                <View style={{ width: width/2.8,marginRight: 5, marginLeft:5, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20,  flexDirection: 'row', marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                
                <TouchableOpacity onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "recommended")]}  style={{borderRadius: 20, justifyContent: 'center', alignItems: 'center',}}>
                  <Image source={{uri: item.cover}} style={{width: width/2.8, height: width/2.8, borderRadius:20}}/>
                  
                  <View style={{width: width/2.8, height: scale(40), marginTop: scale(-40), backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,  shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)'}}>
                  </View>
                  <View style={{marginTop: scale(-35)}}>
                    <Text numberOfLines={1} style={{marginTop: scale(5), paddingLeft: scale(10), paddingRight: scale(10),color: '#0D0D0D', textAlign: 'center', fontWeight: 'bold',   fontSize: scale(11)}}>{item.title}</Text>
                  </View>
                  
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.featured_id}
              extraData={data4}
              horizontal
              pagingEnabled
              style={{paddingLeft: 2, paddingTop: 3, paddingBottom: verticalScale(10) }}
              showsHorizontalScrollIndicator={false}
            />
          
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: scale(10), alignItems: 'center', marginBottom: 8}}>
            <Text style={{  fontSize: scale(15), fontWeight: 'bold'}} >Discover</Text>
              <TouchableOpacity  onPress={()=> [navigation.navigate("Discover"), global.discove=data6]}style={{}}>
                <Text style={{  fontSize: scale(13), }} >See All</Text>
              </TouchableOpacity>
          </View>
            <FlatList
              data={data6}
              renderItem={({ item }) => (
                        
              <View style={{width: width/2.8,  marginLeft: 5, marginBottom: 10, marginRight: 5, right: 20, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 10, flexDirection: 'row'}}>
                <TouchableOpacity onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "discover")]} style={{ width: width/2.35,borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={{uri: item.cover}} style={{width: width/2.8, height: width/2.8, borderRadius: scale(150), }}/>
                  
                  <View style={{}}>
                    <Text numberOfLines={1} style={{paddingLeft: scale(25), paddingRight: scale(25), marginTop: 5, color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(11), marginBottom: 5, textAlign: 'center' }}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.featured_id}
              extraData={data6}
              horizontal
              pagingEnabled
              style={{paddingLeft: 2, paddingTop: 3 }}
              showsHorizontalScrollIndicator={false}
            />
        </View>
      )
    }else{
      return(
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: verticalScale(10), alignItems: 'center', marginBottom: 8}}>
            <Text style={{  fontSize: scale(15), fontWeight: 'bold'}} >Featured</Text>
              <TouchableOpacity  onPress={()=> [navigation.navigate("Featured"), global.feature=data5]}style={{}}>
                <Text style={{  fontSize: scale(13), }} >See All</Text>
              </TouchableOpacity>
          </View>
            {featured_flatlist()}

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginBottom: 8}}>
            <Text style={{  fontSize: scale(15), fontWeight: 'bold'}} >Discover</Text>
              <TouchableOpacity  onPress={()=> [navigation.navigate("Discover"), global.discove=data6]}style={{}}>
                <Text style={{  fontSize: scale(13), }} >See All</Text>
              </TouchableOpacity>
          </View>
            <FlatList
              data={data6}
              renderItem={({ item }) => (
              <View style={{ width: width/2.8,marginRight: 5, marginLeft:5, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20,  flexDirection: 'row', marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=> [recommendedPlaying(item, item.subliminal_ids.length, "discover")]}  style={{borderRadius: 20, justifyContent: 'center', alignItems: 'center',}}>
                  <Image source={{uri: item.cover}} style={{width: width/2.8, height: width/2.8, borderRadius:20}}/>
                  
                  <View style={{width: width/2.8, height: scale(40), marginTop: scale(-40), backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,  shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)'}}>
                  </View>
                  <View style={{marginTop: scale(-35)}}>
                    <Text numberOfLines={1} style={{marginTop: scale(5), paddingLeft: scale(10), paddingRight: scale(10),color: '#0D0D0D', textAlign: 'center', fontWeight: 'bold',   fontSize: scale(11)}}>{item.title}</Text>
                  </View>
                  
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.featured_id}
              extraData={data6}
              horizontal
              pagingEnabled
              style={{paddingLeft: 2, paddingTop: 3, paddingBottom: verticalScale(10) }}
              showsHorizontalScrollIndicator={false}
            />
        </>
      )
    }
  }
  const isContinued=()=>{
    if(continue1==true){
      return(
        <>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignItems: 'center', marginBottom: 8}}>
            <Text style={{  fontSize: scale(15), fontWeight: 'bold'}} >Continue Your Journey</Text>
              
          </View>
            <FlatList
              data={data3}
              renderItem={({ item }) => (
              <View style={{ width: width/2.8,marginRight: 5, marginLeft:5, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 20,  flexDirection: 'row', marginBottom: 20, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={()=> [recommendedPlaying(item, -1, 'continue')]}  style={{borderRadius: 20, justifyContent: 'center', alignItems: 'center',}}>
                  <Image source={{uri: item.cover}} style={{width: width/2.8, height: width/2.8, borderRadius:20}}/>
                  
                  <View style={{width: width/2.8, height: scale(40), marginTop: scale(-40), backgroundColor: '#049DD9', opacity: 0.63, borderBottomRightRadius: 20, borderBottomLeftRadius: 20,  shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)'}}>
                  </View>
                  <View style={{marginTop:scale(-35)}}>
                    <Text numberOfLines={1} style={{marginTop: scale(5), paddingLeft: scale(10), paddingRight: scale(10),color: '#0D0D0D', textAlign: 'center', fontWeight: 'bold', fontSize: scale(11)}}>{item.track_title}</Text>
                  </View>
                  
                </TouchableOpacity>
              </View>
              )}
              keyExtractor={(item) => item.id}
              extraData={data3}
              horizontal
              pagingEnabled
              style={{paddingLeft: 2, paddingTop: 3, paddingBottom: verticalScale(15) }}
              showsHorizontalScrollIndicator={false}
            />
        {recommendationYesOrNo()}  
        </>
      )
    }
    else{
      return(
        <>
          {recommendationYesOrNo()}  
          <View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </View>
        </>
      )
    }
  }
  const sizes=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height){
        return (height);
      }else if(width*2<=height+100){
        return moderateScale(height);
      }else{
        return moderateVerticalScale(height);
      }
    }
  }
  return(
  <ImageBackground source={require('../../assets/home2bg.png')} style={{width: (width), height: sizes(), flex:1}}>
    <SafeAreaView>
      <Text style={{  fontSize: scale(22), fontWeight: 'bold', textAlign: 'center', marginTop: verticalScale(40)}} >Hey {global.first_name}!</Text>
      <Text style={{  fontSize: scale(15), textAlign: 'center', marginTop: 1, color: 'white'}} >How are you feeling?</Text>
      <View style={{flexDirection: 'column', alignItems: 'center', height: verticalScale(130)}}> 
        <FlatList
          data={data1}
          renderItem={({ item }) => (
            <Item
              id={item.id}
              image={item.image}
              title={item.name}
              colorPallete={item.description}
              selected={!!selected.get(item.id)}
              onSelect={onSelect}
            />
          )}
          scrollEnabled={false}
          numColumns={4}
          keyExtractor={item => item.id}
          extraData={selected}
          style={{marginHorizontal:20, padding:2, marginTop: 20,}}
          showsVerticalScrollIndicator={false}
        />
        <FlatList
          data={data2}
          renderItem={({ item }) => (
            <Item1
              id={item.id}
              title={item.name}
              selected1={!!selected1.get(item.id)}
              onSelect1={onSelect1}
            />
          )}
          horizontal
          pagingEnabled
          keyExtractor={item => item.id}
          extraData={selected}
          style={{padding:2, marginHorizontal: 20,}}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <ScrollView style={{marginHorizontal: 20 }} showsVerticalScrollIndicator={false}>
        {isContinued()}
        <View style={{height: space(), width: width/2}}>
        </View>        
      </ScrollView>

    </SafeAreaView>
  </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
export default Today;