import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import CreateAppointment from "../pages/Appointments/CreateAppointment";
import AppointmentCreated from "../pages/Appointments/AppointmentCreated";

const App = createNativeStackNavigator();

const AppRoutes = () => (
    <App.Navigator
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#252133' },
        }}
    >
        <App.Screen name="Dashboard" component={Dashboard} />
        <App.Screen name="CreateAppointment" component={CreateAppointment} />
        <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

        <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
)

export default AppRoutes;
