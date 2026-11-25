import { signOut } from "firebase/auth";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseConfig";

export default function ProfileScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.getParent().replace("Login");
    } catch (error) {
      Alert.alert("Error", "Could not log out.");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 16, color: "#666", textAlign: "center" }}>
        Logged in as
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          textAlign: "center",
          marginTop: 4,
          marginBottom: 24,
        }}
      >
        {auth.currentUser?.email}
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: "#dc3545",
          padding: 15,
          borderRadius: 8,
          alignItems: "center",
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
