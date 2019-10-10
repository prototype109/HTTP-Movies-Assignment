import React, { useState, useEffect } from 'react';
import axios from 'axios';

const formStyle = {
    margin: '0 auto',
    maxWidth: '200px',
    display: 'flex',
    flexDirection: 'column'
}

const MovieUpdateForm = props => {
    const [movieToEdit, setMovieToEdit] = useState({});
    
    useEffect(() => {
        const movieId = props.match.params.id;
        axios
            .get(`http://localhost:5000/api/movies/${movieId}`)
            .then(res => {
                setMovieToEdit(res.data);
            })
            .catch(err => console.log(err.response));
    }, [props.match.params.id]);

    const handleInput = e => {
        setMovieToEdit({...movieToEdit, 
                        [e.target.name]: e.target.value});
    }

    const handleStarsInput = (e, index) => {
        const tempArr = movieToEdit.stars;
        tempArr[index] = e.target.value;
        setMovieToEdit({...movieToEdit, [e.target.name]: tempArr});
    }

    const handleUpdateSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movieToEdit.id}`, movieToEdit)
            .then(res => props.history.push(`/movies/${movieToEdit.id}`))
            .catch(err => console.log('Error: ', err));
    }

    return(
        <form style={formStyle} onSubmit={handleUpdateSubmit}>
            <input type='text' 
                   name='title' 
                   value={movieToEdit.title}
                   onChange={handleInput}/>
            <input type='text' 
                    name='director' 
                    value={movieToEdit.director}
                    onChange={handleInput}/>
            <input type='text' 
                   name='metascore' 
                   value={movieToEdit.metascore}
                   onChange={handleInput}/>
            {
                typeof movieToEdit.stars !== 'undefined' ?
                movieToEdit.stars.map((star, index) => {
                    return <input type='text' 
                                name='stars' 
                                value={star}
                                onChange={(e) => handleStarsInput(e, index)}/> 
                }) : null
            }
            <button type='submit'>Submit</button>
        </form>
    )
}

export default MovieUpdateForm;