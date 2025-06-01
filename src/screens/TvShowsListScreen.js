import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    TextInput,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowsAsync, setSearchQuery } from '../redux/showsSlice';
import ShowListItem from '../components/ShowListItem';
import styles from '../styles/TvShowsListScreenStyles';

const DEBOUNCE_DELAY = 500;

const TvShowsListScreen = ({ navigation }) => {
    const shows = useSelector((state) => state.shows.list);
    const isLoading = useSelector((state) => state.shows.listLoading);
    const error = useSelector((state) => state.shows.listError);
    const searchQuery = useSelector((state) => state.shows.searchQuery);

    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);
    const [localSearchText, setLocalSearchText] = useState(searchQuery);

    const loadShows = useCallback(async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchShowsAsync()).unwrap();
        } catch (err) {
            console.error("Error during show fetch:", err);
        } finally {
            setRefreshing(false);
        }
    }, [dispatch]);

    useEffect(() => {
        if (shows.length === 0 && !isLoading && !error) {
            loadShows();
        }
    }, [loadShows]);

    useFocusEffect(
        useCallback(() => {
            if (shows.length === 0 && !isLoading && !error) {
                loadShows();
            }
        }, [shows, isLoading, error, loadShows])
    );

    const onRefresh = useCallback(() => {
        if (!refreshing) {
            loadShows();
        }
    }, [refreshing, loadShows]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (localSearchText !== searchQuery) {
                dispatch(setSearchQuery(localSearchText));
            }
        }, DEBOUNCE_DELAY);

        return () => {
            clearTimeout(handler);
        };
    }, [localSearchText, dispatch, searchQuery]);

    const filteredShows = useMemo(() => {
        return shows.filter((show) =>
            show.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [shows, searchQuery]);

    const handleItemPress = useCallback((item) => {
        navigation.navigate('TvShowDetail', { showId: item.id, title: item.name });
    }, [navigation]);

    const renderItem = useCallback(({ item }) => (
        <ShowListItem item={item} onPress={handleItemPress} />
    ), [handleItemPress])

    if (isLoading && !refreshing) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading shows...</Text>
            </View>
        );
    }

    if (error && !refreshing) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error: {error}</Text>
                <TouchableOpacity onPress={loadShows}>
                    <Text>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchOuterContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search by show name..."
                    placeholderTextColor="#888"
                    value={localSearchText}
                    onChangeText={setLocalSearchText}
                />
                {localSearchText.length > 0 && (
                    <TouchableOpacity
                        onPress={() => {
                            setLocalSearchText('');
                            dispatch(setSearchQuery(''));
                        }}
                        style={styles.clearButton}>
                        <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>
            <FlatList
                data={filteredShows}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                initialNumToRender={10}
                windowSize={30}
                removeClippedSubviews={true}
                maxToRenderPerBatch={5}
                updateCellsBatchingPeriod={100}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000" />
                }
            />
        </View>
    );
};

export default TvShowsListScreen;