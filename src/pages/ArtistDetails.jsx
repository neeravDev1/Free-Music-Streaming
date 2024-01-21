import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, RelatedSongs, DetailsHeader } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery } from "../redux/services/shazam";

const ArtistDetails = () => {
    const dispatch = useDispatch();
    const {id: artistId} = useParams();
    const {isPlaying, activeSong} = useSelector((state)=>state.player)

    const {data: artistData, isFetching: isFetchingArtistDetails, error} = useGetArtistDetailsQuery({artistId})
    // const {data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({songid})
    console.log("songdata", artistData)
    if(isFetchingArtistDetails)
    {
        return <Loader title="loading artist det.."/>
    }
    if(error)
    {
        return <Error/>
    }
    return (
        <div className="flex flex-col">
            <DetailsHeader
            artistId={artistId}
            artistData={artistData}/>

            {/* <RelatedSongs
            data={Object.values(artistData?.songs)}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            /> */}
        </div>
    )
};

export default ArtistDetails;
