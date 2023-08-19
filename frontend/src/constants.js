import { buy, gift, admin, info, history, purchases, connection, createReward, createDeal, trackProgress, logout } from './assets';

export const navlinks = [
    {
        name: 'All Offers',
        imgUrl: buy,
        link: '/rewards',
        roles: '*'
    },
    {
        name: 'Reward Loyal Customers',
        imgUrl: gift,
        link: '/reward-customer',
        roles: 'partner'
    },
    // {
    //     name: 'My Purchases',
    //     imgUrl: purchases,
    //     link: '/purchases',
    //     roles: 'customer'
    // },
    {
        name: 'Create Reward',
        imgUrl: createReward,
        link: '/create-reward',
        roles: 'partner'
    },
    {
        name: 'Create Deal',
        imgUrl: createDeal,
        link: '/create-deal',
        roles: 'partner'
    },
    {
        name: 'Track your progress',
        imgUrl: trackProgress,
        link: '/track-progress',
        roles: 'customer'
    },
    {
        name: 'Transactions',
        imgUrl: history,
        link: '/transactions',
        roles: '*'
    },
    {
        name: 'Admin Dashboard',
        imgUrl: admin,
        link: '/dashboard',
        roles: 'admin'
    },
    {
        name: 'Tokenomics',
        imgUrl: info,
        link: '/tokenomics',
        roles: '*'
    },
    {
        name: 'Logout',
        imgUrl: logout,
        link: '/',
        roles: '*'
    }
]