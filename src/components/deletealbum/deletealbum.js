import React from 'react';

function DeleteAlbum({ albumId, onDeleteAlbum }) {
  const handleDeleteAlbum = async () => {
    try {
      const token = 'joaopedro.viana07@gmail.com';
      const response = await fetch(`https://tiao.supliu.com.br/api/album/${albumId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });

      if (response.ok) {
        onDeleteAlbum(albumId);
        window.location.reload();
        console.log('Album deleted successfully!');
      } else {
        console.error('Failed to delete the album.');
      }
    } catch (error) {
      console.error('Error deleting the album:', error);
    }
  };

  return (
    <div>
      <button onClick={handleDeleteAlbum} className='btn-danger'>
      <i className="fas fa-times padding-icon"></i>
        Deletar Álbum
      </button>
    </div>
  );
}

export default DeleteAlbum;
