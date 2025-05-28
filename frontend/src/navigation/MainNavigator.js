import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";

// Import screens
import HomeScreen from "../screens/home/HomeScreen";
import RestaurantListScreen from "../screens/restaurant/RestaurantListScreen";
import MyReservationsScreen from "../screens/reservation/MyReservationsScreen";
import MyPageScreen from "../screens/profile/MyPageScreen";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Restaurants") {
            iconName = focused ? "restaurant" : "restaurant-outline";
          } else if (route.name === "Reservations") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "MyPage") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.border,
        },
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Restaurants" component={RestaurantListScreen} />
      <Tab.Screen name="Reservations" component={MyReservationsScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
