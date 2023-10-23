import { StarFill, Star, StarHalf } from 'react-bootstrap-icons';

export const renderRating = (diem: number) => {
   const stars = [];
   let i = 1;
   while(diem >= i) {
      if (i <= diem) {
         stars.push(<StarFill className='text-warning' />)
         if (diem - i > 0 && diem - i < 1) {
            stars.push(<StarHalf className='text-warning' />)
         }
      }
      else {
         stars.push(<Star className='text-secondary' />)
      }
      i++;
   }
   return stars;
}