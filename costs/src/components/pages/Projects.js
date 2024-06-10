import { useLocation } from 'react-router-dom';

import { useState, useEffect } from 'react';
import Message from '../layout/Message';
import Container from '../layout/Container';
import Loading from '../layout/Loading';
import LinkButton from '../layout/LinkButton';
import ProjectCard from '../project/ProjectCard';

import styles from './Projects.module.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false)
  const [projectMessage, setProjectMessage] = useState('');

  const location = useLocation();
  let message = '';
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:5000/projects', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (Array.isArray(data)) {
            setProjects(data);
          } else {
            console.error('Unexpected data format:', data);
          }
          setRemoveLoading(true);
        })
        .catch(e => {
          console.log(e);
          setRemoveLoading(true);
        });
    }, 1000)
  }, [])

  function removeProject(id) {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage('Project removed successfully');
      })
      .catch(e => console.log(e))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>My projects</h1>
        <LinkButton to="/newproject" text="New project" />
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} handleRemove={removeProject} name={project.name} id={project.id} budget={project.budget} category={project.category ? project.category.name : 'No category'} />
          ))
        ) : (
          <p>No projects registered</p>
        )}
        {!removeLoading && <Loading />}
      </Container>
    </div>
  )
}

export default Projects;
