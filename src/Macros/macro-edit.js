import React, {
    useState,
    useEffect,
    useContext,
    useRef,
    useCallback,
} from "react";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";
import MacrosEditOutput from "./macros-edit-output";

const MacroEdit = (props) => {
    const auth = useContext(LoginRegisterContext);
    let macrosToEdit = useRef(null);
    const [macrosToUpdate, setMacrosToUpdate] = useState([macrosToEdit]);
    let editOptions = [];
    let editArray = [];

    const createUpdate = useCallback((newData) => {
        let newMacros = newData.reverse();
        setMacrosToUpdate(newMacros);
        console.log(macrosToUpdate);
    }, []);

    useEffect(() => {
        const fetchMacros = async () => {
            const userID = auth.userID;
            try {
                const response = await fetch(
                    `https://barbell-factor.onrender.com/api/macros/macroslog/${userID}`
                );
                const responseData = await response.json();
                const macros = responseData.macros;
                editOptions = macros.slice(-2);
                editArray.push(editOptions);
                macrosToEdit.current = editOptions;
                console.log(editOptions.map((m) => m.month));
                createUpdate(editArray);
                console.log(editArray);
                console.log(macrosToEdit);
                createUpdate(editOptions);
            } catch (err) {}
        };
        fetchMacros();
    }, []);

    return <MacrosEditOutput updateData={macrosToUpdate} />;
};

export default MacroEdit;
