import { motion } from "framer-motion";
import "./Loader.css";

const Loader = ({ size = 50, color = "#000000" }) => {
    return (
        <div className="loader-container">
            <motion.div
                className="loader-spinner"
                style={{
                    width: size,
                    height: size,
                    borderTopColor: color,
                    color: color,
                }}
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        </div>
    );
};

export default Loader;