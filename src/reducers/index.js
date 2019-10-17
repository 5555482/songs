import { combineReducers } from 'redux';
import songs from '../shared/data.json';


const songsReducer = () => {
    return songs;
};

export default combineReducers({
    songs: songsReducer
});