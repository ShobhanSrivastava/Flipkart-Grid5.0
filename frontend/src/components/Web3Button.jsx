import { Web3Button } from "@thirdweb-dev/react";

function Web3ButtonStyled({ text, onClick, onSuccess }) {
    return (
    <div className="p-[2px] rounded-lg bg-gradient-to-r from-rose-500 to-purple-500">
        <Web3Button theme="light" 
                action={onClick} onSuccess={onSuccess}>
                { text }
        </Web3Button>
    </div>
    );
}

export default Web3ButtonStyled;