# gitbeaker-hooks

[![npm version](https://badge.fury.io/js/gitbeaker-hooks.svg)](https://badge.fury.io/js/gitbeaker-hooks)
![build](https://github.com/ryohidaka/gitbeaker-hooks/workflows/Build/badge.svg)
[![codecov](https://codecov.io/gh/ryohidaka/gitbeaker-hooks/graph/badge.svg?token=RHP9TB2F51)](https://codecov.io/gh/ryohidaka/gitbeaker-hooks)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/B0B6TVH92)

## Overview

React Hooks library for [Gitbeaker](https://github.com/jdalrymple/gitbeaker).

## Installation

You can install this library using npm:

```shell
npm install gitbeaker-hooks
```

## Usage

Wrap your app with the `GitbeakerProvider` and provide options object with `token` property.

```tsx
import { GitbeakerProvider } from "gitbeaker-hooks";

const gitbeakerOptions = {
  token: "your-access-token",
};

ReactDOM.render(
  <React.StrictMode>
    <GitbeakerProvider options={gitbeakerOptions}>
      <App />
    </GitbeakerProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
```

Use the provided hooks to fetch GitLab data:

- useProjects
- useRepositoryTrees

```tsx
import { useProjects } from "gitbeaker-hooks";

function App() {
  const { projects, isLoading } = useProjects();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ul>
        {projects?.map((project) => <li key={project.id}>{project.name}</li>)}
      </ul>
    </>
  );
}

export default App;
```

## API

### Hooks

- `useProjects(options)` - Fetch multiple projects.

- `useRepositoryTrees(projectId, options)` - Get a list of repository files and directories in a project.

### GitbeakerProvider

The `GitbeakerProvider` component should be used to wrap your app and provide the `options` object. The `options` object must include the `token` property.

## Link

- [Gitbeaker](https://github.com/jdalrymple/gitbeaker)
- [@gitbeaker/rest](https://www.npmjs.com/package/@gitbeaker/rest)
- [Docs for GitLab REST API](https://archives.docs.gitlab.com/16.4/ee/api/rest/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
