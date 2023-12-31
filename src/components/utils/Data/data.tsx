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

const CardDescription = [
  {
    id: 0,
    description:
      "We've seamlessly integrated the latest in machine learning technology to provide a personalized, efficient, and futuristic shopping experience. Whether you're looking for product recommendations tailored just for you, voice-activated searches, or real-time customer service through our intelligent chatbot, IntelliCart is designed to transform how you shop online. Our platform isn't just about buying — it's about experiencing. Upload images, and our advanced image recognition system will find products matching your style. With augmented reality try-ons and dynamic pricing that ensures you always get the best deal, we aim to make every step of your shopping journey intuitive and enjoyable.",
    for: "desktop",
  },
  {
    id: 0,
    description:
      "Our platform isn't just about buying — it's about experiencing. Upload images, and our advanced image recognition system will find products matching your style. With augmented reality try-ons and dynamic pricing that ensures you always get the best deal, we aim to make every step of your shopping journey intuitive and enjoyable.",
    for: "mobile",
  },
];

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

const navbarItem: string[] = ["ACCOUNT", "SHOP", "CART"];

const accountSubmenu: string[] = [
  "Edit Profile",
  "Upload Image",
  "History",
  "Sign Out",
];

const shopData = [
  {
    id: 0,
    img: "/imgs/shop/jeans1.webp",
    brand: "Wrangler Authentics",
    title: "Men's Regular Fit Comfort Flex Waist Jean",
    price: 29,
    rating: 3.7,
    reviews: 33298,
  },
  {
    id: 1,
    img: "/imgs/shop/jeans2.webp",
    brand: "Levi's",
    title: "Men's Big and Tall 501 Original Fit Jean",
    price: 47,
    rating: 4.6,
    reviews: 11200,
  },
  {
    id: 2,
    img: "/imgs/shop/jeans3.webp",
    brand: "Amazon Essentials",
    title: "Men's Athletic-Fit Stretch Jean",
    price: 35,
    rating: 1.7,
    reviews: 323,
  },
];

export { CardDescription, CardData, navbarItem, accountSubmenu, shopData };
