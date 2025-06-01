import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ShowListItem = React.memo(({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.showItem}
            onPress={() => onPress(item)} // Call the onPress prop with the item
        >
            {item.image && item.image.medium ? (
                <Image source={{ uri: item.image.medium }} style={styles.thumbnail} />
            ) : (
                <View style={styles.thumbnailPlaceholder}>
                    <Text>No Image</Text>
                </View>
            )}
            <View style={styles.showInfo}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.languageRating}>
                    {item.language} {item.rating && item.rating.average ? `• Rating: ${item.rating.average}` : ''}
                </Text>
            </View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    showItem: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        height: 150,
    },
    thumbnail: {
        width: 100,
        height: 150,
        resizeMode: 'cover',
    },
    thumbnailPlaceholder: {
        width: 100,
        height: 150,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    showInfo: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    languageRating: {
        fontSize: 14,
        color: '#666',
    },
});

export default ShowListItem;