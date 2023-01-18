import { useState, useEffect } from "react";
import { Modal, TextInput, Image, TouchableOpacity, StatusBar, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import { scale, verticalScale } from "react-native-size-matters";

function SearchIcon({navigation}) {
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [data4, setData4] = useState([]);
  const [data1, setData1] = useState([]);
  const [data10, setData10] = useState([]);
  const [text, setText] = useState("");
  const [searchingFirst, setSearchingFirst] = useState(false)
  const [number, setNumber] = useState(0)
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const play = (item)=>{
    const object = data10.find(obj => obj.title === item.title);
    if(object!=undefined){
    global.shuffling=false
    global.playlist=false
      if(global.subs_id!=object.subliminal_id){
        if(global.standard=="Loaded"){
          global.subs_id=object.subliminal_id
          global.cover=object.cover
          global.title=object.title
          global.liked=true
          global.category=object.category.name
          global.description=object.description
          global.looping=false
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
      }
      else{
        setValue("")
        global.value=""
        global.modalVisible=true
      }
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
  const searchBar = async (find, ID)=>{
    if(find!=''){
      await fetch(`https://dev.magusaudio.com/api/v1/user/add/search/history`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({user_id: ID, search: find
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
      body: JSON.stringify({user_id: ID, search: find
      })
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData4(getDifference(global.data, result[0]))


      })
      setSearchingFirst(true)
    }
  }
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.subliminal_id === object2.featured_id;
      });
    });
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      space()
      setData10(global.data)
      fetchData1(global.id)
    });
    return unsubscribe;
    
  }, []);
  const addToPlaylist=(item)=>{
    global.playlist=item
    global.myLocation="SearchIcon"
    navigation.navigate("TodayPlaylist")
  }
  const sizes =()=>{
    if(width*2<=height+100){
      return scale(150);
    }else{
      return scale(110);
    }
  }
  const ifSearching =()=>{
    if(searchingFirst==false){
      return(
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 10}}>
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
        <ScrollView>
          <FlatList
            data={data4}
            renderItem={({ item }) => (
              
              <TouchableOpacity onPress={()=> play(item)} onLongPress={()=> addToPlaylist(item)} style={{ width: Dimensions.get('window').width-60,borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.8, shadowOffset: {width: 0, height: 0}, shadowColor: 'rgba(4,157,217,.8)',  marginLeft: 20,marginTop: 0}}>
                <Image source={{uri: item.cover}} style={{width: scale(50), height: scale(50), borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}/>
            
                <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingLeft: 15, paddingRight: 15, shadowColor: 'rgba(4,157,217,.8)', shadowOpacity: 0.2}}>
                  <View>
                    <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes(), color: '#0D0D0D', fontWeight: 'bold',   fontSize: scale(14), marginBottom: 5}}>{item.title}</Text>
                    <Text numberOfLines={1}style={{width: Dimensions.get('window').width-sizes(), color: '#0D0D0D',  fontSize: scale(12),}}>{item.category.name}</Text>
                  </View>
                  <TouchableOpacity onPress={()=> addToPlaylist(item)} style={{marginRight: -10}}>
                    <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/2311/2311524.png"}} style={{width: scale(30), height: scale(30),alignSelf: 'flex-end', tintColor: 'black', shadowColor: 'rgba(4,157,217,1)', shadowOpacity: 2, shadowOffset: {width: 1, height: 1}}}/>
                  </TouchableOpacity>
                </View>
                
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.title}
            style={{marginTop: 10, paddingTop: 3}}
            showsVerticalScrollIndicator={false}
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
  const space=()=>{
    if(width*2<=height){
      return verticalScale(135);
    }else if(width*2<=height+100){
      return verticalScale(165);
    }else{
      return verticalScale(155);
    }
  }
 
  return (
    <ImageBackground source={require('../../assets/playing/playbg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, paddingHorizontal: 10, flex: 1, justifyContent: 'flex-start'  }}>
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row',left: 5, ...Platform.select({ android: {marginTop: verticalScale(-10)},ios: {marginTop: verticalScale(10)}}), right:10, marginBottom: 5, height: scale(35), justifyContent: 'center', alignItems: 'flex-start'}}>
        <TouchableOpacity onPress={()=> [navigation.navigate("Search1")]} style={{width: scale(38), height: scale(38), marginLeft: scale(-10)}} >
          <Image  source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26), marginTop: scale(4)}} />
        </TouchableOpacity>
        <View style={{marginLeft: -5, borderWidth:1,borderRadius: 20, height: scale(32) }}>
          <TextInput placeholder="Search" autoCorrect={true} autoFocus={true} value={text} onChangeText={newText => texting(newText)}  style={{width: Dimensions.get('window').width-scale(115), marginTop: 1, height: scale(30),  fontSize: scale(11), fontWeight: 'bold', marginLeft: scale(20), }}/>
        </View>
        <TouchableOpacity onPress={()=> searchBar(text, global.id )} style={{width: scale(38), height: scale(38)}} >
          <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: scale(26), marginLeft: scale(10), height: scale(26), marginTop: scale(3) }} />
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
    backgroundColor: '#F9C2FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default SearchIcon;