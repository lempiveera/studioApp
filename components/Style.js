import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20,
    },

    listContainer: {
        flex: 4,
        flexDirection: 'row',
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 5,
    },
    text1: {
        color: 'white',
        fontSize: 18,
    },
    text2: {
        color: '#ff00fa',
        fontSize: 16,
    },
    text3: {
        color: 'white',
        fontSize: 30,
    },
    text4: {
        color: 'white',
        fontSize: 25,
    },
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: '#ff00fa',
    },
    button2: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        paddingHorizontal: 7,
        borderRadius: 2,
        elevation: 3,
        backgroundColor: 'black',
        borderColor: '#ff00fa',
        borderWidth: 1,
    },
    mapContainer: {
        height: 400,
        width: 400,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;