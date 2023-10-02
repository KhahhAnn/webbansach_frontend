import React, { useState, useEffect } from 'react';
import { LayToanBoSach } from '../../api/SachAPI';
import sachModel from '../../model/SachModel';
import SachProps from './components/SachProps';


const DanhSachSanPham: React.FC = () => {
   const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<sachModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);


   useEffect(() => {
      LayToanBoSach().then(
         sachData => {
            setDanhSachQuyenSach(sachData);
            setDangTaiDuLieu(false);
         }
      ).catch(
         message => setBaoLoi(message)
      )
   }, [])
   if (dangTaiDuLieu) {
      return (
         <div>
            <h1>Đang tải dữ liệu...</h1>
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
      <div className='container'>
         <div className='row mt-4'>
            {
               danhSachQuyenSach.map((sach, index) => (
                  <SachProps key={index} sach={sach} />
               ))
            }
         </div>
      </div>
   );
}
export default DanhSachSanPham;