import React, {
    useState,
    useContext,
    useRef,
    useCallback,
    useEffect,
} from "react";
import WorkoutOutput from "./workout-data-output";
import { LoginRegisterContext } from "../login/registration/components/context/login-register-context";

let userID;

const WorkoutEditMode = (props) => {
    const auth = useContext(LoginRegisterContext);
    userID = auth.userID;
    console.log(userID);
    let workoutsToEdit = useRef(null);
    const [uid, setUID] = useState(userID);
    const [workoutsToUpdate, setWorkoutsToUpdate] = useState([
        workoutsToEdit.current,
    ]);
    let editOptions = [];
    let editArray = [];
    let testArray = [];

    const createUpdate = useCallback((newData) => {
        setWorkoutsToUpdate(newData);
        testArray = newData;
        console.log(workoutsToUpdate);
        console.log(testArray);
    }, []);

    useEffect(() => {
        setUID(userID);
        console.log(uid);
    }, [userID]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            const dateEntry = new Date();
            const currentDay = dateEntry.getDate();
            console.log("here in useEffect");
            console.log(currentDay);
            console.log(uid);
            try {
                const response = await fetch(
                    `http://localhost:5000/api/workouts/workoutlog/${userID}`
                );
                const responseData = await response.json();
                const workouts = responseData.workout;
                console.log("here");
                console.log(workouts);
                const getWorkoutsDay = workouts.map(
                    (w) => w.day === currentDay - 2
                );
                console.log(getWorkoutsDay);
                editOptions = workouts.slice(-2);
                editArray.push(editOptions);
                console.log(editArray);
                workoutsToEdit.current = editOptions;
                console.log(editOptions.map((m) => m.month));
                console.log(editArray);
                console.log(workoutsToEdit);
                console.log(editOptions);
                createUpdate(editArray);
            } catch (err) {}
        };
        fetchWorkouts();
    }, []);

    return <WorkoutOutput workoutItems={workoutsToUpdate} />;
};

export default WorkoutEditMode;
