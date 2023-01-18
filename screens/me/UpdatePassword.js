import React, { useState, useEffect, useContext } from "react";
import { TextInput, StyleSheet, Image, Text, TouchableOpacity, ImageBackground, View, Dimensions } from "react-native";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import Moment from 'moment';
import { Camera, CameraType } from 'expo-camera';
import { scale, verticalScale } from "react-native-size-matters";

const UpdatePassword =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [hasPermission, setHasPermission] = useState(null);
  const [colors, setColors] = useState('#6A98CA');
  const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState("off");
    const [camera, setCamera] = useState(null);
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);
    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return(
          <> 
            <View style={{height: height, width: width, backgroundColor: 'black', opacity: 0.4}}></View>
            <View style={{height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center',  width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
                <View style={{backgroundColor: 'white', width: width-100, borderRadius: 10,  alignItems: 'center', borderWidth: 0.5, borderColor: colors, }}>
                  <View style={{width: width-100, borderTopRightRadius: 10, borderTopLeftRadius: 10, backgroundColor: colors}}>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: scale(12), fontWeight: '700', padding: scale(5), }}>Alert</Text>
                  </View>
                  <Text style={{textAlign: 'center', fontSize: scale(10), marginTop: verticalScale(20), color: '#6A98CA', fontWeight: '600' }}>Do you want to allow Magus to use your camera to capture photo for your profile picture?</Text>
              <View style={{width: width-130, marginTop: verticalScale(20), marginBottom: verticalScale(20), flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>[setHasPermission('granted')]} style={{width: (width-150)/2, backgroundColor: '#6A98CA', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color: 'white'}}>Proceed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.goBack()} style={{width: (width-150)/2, backgroundColor: 'white', borderRadius: 5, padding: 10, borderWidth: 0.5, borderColor: '#6A98CA'}}>
                  <Text style={{ fontSize: scale(10), fontWeight: '600', textAlign: 'center', color:'#6A98CA'}}>Cancel</Text>
                </TouchableOpacity>
              </View>
                </View>
              </View>
         
          </>
        )
    }
    const takePicture = async () => {
      if(camera){
        const data1 = await camera.takePictureAsync(null);
        global.imageURI=data1.uri;
        const data = new FormData();
        data.append('file', {
          uri: data1.uri,
          name: 'test.jpg',
          type: "image/jpeg",
          
        });
        navigation.goBack()
        try {
          let res = await fetch(`https://dev.magusaudio.com/api/v1/mobile/cover/upload`, {
            method: 'post',
            body: data,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });
          let result = await res.json();
          global.uri=result.file_name
        } catch (error) {
          console.log('error upload', error);
        }
      }
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={ref => setCamera(ref)} focusable={true} flashMode={flash} type={type} ratio="16:9">
                <View style={styles.buttonContainer}>
                  <View style={[styles.button,{height: 150, borderRadius: 0, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-around'}]}>
                    <TouchableOpacity onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back);
                        }}>
                      <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/54/54329.png'}} style={{width: 25, height: 25, tintColor: 'white' }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => takePicture()} style={{height: 60, width: 60, borderRadius: 50, backgroundColor: 'white'}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=> [setHasPermission(false), navigation.goBack()]} style={{}}>
                      <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828666.png'}} style={{width: 25, height: 25, tintColor: 'white' }}/>
                    </TouchableOpacity></View>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        bottom: 0
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});


export default UpdatePassword;