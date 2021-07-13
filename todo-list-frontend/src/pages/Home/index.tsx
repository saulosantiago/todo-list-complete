// @ts-nocheck
import React, { useEffect, useRef } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Project from '../../components/Project';
import { listProjects } from '../../actions';
import { useState } from 'react';
import { ProjectInputName, ButtonAddProject } from './Styles';

import { createProject } from '../../actions';

const Home: React.FC = () => {
  const [projects, setProjects] = useState([])
  const [newProjectName, setNewProjectName] = useState('')
  const newProjectNameRef = useRef()
  const history = useHistory()

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try{
      const result = await listProjects()
      setProjects(result.data)
    } catch(e) {
      console.log(e)
      history.push('/login')
    }
  }

  const handleCreateProject = async () => {
    if(!newProjectName){
      return
    }
    const payload = {
      name: newProjectName
    }
    await createProject(payload)
    await loadProjects()
    newProjectNameRef.current.value = ''
    setNewProjectName('')
  }

  return <div>
    <Header/>
    <Row className="p-3">
      <Col md="9">
        <Row>
          {
            projects.length > 0 && projects.map((project) => {
              const deleteProject = () => loadProjects()
              return (
                <Project  key={project._id} projectData={project} selfDelete={deleteProject} />
              )
            })
          }
        </Row>
      </Col>
      <Col md="3">
        <Card>
            <Card.Header className="d-flex justify-content-center">
              <h5>Create Project</h5>
            </Card.Header>
            <Card.Body>
              <ProjectInputName className="form-control" type="input" placeholder="Project name" ref={newProjectNameRef} onChange={(e) => setNewProjectName(e.target.value) }/>
              <ButtonAddProject className="btn btn-primary btn-block" onClick={handleCreateProject}>
                Add
              </ButtonAddProject>
            </Card.Body>
        </Card>
      </Col>
    </Row>
  </div>;
}

export default Home;