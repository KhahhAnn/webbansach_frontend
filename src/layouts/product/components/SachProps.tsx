import React, { useEffect, useState } from 'react';
import { LayToanBoAnhCuaSach, lay1AnhCuaMotSach } from '../../../api/HinhAnhApi';
import HinhAnhModel from '../../../model/HinhAnhModel';
import sachModel from '../../../model/SachModel';
import { Link } from 'react-router-dom';
import { dinhDangSo } from '../../utils/DinhDangSo';


interface SachPropsInterface {
   sach: sachModel;
}

const SachProps: React.FC<SachPropsInterface> = (props) => {


   const maSach: number = props.sach.maSach;
   const [danhSachAnh, setDanhSachAnh] = useState<HinhAnhModel[]>([]);
   const [dangTaiDuLieu, setDangTaiDuLieu] = useState(true);
   const [baoLoi, setBaoLoi] = useState(null);

   useEffect(() => {
      lay1AnhCuaMotSach(maSach).then(
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
            height: "100%"
         }}>
            <Link to={`/sach/${props.sach.maSach}`}>
               <img
                  src={duLieuAnh}
                  className="card-img-top"
                  alt={props.sach.tenSach}
                  style={{ objectFit: "contain", minHeight: "200px", height: "auto", width: "100%" }}
               />
            </Link>

            <div className="card-body" style={{ display: 'flex', justifyContent: "space-between", flexDirection: "column", alignItems: "center", textAlign:"center" }}>
               <div>
                  <Link to={`/sach/${props.sach.maSach}`} style={{textDecoration: "none"}}>
                     <h5 className="card-title" style={{fontSize: "18px"}}>{props.sach.tenSach}</h5>
                  </Link>
                  <div className="price">
                     <span className="original-price">
                        <del>{dinhDangSo(props.sach.giaNiemYet?props.sach.giaNiemYet:0)}đ</del>
                     </span>
                     <span className="discounted-price" style={{marginLeft: "10px"}}>
                        <strong>{dinhDangSo(props.sach.giaBan?props.sach.giaBan:0)}đ</strong>
                     </span>
                  </div>
               </div>
               <div className="row mt-2" role="group" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "stretch", textAlign: "center" }}>
                  <div className="col-6">
                     <a href="#" className="btn btn-secondary btn-block" style={{ width: 100 }}>
                        <i className="fas fa-heart"></i>
                     </a>
                  </div>
                  <div className="col-6">
                     <button className="btn btn-danger btn-block" style={{ width: 100 }}>
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