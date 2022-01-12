import React, { createContext, useContext, useState } from 'react';
//ten plik zawiera wszystkie definiuje globalne (Hooks useContext)

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile, setProfile] = useState({});

    const [isChosen, setIsChosen] = useState(false);
    const [isPlantChosen, setIsPlantChosen] = useState(false);
    
    const [idSpecies, setIdSpecies] = useState();
    const [plantId, setPlantId] = useState();
    const [sensorId, setSensorId] = useState();

    const [initial, setInitial] = useState("notificationscreen");
    const [startDate, setStartDate] = useState(null);
    const [startDateGlobal, setStartDateGlobal] = useState();

    return (
        <LoginContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, profile, setProfile,
                isChosen, setIsChosen, idSpecies, setIdSpecies, initial, setInitial,
            plantId, setPlantId, isPlantChosen, setIsPlantChosen, startDate, setStartDate,
            startDateGlobal, setStartDateGlobal, sensorId, setSensorId
        }}
        >
            {children}
        </LoginContext.Provider>
        
    );
};

export const useLogin = () => useContext(LoginContext);
export const useId = () => useContext(LoginContext);
export const useDate = () => useContext(LoginContext);
export const useDateGlobal = () => useContext(LoginContext);
export const useInitial = () => useContext(LoginContext);

export default LoginProvider;
