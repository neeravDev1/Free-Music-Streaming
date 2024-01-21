import SongBar from "./SongBar";

const RelatedSongs = ({data, isPlaying, activeSong, handlePauseClick, handlePlayClick, artistId}) => {
  console.log("check2", data)
  return (<div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">related songs:</h1>
    <div className="mt-6 w-full flex flex-col">
      {data?.map((song, i)=> (
        <SongBar key={`${song.key}-${artistId}`}
        song={song}
        i={i}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        />

      ))
    }
    </div>
  </div>
)};

export default RelatedSongs;
