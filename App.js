import 'react-native-url-polyfill/auto';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Linking, ActivityIndicator, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import TvShowsListScreen from './src/screens/TvShowsListScreen';
import TvShowDetailScreen from './src/screens/TvShowDetailScreen';

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ['myapp://'],
  config: {
    screens: {
      TvShowList: '',
      TvShowDetail: 'show/:showId',
    },
  },
};

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [isReady, setIsReady] = useState(false);
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      const url = await Linking.getInitialURL();
      console.log('Initial URL:', url);
      setInitialUrl(url);
      setIsReady(true);
    };
    prepare();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Loading app...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer
          ref={navigationRef}
          linking={linking}
          onReady={() => {
            if (initialUrl && initialUrl.includes('show/')) {
              const showId = initialUrl.split('show/')[1];
              if (showId) {
                navigationRef.reset({
                  index: 1,
                  routes: [
                    { name: 'TvShowList' },
                    { name: 'TvShowDetail', params: { showId: parseInt(showId, 10) } },
                  ],
                });
              }
            }
          }}
        >
          <Stack.Navigator>
            <Stack.Screen
              name="TvShowList"
              component={TvShowsListScreen}
              options={{ title: 'TV Shows Explorer' }}
            />
            <Stack.Screen
              name="TvShowDetail"
              component={TvShowDetailScreen}
              options={({ route }) => ({
                title: route.params?.title || 'TV Show Detail',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
