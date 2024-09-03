import { addNewTask } from "../dataAccess/tasksAccess";

export async function addTaskAction(data) {
    try {
        const response = await addNewTask(data);

        return {
            success: true,
            idTask: response.id,
            message: "Tarefa adicionada com sucesso!",
        };
    } catch (error) {
        return {
            success: false,
            message: `Falha ao adicionar tarefa: ${error.message}!`,
        };
    }
}
