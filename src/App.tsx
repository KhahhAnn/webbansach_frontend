import React, { useState } from 'react'; import './App.css';
import Navbar from './layouts/header-footer/Navbar';
import Footer from './layouts/header-footer/Footer';
import Homepage from './layouts/Homepage/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './layouts/about/About';
import ChiTietSanPham from './layouts/product/ChiTietSanPham';
import DangKy from './layouts/user/DangKyNguoiDung';
import KichHoatTaiKhoan from './layouts/user/KichHoatTaiKhoan';

function App() {

  const [tuKhoaTimKiem, setTuKhoaTimKiem] = useState('');


  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar tuKhoaTimKiem={tuKhoaTimKiem} setTuKhoaTimKiem={setTuKhoaTimKiem} />
        <Routes>
          <Route path='/' element={<Homepage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/:maTheLoai' element={<Homepage tuKhoaTimKiem={tuKhoaTimKiem} />} />
          <Route path='/about' element={<About />} />
          <Route path='/sach/:maSach' element={<ChiTietSanPham />} />
          <Route path='/dang-ky' element={<DangKy />} />
          <Route path='/kich-hoat/:email/:maKichHoat' element={<KichHoatTaiKhoan />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
