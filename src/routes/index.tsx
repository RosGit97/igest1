import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

import TabRoutes from "./tab.routes";
import StackRoutes from "./stack.routes";

export default function Routes() {

    return (
            <NavigationContainer>
                {/* <TabRoutes /> */}
                <StackRoutes />
            </NavigationContainer>
            
    )
}
