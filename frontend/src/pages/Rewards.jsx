import React, { useEffect, useContext, useState } from 'react'
import { GlobalStateContext } from '../context';
import { Loader, ShowOffers } from '../components';
import { ConnectWallet } from '@thirdweb-dev/react';

const Home = () => {
  const { contract, address, loading, setIsLoading, setIsActive } = useContext(GlobalStateContext);
  const [offers, setOffers] = useState([]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const fetchedOffers = await contract.call('getAllOffers');
      console.log(fetchedOffers);

      const parsedOffers = [];

      for(let i=fetchedOffers.length-1 ; i>0 ; i--) {
        parsedOffers.push({
          id: parseInt(fetchedOffers[i][0]),
          title: fetchedOffers[i][1],
          description: fetchedOffers[i][2],
          price: parseInt(fetchedOffers[i][3]),
          value: parseInt(fetchedOffers[i][4]),
          quantity: parseInt(fetchedOffers[i][5]),
          productURL: fetchedOffers[i][6],
          businessName: fetchedOffers[i][7],
          businessAddress: fetchedOffers[i][8],
          startTime: (fetchedOffers[i][9].toNumber() * 1000) + 60,
          endTime: (fetchedOffers[i][10].toNumber() * 1000) + 60,
          exclusiveDeal: fetchedOffers[i][11],
          buyers: fetchedOffers[i][12]
        })

        setOffers(parsedOffers);
      }
    }
    catch(err) {
      console.log(err);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsActive('All Offers');
    if(contract && address) fetchData();
  }, [contract, address]);

  return (
    address ? <>
    {loading && <Loader />}
    <ShowOffers 
      title="All Offers"
      loading={loading}
      offers={offers}
      />
    </> : <ConnectWallet />
  )
}

export default Home