import React, { useState } from 'react';
import './addtrack.css';
import apiKey from '../../service/api';

function AddTrack({ albumId, onAddTrack }) {
  const [title, setTitle] = useState('');
  const [number, setNumber] = useState('');
  const [duration, setDuration] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    if (!title.trim() || !number.trim() || !duration.trim()) {
      setError('All fields are required.');
      return;
    }
  
    setError('');
  
    const token = 'joaopedro.viana07@gmail.com';
    const headers = {
      Authorization: token,
    };
  
    const trackData = {
      album_id: albumId,
      number: parseInt(number),
      title: title.trim(),
      duration: parseInt(duration),
    };
  
    apiKey
      .post('/track', trackData, { headers })
      .then(({ data }) => {
        onAddTrack(albumId, data);
        setTitle('');
        setNumber('');
        setDuration('');
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error adding track:', error);
        window.location.reload();
      });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError('');
  };

  return (
    <div>
      <button onClick={openModal}>
        <i className="fas fa-plus padding-icon"></i>
        Adicionar Faixa</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Adicionar Faixa</h2>
            <h4>Duração em segundos, por favor. O sistema atualizará para minutos quando a faixa for salva.</h4>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Título:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label>Nº:</label>
                <input
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div>
                <label>Duração:</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Adicionar Faixa</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTrack;
