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

const AdsList = () => {

  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState<AdType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [noAdsFoundMessage, setNoAdsFoundMessage] = useState('lOlOLss')

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };
  const toastId = React.useRef(null);

  const fetchAds = async (): Promise<AdType[]> => {
    try {
      const isToastActive = toast.isActive('errorToast')
      if(isToastActive) {
        toast.dismiss({ containerId: "toastContainer" })
      }
      const response = await axios.get('/api/ads');
      setAds(response.data.results)
      return response.data;

    } catch (error) {
      handleApiError(error as AxiosError<ErrorType>);
      return []; 
    } finally {
      setLoading(false);
    }
  };
  const handleFecthFilteredAds = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filterURL = `/api/ads?minPrice=${minPrice}&maxPrice=${maxPrice}&search=${searchQuery}`;
    try {
      const response = await axios.get(filterURL);
      setAds(response.data.results)
      closeDialog();
      return response.data.results;
    } catch (error) {
      handleApiError(error as AxiosError<ErrorType>)
      console.error('Error fetching filtered ads:', error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleApiError = (error: AxiosError<ErrorType>) => {
    if (error.response && error.response.status === 500) {
      toast.error(`An error occured while fetching the data: ${error.message}`, {
        toastId: 'errorToast'
      })
    } else {
      console.error('Unexpected error:', error);
    }
  };

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
                  ads.map((ad) => (
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

