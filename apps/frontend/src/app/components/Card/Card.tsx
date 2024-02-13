import React, {useEffect} from 'react';
import './Card.css'; 
import Link from 'next/link';
import LikeIcon from '../../icons/LikeIcon';

interface CardProps {
  id: number;
  title: string;
  thumbnail: string;
  city_name: string;
  link: string
}

const Card: React.FC<CardProps> = ({ title, id, city_name, link, thumbnail }) => {

  return (
    <>
      <div className="card" key={id}>
        <img src={thumbnail} className="thumbnail" />
        <div className='title-container'>
          <Link key={id} className="card-title" href={link}>{title}</Link>
          <LikeIcon/>
        </div>
        <h2 className="card-title">{city_name}</h2>
      </div>
    </>
   
  );
};

export default Card;
