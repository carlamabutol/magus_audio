import { useState, useEffect } from "react";
import { Image, TextInput, TouchableOpacity, StatusBar, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import { s, scale, verticalScale } from "react-native-size-matters";

function MysubsSearch({navigation}) {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [array, setArray] = useState([]);
  const [data4, setData4] = useState([]);
  const [data1, setData1] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);
  const [text, setText] = useState("");
  const [searchingFirst, setSearchingFirst] = useState(false)
  const [ID, setID] = useState(global.id);
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  
  const play = (item)=>{
    if(global.subs_id!=item.subliminal_id){
      global.shuffling=false
    global.playlist=false
    if(global.standard=="Loaded"){
        const object = data10.find(obj => obj.title === item.title);
        global.subs_id=item.subliminal_id
        global.cover=item.cover
        global.title=item.title
        global.description=item.description
        global.category=item.category.name
        if(value!="MINIMIZE"){
          setValue("MINIMIZE")
          global.value="MINIMIZE"
        }
        global.location="NotToday"
        setSubliminal(item)
        global.count=1
        for(var i=0; i<object.info.length; i++){
          global.length=object.info.length;
          if(object.info.length==2){
            global.track1=object.info[0].track_id;
            global.volume1= object.info[0].audio_type.volume/100
            global.type1=object.info[0].audio_type.name;
            global.track2=object.info[1].track_id;
            global.volume2= object.info[1].audio_type.volume/100
            global.type2=object.info[1].audio_type.name;

          }else if(object.info.length==3){
            global.track1=object.info[0].track_id;
            global.volume1= object.info[0].audio_type.volume/100
            global.type1=object.info[0].audio_type.name;
            global.track2=object.info[1].track_id;
            global.volume2= object.info[1].audio_type.volume/100
            global.type2=object.info[1].audio_type.name;
            global.track3=object.info[2].track_id;
            global.volume3= object.info[2].audio_type.volume/100
            global.type3=object.info[2].audio_type.name;

          }else if(object.info.length==4){
            global.track1=object.info[0].track_id;
            global.volume1= object.info[0].audio_type.volume/100
            global.type1=object.info[0].audio_type.name;
            global.track2=object.info[1].track_id;
            global.volume2= object.info[1].audio_type.volume/100
            global.type2=object.info[1].audio_type.name;
            global.track3=object.info[2].track_id;
            global.volume3= object.info[2].audio_type.volume/100
            global.type3=object.info[2].audio_type.name;
            global.track4=object.info[3].track_id;
            global.volume4= object.info[3].audio_type.volume/100
            global.type4=object.info[3].audio_type.name;

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
  const fetchData1 = async (ID) => {
    await fetch(`https://dev.magusaudio.com/api/v1/user/search/history`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({user_id: ID,
    })
    })
    .then(res =>{
      return res.json();
    })
    .then((result) =>{
      setData1(result.data)
    })
  };
  const searchBar = async (text, ID)=>{
    if(text!=""){
      await fetch(`https://dev.magusaudio.com/api/v1/user/add/search/history`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({user_id: ID, search: text
        })
        })
        .then(res =>{
          return res.json();
        })
        .then((result) =>{
          setData1(result.data)
        })

    await fetch(`https://dev.magusaudio.com/api/v1/playlist/search`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({user_id: ID, search: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setArray([])
        for(let i = 0; i < result[0].length; i++) {
          for(let j = 0; j < data10.length; j++) {
              if(data10[j].title=== result[0][i].title ) {
                array.push(data10[j])
              }
          }
        }
        setData4(array)
      })
      setSearchingFirst(true)
    }
  }
  const space=()=>{
    if(width*2<=height){
      return verticalScale(135);
    }else if(width*2<=height+100){
      return verticalScale(165);
    }else{
      return verticalScale(155);
    }
  }
  useEffect(() => {
    setData10(global.data)
    fetchData1(global.id)
    global.standard="Loaded"
  }, []);
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="MysubsSearch"
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
  const ifSearching =()=>{
    if(searchingFirst==false){
      return(
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 10}}>
        {data1.map((item, key)=>(
          <TouchableOpacity onPress={()=> [setText(item), searchBar(item, global.id )]} style={{marginLeft: 20, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 1, shadowOffset: {width: 0, height: 0}, borderRadius: 20,backgroundColor: 'white', padding: 10, width: Dimensions.get('window').width-60, marginTop: 0, marginBottom: 10}} key={key} >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{ marginLeft: 10, fontSize: scale(13),}}> { item || "null" }</Text>
              <Image source={{uri: "https://cdn-icons-png.flaticon.com/128/484/484026.png"}} style={{width: scale(12), height: scale(12), marginTop: 4, marginRight: scale(6)}} />
            </View>
          </TouchableOpacity>)
        )}
        <View style={{height: space(), width: width/2}}>
        </View> 
      </ScrollView>
      )
    }else{
      return(
        <ScrollView style={{paddingBottom: 50, marginLeft: -10}}>
          <FlatList
            data={data4}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item) => item.title}
            style={{marginTop:10 }}
            showsHorizontalScrollIndicator={false}
          />
          <View style={{height: space(), width: width/2}}>
        </View> 
        </ScrollView>
      )
    }
  }
  const texting =(text)=>{
    if(text==""){
      setSearchingFirst(false)
      setText('')
    }else{
      setText(text)
    }
  }
  const spaceA=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height){
        return verticalScale(55);
      }else if(width*2<=height+100){
        return verticalScale(55);
      }else{
        return verticalScale(60);
      }
    }
    else{
      if(width*2<=height){
        return verticalScale(130);
      }else if(width*2<=height+100){
        return verticalScale(130);
      }else{
        return verticalScale(128);
      }
    }
  }
  return (
    <ImageBackground source={require('../../assets/me/profilebg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10, flex: 1,  }}>
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row',left: 10, ...Platform.select({ android: {marginTop: verticalScale(-10)},ios: {marginTop: verticalScale(10)}}), right:10, height: scale(35), justifyContent: 'center', alignItems: 'flex-start'}}>
          <TouchableOpacity onPress={()=> [navigation.navigate("MySubs")]} style={{ width: scale(38), height: scale(38), marginLeft: -20 }} >
            <Image  source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26), marginTop: scale(4)}} />
          </TouchableOpacity>
          <View style={{marginLeft: -5, borderWidth:1,borderRadius: 20, height: scale(32),}}>
            <TextInput placeholder="Search" autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-scale(115), marginTop: 1, height: scale(30),  fontSize: scale(11), fontWeight: 'bold', marginLeft: scale(20), }}/>
          </View>
          <TouchableOpacity onPress={()=> searchBar(text, global.id )} style={{width: scale(38), height: scale(38)}} >
            <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: scale(26), height: scale(26), marginLeft: 10, marginTop: scale(3) }} />
          </TouchableOpacity>
        </View>
        {ifSearching()}
        
      </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
export default MysubsSearch;