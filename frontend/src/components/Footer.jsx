// import brandLogo from "../assets/logos/logo.svg";

const Footer = () => {
    return (
        <footer className="Footer">
            <div className="LeftFooterColumn">
                {/* <img className="filter-white" src={ brandLogo } alt="The Brand logo, all in uppercase and in white bold lettering"></img> */}
                <span className="brandLogoSpanFooter">REWARDS CLUB</span>
            </div>
            <div className="MiddleFooterColumn">
                <ul className="FooterMenu">
                    <li className="FooterMenuTitle">Rewards Club</li>
                    <li className="FooterItem-1">home</li>
                    <li className="FooterItem-2">about</li>
                    <li className="FooterItem-3">buy nfts</li>
                    <li className="FooterItem-4">sell nfts</li>
                </ul>
                <ul className="FooterMenu">
                    <li className="FooterMenuTitle">market</li>
                    <li className="FooterItem-1">browse nfts</li>
                    <li className="FooterItem-2">buy nfts</li>
                    <li className="FooterItem-3">sell nfts</li>
                </ul>
                <ul className="FooterMenu">
                    <li className="FooterMenuTitle">contact</li>
                    <li className="FooterItem-1">email</li>
                    <li className="FooterItem-2">linkedin</li>
                    <li className="FooterItem-3">instagram</li>
                    <li className="FooterItem-3">twitter</li>
                </ul>
            </div>
            <div className="RightFooterColumn NewsletterSignUp">
                <p className='NewsletterSignUpText'>join our newsletter</p>
                <div className='NewsletterSignUpForm'>
                    <input className="NewsletterSignUpInput" placeholder="email address"></input>
                    <button className="NewsletterSignUpButton">submit</button>
                </div>
            </div>
        </footer>
        // <footer className="footer">
        // <div className="container">
        //     <div className="ant-row" style={{rowGap: '43px'}}>
        //     <div className="ant-col ant-col-md-10" style={{}}>
        //         <div className="footer__title">Join our weekly digest!</div>
        //         <div className="footer__description">Get exclusive promotions &amp; updates straight to your inbox.</div>
        //         <form action="#" className="email-subscribe">
        //         <div className="form-item">
        //             <input maxLength="256" name="email" type="text" placeholder="Enter your email" className="ant-input" value="" />
        //         </div>
        //         <button type="submit" className="ant-btn button-submit">
        //             <span>Subscribe</span>
        //         </button>
        //         </form>
        //         <a href="https://app.nftify.network/register?step=SIGN_UP" target="_blank" rel="noreferrer">
        //         <button type="button" className="ant-btn ant-btn-primary button-create-store">
        //             <span>Create FREE Store</span>
        //         </button>
        //         </a>
        //     </div>
        //     <div className="ant-col ant-col-md-14" style="">
        //         <div className="ant-row" style={{rowGap: '24px', marginLeft: '-10px', marginRight: '-10px'}}>
        //         <div className="ant-col col--sub ant-col-xs-12 ant-col-md-6" style={{paddingLeft: '10px' , paddingRight: '10px'}}>
        //             <div className="title-footer-col">FEATURES</div>
        //             <a href="/features/build-nft-store"> Build Store</a>
        //             <a href="/features/sell-nfts"> Sell NFT</a>
        //             <a href="/features/grow-nft-business"> Grow Business</a>
        //         </div>
        //         {/* <!-- Other columns omitted for brevity --> */}
        //         </div>
        //     </div>
        //     </div>
        // </div>
        // <div className="container">
        //     <div className="footer__copyright">
        //         <div className="column column-left">© Copyright NFTify Network. All Rights Reserved.</div>
        //         <div className="column social">
        //             <span className="title">The Leading No-code NFT Marketplace Solution</span>
        //             <ul className="list">
        //             {/* <!-- Social media links omitted for brevity --> */}
        //             </ul>
        //         </div>
        //     </div>
        // </div>
        // </footer>
    )
};

export default Footer;