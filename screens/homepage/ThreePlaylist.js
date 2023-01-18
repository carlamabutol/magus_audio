import { useState, useEffect } from "react";
import { ScrollView,TextInput, Modal, Image, TouchableOpacity, StatusBar, FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import { scale, verticalScale } from "react-native-size-matters";

function ThreePlaylist({navigation}) {
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data25, setData25] = useState([]);
  const [modal3, setModal3] = useState(true);
  const [text, setText] = useState('')
  const [error, setError] = useState('');
  const [colors, setColors] = useState('#6A98CA');
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData25()
      space()
    });
    return unsubscribe;
  }, []);
  const addToNewPLaylist = async (item, text) =>{
    if(text!=""){
      await fetch(`https://dev.magusaudio.com/api/v1/own/playlist-info/add`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({
        playlist_id: '', moods_id: '', cover: global.cover,
        user_id: global.id, featured_id: global.subs_id, title: text
      })
      })
      .then(res =>{
        return res.json();
      })
      .then(async (result) =>{
        if(result.message=="success"){
          fetchData25();
          setText('')
          setColors('#6A98CA')
          return updateError("Subliminal successfully added to playlist!", setError);
        }else{
          fetchData25();
          setText('')
          setColors('#FF6A6A')
          return updateError("Playlist name already exists!", setError);
        }
      })
    }else{
      fetchData25();
      setColors('#FF6A6A')
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
    body: JSON.stringify({featured_id: global.playlist.featured_id, playlist_id: item.playlist_id,
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
          setColors('#FF6A6A')
          return updateError("Subliminal is already part of this playlist!", setError);
        }else{
          fetchData25()
          setColors('#6A98CA')
          return updateError("Subliminal successfully added!", setError);
        }
      })
    fetchData25()
  }
  const space=()=>{
    if(width*2<=height){
      return verticalScale(440);
    }else if(width*2<=height+100){
      return verticalScale(500);
    }else{
      return verticalScale(510);
    }
  }

  return (
    <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: width, height: height}}>
    <SafeAreaView>
    {error ? (
                <Modal
                animationType="slide"
                transparent={true}
                visible={modal3}
              >
              <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
              </View>
              <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
                <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: colors, }}>
                  <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: colors}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
                  </View>
                  <Text style={{textAlign: 'center', fontSize: scale(10), marginBottom: verticalScale(20),  marginTop: verticalScale(20), color: colors, fontWeight: '600' }}>{error}</Text>
                  
                </View>
              </View>
              
              
            </Modal>
                
                ):null}
      <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={()=> [navigation.goBack()]} style={{width: scale(38), height: scale(38)}} >
          <Image source={require('../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
        </TouchableOpacity>
      </View>
                  <View style={{flexDirection: 'row', marginHorizontal: scale(30), alignItems: 'center'}}>
                  <Image source={{uri: global.items.cover}} style={{width: scale(90), height: scale(90), borderRadius: 20}} />
                    <View>
                      <Text style={{ fontSize: scale(17), color: '#0D0D0D', fontWeight: 'bold', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.items.title}</Text>
                      <Text style={{ fontSize: scale(15), marginTop: 5, color: '#505050', fontWeight: '600', textAlign: 'left', width: width-scale(150), paddingHorizontal: scale(10)}} >{global.items.category.name}</Text>
                    </View>
                  </View>
                  <View style={{ width: width/1.3, alignSelf: 'center', marginTop: 50}}>
                    <TextInput placeholder="Enter Playlist Name" autoCorrect={true} value={text} onChangeText={newText => setText(newText)}  style={{width: width/1.3, height: verticalScale(30),   fontSize: scale(12), fontWeight: 'bold', textAlign: 'center', marginTop: scale(3), }}/>
                    <View style={{backgroundColor: 'gray', height: 2, width: width/1.3, marginTop: 0}}></View>
                  </View>
                  <View style={{width: width/1.3, alignSelf: 'center', marginTop: 25, marginBottom: 20}}>
                    <TouchableOpacity onPress={()=> addToNewPLaylist(global.playlist, text)} style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)', backgroundColor: '#049DD9', borderRadius: 15 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center',  fontSize: scale(15)}}>Add to New Playlist</Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                      <FlatList
                        data={data25}
                        renderItem={({ item }) => (          
                          <TouchableOpacity onPress={()=> addToOldPlaylist(item)} style={{height:scale(70), width: width, flexDirection: 'row', marginBottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={{uri: item.cover}} style={{width: scale(60), height: scale(60), borderRadius: 10, marginBottom: 5, marginLeft: scale(10)}}/>
                            <View style={{ width: width-scale(90), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 5}}>
                              <Text numberOfLines={2}style={{ width: width/1.9, marginLeft: 10, color: '#0D0D0D', fontWeight: 'bold', fontSize: scale(16), }}>{item.title}</Text>
                            </View>
                            
                          </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.playlist_id}
                        style={{marginHorizontal: scale(35), width: width-scale(70),}}
                        showsHorizontalScrollIndicator={false}
                      />
                      <View style={{height: space(), width: width/2}}>
                      </View>
                  </ScrollView>
    </SafeAreaView> 
  </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    alignItems: "center",
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
export default ThreePlaylist;