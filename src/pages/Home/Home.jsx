import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../../firebase";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Paths } from "../../AppConstants";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate(Paths.SIGNUP);
  };

  const handleSignIn = () => {
    navigate(Paths.SIGNIN);
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { user } = result;
      const userProfile = doc(collection(firestore, "users"), user?.uid);

      await setDoc(
        userProfile,
        {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          provider: "Google",
          created_at: serverTimestamp(),
          last_login_at: serverTimestamp(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleAppleSignUp = () => {
    console.log("Apple Sign Up");
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      <img
        className="mx-auto w-40 mb-8 pt-4 mt-10"
        alt="Logo"
        src="static/img/image-1.png"
      />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pb-4 mb-4 absolute bottom-0">
        <div className="text-center mb-4">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#50B498]">
            Welcome to Med
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem
          </p>
        </div>
        <div className="mb-4">
          <div
            className="flex items-center justify-center mb-4 cursor-pointer bg-[#50B498] text-white py-2 px-4 rounded"
            onClick={handleSignUp}
          >
            <img
              className="h-6 w-6 mr-2"
              alt="Sign up with Email"
              src="static/img/email-svgrepo-com.svg"
            />
            <div className="text-lg font-semibold">Sign up with Email</div>
          </div>
          <div
            className="flex items-center justify-center mb-4 cursor-pointer bg-[#50B498] text-white py-2 px-4 rounded"
            onClick={handleGoogleSignUp}
          >
            <img
              className="h-6 w-6 mr-2"
              alt="Continue with Google"
              src="static/img/google-svgrepo-com.svg"
            />
            <div className="text-lg font-semibold">Continue with Google</div>
          </div>
          <div
            className="flex items-center justify-center mb-4 cursor-pointer bg-[#50B498] text-white py-2 px-4 rounded"
            onClick={handleAppleSignUp}
          >
            <img
              className="h-6 w-6 mr-2"
              alt="Continue with Apple"
              src="static/img/apple-173-svgrepo-com.svg"
            />
            <div className="text-lg font-semibold">Continue with Apple</div>
          </div>
          <div
            className="flex items-center justify-center mb-4 cursor-pointer bg-[#50B498] text-white py-2 px-4 rounded"
            onClick={handleSignIn}
          >
            <div className="text-lg font-semibold">Join as Guest</div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-600">
          Already has an account?{" "}
          <a
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={handleSignIn}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
