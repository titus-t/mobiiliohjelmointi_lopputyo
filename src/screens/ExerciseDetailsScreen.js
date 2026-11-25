import { addDoc, collection } from "firebase/firestore";
import { Alert, ScrollView, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../firebaseConfig";
export default function ExerciseDetailsScreen({ route }) {
  const { exercise } = route.params;
  const handleAddToRoutine = async () => {
    try {
      await addDoc(collection(db, "routines"), {
        userId: auth.currentUser.uid,
        name: exercise.name,
        category: exercise.category,
      });
      Alert.alert("Added", "Exercise added to your routine.");
    } catch (error) {
      Alert.alert("Error", "Could not save exercise.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>{exercise.name}</Text>
      <Text style={{ fontSize: 16, color: "#666", marginVertical: 10 }}>
        {exercise.category}
      </Text>
      <Text style={{ fontSize: 16, lineHeight: 24 }}>
        {exercise.description || "No description available."}
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: "#007BFF",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
          marginTop: 24,
        }}
        onPress={handleAddToRoutine}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Add to Routine
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
