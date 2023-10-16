import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';

import useTweeah from '../hooks/useTweeah';

import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography'

import './TweeahList.css'

import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const TweeahList = (props) => {
    const {item} = props
    const { id, body, iliked, likes_count, replies_count, user } = item
    const {like_unlike} = useTweeah(id, false, false, false)

    const [like, setLike] = useState(iliked)
    const [likesCount, setLikesCount] = useState(likes_count)

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

    return (
        <ListItem className="tweeah" alignItems="flex-start" style={{ width: '100vh', border:'solid 1px black'}}>
            <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar  >
            <ListItemText style={{ color:'red' }}
                primary={
                    <Link style={{ textDecoration: 'none' }}>
                        {user?.username}
                    </Link>
                }
                secondary={
                    <React.Fragment>
                        <Link to={`/${id}`} style={{ textDecoration: 'none' }}>
                            <div style={{ maxWidth: '100%', wordWrap: 'break-word' }}>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {body}
                                </Typography>
                            </div>
                        </Link>
                        <div className="list-actions">
                            <FavoriteIcon style={{ color: like ? 'red' : 'grey', cursor: 'pointer' }} onClick={() => handleLike()} />
                            {likesCount}
                            <CommentIcon/>
                            {replies_count}
                            
                        </div>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

export default TweeahList