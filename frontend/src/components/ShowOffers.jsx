import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { OfferCard, Sidebar, Navbar } from '../components'

const ShowOffers = ({ title, offers, loading }) => {
    const navigate = useNavigate();

    const handleNavigate = (offer) => {
        navigate(`/offer-details/${offer.title}`, {
            state: offer
        })
    }

    console.log(offers);
    const currentOffers = offers.filter(offer => new Date(offer.endTime).getTime() > Date.now() && new Date(offer.startTime).getTime() < Date.now());
    console.log('current offers', currentOffers);

    return (
    <>
        <div className='sm:flex hidden mr-10 relative'>
            <Sidebar /> 
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white'>  
            <Navbar />
            <main>
                <div>
                    <h1 className='font-epilogue font-semibold text-[18px] text-white text-left'>{title} ({currentOffers.length || 0})</h1>

                    <div className='flex flex-wrap mt-[20px] gap-[26px]'>
                        {!loading && currentOffers.length === 0 && (
                            <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]'>
                                There are no available offers at the moment
                            </p>
                        )}

                        {!loading && currentOffers.length > 0 && 
                            currentOffers.map((offer, i) => <OfferCard 
                                key={i}
                                {...offer}
                                handleClick={() => handleNavigate(offer)}
                                futureOffer={false}
                            />)
                        }
                    </div>
                </div>
            </main>
        </div>
    </>
  )
}

export default ShowOffers