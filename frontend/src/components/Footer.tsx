import { Github, Instagram, Linkedin, Mail, X, Building2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Link to={"/"} className="flex items-center space-x-3 group">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-200">
                <Building2 className="text-white h-8 w-8" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-gray-900 dark:text-white">
                  HR Portal
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Employee Management System
                </span>
              </div>
            </Link>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-md">
              Empowering organizations with comprehensive HR solutions. Streamline your workforce management and enhance employee experience.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <Link
                to={"https://github.com/Vermasaiyam"}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                title="Follow us on GitHub"
              >
                <Github className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </Link>
              <Link
                to={"https://www.linkedin.com/in/saiyam05/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition-colors" />
              </Link>
              <Link
                to={"https://x.com/SaiyamVerm91813/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                title="Follow on X"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              </Link>
              <Link
                to={"https://www.instagram.com/s.verma0504/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                title="Follow on Instagram"
              >
                <Instagram className="w-5 h-5 text-pink-600 group-hover:text-pink-700 transition-colors" />
              </Link>
              <Link
                to={"mailto:vermasaiyam9@gmail.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
                title="Send us an email"
              >
                <Mail className="w-5 h-5 text-green-600 group-hover:text-green-700 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resources
            </h3>
            <div className="space-y-3">
              <Link 
                to="/handbook" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Employee Handbook
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                to="/leave-policy" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Leave Policy
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                to="/hr-guidelines" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                HR Guidelines
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                to="/policies" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Company Policies
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Support
            </h3>
            <div className="space-y-3">
              <Link 
                to="/help" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Help Center
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                to="/faqs" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                FAQs
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                to="/contact" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Contact HR
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link 
                to="/feedback" 
                className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Send Feedback
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex flex-col md:flex-row items-center gap-2 text-gray-600 dark:text-gray-400">
              <p className="text-sm">
                © {new Date().getFullYear()}{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  HR Portal
                </span>
                . All rights reserved.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link 
                to="/cookies" 
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
      </div>
    </footer>
  );
};

export default Footer;
