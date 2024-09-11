import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const addNewTask = async (data) => {
    const { task, priority, effort, uid, createdBy, id } = data;

    try {
        const response = await addDoc(collection(db, "tasks"), {
            task,
            priority,
            effort,
            uid,
            createdBy,
            id,
        });

        return response;
    } catch (error) {
        throw error; // Repassa o erro para o nível superior
    }
}

const getTasks = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        
        const response = querySnapshot.docs.map(doc => ({
            ...doc.data(),
        }));
  
        return response;
    } catch (error) {
        throw error;
    }
};

const getTaskById = async (taskId) => {
    try {
        const q = query(collection(db, "tasks"), where("id", "==", Number(taskId)))

        const querySnapshot = await getDocs(q);

        const response = querySnapshot.docs.map(doc => ({
            ...doc.data(),
        }));

        return response;
    } catch (error) {
        throw error;
    }
}

export { addNewTask, getTasks, getTaskById };
