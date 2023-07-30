import React, { useState } from 'react';

function NewAlbum({ onCreateAlbum }) {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!name.trim() || !year.trim()) {
      return;
    }

    onCreateAlbum(name.trim(), year.trim());
    setName('');
    setYear('');
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <button onClick={openModal}>
      <i className="fas fa-plus padding-icon"></i>
      Create New Album</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Criar novo álbum</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>Nome do Álbum:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label>Ano:</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div>
                <button type="submit">Criar Álbum</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewAlbum;
