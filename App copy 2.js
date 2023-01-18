import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera, CameraType } from 'expo-camera';

const App = () => {
    const [hasPermission, setHasPermission] = useState(null);
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
        return <TouchableOpacity style={{marginTop: 100}} onPress={()=> [setHasPermission('granted'), console.log("Me")]}>
        <Text>No access to camera</Text>
        </TouchableOpacity>
    }
    const takePicture = async () => {
      if(camera){
        const data1 = await camera.takePictureAsync(null);
        console.log(data1)
        const data = new FormData();

        data.append('file', {
          uri: data1.uri,
          name: 'test.jpg',
          type: "image/jpeg",
          
        });
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
          console.log(result);
          
        } catch (error) {
          // Error retrieving data
          // Alert.alert('Error', error.message);
          console.log('error upload', error);
        }
        }
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={ref => setCamera(ref)} focusable={true} flashMode={flash} type={type} ratio="22:12">
                <View style={styles.buttonContainer}>
                  <View style={[styles.button,{height: 150, borderRadius: 0, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-around'}]}>
                    <TouchableOpacity onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back);
                        }}>
                      <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/54/54329.png'}} style={{width: 25, height: 25, tintColor: 'white' }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => takePicture()} style={{height: 60, width: 60, borderRadius: 50, backgroundColor: 'white'}}></TouchableOpacity>
                    <TouchableOpacity onPress={()=> setHasPermission(false)} style={{}}>
                      <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/54/54329.png'}} style={{width: 25, height: 25, tintColor: 'white' }}/>
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
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default App;
/*<TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setType(type === CameraType.back ? CameraType.front : CameraType.back);
                        }}>
                        <Text style={styles.text}> Flip </Text>
                    </TouchableOpacity> */