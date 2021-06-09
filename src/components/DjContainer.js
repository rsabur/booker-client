import DjCard from "./DjCard";
import { useHistory } from "react-router-dom"


function DjContainer({ djs }) {

    const history = useHistory()

    return (
        <div className="container-lg col-lg">
            <h1> DJ Roster</h1>
            
            <div className="cards">

            {/* <div className="djcards "> */}
                        <DjCard djs={djs} />
            {/* </div> */}
            </div>
        </div>

    )
}


export default DjContainer