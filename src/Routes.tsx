
import { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './views/Home';

const Stack = createNativeStackNavigator();

const makeRoute = (name: string, component: FC) => ({
    name,
    component,
})

const routes: any[] = [
    makeRoute("Home", Home)
]

const Routes = () => {
    return (
        <Stack.Navigator>
            {
                routes.map(({ name, component }, i) =>
                    <Stack.Screen
                        key={i}
                        name={name}
                        component={component}
                    />
                )
            }
        </Stack.Navigator>
    );
}

export default Routes;