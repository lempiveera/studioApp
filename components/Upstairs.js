import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database'; //should it be "" dont think so  
import firebaseConfig from './firebaseconfig';


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Upstairs() {

    //okay were gonna do it this way for now, separate component for handling textinput?

    const [who, setWho] = useState('');
    const [space, setSpace] = useState('');
    const [here, setHere] = useState([]);

    const saveWho = () => {
        push(ref(database, 'inUpstairs/'), {
            'who': who
        });
    }

    const deleteWho = (who) => {
        const hereRef = ref(database, 'inUpstairs/');
        
        onValue(hereRef, (snapshot) => {
            snapshot.forEach((childSnap) => {
                if (childSnap.val().who === who) {
                    const deleteRef = ref(database, 'inUpstairs/' + childSnap.key);
                    console.log(deleteRef);
                    remove(deleteRef)
                        .then(function () {
                            console.log("Remove succeeded.")
                        })
                        .catch(function (error) {
                            console.log("Remove failed: " + error.message)
                        });

                }
            })
        })
    }

    //This breaks if theres nothing in the database, should it be initialized somehow?
    useEffect(() => {
        const hereRef = ref(database, 'inUpstairs/')
        onValue(hereRef, (snapshot) => {
            const data = snapshot.val();
            //console.log(Object.keys(data))
            //console.log(data);
            setHere(Object.values(data));
        })
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    value={who}
                    onChangeText={text => setWho(text)}
                    style={{ width: 200, borderColor: 'gray', borderWidth: 1 }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={saveWho} title="add to list" />
            </View>

            <FlatList
                data={here}
                renderItem={({ item }) =>
                    <View style={styles.listContainer}>
                        <Text style={{ fontSize: 18 }}>{item.who}</Text>
                        <Button onPress={() => deleteWho(item.who)} title="done" />
                    </View>}
                keyExtractor={((item, index) => index.toString())}
            />

        </View>

    )
}
//
//<Button onPress={() => setHere([...here, { key: `${who}` }])} title="add to list" />

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
