// import logo1 from "./assets/images/logo2.png";
import jas_pic from "./assets/images/jas_pic.png";

const logotext = "JS Singh" ;
const meta = {
    title: "Jaskirat Singh",
    description: "I’m Jaskirat Singh Web Designer and Developer _ Full stack devloper,currently working in Berlin",
};

const introdata = {
    title: "Hi, I’m Jaskirat",

animated: {
        first: "I love coding . . .",
        second: "I code Stunning websites . . .",
        third: "I like to Design UI/UX . . .",
    },
    description: "I'm a student at NAIT studying Digital Media and IT with a focus on Web Design and Development. I'm easygoing and friendly, and love working with people. I hope we can work together soon",
    // your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
    your_img_url: jas_pic,
};

const dataabout = {
    title: "A bit about myself",
    aboutme: "I'm Jaskirat Singh, an aspiring web and UI/UX designer hailing from Edmonton. I'm passionate about crafting designs that seamlessly blend functionality and aesthetics. After all, what good is a design if it's not only functional but also visually captivating? I aim to strike that perfect balance in my work, always with the support of a talented team.",
    
    aboutme2: "Currently, I'm pursuing my education at NAIT in the Digital Media and IT program, specializing in Web Design and Development.While I may be relatively new to the field, I've always had an innate appreciation for exceptional design. I hope that my work reflects the dedication I've poured into mastering this new, exciting world and offers a fresh perspective to the design landscape.",

};


// const worktimeline = [{
//         jobtitle: "Designer of week",
//         where: "YAdfi",
//         date: "2020",
//     },
//     {
//         jobtitle: "Designer of week",
//         where: "Jamalya",
//         date: "2019",
//     },
//     {
//         jobtitle: "Designer of week",
//         where: "ALquds",
//         date: "2019",
//     },
// ];

const skills = [{
        name: "HTML/CSS",
        value: 95,
    },
    {
        name: "React",
        value: 80,
    },
    {
        name: "Javascript",
        value: 90,
    },
    {
        name: "Figma",
        value: 95,
    },
    {
        name: "Wordpress",
        value: 70,
    },
];

