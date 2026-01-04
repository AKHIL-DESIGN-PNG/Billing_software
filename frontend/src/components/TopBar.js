export default function TopBar({ title }) {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="topbar">
      {/* LEFT */}
      <div className="topbar-left">
        Billing App
      </div>

      {/* CENTER */}
      <div className="topbar-center">
        {title}
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}
