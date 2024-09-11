import React, { useEffect, useState } from "react";
import SessionContext from "../components/SessionContext";
import { router, Slot } from "expo-router";

const Layout = () => {
  const [session, updateSession] = useState<boolean>(false);

  useEffect(() => {
    const checkSession = () => {
      if (session === false) {
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
