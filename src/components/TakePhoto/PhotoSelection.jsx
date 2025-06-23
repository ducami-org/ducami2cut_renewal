import React from 'react';
import { usePhotoStore } from '../../store/PhotoInfo';
import { PhotoUrl } from '../../styles/bgPhoto';

const PhotoSelection = () => {
  const { setBgPhoto } = usePhotoStore((state) => state.actions);

  const handleSelectPhoto = (photoUrl) => {
    console.log("선택된 배경 이미지:", photoUrl);
    setBgPhoto(photoUrl); // import된 이미지 객체를 직접 저장
  };

  return (
    <div>
      <h3>배경 이미지 선택</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {PhotoUrl.map((photo) => (
          <img
            key={photo.id}
            src={photo.url}
            alt={`배경 ${photo.id}`}
            style={{ 
              width: '100px', 
              height: '75px', 
              cursor: 'pointer',
              objectFit: 'cover'
            }}
            onClick={() => handleSelectPhoto(photo.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoSelection;
