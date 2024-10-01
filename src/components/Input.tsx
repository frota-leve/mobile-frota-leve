import React, { Dispatch, SetStateAction, useState } from "react";
import { TextInput } from "react-native";

const Input = ({
  placeholder,
  text,
  setText,
  secureTextEntry = false,
}: {
  placeholder?: string;
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  secureTextEntry?: boolean;
}) => {
  return (
    <TextInput
      className="bg-white border-slate-300 border-2 w-full h-14 rounded-xl py-2 px-5"
      placeholder={placeholder}
      value={text}
      secureTextEntry={secureTextEntry}
      onChangeText={setText}
    />
  );
};

export default Input;
