import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [movieName, setMovieName] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState("");

  const fetchMovieData = async () => {
    if (!movieName) {
      setError("Por favor, ingrese el nombre de una película.");
      return;
    }

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?t=${movieName}&apikey=159b00dd`
      );
      const jsonData = await response.json();
      if (jsonData.Response === "False") {
        setError("Película no encontrada");
        setMovieData(null);
      } else {
        setMovieData(jsonData);
        setError("");
      }
    } catch (error) {
      console.error(error);
      setError("Error en la red");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Buscador de Películas </Text>
            <TextInput
              placeholder="Buscar película..."
              value={movieName}
              onChangeText={setMovieName}
              style={styles.input}

            />
            <TouchableOpacity style={styles.button} onPress={fetchMovieData}>
              <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            {movieData && (
              <View style={styles.movieContainer}>
                <Image
                  source={{ uri: movieData.Poster }}
                  style={styles.poster}
                />
                <Text style={styles.movieTitle}>{movieData.Title}</Text>
                <Text style={styles.plot}>{movieData.Plot}</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 20,
  },
  input: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: "100%",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#D9534F",
    marginTop: 8,
    fontSize: 14,
  },
  movieContainer: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    elevation: 4,
  },
  poster: {
    width: 300,
    height: 450,
    resizeMode: "cover",
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
    color: "#333",
  },
  plot: {
    fontSize: 16,
    marginTop: 8,
    textAlign: "center",
    color: "#555",
  },
});
