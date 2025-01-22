

import AppLayout from './components/AppLayout'
import router from './components/Router'
import User from './components/User'
import { RouterProvider } from 'react-router'


function App() {


  return (
    <>
    {/* <User/> */}
   <RouterProvider router={router}/>
    </>
  )
}

export default App
