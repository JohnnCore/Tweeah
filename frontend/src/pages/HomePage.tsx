import { MouseEvent, useEffect } from "react";
import useTweeah from "../hooks/useTweeah";
import CreateTweeah from "./components/Create";
import LikeButton from "./components/LikeButton";
import { useNavigate } from "react-router-dom";
import { FaRegComment } from 'react-icons/fa';

const HomePage = () => {
  const { listAllTweeahs } = useTweeah();
  const { tweeahs, tweeahsError, tweeahsLoading, tweeahsFetch, tweeahsNextPage } = listAllTweeahs();

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {

        if (tweeahsNextPage && !tweeahsLoading) {
          tweeahsFetch();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [tweeahsNextPage, tweeahsLoading, tweeahsFetch]);



  const FillData = () => {
    return tweeahs?.pages.map((page) =>
      page?.results?.map((tweeah) => (

        <div className="card gedf-card text-light card-css">
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
      ))
    );
  };


  return (
    <div className="container-fluid gedf-wrapper">
      <div className="row">
        <div className="col-md-6 gedf-main mx-auto">
          <CreateTweeah />

          <FillData />

        </div>
      </div>
    </div>
  );
};

export default HomePage;
