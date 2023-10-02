import React from 'react'

const Banner = () => {
   return (
      <div className='p-5 mb-4 bg-dark'>
         <div className='contanier-fluid py-5 text-white d-flex justify-content-center align-items-center'>
            <div>
               <h3 className='display-5 fw-bold'>
                  Đọc sách chính là hộ chiếu <br /> cho vô số cuộc phưu lưu
               </h3>
               <p>Mary Pope Osborne</p>
               <button className='btn btn-primary btn-lg text-white float-end'>Khám phá sách tại TITV</button>
            </div>
         </div>
      </div>
   );
}
export default Banner;