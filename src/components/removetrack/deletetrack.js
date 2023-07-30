import React from 'react';

function DeleteTrack({ trackId, onDeleteTrack }) {
  const handleDelete = () => {
    onDeleteTrack(trackId);
  };

  return (
    <button onClick={handleDelete} className='btn-danger'>
      <i className="fas fa-times padding-icon"></i>
      Excluir
    </button>
  );
}

export default DeleteTrack;
