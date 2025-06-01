import { StyleSheet, Dimensions, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

const TvShowDetailScreenStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        width,
        height,
        position: 'absolute',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(150,150,150)',
    },
    noImageText: {
        fontSize: 100,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
    },
    overlay: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginVertical: 10,
    },
    summaryContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        width: '100%',
        padding: 15,
        borderRadius: 10,
    },
    summaryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    summaryText: {
        fontSize: 16,
        lineHeight: 22,
        color: '#eee',
        textAlign: 'justify',
        marginBottom: 10,
    },
    detailsText: {
        fontSize: 16,
        color: '#ccc',
        marginTop: 8,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredText: {
        fontSize: 64,
        color: "black",
        textAlign: "center",
        fontWeight: "bold",
    },
    loadingText: {
        fontSize: 24,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});

export default TvShowDetailScreenStyles;