const services = [
    {
      title: "Kite Flying",
      description: "Kite flying is my cherished passion, a colorful symphony in the open sky. I love soaring kites with friends, competing to see whose kite can reach greater heights and distances, creating lasting memories of shared laughter and friendly competition.",
      image: "kite_fly.webp",
    },
    {
      title: "Chess",
      description: "I have a deep love for chess, a game that has been a part of my life since high school. I take pride in having won prizes during those days, and I continue to enjoy the strategic challenges it offers.",
      image: "chess.webp",
    },
    {
      title: "Fun Coding",
      description: "I have a passion for fun coding, where I constantly explore, build, and learn. It's a hobby that allows me to create new things and dive into the exciting world of programming.Recently, I created a weather app using JavaScript that provides real-time weather updates, showcasing my coding skills and enthusiasm for building practical applications.",
      image: "cod.webp",
    },
  ];
  

  const dataportfolio = [
    {
        img: "choc_img.webp",
        heading: "Chocolate Business",
        description: "I designed and created the chocolate-selling website with a vision to combine my passion for delectable chocolates and my growing interest in web development.With the use of HTML and CSS, I aimed to make the website not just a place to buy chocolates but an online chocolate haven, engaging visitors and evoking their cravings.Constructive feedback from users played a significant role in fine-tuning the website, and I'm continuously working to enhance the user experience.",
        link: "https://chocolates-business-site.netlify.app/",
    },
 
    {
        img: "bd_ecommerce.webp",
        heading: "Bedding Desire E-Commerce",
        description: "It is an ecommerce website that brings the world of fabrics and bedsheets to your fingertips. Designed using WordPress, the platform was born from the idea of making the online shopping experience as user-friendly as possible.Primary objective was to create a website that not only offers a diverse range of high-quality fabrics and bedsheets but also ranks among the top results on search engines. With a strong focus on SEO skills, we worked diligently to ensure that BeddingDesire.ca appears prominently in search engine results, making it easier for our customers to find what they desire. My efforts have been successful, and our client is delighted with the outcome.",
        link: "https://beddingdesire.ca/",
    },
    {
        img: "registration.webp",
        heading: "Regstration Form",
        description: "It features a simple and effective registration form for dog care services. Developed using basic HTML and CSS, the design is clean and user-friendly, prioritizing ease of use for visitors. The form is thoughtfully structured to capture essential information, ensuring a seamless registration process for individuals seeking dog care services. With a minimalist yet visually appealing style, the website provides a straightforward and pleasant experience for users interested in signing up. The combination of basic HTML for structure and CSS for styling results in a functional and aesthetically pleasing registration form that serves its purpose with clarity and simplicity.",
        link: "https://dogcare-registration-form.netlify.app/",
    },
    {
        img: "authorbook.webp",
        heading: "Fetching Author Publications ",
        description: "I showcased advanced skills in React, Pages, and Next.js. The project centered on dynamic routing, utilizing the Internet Archives Open Library API to display book covers. Clicking the 'View Details' button for a favorite author's book dynamically rendered a new page with a URL path like '/book/bookIdHere,' leveraging Dynamic Routes. Key tasks encompassed creating a Navbar link for efficient Home page navigation and implementing a 'TableCell' with a 'Button' in the Book Table to dynamically navigate to the 'book' page ('/book/SOMEWORKID') using the Next Router.",
        
        description2: "The intricately designed book page efficiently extracted bookId parameters, initiated asynchronous calls to the Open Library Books API, and rendered Medium Covers using MUI components like Container, Grid, Typography, ImageList, and ImageListItem. Maintaining a high standard of code formatting and style, adhering to best practices, and undergoing linting for error-free execution, the project received a commendable grade, demonstrating proficiency in completing tasks to a professional standard.",
        link: "https://authorbooklibrary.netlify.app/",
    },
    {
        img: "cultivate.webp",
        heading: "My First Bootstrap Site",
        description: "This project showcases your growing proficiency in web development using Bootstrap, a powerful front-end framework. The website embodies a clean and responsive design, highlighting your commitment to creating a user-friendly experience. Leveraging Bootstrap's grid system, components, and styling, you've successfully crafted a platform for a crops cultivation business that is both visually appealing and functionally effective. The seamless integration of Bootstrap's features demonstrates your ability to harness modern web development tools to build dynamic and responsive websites. This project is a testament to your evolving skills and marks an important milestone in your journey as a web developer.",
        link: "https://crops-cultivation-business.netlify.app/",
    },
    {
        img: "weather.webp",
        heading: "Weather App Built in React",
        description: "In the development of the Current Weather Display App, I implemented a robust solution that effectively demonstrates my proficiency in JavaScript, NPM, Node.js, and parcel usage. The project integrates the OpenWeatherMap API, requiring the use of an API key for data retrieval. Two essential functions, getWeather and renderWeather, were implemented in separate files as instructed, showcasing a solid understanding of modular code organization and usage of JavaScript promises. The DOM API manipulation was skillfully executed, dynamically updating the weather information on the page upon submitting a city search. Overall, the project achieved a high level of proficiency, meeting or exceeding the outlined criteria and demonstrating a strong command of JavaScript development practices.",
        link: "https://weather66.netlify.app/",
    },
    {
        img: "fetchbooks.webp",
        heading: "Add your favourite Books ",
        description: "I successfully developed a React application that demonstrates a comprehensive understanding of React's fundamental concepts, including events, state management, and conditionals. The project employs Next.js and leverages the Material-UI library for a visually appealing and responsive design. I ensured the correct implementation of useState hooks, stateful variables, and event handling in the form. The application dynamically updates the book list based on user inputs and gracefully handles form submissions, resetting input fields upon successful additions. Additionally, I implemented error handling, displaying an alert message when attempting to submit the form with empty fields. Overall, this showcases my proficiency in React development, emphasizing clean code practices and a strong grasp of core React concepts.",
        link: "https://fetchbooks.netlify.app/",
    },   
    {
        img: "tail_img.webp",
        heading: "Web Dashboard (Tailwind CSS)",
        description: "I embarked on a journey to create a team management platform, inspired by the simplicity and effectiveness of tools like Monday.com. Crafted with a blend of Tailwind CSS, JavaScript, HTML, and CSS, my objective was clear: to design a user-friendly interface that promotes seamless collaboration and efficient task management. With a deep commitment to user experience, I diligently incorporated feedback from individuals and teams who shared their insights and needs. The result is a platform that strives to make work feel more human, intuitive, and productive.",
        link: "https://web-dashboard-tailwind.netlify.app/",
    },
  
];

const contactConfig = {
    YOUR_EMAIL: "sjaskirat247@gmail.com",
    YOUR_FONE: "(780)992-3421",
    description: "Feel free to reach out and let's work together on an exciting project! Whether you have an idea in mind or need some help, I'm here to make it happen. Whether you want to leave a feedback on my projects, I'm all ears.",
    // creat an emailjs.com account 
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: "service_gla9wp2",
    YOUR_TEMPLATE_ID: "template_chi9pmq",
    YOUR_PUBLIC_KEY: "B81GKOSVTay74X5hD",
};

const socialprofils = {
    github: "https://github.com/sjaskirat247",
    linkedin: "https://www.linkedin.com/in/jaskirat-singh99/",
    youtube: "https://www.youtube.com/channel/UCyDwR9vcUD0JCPQlloTtDZQ"
};
export {
    meta,
    dataabout,
    dataportfolio,
    // worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};