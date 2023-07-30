import React, { useState, useEffect } from 'react';
import './container.css';
import Logo from '../../assets/logo.png';
import apiKey from '../../service/api';
import List from '../list/list';
import NewAlbum from '../newalbum/newalbum';

function Container() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [allAlbums, setAllAlbums] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);

  useEffect(() => {
    const token = 'joaopedro.viana07@gmail.com';
    const headers = {
      Authorization: token,
    };

    apiKey.get('/album', { headers })
      .then(({ data }) => {
        setAllAlbums(data.data);
        setFilteredAlbums(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearch = () => {
    const filteredData = filterData();
    setFilteredAlbums(filteredData);
  };

  const filterData = () => {
    if (searchKeyword === '') {
      return allAlbums;
    }

    return allAlbums.reduce((filteredAlbums, album) => {
      const filteredTracks = album.tracks.filter(
        (track) =>
          track.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );

      if (
        album.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        album.year.toString().includes(searchKeyword) ||
        filteredTracks.length > 0
      ) {
        filteredAlbums.push({
          ...album,
          tracks: filteredTracks,
        });
      }

      return filteredAlbums;
    }, []);
  };

  const createNewAlbum = (name, year) => {
    const token = 'joaopedro.viana07@gmail.com';
    const headers = {
      'Content-type': 'application/json',
      Authorization: token,
    };

    const albumData = {
      name: name,
      year: year,
    };

    apiKey
      .post('/album', albumData, { headers })
      .then(({ data }) => {
        console.log('New album created with ID:', data.id);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error creating the album:', error);
      });
  };


  return (
    <div className="background-container">
      <div className="card">
        <div className="header">
          <img src={Logo} alt="Logo on the left side of the header" />
          <h2 className="text-header">Discografia</h2>
        </div>
        <div className="card-content">
          <p>Digite uma palavra chave:</p>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button className="search" onClick={handleSearch}>
            Procurar
          </button>
          <List filteredAlbums={filteredAlbums} />
          <NewAlbum onCreateAlbum={createNewAlbum} />
        </div>
      </div>
    </div>
  );
}

export default Container;
