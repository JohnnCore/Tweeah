import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import useTweeah from '../../hooks/useTweeah';

type PropsType = {
    id: number,
    iliked: boolean,
    likes_count: number,
}

const LikeButton = ({ id, iliked, likes_count }: PropsType) => {
    const { likeUnlikeTweeah } = useTweeah();
    const { mutate } = likeUnlikeTweeah();

    const [like, setLike] = useState<boolean>(iliked);
    const [likes, setLikes] = useState<number>(likes_count);

    const handleClick = () => {
        const datapost = {
            iliked: like,
        }
        if (like) {
            setLikes((prevCounter) => prevCounter - 1)
        }
        else {
            setLikes((prevCounter) => prevCounter + 1)
        }
        setLike(!like)
        mutate({ id, datapost })
    }

    return (
        <a className="card-link"><i className="fa fa-comment"></i> <AiOutlineHeart style={{ color: like ? 'red' : 'blue' }} onClick={handleClick} /> {likes}</a>
    )
}

export default LikeButton;