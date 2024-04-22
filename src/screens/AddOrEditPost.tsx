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

  const onSaveButtonPressed = async()=>{
   if(toEdit ) {
    console.log('run edit function')
  } else {
    
  await  addChatPost({...post, description, imageURL , date: postTime})
  }
   

  }

  // const [text, setText] = useState(post.description);
  const [selectedImage, setSelectedImage] = useState('');

  const openImagePicker = () => {
    const options = {
      mediaType:'photo' as MediaType,
    };
  
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled Gallery');
      } else if (response.errorMessage) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        let imageUri = response.assets?.[0]?.uri;
        setSelectedImage(imageUri || '');
        // console.log(imageUri);
      }
    });
  }

  const changeImage = () => {
    setSelectedImage('');
    openImagePicker();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Menu/>
      <GoBackButton/>
      <ScrollView>
      <ChatCardHeader post={post} />
      <TouchableOpacity  onPress={selectedImage ? changeImage : openImagePicker}>
         {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
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
      onPress={()=>onSaveButtonPressed()}
      style={styles.longButton}/>
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

