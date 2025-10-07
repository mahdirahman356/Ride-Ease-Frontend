import { Outlet } from 'react-router'
import CommonLayout from './layout/CommonLayout'
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <>
      <CommonLayout>
        <Outlet />
      </CommonLayout>
    </>
  )
}

export default App
