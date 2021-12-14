import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button, ScrollView, Platform, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import getDistance from 'geolib/es/getDistance';


// Show notifications when the app is in the foreground
Notifications.setNotificationHandler({
    handleNotification: async () => {
        return {
            shouldShowAlert: true,
        }
    },
});

export default function Map() {

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

        if(sdistance < 500) {
            triggerSUMUNotification();
        }
    }

    const calculateDistancetoNilsu = () => {
        setnDistance(getDistance(
            { latitude: userLat, longitude: userLong },
            { latitude: nilsuloc.lat, longitude: nilsuloc.long }
        ));
        console.log(ndistance)
        if(ndistance < 500) {
            triggerN10Notification();
        }
    }

    //location permissions
    const getLocationAsync = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to get location')
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }

    /*sets user location when rendering the first time
    useEffect(() => {
        getLocationAsync();
        setUserLat(location.coords.latitude);
        console.log(userLat);
        setUserLong(location.coords.longitude);
        console.log(userLong);
    }, []);
*/

    //checks user loc every 5 mins
    useEffect(() => {
        const timer = setInterval(() => {
            getLocationAsync();
            setUserLat(location.coords.latitude);
            console.log(userLat);
            setUserLong(location.coords.longitude);
            console.log(userLong);
            console.log('should log every 5 mins')
        }, 50000); //if this is like this it will get the location first time only after 5mins but it maybe doesnt matter?
        return () => {
            clearInterval(timer);
        }
    }, [location]);


    //notification permissions
    /* TODO: fix this warning if time : expo-permissions is now deprecated —
    the functionality has been moved to other expo packages that directly use these permissions 
    (e.g. expo-location, expo-camera). The package will be removed in the upcoming releases.
    */

    //Permissions for notifications, dunno i guess it works now but i think i should clean it more
    useEffect(() => {
        // Permission for iOS
        //Permissions.getAsync(Permissions.NOTIFICATIONS)
        Notifications.requestPermissionsAsync()
            .then(statusObj => {
                // Check if we already have permission
                if (statusObj.status !== "granted") {
                    // If permission is not there, ask for the same
                    return Notifications.requestPermissionsAsync()
                }
                return statusObj
            })
            .then(statusObj => {
                // If permission is still not given throw error
                if (statusObj.status !== "granted") {
                    throw new Error("Permission not granted")
                }
            })
            .catch(err => {
                return null
            })
    }, []);

    //trigger notification when under 500m from n10
    const triggerN10Notification = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Hiya!",
                body: "You are in a distance of under 500m from n10",
            },
            trigger: { seconds: 1 },
        })
        console.log('sent notification');
    };
    
    //trigger notification when under 500m from SUMU
    const triggerSUMUNotification = () => {
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Hiya!",
                body: "You are in a distance of under 500m from SUMU",
            },
            trigger: { seconds: 1 },
        })
        console.log('sent notification');
    };

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
