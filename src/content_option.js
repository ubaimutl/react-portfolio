import im1 from ".//assets/images/17a.JPG";
import im2 from ".//assets/images/idk.JPG";
import im3 from ".//assets/images/page 1b.JPG";
import im4 from ".//assets/images/page 4a.JPG";
import im5 from ".//assets/images/page 6a.JPG";
import im6 from ".//assets/images/page 14b.JPG";
import im7 from ".//assets/images/page 16a.JPG";
import im8 from ".//assets/images/page i.JPG";
import im9 from ".//assets/images/page15a.JPG";

const logotext = "SK8@Cal";
const meta = {
  title: "John Doe",
  description: "UC Berkeley's Skating Orgnaization",
};

const introdata = {
  title: "Sk8 @ Cal",
  animated: {
    first: "Dynamic",
    second: "Creative",
    third: "Adventurous",
  },
  description: "UC Berkeley's premiere skating organization",
  your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
  title: "Who we are",
  aboutme:
    "Skateboarding at Berkeley founded in 2021 is UC Berkeley’s only skateboarding organization out of 1000+ student-led groups on campus. We teach students how to skate, organize collegiate skate events, and host annual skate competitions. Our impact comes from helping people with their physical and mental wellbeing by facilitating creative expressions through skateboarding.",
};

const dataportfolio = [
  {
    img: im1,
    desctiption:
      "A candid photo of the skateboarding community sharing good laughs",
  },
  {
    img: im2,
    desctiption: "Maza performing a back 50-50 at the Berkeley skatepark",
  },
  {
    img: im3,
    desctiption: "An alternative perspective of a tre flip performed by Zach",
  },
  {
    img: im4,
    desctiption: "Maza, David, and Jon resting at the Berkeley skatepark",
  },
  {
    img: im5,
    desctiption:
      " David doing a slappy krook at lower sproul (the “skate park” of campus)",
    link: "#",
  },
  {
    img: im6,
    desctiption: "A nose manuel at Rockridge",
  },

  {
    img: im7,
    desctiption: "A broken board at the Stanford skate retreat",
  },
  {
    img: im8,
    desctiption: "A wall ride performed by Jesus at Rockridge",
  },
  {
    img: im9,
    desctiption: "A nose grind performed by Jon",
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
  instagram: "https://www.instagram.com/skateboardingatberkeley/",
};
export {
  meta,
  dataabout,
  dataportfolio,
  introdata,
  contactConfig,
  socialprofils,
  logotext,
};
