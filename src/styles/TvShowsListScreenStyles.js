import { StyleSheet } from 'react-native';


const TvShowsListScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0', // Default background, adjust as needed
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    searchOuterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        height: 50,
    },
    searchBar: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    listContainer: {
        padding: 10,
        paddingBottom: 100,
    },
    clearButton: {
        paddingHorizontal: 15,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
});

export default TvShowsListScreenStyles;