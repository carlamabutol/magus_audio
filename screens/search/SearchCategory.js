import { useState, useEffect } from "react";
import { TouchableOpacity , StatusBar, Modal, Image, TextInput, ScrollView,FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { useRoute } from "@react-navigation/native";
import { StateContext } from "../StateContext";
import { scale, verticalScale } from "react-native-size-matters";

function SearchCategory({navigation}) {
  const route = useRoute();
  const [subli, setSubli] = useState('');
  const [title, setTitle] = useState('');
  const [cover, setCover] = useState('');
  const [cat, setCat] = useState('');
  const [guide, setGuide] = useState('');
  const [data, setData] = useState([]);
  const [data25, setData25] = useState([]);
  const [data1, setData1] = useState([]);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const {value, setValue} = useContext(UserContext);
  const [text, setText] = useState('')
  const [modal, setModal] = useState(false)
  const [modal_guide, setModalGuide] = useState(false)
  const [modal_playlist, setModalPlaylist] = useState(false)
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [error, setError] = useState('');
  const [colors, setColors] =useState('rgba(67,156,212,1)')
  const updateError = (error, stateUpdater) => {
    stateUpdater(error);
    setTimeout(()=>{
      stateUpdater('')
    }, 2500);
  }
  const fetchData25= async()=>{
    const resp = await fetch("https://dev.magusaudio.com/api/v1/own/playlist/"+global.id);
    const data = await resp.json();
    setData25(data)
  }
  const fetchData = async (ids) => {
    if(ids==1){
      setData(global.data)
      
    }else if(ids!=1){
    await fetch(`https://dev.magusaudio.com/api/v1/search/playlist/category`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({category: ids})
      })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        setData(getDifference(global.data, result[0]))
      })
    }
  };
  function getDifference(array1, array2) {
    return array1.filter(object1 => {
      return array2.some(object2 => {
        return object1.subliminal_id === object2.featured_id;
      });
    });
  }
  const play = (item)=>{
    const object = data1.find(obj => obj.title === item.title);
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setData1(global.data)
      fetchData(global.selectedCategory)
      space()
      fetchData25()
      global.standard="Loaded"
    });
    return unsubscribe;
    
  }, []);
  const space=()=>{
    if(width*2<=height){
      return verticalScale(135);
    }else if(width*2<=height+100){
      return verticalScale(165);
    }else{
      return verticalScale(160);
    }
  }
  const sizes =()=>{
    if(width*2<=height){
      return scale(152);
    }else if(width*2<=height+100){
      return scale(158);
    }else{
      return scale(118);
    }
  }
  const addToNewPLaylist = async (item, text) =>{
    if(text!=""){
      await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        playlist_id: '', moods_id: '', cover: cover,
        user_id: global.id, featured_id: subli, title: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then(async (result) =>{
        if(result.message=="success"){
          fetchData25();
          setText('')
          setModalPlaylist(false)
          setColors('rgba(67,156,212,1)')
          return updateError("Subliminal successfully added to playlist!", setError);
        }else{
          fetchData25();
          setText('')
          setModalPlaylist(false)
          setColors('red')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }else{
      fetchData25();
      setModalPlaylist(false)
      setColors('red')
      return updateError("Please enter playlist name!", setError);
 
    }
  }
  const addToOldPlaylist = async (item)=>{
    await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({featured_id: subli, playlist_id: item.playlist_id,
      user_id: global.id,
      })
    })
      .then(res =>{
        return res.json();
      })
      .then((result) =>{
        const index =result.data.findIndex(object => {
          return object.id === item.id;
        })
        if(item.subliminal_count==result.data[index].subliminal_count){
          fetchData25()
          setModalPlaylist(false)
          setColors('red')
          return updateError("Subliminal is already part of this playlist!", setError);
        }else{
          fetchData25()
          setModalPlaylist(false)
          setColors('rgba(67,156,212,1)')
          return updateError("Subliminal successfully added!", setError);
        }
      })
    fetchData25()
  }
  const addToPlaylist=(item)=>{
    global.items=item
    navigation.navigate("Three")
    setCover(item.cover)
    setSubli(item.subliminal_id)
    setGuide(item.guide)
    setTitle(item.title)
    setCat(item.category.name)
  }
  return (
    <ImageBackground source={require('../../assets/playing/playbg.png')} style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width}}>
    <SafeAreaView style={styles.container}>
        <View style={{left: 15, ...Platform.select({android: {marginTop: -10}, ios: {marginTop: verticalScale(10)}}),}}>
          <TouchableOpacity onPress={()=> [navigation.navigate("Search1")]} style={{width: scale(38), height: scale(38)}} >
            <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
          </TouchableOpacity>
        </View>
      <Text style={{ fontSize: scale(22), textAlign: 'center', color: 'black', fontWeight: 'bold'}} >{global.selectedName}</Text>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            
            <TouchableOpacity onPress={()=> play(item)} onLongPress={()=> addToPlaylist(item)} style={{ width: Dimensions.get('window').width-60,borderRadius: 10, backgroundColor: 'white', flexDirection: 'row', marginBottom: 10, shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', marginLeft: 20,marginTop: 0}}>
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
          style={{marginTop: 10,}}
          showsVerticalScrollIndicator={false}
        />
        <View style={{height: space(),width: width/2}}>
        </View>   
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  
});
export default SearchCategory;
//<Image source={{uri:'https://cdn-icons-png.flaticon.com/128/8032/8032471.png'}} style={{ marginRight: 20, width: 35, height: 35,  tintColor: 'white', backgroundColor: 'rgba(4,157,217,1)', borderRadius: 50 }} />
//