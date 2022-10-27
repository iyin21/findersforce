
import Star from "../../assets/Star.svg"
import { useRating } from "./Ratings.hook"

interface RatingInterface {
  id: string;
}


const Rating = ({id}: RatingInterface) => {
  const { data: rating } = useRating({id})
  console.log(rating)
  return (
      <section className="bg-yellow-10 rounded-lg px-4 py-4">
        <p className="text-sm font-medium">PERFORMANCE</p>
        <img src={Star} alt="star_icon" className="inline pb-2" />
        <span className="text-2xl font-extrabold tracking-wide px-2">4.9</span>
        <span className="text-xs font-medium tracking-wide">(from 136 shifts)</span>
        <div className="flex justify-between mb-3">
          <p className=" text-xs">Professionalism</p>
          <svg width="120" height="10" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.3" width="120" height="10" rx="5" fill="white"/>
          <rect width="100" height="10" rx="5" fill="#4DB25D"/>
          </svg>
        </div>
        <div className="flex justify-between mb-3">
          <p className=" text-xs">Punctuality</p>
          <svg width="120" height="10" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.3" width="120" height="10" rx="5" fill="white"/>
          <rect width="40" height="10" rx="5" fill="#F44336"/>
          </svg>
        </div>
        <div className="flex justify-between ">
          <p className=" text-xs">Helpfulness</p>
          <svg width="120" height="10" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect opacity="0.3" width="120" height="10" rx="5" fill="white"/>
          <rect width="110" height="10" rx="5" fill="#4DB25D"/>
          </svg>
        </div>
      </section>
  )
}

export default Rating