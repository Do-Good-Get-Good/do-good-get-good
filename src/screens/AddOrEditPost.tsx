import React, { useState } from "react";
import {
  Image,
  SafeAreaView,ScrollView,StyleSheet,Text, TextInput, TouchableOpacity, View
} from "react-native";
import BottomLogo from '../components/BottomLogo';
import Menu from '../components/Menu';
import typography from "../assets/theme/typography";
import colors from "../assets/theme/colors";
import { UserPost } from "../utility/types";
import { LongButton } from "../components/Buttons/LongButton";
import { GoBackButton } from "../components/Buttons/GoBackButton";
import { ChatCardHeader } from "../components/ChartCard/ChatCardHeader";
import { addChatPost } from "../firebase-functions/addTS/add";
import {launchImageLibrary,MediaType} from 'react-native-image-picker';
import { PopUpCustomAlert } from "../components/ChartCard/PopUpChat/PopUpCustomAlert";
import { PopUpPost } from "../components/ChartCard/PopUpChat/PopUpPost";


type Props = {
  route: any;
  navigation: any;
};
type Params = {
  post: UserPost
  toEdit: boolean
}

export const AddOrEditPost = ({route}:Props) => {
  const {post, toEdit  }:Params = route.params;
  const postTime = new Date()
  const [description, setDescription] = useState(post.description);
  const [imageURL, setImageURL]= useState(post.imageURL)

  const [showPublishPopup, setShowPublishPopup] = useState(false);
  const [showExpirePopup, setShowExpirePopup] = useState(false);
  

  const handleButtonPress = () => {
    setShowPublishPopup(true);
  };
  const handlePublishYes = () => {
    setShowPublishPopup(false);
    setShowExpirePopup(true);
  };

  const onSaveButtonPressed = async()=>{

    // setShowPublishPopup(true);
   
   if(toEdit ) {
    console.log('run edit function')
  } else {  
  await  addChatPost({...post, description, imageURL , date: postTime})
  }

  }


  const openImagePicker = () => {
    const options = {
      mediaType:'photo' as MediaType,
    };
    launchImageLibrary(options, response => {
      if(!response.didCancel  && !response.errorMessage )  {
        let imageUri = response.assets?.[0]?.uri;
        setImageURL(imageUri || '')}   
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <Menu/>
      <GoBackButton/>
      <ScrollView>
      <ChatCardHeader post={post} />
      <TouchableOpacity  onPress={ openImagePicker}>
         {imageURL ? (
            <Image source={{ uri: imageURL }} style={styles.selectedImage} />
          ) : (
            <View style={styles.image}>
              <Text style={styles.imageText}>Lägga till bild</Text>
              <Text style={styles.buttonText}>+</Text>
            </View>
          )}
        </TouchableOpacity>
      <View  style={styles.inputContainer}>
        <TextInput
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Skriv dina tankar"
        style={styles.inpuField}
        scrollEnabled={true}/>
      <LongButton
      title="Spara"
      onPress={ ()=> imageURL !== '' && onSaveButtonPressed()}
      style={styles.longButton}/>
      <LongButton
      title="PopUp Test"
      onPress={handleButtonPress}
      style={styles.longButton}/>
      <PopUpCustomAlert
            onBackdropPress={() => setShowPublishPopup(false)}
            message='Vill du publicera det här inlägget i chatten? Alla DGGG-användare kommer att se detta inlägg.'
            onYesPressed={handlePublishYes}
            onNoPressed={() => setShowPublishPopup(false)}
            visible={showPublishPopup} />

      <PopUpPost
            onBackdropPress={() => setShowExpirePopup(false)}
            message='Den här upplevelsen raderas automatiskt efter ett år.'
            visible={showExpirePopup}
            buttonText="Okej"
            onButtonPress={() => setShowExpirePopup(false)} />
    </View>
      <BottomLogo/>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  imageText:{
    ...typography.b2,
    color:colors.secondary,
  },
  buttonText:{
    fontSize: 80,
    color:colors.secondary
  },
  image:{
     marginVertical:20,
     minWidth: 300, 
     minHeight: 250,
     backgroundColor:colors.disabled,
     justifyContent: 'center', 
     alignItems: 'center',
     marginHorizontal:40,
  },
  inputContainer:{
    justifyContent:'space-between',
  },
  inpuField:{
    flex: 1,
    marginVertical:20,
    padding: 10,
    marginBottom: 20,
    ...typography.b1,
    marginHorizontal:40
  },
  longButton:{
    alignSelf: 'stretch',
    marginVertical:10,
    marginHorizontal:30,  
  } ,
  selectedImage: {
    minWidth: 300, 
    minHeight: 250,
    marginVertical: 20,
    alignSelf: 'center',
  }
});

