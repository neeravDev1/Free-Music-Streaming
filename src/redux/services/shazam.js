import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const shazamApi =  createApi({
    reducerPath: 'ShazamApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://shazam-api6.p.rapidapi.com',
      prepareHeaders: (headers)=>{
         headers.set('X-RapidAPI-Key', 'ca1b4a2de1msh07f2f6a7b3364f8p1ed08djsnf6fc1ee8daa4');
         headers.set('X-RapidAPI-Host', 'shazam-api6.p.rapidapi.com');

        return headers;
      }
    }),
    endpoints: (builder)=>{return {
      getTopCharts: builder.query({
        query: ()=>{ return '/shazam/top_tracks_city' }
      }),
      getSongDetails: builder.query({query: ({songid})=>{
        return `shazam/about_track?track_id=${songid}`
      }}),
      getSongRelated: builder.query({query: ({songid})=> {
        console.log("check1", songid)
        return `/shazam/similar_tracks?track_id=${songid}`}}),
        getArtistDetails: builder.query({query: ({artistId})=>{
          return `/shazam/about_artist?artist_id=${artistId}`
        }}),
        getSongsByCountry: builder.query({query: (country)=>{
          return `/shazam/top_tracks_country?country_code=${country}`
        }})
    }}
})

export const {useGetTopChartsQuery, useGetSongDetailsQuery, useGetSongRelatedQuery, useGetArtistDetailsQuery, useGetSongsByCountryQuery} = shazamApi