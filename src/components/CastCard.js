import { IMG_CDN_URL } from "../utils/constant";

const CastCard = ({ id, profilePath, name }) => {
  if (!profilePath) return null;

  return (
    <div key={id} className="w-52 md:w-32 text-white ml-1">
      <div className="rounded-full">
        <img
          alt="Cast Card"
          src={IMG_CDN_URL + profilePath}
          className="rounded-full w-40 h-32"
        />
      </div>
      <div className="flex items-center justify-center w-full mt-3 text-sm">
        {name}
      </div>
    </div>
  );
};
export default CastCard;
