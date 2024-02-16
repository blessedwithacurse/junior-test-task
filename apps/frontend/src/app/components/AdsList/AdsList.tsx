'use client'

import React, {useState, useEffect} from 'react';
import './AdsList.css'; 
import axios, { AxiosError } from 'axios';
import { AdType } from '../../types/ad';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import "react-toastify/dist/ReactToastify.css";
import FiltersDialog from '../FiltersDialog/FiltersDialog';
import { useQuery } from "@tanstack/react-query";
import { FilterType } from '../../types/filterType';

const fetchAds = async (filters: FilterType): Promise<AdType[]> => {
  try {
    const response = await axios.get('/api/ads');
    if (!response) {
      throw new Error(`Failed to fetch post`);
    }
    if(Object.keys(filters).length) {

    }
    return response.data.results
  } catch(e) {
    console.error(e)
    throw new Error ('something went wrong') 
  }
};

const AdsList = () => {
  const [filters, setFilters] = useState<FilterType>({})

  const { isPending, error, data } = useQuery({
    queryKey: ["ads", filters],
    queryFn: async () => {
      const data = await fetchAds(filters)
      return data
    },
  })
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };


  if (isPending) return <Loader/>
  if (error) return toast.error(`An error occured while fetching the data: ${error.message}`)

  return (
      <div className='wrapper'>
        <div className='header'>
            <h1 className='title'>List of ads</h1>
            <button onClick={openDialog} className='filters-btn'>
              Filters
            </button>
            {isOpen && (
            <FiltersDialog
              maxPrice={filters.maxPrice}
              minPrice={filters.minPrice}
              search={filters.search}
              onChangeMaxPrice={(e) => setFilters(e.target.value)}
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
      </div>
  );
};

export default AdsList;

