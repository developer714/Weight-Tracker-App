import React, { useContext } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";

export default function ManagementLayout({ children }) {
  const { activeTab, setActiveTab } = useContext(GlobalContext);
  return (
    <div className="w-full h-screen flex flex-col justify-end">
      <div className="overflow-auto" style={{ height: "100%" }}>
        {children}
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex justify-around py-2">
          <button
            className="text-gray-500"
            onClick={() => setActiveTab("summary")}
          >
            {activeTab === "summary" ? (
              <div className="flex flex-col items-center">
                <img
                  className="w-7 h-7"
                  alt="Heart icon"
                  src="static/img/heart-svgrepo-com.svg"
                />
                <span className="text-xs text-black font-bold">Summary</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  className="w-7 h-7"
                  alt="Heart icon"
                  src="static/img/heart-unactive.svg"
                />
                <span className="text-xs">Summary</span>
              </div>
            )}
          </button>
          <button
            className="text-gray-500"
            onClick={() => setActiveTab("weight")}
          >
            {activeTab === "weight" ? (
              <div className="flex flex-col items-center">
                <img
                  className="relative w-7 h-7"
                  alt="Weight svgrepo com"
                  src="static/img/weight-active.svg"
                />
                <span className="text-xs text-black font-bold">Weight</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  className="relative w-7 h-7"
                  alt="Weight svgrepo com"
                  src="static/img/weight-svgrepo-com.svg"
                />
                <span className="text-xs">Weight</span>
              </div>
            )}
          </button>
          <button
            className="text-gray-500"
            onClick={() => setActiveTab("shots")}
          >
            {activeTab === "shots" ? (
              <div className="flex flex-col items-center">
                <img
                  className="relative w-7 h-7"
                  alt="Medicine svgrepo"
                  src="static/img/medicine-active.svg"
                />
                <span className="text-xs text-black font-bold">Shots</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <img
                  className="relative w-7 h-7"
                  alt="Medicine svgrepo"
                  src="static/img/medicine-10-svgrepo-com.svg"
                />
                <span className="text-xs">Shots</span>
              </div>
            )}
          </button>
          <button className="text-gray-500">
            <div
              className="flex flex-col items-center"
              onClick={() => setActiveTab("more")}
            >
              {activeTab === "more" ? (
                <div
                  className="flex flex-col items-center"
                  onClick={() => setActiveTab("more")}
                >
                  <img
                    className="relative w-7 h-7"
                    alt="More svgrepo com"
                    src={
                      activeTab === "more"
                        ? "static/img/more-svgrepo-com-active.svg"
                        : "static/img/more-svgrepo-com.svg"
                    }
                  />
                  <span className="text-xs text-black font-bold">More</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <img
                    className="relative w-7 h-7"
                    alt="More svgrepo com"
                    src="static/img/more-svgrepo-com.svg"
                  />
                  <span className="text-xs">More</span>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
