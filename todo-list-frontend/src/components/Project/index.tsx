// @ts-nocheck
import React from 'react';
import { Col, Card, Modal, Button } from 'react-bootstrap';
import { ProjectName, ProjectOptions, ButtonOption, TaskGroup, CheckTask, LabelTask, TaskInputName, ButtonAddTask } from './Styles';
import * as Icon from 'react-bootstrap-icons';
import { useState } from 'react';
import { createTask, markTaskAsDone, markTaskAsNotDone, deleteTask, deleteProject, editTask, editProject } from '../../actions';
import { useEffect, useRef } from 'react';


const Project: React.FC = ({projectData, selfDelete}) => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [modalNewName, setModalNewName] = useState('')
  const [modalTaskId, setModalTaskId] = useState('')
  const [show, setShow] = useState(false);

  const handleClose = () => {
    inputModalRef.current.value = ''
    setModalNewName('')
    setModalTaskId('')
    setShow(false);
  }
  const handleShow = () => setShow(true)

  const inputTaskNameRef = useRef();
  const inputModalRef = useRef();

  useEffect(() => {
    setTasks(projectData?.tasks)
  }, [])

  const handleEdit = async () => {
    if(!modalNewName){
      return
    }
    if(modalTaskId) {
      const payload = {
        description: modalNewName
      }
      const result = await editTask(projectData._id, modalTaskId, payload)
      setTasks(result.data.tasks)
    } else {
      const payload = {
        name: modalNewName
      }
      await editProject(projectData._id, payload)
      projectData.name = modalNewName
    }
    handleClose()
  }

  const handleDeleteProject = async () => {
    await deleteProject(projectData._id)
    selfDelete()
  }

  const handleCreateTask = async () => {
    if(!newTask){
      return
    }
    const result = await createTask(projectData._id, { description: newTask })
    inputTaskNameRef.current.value = ''
    setTasks(result.data.tasks)
  }

  const handleDeleteTask = async (taskId) => {
    await deleteTask(projectData._id, taskId)
    const newTaskList = tasks.filter((task) => {
      if(task._id !== taskId){
        return task
      }
      return false
    })
    setTasks(newTaskList)
  }

  const handleCheckTask = async (taskId, completed_at) => {
    let result
    if(completed_at) {
      result = await markTaskAsNotDone(projectData._id, taskId)
    } else {
      result = await markTaskAsDone(projectData._id, taskId)
    }
    setTasks(result.data.tasks)
  }

  return <Col md="3">
        <Card>
            <Card.Header className="d-flex">
              <ProjectName>
                <h5>{projectData.name}</h5>
              </ProjectName>
              <ProjectOptions>
                <ButtonOption onClick={handleShow} href="#">
                  <Icon.PencilFill color="royalblue"/>
                </ButtonOption>
                <ButtonOption onClick={handleDeleteProject} href="#">
                  <Icon.Trash color="royalblue"/>
                </ButtonOption>
              </ProjectOptions>
            </Card.Header>
            <Card.Body>
              <div>
                <TaskGroup>To Do</TaskGroup>
                {
                  tasks.map((task) => {
                    if(!task.completed_at){
                      const checkTask = () => handleCheckTask(task._id, task.completed_at)
                      const removeTask = () => handleDeleteTask(task._id)
                      const editTask = () => {

                        setModalTaskId(task._id)
                        handleShow()
                      }
                      return (
                        <div key={task._id} className="form-group">
                          <CheckTask type="checkbox" className="form-check-input" onClick={checkTask} />
                          <LabelTask className="form-check-label" href="#" onClick={editTask}>{task.description}</LabelTask>
                          <ButtonOption onClick={removeTask} href="#">
                            <Icon.Trash />
                          </ButtonOption>
                        </div>
                      )
                    }
                    return ''
                  })
                }
              </div>
              <div>
                <TaskGroup>Done</TaskGroup>
                {
                  tasks.map((task) => {
                    if(task.completed_at){
                      const checkTask = () => handleCheckTask(task._id, task.completed_at)
                      const removeTask = () => handleDeleteTask(task._id)
                      const editTask = () => {
                        setModalTaskId(task._id)
                        handleShow()
                      }
                      const taskFinished = new Date(task.completed_at)
                      return (
                        <div key={task._id} className="form-group">
                          <CheckTask type="checkbox" defaultChecked className="form-check-input" onClick={checkTask} />
                          <LabelTask data-toggle="tooltip" data-placement="bottom" title={`Finished: ${taskFinished}`}
                          className="form-check-label" href="#" onClick={editTask}>{task.description}</LabelTask>
                          <ButtonOption onClick={removeTask} href="#">
                            <Icon.Trash />
                          </ButtonOption>
                        </div>
                      )
                    }
                    return ''
                  })
                }
              </div>
            </Card.Body>
            <Card.Footer className="d-flex">
              <TaskInputName className="form-control" type="input" placeholder="Task name" ref={inputTaskNameRef} onChange={(e) => setNewTask(e.target.value) }/>
              <ButtonAddTask className="btn btn-success" onClick={handleCreateTask}>
                Add
              </ButtonAddTask>
            </Card.Footer>
        </Card>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Edit</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TaskInputName className="form-control" type="input" placeholder="Enter new name" ref={inputModalRef} onChange={(e) => setModalNewName(e.target.value) }/>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
}

export default Project;