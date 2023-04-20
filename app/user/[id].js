import {FlatList, StyleSheet, Text, View} from "react-native";
import {useSearchParams} from "expo-router";
import {useEffect, useState} from "react";
import UserProfileHeader from "../../src/components/UserProfileHeader";
import {Entypo} from '@expo/vector-icons'
import {DataStore} from "aws-amplify";
import {User, Post as PostModel} from "../../src/models";
import Post from "../../src/components/Post";

const ProfilePage = () => {
    const [user, setUser] = useState()
    const [posts, setPosts] = useState([])
    const [isSubscribed, setIsSubscribed] = useState(false)

    const {id} = useSearchParams()

    useEffect(() => {
        DataStore.query(User, id).then(setUser)
        DataStore.query(PostModel, (post) => post.userID.eq(id)).then(setPosts)
    }, [id])

    // const user = users.find((u) => u.id === id)
    if (!user) {
        return <Text>User not found</Text>
    }
    if (!isSubscribed) {
        return (
            <View>
                <UserProfileHeader
                    user={user}
                    isSubscribed={isSubscribed}
                    setIsSubscribed={setIsSubscribed}
                />
                <View style={{backgroundColor: 'gainsboro', alignItems: 'center', padding: 20}}>
                    <Entypo name="lock" size={50} color="gray"/>
                    <Text style={{
                        backgroundColor: 'skyblue',
                        padding: 15,
                        margin: 20,
                        height: 50,
                        borderRadius: 25,
                        overflow: 'hidden',
                        color: 'white',
                    }}>Subscribe to see user's posts</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <FlatList
                data={posts}
                renderItem={({item}) => <Post post={item}/>}
                ListHeaderComponent={() => (
                    <UserProfileHeader
                        user={user}
                        isSubscribed={isSubscribed}
                        setIsSubscribed={setIsSubscribed}
                    />
                )}
            />
        </View>)

}

const styles = StyleSheet.create({})
export default ProfilePage
