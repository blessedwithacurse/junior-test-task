import React from 'react';
import './FiltersDialog.css';
import CloseIcon from '../../icons/CloseIcon';

interface DialogProps {
  onClose: () => void;
  handleFilterSearch: (e: React.FormEvent<HTMLFormElement>) => {};
  searchParams: URLSearchParams;
}

const FiltersDialog: React.FC<DialogProps> = ({ onClose, handleFilterSearch, searchParams }) => {

  return (
    <div className="dialog-overlay">
      <div className="dialog">
      <div className="close-button" onClick={onClose}><CloseIcon/></div>
        <div className='dialog-content'>
          <form className='form' onSubmit={handleFilterSearch}>
            <div className='input-container'>
              <label className='label'>
                Min Price:
                <input className='input' defaultValue={searchParams.get("minPrice")  ?? ''} type="number" name="minPrice" required />
              </label>
            </div>
            <div className='input-container'>
              <label className='label'>
                Max Price:
                <input type="number" className='input' defaultValue={searchParams.get("maxPrice")  ?? ''} name="maxPrice" required />
              </label>
            </div>
            <div className='input-container'>
              <label className='label'>
                Search:
                <input type="text" className='input' defaultValue={searchParams.get("search")  ?? ''} name="search" required />
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