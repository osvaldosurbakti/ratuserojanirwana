import { Link } from "react-router-dom";


function ServiceCard({ title, description }) {
  return (
    <div className="bg-white border border-indigo-200 rounded-lg p-6 shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:translate-y-[-10px]">
      <h3 className="text-2xl font-semibold text-indigo-800 mb-4">{title}</h3>
      <p className="text-lg text-gray-700 mb-6">{description}</p>
      <div className="text-center">
        <Link to="/service"
          className="inline-block text-indigo-600 font-semibold py-2 px-4 rounded-lg border border-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default ServiceCard;
