import express from 'express';
import dotenv from 'dotenv';
import { getContract } from './thirdweb.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello!');
})

app.post('/api/social-media-rewards', async (req, res) => {
    const { address } = req.body;

    const contract = await getContract();
    try {
        await contract.call('platformRewards', [ address, 10, 2 ]);
        return res.json({ 'message': 'sent' });
    }
    catch(err) {
        console.log(err);
        return res.json({ 'message': err.message })
    }
})

app.post('/api/reward-for-purchase', async (req, res) => {
    const { address, purchaseAmount } = req.body;

    const contract = await getContract();
    try {
        await contract.call('rewardForPurchase', [ address, purchaseAmount ]);
        return res.json({ 'message': 'sent' });
    }
    catch(err) {
        console.log(err);
        return res.json({ 'message': err.message })
    }
})

app.listen(process.env.PORT, () => {
    console.log(`Running on PORT ${process.env.PORT}`);
})