import React, { useEffect, useState } from 'react';
import { lay1AnhCuaMotSach } from '../../../api/HinhAnhApi';
import HinhAnhModel from '../../../model/HinhAnhModel';
import sachModel from '../../../model/SachModel';
interface SachPropsInterface {
   sach: sachModel;
}
const SachCarousel: React.FC<SachPropsInterface> = (props) => {
   const maSach = props.sach.maSach;
   const [danhSachHinhAnhHot, setDanhSachHinhAnhHot] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);

   useEffect(() => {
      lay1AnhCuaMotSach(maSach).then(
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
      <div className="row align-items-center">
         <div className="col-5 text-center">
            <img src={duLieuAnh} className="float-end" style={{ width: '150px' }} />
         </div>
         <div className="col-7">
            <h5>{props.sach.tenSach}</h5>
            <p>{props.sach.moTa}</p>
         </div>
      </div>
   );

}

export default SachCarousel;