import Calcs from './Calcs';
import FilterGroups from "./FilterGroups.js";
import Model from "./Model.js";
import QuestionMapper from "./QuestionMapper.js";
import Nodes from "./Nodes.js";

import {Route, Routes} from 'react-router-dom';
import BtsNavbar from './components/BtsNavbar';
import { Container, Row } from 'react-bootstrap'; //

const App = () => {
   return ( <>
         {/* <BrowserRouter/> */}
         <Container>
            <Row>
                 <BtsNavbar /> 
            </Row>
            <Routes>
              <Route path="/" Component={Model}/>
              <Route path="/Calcs" Component={Calcs}/>
              <Route path="/FilterGroups" Component={FilterGroups}/>
              <Route path="/Nodes" Component={Nodes}/>
              <Route path="/QuestionMapper" Component={QuestionMapper}/>
            </Routes>
            {/* <Calcs/> */}
         </Container>
   </>);
};

export default App;