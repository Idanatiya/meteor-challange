import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TheSidebar from '@/layout/TheSidebar';
import MeteorPage from '@/pages/MeteorPage';

function App() {
  return (
    <>
      <main className="main-container">
        <TheSidebar />
        <MeteorPage />
      </main>
      <ToastContainer />
    </>
  );
}

export default App;
