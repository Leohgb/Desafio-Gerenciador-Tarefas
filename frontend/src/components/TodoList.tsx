import React from "react";
import TasksCards from "./taskCard/tasksCards";
import Modal from "./modal/modal";
import { ProgressStatus } from "../interfaces/Task";
import './TodoList.css'
import { FaEdit } from "react-icons/fa";
import useTasks from "../services/useTasks";

function TodoList() {
  const {
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
    setName,
    setDescription,
    setStatus,
    setFieldValue,
    handleSubmit,
    handlePut,
    handlePatchField,
    handleDelete,
    handleStatusFilterChange,
    handleTaskClick,
    onPut,
    openPatch
  } = useTasks();

  return (
    <div className="tasks-list">
      <button className="button-add" onClick={() => setOpenModal(true)}>Adicionar tarefa</button>
      <div className="statusFilter">
        <label htmlFor="statusFilter">Filtrar por Status:</label>
        <select id="statusFilter" value={filterStatus} onChange={handleStatusFilterChange}>
          <option value="all">Todas</option>
          <option value="pending">Pendente</option>
          <option value="in_progress">Em Progresso</option>
          <option value="done">Concluído</option>
        </select>
      </div>

      <div className="task-container">
        {tasks.some((task) => task.status === ProgressStatus.Pendente || filterStatus === "all") && (
          <div className="task-div" id="pendente">
            <h3>Pendente</h3>
            {tasks
              .filter((task) => task.status === ProgressStatus.Pendente)
              .map((task) => (
                <div key={task.id}>
                  <TasksCards
                    id={task.id!}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    onDelete={handleDelete}
                    onPut={onPut}
                    handleTaskClick={handleTaskClick}
                  />
                </div>
              ))}
          </div>
        )}

        {tasks.some((task) => task.status === ProgressStatus.EmProgresso || filterStatus === "all") && (
          <div className="task-div" id="progresso">
            <h3>Em Progresso</h3>
            {tasks
              .filter((task) => task.status === ProgressStatus.EmProgresso)
              .map((task) => (
                <div key={task.id}>
                  <TasksCards
                    id={task.id!}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    onDelete={handleDelete}
                    onPut={onPut}
                    handleTaskClick={handleTaskClick}
                  />
                </div>
              ))}
          </div>
        )}

        {tasks.some((task) => task.status === ProgressStatus.Concluido || filterStatus === "all") && (
          <div className="task-div" id="concluido">
            <h3>Concluído</h3>
            {tasks
              .filter((task) => task.status === ProgressStatus.Concluido)
              .map((task) => (
                <div key={task.id}>
                  <TasksCards
                    id={task.id!}
                    name={task.name}
                    description={task.description}
                    status={task.status}
                    onDelete={handleDelete}
                    onPut={onPut}
                    handleTaskClick={handleTaskClick}
                  />
                </div>
              ))}
          </div>
        )}
      </div>

      {
        openGetModal && currentTask && (
          <Modal isOpen={openGetModal} setModalOpen={() => setOpenGetModal(!openGetModal)}>
            <h2>{currentTask.name}  <button onClick={() => openPatch("name", currentTask.name)}> <FaEdit /></button></h2>
            <p>{currentTask.description} <button onClick={() => openPatch("description", currentTask.description)}><FaEdit /></button></p>
            {currentTask.status === ProgressStatus.Concluido && (
              <p>Concluído
                <button onClick={() => openPatch("status", currentTask.status)}>
                  <FaEdit />
                </button>
              </p>
            )}

            {currentTask.status === ProgressStatus.EmProgresso && (
              <p>Em Progresso
                <button onClick={() => openPatch("status", currentTask.status)}>
                  <FaEdit />
                </button>
              </p>
            )}

            {currentTask.status === ProgressStatus.Pendente && (
              <p>Pendente
                <button onClick={() => openPatch("status", currentTask.status)}>
                  <FaEdit />
                </button>
              </p>
            )}
          </Modal>
        )
      }

      <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)}>
        <form className="form-add" onSubmit={handleSubmit}>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={128}
            required
          />

          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={255}
          ></textarea>

          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as ProgressStatus)}
            required
          >
            <option value="pending">Pendente</option>
            <option value="in_progress">Em progresso</option>
            <option value="done">Concluído</option>
          </select>

          <button className="button-add" type="submit">Salvar</button>
        </form>
      </Modal>
      {
        currentTask && openUpdateModal && !openPatchModal && (
          <Modal
            isOpen={openUpdateModal}
            setModalOpen={() => setOpenUpdateModal(!openUpdateModal)}
          >
            <form className="form-add" onSubmit={(e) => handlePut(currentTask.id!, e)}>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label htmlFor="description">Descrição:</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as ProgressStatus)}
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em progresso</option>
                <option value="done">Concluído</option>
              </select>
              <button className="button-atualizar" type="submit">Atualizar</button>
            </form>
          </Modal>
        )
      }
      {
        openPatchModal && fieldToEdit && currentTask && (
          <Modal
            isOpen={openPatchModal}
            setModalOpen={() => setOpenPatchModal(!openPatchModal)}
          >
            <form
              className="form-add"
              onSubmit={(e) => {
                e.preventDefault();
                handlePatchField(currentTask.id!, fieldToEdit, fieldValue);
              }}
            >
              {fieldToEdit === "name" ? (
                <label htmlFor={fieldToEdit}>Editar Nome:</label>
              ) : fieldToEdit === "description" ? (
                <label htmlFor={fieldToEdit}>Editar Descrição:</label>
              ) : null}
              {fieldToEdit === "status" ? (
                <select
                  id="status"
                  value={fieldValue as ProgressStatus}
                  onChange={(e) => setFieldValue(e.target.value as ProgressStatus)}
                >
                  <option value="pending">Pendente</option>
                  <option value="in_progress">Em Progresso</option>
                  <option value="done">Concluído</option>
                </select>
              ) : (
                <input
                  id={fieldToEdit}
                  type="text"
                  value={fieldValue as string}
                  onChange={(e) => setFieldValue(e.target.value)}
                />
              )}
              <button className="button-atualizar" type="submit">Atualizar</button>
            </form>
          </Modal>
        )
      }

    </div >
  );
}

export default TodoList;
