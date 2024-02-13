'use client'
import React from 'react';
import AdDetails from '../../components/AdDetails/AdDetails';

function AdDetailsPage ({ params }) {
  return (
    <div>
      <AdDetails adId={params.adId}/>
    </div>
  );
};

export default AdDetailsPage;
