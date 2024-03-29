import React from 'react';
import { ImageBackground, SafeAreaView, View, FlatList, Image, StyleSheet, Text, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
const Recommended_Track = ({navigation}) => {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/track/"+global.reco_id);
    const data = await resp.json();
    //console.log(data.tracks)
    let i=0;
    while(i<data.tracks.length){
      const resp = await fetch("https://dev.magusaudio.com/api/v1/subliminal");
      const data1 = await resp.json();
      setData1(data1);
      const object = data1.find(obj => obj.subliminal_id === data.tracks[i].track_id);
        array.push(object)
        i++
      }
      setArray(array)
      setData(data);
  };
  const play = (item)=>{
    const object = array.find(obj => obj.subliminal_id === item.track_id);
    let arr1 = [];
    arr1.push(object)
    let item1=[]
    item1.push(item)
    navigation.navigate('Plays',{
      array: array,
      playingArray: object, 
      shuffling: false,
      name: false,
      playlistName: data.playlist_title,
      playlistCover: data.playlist_cover,
      playlistDes: data.playlist_description,
      featured_id: route.params.item,
      user_id: route.params.ID
    })
  };
  
  const count =()=>{
   
    return(
      <SafeAreaView>
        <FlatList
        data={data.tracks}
        renderItem={renderItem2}
        keyExtractor={(item) => item.cover.toString()}
        style={{marginTop: 15, marginBottom: 130}}
        showsHorizontalScrollIndicator={false}
      />
      </SafeAreaView>
      
    )

  }
  useEffect(() => {
   fetchData();
  }, []);

  const renderItem2= ({ item }) => {
    return (
     
      <View style={{backgroundColor: 'white', width: Dimensions.get('window').width-40, marginRight: -10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', borderRadius: 10}}>
        <TouchableOpacity onPress={()=> play(item.track_id)}  style={{ width: Dimensions.get('window').width/2-25,borderRadius: 10, flexDirection: 'row'}}>
          <Image source={{uri: item.cover}} style={{width: 60, height: 60, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
          <View style={{justifyContent: 'center',width: Dimensions.get('window').width-100,}}>
            <Text numberOfLines={1}style={{ marginLeft: 10,  paddingLeft: 5, color: '#0D0D0D', fontWeight: 'bold',   fontSize: 15, }}>{item.title}</Text>
          </View>
          
          
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}}>
          <Image source={{uri: data.playlist_cover}} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height/2.7,  borderTopLeftRadius: 10, marginTop: -50, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, shadowColor: 'pink', shadowOpacity: 1, shadowOffset: {width:0, height: 1}, shadowRadius: 3,}}/>
          <TouchableOpacity onPress={() => navigation.navigate("Recommended")} style={{width: 40, height: 40, left: 15,marginTop: -Dimensions.get('window').height/3.15}} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>

          <View style={{ marginTop: Dimensions.get('window').height/3.5, justifyContent: 'space-between'}}>
            <Text style={{ width: Dimensions.get('window').width-40, paddingLeft: 20, marginBottom: 10, color: 'black', fontWeight: 'bold',   fontSize: 20, }}>{data.playlist_title}</Text>
            <Text style={{ width: Dimensions.get('window').width-40, lineHeight: 25, paddingLeft: 20, color: 'black',    fontSize: 14, }}>{data.playlist_description}</Text>
            
          </View>
      {count()}        
      
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

export default Recommended_Track;