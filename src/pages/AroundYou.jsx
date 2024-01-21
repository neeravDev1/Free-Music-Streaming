import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useGetSongsByCountryQuery } from '../redux/services/shazam';
import { Error, Loader, SongCard } from '../components';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  console.log("country", country)
  const { data, isFetching ,isError } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_0mtprSrx0PcQuymAmLaUu3aRNTuRY')
      .then((res) => {
        const newCountry = res?.data?.location?.country;
        console.log('New Country:', newCountry);
        setCountry(newCountry);
        setLoading(false); // Move setLoading(false) here to set it after setting the country
      })
      .catch((error) => {
        console.error('Error fetching country:', error);
        setLoading(false); // Handle error by setting loading to false
      });
  }, []); // Empty dependency array to fetch country only once during component mount

  if (loading || isFetching) {
    return <Loader title="Loading songs around you" />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Around You <span className="font-back">{country}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.result?.tracks.map((song) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
