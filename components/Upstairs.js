import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Pressable } from 'react-native';
import { Button } from 'react-native-elements';

import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database'; //should it be "" dont think so  
import firebaseConfig from './firebaseconfig';

import styles from './Style';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function Upstairs() {

    //okay were gonna do it this way for now, separate component for handling textinput?

    const [who, setWho] = useState('');
    const [here, setHere] = useState([]);

    const saveWho = () => {
        push(ref(database, 'inUpstairs/'), {
            'who': who
        });
        setWho('');
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




    //TODO: think about scrollview shitttt
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text3}>Are you Upstairs? Enter name here</Text>
                    <TextInput
                        value={who}
                        onChangeText={text => setWho(text)}
                        style={{ width: 200, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                    />
                    <Pressable style={styles.button1} onPress={saveWho}>
                        <Text style={styles.text1}>add to list</Text>
                    </Pressable>
                    {/* <Button onPress={saveWho} title="add to list" type='outline' /> */}
                </View>
            </ScrollView>
            <FlatList
                data={here}
                renderItem={({ item }) =>
                    <View style={styles.listContainer}>
                        <Text style={styles.text4}>{item.who}</Text>
                        <Pressable style={styles.button2} onPress={() => deleteWho(item.who)}>
                            <Text style={styles.text2}>I went home</Text>
                        </Pressable>
                        {/* <Button onPress={() => deleteWho(item.who)} title="I went home" type='outline' /> */}
                    </View>}
                keyExtractor={((item, index) => index.toString())}
            />

        </View>
    )
}
//
//<Button onPress={() => setHere([...here, { key: `${who}` }])} title="add to list" />

