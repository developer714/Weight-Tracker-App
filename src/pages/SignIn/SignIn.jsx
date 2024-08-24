import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ArrowUp } from "../../component/Icons/ArrowUp";
import {
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../firebase";
import { Paths } from "../../AppConstants";
import { GlobalContext } from "../../contexts/GlobalContext";
import Loading from "../Loading/Loading";
import { UserContext } from "../../contexts/UserContext";

const InputField = ({
  label,
  value,
  type = "text",
  icon,
  onChange,
  placeholder,
  onIconClick,
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {icon && (
        <img
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          alt={label}
          src={icon}
          onClick={onIconClick}
        />
      )}
    </div>
  </div>
);

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const { loading, setLoading } = useContext(GlobalContext);
  const { setUid } = useContext(UserContext);

  const handleBackClick = () => {
    navigate(Paths.HOME);
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    if (!password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSignIn = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        setLoading(true);
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userProfile = doc(collection(firestore, "users"), user?.uid);
        await updateDoc(userProfile, {
          last_login_at: serverTimestamp(),
        });
        setUid(user?.uid);
        sessionStorage.setItem("uid", user?.uid);
        setLoading(false);
        navigate(Paths.START_WEIGHT);
      } catch (error) {
        setAlertMessage(error.message);
        setShowAlert(true);
      }
    }
  };

  const handleSignUp = () => {
    navigate(Paths.SIGN_UP);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4 cursor-pointer" onClick={handleBackClick}>
          <ArrowUp />
        </div>
        <img
          className="mx-auto h-40 w-auto"
          alt="Logo"
          src="static/img/image-1.png"
        />
        <div className="text-center mb-6">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#50B498]">
            Welcome to Med
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
          </p>
        </div>
        <div className="mb-4">
          <InputField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            icon="static/img/email-svgrepo-com.svg"
          />
          {errors.email && (
            <div className="text-red-500 text-xs italic">{errors.email}</div>
          )}
          <InputField
            label="Password"
            value={password}
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            icon="static/img/eye-svgrepo-com-1.svg"
            onIconClick={() => setShowPassword(!showPassword)}
          />
          {errors.password && (
            <div className="text-red-500 text-xs italic">{errors.password}</div>
          )}
          <div className="text-right">
            <a
              className="text-balck hover:text-blue-700 cursor-pointer"
              onClick={() => navigate(Paths.FORGOT_PASSWORD)}
            >
              Forgot Password?
            </a>
          </div>
        </div>
        <div className="flex items-center justify-center mb-4 cursor-pointer bg-[#50B498] text-white py-1 px-4 rounded">
          <button
            className="bg-[#50B498] hover:bg-[#50B498] text-white font-bold py-1 px-6 rounded-full focus:outline-none focus:shadow-outline"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </div>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={handleSignUp}
          >
            Sign Up
          </a>
        </p>
      </div>
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Error</h2>
            <p>{alertMessage}</p>
            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => setShowAlert(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
