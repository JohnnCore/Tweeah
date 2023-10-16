import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import debounce from "lodash/debounce";

import { useApi } from '../context/ApiContext';
import AuthContext from '../context/AuthContext';

const useTweeah = (id = 0, iloadOne = false, iloadAll = false, iloadReplies = false) => {
    const [tweeahs, setTweeahs] = useState([]);
    const [hasMore, setHasMore] = useState([]);

    const [tweeah, setTweeah] = useState({});
    const [replies, setReplies] = useState([]);
    const [thread, setThread] = useState([]);

    const api = useApi();
    const navigate = useNavigate()
    const { authTokens } = useContext(AuthContext);

    const baseUrl = 'http://127.0.0.1:8000/api/tweeahs/'

    const sendCreate = async (campBody) => {
        const url = 'http://127.0.0.1:8000/api/tweeahs/create/';

        const datapost = {
            body: campBody,
        }

        try
        {
            const response = await api.post(url, datapost, {
                headers: {
                    // Authorization: `Bearer ${authTokens?.access}`
                },
            });
    
            if (response.status !== 201) 
            {
                alert("error");
            }
            else 
            {
                navigate('/')
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }


    const loadTweeah = async () => {
        try {
            const response = await api.get(baseUrl + `${id}/`, {
                headers: {
                    // Authorization: `JWT ${authTokens?.access}`,
                },
            });

            if (response.status === 200) {
                setTweeah(response.data.results);
                setThread(response.data.thread)
            } else {
                console.log('Error');
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const loadReplies = async () => {
        try {
            const response = await api.get(baseUrl + `${id}/replies/list/`, {
                headers: {
                    // Authorization: `JWT ${authTokens?.access}`,
                },
            });

            if (response.status === 200) {
                setReplies(response.data.results);
            }
            else {
                console.log("replies");
                console.log('Error');
            }

        }
        catch (error) {
            console.log(error);
        }
    }


    const loadTweeahs = async (page = 1) => {
        try {
            const response = await api.get(baseUrl + `list/?page=${page}/`, {
                headers: {
                    // Authorization: `JWT ${authTokens?.access}`,
                },
            });

            if (response.status === 200) {
                if(page === 1)
                    setTweeahs(response.data.results);
                else
                    setTweeahs((prevTweeahs) => [...prevTweeahs, ...response.data.results]);

                setHasMore(response.data.total_pages !== page);
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.log(error);
        }
    };

    
    const sendUpdate = async (campBody) => {
        const url = baseUrl + `${id}/update/`;

        if (campBody === '') {
            alert("Fill body field")
        }
        else {
            const datapost = {
                body: campBody,
            }
            try {
                const response = await api.patch(url, datapost, {
                    headers: {
                        // Authorization: `JWT ${authTokens?.access}`
                    },
                });
                
                return false
            }
            catch (error) {
                console.log(error);
            }
        }
        
    }
    
    const sendReplie = async (campReplie) => {
        const url = baseUrl + `${id}/replies/create/`;
        
        if (campReplie === '') {
            alert("Fill replie field")
        }
        else {
            const datapost = {
                body: campReplie,
            }
            try {
                const response = await api.post(url, datapost, {
                    headers: {
                        // Authorization: `Bearer ${authTokens?.access}`
                    },
                });
                
                if (response.status === 201) {
                    window.location.reload();
                }
                else {
                    alert("error");

                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    
    const sendDelete = async (id) => {
        const url = baseUrl + `${id}/delete/`;

        try {
            const response = await api.delete(url, {
                headers: {
                    // Authorization: `JWT ${authTokens?.access}`
                },
            });
            
            if (response.status === 200) {
                console.log("deleted");
                navigate("/")
            }
            else {
                console.log("error");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const like_unlike = async (like) => {
        const url = baseUrl + `${id}/like_unlike/`
        console.log(url);
        const datapost = {
            iliked: like,
        }

        try{
            const response = await api.post(url, datapost, {
                headers: {
                    // Authorization: `Bearer ${authTokens?.access}`
                }
            })

            if(response.status === 200)
            {
                console.log("ok");
                if(like)
                    return false
                else
                    return true
            }
            else
            {
                console.log("error");
            }
        }
        catch (err)
        {
            console.log(err);
        }

    }


    useEffect(() => {
        const LoadData = async () => {
            // if (id && iloadOne) {
            //     try {
            //         await loadTweeah();
            //     } catch (error) {
            //         console.log(error);
            //     }
            // }

            if (iloadReplies) {
                try {
                    await loadTweeah(); // Ensure that loadTweeah finishes before loading replies
                    await new Promise((resolve) => setTimeout(resolve, 300));
                    await loadReplies();
                } catch (error) {
                    console.log(error);
                }
            }
    
            if (iloadAll) {
                try {
                    await loadTweeahs();
                } catch (error) {
                    console.log(error);
                }
            }
        };
    
        LoadData();
    
        
    }, [id, iloadOne, iloadAll, iloadReplies]);
    
    
    
    
    return {
        tweeahs,
        hasMore,
        tweeah,
        replies,
        thread,
        loadTweeahs,
        sendCreate,
        sendUpdate,
        sendReplie,
        sendDelete,
        like_unlike,
    };
};

export default useTweeah;