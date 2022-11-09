import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';
import useSnackbar from 'src/components/snackbar/useSnackbar';
import AppContext from 'src/contexts/AppContext';
import useAuthentication from 'src/hooks/useAuthentication';
import Routes from 'src/Routes';

const App = () => {

  const snackbarHook = useSnackbar();

  const authenticationHook = useAuthentication();

  const appContext = {
    ...snackbarHook,
    ...authenticationHook,
  }

  if(authenticationHook.isAuthenticating) return <ActivityIndicator />

  return (
    <AppContext.Provider
      value={appContext}
    >
      <NavigationContainer>
        <Routes
          currentUser={authenticationHook.currentUser}
        />
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;