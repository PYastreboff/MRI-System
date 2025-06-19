// Sidebar.js
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faMedkit,
  faUser,
  faQuestionCircle,
  faChevronDown,
  faKey,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import foodImg from './food-icon.png';

function Sidebar({ setLoggedIn, setPage, page }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  const menuItems = [
    { icon: faSearch, label: 'Dashboard', page: 'dashboard' },
    { icon: faMedkit, label: 'MRI Scans', page: 'mri' },
    { icon: faUser, label: 'Manage Users', page: 'users' },
    { icon: faQuestionCircle, label: 'Help', page: 'help' },
  ];

  return (
    <div className="flex flex-row bg-slate-800">
        <div className={`${collapsed ? 'ml-20' : 'ml-64'} transition-all duration-300`}>
        <div
            className={`${
                collapsed ? 'w-[80px]' : 'w-[250px]'
            } fixed top-0 left-0 h-screen flex flex-col justify-between bg-slate-800 py-6 px-4 transition-all duration-300 overflow-hidden`}
        >
            
        {/* Top: Logo and Toggle */}
        <div>
            <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
                <img src={foodImg} alt="Logo" className="w-6 h-6 fill-white" />
                {!collapsed && <span className="text-xl font-bold text-white">McSmart DB</span>}
            </div>
            <button onClick={toggleSidebar} className="text-white hover:text-slate-300">
                <FontAwesomeIcon icon={faBars} />
            </button>
            </div>

            {/* Menu Items */}
            <nav className="flex flex-col gap-4">
            {menuItems.map((item, idx) => (
                <a
                key={idx}
                href="#"
                onClick={(e) => {
                    e.preventDefault();
                    setPage(item.page);
                }}
                className={`flex items-center gap-2 py-2 px-3 rounded-xl transition-colors
                    ${page === item.page 
                        ? 'bg-cyan-500 text-white hover:bg-cyan-400' 
                        : 'text-white hover:text-slate-300 hover:bg-slate-800'}
                    `}
                >
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                {!collapsed && <span>{item.label}</span>}
                </a>
            ))}

            <a
                href="#"
                onClick={(e) => {
                e.preventDefault();
                setLoggedIn(false);
                }}
                className="flex items-center gap-2 py-2 px-3 text-white hover:text-slate-300 hover:bg-slate-800 rounded-xl"
            >
                <FontAwesomeIcon icon={faKey} className="w-5 h-5" />
                {!collapsed && <span>Logout</span>}
            </a>
            </nav>
            </div>

                {/* Bottom: User Profile */}
                <div className="flex items-center gap-3 px-2 hover:text-black cursor-pointer">
                    <img src="https://i.pravatar.cc/40" alt="Profile" className="w-10 h-10 rounded-full min-w-10" />
                    {!collapsed && (
                    <>
                        <div className="flex flex-col">
                        <span className="font-semibold text-sm text-white">Admin</span>
                        <span className="text-xs text-gray-300">Senior Doctor/Admin</span>
                        </div>
                        <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 ml-auto text-slate-500" />
                    </>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}


export default Sidebar;
