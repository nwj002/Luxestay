// import React from 'react';
// import { Link } from 'react-router-dom';
// // import { Link as ScrollLink } from 'react-scroll';
// import '../index.css'; // or './App.css'


// const Navbar = () => {
//     const user = JSON.parse(localStorage.getItem('userData'));

//     // const handleLogout = () => {
//     //     localStorage.removeItem('userData');
//     //     window.location.href = '/login'; // Redirect to login page after logout
//     // }

//     return (
//         <>
//             <div className='container-fluid mt-3'>
//                 <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#13361C' }}>
//                     <div className="container-fluid">
//                         <Link className="navbar-brand d-flex align-items-center ms-4" to="/">
//                             <img src="/assets/icons/luxe.png" alt="Logo" width="60" height="60" className="d-inline-block align-text-top" />
//                             <span style={{
//                                 color: '#CC9A48', marginLeft: '10px', fontSize: '45px',
//                             }}>Luxestay</span>
//                         </Link>
//                         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//                             <span className="navbar-toggler-icon"></span>
//                         </button>
//                         <div className="collapse navbar-collapse" id="navbarNav">
//                             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                                 <li className="nav-item ms-5">

//                                 </li>
//                             </ul>


//                             <form className="d-flex mx-6" role="search">
//                                 {
//                                     // user ? (
//                                     //     <div className="dropdown">
//                                     //         <a className="btn  dropdown-toggle ms-3" style={{ background: '#D29062', color: 'white' }} role="hover" data-bs-toggle="dropdown" aria-expanded="false">
//                                     //             Hello, {user.username}
//                                     //         </a>
//                                     //         <ul className="dropdown-menu">
//                                     //             <li><a className="dropdown-item" href="/profile">Profile</a></li>
//                                     //             <li><a className="dropdown-item" href="/orderlist">Orders</a></li>
//                                     //             <li><a className="dropdown-item" href="/address">Address</a></li>
//                                     //             <li><a className="dropdown-item" href="/cart">Cart</a></li>
//                                     //             <li><hr className="dropdown-divider" style={{ background: 'red' }} /></li>
//                                     //             <li><Link onClick={handleLogout} className="dropdown-item" to="/login">Logout</Link></li>
//                                     //         </ul>
//                                     //     </div>
//                                     // ) : 
//                                     (
//                                         <Link to="/login" className="btn" style={{
//                                             backgroundColor: '#CC9A48',
//                                             color: 'white',
//                                             marginLeft: '35px',
//                                             margin: '0px 30px',
//                                             padding: '10px 25px', // Increase padding for larger size
//                                             fontSize: '23px', // Increase font size
//                                             borderRadius: '5px',
//                                         }}>Login</Link>
//                                     )
//                                 }
//                             </form>
//                         </div>
//                     </div>
//                 </nav>
//             </div>
//         </>
//     );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Ensure this file contains global styles

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('userData'));

    const handleLogout = () => {
        localStorage.removeItem('userData');
        window.location.href = '/login'; // Redirect to login page after logout
    };

    return (
        <div className="container-fluid mt-2">
            <nav
                className="navbar navbar-expand-lg navbar-light"
                style={{
                    backgroundColor: '#13361C',
                    padding: '0.4rem ',
                }}
            >
                <div className="container-fluid">
                    {/* Logo and Brand Name */}
                    <Link className="navbar-brand d-flex align-items-center ms-4" to="/">
                        <img
                            src="/assets/icons/luxe.png"
                            alt="Logo"
                            width="55" // Slightly smaller logo
                            height="55"
                            className="d-inline-block align-text-top"
                        />
                        <span
                            style={{
                                color: '#CC9A48',
                                marginLeft: '10px',
                                fontSize: '40px', // Slightly smaller text
                            }}
                        >
                            Luxestay
                        </span>
                    </Link>

                    {/* Navbar Toggler */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links and Login Button */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {/* Add additional nav items here if needed */}
                        </ul>

                        <form className="d-flex mx-6" role="search">
                            {user ? (
                                <div className="dropdown">
                                    <a
                                        className="btn dropdown-toggle ms-3"
                                        style={{
                                            background: '#D29062',
                                            color: 'white',
                                        }}
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Hello, {user.name}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <a className="dropdown-item" href="/profile">
                                                Profile
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/bookings">
                                                Bookings
                                            </a>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="/room">
                                                Rooms
                                            </a>
                                        </li>

                                        <li>
                                            <hr className="dropdown-divider" style={{ background: 'red' }} />
                                        </li>
                                        <li>
                                            <Link onClick={handleLogout} className="dropdown-item" to="/login">
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            ) :
                                (
                                    <Link
                                        to="/login"
                                        className="btn"
                                        style={{
                                            backgroundColor: '#CC9A48',
                                            color: 'white',
                                            marginLeft: '35px',
                                            margin: '0px 30px',
                                            padding: '10px 25px', // Larger button size
                                            fontSize: '23px', // Larger font size
                                            borderRadius: '5px',
                                        }}
                                    >
                                        Login
                                    </Link>
                                )
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
