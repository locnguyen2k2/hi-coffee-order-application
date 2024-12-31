import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import screens from "../src/screens";

const Tab = createBottomTabNavigator();
export default function BottomTabs () {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={screens.Table} />
            <Tab.Screen name="Profile" component={screens.Profile} />
            {/*<Tab.Screen name="About" component={screens.About} />*/}
        </Tab.Navigator>
    )
}