import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, ScrollView, Pressable } from 'react-native';

import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, onValue, remove } from 'firebase/database';
import firebaseConfig from './firebaseconfig';

import styles from './Style';

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export default function Downstairs() {

    //okay were gonna do it this way for now, separate component for handling textinput?

    const [who, setWho] = useState('');
    const [here, setHere] = useState([]);

    //saving person to database
    const saveWho = () => {
        push(ref(database, 'inDownstairs/'), {
            'who': who
        });
        setWho('');
    }

    //deleting person from database
    const deleteWho = (who) => {
        const hereRef = ref(database, 'inDownstairs/');

        onValue(hereRef, (snapshot) => {
            snapshot.forEach((childSnap) => {
                if (childSnap.val().who === who) {
                    const deleteRef = ref(database, 'inDownstairs/' + childSnap.key);
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

    //rendering database everytime it changes
    useEffect(() => {
        const hereRef = ref(database, 'inDownstairs')
        onValue(hereRef, (snapshot) => {
            const data = snapshot.val();
            if (data === null) {
                setHere([]);
            } else {
                setHere(Object.values(data));
            }
        })
    }, []);


    return (


        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.text3}>Are you Downstairs? Enter name here</Text>
                    <Text>  </Text>
                    <TextInput
                        value={who}
                        onChangeText={text => setWho(text)}
                        style={{ width: 200, borderColor: 'gray', borderWidth: 1, color: 'white' }}
                    />
                    <Text> </Text>
                    <Pressable style={styles.button1} onPress={saveWho}>
                        <Text style={styles.text1}>add to list</Text>
                    </Pressable>
                </View>
            </ScrollView>
            <FlatList
                data={here}
                renderItem={({ item }) =>
                    <View style={styles.listContainer}>
                        <Text style={styles.text4}>{item.who}</Text>
                        <Text>                </Text>
                        <Pressable style={styles.button2} onPress={() => deleteWho(item.who)}>
                            <Text style={styles.text2}>I went home</Text>
                        </Pressable>
                    </View>}
                keyExtractor={((item, index) => index.toString())}
            />

        </View>
    )
}
