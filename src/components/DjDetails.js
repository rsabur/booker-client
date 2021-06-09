import { useState } from 'react';
import { Link } from 'react-router-dom';

function DjDetails({ id, name, bio, image = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png", genre, rate, link }) {
    const [details, setDetails] = useState(false)

    function toggleDetails() {
        setDetails(details => !details)
    }

    return (
        <div className="card text-white bg-secondary mb-3" style={{ width: "18rem;" }}>
            <img src={image} className="card-img-top" alt={name} style={{ width: "200px", height: "200px"}} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>

                {/* <button onClick={toggleDetails} className="btn btn-primary">{details ? "Less" : "More"} Info...</button> */}
                <Link to={`/djs/${id}`}><button type="button" className="btn btn-primary btn-lg">More Info</button></Link>
            </div>
        </div>
    )
}


export default DjDetails