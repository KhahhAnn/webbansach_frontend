import sachModel from '../model/SachModel';
import { my_request } from './Request';



export async function LayToanBoSach(): Promise<sachModel[]> {
   const ketQua: sachModel[] = [];

   const duongDan: string = 'http://localhost:8080/sach';

   const response = await my_request(duongDan);

   const responseData = response._embedded.saches;
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
      );
   }

   return ketQua;

}