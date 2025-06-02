import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import Button from "../../components/common/Button";

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Welcome to Restaurant Reservation
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Find and book your favorite restaurants
        </Text>

        <View style={styles.buttonContainer}>
          <Button
            title="Find Restaurants"
            onPress={() => navigation.navigate("Restaurants")}
            style={styles.button}
          />
          <Button
            title="My Reservations"
            onPress={() => navigation.navigate("Reservations")}
            variant="secondary"
            style={styles.button}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    width: "100%",
    marginBottom: 16,
  },
});

export default HomeScreen;
