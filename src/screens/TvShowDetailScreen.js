import { useEffect } from "react";
import {
    View,
    Text,
    Image,
    ActivityIndicator,
    StatusBar,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowDetailsAsync } from '../redux/showsSlice';
import style from '../styles/TvShowDetailScreenStyles';

const TvShowDetailScreen = ({ route, navigation }) => {
    const { showId, title: initialTitle } = route.params;

    const showDetails = useSelector((state) => state.shows.details);
    const isLoading = useSelector((state) => state.shows.detailsLoading);
    const error = useSelector((state) => state.shows.detailsError);

    const dispatch = useDispatch();

    useEffect(() => {
        if (showDetails?.id === showId && showDetails?.name) {
            navigation.setOptions({ title: showDetails.name });
        } else if (initialTitle) {
            navigation.setOptions({ title: initialTitle });
        }
    }, [showDetails, initialTitle, navigation, showId]);

    useEffect(() => {
        dispatch(fetchShowDetailsAsync(showId));
    }, [showId, dispatch]);

    const isActuallyLoading = isLoading || (!showDetails && !error);

    if (isActuallyLoading) {
        return (
            <View style={style.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={[style.centeredText, style.loadingText]}>Loading Tv Show details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={style.centered}>
                <Text style={[style.centeredText, style.errorText]}>Error: {error}</Text>
            </View>
        );
    }

    if (!showDetails) {
        return (
            <View style={style.centered}>
                <Text style={style.centeredText}>Show details not found.</Text>
            </View>
        );
    }

    return (
        <View style={style.screen}>
            <StatusBar translucent backgroundColor="transparent" />
            {showDetails.image ? (
                <Image
                    source={{ uri: showDetails.image.original || showDetails.image.medium }}
                    style={style.backgroundImage}
                    blurRadius={1}
                />)
                :
                (<View style={style.backgroundImage}>
                    <Text style={style.noImageText}>Image not found.</Text>
                </View>)
            }

            <View style={style.overlay}>

                <View style={style.summaryContainer}>
                    <Text style={style.title}>{showDetails.name}</Text>
                    <Text style={style.summaryTitle}>Summary:</Text>
                    <Text style={style.summaryText}>
                        {showDetails.summary?.replace(/<[^>]+>/g, '')}
                    </Text>

                    {showDetails.rating?.average && (
                        <Text style={style.detailsText}>Rating: {showDetails.rating.average}</Text>
                    )}
                    {showDetails.genres?.length > 0 && (
                        <Text style={style.detailsText}>Genres: {showDetails.genres.join(', ')}</Text>
                    )}
                    {showDetails.language && (
                        <Text style={style.detailsText}>Language: {showDetails.language}</Text>
                    )}
                </View>

            </View>
        </View>
    );
};

export default TvShowDetailScreen;