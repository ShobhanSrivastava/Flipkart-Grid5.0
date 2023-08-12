import { useContext } from "react"
import { GlobalStateContext } from './context/'

function App() {

  const { globalData } = useContext(GlobalStateContext);
  console.log(globalData.primaryColor);

  return (
    <>
      <h1 className={`text-3xl font-light text-${ globalData.primaryColor }-500 underline`}>
        Hello world! 
      </h1>
    </>
  )
}

export default App
