import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/SideBar/SideBar';

export default function MainPage() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <SideBar />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
