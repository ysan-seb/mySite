import React, { useEffect, useState } from 'react';
import moment from 'moment'
import './App.css';

// soit categoriser par language avec un titre, soit trier par languages et/ou par dates ... 


function extractLanguage(data) {
  let array = []
  let languages = []
  data.forEach(element => {
    if (element.language) {
      array.push(element.language)
    }
  });
  languages = new Set(array)
  return languages
}

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

  extractLanguage(projects)


  projects.sort((a, b) => {
    if (a.language < b.language)
      return -1;
    if (a.language > b.language)
      return 1;
    return 0;
  })

  const listProjects = projects.map((project) =>
    <div className="card border-dark m-3 shadow" style={{ maxWidth: `18rem` }}>
      <div className="card-header font-weight-bolder"><a href={project.html_url}>{project.name}</a><span className="float-right font-weight-normal"><span style={{ width: `10px`, height: `10px`, borderRadius: `100%`, background: displayColor(project.language), display: `inline-block` }}></span> {project
        .language}</span></div>
      <div className="card-body text-dark">
        {/* <h5 className="card-title">Dark card title</h5> */}
        {/* <p className="card-text">{project.description}</p> */}
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        {/* <p className="card-text font-italic">------------------------------------------- No description -------------------------------------------</p> */}
      </div>
      <div className="card-footer text-muted font-italic">
        Updated on {displayDate(project.updated_at)}
      </div>
    </div>
  );

  return (
    <div className="bg-light">

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
            <a className="nav-item nav-link" href="/">Features</a>
            <a className="nav-item nav-link" href="/">Pricing</a>
            <a className="nav-item nav-link" href="/">Disabled</a>
          </div>
        </div>
      </nav>

      <h4 className="text-center mt-5">Example heading <span className="badge badge-dark">JavaScript</span></h4>

      <div className="wrapper">
        {listProjects}
      </div>
    </div>
  );
}

export default App;
