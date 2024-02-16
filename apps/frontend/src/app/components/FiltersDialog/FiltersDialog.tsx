import React, { useState, useEffect } from 'react';
import './FiltersDialog.css';
import axios from 'axios';
import CloseIcon from '../../icons/CloseIcon';
import AdsList from '../AdsList/AdsList';

interface DialogProps {
  onClose: () => void;
  handleFilterSearch: (e: React.FormEvent<HTMLFormElement>) => {};
  minPrice: number;
  maxPrice: number;
  search: string;
  city?: string;
  district?: string;
  onChangeMinPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMaxPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FiltersDialog: React.FC<DialogProps> = ({ onClose, onChangeMaxPrice, onChangeMinPrice, onChangeSearchQuery, handleFilterSearch, maxPrice, minPrice, city, district, search }) => {

  return (
    <div className="dialog-overlay">
      <div className="dialog">
      <div className="close-button" onClick={onClose}><CloseIcon/></div>
        <div className='dialog-content'>
          <form className='form' onSubmit={handleFilterSearch}>
            <div className='input-container'>
              <label className='label'>
                Min Price:
                <input className='input' type="number" required value={minPrice} onChange={onChangeMinPrice} />
              </label>
            </div>
            <div className='input-container'>
              <label className='label'>
                Max Price:
                <input type="number" className='input' required value={maxPrice} onChange={onChangeMaxPrice} />
              </label>
            </div>
            <div className='input-container'>
              <label className='label'>
                Search:
                <input type="text" className='input' required value={search} onChange={onChangeSearchQuery} />
              </label>
            </div>
            {/* 
            <div className='input-container'>
              <label className='label'>
                City:
                <input type="text" className='input' value={city} onChange={onChangeInput} />
              </label>
            </div> */}
            <div className='input-container'>
              <label className='label'>
                District:
                {/* <input type="text" className='input' value={district} onChange={(e) => setDistrict(e.target.value)} /> */}
              </label>
            </div>
            <div className='apply-btn-container'>
              <button className='apply-btn' type="submit">Apply Filters</button>
            </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default FiltersDialog;