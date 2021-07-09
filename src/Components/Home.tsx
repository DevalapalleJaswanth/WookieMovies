import React from 'react';
import ReactDom from 'react-dom';
import { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { getAllMovies, getMovie } from '../Services/Services';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { VscSearch } from 'react-icons/vsc';

function Home() {

    const [genres, setGenres] = useState([
        'Action',
        'Adventure',
        'Animation',
        'Biography',
        'Crime',
        'Drama',
        'Family',
        'History',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Thriller'
    ])
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        var data = getAllMovies();
        data.then(resp => { console.log(resp); setMovies(resp.movies); })
    }, [])

    const process = (genre: any) => {
        var List: any = {
            genre: '',
            movies: []
        };
        List.genre = genre;
        List.movies = [];
        movies.map((movie: any, i: any) => {
            movie.genres.forEach((gen: any) => {
                if (gen == genre) {
                    List.movies.push(movie)
                }
            })
        })
        console.log(List.genre)
        console.log(List.movies);
        return List.movies;
    }
    const [name, setName] = useState('')
    const [smovie, setSmovie] = useState([]);
    const [num, setNum] = useState(1);
    const search = (movieName: string) => {
        console.log(movieName);
        var n = getMovie(movieName);
        n.then((resp) => { console.log(resp); setSmovie(resp.movies) })
        console.log(getMovie(movieName), smovie)

    }
    const mystyle: any = { margin: "25px", fontSize: "40px", dispaly: "flex" }
    const gridstyle: any = { xs: 2.2, justifyContent: "center" }
    return (

        <>
            <div style={{ backgroundColor: "rgb(205, 204, 212)" }}>
                <div style={{ backgroundColor: "rgb(27, 5, 168)" }}>
                    <FiberManualRecordIcon fontSize='large' style={{ color: "rgb(257, 27, 27)", fontSize: "50px" }} /> <FiberManualRecordIcon fontSize='large' style={{ color: "rgb(235, 250, 27)", fontSize: "50px" }} /><FiberManualRecordIcon fontSize='large' style={{ color: "rgb(90, 250, 27)", fontSize: "50px" }} />
                </div>
                <p style={mystyle}>WOOKIE<br /> MOVIES<span style={{ margin: "500px" }}></span><VscSearch style={{ margin: "1px" }} onClick={() => { setNum(0); search(name) }} /><input type='text' onChange={(e) => { setName(e.target.value) }} style={{ backgroundColor: "rgb(205, 204, 212)", width: "200px", height: "25px", margin: "0px" }} /></p>
                <hr style={{ backgroundColor: "rgb(0, 0, 0)", height: '4px' }} />
                {
                    (smovie == [] || name == '' || num == 1) ?
                        genres.map(genre => {
                            var List = process(genre);
                            return <div style={{ backgroundColor: "rgb(205, 204, 212)" }}>

                                <br></br>
                                <p style={{ margin: "15px", fontSize: "25px" }}>{genre}</p>
                                <div>

                                    <Grid container direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        spacing={3}
                                        style={{ margin: "10px" }}
                                    >
                                        {
                                            List.map((movie: any, i: any) => (
                                                <Grid style={gridstyle}>
                                                    <Link to={{ pathname: "/Details", state: { movie: movie } }}>
                                                        <Card variant="outlined" style={{ margin: "15px" }}>
                                                            <CardContent>
                                                                <Typography style={{ margin: "5px" }}>
                                                                    <img src={movie.backdrop} width="300" height="100" />
                                                                </Typography>
                                                                <Typography >
                                                                    <p style={{ fontSize: "8px" }}>{movie.title}</p>
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Link>
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                </div>
                            </div>
                        }) : <div>
                            <button onClick={() => { setNum(1) }} style={{ backgroundColor: "rgb(205, 204, 212)" }}>Back</button>
                            {smovie.map((movie: any, i: any) => (
                                <Grid container direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    spacing={3}
                                    style={{ margin: "10px" }}
                                >
                                    <Grid style={gridstyle}>
                                        <Link to={{ pathname: "/Details", state: { movie: movie } }} >
                                            <Card variant="outlined" style={{ margin: "15px" }}>
                                                <CardContent>
                                                    <Typography style={{ margin: "5px" }}>
                                                        <img src={movie.backdrop} width="300" height="100" />
                                                    </Typography>
                                                    <Typography >
                                                        <p style={{ fontSize: "8px" }}>{movie.title}</p>
                                                    </Typography>

                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Grid>
                                </Grid>))}
                        </div>
                }
            </div>
        </>
    )
}
export default Home;