import SearchBar from "./SearchBar";
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
// import { Dropdown } from 'semantic-ui-react'


function NavBar({ setSearchTerm, currentUser, setSortBy, sortBy }) {
  // const [dropdown, setDropdown ] = useState(false)


  // function toggleDropdown() {
  //   setDropdown(dropdown => !dropdown)
  // }
  //   const handleSort = () => {
  //       if (sortBy === "Price ↑ Ascending") {
  //           filteredDjs.sort((dj_a, dj_b) => {
  //               console.log(dj_a.rate)
  //               return dj_a.rate - dj_b.rate
  //           })
  //       }
  //     }
  function changeSort(e) {
    setSortBy(e.target.value)
  }






  // const options = [
  //     { key: 1, text: 'Choice 1', value: 1 },
  //     { key: 2, text: 'Choice 2', value: 2 },
  //     { key: 3, text: 'Choice 3', value: 3 },
  //   ]


  return (
    <>
      <img src="https://crackmagazine.net/wp-content/uploads/2021/03/191116_PRINTWORKS_BuggedOut_JakeDavis_@hungryvisuals-3677-scaled.jpg" class="img-fluid" alt="dj-controls" style={{ width: "100%", height: 350 }} />
      <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-dark" style={{ width: "100%" }}>
        <div className="container-fluid">
          {/* <a className="navbar-brand" href="#"></a> */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/djs">DJs</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/clients/${currentUser}`}>My Profile</NavLink>
              </li>
              {/* <li className="nav-item">
              <NavLink className="nav-link" to="/">Login</NavLink>
            </li> */}
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item dropdown">

                {/* <Dropdown clearable options={options} selection /> */}

                <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort By
          </a>
                <select onChange={changeSort} className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink" value={sortBy}>

                  {/* <li><a className="dropdown-item" href="#">Genre</a></li> */}
                  <option className="dropdown-item" value="Price ↑ Ascending">Price ↑ Ascending</option>
                  <option className="dropdown-item" value="Price ↓ Descending">Price ↓ Descending</option>
                </select>
              </li>
            </ul>
            <SearchBar setSearchTerm={setSearchTerm} />
            <NavLink className="nav-link" to={`/`}>Logout</NavLink>
          </div>
        </div>
      </nav>
    </>
  )
}


export default NavBar