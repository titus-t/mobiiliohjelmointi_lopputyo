import { ScrollView, Text } from "react-native";

export default function ExerciseDetailsScreen({ route }) {
  const { exercise } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{exercise.name}</Text>
      <Text style={{ fontSize: 16, marginVertical: 10 }}>
        {exercise.category}
      </Text>
      <Text>{exercise.description || "No description available."}</Text>
    </ScrollView>
  );
}
