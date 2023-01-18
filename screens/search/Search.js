import { useState, useEffect } from "react";
import { ScrollView, Image, TouchableOpacity, StatusBar, FlatList,ImageBackground, View, StyleSheet, Text, Dimensions, SafeAreaView } from "react-native";
import { createContext, useContext } from "react";
import { UserContext } from "../UserContext";
import { StateContext } from "../StateContext";
import { scale, verticalScale } from "react-native-size-matters";

function Search({navigation}) {
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const {value, setValue} = useContext(UserContext);
  const {subliminal, setSubliminal} = useContext(StateContext);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(0)
  const fetchData = async () => {
    const resp = await fetch("https://dev.magusaudio.com/api/v1/category");
    const data = await resp.json();
    setData(data);

  };
  const action =(item)=>{
    global.selectedCategory=item.id
    global.selectedName=item.name
    navigation.navigate("SearchCategory")
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
      space()
      global.shuffling=false
      global.playlist=false
      global.standard="Loaded"
      if(width*2<=height){
        console.log("1")
      }else if(width*2<=height+100){
        console.log("2")
      }else{
        console.log("3")
      }
    });
    return unsubscribe;
  }, []);
  const renderItem= ({ item }) => {
    return (
      <ImageBackground style={{borderColor: 'rgba(4,157,217,1)', borderWidth:2, height: scale(70),  borderRadius: 20, width: Dimensions.get('window').width/2-25, marginRight: -10, marginLeft: 20, marginBottom: (10), flexDirection: 'row', shadowOpacity: 0.5, shadowOffset: {width: .5, height: .5}, shadowColor: 'rgba(4,157,217,.8)',}}>
        <TouchableOpacity onPress={()=> action(item)} style={{ width: Dimensions.get('window').width/2-25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: width/2-25,justifyContent: 'center'}}>
            <Text numberOfLines={3} style={{ color: 'black',   fontSize: scale(12), color: 'black', textAlign: 'center', padding: 20, flexWrap: 'wrap' }}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  const space=()=>{
    if(width*2<=height){
      return verticalScale(170);
    }else if(width*2<=height+100){
      return verticalScale(140);
    }else{
      return verticalScale(150);
    }
  }
  return (
    
    <SafeAreaView style={styles.container}>
      <ImageBackground  style={{width: width, height: height}}>
        <View style={{left: 20, ...Platform.select({android: {marginTop: -10}, ios: {marginTop: scale(5)}}), right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: scale(23), color: '#0D0D0D', fontWeight: 'bold', }} >Search</Text>
            <TouchableOpacity onPress={()=> [navigation.navigate('SearchIcon')]} style={{marginRight: 10}}>
              <Image source={{uri: "https://cdn-icons-png.flaticon.com/512/1167/1167092.png"}} style={{width: scale(26), height: scale(26), tintColor: 'black'}} />
            </TouchableOpacity>
        </View>
        <ScrollView style={{marginTop: 10, }}>
          <Text style={{ left: 20, fontSize: scale(15), color: '#0D0D0D', fontWeight: 'bold', }} >Browse Category</Text>
          <FlatList
          data={data}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          style={{marginTop: scale(15),}}
          showsVerticalScrollIndicator={false}
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
    backgroundColor: '#F9C2FF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
export default Search;