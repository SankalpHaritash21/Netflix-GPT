import { useNavigate } from "react-router-dom";
import { IMG_CDN_URL } from "../utils/constant";

const MovieCard = ({ id, posterPath }) => {
  const navigate = useNavigate();
  if (!posterPath) return null;

  const handleNavigate = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="w-36 md:w-40 pr-4">
      <button onClick={handleNavigate}>
        <img
          alt="Movie Card"
          src={IMG_CDN_URL + posterPath}
          className="rounded-xl"
        />
      </button>
    </div>
  );
};
export default MovieCard;