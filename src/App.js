import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, [])

  async function handleAddRepository() {
    // TODO
    const setTitle = document.getElementById('repository-text').value;
    console.log(setTitle);
    
    const response = await api.post('repositories', {
      title: setTitle,
      owner: "Raphael Dantas"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    // TODO
    api.delete(`repositories/${id}`).then(response => {
      setRepositories(repositories.filter(repository => repository.id !== id))
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => [
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ])}
      </ul>
      <div className="add__repository">
        <input type="text" name="" id="repository-text"/>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
