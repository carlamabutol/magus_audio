import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, StatusBar, TextInput, FlatList, Modal, SafeAreaView, ImageBackground, Image, Text, TouchableOpacity, ScrollView, View, Dimensions } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import { StateContext } from "../../StateContext";
import { UserContext } from "../../UserContext";

const Help =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [modal3, setModal3] = useState(false);
  const [text, setText] = useState('');
  const [combine, setCombine] = useState([]);
  const [array, setArray] = useState([]);
  const [select, setSelected] = useState(0);
  const [selects, setSelecteds] = useState(0);
  const image1='https://cdn-icons-png.flaticon.com/128/130/130906.png';
  const image2='https://cdn-icons-png.flaticon.com/128/656/656979.png';
  const [cover, setCover] = useState(image1);
  useEffect(()=>{
    const array= list1.concat(list2, list3, list4, list5, list6)
    setCombine(array)
    setArray(array)
  }, []);
  const space=()=>{
    if(global.value!="MINIMIZE"){
      if(width*2<=height+100){
        return scale(65);
      }else{
        return verticalScale(150);
      }
    }
    else{
      return verticalScale(130);
    }
  }
  const DATA = [
    {
      id: '1',
      name: 'Safety Question',
    },
    {
      id: '2',
      name: 'Questions About Results',
    },
    {
      id: '3',
      name: 'Usage Scenario Questions',
    },
    {
      id: '4',
      name: 'Listening Activity Questions',
    },
    {
      id: '5',
      name: 'Technical Questions',
    },
    {
      id: '6',
      name: 'Audio/Product Related Questions',
    },
  ];
  const list1=[
    {
      id: 1,
      qu: "Are Magus Subliminals safe?",
      ans: "Yes, because all Magus Subliminals do not contain any negative or harmful statements to the listener. All Subliminals and statements are carefully planned and designed to manifest effective, healthy, and safe results."
    },
    {
      id: 2,
      qu: "Are Magus Subliminals safe for children?",
      ans: "Unless there are indicated age requirements on the product description or instructions of the subliminal, all Magus Subliminal audios are safe for children ages seven (7) and above. However, for children of ages six (6) and below, avoid exposing them to the subliminal audios because the information density of the messages encoded in the audio might be overwhelming for them.\nFor subliminals that change the body, the recommended age is 14 years old and up.",
    },
    {
      id: 3,
      qu: "Are Magus Subliminals safe for pregnant women?",
      ans: "For safety reasons, pregnant women are not recommended to listen to subliminals that include body-altering effects (Biokinesis), hormonal-altering effects, or body chemistry altering effects. This is because they can affect the pregnancy or development of the baby in the womb in unpredictable and uncontrolled ways.\nRecommended listening time for pregnant women is a maximum of 2 hours per day with M-type subliminals and a maximum of 1 hour per day for U-type and G-type subliminals.\nHowever, Magus Subliminals offers a subliminal product that promotes a healthy pregnancy and baby development.\nFor additional questions or custom subliminal requests with healthy pregnancy modules, you may contact Customer Support or your Subliminal Coach.",
    },
    {
      id: 4,
      qu: "Are subliminals safe to listen while driving?",
      ans: "Magus Subliminals have higher information density compared to all the subliminal audios in the market. Magus Subliminals have different technologies that allow you to shift your focus and state of mind to make your mind function in its most optimal state to receive and process the subliminal messages. Magus Subliminals have higher energy consumption and might make you drowsy or sleepy in the process. Therefore, you should never listen to subliminals while driving, operating heavy machinery, or doing important work that requires focus on the task.\nWe also have subliminal titles and modules for driving skills improvement and safe driving behaviors that can aid you in your driving.\nRecommended rest/break before driving\n\u2022 M-Type – At least 30 mins-1 hour.\n\u2022 U-Type – At least 1-2 hours.\n\u2022 G-Type – At least 2 hours.",
    },
    {
      id: 5,
      qu: "Is there any form of advertising in your subliminal?",
      ans: "All Magus Subliminal audios do not contain any content or messages that advertise any product, company, party, institution, or individual in any way.",
    },
    {
      id: 6,
      qu: "Will the subliminals clash against my religious or spiritual beliefs?",
      ans: "All the statements in the subliminal do not include any form of content to alter or change your religious or spiritual beliefs at all nor influence you to alter or change your religious or spiritual beliefs. All statements are designed to empower you, no matter your religious or spiritual beliefs.",
    },
    {
      id: 7,
      qu: "Do we have gender considerations in the product?",
      ans: "Unless indicated in the title or description, all the subliminal audios offered are gender-neutral and work regardless of the sexual orientation of the user without having any adverse or unintended effects on the sexuality and sexual orientation of the user.\nFor custom personal projects, we can apply gender-specific wordings in the script to improve the user's experience and results.\nFor family usage custom subliminals, all statements are gender neutral.",
    },
    {
      id: 8,
      qu: "Does your lifespan decrease while listening to Subliminal Audios?",
      ans: "It is natural as time moves forward that our bodies age and deteriorates thus, our lifespan decreases as well. Therefore, whatever we do naturally decreases our lifespan including listening to subliminals.\nBut if you are using specialized subliminals, like health subliminals or rejuvenating subliminals. Basically, your body is healing and becoming healthier therefore it is possible to increase your lifespan if you listen to Subliminals. By using Ultiliminals and Godliminals, this can be achievable on a certain degree.\nThe Chief Creator’s personal story and example is a living proof that you can achieve “Fountain of Youth” effects while using subliminals.",
    },
  ]
  const list2=[
    {
      id: 9,
      qu: "How long will it take to see results?",
      ans: "With how the Magus Subliminals have progressed in terms of power and technology, noticeable results in terms of state and awareness shifting are manifested almost instantly or within a day given the right conditions. Permanent results and physical changes are expected to manifest within 3 months of listening according to the instructions. For more details and estimations, you can refer with your subliminal audio’s product manual.\nDifferences of results speed\n\u2022 M type – minutes - hours\n\u2022 U type – seconds - minutes\n\u2022 G type – seconds - minutes"
    },
    {
      id: 10,
      qu: "How can I tell if subliminal messages work for me?",
      ans: "All Magus Subliminal Audios provides noticeable results and changes for you even if they were happening smoothly and naturally. Your thought patterns are consistently being upgraded and renewed in ways that truly empower you to naturally achieve the changes you desire. However, you also need to be patience and dedicated in the process to achieve permanent and lasting results.",
    },
    {
      id: 11,
      qu: "Will the subliminal messages work if English is not my native language?",
      ans: "All Magus Subliminal Audios works as intended regardless of your language due to our proprietary scripts and technologies. However, having a strong English language fluency will make it easier for the listener to process the messages.\nLinguistics training and guide – All magus subliminal audios for U and G type all have a built-in linguistics training module that can help you comprehend all the scripts easily.",
    },
    {
      id: 12,
      qu: "Are the results permanent?",
      ans: "All Magus Subliminal Audios provide permanent results due to how we make them. For permanent changes to happen, first, you must internalize the change at the core of your being, resolve all the problems and blockages associated with the change at the root cause level. Second, replace all negative associations with new positive paradigms and associations. Third, provide stability at all levels and realizations to further cement your changes while making it perfectly smooth, natural, and healthy for you. All processes and changes are done automatically through the help of Magus Subliminals, and this is only the tip of the iceberg of what Magus Subliminals can do.",
    },
    {
      id: 13,
      qu: "What can I do to have faster results?",
      ans: "Magus Subliminals works to manifest results as intended in a fast and self-adapting manner. That is why it works regardless of your current situation. But to achieve faster results, first, you need to make sure that you use the subliminal audio as instructed. Next, you got to have the right belief and motivation to help yourself achieve what you wish to achieve with the help of the subliminal, no matter what it takes. Lastly, do the things that advance you and avoid doing the things that delay you, block you, or move you away from reaching your desired goal.",
    },
    {
      id: 14,
      qu: "What are the best ways to listen to subliminal audios for faster results?",
      ans: "The following are some of the tips or actionable steps of listening to the subliminal for faster results:\n\u2022 Choose the right equipment – make sure that the speakers or phones that you are using can deliver the sound in an uncompromised way. You can also refer to the Recommended Devices list.\n\u2022 Scheduling your listening time – scheduling your listening time makes your mind adapt to the habit of self-development that you set for yourself.\n\u2022 Goal-setting and prioritization – how do you want the subliminal audio to help you achieve your goal? Tie your general goals and priorities as\n\u2022 Visualization or focusing while listening – refer to your manual if you are suggested or advised to visualize or meditate while listening. Detailed instructions are also presented in your designated manual."
     },
    {
      id: 15,
      qu: "Do the results vary from user to user?",
      ans: "The intended results and goals of the subliminal audio are sure to manifest in due time; however, each person is unique and may have different circumstances and experiences. Therefore, there are nuances and variations in how the effects of the subliminal are triggered as well as how the manifestation happens. Other factors include but not limited to user temperament and personality, resources available to the listener, total exposure time to the subliminal audio, and other variables that will be considered.",
    },
    {
      id: 16,
      qu: "Once I have achieved my goal, do I still need to listen to the subliminal audio?",
      ans: "It is optional to listen to the audio once you feel that you have gained the results you want. However, it is strongly suggested to listen continuously to the audio for stronger and lasting changes. Listening to the audio again gives you other benefits that are considered as a bonus due to the supporting modules of the program.",
    },
  ]
  const list3=[
    {
      id: 17,
      qu: "Is it okay to expose family members without them knowing?",
      ans: "Manipulating the free will of others without consent is unethical.\nFirst, you must inform your family members if you want to expose them to the audio for them to benefit from the effects.\nSecond, if you are using Custom Subliminals, Ultiliminals, and Godliminals, their name must be embedded in the audio for them to benefit and not cause violations to anti-piracy and unauthorized usage."
    }
  ]
  const list4=[
    {
      id: 18,
      qu: "How should I listen?",
      ans: "There are different options in how you should listen to Magus Subliminals. You can listen to Magus Subliminals while sleeping, meditating, or doing other activities. But it is advised that you should not listen to Magus Subliminals while driving, operating heavy machinery, performing surgery, or doing any critical work that requires your focus, or at least 1 hour before doing the things that aforementioned. For best results, there are specific listening guides and action plans for each subliminals, and they can be found in their respective product pages or instruction guides."
    },
    {
      id: 19,
      qu: "Can I listen during sleep?",
      ans: "See “How should I listen?”"
    },
    {
      id: 20,
      qu: "Can I listen while doing other activities?",
      ans: "See “How should I listen?”"
    },
    {
      id: 21,
      qu: "Is it okay to meditate while listening to subliminals?",
      ans: "See “How should I listen?”"
    },
    {
      id: 22,
      qu: "Is it okay to use affirmations while listening to subliminals?",
      ans: "It is okay to use affirmations, provided that these affirmations that you recite must be worded properly and aligned to your goal."
    },
    {
      id: 23,
      qu: "How many audios can I listen at the same time?",
      ans: "Due to how Magus Subliminals are built, it is required for you to listen to a single audio for only one at a time and NEVER at the same time. However, you can simply create a playlist and listen to different topics of subliminals of your choosing at your own pace."
    },
    {
      id: 24,
      qu: "How many hours is the recommended listening time?",
      ans: "The recommended listening time depends on the instructions and recommendations from your product manual or guide. As a rule of thumb, you can listen more than the recommended time, but it is not lesser than the recommended time to have consistent usage and faster results."
    },
    {
      id: 25,
      qu: "Do you have any playlist or topic recommendations?",
      ans: "Depending on the goal that you are trying to achieve, we list down different playlists and sequences that can help you achieve your desired results. You can find them in the recommendations section of our website. You can also ask for recommendations from your subliminal coach."
    },
  ]
  const list5=[
    {
      id: 26,
      qu: "Do you have suggestions for a sound system setup?",
      ans: "As a requirement for Ultrasonic/ Silent Subliminals, the speaker must be able to deliver sounds up to 20,000 Hz. However, for the optimal listening experience, the recommended speakers are stereo or surround type set-up. Avoid playing Magus Subliminals to a wireless speaker due to potential audio quality loss when playing over a wireless connection."
    },
    {
      id: 27,
      qu: "Is it possible to play subliminal audios on a mobile phone?",
      ans: "Yes, you can perfectly play Magus Subliminals on your phone. For Wave Audio (.wav) formats, it is recommended that you download an app that can play .wav audio files. Soon, we will be releasing the Magus streaming mobile app that is available on Android and iOS devices."
    },
    {
      id: 28,
      qu: "What are your recommended apps to play subliminals?",
      ans: "Apps that are compatible to play different kinds of audio formats such as FLAC or WAV format and can deliver audios with high sound quality above 120 kbps are strongly recommended. My personal recommendation is VLC Media Player."
    },
    {
      id: 29,
      qu: "What are the requirements for ultrasonic subliminals?",
      ans: "As a requirement for Ultrasonic/ Silent Subliminals, the speaker must be able to deliver sounds up to 20,000 Hz. Check the specifications of your listening gear if it fits the criteria."
    },
    {
      id: 30,
      qu: "Are headphones required to listen to subliminals?",
      ans: "Listening to headset, headphones, or earbuds are optional and up to your preferences. However, you should avoid listening through wireless connection headsets due to potential audio quality loss. To avoid hearing problems or damages, always listen to a low and comfortable volume."
    },
    {
      id: 31,
      qu: "Do you recommend bone conduction earphones?",
      ans: "Tests and customer feedback show that Magus Subliminals is compatible with most wired bone conduction earphones. However, results are not guaranteed if you are using wireless bone conduction earphones or wireless headsets due to potential quality loss."
    },
    {
      id: 32,
      qu: "Can I burn the subliminal audios to CD?",
      ans: "Magus Subliminals will lose its quality due to a different encoding formats and quality loss when being burned on the CD. Due to this reason, the file is considered corrupted and the audio might not work or deliver results as intended. Therefore, DO NOT burn the subliminal to any CD, DVD, or any recording media."
    },
    {
      id: 33,
      qu: "Can I upload the subliminal audios to a streaming site (YouTube, Spotify, Soundcloud, etc.)?",
      ans: "No, and it will automatically be classified as piracy and unauthorized and illegal distribution that automatically triggers the anti-piracy script."
    },
    {
      id: 34,
      qu: "Can I reupload the subliminal audios to another online storage device for backup?",
      ans: "You can upload but never grant access to unauthorized people outside the allowable people on the Master List. In case of custom personal and name embedded subliminal, other people can only have the access to the subliminal file except for the creator, magus customer support and affiliates, and you."
    },
  ]
  const list6=[
    {
      id: 35,
      qu: "What are the subliminal build formats you offer?",
      ans: "Build formats are the formatting used to encode the messages in subliminal and how they are presented to the listener.\nCurrently, the subliminal formats that we offer are Pure Track, Masked Track, Silent Track, and Hybrid Track which is the combination of Masked and Silent Track. For custom orders, the subliminal messages can be encoded on the music of your choice. Inside the streaming app, Hybrid and Masked formats are not uploaded since you can listen to Pure and Silent tracks and adjust the respective volumes of each."
    },
    {
      id: 36,
      qu: "What are the audio formats of your subliminal Audios?",
      ans: "Audio formats are the file type used when exporting the subliminal audio content. We offer audio formats such as .mp3, FLAC, and .wav audio in some cases.\nIn our subliminal streaming app, subliminal audios are uploaded in .wav format."
    },
    {
      id: 37,
      qu: "How long is the subliminal audio?",
      ans: "The length varies depending on the product. Please refer to the respective manual or product information of the subliminal you are using. The audio length and the recommended listening are different and it is specified in your manual.\nThe usual length of the audio is 30 minutes of listening time and the audio has already covered the whole script multiple times."
    },
    {
      id: 38,
      qu: "How are subliminal audios delivered?",
      ans: "The products are delivered digitally and are only available for download via the online store. For the app, everything is streamed directly to your device. Whenever you make a purchase using your account, the audio is automatically added to your online library.\nCustom Audios are delivered through a specific download link. It will be sent to you by the dedicated staff after uploading. It will also be available on your account via Magus online streaming Web and Mobile apps."
    },
    {
      id: 39,
      qu: "Do you offer subliminal audios on CD, DVD, or USB?",
      ans: "We do not offer Magus Subliminals on any form of physical media. It is only available for download at our online store and only available for listening on our App."
    },
    {
      id: 40,
      qu: "Do you post the script or affirmation contents?",
      ans: "We do not post affirmations or specific statements due to various reasons. One of them is that it contains highly classified trade secrets of the company. We do, however, list down the detailed features of a given product in its respective product page and instruction manual. We also give out recommended affirmations for you to recite."
    },
    {
      id: 41,
      qu: "Do you have suggested affirmations that we can use alongside your products?",
      ans: "Yes. You can find general affirmations for manifestation in the Subliminal Guide and Coaching Handbook. The book also teaches you how to create affirmations for yourself.\nWe will post other specific affirmations of your desired topics soon. You can also ask your subliminal coach for affirmations based on your circumstances and situation."
    },
  ]
  const spacesmodal=()=>{
      if(width*2<=height){
        return verticalScale(230);
      }else{
        return verticalScale(260);
      }
  }
  const spaceSearch=()=>{
      if(width*2<=height){
        return verticalScale(160);
      }else if(width*2<=height+100){
        return verticalScale(180);
      }else{
        return verticalScale(200);
      }
  }
  const line=()=>{
    if(width*2<=height){
      return verticalScale(18);
    }else if(width*2<=height+100){
      return verticalScale(20);
    }else{
      return verticalScale(25);
    }
  }
  const view=()=>{
    if(select==1){
      return(
        <>
              <FlatList
                data={list1}
                renderItem={({item}) => 
                <>
                  <TouchableOpacity onPress={() => [selected1(item.id)]}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: verticalScale(10), marginBottom: verticalScale(5)}} >
                    <Text style={{fontSize: scale(14), flexWrap: 'wrap', flex: 1, fontWeight: '600', marginBottom: 10, marginRight: 10,}}>{item.qu}</Text>
                    {item.id===selects ? <Image source={{uri: image1}} style={{width: scale(12), height: scale(12)}}/> : <Image source={{uri: image2}} style={{width: scale(12), height: scale(12)}}/>}
                  </TouchableOpacity>
                  {item.id==selects ? <Text style={{fontSize: scale(12), fontWeight: '400', textAlign: 'justify', marginHorizontal: 25, lineHeight: line()}}>{item.ans}</Text> : null}
                </>
                }
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20, marginBottom: spacesmodal()}}
              />  
        </>
      )
    }else if(select==2){
      return(
        <>
              <FlatList
                data={list2}
                renderItem={({item}) => 
                <>
                  <TouchableOpacity onPress={() => [selected1(item.id)]}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: verticalScale(10), marginBottom: verticalScale(5)}} >
                    <Text style={{fontSize: scale(14), flexWrap: 'wrap', flex: 1, fontWeight: '600', marginBottom: 10, marginRight: 10,}}>{item.qu}</Text>
                    {item.id===selects ? <Image source={{uri: image1}} style={{width: scale(12), height: scale(12)}}/> : <Image source={{uri: image2}} style={{width: scale(12), height: scale(12)}}/>}
                  </TouchableOpacity>
                  {item.id==selects ? <Text style={{fontSize: scale(12), fontWeight: '400', textAlign: 'justify', marginHorizontal: 25, lineHeight: line()}}>{item.ans}</Text> : null}
                </>
                }
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20, marginBottom: spacesmodal()}}
              />  
        </>
      )
    }else if(select==3){
      return(
        <>
              <FlatList
                data={list3}
                renderItem={({item}) => 
                <>
                  <TouchableOpacity onPress={() => [selected1(item.id)]}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: verticalScale(10), marginBottom: verticalScale(5)}} >
                    <Text style={{fontSize: scale(14), flexWrap: 'wrap', flex: 1, fontWeight: '600', marginBottom: 10, marginRight: 10,}}>{item.qu}</Text>
                    {item.id===selects ? <Image source={{uri: image1}} style={{width: scale(12), height: scale(12)}}/> : <Image source={{uri: image2}} style={{width: scale(12), height: scale(12)}}/>}
                  </TouchableOpacity>
                  {item.id==selects ? <Text style={{fontSize: scale(12), fontWeight: '400', textAlign: 'justify', marginHorizontal: 25, lineHeight: line()}}>{item.ans}</Text> : null}
                </>
                }
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20, marginBottom: spacesmodal()}}
              />  
        </>
      )
    }else if(select==4){
      return(
        <>
              <FlatList
                data={list4}
                renderItem={({item}) => 
                <>
                  <TouchableOpacity onPress={() => [selected1(item.id)]}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: verticalScale(10), marginBottom: verticalScale(5)}} >
                    <Text style={{fontSize: scale(14), flexWrap: 'wrap', flex: 1, fontWeight: '600', marginBottom: 10, marginRight: 10,}}>{item.qu}</Text>
                    {item.id===selects ? <Image source={{uri: image1}} style={{width: scale(12), height: scale(12)}}/> : <Image source={{uri: image2}} style={{width: scale(12), height: scale(12)}}/>}
                  </TouchableOpacity>
                  {item.id==selects ? <Text style={{fontSize: scale(12), fontWeight: '400', textAlign: 'justify', marginHorizontal: 25, lineHeight: line()}}>{item.ans}</Text> : null}
                </>
                }
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20, marginBottom: spacesmodal()}}
              />  
        </>
      )
    }else if(select==5){
      return(
        <>
              <FlatList
                data={list5}
                renderItem={({item}) => 
                <>
                  <TouchableOpacity onPress={() => [selected1(item.id)]}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: verticalScale(10), marginBottom: verticalScale(5)}} >
                    <Text style={{fontSize: scale(14), flexWrap: 'wrap', flex: 1, fontWeight: '600', marginBottom: 10, marginRight: 10,}}>{item.qu}</Text>
                    {item.id===selects ? <Image source={{uri: image1}} style={{width: scale(12), height: scale(12)}}/> : <Image source={{uri: image2}} style={{width: scale(12), height: scale(12)}}/>}
                  </TouchableOpacity>
                  {item.id==selects ? <Text style={{fontSize: scale(12), fontWeight: '400', textAlign: 'justify', marginHorizontal: 25, lineHeight: line()}}>{item.ans}</Text> : null}
                </>
                }
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20, marginBottom: spacesmodal()}}
              />  
        </>
      )
    }else if(select==6){
      return(
        <>
              <FlatList
                data={list6}
                renderItem={({item}) => 
                <>
                  <TouchableOpacity onPress={() => [selected1(item.id)]}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: verticalScale(10), marginBottom: verticalScale(5)}} >
                    <Text style={{fontSize: scale(14), flexWrap: 'wrap', flex: 1, fontWeight: '600', marginBottom: 10, marginRight: 10,}}>{item.qu}</Text>
                    {item.id===selects ? <Image source={{uri: image1}} style={{width: scale(12), height: scale(12)}}/> : <Image source={{uri: image2}} style={{width: scale(12), height: scale(12)}}/>}
                  </TouchableOpacity>
                  {item.id==selects ? <Text style={{fontSize: scale(12), fontWeight: '400', textAlign: 'justify', marginHorizontal: 25, lineHeight: line()}}>{item.ans}</Text> : null}
                </>
                }
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20, marginBottom: spacesmodal()}}
              />  
        </>
      )
    }
  }
  const selected1=(i)=>{
    if(selects==i){
      setSelecteds(0)
    }else{
      setSelecteds(i)
    }
  }
  const texting=(text)=>{
    setText(text)
    searchfilter(text)
  }
  const searchfilter=(text)=>{
    if(text){
      const newData =combine.filter((item)=>{
        const itemData = item.qu ? item.qu.toUpperCase(): ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData)> -1;
      })
      setCombine(newData);
      setText(text)
    }else{
      setCombine(array)
      setText(text)
      console.log()
    }
  }
  
  const find=()=>{
    if(text==''){
      return(
        <>
            <View style={{marginBottom: 5}}>
              <FlatList
                data={DATA}
                renderItem={({item}) => 
                  <TouchableOpacity onPress={() => [setSelected(item.id)]}
                    style={item.id === select ? styles.selected : styles.unselected} >
                    <Text style={item.id === select ? styles.selectedText : styles.unselectedText}>{item.name}</Text>
                  </TouchableOpacity>
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20}}
              />
            </View>
          {view()}
        </>
      )
    }else{
      return(
        <>
              <FlatList
                data={combine}
                renderItem={({item}) => 
                <>
                  <TouchableOpacity onPress={() => [selected1(item.id)]}
                    style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 0.5, marginHorizontal: 10, marginTop: verticalScale(10), marginBottom: verticalScale(5)}} >
                    <Text style={{fontSize: scale(14), flexWrap: 'wrap', flex: 1, fontWeight: '600', marginBottom: 10, marginRight: 10,}}>{item.qu}</Text>
                    {item.id===selects ? <Image source={{uri: image1}} style={{width: scale(12), height: scale(12)}}/> : <Image source={{uri: image2}} style={{width: scale(12), height: scale(12)}}/>}
                  </TouchableOpacity>
                  {item.id==selects ? <Text style={{fontSize: scale(12), fontWeight: '400', textAlign: 'justify', marginHorizontal: 25, lineHeight: line()}}>{item.ans}</Text> : null}
                </>
                }
                showsVerticalScrollIndicator={false}
                pagingEnabled
                keyExtractor={item => item.id}
                style={{marginHorizontal: 20, paddingBottom: 20, marginBottom: spaceSearch()}}
              />  
        </>
      )
    }
  }
  return(
    <ImageBackground source={require('../../../assets/me/profilebg.png')} style={{width: width, height: height}}>
      <SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal3}
      >
      <ImageBackground source={require('../../../assets/me/profilebg.png')} style={{width: width, height: height}}>
          <SafeAreaView>
            <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={()=> [setModal3(false)]} style={{width: scale(38), height: scale(38)}} >
                <Image source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
              </TouchableOpacity>
            </View>
            <View style={{borderWidth:1,borderRadius: 5, marginHorizontal: 20}}>
              <TextInput placeholder="Search" value={text} onChangeText={newText => searchfilter(newText)}  style={{width: Dimensions.get('window').width-scale(115), fontSize: scale(14),padding: verticalScale(15),}}/>
            </View>
            <Text style={{fontSize: scale(15), fontWeight: '800', margin: verticalScale(20), textAlign: 'center'}}>Frequently Asked Questions</Text>
            
            {find()}
          </SafeAreaView>
      </ImageBackground>
      </Modal>
        <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: verticalScale(10)}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={()=> [navigation.navigate("MeFree1")]} style={{width: scale(38), height: scale(38)}} >
            <Image source={require('../../../assets/pageback.png')} style={{width: scale(26), height: scale(26)}} />
          </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: scale(21), color: '#0D0D0D', fontWeight: 'bold', }} >Help</Text>
        </View>
        <ScrollView style={{marginBottom: space(), marginTop: 15 }}>
        <Image source={require('../../../assets/me/helpme.png')} style={{width: scale(280), height: scale(200), alignSelf: 'center',}}/>
          <TouchableOpacity onPress={()=> navigation.navigate("SubGuide")} style={{flexDirection: 'row', marginTop: 30, left: 50, alignItems: 'center', }}>
            <View style={{width: scale(39), height: scale(39), backgroundColor: '#FF3188', borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
              <Image source={require('../../../assets/me/book.png')} style={{height: scale(24), width: scale(20), tintColor: 'white'}}/>
            </View>
            <Text style={{ fontSize: scale(13), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Subliminal General Guide</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("Privacy")} style={{flexDirection: 'row', marginTop: 30, left: 50, alignItems: 'center',}}>
            <View style={{width:scale(39), height: scale(39), backgroundColor: '#31A0FF', borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
              <Image source={require('../../../assets/me/privacy.png')} style={{height: scale(20), width: scale(17), tintColor: 'white'}}/>
            </View>
            <Text style={{ fontSize: scale(13), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Privacy and Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> setModal3(true)}  style={{flexDirection: 'row', marginTop: 30, left: 50, alignItems: 'center'}}>
            <View style={{width:scale(39), height: scale(39), backgroundColor: '#FF7831', borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
              <Image source={require('../../../assets/me/lock.png')} style={{height: scale(24), width: scale(20), tintColor: 'white'}}/>
            </View>
            <Text style={{ fontSize: scale(13), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >FAQS</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.navigate("Terms")} style={{flexDirection: 'row', paddingBottom: 20, marginTop: 30, left: 50, alignItems: 'center',}}>
            <View style={{width:scale(39), height: scale(39), backgroundColor: '#7E57FF', borderRadius: scale(30), justifyContent: 'center', alignItems: 'center', marginTop: -5, marginRight: 20}}>
              <Image source={require('../../../assets/me/bell.png')} style={{height: scale(24), width: scale(20), tintColor: 'white'}}/>
            </View>
            <Text style={{ fontSize: scale(13), color: '#0D0D0D', fontWeight: 'bold', alignSelf: 'center', }} >Terms and Conditions</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView> 
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  selected: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#6A98CA',
    backgroundColor: '#6A98CA',
    marginRight: 10,
    width: scale(120),
    justifyContent: 'center'
  },
  unselected: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 10,
    width: scale(120),
    justifyContent: 'center'
  },
  selectedText: {
    padding: 5,
    fontSize: scale(14),
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',

  },
  unselectedText: {
    padding: 5,
    fontSize: scale(14),
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
  },
});
export default Help;