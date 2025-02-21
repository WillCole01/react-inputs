import React from 'react';
import { useEffect } from 'react';
import CalcsWrapper from './pages/CalcsWrapper';
import FilterGroups from "./pages/FilterGroups.js";
import Model from "./pages/Model.js";
import QuestionMapper from "./pages/QuestionMapper.js";
import Nodes from "./pages/Nodes.js";
import Authenticate from './pages/Authenticate.js';
import Shortcuts from './pages/Shortcuts';

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
            <Routes> 
                  <Route path="/"  Component={Model}/> 
                  <Route path="/Calcs"  Component={CalcsWrapper}/> 
                  <Route path="/FilterGroups"  Component={FilterGroups}/>
                  <Route path="/Nodes"  Component={Nodes}/>
                  <Route path="/QuestionMapper" Component={QuestionMapper}/>
                  <Route path="/Auth" Component={Authenticate}/>
                  <Route path="/Shortcuts" Component={Shortcuts}/>
            </Routes>
         </Container>
   </React.StrictMode>

   </>);
};

export default App;