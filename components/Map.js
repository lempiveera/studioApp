import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button, ScrollView, Platform, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import getDistance from 'geolib/es/getDistance';
import { Permission, Notifications } from 'expo';

export default function Map() {

    //okay were gonna do it this way for now, separate component for handling textinput?
    const [location, setLocation] = useState(null);
    const [userLat, setUserLat] = useState(0.0);
    const [userLong, setUserLong] = useState(0.0);
    const [sdistance, setsDistance] = useState(0);
    const [ndistance, setnDistance] = useState(0);
    const sumuloc = { lat: 60.18007698591917, long: 24.96021860008109 };
    const nilsuloc = { lat: 60.19490470333913, long: 24.9513989847402 };

    //doing two of these one for sumu one for nilsu, can probably do it better..
    const calculateDistancetoSumu = () => {
        getLocationAsync();
        setsDistance(getDistance(
            { latitude: userLat, longitude: userLong },
            { latitude: sumuloc.lat, longitude: sumuloc.long }
        ));
        console.log(sdistance)
    }

    const calculateDistancetoNilsu = () => {
        setnDistance(getDistance(
            { latitude: userLat, longitude: userLong },
            { latitude: nilsuloc.lat, longitude: nilsuloc.long }
        ));
        console.log(ndistance)
    }

    const getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to get location')
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    //calculates user location every 2mins
    useEffect(() => {
        const timer = setInterval(() => {
            getLocationAsync();
            setUserLat(location.coords.latitude);
            console.log(userLat);
            setUserLong(location.coords.longitude);
            console.log(userLong);
            console.log('should log every 5 mins')
        }, 50000);
        return () => {
            clearInterval(timer);
        }
    }, [location]);

    //    const componentDidMount = () => {
    //        if (Platform.OS === 'android' && !CONSTANTS.isDevice) {
    //            Alert.alert('Only works with android!');
    //        } else {
    //            setInterval(getLocationAsync.bind(), 2000);
    //            console.log('should log every two seconds')
    //            console.log(location);
    //    }
    //    };

    //might have to edit this so location things arent tied to rendering
    /*    useEffect(() => {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('No permission to get location')
                    return;
                }
    
                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                console.log(location);
                setUserLat(location.coords.latitude);
                setUserLong(location.coords.longitude);
                console.log(userLat);
                console.log(userLong); //these log 0 or the real numbers? i think cause the async func it hasnt had the time to put real values yet
            })();
        }, []);
    */

    registerForPushNotificationsAsync = async () => {

        //checks what the current state of the permissions is
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        //if not granted it will ask the user to allow notifications
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        //if user denies permissions the function will end
        if (finalStatus !== 'granted') {
            return;
        }

        //if user gives permissions we save it to a token (or something like that)
        let token = await Notifications.getExpoPushTokenAsync();
    }



    return (
        <ScrollView>
            <View style={styles.container}>
                <MapView
                    style={styles.mapContainer}
                    region={{
                        latitude: userLat,
                        longitude: userLong,
                        latitudeDelta: 0.0052,
                        longitudeDelta: 0.0041,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: userLat,
                            longitude: userLong
                        }}
                        title='meikä' />
                </MapView>
                <View style={styles.buttonContainer}>
                    <Button onPress={calculateDistancetoSumu} title="calculate distance to sumu" />
                    <Text>Device distance to sumu {sdistance}m</Text>
                    <Button onPress={calculateDistancetoNilsu} title="calculate distance to N10" />
                    <Text>Device distance to N10 {ndistance}m</Text>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapContainer: {
        height: 400,
        width: 400,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});