import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar';

export default function MainPage() {
  return (
    <div className="app-wrapper">
      <Header />
      <div className="main-container">
        <SideBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
