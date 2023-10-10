import React, { useState, useEffect } from 'react';
import { LayToanBoSach } from '../../api/SachAPI';
import sachModel from '../../model/SachModel';
import SachProps from './components/SachProps';
import { PhanTrang } from '../utils/PhanTrang';


const DanhSachSanPham: React.FC = () => {
   const [danhSachQuyenSach, setDanhSachQuyenSach] = useState<sachModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [trangHienTai, setTrangHienTai] = useState(1);
   const [tongSoTrang, setTongSoTrang] = useState(0);
   // const [tongSoSach, setTongSoSach] = useState(0);

   useEffect(() => {
      LayToanBoSach(trangHienTai).then(
         kq => {
            setDanhSachQuyenSach(kq.ketQua);
            setTongSoTrang(kq.tongSoTrang)
            setDangTaiDuLieu(false);
         }
      ).catch(
         message => setBaoLoi(message)
      )
   }, [trangHienTai])
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

   const phanTrang = (trang: number) => {
      setTrangHienTai(trang);
   }

   return (
      <div className='container'>
         <div className='row mt-4 mb-4'>
            {
               danhSachQuyenSach.map((sach, index) => (
                  <SachProps key={index} sach={sach} />
               ))
            }
         </div>
         <PhanTrang trangHienTai={trangHienTai} tongSoTrang={tongSoTrang} phanTrang={phanTrang}/>
      </div>
   );
}
export default DanhSachSanPham;