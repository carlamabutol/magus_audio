import { useEffect, useRef, useState } from 'react';
import { Image, Dimensions, Modal, StyleSheet, Text, TouchableWithoutFeedback, View, ImageBackground, TouchableOpacity } from 'react-native';
import {Audio} from "expo-av";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const {width} = Dimensions.get('window');
function Magusone({navigation}) {
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [modal, setModal] = useState(false);
  
  useEffect(() => {
    global.deleted=false
    const unsubscribe = navigation.addListener('focus', () => {
      setModal(global.deleted)
      global.modalVisible=false
   Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: 1,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: 1,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: true,
   })
    });
    return unsubscribe;
    
  }, [navigation]);
  const chose=()=>{
    if(global.id==null){
        navigation.navigate("Choose")
    }else{
      if(global.subs==1){
        navigation.navigate("Home")
      }else{
        navigation.navigate("Home")
      }
    }
  }
  return (
    <ImageBackground source={require('./assets/welcome1bg.png')} style={styles.container}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
          <View style={{height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'black', opacity: 0.4}}>
          </View>
          <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: '#6A98CA', }}>
              <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: '#6A98CA'}}>
                <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Account Deleted</Text>
              </View>
              <Text style={{textAlign: 'center', fontSize: scale(10), marginTop: verticalScale(20), marginBottom: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Your account has been deleted from Magus Audio.</Text>
                <TouchableOpacity onPress={()=>setModal(false)} style={{marginBottom: verticalScale(20), width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Confirm</Text>
                </TouchableOpacity>
            </View>
            
          </View>
          
          
        </Modal>
        <Image source={require('./assets/thedeer.png')} style={{width: scale(110), height: scale(130), marginTop: verticalScale(100), 
      shadowColor: 'black', shadowOffset:{width: 0, height: 0}, shadowOpacity: 0, shadowRadius: 3}}/>
      <View>
        <Text style={{padding: 5, marginTop: verticalScale(10), fontSize: scale(30), fontWeight: 'bold', textAlign: 'center', color: 'rgba(242,242,242,1)', textShadowColor: 'black', textShadowOffset: {width: 2, height: 2}, textShadowRadius: 5}}>Magus</Text>
      </View>
     
      <TouchableOpacity onPress={()=> chose()} style={{paddingTop: verticalScale(170), borderRadius: 100, shadowColor: 'black', shadowOpacity: 1, shadowOffset: {width: 0, height: 0}}}>
        <Image source={require('./assets/next.png')} style={{width: scale(35), height: scale(35), borderRadius: 150}}/>
      </TouchableOpacity>
       
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Magusone;