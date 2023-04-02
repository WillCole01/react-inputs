import { Card, CardBody  } from "reactstrap";

const RunCard = ({informationMap}) =>
{
    return(
        <Card style={{textAlign:"left",
                      backgroundColor: "white",
                      borderWidth: "2px",
                      borderColor: "lightgray"}}>
            <CardBody>
            <ul>
                 {Object.keys(informationMap).map( (x, index) => 
                                                        (<li key={index}>{x}: {informationMap[x]}</li>))
                 }
            </ul>
            </CardBody>
        </Card>
    );
}

export default RunCard;