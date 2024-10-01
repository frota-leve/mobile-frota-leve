import React, {
  createContext,
  useContext,
  useState,
} from "react";

export type Session = {
  token: string | null
}

export type SessionContextType = {
  session: Session;
  updateSession: (token: string | null) => void;
}

const SessionContext = createContext<SessionContextType | undefined> (undefined)

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}
  
export const SessionProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [session, setSession] = useState<Session>({token: null})

    const updateSession = (token: string | null) => {
      console.log('token ', token)
      setSession({token})
    }

    return (
      <SessionContext.Provider value={{session, updateSession}}>
        {children}
      </SessionContext.Provider>
    )
}  

export default SessionContext;
