import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from "react-query";
import tweeahAPI from "../api/tweeah";
import { ListResponse, TweeahResponse } from "../types";

const useTweeah = () => {
    const queryClient = useQueryClient()

    const { getList, getTweeah, postTweeah, getReplies, postReplie, likeTweeah } = tweeahAPI();

    // Use the useQuery directly to fetch data
    const listAllTweeahs = () => {
        const { data: tweeahs, error: tweeahsError, isLoading: tweeahsLoading, fetchNextPage: tweeahsFetch, hasNextPage: tweeahsNextPage,
        } = useInfiniteQuery<ListResponse, any>(
            "tweeahs",
            ({ pageParam = 1 }) => getList({ page: pageParam }),
            {
                refetchOnWindowFocus: false,
                getNextPageParam: (lastPage) => {
                    if (lastPage.results && lastPage.results.length > 0) {
                        const currentPage = lastPage.current_page;
                        if (currentPage < lastPage.total_pages) {
                            return currentPage + 1;
                        }
                    }
                    return undefined;
                },
            }
        );

        return {
            tweeahs,
            tweeahsError,
            tweeahsLoading,
            tweeahsFetch,
            tweeahsNextPage,
        };
    };

    const getOneTweeah = (id: number) => {
        const { data: tweeah, error: tweeahError, isLoading: tweeahLoading } = useQuery<TweeahResponse, any>(
            ["tweeah", id], // Query key
            () => getTweeah({ id }),    // Query function
            {
                refetchOnWindowFocus: false, // Impede que o useQuery seja acionado ao voltar para a aba
            }
        );
        return {
            tweeah, tweeahError, tweeahLoading
        }
    }

    const createTweeah = () => {
        const { mutate, error } = useMutation(
            "create",
            postTweeah,
        )
        return {
            mutate,
            error
        }
    }

    const getTweeahReplies = (id: number) => {
        const { data: replies, error: repliesError, isLoading: repliesLoading } = useQuery<ListResponse, any>(
            ["replies", id],
            () => getReplies({ id }),
            {
                refetchOnWindowFocus: false, // Impede que o useQuery seja acionado ao voltar para a aba
            }
        );
        return {
            replies, repliesError, repliesLoading
        }
    }

    const createReplie = () => {
        const { mutate, error } = useMutation(
            "createReplie",
            postReplie,
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(['replies']); // Certifique-se de que a chave corresponda à query de respostas
                },
            }
        )
        return {
            mutate,
            error
        }
    }

    const likeUnlikeTweeah = () => {
        const { mutate, error } = useMutation(
            "likeUnlikeTweeah",
            likeTweeah,
            {
                // onSuccess: () => {
                //     queryClient.invalidateQueries(['tweeah']); // Certifique-se de que a chave corresponda à query de respostas
                // },
            }
        )
        return {
            mutate,
            error,
        }
    }

    return {
        listAllTweeahs,
        getOneTweeah,
        createTweeah,
        getTweeahReplies,
        createReplie,
        likeUnlikeTweeah
    };
};

export default useTweeah;
