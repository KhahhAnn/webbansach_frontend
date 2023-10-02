import React, { useEffect, useState } from 'react';
import { LayToanBoSach } from '../../../api/SachAPI';
import sachModel from '../../../model/SachModel';
import SachCarousel from './SachCarousel';

const Carousel: React.FC = () => {
   const [danhSachSachHot, setDanhSachSachHot] = useState<sachModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [totalBooks, setTotalBooks] = useState(0);
   
   useEffect(() => {
      LayToanBoSach().then(
         sachData => {
            setDanhSachSachHot(sachData);
            setDangTaiDuLieu(false);
            setTotalBooks(sachData.length);
         }
      ).catch(
         error => {
            setDangTaiDuLieu(false);
            setBaoLoi(error.message);
         }
      )
   }, [])

   if (dangTaiDuLieu) {
      return (
         <div>
            <h1>Đang tải dữ liệu</h1>
         </div>
      );
   }

   if (baoLoi) {
      return (
         <div>
            <h1>Gặp lỗi: {baoLoi}</h1>
         </div>
      );
   }

   const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex) % totalBooks);
   };

   const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex + totalBooks) % totalBooks);
   };
   return (
      <div id="carouselExampleDark" className="carousel carousel-dark slide">
         {
            danhSachSachHot.map((sach, index) => (
               <SachCarousel key={index} sach={sach} isActive= {index === currentIndex}/>
            ))
         }
         <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
         </button>
         <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
         </button>
      </div>
   );
}

export default Carousel;