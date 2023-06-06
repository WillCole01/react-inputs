import React from 'react';
import ReactDOM from 'react-dom';

// Running app state
// import {appState} from './appState';

// Component wrappers
import CalcsWrapper from './pages/CalcsWrapper';
import FilterGroups from "./pages/FilterGroups.js";
import Model from "./pages/Model.js";
import QuestionMapper from "./pages/QuestionMapper.js";
import Nodes from "./pages/Nodes.js";

import { Routes, Route,} from 'react-router-dom';
import BtsNavbar from './components/BtsNavbar';
import { Container, Row } from 'react-bootstrap';

const App = () => {

   return ( <>
      <React.StrictMode>
         <Container>
            <Row>
               <BtsNavbar /> 
            </Row>

            {/* <Router> */}
            <Routes> 
                  <Route path="/"  Component={Model}/> 
                  <Route path="/Calcs"  Component={CalcsWrapper}/> 
                  <Route path="/FilterGroups"  Component={FilterGroups}/>
                  <Route path="/Nodes"  Component={Nodes}/>
                  <Route path="/QuestionMapper" Component={QuestionMapper}/>
            </Routes>
            {/* </Router> */}

         </Container>
   </React.StrictMode>

   </>);
};

export default App;