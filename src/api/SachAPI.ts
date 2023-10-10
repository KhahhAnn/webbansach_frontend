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
   return {ketQua: ketQua, tongSoSach: tongSoSach, tongSoTrang: tongSoTrang};
}

export async function LayToanBoSach(trangHienTai: number): Promise<ketQuaInterface> {
   const duongDan: string = `http://localhost:8080/sach?sort=maSach.desc&size=8&page=${trangHienTai}`;
   return laySach(duongDan);
}

export async function lay3QuyenMoi(): Promise<ketQuaInterface> {
   const duongDan: string = "http://localhost:8080/sach?sort=maSach.desc&page=0&size=3";
   return laySach(duongDan);
}