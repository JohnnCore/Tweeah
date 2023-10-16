import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import TweeahList from '../components/TweeahList';
import useTweeah from '../hooks/useTweeah';

const HomePage = () => {
    const { tweeahs, hasMore, loadTweeahs } = useTweeah(0, false, true, false);
    const [currentPage, setCurrentPage] = useState(1); 

    const loadMoreTweeahs = (page) => {
        setCurrentPage(page);
        loadTweeahs(page);
    };

    return (
        <div className="home">
            <InfiniteScroll
                dataLength={tweeahs.length}
                next={()=>loadMoreTweeahs(currentPage+1)}
                hasMore={hasMore}
                scrollThreshold={0.8}
            >
                <div style={{ display: 'flex' }}>
                    <ul>
                        {tweeahs.map((data) => (
                            <TweeahList key={data.id} item={data} />
                        ))}
                    </ul>
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default HomePage;
