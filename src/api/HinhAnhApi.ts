import React from 'react';

import HinhAnhModel from '../model/HinhAnhModel';
import { my_request } from './Request';

export async function LayToanBoAnhCuaSach(maSach: number): Promise<HinhAnhModel[]> {
   const ketQua: HinhAnhModel[] = [];

   const duongDan = `http://localhost:8080/sach/${maSach}/danhSachHinhAnh`;

   const response = await my_request(duongDan);

   const responseData = response._embedded.hinhAnhs;


   for (const key in responseData) {
      ketQua.push({
         maHinhAnh: responseData[key].maHinhAnh,
         tenHinhAnh: responseData[key].tenHinhAnh,
         laIcon: responseData[key].laIcon,
         duongDan: responseData[key].duongDan,
         duLieuAnh: responseData[key].duLieuAnh,
      });
   }
   return ketQua;
}