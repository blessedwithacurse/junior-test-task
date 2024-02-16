import React, { useEffect, useState } from 'react';
import { AdType } from '../../types/ad';
import axios from 'axios';
import Loader from '../Loader/Loader';
import "react-toastify/dist/ReactToastify.css";
import './AdDetails.css'
import LikeIcon from '../../icons/LikeIcon';
import Carousel from '../Carousel/Carousel';
import {
  useQuery,
} from '@tanstack/react-query'
import { useParams } from 'next/navigation'

interface AdDetailsProps {
  adId: number;
}

const fetchAdDetails = async (adId: string | undefined): Promise<AdType | null> => {
  try {
    const response = await axios.get(`/api/ads/${adId}`);
    if (!response) {
      throw new Error(`Failed to fetch ad`);
    }
    return response.data;
  } catch(e) {
    console.error(e)
    throw new Error ('something went wrong') 
  }
}

const AdDetails: React.FC<AdDetailsProps> = ({ adId }) => {
  const params = useParams<{ adId: string }>()

  const { isPending, error, data } = useQuery({
    queryKey: ['post', params.adId],
    queryFn: () => fetchAdDetails(params.adId),
    enabled: !!params.adId
  })
  if (isPending) return <Loader/>
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className='wrapper'>
      <Carousel images={data?.images.map(i => i.image)}/>
      <div className='title-container'>
        <h1 className='title'>{data?.title}</h1>
        <LikeIcon/>
      </div>
      <div className='location-container'>
        <label className='label'>{data?.city_name + ','}</label>
        <label className='label'>{data?.district_name + ','}</label>
        <p className='price-label'>Price: {data?.price}</p>
      </div>
      <div className='description-container'>
        <p>Description:</p>
        <p>{data?.description}</p>
      </div>
    </div>
  )
}
export default AdDetails;