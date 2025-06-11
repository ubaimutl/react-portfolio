import myImage from "./assets/images/trader_portfolio_img.jpg";
import cryptoImage from "./assets/images/crypto_coins.jpeg";
import sentimentImage from "./assets/images/sentiment-analysis.webp";

const logotext = "DAVID";
const meta = {
  title: "David Gadyan",
  description:
    "I’m David Gadyan data scientist _ Algorithmic Trader, Data Scientist, exploring 🌍",
};

const introdata = {
  title: "I’m David Gadyan",
  animated: {
    first: "Algorithmic Trader",
    second: "Data Scientist",
    third: "Full Stack Developer",
    forth: "Generative AI Engineer",
  },
  description:
    "Enhancing Crypto Trading Strategy for high-probability setups using AI.",
  your_img_url: myImage,
};

const dataabout = {
  title: "Bio",
  aboutme: `
    Welcome! 
    
    I'm David, a seasoned Data Scientist with over 7 years of experience and a track record of 170+ successful projects in Data Science field and another 7 years in Finance sector. My expertise lies in transforming complex business challenges into innovative solutions powered by AI and my creative problem-solving skills.

    Major part of my services are represented in enhancing Crypto Trading Strategy for high-probability setups using AI.

    Comprehensive AI Solutions: Whether you need to validate a business idea with a robust MVP or enhance your existing services, I specialize in delivering tailored AI solutions that drive success.

    I am dedicated to contributing to your projects in a way that ensures **mutual success**. My strategic approach not only addresses immediate business needs but also positions your projects for long-term growth and innovation.

    If you're looking to leverage cutting-edge AI technologies to elevate your business, let's connect and turn your vision into reality. Trust in my proven expertise to navigate the complexities of your data science journey.
    `,
};
const worktimeline = [
  {
    jobtitle: "PMBA Data Science",
    where: "AUA American University of Armenia",
    date: "2017-2020",
  },
  {
    jobtitle: "Accountant",
    where: "Ernst & Young",
    date: "2017-2018",
  },
  {
    jobtitle: "Data Science for Decision Making",
    where: "Barcelona School of Economics",
    date: "2022-2023",
  },
  {
    jobtitle: "Data Scientist",
    where: "Upwork.com",
    date: "2018-Present",
  },
];

const skills = [
  {
    name: "Data Science",
    value: 95,
  },
  {
    name: "Machine Learning & Deep Learning",
    value: 90,
  },
  {
    name: "Algorithmic Trading",
    value: 85,
  },
  {
    name: "Generative AI",
    value: 80,
  },
  {
    name: "Full Stack Development",
    value: 60,
  },
];

const services = [
  {
    title: "Algorithmic Trading Strategy Development",
    description:
      "Build AI powered crypto trading strategies with technical and fundamental analysis techniques.",
  },
  {
    title: "Data Science Projects",
    description:
      "Solve business problems and make automations using Machine Learning, Deep Learning, Reinforcement Learning, Computer Vision.",
  },
  {
    title: "Building websites and mobile apps",
    description: "Build website and mobile apps with AI models running inside.",
  },
];

const dataportfolio = [
  {
    img: sentimentImage,
    description: "Sentiment Monitoring QLora Fine-tuned TinyLlama Tool",
    link: "https://github.com/DavidGadyan/project_news_social_sentiment_crypto",
  },
  {
    img: cryptoImage,
    description: "Traded Crypto Portfolio Diversification",
    link: "https://github.com/DavidGadyan/project_crypto_negative_cointegration",
  },
  {
    img: "https://picsum.photos/400/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/600/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/300/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/700/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },

  {
    img: "https://picsum.photos/400/600/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/300/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/550/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
  {
    img: "https://picsum.photos/400/700/?grayscale",
    description:
      "The wisdom of life consists in the elimination of non-essentials.",
    link: "#",
  },
];

const contactConfig = {
  YOUR_EMAIL: "name@domain.com",
  YOUR_FONE: "(555)123-4567",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vehicula eu nunc et sollicitudin. Cras pulvinar, nisi at imperdiet pharetra. ",
  // creat an emailjs.com account
  // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
  YOUR_SERVICE_ID: "service_id",
  YOUR_TEMPLATE_ID: "template_id",
  YOUR_USER_ID: "user_id",
};

const socialprofils = {
  linkedin: "https://www.linkedin.com/in/davidgadyan",
  github: "https://github.com/DavidGadyan",
  twitter: "https://x.com/aicrypto42",
};
export {
  meta,
  dataabout,
  dataportfolio,
  worktimeline,
  skills,
  services,
  introdata,
  contactConfig,
  socialprofils,
  logotext,
};
