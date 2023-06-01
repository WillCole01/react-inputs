import Calcs from './Calcs';
import BtsNavbar from './components/BtsNavbar';
import { Container, Row } from 'react-bootstrap'; //
import { Routes, Route } from 'react-router-dom';

const App = () => {
   return ( <>
               <Container>
                  <Row>
                     <BtsNavbar /> 
                  </Row>
               </Container>

               <Routes>
                  <Route path="/" element={<Calcs />} />
               </Routes>
            </>);
};

export default App;