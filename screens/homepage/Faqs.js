import React, { useState, useEffect, useContext } from "react";
import { TextInput, Modal, ImageBackground, Image, Text, TouchableOpacity, FlatList, View, Dimensions, ScrollView } from "react-native";
import { StateContext } from "../StateContext";
import { UserContext } from "../UserContext";
import { SelectList } from 'react-native-dropdown-select-list'
import { scale } from "react-native-size-matters";
const Faqs =({navigation})=>{
  const width=Dimensions.get('window').width;
  const height=Dimensions.get('window').height;
  const [selected, setSelected] = useState("");
  const [spacing, setSpacing] = useState(0);
  const [keys, setKeys] = useState("Key");
  const [text, setText] = useState("");
  const [space, setSpace] = useState(-15);
  const [text5, setText5] = useState("");
  const [space5, setSpace5] = useState(-15);
  const [text4, setText4] = useState("");
  const [space4, setSpace4] = useState(-15);
  const [text3, setText3] = useState("");
  const [space3, setSpace3] = useState(-15);
  const [text2, setText2] = useState("");
  const [space2, setSpace2] = useState(-15);
  const [text1, setText1] = useState("");
  const [space1, setSpace1] = useState(-15);
  const [modal, setModal] = useState(false);
  const data = [
      {key:'1', value:'Are Magus Subliminals safe?'},
      {key:'2', value:'Are Magus Subliminals safe for children?'},
      {key:'3', value:'Are Magus Subliminals safe for pregnant women?'},
      {key:'4', value:'Are subliminals safe to listen while driving?'},
      {key:'5', value:'Is there any form of advertising in your subliminal?'},
      {key:'6', value:'Will the subliminals clash against my religious or spiritual beliefs?'},
      {key:'7', value:'Do we have gender considerations in the product?'},
      {key:'8', value:'Does your lifespan decrease while listening to Subliminal Audios?'},
  ]
  const answer=(val)=>{
    if(val==1){
      setText("Yes, because all Magus Subliminals do not contain any negative or harmful statements to the listener. All Subliminals and statements are carefully planned and designed to manifest effective, healthy, and safe results.")
      setModal(true)
    }else if(val==2){
      setText("Unless there are indicated age requirements on the product description or instructions of the subliminal, all Magus Subliminal audios are safe for children ages seven (7) and above. However, for children of ages six (6) and below, avoid exposing them to the subliminal audios because the information density of the messages encoded in the audio might be overwhelming for them.\nFor subliminals that change the body, the recommended age is 14 years old and up.")
      setModal(true)
    }
    else if(val==3){
      setText("For safety reasons, pregnant women are not recommended to listen to subliminals that include body-altering effects (Biokinesis), hormonal-altering effects, or body chemistry altering effects. This is because they can affect the pregnancy or development of the baby in the womb in unpredictable and uncontrolled ways.\nRecommended listening time for pregnant women is a maximum of 2 hours per day with M-type subliminals and a maximum of 1 hour per day for U-type and G-type subliminals.\nHowever, Magus Subliminals offers a subliminal product that promotes a healthy pregnancy and baby development.\nFor additional questions or custom subliminal requests with healthy pregnancy modules, you may contact Customer Support or your Subliminal Coach.")
      setModal(true)
    }else if(val==4){
      setText("Magus Subliminals have higher information density compared to all the subliminal audios in the market. Magus Subliminals have different technologies that allow you to shift your focus and state of mind to make your mind function in its most optimal state to receive and process the subliminal messages. Magus Subliminals have higher energy consumption and might make you drowsy or sleepy in the process. Therefore, you should never listen to subliminals while driving, operating heavy machinery, or doing important work that requires focus on the task.\nWe also have subliminal titles and modules for driving skills improvement and safe driving behaviors that can aid you in your driving.\nRecommended rest/break before driving\n\u2022 M-Type – At least 30 mins-1 hour.\n\u2022 U-Type – At least 1-2 hours.\n\u2022 G-Type – At least 2 hours.")
      setModal(true)
    }else if(val==5){
      setText("All Magus Subliminal audios do not contain any content or messages that advertise any product, company, party, institution, or individual in any way.")
      setModal(true)
    }else if(val==6){
      setText("All the statements in the subliminal do not include any form of content to alter or change your religious or spiritual beliefs at all nor influence you to alter or change your religious or spiritual beliefs. All statements are designed to empower you, no matter your religious or spiritual beliefs.")
      setModal(true)
    }else if(val==7){
      setText("Unless indicated in the title or description, all the subliminal audios offered are gender-neutral and work regardless of the sexual orientation of the user without having any adverse or unintended effects on the sexuality and sexual orientation of the user.\nFor custom personal projects, we can apply gender-specific wordings in the script to improve the user's experience and results.\nFor family usage custom subliminals, all statements are gender neutral.")
      setModal(true)
    }else if(val==8){
      setText("It is natural as time moves forward that our bodies age and deteriorates thus, our lifespan decreases as well. Therefore, whatever we do naturally decreases our lifespan including listening to subliminals.\nBut if you are using specialized subliminals, like health subliminals or rejuvenating subliminals. Basically, your body is healing and becoming healthier therefore it is possible to increase your lifespan if you listen to Subliminals. By using Ultiliminals and Godliminals, this can be achievable on a certain degree.\nThe Chief Creator’s personal story and example is a living proof that you can achieve “Fountain of Youth” effects while using subliminals.")
      setModal(true)
    }else if(val==0){
      setText("")
      setModal(true)
    }
    spacing1()
  }
  const data1 = [
    {key:'1', value:'How long will it take to see results?'},
    {key:'2', value:'How can I tell if subliminal messages work for me?'},
    {key:'3', value:'Will the subliminal messages work if English is not my native language?'},
    {key:'4', value:'Are the results permanent?'},
    {key:'5', value:'What can I do to have faster results?'},
    {key:'6', value:'What are the best ways to listen to subliminal audios for faster results?'},
    {key:'7', value:'Do the results vary from user to user?'},
    {key:'8', value:'Once I have achieved my goal, do I still need to listen to the subliminal audio?'},
  ]
  const answer1=(val)=>{
    if(val==1){
      setText("With how the Magus Subliminals have progressed in terms of power and technology, noticeable results in terms of state and awareness shifting are manifested almost instantly or within a day given the right conditions. Permanent results and physical changes are expected to manifest within 3 months of listening according to the instructions. For more details and estimations, you can refer with your subliminal audio’s product manual.\nDifferences of results speed\n\u2022 M type – minutes - hours\n\u2022 U type – seconds - minutes\n\u2022 G type – seconds - minutes")
      setModal(true)
    }else if(val==2){
      setText("All Magus Subliminal Audios provides noticeable results and changes for you even if they were happening smoothly and naturally. Your thought patterns are consistently being upgraded and renewed in ways that truly empower you to naturally achieve the changes you desire. However, you also need to be patience and dedicated in the process to achieve permanent and lasting results.")
      setModal(true)
    }else if(val==3){
      setText("All Magus Subliminal Audios works as intended regardless of your language due to our proprietary scripts and technologies. However, having a strong English language fluency will make it easier for the listener to process the messages.\nLinguistics training and guide – All magus subliminal audios for U and G type all have a built-in linguistics training module that can help you comprehend all the scripts easily.")
      setModal(true)
    }else if(val==4){
      setText("All Magus Subliminal Audios provide permanent results due to how we make them. For permanent changes to happen, first, you must internalize the change at the core of your being, resolve all the problems and blockages associated with the change at the root cause level. Second, replace all negative associations with new positive paradigms and associations. Third, provide stability at all levels and realizations to further cement your changes while making it perfectly smooth, natural, and healthy for you. All processes and changes are done automatically through the help of Magus Subliminals, and this is only the tip of the iceberg of what Magus Subliminals can do.")
      setModal(true)
    }else if(val==5){
      setText("Magus Subliminals works to manifest results as intended in a fast and self-adapting manner. That is why it works regardless of your current situation. But to achieve faster results, first, you need to make sure that you use the subliminal audio as instructed. Next, you got to have the right belief and motivation to help yourself achieve what you wish to achieve with the help of the subliminal, no matter what it takes. Lastly, do the things that advance you and avoid doing the things that delay you, block you, or move you away from reaching your desired goal.")
      setModal(true)
    }else if(val==6){
      setText("The following are some of the tips or actionable steps of listening to the subliminal for faster results:\n\u2022 Choose the right equipment – make sure that the speakers or phones that you are using can deliver the sound in an uncompromised way. You can also refer to the Recommended Devices list.\n\u2022 Scheduling your listening time – scheduling your listening time makes your mind adapt to the habit of self-development that you set for yourself.\n\u2022 Goal-setting and prioritization – how do you want the subliminal audio to help you achieve your goal? Tie your general goals and priorities as\n\u2022 Visualization or focusing while listening – refer to your manual if you are suggested or advised to visualize or meditate while listening. Detailed instructions are also presented in your designated manual.")
      setModal(true)
    }else if(val==7){
      setText("The intended results and goals of the subliminal audio are sure to manifest in due time; however, each person is unique and may have different circumstances and experiences. Therefore, there are nuances and variations in how the effects of the subliminal are triggered as well as how the manifestation happens. Other factors include but not limited to user temperament and personality, resources available to the listener, total exposure time to the subliminal audio, and other variables that will be considered.")
      setModal(true)
    }else if(val==8){
      setText("It is optional to listen to the audio once you feel that you have gained the results you want. However, it is strongly suggested to listen continuously to the audio for stronger and lasting changes. Listening to the audio again gives you other benefits that are considered as a bonus due to the supporting modules of the program.")
      setModal(true)
    }else if(val==0){
      setText("")
      setModal(true)
    }
    spacing1()
  }
  const data2 = [
    {key:'1', value:'Is it okay to expose family members without them knowing?'},
  ]
  const answer2=(val)=>{
    if(val==1){
      setText2("Manipulating the free will of others without consent is unethical.\nFirst, you must inform your family members if you want to expose them to the audio for them to benefit from the effects.\nSecond, if you are using Custom Subliminals, Ultiliminals, and Godliminals, their name must be embedded in the audio for them to benefit and not cause violations to anti-piracy and unauthorized usage.")
      setSpace2(15)
    }else if(val==0){
      setText2("")
      setSpace2(-15)
    }
    spacing1()
  }
  const data3 = [
    {key:'1', value:'How should I listen?'},
    {key:'2', value:'Can I listen during sleep?'},
    {key:'3', value:'Can I listen while doing other activities?'},
    {key:'4', value:'Is it okay to meditate while listening to subliminals?'},
    {key:'5', value:'Is it okay to use affirmations while listening to subliminals?'},
    {key:'6', value:'How many audios can I listen at the same time?'},
    {key:'7', value:'How many hours is the recommended listening time?'},
    {key:'8', value:'Do you have any playlist or topic recommendations?'},
  ]
  const answer3=(val)=>{
    if(val==1){
      setText3("There are different options in how you should listen to Magus Subliminals. You can listen to Magus Subliminals while sleeping, meditating, or doing other activities. But it is advised that you should not listen to Magus Subliminals while driving, operating heavy machinery, performing surgery, or doing any critical work that requires your focus, or at least 1 hour before doing the things that aforementioned. For best results, there are specific listening guides and action plans for each subliminals, and they can be found in their respective product pages or instruction guides.")
      setSpace3(15)
    }else if(val==2){
      setText3("See “How should I listen?”")
      setSpace3(15)
    }else if(val==3){
      setText3("See “How should I listen?”")
      setSpace3(15)
    }else if(val==4){
      setText3("See “How should I listen?”")
      setSpace3(15)
    }else if(val==5){
      setText3("It is okay to use affirmations, provided that these affirmations that you recite must be worded properly and aligned to your goal.")
      setSpace3(15)
    }else if(val==6){
      setText3("Due to how Magus Subliminals are built, it is required for you to listen to a single audio for only one at a time and NEVER at the same time. However, you can simply create a playlist and listen to different topics of subliminals of your choosing at your own pace.")
      setSpace3(15)
    }else if(val==7){
      setText3("The recommended listening time depends on the instructions and recommendations from your product manual or guide. As a rule of thumb, you can listen more than the recommended time, but it is not lesser than the recommended time to have consistent usage and faster results.")
      setSpace3(15)
    }else if(val==8){
      setText3("Depending on the goal that you are trying to achieve, we list down different playlists and sequences that can help you achieve your desired results. You can find them in the recommendations section of our website. You can also ask for recommendations from your subliminal coach.")
      setSpace3(15)
    }else if(val==0){
      setText3("")
      setSpace3(-15)
    }
    spacing1()
  }
  const data4 = [
    {key:'1', value:'Do you have suggestions for a sound system setup?'},
    {key:'2', value:'Is it possible to play subliminal audios on a mobile phone?'},
    {key:'3', value:'What are your recommended apps to play subliminals?'},
    {key:'4', value:'What are the requirements for ultrasonic subliminals?'},
    {key:'5', value:'Are headphones required to listen to subliminals?'},
    {key:'6', value:'Do you recommend bone conduction earphones?'},
    {key:'7', value:'Can I burn the subliminal audios to CD?'},
    {key:'8', value:'Can I upload the subliminal audios to a streaming site (YouTube, Spotify, Soundcloud, etc.)?'},
    {key:'9', value:'Can I reupload the subliminal audios to another online storage device for backup?'},
  ]
  const answer4=(val)=>{
    if(val==1){
      setText4("As a requirement for Ultrasonic/ Silent Subliminals, the speaker must be able to deliver sounds up to 20,000 Hz. However, for the optimal listening experience, the recommended speakers are stereo or surround type set-up. Avoid playing Magus Subliminals to a wireless speaker due to potential audio quality loss when playing over a wireless connection.")
      setSpace4(15)
    }else if(val==2){
      setText4("Yes, you can perfectly play Magus Subliminals on your phone. For Wave Audio (.wav) formats, it is recommended that you download an app that can play .wav audio files. Soon, we will be releasing the Magus streaming mobile app that is available on Android and iOS devices.")
      setSpace4(15)
    }else if(val==3){
      setText4("Apps that are compatible to play different kinds of audio formats such as FLAC or WAV format and can deliver audios with high sound quality above 120 kbps are strongly recommended. My personal recommendation is VLC Media Player.")
      setSpace4(15)
    }else if(val==4){
      setText4("As a requirement for Ultrasonic/ Silent Subliminals, the speaker must be able to deliver sounds up to 20,000 Hz. Check the specifications of your listening gear if it fits the criteria.")
      setSpace4(15)
    }else if(val==5){
      setText4("Listening to headset, headphones, or earbuds are optional and up to your preferences. However, you should avoid listening through wireless connection headsets due to potential audio quality loss. To avoid hearing problems or damages, always listen to a low and comfortable volume.")
      setSpace4(15)
    }else if(val==6){
      setText4("Tests and customer feedback show that Magus Subliminals is compatible with most wired bone conduction earphones. However, results are not guaranteed if you are using wireless bone conduction earphones or wireless headsets due to potential quality loss.")
      setSpace4(15)
    }else if(val==7){
      setText4("Magus Subliminals will lose its quality due to a different encoding formats and quality loss when being burned on the CD. Due to this reason, the file is considered corrupted and the audio might not work or deliver results as intended. Therefore, DO NOT burn the subliminal to any CD, DVD, or any recording media.")
      setSpace4(15)
    }else if(val==8){
      setText4("No, and it will automatically be classified as piracy and unauthorized and illegal distribution that automatically triggers the anti-piracy script.")
      setSpace4(15)
    }else if(val==9){
      setText4("You can upload but never grant access to unauthorized people outside the allowable people on the Master List. In case of custom personal and name embedded subliminal, other people can only have the access to the subliminal file except for the creator, magus customer support and affiliates, and you.")
      setSpace4(15)
    }else if(val==0){
      setText4("")
      setSpace4(-15)
    }
    spacing1()
  }
  const data5 = [
    {key:'1', value:'What are the subliminal build formats you offer?'},
    {key:'2', value:'What are the audio formats of your subliminal Audios?'},
    {key:'3', value:'How long is the subliminal audio?'},
    {key:'4', value:'How are subliminal audios delivered?'},
    {key:'5', value:'Do you offer subliminal audios on CD, DVD, or USB?'},
    {key:'6', value:'Do you post the script or affirmation contents? '},
    {key:'7', value:'Do you have suggested affirmations that we can use alongside your products?'},
  ]
  const answer5=(val)=>{
    if(val==1){
      setText5("Build formats are the formatting used to encode the messages in subliminal and how they are presented to the listener.\nCurrently, the subliminal formats that we offer are Pure Track, Masked Track, Silent Track, and Hybrid Track which is the combination of Masked and Silent Track. For custom orders, the subliminal messages can be encoded on the music of your choice. Inside the streaming app, Hybrid and Masked formats are not uploaded since you can listen to Pure and Silent tracks and adjust the respective volumes of each.")
      setSpace5(15)
    }else if(val==2){
      setText5("Audio formats are the file type used when exporting the subliminal audio content. We offer audio formats such as .mp3, FLAC, and .wav audio in some cases.\nIn our subliminal streaming app, subliminal audios are uploaded in .wav format.")
      setSpace5(15)
    }else if(val==3){
      setText5("The length varies depending on the product. Please refer to the respective manual or product information of the subliminal you are using. The audio length and the recommended listening are different and it is specified in your manual.\nThe usual length of the audio is 30 minutes of listening time and the audio has already covered the whole script multiple times.")
      setSpace5(15)
    }else if(val==4){
      setText5("The products are delivered digitally and are only available for download via the online store. For the app, everything is streamed directly to your device. Whenever you make a purchase using your account, the audio is automatically added to your online library.\nCustom Audios are delivered through a specific download link. It will be sent to you by the dedicated staff after uploading. It will also be available on your account via Magus online streaming Web and Mobile apps.")
      setSpace5(15)
    }else if(val==5){
      setText5("We do not offer Magus Subliminals on any form of physical media. It is only available for download at our online store and only available for listening on our App.")
      setSpace5(15)
    }else if(val==6){
      setText5("We do not post affirmations or specific statements due to various reasons. One of them is that it contains highly classified trade secrets of the company. We do, however, list down the detailed features of a given product in its respective product page and instruction manual. We also give out recommended affirmations for you to recite.")
      setSpace5(15)
    }else if(val==7){
      setText5("Yes. You can find general affirmations for manifestation in the Subliminal Guide and Coaching Handbook. The book also teaches you how to create affirmations for yourself.\nWe will post other specific affirmations of your desired topics soon. You can also ask your subliminal coach for affirmations based on your circumstances and situation.")
      setSpace5(15)
    }else if(val==0){
      setText5("")
      setSpace5(-15)
    }
    spacing1()
  }
  useEffect(()=>{
    setModal(false)
    spacing1()

  }, []);
  const spacing1=()=>{
    if(global.value!="MINIMIZE"){
      return 80
    }
    else{
      return 160
    }
  }
  return(
    <ImageBackground source={require('../../assets/me/profilebg.png')} style={{width: width, height: height*2}}>
      <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
          >
          <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, backgroundColor: 'white', opacity: 1}}>
          </View>
          <View style={{backgroundColor: 'white',height: Dimensions.get('window').height, width: Dimensions.get('window').width, flex: 1, marginTop: -height}}>
            <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: 38}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => [setSelected(0), setModal(false)]} style={{width: 40, height: 40}} >
                <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
              </TouchableOpacity>
            </View>
            <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
              <Text style={{  fontSize: scale(21), color: '#0D0D0D', fontWeight: 'bold', }} >{keys}</Text>
            </View>
            <ScrollView style={{marginTop: 20, marginHorizontal: 40}}>
              <Text style={{fontSize: 13, lineHeight: 28, textAlign: 'justify'}}>{text}</Text>
            </ScrollView>

          </View>
          
          
        </Modal>
          <View style={{flexDirection: 'row', ...Platform.select({android: {marginTop: 20}, ios: {marginTop: 38}}), left: 15, right: 15, width: width-30, justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Help")} style={{width: 40, height: 40}} >
            <Image source={require('../../assets/pageback.png')} style={{width: 26, height: 26}} />
          </TouchableOpacity>
        </View>
        <View style={{left: 40, marginTop: 0, right: 20, flexDirection: 'row', justifyContent: 'space-between', width: Dimensions.get('window').width-40}}>
          <Text style={{  fontSize: scale(21), color: '#0D0D0D', fontWeight: 'bold', }} >FAQS</Text>
        </View>
        <ScrollView style={{marginBottom: spacing1()}}>
          <Image source={require('../../assets/me/faqs.png')}  style={{width: scale(230), height: scale(200), alignSelf: 'center',}}/>
          <SelectList 
              search={false}
              setSelected={(val) => answer(val)} 
              data={data} 
              save="key"
              placeholder="Safety Question"
              boxStyles={{marginHorizontal: 20, borderColor: 'rgba(24,119,242,0.8)', marginBottom: 15}}
              dropdownStyles={{marginHorizontal: 20, borderRadius: 0, borderWidth: 0, marginTop:0}}
              maxHeight={180}
              defaultOption={{ key:'0', value:'Safety Question' }}
              dropdownItemStyles={{borderBottomColor: 'rgba(24,119,242,0.6)', borderBottomWidth:1, marginHorizontal: 10}}
          />

          <SelectList 
              setSelected={(val) => answer1(val)} 
              data={data1} 
              save="key"
              placeholder="Questions About Results"
              boxStyles={{marginHorizontal: 20, borderColor: 'rgba(24,119,242,0.8)', marginBottom: 15}}
              dropdownStyles={{marginHorizontal: 20, borderRadius: 0, borderWidth: 0, marginTop:0}}
              maxHeight={180}
              defaultOption={{ key:'0', value:'Questions About Results' }}
              search={false}
              dropdownItemStyles={{borderBottomColor: 'rgba(24,119,242,0.6)', borderBottomWidth:1, marginHorizontal: 10}}
          />
          <SelectList 
              search={false}
              setSelected={(val) => answer2(val)} 
              data={data2} 
              save="key"
              placeholder="Usage Scenario Questions"
              boxStyles={{marginHorizontal: 20, borderColor: 'rgba(24,119,242,0.8)', marginBottom: 15}}
              dropdownStyles={{marginHorizontal: 20, borderRadius: 0, borderWidth: 0, marginTop:0}}
              maxHeight={180}
              defaultOption={{ key:'0', value:'Usage Scenario Questions' }}
              dropdownItemStyles={{borderBottomColor: 'rgba(24,119,242,0.6)', borderBottomWidth:1, marginHorizontal: 10}}
          />
          <SelectList 
              setSelected={(val) => answer3(val)} 
              data={data3} 
              search={false}
              save="key"
              placeholder="Listening Activity Questions"
              boxStyles={{marginHorizontal: 20, borderColor: 'rgba(24,119,242,0.8)', marginBottom: 15}}
              dropdownStyles={{marginHorizontal: 20, borderRadius: 0, borderWidth: 0, marginTop:0}}
              maxHeight={180}
              defaultOption={{ key:'0', value:'Listening Activity Questions' }}
              dropdownItemStyles={{borderBottomColor: 'rgba(24,119,242,0.6)', borderBottomWidth:1, marginHorizontal: 10}}
          />
            <SelectList 
              setSelected={(val) => answer4(val)} 
              data={data4} 
              search={false}
              save="key"
              placeholder="Technical Questions"
              boxStyles={{marginHorizontal: 20, borderColor: 'rgba(24,119,242,0.8)', marginBottom: 15}}
              dropdownStyles={{marginHorizontal: 20, borderRadius: 0, borderWidth: 0, marginTop:0}}
              maxHeight={180}
              defaultOption={{ key:'0', value:'Technical Questions' }}
              dropdownItemStyles={{borderBottomColor: 'rgba(24,119,242,0.6)', borderBottomWidth:1, marginHorizontal: 10}}
          />
          <SelectList 
              setSelected={(val) => answer5(val)} 
              data={data5} 
              search={false}
              save="key"
              placeholder="Audio/Product Related Questions"
              boxStyles={{marginHorizontal: 20, borderColor: 'rgba(24,119,242,0.8)', marginBottom: 15}}
              dropdownStyles={{marginHorizontal: 20, borderRadius: 0, borderWidth: 0, marginTop:0}}
              maxHeight={180}
              defaultOption={{ key:'0', value:'Audio/ Product Related Questions' }}
              dropdownItemStyles={{borderBottomColor: 'rgba(24,119,242,0.6)', borderBottomWidth:1, marginHorizontal: 10}}
          />

        </ScrollView>
    </ImageBackground>
  )
}

export default Faqs;