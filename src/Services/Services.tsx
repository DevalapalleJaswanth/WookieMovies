import axios from 'axios';
export async function getAllMovies() {
    var data: any = [];
    await axios.get(`https://wookie.codesubmit.io/movies`, { headers: { 'Authorization': 'Bearer Wookie2021' } })
        .then(resp => { console.log(resp.data); data = resp.data })
    return data;
}

export async function getMovie(movieName: any) {
    var data: any;
    await axios.get(`https://wookie.codesubmit.io/movies?q=<${movieName}>`, { headers: { 'Authorization': 'Bearer Wookie2021' } })
        .then(resp => { console.log(resp.data); data = resp.data })
    return data;
}