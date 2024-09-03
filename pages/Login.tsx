import React, { Dispatch, SetStateAction } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import Input from "../components/Input";

const Login = ({
  setSession,
}: {
  setSession: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <View className="bg-blue-500 h-full flex justify-center items-center">
      <View className="flex gap-4 rounded-md p-5 bg-black">
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <TouchableOpacity
          className="rounded-lg bg-red-500 text-black"
          onPress={() => setSession(true)}
        >
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
