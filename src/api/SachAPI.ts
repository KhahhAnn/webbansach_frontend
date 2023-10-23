import SachModel from '../model/SachModel';
import sachModel from '../model/SachModel';
import { my_request } from './Request';

interface ketQuaInterface {
   ketQua: sachModel[];
   tongSoTrang: number;
   tongSoSach: number;
}


async function laySach(duongDan: string): Promise<ketQuaInterface> {
   const ketQua: sachModel[] = [];
   const response = await my_request(duongDan);
   const responseData = response._embedded.saches;

   const tongSoTrang: number = response.page.totalPages;
   const tongSoSach: number = response.page.totalElements

   for (const key in responseData) {
      ketQua.push(
         {
            maSach: responseData[key].maSach,
            tenSach: responseData[key].tenSach,
            giaBan: responseData[key].giaBan,
            giaNiemYet: responseData[key].giaNiemYet,
            moTa: responseData[key].moTa,
            soLuong: responseData[key].soLuong,
            tenTacGia: responseData[key].tenTacGia,
            trungBinhXepHang: responseData[key].trungBinhXepHang,
         }
      )
   }
   return { ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang };
}

export async function LayToanBoSach(trangHienTai: number): Promise<ketQuaInterface> {
   const duongDan: string = `http://localhost:8080/sach?sort=maSach.desc&size=8&page=${trangHienTai}`;
   return laySach(duongDan);
}

export async function lay3QuyenMoi(): Promise<ketQuaInterface> {
   const duongDan: string = "http://localhost:8080/sach?sort=maSach.desc&page=0&size=3";
   return laySach(duongDan);
}

export async function timKiemSach(tuKhoaTimKiem: string, maTheLoai: number): Promise<ketQuaInterface> {
   let duongDan: string = `http://localhost:8080/sach?sort=maSach.desc&size=8&page=0`;
   if (tuKhoaTimKiem !== "" && maTheLoai === 0) {
      duongDan = `http://localhost:8080/sach/search/findByTenSachContaining?sort=maSach.desc&size=8&page=0&tenSach=${tuKhoaTimKiem}`
   } else if (tuKhoaTimKiem === "" && maTheLoai > 0) {
      duongDan = `http://localhost:8080/sach/search/findByDanhSachTheLoai_MaTheLoai?sort=maSach.desc&size=8&page=0&maTheLoai=${maTheLoai}`
   } else if (tuKhoaTimKiem !== "" && maTheLoai > 0) {
      duongDan = `http://localhost:8080/sach/search/findByTenSachContainingAndDanhSachTheLoai_MaTheLoai?sort=maSach.desc&size=8&page=0&tenSach=${tuKhoaTimKiem}&maTheLoai=${maTheLoai}`
   }
   return laySach(duongDan);
}

export async function laySachTheoMaSach(maSach: number): Promise<SachModel | null> {
   const duongDan = `http://localhost:8080/sach/${maSach}`;
   let ketQua: sachModel;
   try {
      const response = await fetch(duongDan);
      if (!response.ok) {
         throw new Error("Gặp lỗi trong quá trình gọi API lấy sách");
      }

      const sachData = await response.json();

      if (sachData) {
         return {
            maSach: sachData.maSach,
            tenSach: sachData.tenSach,
            giaBan: sachData.giaBan,
            moTa: sachData.moTa,
            soLuong: sachData.soLuong,
            tenTacGia: sachData.tenTacGia,
            trungBinhXepHang: sachData.trungBinhXepHang
         }
      } else {
         throw new Error("Sachsh không tồn tại");
      }
   } catch (error) {
      console.error("Error: ", error);
      return null;

   }
}