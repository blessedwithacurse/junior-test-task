'use client'

import React, {useState, useEffect} from 'react';
import './AdsList.css'; 
import axios, { AxiosError } from 'axios';
import { AdType } from '../../types/ad';
import { ErrorType } from '../../types/error';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import "react-toastify/dist/ReactToastify.css";
import FiltersDialog from '../FiltersDialog/FiltersDialog';
import { useQuery } from "@tanstack/react-query";

const fetchAds = async (): Promise<AdType[]> => {
  try {
    const response = await axios.get('/api/ads');
    if (!response) {
      throw new Error(`Failed to fetch post`);
    }
    return response.data.results
  } catch(e) {
    console.error(e)
    throw new Error ('something went wrong') 
  }
};

const AdsList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["ads"],
    queryFn: fetchAds
  })
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<AdType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const toastId = React.useRef(null);

  // const notify = () => toastId.current = toast.error('error');

  // const dismiss = () =>  toast.dismiss(toastId.current);

  const handleFecthFilteredAds = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterURL = `/api/ads?minPrice=${minPrice}&maxPrice=${maxPrice}&search=${searchQuery}`;
    try {
      const response = await axios.get(filterURL);
      setAds(response.data.results)
      closeDialog();
      return response.data.results;
    } catch (error) {
      console.error('Error fetching filtered ads:', error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);


  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message

  return (
      <div className='wrapper'>
        <div className='header'>
            <h1 className='title'>List of ads</h1>
            <button onClick={openDialog} className='filters-btn'>
              Filters
            </button>
            {isOpen && (
            <FiltersDialog
              maxPrice={maxPrice}
              minPrice={minPrice}
              city={city}
              district={district}
              search={searchQuery}
              handleFilterSearch={handleFecthFilteredAds}
              onChangeMaxPrice={(e) => setMaxPrice(e.target.value)}
              onChangeMinPrice={(e) => setMinPrice(e.target.value)}
              onChangeSearchQuery={(e) => setSearchQuery(e.target.value)}
              onClose={closeDialog}/>
            )}
        </div>
          <div className='ads-container-wrapper'>
            <div className='ads-container'>
                {
                  data.map((ad) => (
                    <>
                      <Card 
                        title={ad.title}
                        link={`/ads/${ad.id}`}
                        id={ad.id}
                        city_name={ad.city_name ? ad.city_name : ad.district_name}
                        thumbnail={ad.images.length > 0 ? ad.images[0].thumbnail : ''}
                    />
                  </>
                ))}
            </div>
          </div>
          {/* <div className='no-ads-msg-container'>
            <span className='no-ads-msg'>
              {noAdsFoundMessage ? noAdsFoundMessage : ''}
            </span>
          </div> */}
        <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            containerId={'toastContainer'}
            pauseOnHover
            theme="dark"
        />
        {loading && <Loader />}
    </div>
  );
};

export default AdsList;

