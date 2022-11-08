import { NavigationContainer } from '@react-navigation/native';
import useSnackbar from 'src/components/snackbar/useSnackbar';
import AppContext from 'src/contexts/AppContext';
import Routes from 'src/Routes';

const App = () => {

  const snackbarHook = useSnackbar();

  const appContext = {
    ...snackbarHook,
  }

  return (
    <AppContext.Provider
      value={appContext}
    >
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AppContext.Provider>
  );
}

export default App;