import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DanhGiaModel from '../../../model/DanhGiaModel';
import { LayToanBoDanhGiaCuaSach } from '../../../api/DanhGiaApi';
import { renderRating } from '../../utils/SaoXepHang';


interface DanhGiaSanPham {
   maSach: number;
}

const DanhGiaSanPham: React.FC<DanhGiaSanPham> = (props) => {
   const maSach: number = props.maSach;

   const [danhSachDanhGia, setDanhSachDanhGia] = useState<DanhGiaModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);


   useEffect(() => {
      LayToanBoDanhGiaCuaSach(maSach).then(
         danhSach => {
            setDanhSachDanhGia(danhSach);
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
      <div className="container mt-2 mb-2 text-start">
         <h4>Đánh giá sản phẩm: </h4>
         {
            danhSachDanhGia.map((danhGia, index) => (
               <div key={index} className="row">
                  <div className="col-4  text-start">
                     <p>{renderRating(danhGia.diemXepHang?danhGia.diemXepHang:0)}</p>
                  </div>
                  <div className="col-8 text-start">
                     <p>{danhGia.nhanXet}</p>
                  </div>
               </div>
            )
            )
         }
      </div>
   );
}

export default DanhGiaSanPham;
