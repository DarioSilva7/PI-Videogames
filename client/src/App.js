import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreateGame from "./Components/CreateGame/CreateGame"
import Details from './Components/Details/Details'


function App() {
  
  return (
    <BrowserRouter>
      <h1>Henry Videogames</h1>
    <div className="App">
      <Switch>  
      {/* El Switch, se queda con lo ultimo que se ingreso correctamente en el url */}
        <Route exact path= "/" component= {LandingPage}/>
        <Route exact path= "/home" component= {Home}/>
        <Route exact path= "/videogames" component= {CreateGame}/>
        <Route exact path= "/videogame/:id" component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
