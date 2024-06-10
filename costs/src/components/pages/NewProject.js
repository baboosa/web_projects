import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';

import styles from './NewProject.module.css';

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    // initialize cost and services
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        const state = { message: "Project created successfully" };
        navigate('/projects', { state });
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Create project</h1>
      <p>Create your project and then add services</p>
      <ProjectForm handleSubmit={createPost} btnText="Create project" />
    </div>
  )
}
export default NewProject;
