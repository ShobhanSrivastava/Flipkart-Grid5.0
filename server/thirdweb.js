import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import dotenv from 'dotenv';

dotenv.config();

const sdk = ThirdwebSDK.fromPrivateKey(
    process.env.PRIVATE_KEY, // Your wallet's private key (only required for write operations)
    "mumbai",
    {
        secretKey: process.env.THIRDWEB_SECRET, // Use secret key if using on the server, get it from dashboard settings
    },
);

export async function getContract() {
    const contract = await sdk.getContract("0xf71A218C40ad49B64De20420239eE7339aeCe705");
    return contract;
}   