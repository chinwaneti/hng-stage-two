import axios from "axios";

const apiKey = "3def9133164838ebfab4e3e0f0062aa4"; // Corrected API key
const apiUrl = 'https://api.themoviedb.org/3';

async function Fetch(){
    try {
        const response = await axios.get(`${apiUrl}/movie/top`, {
            params: {
                api_key: apiKey, // Corrected parameter name to 'api_key'
            },
        });

        const movies = response.data.results;
        return movies;
    } catch (error) {
        console.error('Request data is abnormal, please try again', error);
        throw error;
    }
}

export default Fetch;
