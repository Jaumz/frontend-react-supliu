import React, { useState } from 'react';
import './list.css'
import AddTrack from '../addtrack/addtrack';
import DeleteTrack from '../removetrack/deletetrack';
import DeleteAlbum from '../deletealbum/deletealbum';

function List({ filteredAlbums, onAddTrack, onDeleteTrack }) {

  const handleDeleteTrack = async (trackId) => {
    try {
      const response = await fetch(`https://tiao.supliu.com.br/api/track/${trackId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'joaopedro.viana07@gmail.com',
        },
      });

      if (response.status === 204) {
        window.location.reload();
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.log('Error occurred while deleting the track:', error.message);
    }
  };

  const [albums, setAlbums] = useState(filteredAlbums);

  const handleDeleteAlbum = (albumId) => {
    const updatedAlbums = albums.filter((album) => album.id !== albumId);
    setAlbums(updatedAlbums);
  };

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className='scrollable' style={{ maxHeight: '300px', overflow: 'auto' }}>
      {filteredAlbums.length > 0 ? (
        <ul>
          {filteredAlbums.map((album) => (
            <li key={album.id}>
              <strong>{`Álbum: ${album.name}, ${album.year}`}</strong>
              <AddTrack albumId={album.id} onAddTrack={onAddTrack} />
              <DeleteAlbum albumId={album.id} onDeleteAlbum={handleDeleteAlbum} />
              <ul>
                {album.tracks.map((track) => (
                  <li key={track.id}>
                    <div className='info-list'>
                      <div className='space-between'>
                        <p>Nº</p>
                        <span className='text-grey'>{track.number}</span>
                      </div>
                      <div className='space-between'>
                        <p>Faixa</p>
                        <span className='text-grey'>{track.title}</span>
                      </div>
                      <div className='space-between'>
                        <span>Duração</span>
                        <p className='text-grey'>{formatTime(track.duration)}
                        <DeleteTrack trackId={track.id} onDeleteTrack={handleDeleteTrack} /></p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nada encontrado.</p>
      )}
    </div>
  );
}

export default List;
