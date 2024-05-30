import { StyleSheet, View } from "react-native"
import { ChatCardHeader } from "../../../components/ChartCard/ChatCardHeader"
import { ChatCardImage } from "../../../components/ChartCard/ChatCardImage"
import { UserPost } from "../../../utility/types"
import { ChatCardDate } from "../../../components/ChartCard/ChatCardDate"
import colors from "../../../assets/theme/colors"

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
        marginHorizontal: 10,
        backgroundColor:colors.background
      },
      headerAndDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
      },
  });
  