import {useState} from 'react';

function SearchBar({ setSearchTerm }) {
    const [search, setSearch] = useState('')

    function handleSubmit() {
        // e.preventDefault()
        console.log("Submitted");
        // setSearchTerm(search)
        setSearch(setSearchTerm)
    }
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand"/>
                <form className="d-flex" onChange={handleSubmit} >
                    <input 
                    className="form-control me-2" 
                    type="text" 
                    placeholder="Search" 
                    aria-label="Search" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                </form>
            </div>
        </nav>
    )
}


export default SearchBar