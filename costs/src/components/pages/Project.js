import { parse, v4 as uuidv4 } from "uuid";

import styles from './Project.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjectForm from '../project/ProjectForm';
import ServiceForm from "../service/ServiceForm";
import Message from '../layout/Message';

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showServiceForm, setShowServiceForm] = useState(false)
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() => {
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => res.json())
        .then((data) => {
          setProject(data);
        })
        .catch(err => console.log(err));
    }, 2000)
  }, [id]);

  function editPost(project) {
    if (project.budget < project.cost) {
      setMessage('The budget cannot be less than the project cost');
      setType('error');
      return false;
    }
    fetch(`http://localhost:5000/projects/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then(res => res.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage('Project updated!');
        setType('success');

      })
      .catch(e => console.log(e))
    setMessage();
  }

  function createService(project) {
    setMessage();
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4()

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)) {
      setMessage('Budget exceeded check the value of the service');
      setType('error');
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data)
    })
    .catch(e => console.log(e));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm)
  }

  return (
    <>
      {project.name ?
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? 'Edit' : 'Close'}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category: </span> {project.category.name}
                  </p>
                  <p>
                    <span>Total budget: </span> R${project.budget}
                  </p>
                  <p>
                    <span>Total used: </span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm handleSubmit={editPost} btnText="Finish editing" projectData={project} />
                </div>
              )}
            </div>

            <div className={styles.service_form_container}>
              <h2>Add a service:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? 'Add a service' : 'Close'}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm handleSubmit={createService}
                    btnText="Add service"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Services</h2>
            <Container customClass="start">
              <p>Items services</p>
            </Container>
          </Container>
        </div>
        : <Loading />
      }</>
  )
}

export default Project;
