import { useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext";

function useRegistrations() {
    return useContext(RegistrationContext);
}

export default useRegistrations;