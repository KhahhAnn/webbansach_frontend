import React, { useEffect, useState } from 'react';
import { LayToanBoAnhCuaSach } from '../../../api/HinhAnhApi';
import HinhAnhModel from '../../../model/HinhAnhModel';
import sachModel from '../../../model/SachModel';


interface SachPropsInterface {
   sach: sachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {


   const maSach: number = props.sach.maSach;
   const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);  

   useEffect(() => {
      LayToanBoAnhCuaSach(maSach).then(
         hinhAnhData => {
            setDanhSachAnh(hinhAnhData);
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
   if (danhSachAnh[0] && danhSachAnh[0].duLieuAnh) {
      duLieuAnh = danhSachAnh[0].duLieuAnh;
   }
   return (
      <div className="col-md-3 mt-4">
         <div className="card mx-4 my-2 " style={{
            display: "flex",
            flexDirection: "column",
            height: "100%"}}>
         <img
            src={duLieuAnh}
            className="card-img-top"
            alt={props.sach.tenSach}
            style={{ objectFit: "contain", minHeight: "200px", height:"auto", width:"100%" }}
         />
         <div className="card-body" style={{flexGrow: "1"}}>
            <h5 className="card-title">{props.sach.tenSach}</h5>
            <p className="card-text">{props.sach.moTa}</p>
            <div className="price">
               <span className="original-price">
                  <del>{props.sach.giaNiemYet}</del>
               </span>
               <span className="discounted-price">
                  <strong>{props.sach.giaBan}</strong>
               </span>
            </div>
            <div className="row mt-2" role="group">
               <div className="col-6">
                  <a href="#" className="btn btn-secondary btn-block">
                     <i className="fas fa-heart"></i>
                  </a>
               </div>
               <div className="col-6">
                  <button className="btn btn-danger btn-block">
                     <i className="fas fa-shopping-cart"></i>
                  </button>
               </div>
            </div>
         </div>
      </div>
      </div >
   );
}

export default SachProps;