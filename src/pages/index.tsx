import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sections } from "../utils";

const Home = () => {
  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
        Content Explorer Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Browse various resources interactively
      </p>
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-6 text-white shadow-lg rounded-lg text-center transition-all duration-300 ${section.color} ${section.hover}`}
          >
            <Link to={section.path} className="text-xl font-semibold">
              {section.name}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
