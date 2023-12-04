import { useNavigate } from "react-router-dom";

const VideoTitle = ({ id, title, overview }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/detail/${id}`);
  };
  return (
    <div className="w-screen aspect-video pt-[20%]  md:px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 w-1/3 text-base">{overview}</p>
      <div className="my-4 md:m-0">
        <button
          className=" bg-white text-black py-1 md:py-3 px-3 md:px-10 text-xl  rounded-lg hover:bg-opacity-80"
          onClick={handleNavigate}
        >
          ▶️ Play
        </button>
        <button
          className="hidden md:inline-block mx-2  bg-gray-500 text-white p-3 px-12 text-xl bg-opacity-50 rounded-lg"
          onClick={handleNavigate}
        >
          More Info
        </button>
      </div>
    </div>
  );
};
export default VideoTitle;
