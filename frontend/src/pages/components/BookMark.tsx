import { useState } from 'react';
import { BsBookmark } from 'react-icons/bs';
import useTweeah from '../../hooks/useTweeah';

type PropsType = {
    id: number,
    ibookmarked: boolean,
    bookmarks_count: number,
}

const BookMarkButton = ({ id, ibookmarked, bookmarks_count }: PropsType) => {
    const { bookMarkTweeah } = useTweeah();
    const { mutate } = bookMarkTweeah();

    const [bookmark, setBookMark] = useState<boolean>(ibookmarked);
    const [bookmarks, setBookMarks] = useState<number>(bookmarks_count);

    const handleClick = () => {
        const datapost = {
            ibookmarked: bookmark,
        }
        if (bookmark) {
            setBookMarks((prevCounter) => prevCounter - 1)
        }
        else {
            setBookMarks((prevCounter) => prevCounter + 1)
        }
        setBookMark(!bookmark)
        mutate({ id, datapost })
    }

    return (
        <a className="card-link"><i className="fa fa-comment"></i> <BsBookmark style={{ color: bookmark ? 'red' : 'blue' }} onClick={handleClick} /> {bookmarks}</a>
    )
}

export default BookMarkButton;