import {TweeahResponse, ListResponse} from '../types'
import useAxios from "../utils/axiosInstance";

const baseUrl = "http://127.0.0.1:8000/api/"

const tweeahAPI = () => {
    const api = useAxios();

    const getList = async ({page}:any): Promise<ListResponse> => {
        const res = await api.get<ListResponse>(baseUrl + `tweeahs/list/?page=${page}`);
        return res.data;
    }

    const getTweeah = async({id}:any): Promise<TweeahResponse> => {        
        const res = await api.get<TweeahResponse>(baseUrl + `tweeahs/${id}/`)
        return res.data
    }

    const postTweeah = async({datapost}: any): Promise<any> => {
        const res = await api.post<any>(baseUrl+ "tweeahs/create/", datapost)
        return res.data;
    }

    const getReplies = async ({id}:any):Promise<any> => {
        const res = await api.get<any>(baseUrl+`tweeahs/${id}/replies/list/`)
        return res.data;
    }

    const postReplie = async({id, datapost}: any): Promise<any> => {
        const res = await api.post<any>(baseUrl+ `tweeahs/${id}/replies/create/`, datapost)
        return res.data;
    }

    const likeTweeah = async({id, datapost}: any): Promise<any> => {
        const res = await api.post<any>(baseUrl + `tweeahs/${id}/like_unlike/`, datapost)
        return res.data;
    }

    return {
        getList,
        postTweeah,
        getTweeah,
        getReplies,
        postReplie,
        likeTweeah,
    }
}

export default tweeahAPI;