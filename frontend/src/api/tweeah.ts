import { TweeahResponse, ListResponse } from '../types'
import useAxios from "../utils/axiosInstance";

const baseUrl = "http://127.0.0.1:8000/api/"

type PropsType = {
    page?: number,
    id?: number,
    datapost?: object,
}

const tweeahAPI = () => {
    const api = useAxios();

    const getList = async ({ page }: PropsType): Promise<ListResponse> => {
        const res = await api.get<ListResponse>(baseUrl + `tweeahs/list/?page=${page}`);
        console.log(res.data);
        return res.data;
    }

    const getTweeah = async ({ id }: PropsType): Promise<TweeahResponse> => {
        const res = await api.get<TweeahResponse>(baseUrl + `tweeahs/${id}/`)
        return res.data
    }

    const postTweeah = async ({ datapost }: PropsType): Promise<any> => {
        const res = await api.post<any>(baseUrl + "tweeahs/create/", datapost)
        return res.data;
    }

    const getReplies = async ({ id }: PropsType): Promise<any> => {
        const res = await api.get<any>(baseUrl + `tweeahs/${id}/replies/list/`)
        return res.data;
    }

    const postReplie = async ({ id, datapost }: PropsType): Promise<any> => {
        const res = await api.post<any>(baseUrl + `tweeahs/${id}/replies/create/`, datapost)
        return res.data;
    }

    const likeTweeah = async ({ id, datapost }: PropsType): Promise<any> => {
        const res = await api.post<any>(baseUrl + `tweeahs/${id}/like_unlike/`, datapost)
        return res.data;
    }

    const bookmarkTweeah = async ({ id, datapost }: PropsType) => {
        const res = await api.post(baseUrl+ `tweeahs/${id}/bookmark/`, datapost)
        return res.data;
    }

    return {
        getList,
        postTweeah,
        getTweeah,
        getReplies,
        postReplie,
        likeTweeah,
        bookmarkTweeah,
    }
}

export default tweeahAPI;