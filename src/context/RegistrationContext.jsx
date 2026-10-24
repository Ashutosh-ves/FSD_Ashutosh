import { createContext, useEffect, useState } from "react";

export const RegistrationContext = createContext(null);

function RegistrationProvider({ children }) {
    const [registeredIds, setRegisteredIds] = useState(() => {
        const saved = localStorage.getItem("eventHubRegistrations");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("eventHubRegistrations", JSON.stringify(registeredIds));
    }, [registeredIds]);

    function register(id) {
        setRegisteredIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    }

    function isRegistered(id) {
        return registeredIds.includes(id);
    }

    return (
        <RegistrationContext.Provider value={{ registeredIds, register, isRegistered }}>
            {children}
        </RegistrationContext.Provider>
    );
}

export default RegistrationProvider;