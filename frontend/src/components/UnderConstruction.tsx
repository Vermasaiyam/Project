import { useNavigate } from "react-router-dom";
import { ArrowLeft, Construction, Clock, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[screen] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Bottom-right blob */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl translate-y-1/2"></div>

        {/* Bottom-left blob */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl translate-y-1/2"></div>
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Main Content Card */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
              <Construction className="text-white" size={32} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Under Construction
            </h1>
            <p className="text-blue-100 text-lg">
              We're working hard to bring you something amazing
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Main Message */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-amber-50 dark:bg-amber-900/20 rounded-full">
                <Clock className="text-amber-600 dark:text-amber-400" size={20} />
                <span className="text-amber-800 dark:text-amber-200 font-medium">
                  Coming Soon
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-lg mx-auto">
                Coming soon! Thanks for waiting.
              </p>
            </div>

            {/* Features Preview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
                What's Coming
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Enhanced Features</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">New functionality and improvements</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center mx-auto">
                    <Building2 className="text-purple-600 dark:text-purple-400" size={20} />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Better Interface</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Improved user experience</p>
                </div>
                
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="text-green-600 dark:text-green-400" size={20} />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">Faster Performance</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Optimized for speed</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <ArrowLeft size={18} />
                Go Back
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
              >
                <Building2 size={18} />
                Go to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;