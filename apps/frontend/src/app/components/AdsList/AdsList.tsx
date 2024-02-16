'use client';

import React, { useState } from 'react';
import './AdsList.css';
import axios from 'axios';
import { AdType } from '../../types/ad';
import Loader from '../Loader/Loader';
import Card from '../Card/Card';
import 'react-toastify/dist/ReactToastify.css';
import FiltersDialog from '../FiltersDialog/FiltersDialog';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';

const fetchAds = async (filters: URLSearchParams): Promise<AdType[]> => {
  try {
    const response = await axios.get(`/api/ads?${filters}`);
    if (!response) {
      throw new Error(`Failed to fetch adss`);
    }
    return response.data.results;
  } catch (e) {
    console.error(e);
    throw new Error('something went wrong');
  }
};

const AdsList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['ads', searchParams.toString()],
    queryFn: async () => fetchAds(searchParams),
  });

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  if (isPending) return <Loader />;
  if (error)
    return `An error occured while fetching the data: ${error.message}`;

  const handleFecthFilteredAds = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    for (const [key, value] of formData.entries()) {
      if (typeof value === 'string' && value.trim() !== '') {
        params.append(key, value);
      }
    }
    router.replace(`?${params.toString()}`);
    closeDialog();
  };

  return (
    <div className="wrapper">
      <div className="header">
        <h1 className="title">List of ads</h1>
        <button onClick={openDialog} className="filters-btn">
          Filters
        </button>
        {isOpen && (
          <FiltersDialog
            handleFilterSearch={handleFecthFilteredAds}
            searchParams={searchParams}
            onClose={closeDialog}
          />
        )}
      </div>
      <div className="ads-container-wrapper">
        <div className="ads-container">
          {data.map((ad) => (
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
    </div>
  );
};

export default AdsList;
