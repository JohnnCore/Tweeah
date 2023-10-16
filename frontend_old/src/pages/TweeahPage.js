import React, { useEffect, useState, useContext } from 'react';

import useTweeah from '../hooks/useTweeah';
import AuthContext from "../context/AuthContext";

import { Link, useParams } from 'react-router-dom';

import Tweeah from '../components/Tweeah';
import TweeahList from '../components/TweeahList';

import FavoriteIcon from '@mui/icons-material/Favorite';


const TweeahPage = () => {
    const { id } = useParams()

    const {tweeah, replies, thread, sendUpdate, sendReplie, sendDelete, like_unlike} = useTweeah(id, true, false, true)

    let { user } = useContext(AuthContext)
    console.log(tweeah);
    const [body, setBody] = useState('')
    const [campBody, setCampBody] = useState('')

    const [isLoadingRep, setIsLoadingRep] = useState(true)
    const [campReplie, setCampReplie] = useState('')

    const [toUpdate, setToUpdate] = useState(false)

    const [like, setLike] = useState(false)
    const [likesCount, setLikesCount] = useState(0)

    
    // useEffect(() => {
    //     const LoadTweeah = () => {
    //         const url = baseUrl + `${id}`;
    //         api.get(url, {
    //             headers: {
    //                 Authorization: `JWT ${authTokens?.access}`
    //             }
    //         })
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     console.log(res.data);
    //                     setCampBody(res.data.results.body)
    //                     setBody(res.data.results.body)
    //                     setThread(res.data.thread)
    //                 }
    //                 else {
    //                     console.log("Error");
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //         }

    //     LoadTweeah();
    // }, [id]);

    useEffect(() => {
        setCampBody(tweeah.body)
        setBody(tweeah.body)
        if(replies)
            setIsLoadingRep(false)
        setLikesCount(tweeah.likes_count)
        setLike(tweeah.iliked)
    }, [replies, tweeah, isLoadingRep])

    // const handleDelete = (id) => {
    //     const url = baseUrl + `${id}/delete/`;
    //     api.delete(url, {
    //         headers: {
    //             Authorization: `JWT ${authTokens?.access}`
    //         }
    //     })
    //         .then(res => {
    //             if (res.status === 200) {
    //                 console.log("deleted");
    //                 navigate("/")
    //             }
    //             else {
    //                 console.log("Error");
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }

    // const sendUpdate = () => {
    //     const url = baseUrl + `${id}/update/`;
    //     if (campBody === '') {
    //         alert("Fill body field")
    //     }
    //     else {
    //         const datapost = {
    //             body: campBody,
    //         }
    //         api.patch(url, datapost, {
    //             headers: {
    //                 Authorization: `JWT ${authTokens?.access}`
    //             }
    //         })
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     console.log("updated");
    //                     setToUpdate(false)
    //                     setBody(campBody)
    //                 }
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
    // }

    const handleCancel = () => {
        setToUpdate(false)
        setCampBody(body)
    }

    const handleUpdate = async () => {
        const res = sendUpdate(campBody)
        if (res)
        setToUpdate(false)
    }

    // const sendReplie = () => {
    //     const url = baseUrl + `${id}/replies/create/`;
    //     if (campReplie === '') {
    //         alert("Fill replie field")
    //     }
    //     else {
    //         const datapost = {
    //             body: campReplie,
    //         }

    //         api.post(url, datapost, {
    //             headers: {
    //                 Authorization: `Bearer ${authTokens?.access}`
    //             }
    //         })
    //             .then(res => {
    //                 if (res.status === 201) {
    //                     window.location.reload();
    //                 }
    //                 else {
    //                     alert("error");
    //                 }
    //             })
    //     }
    // }

    // useEffect(() => {
    //     const LoadReplies = () => {
    //         const url = baseUrl + `${id}/replies/list`;

    //         api.get(url, {
    //             headers: {
    //                 Authorization: `Bearer ${authTokens?.access}`
    //             }
    //         })
    //             .then(res => {
    //                 if (res.status === 200) {
    //                     setReplies(res.data.results)
    //                     setIsLoadingRep(false)
    //                 }
    //                 else {
    //                     console.log('Error');
    //                 }
    //             })
    //     }

    //     LoadReplies();
    // }, [authTokens, id]);

    const handleLike = async () => {
        const res = await like_unlike(like)
        if(res)
        {
            setLike(true)
            setLikesCount((prevCounter) => prevCounter + 1)
    }
        else
        {
            setLike(false)
            setLikesCount((prevCounter) => prevCounter - 1)
        }
    }

    const FillReplies = () => {
        return replies.map((data) => {
            return (
                <div key={data.id}>
                    <TweeahList item={data} />
                </div>
            )
        })
    }

    const FillThread = () => {
        const filtered = thread.filter((data) => data.id !== parseInt(id, 10));
        return filtered.map((data) => {
            return (
                <div key={data.id}>
                    <TweeahList item={data} />
                </div>
            )
        })
    }

    return (
    <div className="tweeah-page">
        <div className="thread">
            <FillThread />
        </div>
        <div className="tweet">
            {!toUpdate ? (
                <div>
                    <Tweeah item={tweeah} >
                        {likesCount}
                        <FavoriteIcon style={{ color: like ? 'red' : 'grey', cursor: 'pointer' }} onClick={() => handleLike()} />
                    </Tweeah>
                </div>
            ) : (
                <div className="content">
                    <input value={campBody} onChange={(e) => setCampBody(e.target.value)} />
                </div>
            )}

            {tweeah?.user?.id === user.user_id && (
              <div>
                {!toUpdate ? (
                  <>
                    <Link onClick={() => sendDelete(id)}>Delete</Link>
                    <Link onClick={() => setToUpdate(true)}>Update</Link>
                  </>
                ) : (
                  <>
                    <Link onClick={() => handleCancel()}>Cancel</Link>
                    <Link onClick={() => handleUpdate()}>Save</Link>
                  </>
                )}
              </div>
            )}

            <div>
                <textarea name="" id="" cols="30" rows="10" onChange={(e) => setCampReplie(e.target.value)}></textarea>
                <Link onClick={() => sendReplie(campReplie)}>Reply</Link>
            </div>
            <div>
                {!isLoadingRep ? (
                    <FillReplies />
                ) : (
                    <p>Loading</p>
                )}
            </div>
        </div>
    </div>
);

}

export default TweeahPage;
