import React, { useEffect, useState } from "react";
import SessionContext from "../components/SessionContext";
import { router, Slot } from "expo-router";

const Layout = () => {
  const [session, updateSession] = useState<string>("");

  useEffect(() => {
    const checkSession = () => {
      if (session === "") {
        router.push("/login");
      }
    };

    checkSession();
  }, [session]);

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      <Slot />
    </SessionContext.Provider>
  );
};

export default Layout;
