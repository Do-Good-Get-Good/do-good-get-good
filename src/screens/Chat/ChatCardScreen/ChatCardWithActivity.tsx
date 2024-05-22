import { View } from "react-native"
import { ChatCardHeader } from "../../../components/ChartCard/ChatCardHeader"
import { ChatCardDate } from "../../../components/ChartCard/ChatCardDate"
import { ChatCardImage } from "../../../components/ChartCard/ChatCardImage"
import { UserPost } from "../../../utility/types"

type Props={
    post:UserPost
}

export const ChatCardWithActivity =({post}:Props)=>{
    return <>
    <View>
    <ChatCardHeader post={post} />
    <ChatCardImage imageUrl={post?.imageURL ?? ''}/>
    </View></>
}