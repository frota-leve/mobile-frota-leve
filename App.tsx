import { useState } from "react";
import { View } from "react-native";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  const [session, setSession] = useState(false);
  return (
    <View className="w-full h-full bg-yellow-300">
      {session ? (
        <Home setSession={setSession} />
      ) : (
        <Login setSession={setSession} />
      )}
    </View>
  );
}
