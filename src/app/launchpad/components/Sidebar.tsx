import { useState } from 'react';
import { FiHome, FiDatabase, FiUsers, FiBarChart2, FiSettings, FiLogOut } from 'react-icons/fi';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="profile">
        <img src="/user-avatar.png" alt="User Avatar" className="avatar" />
        {!collapsed && <p className="username">John Doe</p>}
        <button className="collapse-btn" onClick={toggleSidebar}>
          {collapsed ? '>' : '<'}
        </button>
      </div>
      <nav className="nav-links">
        <a href="/launchpad" className="nav-item">
          <FiHome /> {!collapsed && <span>Dashboard</span>}
        </a>
        <a href="/database" className="nav-item">
          <FiDatabase /> {!collapsed && <span>Investor Database</span>}
        </a>
        <a href="/connections" className="nav-item">
          <FiUsers /> {!collapsed && <span>Connections</span>}
        </a>
        <a href="/insights" className="nav-item">
          <FiBarChart2 /> {!collapsed && <span>Insights</span>}
        </a>
        <a href="/settings" className="nav-item">
          <FiSettings /> {!collapsed && <span>Settings</span>}
        </a>
        <a href="/logout" className="nav-item">
          <FiLogOut /> {!collapsed && <span>Logout</span>}
        </a>
      </nav>
    </aside>
  );
}
