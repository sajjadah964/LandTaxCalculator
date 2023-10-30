import React from "react";
import NavigationStrings from "../constants/NavigationStrings";
import { Calculator, FirstSchedule, Home, InitialScreen, ItemDetails, Record, SecondRecord, } from "../Screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SecondSchedule from "../Screen/SecondSchedule/SecondSchedule";
const Stack = createNativeStackNavigator();

export default function (Stack) {
    console.log("this is my mainstack file")
    return (
        < >
            <Stack.Screen
                name={NavigationStrings.INITIAL_SCREEN}
                component={InitialScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name={NavigationStrings.HOME}
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.FIRST_SCHEDULE}
                component={FirstSchedule}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.SECOND_SCHEDULE}
                component={SecondSchedule}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name={NavigationStrings.RECORD}
                component={Record}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.SECOND_RECORD}
                component={SecondRecord}
                options={{ headerShown: false }}
            /> */}
        </>
    )

}