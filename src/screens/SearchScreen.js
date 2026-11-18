import { useState } from "react";
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState("");
  const [exercises, setExercises] = useState([]);

  const searchExercises = async () => {
    const response = await fetch(
      "https://wger.de/api/v2/exerciseinfo/?limit=100",
    );
    const json = await response.json();

    const filtered = json.results
      .map((item) => {
        const en = item.translations.find((t) => t.language === 2);
        if (!en) return null;
        return {
          id: item.id,
          name: en.name,
          category: item.category.name,
          description: en.description_source
            ? en.description_source.replace(/\*/g, "")
            : "",
        };
      })
      .filter(
        (item) =>
          item !== null &&
          item.name.toLowerCase().includes(query.toLowerCase()),
      );

    setExercises(filtered);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Search exercises..."
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
      />
      <Button title="Search" onPress={searchExercises} />

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
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
    </View>
  );
}
