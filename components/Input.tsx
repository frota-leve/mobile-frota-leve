import React, { useState } from "react";
import { TextInput } from "react-native";

const Input = ({ placeholder }: { placeholder: string }) => {
  const [text, setText] = useState("");

  return (
    <TextInput
      className="bg-white rounded-md py-2 px-5"
      placeholder={placeholder}
      value={text}
      onChangeText={setText}
    />
  );
};

export default Input;
