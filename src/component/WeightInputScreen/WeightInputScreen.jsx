import React, { useState } from "react";

export function WeightInputScreen({
  title,
  subtitle,
  placeholder,
  buttonText,
  initialValue,
  onNext,
  onSkip,
  onBack,
  onChange,
}) {
  const [weight, setWeight] = useState(initialValue || "");
  const handleChange = (e) => {
    setWeight(e.target.value);
    onChange(e.target.value);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 text-center bg-white">
      <div
        className="absolute top-5 left-5 cursor-pointer p-1"
        onClick={onBack}
      >
        <img src="static/img/black-arrow.svg" alt="black-arrow"></img>
      </div>
      <img src="static/img/middle.svg" alt="middle"></img>
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-base mb-5 max-w-xs">{subtitle}</p>
      <div className="relative w-full max-w-xs mb-5">
        <label
          htmlFor="weight-input"
          className="block text-left text-sm font-medium text-gray-700 mb-1"
        >
          {placeholder}
        </label>
        <input
          id="weight-input"
          type="text"
          placeholder={placeholder}
          value={weight}
          onChange={handleChange}
          className="w-full p-3 text-base border border-gray-300 rounded-lg"
        />
        <span className="absolute right-3 bottom-3 text-lg text-gray-400">
          KG
        </span>
      </div>
      <div className="flex justify-between w-full max-w-xs mt-9">
        <button onClick={onSkip} className="text-gray-500">
          Skip
        </button>
        <button
          onClick={onNext}
          className="px-6 py-3 text-lg font-semibold text-white bg-[#50B498] rounded-full"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default WeightInputScreen;
