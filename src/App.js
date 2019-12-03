import React from 'react';
import './assets/css/App.css';
//Importando Router y componentes
import Router from './Router';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Router />
      <Footer />
    </div>
  );
}
export default App;
