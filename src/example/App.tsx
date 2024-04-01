import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useBranches, useProjects, useRepositoryTrees } from "..";

function App() {
  const [count, setCount] = useState(0);
  const { projects } = useProjects({ owned: true });
  const projectId = projects ? projects[0].id : "";
  const { repositories } = useRepositoryTrees(projectId);
  const { branches } = useBranches(projectId);

  return (
    <>
      <div>
        <section>
          <h3>Projects</h3>
          {projects && (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>{project.name}</li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3>RepositoryTrees</h3>
          {repositories && (
            <ul>
              {repositories.map((repository) => (
                <li key={repository.id}>{repository.name}</li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3>Branches</h3>
          {branches && (
            <ul>
              {branches.map((branch, index) => (
                <li key={index}>{branch.name}</li>
              ))}
            </ul>
          )}
        </section>

        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
