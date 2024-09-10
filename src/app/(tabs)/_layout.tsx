import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: () => {
            return <Text>Home</Text>;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => {
            return <Text>Profile</Text>;
          },
        }}
      />
    </Tabs>
  );
}
