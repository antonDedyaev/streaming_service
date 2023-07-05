import useSWR, { Fetcher } from 'swr';

const fetchFromEndpoint = (endpoint: string) => {
    const fetcher: Fetcher<any> = (url: string) => fetch(url).then((res) => res.json());
    const url = `http://localhost:6125/${endpoint}`;
    const { data } = useSWR(url, fetcher);
    return data;
};

export default fetchFromEndpoint;
