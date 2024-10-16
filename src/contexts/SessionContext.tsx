import React, {
  createContext,
  useContext,
  useState,
} from "react";

type Session = {
  token: string | null,
  user?: string,
}

type SessionContextType = {
  session: Session;
  updateSession: (token: string | null) => void;
  checkSession: () => boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session>({ token: null })

  const updateSession = (token: string | null) => {
    setSession({ token })
  }

  const checkSession = () => {
    if (!session.token) return false
    return true
  }

  return (
    <SessionContext.Provider value={{ session, updateSession, checkSession }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}

export default SessionProvider;
