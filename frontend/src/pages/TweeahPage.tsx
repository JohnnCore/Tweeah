import { useNavigate, useParams } from "react-router-dom";
import useTweeah from "../hooks/useTweeah";
import { MouseEvent } from 'react';
import CreateReplie from "./components/CreateReplie";
import LikeButton from "./components/LikeButton";
import BookMarkButton from "./components/BookMark";

import { FaRegComment } from 'react-icons/fa';

const TweeahPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const idNumber = Number(id);

    const handleClick = (e: MouseEvent<HTMLElement>, id: number) => {
        navigate(`/${id}`);
    }

    const { getOneTweeah, getTweeahReplies } = useTweeah();
    const { tweeah, tweeahError, tweeahLoading } = getOneTweeah(idNumber)

    const FillThread = () => {
        return tweeah?.thread?.map((tweeah) => {
            return (
                <div key={tweeah?.id} className="card gedf-card text-light card-css" style={{ border: 0 }}>
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                                </div>
                                <div className="d-flex align-items-center ml-2">
                                    <div className="h5 m-0">@{tweeah?.user?.username}</div>
                                    <div className="small mt-1 ml-3"> <i className="fa fa-clock-o "></i>{tweeah?.created_at}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{marginLeft:'6%'}}>
                        <a href={`/${tweeah?.id}`}>
                            <div className="card-body text-light">
                                <p className="card-text">
                                    {tweeah?.body}
                                </p>
                            </div>
                        </a>
                        <div className="card-footer">
                            <LikeButton id={tweeah?.id} iliked={tweeah?.iliked} likes_count={tweeah?.likes_count} />
                            <a onClick={() => console.log("a")} className="card-link"><i className="fa fa-comment"></i> <FaRegComment /> {tweeah?.replies_count}</a>
                            <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> SHARE</a>
                        </div>
                    </div>
                </div>
            )
        })
    } 

    const FillData = () => {
        if (tweeah?.results) {
            return (
                <div className="card gedf-card text-light card-css card-css2">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                                </div>
                                <div className="d-flex align-items-center ml-2">
                                    <div className="h5 m-0">@{tweeah?.results?.user?.username}</div>
                                    <div className="small mt-1 ml-3"> <i className="fa fa-clock-o "></i>{tweeah?.results?.created_at}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href={`/${tweeah?.results?.id}`}>
                        <div className="card-body text-light">
                            <p className="card-text">
                                {tweeah?.results?.body}
                            </p>
                        </div>
                    </a>
                    <div className="card-footer">
                        <LikeButton id={tweeah?.results?.id} iliked={tweeah?.results?.iliked} likes_count={tweeah?.results?.likes_count} />
                        <a onClick={() => console.log("a")} className="card-link"><i className="fa fa-comment"></i> <FaRegComment /> {tweeah?.results?.replies_count}</a>
                        <BookMarkButton id={tweeah?.results?.id} ibookmarked={tweeah?.results?.ibookmarked} bookmarks_count={tweeah?.results?.bookmarks_count}/>
                        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> SHARE</a>
                    </div>
                </div>
            )
        }
    }

    const { replies, repliesError, repliesLoading } = getTweeahReplies(idNumber)

    const FillReplies = () => {
        return replies?.results?.map((replie) => {
            return (
                <div key={replie?.id} className="card gedf-card text-light card-css">
                <div className="card-header">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                                <img className="rounded-circle" width="45" src="https://picsum.photos/50/50" alt="" />
                            </div>
                            <div className="d-flex align-items-center ml-2">
                                <div className="h5 m-0">@{replie?.user?.username}</div>
                                <div className="small mt-1 ml-3"> <i className="fa fa-clock-o "></i>{replie?.created_at}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{marginLeft:'6%'}}>
                    <a href={`/${replie?.id}`}>
                        <div className="card-body text-light">
                            <p className="card-text">
                                {replie?.body}
                            </p>
                        </div>
                    </a>
                    <div className="card-footer">
                        <LikeButton id={replie?.id} iliked={replie?.iliked} likes_count={replie?.likes_count} />
                        <a onClick={() => console.log("a")} className="card-link"><i className="fa fa-comment"></i> <FaRegComment /> {replie?.replies_count}</a>
                        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> SHARE</a>
                    </div>
                </div>
            </div>
            )
        })
    }


    return (

        <div className="container-fluid gedf-wrapper">
            <div className="row">
                <div className="col-md-6 gedf-main mx-auto">
                    <FillThread />
                    <FillData />
                    <CreateReplie id={idNumber} />
                    <FillReplies />
                </div>
            </div>
        </div>
    )
}



export default TweeahPage;