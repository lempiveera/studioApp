import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SwipeView from 'react-native-swipeview';

export default function Downstairs() {

    //okay were gonna do it this way for now, separate component for handling textinput?

    const [who, setWho] = useState('');
    const [here, setHere] = useState([]);

    deleteItemById = key => {
        const deleteData = this.state.here.filter(item => item.key !== key);
        this.setState({ here: deleteData });
    }

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
                <Button onPress={() => setHere([...here, { key: `${who}` }])} title="add to list" />
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={here}
                    renderItem={({ item }) => <Text style={{ fontSize: 18 }}>{item.key}</Text>}
                    keyExtractor={((item, index) => index.toString())}
                />
            </View>
        </View>

    )
}

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
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    listContainer2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
});
