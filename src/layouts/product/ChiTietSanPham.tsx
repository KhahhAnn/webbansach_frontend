import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { laySachTheoMaSach } from '../../api/SachAPI';
import SachModel from '../../model/SachModel';
import { dinhDangSo } from '../utils/DinhDangSo';
import { renderRating } from '../utils/SaoXepHang';
import DanhGiaSanPham from './components/DanhGiaSanPham';
import HinhAnhSanPham from './components/HinhAnhSanPham';


const ChiTietSanPham: React.FC = (props) => {
   const [sach, setSach] = useState<SachModel | null>(null);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);
   const [soLuong, setSoLuong] = useState(1);

   const tangSoLuong = () => {
      const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
      if (soLuong < soLuongTonKho)
         setSoLuong(soLuong + 1);
   }
   const giamSoLuong = () => {
      if (soLuong >= 2) {
         setSoLuong(soLuong - 1);
      }
   }
   const handleSoLuongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const soLuongMoi = parseInt(event.target.value);
      const soLuongTonKho = (sach && sach.soLuong ? sach.soLuong : 0);
      if (!isNaN(soLuongMoi) && soLuongMoi >= 1 && soLuongMoi <= soLuongTonKho) {
         setSoLuong(soLuongMoi);
      }
   }

   const handleMuaNgay = () => {

   }

   const handleThemVaoGioHang = () => {

   }
   const { maSach } = useParams();

   let maSachNumber = 0;
   try {
      maSachNumber = parseInt(maSach + "");
      if (Number.isNaN(maSachNumber)) {
         maSachNumber = 0;
      }
   } catch (error) {
      maSachNumber = 0;
      console.error("Error: ", error);

   }

   useEffect(() => {
      laySachTheoMaSach(maSachNumber)
         .then(
            (sach) => {
               setSach(sach);
               setDangTaiDuLieu(false);
            }
         )
         .catch(
            (error) => {
               setBaoLoi(error.message);
               setDangTaiDuLieu(false);
            }
         )
   }, [maSachNumber])

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

   if (!sach) {
      return (
         <div>
            <h1>Sách không tồn tại</h1>
         </div>
      );
   }

   return (
      <div className="container">
         <div className="row mt-4 mb-4">
            <div className="col-3">
               <HinhAnhSanPham maSach={maSachNumber} />
            </div>
            <div className="col-8">
               <div className="row">
                  <div className="col-8">
                     <h1>{sach.tenSach}</h1>
                     <h4>{renderRating(sach.trungBinhXepHang ? sach.trungBinhXepHang : 0)}</h4>
                     <h4>{dinhDangSo(sach.giaBan ? sach.giaBan : 0)}đ</h4>
                     <hr />
                     <div dangerouslySetInnerHTML={{ __html: (sach.moTa + '') }} />
                     <hr />
                  </div>
                  <div className="col-4">
                     <div>
                        <div className="mb-2">Số lượng</div>
                        <div className="d-flex align-items-center">
                           <button onClick={giamSoLuong} className='btn btn-outline-secondary me-2'>-</button>
                           <input className='form-control  text-center' type="number" value={soLuong} min={1} onChange={handleSoLuongChange} />
                           <button onClick={tangSoLuong} className='btn btn-outline-secondary ms-2'>+</button>
                        </div>
                        {
                           sach.giaBan && (
                              <h4 className='mt-2 text-center'>
                                 Tổng tiền: {dinhDangSo(soLuong * sach.giaBan)}đ
                              </h4>
                           )
                        }
                        <div className='d-grid gap-2'>
                           <button type='button' className='btn btn-danger mt-3' onClick={handleMuaNgay}>Mua ngay</button>
                           <button type='button' className='btn btn-outline-secondary mt-2' onClick={handleThemVaoGioHang}>Thêm vào giỏ hàng</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className='row mt-4 mb-4'>
            <DanhGiaSanPham maSach={maSachNumber} />
         </div>
      </div>
   );
}

export default ChiTietSanPham;