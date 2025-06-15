import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import {
  Menu, X, Home, Users, BarChart3, Calendar, Kanban, Settings,
  Moon, Sun, Search, Bell, ChevronDown, Plus, Edit, Trash2,
  Filter, Download, ChevronLeft, ChevronRight, MoreHorizontal
} from 'lucide-react';

const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Sample data
  const chartData = [
    { name: 'Jan', sales: 4000, revenue: 2400, users: 240 },
    { name: 'Feb', sales: 3000, revenue: 1398, users: 221 },
    { name: 'Mar', sales: 2000, revenue: 9800, users: 229 },
    { name: 'Apr', sales: 2780, revenue: 3908, users: 200 },
    { name: 'May', sales: 1890, revenue: 4800, users: 218 },
    { name: 'Jun', sales: 2390, revenue: 3800, users: 250 },
  ];

  const pieData = [
    { name: 'Desktop', value: 400, color: '#0088FE' },
    { name: 'Mobile', value: 300, color: '#00C49F' },
    { name: 'Tablet', value: 200, color: '#FFBB28' },
    { name: 'Other', value: 100, color: '#FF8042' },
  ];

  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
  ]);

  const [kanbanData, setKanbanData] = useState({
    todo: [
      { id: 1, title: 'Design new homepage', priority: 'High' },
      { id: 2, title: 'Update user documentation', priority: 'Medium' },
    ],
    inProgress: [
      { id: 3, title: 'Implement payment system', priority: 'High' },
      { id: 4, title: 'Fix mobile responsiveness', priority: 'Low' },
    ],
    done: [
      { id: 5, title: 'Setup CI/CD pipeline', priority: 'Medium' },
    ],
  });

  const calendarEvents = [
    { id: 1, title: 'Team Meeting', date: '2025-06-10', time: '10:00 AM' },
    { id: 2, title: 'Project Review', date: '2025-06-12', time: '2:00 PM' },
    { id: 3, title: 'Client Call', date: '2025-06-15', time: '11:00 AM' },
  ];

  const themes = {
    light: {
      bg: 'bg-gray-50',
      card: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      sidebar: 'bg-white border-gray-200',
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
    },
    dark: {
      bg: 'bg-gray-900',
      card: 'bg-gray-800',
      text: 'text-white',
      textSecondary: 'text-gray-300',
      border: 'border-gray-700',
      sidebar: 'bg-gray-800 border-gray-700',
      primary: 'bg-blue-600',
      primaryHover: 'hover:bg-blue-700',
    }
  };

  const currentTheme = themes[theme];

  const sidebarItems = [
    { icon: Home, label: 'Dashboard', view: 'dashboard' },
    { icon: Users, label: 'Users', view: 'users' },
    { icon: BarChart3, label: 'Analytics', view: 'analytics' },
    { icon: Calendar, label: 'Calendar', view: 'calendar' },
    { icon: Kanban, label: 'Kanban', view: 'kanban' },
    { icon: Settings, label: 'Settings', view: 'settings' },
  ];

  const StatCard = ({ title, value, change, icon: Icon }) => (
    <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`${currentTheme.textSecondary} text-sm font-medium`}>{title}</p>
          <p className={`${currentTheme.text} text-2xl font-bold`}>{value}</p>
          <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        </div>
        <Icon className={`${currentTheme.textSecondary} h-8 w-8`} />
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="12,345" change={12} icon={Users} />
        <StatCard title="Revenue" value="$45,678" change={8} icon={BarChart3} />
        <StatCard title="Orders" value="987" change={-2} icon={Calendar} />
        <StatCard title="Conversion" value="3.24%" change={5} icon={Kanban} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-6 shadow-sm`}>
          <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Sales Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-6 shadow-sm`}>
          <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-6 shadow-sm`}>
        <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Revenue Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const UsersView = () => (
    <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg shadow-sm`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className={`${currentTheme.text} text-lg font-semibold`}>Users Management</h3>
          <div className="flex gap-2">
            <button className={`${currentTheme.primary} ${currentTheme.primaryHover} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
              <Plus size={16} />
              Add User
            </button>
            <button className={`${currentTheme.border} border ${currentTheme.text} px-4 py-2 rounded-lg flex items-center gap-2`}>
              <Filter size={16} />
              Filter
            </button>
            <button className={`${currentTheme.border} border ${currentTheme.text} px-4 py-2 rounded-lg flex items-center gap-2`}>
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="relative">
            <Search className={`${currentTheme.textSecondary} absolute left-3 top-3 h-4 w-4`} />
            <input
              type="text"
              placeholder="Search users..."
              className={`${currentTheme.border} border ${currentTheme.text} w-full pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className={`${currentTheme.bg}`}>
            <tr>
              <th className={`${currentTheme.text} text-left py-3 px-6 font-medium`}>Name</th>
              <th className={`${currentTheme.text} text-left py-3 px-6 font-medium`}>Email</th>
              <th className={`${currentTheme.text} text-left py-3 px-6 font-medium`}>Role</th>
              <th className={`${currentTheme.text} text-left py-3 px-6 font-medium`}>Status</th>
              <th className={`${currentTheme.text} text-left py-3 px-6 font-medium`}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((user) => (
              <tr key={user.id} className={`${currentTheme.border} border-b hover:bg-gray-50`}>
                <td className={`${currentTheme.text} py-4 px-6`}>{user.name}</td>
                <td className={`${currentTheme.textSecondary} py-4 px-6`}>{user.email}</td>
                <td className={`${currentTheme.text} py-4 px-6`}>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {user.role}
                  </span>
                </td>
                <td className={`py-4 px-6`}>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CalendarView = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const previousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const nextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
      <div className="space-y-6">
        <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-6 shadow-sm`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`${currentTheme.text} text-lg font-semibold`}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className={`${currentTheme.border} border ${currentTheme.text} p-2 rounded-lg hover:bg-gray-100`}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextMonth}
                className={`${currentTheme.border} border ${currentTheme.text} p-2 rounded-lg hover:bg-gray-100`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className={`${currentTheme.textSecondary} text-center py-2 font-medium`}>
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="h-12"></div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const hasEvent = calendarEvents.some(event => 
                new Date(event.date).getDate() === day &&
                new Date(event.date).getMonth() === currentDate.getMonth()
              );
              return (
                <div
                  key={day}
                  className={`h-12 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-blue-50 ${
                    hasEvent ? 'bg-blue-100 border-blue-300' : currentTheme.border
                  }`}
                >
                  <span className={currentTheme.text}>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-6 shadow-sm`}>
          <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Upcoming Events</h3>
          <div className="space-y-3">
            {calendarEvents.map(event => (
              <div key={event.id} className={`${currentTheme.border} border rounded-lg p-3 hover:bg-gray-50`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className={`${currentTheme.text} font-medium`}>{event.title}</h4>
                    <p className={`${currentTheme.textSecondary} text-sm`}>
                      {event.date} at {event.time}
                    </p>
                  </div>
                  <button className={`${currentTheme.textSecondary} hover:text-gray-700`}>
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const KanbanView = () => {
    const KanbanColumn = ({ title, tasks, status }) => (
      <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-4`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`${currentTheme.text} font-medium`}>{title}</h3>
          <span className={`${currentTheme.textSecondary} text-sm`}>{tasks.length}</span>
        </div>
        <div className="space-y-3">
          {tasks.map(task => (
            <div
              key={task.id}
              className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow`}
            >
              <h4 className={`${currentTheme.text} text-sm font-medium mb-2`}>{task.title}</h4>
              <div className="flex justify-between items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
                <button className={`${currentTheme.textSecondary} hover:text-gray-700`}>
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>
          ))}
          <button className={`w-full ${currentTheme.border} border-2 border-dashed rounded-lg p-3 text-center ${currentTheme.textSecondary} hover:border-blue-300 hover:text-blue-600`}>
            <Plus size={16} className="mx-auto mb-1" />
            <span className="text-sm">Add a card</span>
          </button>
        </div>
      </div>
    );

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className={`${currentTheme.text} text-xl font-semibold`}>Project Board</h2>
          <button className={`${currentTheme.primary} ${currentTheme.primaryHover} text-white px-4 py-2 rounded-lg flex items-center gap-2`}>
            <Plus size={16} />
            Add Column
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <KanbanColumn title="To Do" tasks={kanbanData.todo} status="todo" />
          <KanbanColumn title="In Progress" tasks={kanbanData.inProgress} status="inProgress" />
          <KanbanColumn title="Done" tasks={kanbanData.done} status="done" />
        </div>
      </div>
    );
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'users':
        return <UsersView />;
      case 'analytics':
        return <DashboardView />;
      case 'calendar':
        return <CalendarView />;
      case 'kanban':
        return <KanbanView />;
      case 'settings':
        return (
          <div className={`${currentTheme.card} ${currentTheme.border} border rounded-lg p-6 shadow-sm`}>
            <h3 className={`${currentTheme.text} text-lg font-semibold mb-4`}>Settings</h3>
            <div className="space-y-4">
              <div>
                <label className={`${currentTheme.text} block text-sm font-medium mb-2`}>Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className={`${currentTheme.border} border ${currentTheme.text} px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-200`}>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 ${currentTheme.sidebar} border-r transform transition-transform duration-200 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className={`${currentTheme.text} text-xl font-bold`}>Admin Pro</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`${currentTheme.textSecondary} hover:text-gray-700 lg:hidden`}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => (
            <button
              key={item.view}
              onClick={() => setActiveView(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeView === item.view
                  ? `${currentTheme.primary} text-white`
                  : `${currentTheme.textSecondary} hover:bg-gray-100`
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'lg:ml-64' : ''} transition-all duration-200`}>
        {/* Header */}
        <header className={`${currentTheme.card} ${currentTheme.border} border-b h-16 flex items-center justify-between px-6`}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`${currentTheme.textSecondary} hover:text-gray-700`}
            >
              <Menu size={20} />
            </button>
            <div className="relative">
              <Search className={`${currentTheme.textSecondary} absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4`} />
              <input
                type="text"
                placeholder="Search..."
                className={`${currentTheme.border} border ${currentTheme.text} pl-10 pr-4 py-2 rounded-lg w-64 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className={`${currentTheme.textSecondary} hover:text-gray-700 p-2 rounded-lg`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className={`${currentTheme.textSecondary} hover:text-gray-700 p-2 rounded-lg relative`}>
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <ChevronDown className={`${currentTheme.textSecondary} h-4 w-4`} />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {renderView()}
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;