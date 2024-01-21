import { Link } from "react-router-dom";


const DetailsHeader = ({artistId, artistData, songData}) => (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black  sm:h-48 h-28"/>
    <div className="absolute inset-0 flex items-center">
      <img alt="art" src={songData?.result?.images?.coverart} className="sm:w-48 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-nlack"/>
    <div className="ml-5">
      <p className="font-bold sm:text-3xl text-xl text-white">{songData?.result.title}</p>
      <Link to={`/artists/${songData?.result.artists[0].adamid}`}>
      <p className="text-base text-gray-400 mt-2">{songData?.result.subtitle}</p></Link>
      <p className="text-base text-gray-400 mt-2">{songData?.result?.genres?.primary}</p>
    </div>
    </div>
    <div className="w-full sm:h-44 h-24"/>
  </div>
);

export default DetailsHeader;
