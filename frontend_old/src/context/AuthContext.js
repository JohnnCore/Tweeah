import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) //Arrow function faz com que o valor seja definido apenas no primeiro load
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)


    let loginUser = async (e) => {
        e.preventDefault()
        const datapost = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios.post('http://127.0.0.1:8000/api/users/token/', datapost)
            .then(res => {
                if (res.status === 200) {
                    setAuthTokens(res.data)
                    setUser(jwtDecode(res.data.access))
                    localStorage.setItem('authTokens', JSON.stringify(res.data))
                    navigate('/')
                }
                else {
                    alert('Something went wrong!')
                }
            })
            .catch(err => {
                alert(err)
            })
    }

    let logoutUser = async () => {
        const datapost = {
            refresh_token: authTokens?.refresh
        }
        axios.post('http://127.0.0.1:8000/api/users/logout/', datapost,)

            .then(res => {
                if (res.status === 200) {
                    setAuthTokens(null)
                    setUser(null)
                    localStorage.removeItem('authTokens')
                    navigate('/login')
                } else {
                    console.error('Logout failed:', res)
                    localStorage.removeItem('authTokens')
                    navigate('/login')
                }
            })
            .catch(error => {
                console.error('Logouta error:', error)
                localStorage.removeItem('authTokens')
                navigate('/login')
            })
    }

    // let logoutUser = async () => {
    //     try {
    //         let response = await fetch('http://127.0.0.1:8000/api/users/logout/', {
    //             method:'POST',
    //             headers:{
    //                 'Content-Type':'application/json',
    //                 Authorization: `Bearer ${authTokens?.access}`,
    //             },
    //             body: JSON.stringify({ refresh_token: authTokens?.refresh }),
    //         })

    //         if(response.status === 200){
    //             setAuthTokens(null)
    //             setUser(null)
    //             localStorage.removeItem('authTokens')
    //             navigate('/login')        
    //         } else {
    //             console.error('Logout failed:', response)
    //         }
    //     } catch (error) {
    //         console.error('Logout error:', error)
    //     }
    // }

    let registerUser = async (e) => {
        e.preventDefault()
        const datapost = {
            email: e.target.email.value,
            username: e.target.username.value,
            password: e.target.password.value,
        }
        console.log(datapost);
        axios.post('http://127.0.0.1:8000/api/users/register/', datapost)
            .then(res => {
                if (res.status === 201) {
                    navigate('/login')
                }
                else {
                    alert('Something went wrong!')
                }
            })
            .catch(err => {
                alert(err);
            })
    }


    let contextData = { //Tudo que vai ser passado para as paginas que estao entre o AuthProvider (ver em App.js)
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
    }


    useEffect(() => {

        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
        setLoading(false)


    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData} >
            {loading ? null : children}
        </AuthContext.Provider>
    )
}