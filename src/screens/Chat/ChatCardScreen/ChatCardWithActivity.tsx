import { StyleSheet, View } from "react-native"
import { ChatCardHeader } from "../../../components/ChartCard/ChatCardHeader"
import { ChatCardImage } from "../../../components/ChartCard/ChatCardImage"
import { UserPost } from "../../../utility/types"
import { ChatCardDate } from "../../../components/ChartCard/ChatCardDate"

type Props={
    post:UserPost
}

export const ChatCardWithActivity =({post}:Props)=>{
    return <>
    <View style={styles.container}>
        <View style={styles.headerAndDate}>
          <ChatCardHeader post={post} />
          <ChatCardDate date={post.date} />
        </View>
        <ChatCardImage imageUrl={post?.imageURL ?? ''} />
    </View></>
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
      },
      headerAndDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
  });
  