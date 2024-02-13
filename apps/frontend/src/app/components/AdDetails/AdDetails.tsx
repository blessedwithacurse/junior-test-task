import React, { useEffect, useState } from 'react';
import { AdType } from '../../types/ad';
import axios, {AxiosError} from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { ErrorType } from '../../types/error';
import Loader from '../Loader/Loader';
import "react-toastify/dist/ReactToastify.css";
import './AdDetails.css'
import LikeIcon from '../../icons/LikeIcon';
import Carousel from '../Carousel/Carousel';

interface AdDetailsProps {
  adId: number;
}

const AdDetails: React.FC<AdDetailsProps> = ({ adId }) => {
  const [adDetails, setAdDetails] =  useState<AdType>([])
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true);

  const fetchAdDetails = async (adId: number | undefined): Promise<AdType | null> => {
    try {
      const response = await axios.get(`/api/ads/${adId}`);
      setAdDetails(response.data);
      setImages(response.data.images)
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorType>);
      return null;
    } finally {
      setLoading(false);
    }
  }
  
  const handleApiError = (error: AxiosError<ErrorType>) => {
    if (error.response) {
      toast.error(`An error occured while fetching the data: ${error.message}`)
    } else {
      console.error('Unexpected error:', error);
    }
  };

  useEffect(() => {
    fetchAdDetails(adId)
  }, []);

  return (
    <div className='wrapper'>
      <Carousel images={images.map(i => i.image)}/>
      <div className='title-container'>
        <h1 className='title'>{adDetails.title}</h1>
        <LikeIcon/>
      </div>
      <div className='location-container'>
        <label className='label'>{adDetails.city_name + ','}</label>
        <label className='label'>{adDetails.district_name + ','}</label>
        <p className='price-label'>Price: {adDetails.price}</p>
      </div>
      <div className='description-container'>
        <p>Description:</p>
        <p>{adDetails.description}</p>
      </div>
      <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
        />
        {loading && <Loader />}
    </div>
  )
}
export default AdDetails;