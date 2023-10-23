
import DanhGiaModel from '../model/DanhGiaModel';
import { my_request } from './Request';


async function layDanhGiaCuaMotSach(duongDan: string): Promise<DanhGiaModel[]> {
   const ketQua: DanhGiaModel[] = [];

   const response = await my_request(duongDan);
   const responseData = response._embedded.suDanhGias;

   for (const key in responseData) {
      ketQua.push({
         maDanhGia: responseData[key].maDanhGia,
         diemXepHang: responseData[key].diemXepHang,
         nhanXet: responseData[key].nhanXet,
      });
   }
   console.log("So luong: ", ketQua.length);
   return ketQua;
}

export async function LayToanBoDanhGiaCuaSach(maSach: number): Promise<DanhGiaModel[]> {
   const duongDan = `http://localhost:8080/sach/${maSach}/danhSachDanhGia`;
   console.log(duongDan);
   
   return layDanhGiaCuaMotSach(duongDan);
}

export async function lay1DanhGiaCuaMotSach(maSach: number): Promise<DanhGiaModel[]> {
   const duongDan = `http://localhost:8080/sach/${maSach}/danhSachDanhGia?sort=maDanhGia,asc&page=0&size=1`;
   return layDanhGiaCuaMotSach(duongDan);
}