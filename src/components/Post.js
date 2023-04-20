import {Image, Text, View} from "react-native";
import {Entypo, FontAwesome5} from '@expo/vector-icons';
import {useEffect, useState} from "react";
import {DataStore} from "aws-amplify";
import {User} from "../models";

const Post = ({post}) => {
    const [user, setUser] = useState()

    useEffect(() => {
        DataStore.query(User, post.userID).then(setUser)
    }, [])
    return (
        <View style={{marginVertical: 15,}}>
            <View style={{flexDirection: 'row', alignItems: 'center', padding: 5,}}>
                <Image
                    src={user?.avatar}
                    style={{
                        width: 50,
                        aspectRatio: 1,
                        borderRadius: 50,
                        marginRight: 10,
                    }}/>
                <View>
                    <Text style={{fontWeight: '600', marginBottom: 3, fontSize: 16}}>{user?.name}</Text>
                    <Text style={{color: 'grey'}}>@{user?.handle}</Text>
                </View>
                <View style={{marginLeft: 'auto', flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{marginRight: 5, color: 'grey'}}>3 hours ago</Text>
                    <Entypo name="dots-three-horizontal" size={18} color="grey"/>
                </View>
            </View>

            <Text style={{margin: 10, lineHeight: 18}}>{post.text}</Text>

            {post.image && (
                <Image src={post.image} style={{width: '100%', aspectRatio: 1}}/>
            )}


            <View style={{margin: 10, flexDirection: 'row'}}>
                <Entypo name="heart-outlined" size={22} color="skyblue" style={{marginRight: 15}}/>
                <FontAwesome5 name="dollar-sign" size={20} color="gray" style={{marginRight: 15}}/>
            </View>

            <Text style={{fontWeight: '500', marginHorizontal: 10,}}>{post.likes} Likes</Text>
        </View>
    )
}

export default Post
