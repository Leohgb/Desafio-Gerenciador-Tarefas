import { useState, useEffect, FormEvent } from "react";
import * as api from "../services/apiTasks";
import { ProgressStatus, TodoListInterface } from "../interfaces/Task";

const useTasks = () => {
    const [tasks, setTasks] = useState<TodoListInterface[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [openGetModal, setOpenGetModal] = useState(false);
    const [openPatchModal, setOpenPatchModal] = useState(false);
    const [currentTask, setCurrentTask] = useState<TodoListInterface | null>(null);
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<ProgressStatus>(ProgressStatus.Pendente);
    const [filterStatus, setFilterStatus] = useState<ProgressStatus | "all">("all");
    const [fieldToEdit, setFieldToEdit] = useState<string | null>(null);
    const [fieldValue, setFieldValue] = useState<string | ProgressStatus>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const newTask: TodoListInterface = { name, description, status };

        try {
            const response = await api.addTask(newTask);
            if (response.ok) {
                await getTasks("all");
                setName("");
                setDescription("");
                setStatus(ProgressStatus.Pendente);
                setOpenModal(false);
            } else {
                console.error("Erro ao adicionar a tarefa");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const handlePut = async (id: string, e: FormEvent) => {
        e.preventDefault();
        const updatedTask: TodoListInterface = { name, description, status };

        try {
            const response = await api.updateTask(id, updatedTask);
            if (response.ok) {
                const updated = await response.json();
                setTasks((prevTasks) =>
                    prevTasks.map((task) => (task.id === id ? updated : task))
                );
                if (openUpdateModal) {
                    setOpenUpdateModal(true);
                } else if (!openUpdateModal) {
                    setOpenUpdateModal(false);
                }
                setOpenUpdateModal(false);
                await getTasks("all");

            }
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
        }
    };

    const handlePatchField = async (id: string, field: string, value: string) => {
        try {
            const response = await api.patchTaskField(id, field, value);
            if (response.ok) {
                const updatedTask = await response.json();
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === id ? { ...task, [field]: updatedTask[field] } : task
                    )
                );
                if (!openUpdateModal) {
                    setOpenUpdateModal(false);
                    setOpenGetModal(false);
                } else if (openUpdateModal) {
                    setOpenUpdateModal(true);
                    setOpenUpdateModal(true)
                }

                await getTasks("all");
            } else {
                setOpenUpdateModal(false);
                setOpenGetModal(false);
                console.error("Erro ao atualizar o campo da tarefa");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await api.deleteTask(id);
            if (response.ok) {
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
                await getTasks("all");
            } else {
                console.error("Erro ao deletar a tarefa");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    };

    const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value as ProgressStatus | "all");
    };

    const getTasks = async (filter: ProgressStatus | "all") => {
        try {
            const tasks = await api.fetchTasks(filter);
            setTasks(tasks);
        } catch (error) {
            console.error("Erro ao carregar as tarefas:", error);
        }
    };
    const getTask = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8080/v1/tarefas/${id}`);
            const taskData = await response.json();
            console.log("Dados da tarefa recebidos:", taskData);
            setCurrentTask(taskData.data);
        } catch (error) {
            console.error("Erro ao buscar a tarefa:", error);
        }
    };

    const handleTaskClick = async (id: string) => {
        const task = tasks.find((task) => task.id === id);
        if (task) {
            await getTask(id);
            setCurrentTask(task);
            setOpenGetModal(true);
        }
    };

    const onPut = (task: TodoListInterface) => {
        setCurrentTask(task);
        setName(task.name);
        setDescription(task.description);
        setStatus(task.status);
        setOpenUpdateModal(true);
    };

    const openPatch = (field: string, value: string) => {
        setFieldToEdit(field);
        setFieldValue(value);
        setOpenPatchModal(true); // Apenas abre o modal de patch
        setOpenUpdateModal(false); // Garante que o modal de atualização completa esteja fechado
    };

    useEffect(() => {
        getTasks(filterStatus);
    }, [filterStatus]);

    return {
        tasks,
        openModal,
        openUpdateModal,
        openGetModal,
        openPatchModal,
        currentTask,
        name,
        description,
        status,
        filterStatus,
        fieldToEdit,
        fieldValue,
        setOpenModal,
        setOpenUpdateModal,
        setOpenGetModal,
        setOpenPatchModal,
        setCurrentTask,
        setName,
        setDescription,
        setStatus,
        setFieldToEdit,
        setFieldValue,
        handleSubmit,
        handlePut,
        handlePatchField,
        handleDelete,
        handleStatusFilterChange,
        getTasks,
        handleTaskClick,
        onPut,
        openPatch
    };
};

export default useTasks;
