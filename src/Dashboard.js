import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';

const ITEMS_PER_PAGE = 15;

function Dashboard({ peopleData, setPage, setCurrentPatient }) {
  const [search, setSearch] = useState("");
  const [currentSusPage, setCurrentSusPage] = useState(1);
  const [currentCheckedPage, setCurrentCheckedPage] = useState(1);

  const [todoCollapsed, setTodoCollapsed] = useState(false);
  const [reviewedCollapsed, setReviewedCollapsed] = useState(false);
  const [completedCollapsed, setCompletedCollapsed] = useState(false);

  const suspectedPeople = peopleData
  .filter(
    person =>
      (person.candidate === "suspected" || person.candidate === "ready") &&
      person.name.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (a.candidate === b.candidate) return 0;
    return a.candidate === "suspected" ? -1 : 1;
  });

  const checkedPeople = peopleData.filter(
    person =>
      person.candidate !== "suspected" &&
      person.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedSuspected = suspectedPeople.slice(
    (currentSusPage - 1) * ITEMS_PER_PAGE,
    currentSusPage * ITEMS_PER_PAGE
  );

  const paginatedChecked = checkedPeople.slice(
    (currentCheckedPage - 1) * ITEMS_PER_PAGE,
    currentCheckedPage * ITEMS_PER_PAGE
  );

  const totalSusPages = Math.ceil(suspectedPeople.length / ITEMS_PER_PAGE);
  const totalCheckedPages = Math.ceil(checkedPeople.length / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex-1">
      <div className="flex items-center justify-between mb-6 w-full">
        <h1 className="text-3xl text-left">Hello Admin User 👋🏼,</h1>
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search people..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setCurrentSusPage(1);
              setCurrentCheckedPage(1);
            }}
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

      {/* TODO List */}
      <div className="bg-white p-6 pb-3 rounded-2xl shadow mb-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-left">TODO List 📝</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 text-sm px-4 mr-3">
                Scan All With AI
            </button>
            <div className="text-sm text-red-700 font-medium">Immediate Action Required</div>
            <button
              onClick={() => setTodoCollapsed(prev => !prev)}
              className="text-2xl text-gray-500 hover:text-gray-800 ml-3"
            >
              {todoCollapsed ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
            </button>
          </div>
        </div>

        {!todoCollapsed && (
          <>
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-400 uppercase border-b">
                <tr>
                  <th className="py-2">Patient Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedSuspected.length > 0 ? (
                  paginatedSuspected.map(person => (
                    <tr
                      key={person.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setPage("mri");
                        setCurrentPatient(person);
                      }}
                    >
                      <td className="py-3">{person.name}</td>
                      <td>{person.phone}</td>
                      <td>{person.email}</td>
                      <td>{person.country}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded text-xs font-medium capitalize ${
                            person.candidate === "suspected"
                              ? "bg-yellow-100 text-yellow-700"
                              : person.candidate === "ready"
                              ? "bg-gray-200 text-gray-500"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {person.candidate === "suspected"
                            ? "Suspected  Case"
                            : "Ready to AI Scan"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-gray-500 py-4 text-center">
                      No suspected cases found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalSusPages > 1 && (
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setCurrentSusPage(p => Math.max(p - 1, 1))}
                  disabled={currentSusPage === 1}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-2 py-1 text-sm text-gray-600">
                  Page {currentSusPage} of {totalSusPages}
                </span>
                <button
                  onClick={() => setCurrentSusPage(p => Math.min(p + 1, totalSusPages))}
                  disabled={currentSusPage === totalSusPages}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Reviewed */}
      <div className="bg-white p-6 pb-3 rounded-2xl shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-left">Reviewed 📋</h1>
          <div className="flex items-center gap-2">
            <div className="text-sm text-green-700 font-medium">Reviewed Patients</div>
            <button
              onClick={() => setReviewedCollapsed(prev => !prev)}
              className="text-2xl text-gray-500 hover:text-gray-800  ml-3"
            >
              {reviewedCollapsed ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
            </button>
          </div>
        </div>

        {!reviewedCollapsed && (
          <>
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-400 uppercase border-b">
                <tr>
                  <th className="py-2">Patient Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedChecked.length > 0 ? (
                  paginatedChecked.map(person => (
                    <tr
                      key={person.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setPage("mri");
                        setCurrentPatient(person);
                      }}
                    >
                      <td className="py-3">{person.name}</td>
                      <td>{person.phone}</td>
                      <td>{person.email}</td>
                      <td>{person.country}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded text-xs font-medium capitalize ${
                            person.candidate === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : person.candidate === "false"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {person.candidate === "false"
                            ? "False Positive"
                            : person.candidate.charAt(0).toUpperCase() +
                              person.candidate.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-gray-500 py-4 text-center">
                      No confirmed or reviewed cases found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalCheckedPages > 1 && (
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setCurrentCheckedPage(p => Math.max(p - 1, 1))}
                  disabled={currentCheckedPage === 1}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-2 py-1 text-sm text-gray-600">
                  Page {currentCheckedPage} of {totalCheckedPages}
                </span>
                <button
                  onClick={() => setCurrentCheckedPage(p => Math.min(p + 1, totalCheckedPages))}
                  disabled={currentCheckedPage === totalCheckedPages}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Completed By Me */}
      <div className="bg-white p-6 pb-3 rounded-2xl shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-left">Completed By Me ✅</h1>
          <div className="flex items-center gap-2">
            <div className="text-sm text-green-700 font-medium">Reviewed Patients</div>
            <button
              onClick={() => setCompletedCollapsed(prev => !prev)}
              className="text-2xl text-gray-500 hover:text-gray-800  ml-3"
            >
              {completedCollapsed ? <FontAwesomeIcon icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}
            </button>
          </div>
        </div>

        {!completedCollapsed && (
          <>
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="text-xs text-gray-400 uppercase border-b">
                <tr>
                  <th className="py-2">Patient Name</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedChecked.length > 0 ? (
                  paginatedChecked.map(person => (
                    <tr
                      key={person.id}
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        setPage("mri");
                        setCurrentPatient(person);
                      }}
                    >
                      <td className="py-3">{person.name}</td>
                      <td>{person.phone}</td>
                      <td>{person.email}</td>
                      <td>{person.country}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded text-xs font-medium capitalize ${
                            person.candidate === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : person.candidate === "false"
                              ? "bg-red-100 text-red-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {person.candidate === "false"
                            ? "False Positive"
                            : person.candidate.charAt(0).toUpperCase() +
                              person.candidate.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-gray-500 py-4 text-center">
                      You have no annotated scans with this search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalCheckedPages > 1 && (
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setCurrentCheckedPage(p => Math.max(p - 1, 1))}
                  disabled={currentCheckedPage === 1}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="px-2 py-1 text-sm text-gray-600">
                  Page {currentCheckedPage} of {totalCheckedPages}
                </span>
                <button
                  onClick={() => setCurrentCheckedPage(p => Math.min(p + 1, totalCheckedPages))}
                  disabled={currentCheckedPage === totalCheckedPages}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
