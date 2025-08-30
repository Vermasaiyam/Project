import { Github, Instagram, Linkedin, Mail, X } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="flex lg:flex-row flex-col gap-8 justify-around items-center py-6 bg-lightGreen dark:bg-[#2E3A52] md:px-10 px-4">
        {/* Logo + tagline */}
        <div className="text-center lg:text-left">
          <Link to={"/"} className="flex items-center justify-center lg:justify-start">
            <img src="/logo.png" alt="HR Portal Logo" className="md:h-20 h-16 mr-2" />
            <span className="md:font-bold md:text-xl font-semibold text-lg text-hoverGreen dark:text-white">
              HR Portal
            </span>
          </Link>
          <p className="text-gray-600 mt-2 mb-4 dark:text-yellow-50">
            Empowering employees and simplifying HR management.
          </p>

          {/* Socials */}
          <div className="flex flex-row gap-2 justify-center lg:justify-start">
            <Link
              to={"https://github.com/Vermasaiyam"}
              target="_blank"
              title="Github"
              className="bg-white dark:bg-[#6D758C] p-1.5 rounded-full flex items-center justify-center"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              to={"https://www.linkedin.com/in/saiyam05/"}
              target="_blank"
              title="LinkedIn"
              className="bg-white dark:bg-[#6D758C] p-1.5 rounded-full flex items-center justify-center"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              to={"https://x.com/SaiyamVerm91813/"}
              target="_blank"
              title="X"
              className="bg-white dark:bg-[#6D758C] p-1.5 rounded-full flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </Link>
            <Link
              to={"https://www.instagram.com/s.verma0504/"}
              target="_blank"
              title="Instagram"
              className="bg-white dark:bg-[#6D758C] p-1.5 rounded-full flex items-center justify-center"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              to={"mailto:vermasaiyam9@gmail.com"}
              target="_blank"
              title="E-mail"
              className="bg-white dark:bg-[#6D758C] p-1.5 rounded-full flex items-center justify-center"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Footer links */}
        <div className="flex flex-row md:gap-16 gap-8">
          <div className="flex flex-col md:gap-3 gap-2">
            <h1 className="font-bold text-darkGreen dark:text-white md:text-lg text-sm">
              Resources
            </h1>
            <div className="flex flex-col gap-1 md:text-base text-xs dark:text-yellow-100">
              <div>Employee Handbook</div>
              <div>Leave Policy</div>
              <div>HR Guidelines</div>
            </div>
          </div>

          <div className="flex flex-col md:gap-3 gap-2">
            <h1 className="font-bold text-darkGreen dark:text-white md:text-lg text-sm">
              Company
            </h1>
            <div className="flex flex-col gap-1 md:text-base text-xs dark:text-yellow-100">
              <div>About Us</div>
              <div>Careers</div>
              <div>Contact HR</div>
            </div>
          </div>

          <div className="flex flex-col md:gap-3 gap-2">
            <h1 className="font-bold text-darkGreen dark:text-white md:text-lg text-sm">
              Support
            </h1>
            <div className="flex flex-col gap-1 md:text-base text-xs dark:text-yellow-100">
              <div>Help Center</div>
              <div>FAQs</div>
              <div>Feedback</div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white dark:bg-[#6D758C] text-center md:py-5 py-4 px-4">
        <p className="text-sm text-hoverGreen dark:text-yellow-50">
          © {new Date().getFullYear()}{" "}
          <span className="text-hoverGreen font-bold dark:text-white">
            HR Portal
          </span>{" "}
          – All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
