"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons";
import { FcEngineering, FcGlobe, FcCamera, FcMusic } from "react-icons/fc";
import {
  FaLaptopCode,
  FaBusinessTime,
  FaChartLine,
  FaBrain,
  FaGamepad,
  FaMicrophone,
} from "react-icons/fa";
import {
  MdHealthAndSafety,
  MdSportsSoccer,
  MdFastfood,
  MdOutlineDesignServices,
} from "react-icons/md";
import { AiFillCloud, AiFillMobile } from "react-icons/ai";
import {
  SiAdobeillustrator,
  SiBlockchaindotcom,
  SiSpringsecurity,
} from "react-icons/si";
import CategoryItem from "./CategoryItem";

interface CategoriesProps {
  item: Category[];
}

const IconMap: Record<string, IconType> = {
  "Computer Science": FaLaptopCode,
  "Data Science": FaChartLine,
  "Artificial Intelligence": FaBrain,
  "Machine Learning": FaBrain,
  "Web Development": FcGlobe,
  "Mobile App Development": AiFillMobile,
  Cybersecurity: SiSpringsecurity,
  "Cloud Computing": AiFillCloud,
  Blockchain: SiBlockchaindotcom,
  "Software Engineering": FcEngineering,
  "Game Development": FaGamepad,
  "Programming Languages": FaLaptopCode,
  "UI/UX Design": MdOutlineDesignServices,
  "Business & Management": FaBusinessTime,
  "Marketing & SEO": FaChartLine,
  "Finance & Investing": FaChartLine,
  "Personal Development": FaMicrophone,
  "Health & Fitness": MdHealthAndSafety,
  "Yoga & Meditation": MdHealthAndSafety,
  Photography: FcCamera,
  "Video Editing": FcCamera,
  Filmmaking: FcCamera,
  "Music & Audio Production": FcMusic,
  "Graphic Design": SiAdobeillustrator,
  "Animation & Motion Graphics": SiAdobeillustrator,
  "Writing & Content Creation": FaMicrophone,
  "Public Speaking": FaMicrophone,
  "Cooking & Culinary Arts": MdFastfood,
  "Psychology & Mental Health": FaBrain,
  "Sports & Athletics": MdSportsSoccer,
  "Language Learning": FaMicrophone,
  "Ethical Hacking": SiSpringsecurity,
  "Robotics & IoT": FcEngineering,
  "Fashion & Styling": MdOutlineDesignServices,
  "Interior Design": MdOutlineDesignServices,
  "Digital Art & Illustration": SiAdobeillustrator,
};

const Categories = ({ item }: CategoriesProps) => {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-2 pb-2">
        {item.slice(0, 15).map((category) => (
          <CategoryItem
            key={category.id}
            label={category.name}
            icon={IconMap[category.name]}
            value={category.id}
          />
        ))}
      </div>
    </>
  );
};

export default Categories;
