import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";

const App = createNativeStackNavigator();

const AppRoutes = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#252133' },
        }}
    >
        <App.Screen name="Dashboard" component={Dashboard} />
    </App.Navigator>
)

export default AppRoutes;
