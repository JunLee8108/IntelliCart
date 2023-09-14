import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

type Cardtype = {
  id: number;
  icon: IconDefinition;
  title: string;
  subtitle: string;
};

const CardData: Cardtype[] = [
  {
    id: 0,
    icon: faRobot,
    title: "AI-Powered",
    subtitle:
      "The latest in machine learning technology to provide a personalized, efficient, and futuristic shopping experience.",
  },
  {
    id: 0,
    icon: faImage,
    title: "Image Recognition",
    subtitle:
      "Upload images, and our advanced image recognition system will find products matching your style.",
  },
  {
    id: 0,
    icon: faMoneyCheckDollar,
    title: "Dynamic Pricing",
    subtitle:
      "AI-powered IntelliCart not only analyzes your image to find the best product but also ensures you always get the best deal.",
  },
];

const navbarItem: string[] = ["SHOP", "ACCOUNT", "CART"];

export { CardData, navbarItem };
