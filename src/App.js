import React, { useEffect, useState } from 'react';
import moment from 'moment'
import './App.css';


function displayColor(language) {
  switch (language) {
    case `Assembly`:
      return `sienna`
    case `C`:
      return `gray`
    case `C++`:
      return `hotpink`
    case `C#`:
      return `darkgreen`
    case `CSS`:
      return `indigo`
    case `HTML`:
      return `tomato`
    case `JavaScript`:
      return `gold`
    case `Objective-C`:
      return `dodgerblue`
    case `Shell`:
      return `greenyellow`
    default:
      return `grey`
  }
}

function displayDate(date) {
  let a = moment(date)
  return a.format('DD MMM YYYY')
}

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    fetch('https://api.github.com/users/ysan-seb/repos')
      .then(response => response.json())
      .then(data => setProjects(data));
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const listProjects = projects.map((project) =>
    <div class="card border-dark m-3 shadow" style={{ maxWidth: `18rem` }}>
      <div class="card-header font-weight-bolder"><a href={project.html_url}>{project.name}</a><span class="float-right font-weight-normal"><span style={{ width: `10px`, height: `10px`, borderRadius: `100%`, background: displayColor(project.language), display: `inline-block` }}></span> {project
        .language}</span></div>
      <div class="card-body text-dark">
        {/* <h5 class="card-title">Dark card title</h5> */}
        {/* <p class="card-text">{project.description}</p> */}
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        {/* <p class="card-text font-italic">------------------------------------------- No description -------------------------------------------</p> */}
      </div>
      <div class="card-footer text-muted font-italic">
        Update on {displayDate(project.updated_at)}
      </div>
    </div>
  );

  console.log(projects)
  return (
    <div class="bg-light">

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="/">Navbar</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link active" href="/">Home <span class="sr-only">(current)</span></a>
            <a class="nav-item nav-link" href="/">Features</a>
            <a class="nav-item nav-link" href="/">Pricing</a>
            <a class="nav-item nav-link" href="/">Disabled</a>
          </div>
        </div>
      </nav>

      <h4 class="text-center mt-5">Example heading <span class="badge badge-dark">JavaScript</span></h4>

      <div class="wrapper">
        {listProjects}
      </div>
    </div>
  );
}

export default App;
