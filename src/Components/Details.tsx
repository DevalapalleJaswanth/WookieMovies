import React from 'react';
import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { useState } from 'react';
import { getAllMovies, getMovie } from '../Services/Services';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { VscSearch } from 'react-icons/vsc';
function Details(props: any) {
    const [movie, setMovie] = useState<any>(props.location.state.movie)
    const [name, setName] = useState<any>('')
    const [smovie, setSmovie] = useState<any>([]);
    const [num, setNum] = useState(1);
    const search = (movieName: any) => {
        console.log(movieName);
        var n = getMovie(movieName);
        n.then((resp) => { console.log(resp); setSmovie(resp.movies) })
        console.log(getMovie(movieName), smovie)

    }
    const mystyle: any = { margin: "25px", fontSize: "40px", dispaly: "flex" }
    const gridstyle: any = { xs: 2.2, justifyContent: "center" }
    return (
        <>
            {console.log(props.location, movie)}

            <div style={{ backgroundColor: "rgb(205, 204, 212)" }}>
                <div style={{ backgroundColor: "rgb(27, 5, 168)" }}>
                    <FiberManualRecordIcon fontSize='large' style={{ color: "rgb(257, 27, 27)", fontSize: "50px" }} /> <FiberManualRecordIcon fontSize='large' style={{ color: "rgb(235, 250, 27)", fontSize: "50px" }} /><FiberManualRecordIcon fontSize='large' style={{ color: "rgb(90, 250, 27)", fontSize: "50px" }} />
                </div>
                <p style={mystyle}>WOOKIE<br /> MOVIES<span style={{ margin: "500px" }}></span><VscSearch style={{ margin: "1px" }} onClick={() => { setNum(0); search(name) }} /><input type='text' onChange={(e) => { setName(e.target.value) }} style={{ backgroundColor: "rgb(205, 204, 212)", width: "200px", height: "25px", margin: "0px" }} /></p>
                <hr style={{ backgroundColor: "rgb(0, 0, 0)", height: '4px' }} />
                {
                    (smovie == [] || smovie == '' || name == '' || num == 1) ?
                        <div style={{ backgroundColor: "rgb(205, 204, 212)" }}>
                            <br></br>
                            <br></br>
                            <Link to='/' style={{ margin: "25px", fontSize: "20px", textDecoration: "none" }}>Back</Link>
                            <br></br>
                            <br></br>
                            <div style={{ margin: "25px", backgroundColor: "rgb(205, 204, 212)", display: "flex" }}>
                                <div style={{ backgroundColor: "rgb(205, 204, 212)" }}>
                                    <img src={movie.backdrop} width="420" height="450" />
                                </div>
                                <div style={{ margin: "25px", backgroundColor: "rgb(205, 204, 212)" }}>
                                    <p style={{ fontSize: "30px" }}>{movie.title}</p>
                                    <p><span>{movie.released_on.substring(0, 4)}</span>|<span>{movie.length}</span>|<span>{movie.director}</span></p>
                                    <p>Cast : {
                                        movie.cast.map((item: any, i: any) => (
                                            <span>{i != movie.cast.length - 1 ? item + "," : item}</span>
                                        ))

                                    } </p>
                                    <p ><span style={{ fontSize: "20px" }}>Movie Description :</span> <br></br>{movie.overview}</p>
                                </div>
                            </div>
                        </div> : <div>
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
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>

        </>
    )
}
export default Details;