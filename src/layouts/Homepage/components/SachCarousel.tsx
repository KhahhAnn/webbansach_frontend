import React, { useState, useEffect } from 'react';
import sachModel from '../../../model/SachModel';
import { LayToanBoAnhCuaSach } from '../../../api/HinhAnhApi';
import HinhAnhModel from '../../../model/HinhAnhModel';
interface SachPropsInterface {
   sach: sachModel;
   isActive: boolean;
}
const SachCarousel: React.FC<SachPropsInterface> = (props) => {
   const maSach = props.sach.maSach;
   const [danhSachHinhAnhHot, setDanhSachHinhAnhHot] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);

   useEffect(() => {
      LayToanBoAnhCuaSach(maSach).then(
         hinhAnhData => {
            setDanhSachHinhAnhHot(hinhAnhData);
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

   let duLieuAnh = "";
   if (danhSachHinhAnhHot[0] && danhSachHinhAnhHot[0].duLieuAnh) {
      duLieuAnh = danhSachHinhAnhHot[0].duLieuAnh;
   }

   return (
      <div className="carousel-inner">
         <div className={`carousel-item ${props.isActive ? 'active' : ''}`} data-bs-interval="10000">
            <div className='row align-items-center'>
               <div className='col-5 text-center'>
                  <img src={duLieuAnh} className='float-end' alt="..." style={{ width: "150px" }} />
               </div>
               <div className="col-7">
                  <h5>{props.sach.tenSach}</h5>
                  <p>{props.sach.moTa}.</p>
               </div>
            </div>
         </div>
      </div>
   );

}

export default SachCarousel;