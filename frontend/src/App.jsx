import { Home, Dashboard, CreateReward, CreateDeal, Rewards, RewardCustomer, TransactionPage, Purchases, OfferDetails, Register, Tokenomics, Ecommerce } from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className='relative sm:p-8 p-4 bg-[#13131a] min-h-screen flex flex-row items-start justify-center'>
          <Toaster position='top-center' />
          <Routes>
            <Route path='/' exact element={<Home />} />
            <Route path='/register' exact element={<Register />} />
            <Route path='/dashboard' exact element={<Dashboard />} />
            <Route path='/create-reward' exact element={<CreateReward />} />
            <Route path='/create-deal' exact element={<CreateDeal />} />
            <Route path='/rewards' exact element={<Rewards />} />
            <Route path='/transactions' exact element={<TransactionPage />} />
            <Route path='/reward-customer' exact element={<RewardCustomer />} />
            <Route path='/purchases' exact element={<Purchases />} />
            <Route path='/tokenomics' exact element={<Tokenomics />} />
            <Route path='/offer-details/:id' exact element={<OfferDetails />} />
            <Route path='/flipkart' exact element={<Ecommerce />} />
          </Routes>
      </div>
    </Router>
  )
}

export default App
