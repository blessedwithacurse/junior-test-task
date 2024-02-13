import React, {useEffect} from 'react';
import ThumbnailInterface from '../../interfaces/thumbnailInterace';

interface ThumbnailProps {
  thumbnail: ThumbnailInterface[];
}

const Thumbnail: React.FC<ThumbnailProps> = ({ thumbnail}) => {
  useEffect(() => {
    console.log(thumbnail)
  }, [])
  return (
    <>
     {thumbnail.map(item => (
      <div id={item.id}>
        <img src={item.thumbnail} className="thumbnail" />
      </div>
      ))}
    </>
   
  );
};

export default Thumbnail;
