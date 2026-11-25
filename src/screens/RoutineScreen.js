import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";

export default function RoutineScreen() {
  const [routine, setRoutine] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "routines"),
      where("userId", "==", auth.currentUser.uid),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRoutine(items);
    });

    return () => unsubscribe();
  }, []);
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "routines", id));
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      Alert.alert("Error", "Could not remove exercise.");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={routine}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text>No exercises yet.</Text>}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#eee",
            }}
          >
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ color: "#666", marginTop: 2 }}>
                {item.category}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ color: "#dc3545", fontWeight: "bold" }}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
