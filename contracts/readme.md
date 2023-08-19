This folder contains the code related to the smart contracts

- Users have the option to login with their gmail address. If the user has a metmask wallet, he can login with that as well.

- The Loyalty Platform is called Rewards Club.
- Ecommerce platform deploys the contract and is the contract owner here.
- For simplicity purposes we will be using "Flipart" in place of "Ecommerce platform"
- The coin related to the platform is called ClubCoin.
- Now this coin is very much analogous to the SuperCoin on Flipkart.

- We have created this ClubCoin keeping in mind that the value of this coin is 1 Rupee in the real world just like the SuperCoin. So each ClubCoin is pegged at 1 Rupee. It is for simplicity.
- Flipkart is the owner and can mint as many ClubCoins as they want but making sure that since it possesses value equal to 1 Rupee in the real world, it must be used wisely.

Tokenomics and logic:

- Just like the SuperCoin, Flipkart will pay 2 ClubCoins for every Rs 100 purchase and a max. of 50 ClubCoins on each purchase in case of normal users but for plus users 4 ClubCoins for every Rs 100 purchase and a max of 100 ClubCoins on each purchase. Now this purchase event is off-chain, therefore Flipkart can call the API endpoint used for sending ClubCoins providing the purchase value and the wallet address of the customer. [Flipkart will need its users to provide their wallet addresses to recieve tokens]

- Customers meeting a particular condition will be upgraded to plus users.

- Referrals [ Number of referrals => off-chain, Transaction => on-chain ]
    - x1 tokens on y1 referrals
    - x2 tokens on y2 referrals
    - x3 tokens on y3 referrals

- Social Media Shares 
    - 10 tokens on sharing on a platform available only once

- Partners will be selected businesses on the platform that are paying some platform fee off chain.

- Partners can issue tokens to their loyal customers by providing their addresses and number of tokens. Now this token issuing is on-chain but paying for this token issuing is off-chain. Issue token transaction show

- Partners can setup rewards on the platforms. Since the rewards are digital and discount related, the tokens will be transferred to the Flipkart when the rewards are bought and the rewards are unlocked for the customers. But reward purchase transaction is shown to partner showing "0 tokens credited".

- Partners can setup exclusive deals which people can buy and the tokens are transferred to partners on chain. Now the tokens accumulated by the partner will be settled and their balance will become 0 (on-chain). Now the actual payment needs to be made off chain.

- Gamification =>  Spin wheel (If possible), Jackpot (Working off-chain, payments on-chain)

- Pages required:   
    - Home page
    - Token economics article page
    - Registration (Not sure)
    - Customer dashboard => transaction history, token balance, referral and shares, my purchases
    - Partner dashboard => transaction history, token balance, token earnings, [ Settle Now button (if time allows) ], reward setup, exclusive deals setup, Issue tokens to loyalCustomers
    - Exchange rewards for tokens
    - Buy products using tokens

- NOTE
    - On each page show users token balance if registered. 

- TODO: DECAY


TODO: 

- Settlement Function