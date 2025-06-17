import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Help({ setPage }) {
  const faqs = [
    {
      question: "How do I navigate between different pages?",
      answer: "Use the sidebar on the left to access the Dashboard, MRI scans, and User Management sections."
    },
    {
      question: "How can I view more information about a patient?",
      answer: "Click on any row in the patient tables to view their detailed MRI scan and history."
    },
    {
      question: "What does 'Suspected' mean?",
      answer: "This status is assigned by the AI when a potential anomaly is detected in the patient's scan."
    },
    {
      question: "How can I log out?",
      answer: "Click the 'Logout' option at the bottom of the sidebar."
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50 p-8 flex-1">
      {/* Title with Back Icon */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => setPage("dashboard")}
          className="mr-3 text-gray-600 hover:text-gray-800 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
        </button>
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h3 className="text-md font-medium text-blue-700">{faq.question}</h3>
              <p className="text-gray-600 text-sm mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Need More Help?</h2>
        <p className="text-gray-600 mb-2">
          If your issue isn't listed above, please contact your system administrator or reach out to our support team.
        </p>
        <a
          href="mailto:support@example.com"
          className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}

export default Help;
