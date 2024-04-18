import React, { useState } from "react";
import {
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

type Props = {
  route: any;
  navigation: any;
};
type Params = {
  post: UserPost
  toEdit: boolean
}

export const AddOrEditPost = ({route,navigation}:Props) => {
    const {post, toEdit  }:Params = route.params;
  const [text, setText] = useState(post.description);
  
  return (
    <SafeAreaView style={styles.container}>
      <Menu/>
      <GoBackButton/>
      <ScrollView>
      <ChatCardHeader post={post} />
      <TouchableOpacity onPress={()=>{}}>
          <View style={styles.image}>
            <Text style={styles.imageText}>Lägga till bild</Text>
            <Text  style={styles.buttonText }>+</Text>
          </View>
        </TouchableOpacity>
      <View  style={styles.inputContainer}>
        <TextInput
        multiline
        value={text}
        onChangeText={setText}
        placeholder="Skriv dina tankar"
        style={styles.inpuField}
        scrollEnabled={true}/>
      <LongButton
      title="Spara"
      onPress={()=>{}}
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
  } 
});

