import { collection, addDoc } from "firebase/firestore";
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

export { addNewTask };
