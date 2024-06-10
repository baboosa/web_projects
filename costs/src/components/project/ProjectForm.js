import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || []);

  useEffect(() => {
    fetch('http://localhost:5000/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'apllication/json'
      }
    }).then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((e) => console.log(e))
  }, []);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(project)
  }

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project, category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      }
    })
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input type="text" text="Project name" name="name" placeholder="Enter the project name" handleOnChange={handleChange} value={project.name ? project.name : ''} required />
      <Input type="number" text="Project Budget" name="budget" placeholder="Enter the project budget" handleOnChange={handleChange} value={project.budget ? project.budget : ''} required />
      <div>
        <Select name="category_id" text="Select the category" options={categories} handleOnChange={handleCategory} value={project.category ? project.category.id : ''} required />
      </div>
      <div>
        <SubmitButton text={btnText} />
      </div>
    </form>
  )
}

export default ProjectForm;
