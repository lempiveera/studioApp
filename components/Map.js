import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Alert, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import getDistance from 'geolib/es/getDistance';    

import styles from './Style';

import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';


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
        setsDistance(getDistance(
            { latitude: userLat, longitude: userLong },
            { latitude: sumuloc.lat, longitude: sumuloc.long }
        ));
    }

    const calculateDistancetoNilsu = () => {
        setnDistance(getDistance(
            { latitude: userLat, longitude: userLong },
            { latitude: nilsuloc.lat, longitude: nilsuloc.long }
        ));
    }

    // Checks location permissions and renders location when opening app the first time, logs zeros though?
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('No permission to get location')
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setUserLat(location.coords.latitude);
            setUserLong(location.coords.longitude);
            console.log(userLong + " first render " + userLat);
        })();
    }, []);

    // for getting location 
    const getLocation = async () => {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setUserLat(location.coords.latitude);
        setUserLong(location.coords.longitude);
        //console.log(userLat + " " + userLong);
    }

    // cheking user location every minute, and sending notification if user close enough to a location.
    useEffect(() => {
        const timer = setInterval(() => {
            getLocation();
            console.log(userLat + " every min render " + userLong);
            calculateDistancetoNilsu();
            calculateDistancetoSumu();
            if (ndistance <= 500) {
                triggerN10Notification();
            }
            if (sdistance <= 500) {
                triggerSUMUNotification();
            }
        }, 10000);
        return () => {
            clearInterval(timer);
        };
    }, [location]);


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

    //triggers n10 notification
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

    //trigger sumu notification
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
                    userInterfaceStyle={'dark'}
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
                    <Text> </Text>
                    <Pressable style={styles.button2} onPress={calculateDistancetoSumu}>
                        <Text style={styles.text2}>calculate distance to Sumu</Text>
                    </Pressable>
                    <Text style={styles.text1}>Device distance to sumu {sdistance}m</Text>
                    <Pressable style={styles.button2} onPress={calculateDistancetoNilsu}>
                        <Text style={styles.text2}>calculate distance to N10</Text>
                    </Pressable>
                    <Text style={styles.text1}>Device distance to N10 {ndistance}m</Text>
                </View>
            </View>
        </ScrollView>
    )
}
