import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieUpdateForm = props => {
    const [movieToEdit, setMovieToEdit] = useState([]);
    useEffect(() => {
        const movieId = props.match.params.id;
        axios
            .get(`http://localhost:5000/api/movies/${movieId}`)
            .then(res => {
                console.log('RES FROM UPDATE FORM: ', res);
            })
            .catch(err => console.log(err.response));
    }, [props.match.params.id]);

    return(
        <form>
            <input type='text' 
                   name='title' 
                   value='fixed'/>
        </form>
    )
}

export default MovieUpdateForm;