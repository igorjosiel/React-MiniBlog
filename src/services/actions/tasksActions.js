import { addNewTask, getTaskById, getTasks } from "../dataAccess/tasksAccess";

const addTaskAction = async (data) => {
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

const getTasksAction = async () => {
    try {
        const response = await getTasks();

        return {
            success: true,
            message: `Tarefas retornadas com sucesso!`,
            data: response,
        }
    } catch (error) {
        return {
            success: false,
            message: `Falha ao buscar as tarefas: ${error.message}`,
            data: [],
        }
    }
}

const getTaskByIdAction = async (taskId) => {
    try {
        const response = await getTaskById(taskId);

        return {
            success: true,
            message: `Tarefa retornada com sucesso!`,
            data: response[0],
        }
    } catch (error) {
        return {
            success: false,
            message: `Falha ao buscar pela tarefa: ${error.message}`,
            data: null,
        }
    }
}

export { addTaskAction, getTasksAction, getTaskByIdAction }
