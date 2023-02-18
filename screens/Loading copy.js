import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { moderateScale, verticalScale } from 'react-native-size-matters';
const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;
import { Audio } from 'expo-av'; 
import * as FileSystem from 'expo-file-system';
export default function Loading({navigation}) {
  const [isPlaying, setIsPlaying] = useState(true)
  const chose=()=>{
    if(global.id==null){
      navigation.navigate("Choose")
    }else if(global.id==undefined){
      navigation.navigate("Choose")
    }else if(global.id==''){
      navigation.navigate("Choose")
    }else{
      navigation.reset({
        index: 0, routes: [{name: "Home"}]
      })
    }
  }
  const onPressPlaySound=async()=> {
    const soundUri= 'https://dev.node.magusaudio.com/api/v1/s3/audio/track?id=KLf2ujaJB6p3iC2YUaxsVC&version=1'
    var arr = soundUri.toString().split("/");     
    console.log(`uri for sound: ${soundUri}`);     
    var filename= arr[arr.length-1];
   
     FileSystem.downloadAsync(soundUri, FileSystem.documentDirectory+ filename)
               .then(({uri})=>{
                 console.log("finished downloading to", uri)
               })
               .catch(error=>{
                 console.error(error);
               });
     
   
     const sound = new Audio.Sound();
     try {
       await sound.loadAsync(require(FileSystem.documentDirectory+filename));
       await sound.playAsync();
       // Your sound is playing!
     } catch (error) {
       // An error occurred!
     }
   }
  useEffect(() => {
    onPressPlaySound()
    global.deleted=false
    global.category=""
    const unsubscribe = navigation.addListener('focus', () => {
      global.modalVisible=false
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'black', height: height*1.5, width: width, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={require('../assets/splash.png')} style={styles.deer}/>
      </View>
      <CountdownCircleTimer
        isPlaying={isPlaying}
        duration={5}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[5, 4, 3, 0]}
        onComplete={() => (chose())}
        updateInterval={1}
    >
      {({ remainingTime, color }) => (
        <Text style={{ color, fontSize: 40 }}>
          {remainingTime}
        </Text>
      )}
    </CountdownCircleTimer>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 8,
  },
  deer: {
    width: width-moderateScale(85), height: moderateScale(230), alignSelf: 'center', marginTop: verticalScale(100), shadowColor: 'black', shadowOpacity: 0.4
  },
});
