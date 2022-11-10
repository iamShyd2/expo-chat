
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';
import { IUser } from './models/user';
import Login from './views/login/Login';

const Stack = createNativeStackNavigator();

const makeRoute = (name: string, component: FC) => ({
    name,
    component,
})

const routes: any[] = [
    makeRoute("Login", Login)
]

const authRoutes: any[] = [
    makeRoute("Home", Home)
]

const mapRoutes = (routes: any[]) => routes.map(({ name, component }, i) =>
    <Stack.Screen
        key={i}
        name={name}
        component={component}
    />
)

const Routes: FC<{ currentUser?: IUser }> = ({ currentUser }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            {
                currentUser ?
                    mapRoutes(authRoutes)
                    :
                    mapRoutes(routes)
            }
        </Stack.Navigator>
    );
}

export default Routes;