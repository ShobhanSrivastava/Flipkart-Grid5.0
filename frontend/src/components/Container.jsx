
const Container = ({component}) => {
    return (
        <main className="MainContainer">
            <div style={{ zIndex: 1000 }} className="BackgroundBlurObject1"></div>
                {component}
            <div style={{ zIndex: 1000 }} className="BackgroundBlurObject3"></div>
        </main>
    )
};

export default Container;