import {Error, Loader, SongCard} from '../components'
import {genres} from '../assets/constants'
import { useGetTopChartsQuery } from '../redux/services/shazam';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
const Discover = () => 
{
    const [selectedGenre, setSelectedGenre] = useState('');
    const dispatch = useDispatch();
        const {activeSong, isPlaying} = useSelector((state)=>{
            return state.player
        });
    const {data, isFetching, error} = useGetTopChartsQuery();
    const genreTitle = 'Pop';
    if(isFetching || error|| !data)
    {
        return <Loader title="loading songs..."/>
    }
    console.log("check this", data)
    // console.log(genres)

    console.log("data", data)
    const handleGenreChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedGenre(selectedValue);
        // You can perform additional actions based on the selected genre if needed
      };
    return (
<div className='flex flex-col'>
    <div className='w-full flex justify-between items-center flex-row mt-4 mb-10'>
        <h2 className='font-bold text-3xl text-white text-left'>Discover</h2>
        <select
            onChange = {(e)=>{handleGenreChange(e)}}
            value={selectedGenre}
            className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
            {genres.map((genre)=>{
                return (<option key={genre.value} value={genre.value}>{genre.title}</option>)
            })}
        </select>
    </div>
    <div className='flex flex-wrap sm:justify-start justify-center gap-8'>{data.result.tracks.map((song, i)=>{
         console.log("hey", isPlaying, song)
            return (<SongCard key={song.key}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data = {data.result}
                ></SongCard>)
        })}</div>
</div>
    )
}

export default Discover;
