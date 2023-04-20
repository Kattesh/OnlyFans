import {FlatList, StyleSheet, View, Text, Pressable} from "react-native";
import UserCard from "../src/components/UserCard";
import {Link} from "expo-router";
import {useAuthenticator} from '@aws-amplify/ui-react-native';
import {useEffect, useState} from "react";
import {DataStore} from "aws-amplify";
import {User} from "../src/models";

export default function Page() {
    const [users, setUsers] = useState([])

    const {signOut} = useAuthenticator();

    useEffect(() => {
        DataStore.query(User).then(setUsers)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.pressable}>
                <Pressable onPress={() => signOut()} style={styles.button}>
                    <Link href={'/newPost'} style={styles.buttonText}>New post</Link>
                </Pressable>

                <Pressable onPress={() => signOut()} style={styles.button}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </Pressable>
            </View>

            <FlatList
                data={users}
                renderItem={({item}) => <UserCard user={item}/>}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: 75,
    },
    pressable: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'gainsboro',
        padding: 15,
        borderRadius: 50,
        marginVertical: 10,
        backgroundColor: 'skyblue',
        width:170,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 20,
    }
});
