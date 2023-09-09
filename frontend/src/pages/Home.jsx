import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { Button, Container, Loader, Navbar, FaqSection } from "../components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GlobalStateContext } from "../context";
import Typical from 'react-typical';
import Lottie from 'lottie-react'
import { blockchain1, blockchain2, blockchain3, svgChevronDown, svgQuestionMark, analyticsImg, appImg, backgroundEllipse, furore, heroImg, heroImg2, icon1, icon2, icon3, img_slider3, logoRC, man, rocket, sellImg, airbnbLogo, appleLogo, companyLogo, fastCompanyLogo, forbesLogo, logo, primeVideoLogo, pumaLogo, techCrunchLogo } from "../assets/index.js"

function HeroSection({ address, registered, navigate }) {
    return (
        <>
            <section className="HeroSection">
            <div className="TopContent">
                <div className="LeftSideContent Info">
                    <h1 className="SiteHeadingOne">earn,<br/> <span className="AccentColor">redeem,</span> repeat with 
                        <br/>
                        <Typical
                        steps={[' rewards', 2000, ' ',2000,  ' tokens', 2000, ' gift-cards', 2000, ' ', 2000]}
                        loop={Infinity}
                        wrapper="span"
                        />
                    </h1>
                    <p className="SiteHeroParagraph">the safest haven for trading <span className="AccentColor">Fungible Tokens</span> and unlocking rewards</p>
                    <div className="Buttons flex items-center">
                        { !address && <ConnectWallet /> }
                        { address ? !registered ? <Button text='Register' onClick={()=>{navigate('/register')}} /> : <Button text='Checkout Rewards Club' onClick={()=>{navigate('/rewards')}} /> : '' }
                    </div>
                </div>
                <div className="RightSideContent">
                    <div className="RightSideImg">
                        <Lottie className="animation1" animationData={blockchain2} />    
                    </div>
                </div>
            </div>
            <div className="TrustedPartnersContent h-full">
                <p className="TrustedPartnersTitle">Trusted Partners</p>
                <div className="logos">
                    <div className="logos-slide">
                        <img src={ airbnbLogo }></img>
                        <img src={ pumaLogo }></img>
                        <img src={ primeVideoLogo }></img>
                        <img src={ appleLogo }></img>
                        <img src={ companyLogo }></img>
                        <img src={ techCrunchLogo }></img>
                        <img src={ fastCompanyLogo }></img>
                        <img src={ forbesLogo }></img>
                    </div>
                </div>
            </div>
        </section>
        <section className="AnalyticsSection">
            <div className="LeftSideContent">
                <img className="AnalyticsImg bg-gradient-to-r from-rose-500/70 to-purple-500/70 " src={ analyticsImg }></img>
            </div>
            <div className="RightSideContent Info">
                {/* <p className="SubtitleContent">analytics</p> */}
                <h2 className="AnalyticsHeading">blockchain-powered loyalty at its finest</h2>
                <p className="AnalyticsContent">Earn and enjoy rewards with confidence. Our blockchain ensures transparent, secure transactions for your loyalty.</p>
                {/* <button className="PricingButton">VIEW OUR PRICING</button> */}
            </div>
        </section>
        <section className="AppSection">
            <div className="LeftSideContent Info">
                {/* <p className="SubtitleContent">get our app</p> */}
                <h2 className="AppHeading">economical blockchain, with zero gas-fee</h2>
                <p className="AppContent">Experience zero gas fees with our app, ensuring efficient and budget-friendly transactions for all your needs.</p>
                {/* <button className="AppButton">DOWNLOAD ON iOS</button> */}
            </div>
            <div className="RightSideContent">
                {/* <img className="AppImg bg-gradient-to-r from-rose-500 to-purple-500/70" src={ appImg }></img> */}
                <div className="AppImg img_slider bg-gradient-to-r from-rose-500/70 to-purple-500/70">
                    {/* <img class="img_slider3" src={img_slider3}></img> */}
                    {/* <div className="img_slider_div"> */}
                        <img class="img_slider_in rocket" src={rocket}></img>
                        <img class="img_slider_in man" src={man}></img>
                    {/* </div> */}
                </div>
            </div>
        </section>
        <section className="CTASection">
            <p className="SubtitleContent">are you ready&#63;</p>
            <h2 className="CTAHeading">be part of the <span className="AccentColor">next big thing</span></h2>
        </section>
        <div className="flex items-center justify-center">
            { !address && <ConnectWallet /> }
            { address ? !registered ? <Button text='Register' onClick={()=>{navigate('/register')}} /> : <Button text='Checkout Rewards Club' onClick={()=>{navigate('/rewards')}} /> : '' }
        </div>
        </>
    )
}

function Home() {
    const navigate = useNavigate();
    const address = useAddress();

    const { loading, setIsLoading, contract, setRole } = useContext(GlobalStateContext);

    const [registered, setRegistered] = useState(null);

    async function fetchUserData() {
        setIsLoading(true);
        const isRegistered = await contract.call('isRegistered', [address]);
        if(isRegistered) {
            const userData = await contract.call('getUser', [address]);
            setRole(userData[4]);
        }
        setRegistered(isRegistered);
        setIsLoading(false);
    }

    useEffect(() => {
        if(address && contract) fetchUserData();
    }, [contract, address]);

    return (
        
        <>
            <div>{ loading && <Loader /> }
           </div>
            <main className="flex flex-col flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5 text-white">
                <Navbar />
                <Container component={<HeroSection address={address} registered={registered} navigate={navigate} />} />
            </main>
        </>
    )
}

export default Home