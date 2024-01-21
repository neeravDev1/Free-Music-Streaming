import {FaPauseCircle, FaPlayCircle} from 'react-icons/fa';


const PlayPause = ({isPlaying, activeSong, song, handlePause, handlePlay}) => {
  console.log("hello", isPlaying, activeSong)
  if(isPlaying && activeSong?.title === song.title)
  {
    console.log("1")
    return <FaPauseCircle size={35} className='text-gray-300' onClick={handlePause}/>
  }
  console.log("2")
  return <FaPlayCircle  size={35} className='text-gray-300' onClick={handlePlay}/>
};

export default PlayPause;
