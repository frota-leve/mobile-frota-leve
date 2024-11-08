// RaceContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface RaceContextType {
    raceId: string | null;
    setRaceId: (id: string) => void;
    clearRaceId: () => void;
}

// Create context with default values
const RaceContext = createContext<RaceContextType | undefined>(undefined);

// Provider component
export const RaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [raceId, setRaceIdState] = useState<string | null>(null);

    // Set and clear methods
    const setRaceId = (id: string) => setRaceIdState(id);
    const clearRaceId = () => setRaceIdState(null);

    return (
        <RaceContext.Provider value={{ raceId, setRaceId, clearRaceId }}>
            {children}
        </RaceContext.Provider>
    );
};

// Hook to use race context
export const useRace = (): RaceContextType => {
    const context = useContext(RaceContext);
    if (!context) {
        throw new Error("useRace must be used within a RaceProvider");
    }
    return context;
};
