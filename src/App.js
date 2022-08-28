import { useState, useEffect, useCallback } from 'react';
import Section from './components/section/sectionComponent';
import _ from 'lodash';
import './App.css';

const host = (process.env.NODE_ENV === 'development') ? "http://localhost:8081" : "";

function App() {
  const [homePage, setHomepage] = useState(null);

  useEffect(() => {
    fetch(`${host}/homepage`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setHomepage(data);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (homePage != null) {
      fetch(`${host}/homepage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homePage)
      }).then(() => { }).catch((err) => {
        console.log(err);
      });
    }
  }, [homePage]);

  const updateHomepage = useCallback((newHomepage, section) => {
    const updatedHomepage = _.cloneDeep(homePage);
    updatedHomepage[section] = newHomepage;
    setHomepage(updatedHomepage);
  }, [homePage]);

  return (
    <div className="App">
      {
        homePage && Object.keys(homePage).map((section, index) => (
          <Section key={index} name={section} contents={homePage[section]} updateHomepage={updateHomepage} />
        ))
      }
    </div>
  );
}

export default App;
