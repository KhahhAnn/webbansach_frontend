import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { lay1AnhCuaMotSach } from '../../../api/HinhAnhApi';
import HinhAnhModel from '../../../model/HinhAnhModel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface HinhAnhSanPham {
   maSach: number;
}

const HinhAnhSanPham: React.FC<HinhAnhSanPham> = (props) => {
   const maSach: number = props.maSach;

   const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [hinhAnhDangChon, setHinhAnhDangChon] = useState<HinhAnhModel | null>(null);

   const chonAnh = (image: HinhAnhModel) => {
      setHinhAnhDangChon(image);
   }

   useEffect(() => {
      lay1AnhCuaMotSach(maSach).then(
         danhSach => {
            setDanhSachAnh(danhSach);
            if (danhSach.length > 0) {
               setHinhAnhDangChon(danhSach[0]);
            }
            setDangTaiDuLieu(false);
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

   return (
      <div className="col-md-3 mt-4">
         <div className='col-12' style={{width: "250px"}}>
            <Carousel showArrows={true} showIndicators={true}>
               {
                  danhSachAnh.map((hinhAnh, index) => (
                     <div key={index}>
                        <img src={hinhAnh.duLieuAnh} alt={`${hinhAnh.tenHinhAnh}`} style={{ width: "100%", height: "100%" }} />
                     </div>
                  ))
               }
            </Carousel>
         </div>
      </div>
   );
}

export default HinhAnhSanPham;
