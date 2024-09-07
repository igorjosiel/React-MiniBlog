import { addNewTask } from "../dataAccess/tasksAccess";

export async function addTaskAction(data) {
    const { task, priority, effort, uid, createdBy, id } = data;

    if (!task || !priority || !effort || !uid || !createdBy || !id) {
        return {
            success: false,
            message: "Todos os campos são obrigatórios!",
        };
    }

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
