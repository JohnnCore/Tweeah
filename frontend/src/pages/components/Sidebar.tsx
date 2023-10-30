import { MouseEvent } from 'react';
import jwtDecode from "jwt-decode";

import useAuth from '../../hooks/useAuth';
import {logout} from '../../services/auth';
import { AccessToken } from '../../types';



export default function Sidebar() {
    const {dispatch, AUTH_ACTIONS, state} = useAuth();
    const decodedToken: AccessToken | null = state?.accessToken ? jwtDecode(state.accessToken) : null;
    console.log(decodedToken);
    
    const handleClick = (e:MouseEvent<HTMLElement>) => {
        logout({ dispatch, AUTH_ACTIONS })
    }

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 sidebar">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32"><use href="#bootstrap"></use></svg>
                <span className="fs-4 text-light">Sidebar</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"><use href="#home"></use></svg>
                        Home
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"><use href="#speedometer2"></use></svg>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"><use href="#table"></use></svg>
                        Orders
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"><use href="#grid"></use></svg>
                        Products
                    </a>
                </li>
                <li>
                    <a href="#" className="nav-link link-light">
                        <svg className="bi me-2" width="16" height="16"><use href="#people-circle"></use></svg>
                        Customers
                    </a>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong className='link-light'>{decodedToken?.name}</strong>
                </a>
                <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href='/login' onClick={handleClick}>Sign out</a></li>

                </ul>
            </div>
        </div>
    );
}