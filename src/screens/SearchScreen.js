import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          "https://wger.de/api/v2/exerciseinfo/?limit=500",
        );
        const json = await response.json();

        const cleaned = json.results
          .map((item) => {
            const en = item.translations.find((t) => t.language === 2);
            if (!en || !en.name) return null;
            return {
              id: item.id,
              name: en.name,
              category: item.category?.name || "",
              description: en.description_source
                ? en.description_source.replace(/\*/g, "")
                : "",
            };
          })
          .filter((item) => item !== null);

        setExercises(cleaned);
      } catch (error) {
        Alert.alert("Error", "Could not load exercises.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Search exercises..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />

      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No exercises found.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ paddingVertical: 10 }}
              onPress={() =>
                navigation.navigate("ExerciseDetails", { exercise: item })
              }
            >
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>{item.category}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
