import React, { useState } from "react";

const ContactUsModal = ({ isOpen, onClose }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSendMessage = () => {
    // Handle sending the message (e.g., send to backend)
    console.log("Subject:", subject);
    console.log("Message:", message);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 w-80">
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <h2 className="text-lg font-bold">Contact us</h2>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send us a message"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          />
        </div>
        <button
          onClick={handleSendMessage}
          className="w-full py-2 bg-[#50B498] text-white rounded-lg"
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactUsModal;
