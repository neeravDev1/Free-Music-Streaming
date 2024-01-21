import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazam";

const SongDetails = () => {
    const dispatch = useDispatch();
    const {songid} = useParams();
    const {isPlaying, activeSong} = useSelector((state)=>state.player)

    const {data: songData, isFetching: isFetchingSongDetails} = useGetSongDetailsQuery({songid})
    const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid})
    console.log("songdata", songData)
    const handlePauseClick = ()=>{
        dispatch(playPause(false))
      }
    
      const handlePlayClick = (song, i)=>{
        console.log("33", song)
        dispatch(setActiveSong({song, data}))
        dispatch(playPause(true))
      }
    if(isFetchingRelatedSongs)
    {
        return <Loader title="searching.."/>
    }
    if(error)
    {
        return <Error/>
    }
    return (
        <div className="flex flex-col">
            <DetailsHeader
            songData={songData}/>

            <div className="mb-10">
                <h1 className="text-white text-3xl font-bold" >lyrics</h1>
                <div className="mt-5">
                    {songData?.result?.sections?.length>1 && (songData?.result?.sections[1].type==='LYRICS' ? songData?.result.sections[1].text.map((line, i)=> <p className="text-gray-400 text-base my-1">{line}</p>):<p>sorry, no lyrics</p>)}
                </div>
            </div>
            <RelatedSongs
            data={data?.result?.tracks}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            />
        </div>
    )
};

export default SongDetails;
