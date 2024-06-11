import { StyleSheet, Text, View } from "react-native"
import { ChatCardHeader } from "../../../components/ChartCard/ChatCardHeader"
import { ChatCardImage } from "../../../components/ChartCard/ChatCardImage"
import { UserPost } from "../../../utility/types"
import { ChatCardDate } from "../../../components/ChartCard/ChatCardDate"
import colors from "../../../assets/theme/colors"
import typography from "../../../assets/theme/typography"

type Props={
    post:UserPost
}

export const ChatCardWithActivity =({post}:Props)=>{
    return <>
    <View style={styles.container}>
        <View style={styles.headerAndDate}>
          <ChatCardHeader post={post} />
          <View>
          <ChatCardDate date={post.date} />
          {post.changed && <Text style={styles.changedText}>ändrats</Text>}
          </View>
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
        marginHorizontal: 10,
      },
      changedText:{
        ...typography.b2,
        textAlign:'right',
        color: colors.secondary
      }
  });
  