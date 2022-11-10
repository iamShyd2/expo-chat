import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import Snackbar from 'src/components/snackbar/Snackbar';
import useSnackbar from 'src/components/snackbar/useSnackbar';
import AppContext from 'src/contexts/AppContext';
import useAuthentication from 'src/hooks/useAuthentication';
import Routes from 'src/Routes';
import useFonts from 'src/hooks/useFonts';
import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const App = () => {

  const snackbarHook = useSnackbar();

  const authenticationHook = useAuthentication();

  const appContext = {
    ...snackbarHook,
    ...authenticationHook,
  }

  const [isReady, setIsReady] = useState(false);

  const loadFonts = async () => {
    await useFonts();
    setIsReady(true);
  };


  useEffect(() => {
    loadFonts()
  }, []);


  if (!isReady) return null;

  if (authenticationHook.isAuthenticating) return <ActivityIndicator />

  return (
    <AppContext.Provider
      value={appContext}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <NavigationContainer>
          <Routes
            currentUser={authenticationHook.currentUser}
          />
        </NavigationContainer>
      </SafeAreaView>
      <Snackbar
        message={snackbarHook.message}
        handleDismissSnackBar={snackbarHook.onHideSnackbar}
      />
    </AppContext.Provider>
  );
}

export default App;