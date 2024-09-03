import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const Home = ({
  setSession,
}: {
  setSession: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View className="bg-gray-500 h-full flex justify-center items-center">
      <View className=" rounded-md p-5 bg-white">
        <TouchableOpacity
          className="rounded-lg bg-blue-500 text-black"
          onPress={() => setSession(false)}
        >
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
