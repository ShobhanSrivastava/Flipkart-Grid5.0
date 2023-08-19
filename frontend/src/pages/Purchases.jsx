import React, { useState, useEffect, useContext } from 'react'
import { offers } from '../dummyData';
import { ShowOffers } from '../components';
import { ConnectWallet } from '@thirdweb-dev/react';
import { GlobalStateContext } from '../context';

const Home = () => {
  const { address } = useContext(GlobalStateContext);

  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const showOffers = offers;

  // fetchUserRewards()

  return (
    address ? 
    <ShowOffers 
      title="My Purchases"
    //   isLoading={isLoading}
      campaigns={showOffers}
    /> : <ConnectWallet />
  )
}

export default Home