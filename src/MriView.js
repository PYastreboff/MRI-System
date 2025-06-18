import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function MriView({ setPage, currentPatient }) {
  return (
    <div className="min-h-screen bg-blue-50 p-8 flex-1">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6 w-full">
        {/* Left: Greeting */}
        <h1 className="text-3xl text-left">Hello Admin User 👋🏼,</h1>

        {/* Right: Search Bar (not functional here but retained for UI consistency) */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search people..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </div>
      </div>

      {/* MRI View Box */}
      <div className="mx-auto bg-white p-6 rounded-2xl shadow mb-8">
        {/* Title with Back Icon */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => setPage("dashboard")}
            className="mr-3 text-gray-600 hover:text-gray-800 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-left">
            <span className="text-gray-500">MRI View for Patient -</span> {currentPatient.name}
          </h1>
        </div>

        <h2 className="text-sm mb-2 text-light text-left text-slate-500 max-w-[50%]">
          Doctors notes for the patient, these can be anything from simple notes to important notes about the scan that other doctors might need to know.
        </h2>

        <ul>{/* Optional: future list items */}</ul>

        <div className="flex items-center justify-center w-full h-full py-20 my-20 text-gray-400 text-center">
          Placeholder for Scan Editor - most likely using this&nbsp;<a className="text-blue-500 hover:underline" target="_blank" href="https://github.com/SOCR/SOCR_BrainViewer/tree/main?fbclid=IwZXh0bgNhZW0CMTEAAR670b2QmX18NWK3P9oScLu_z9YpKRKUlFsO3FFnQb-dpbi5w8CwPLjfKhZyfw_aem_zQDLCTH7NqLc7FqEd6eQFg"> Brain Viewer</a>.
        </div>
      </div>
    </div>
  );
}

export default MriView;
