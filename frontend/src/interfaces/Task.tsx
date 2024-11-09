export enum ProgressStatus {
    Pendente = "pending",
    EmProgresso = "in_progress",
    Concluido = "done",
}

export interface TodoListInterface {
    id?: string,
    name: string,
    description: string,
    status: ProgressStatus
}