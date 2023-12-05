import { IMG_CDN_URL } from "../utils/constant";

const CastCard = ({ id, profilePath, name }) => {
  if (!profilePath) return null;

  return (
    <div key={id} className="w-28 md:w-52 lg:w-32 text-white">
      <div className="rounded-full flex flex-col items-center justify-center">
        <img
          alt="Cast Card"
          src={IMG_CDN_URL + profilePath}
          className="rounded-full w-20 md:w-40 h-20 md:h-32"
        />
        <div className="flex items-center justify-center w-full mt-3 text-xs md:text-base lg:text-lg">
          {name}
        </div>
      </div>
    </div>
  );
};
export default CastCard;
