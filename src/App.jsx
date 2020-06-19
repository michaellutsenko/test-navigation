import React from 'react';

import MainView from './components/MainView/MainView';

// I prefer the CSS Modules approach and
// create-react-app has it out of the box
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.container}>
      
      {/* I'm using react portals to keep the DOM nice and clean.
      This div functions as the purple backdrop and also
      the portal root, to which the contents of the navigation
      block will pe appended */}
      <div id="portal-root" className={styles.backdrop}></div>
      
      {/* The main "sliding" view */}
      <MainView />
    </div>
  );
}

export default App;
