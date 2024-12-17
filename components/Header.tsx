export const Header = () => {
  return (
    <div className="navbar bg-base-100 text-base-content">
      <div className="navbar-start">
        {/* LOGO */}
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost hover:bg-transparent text-xl">LensSocialScore</a>
      </div>
      <div className="navbar-end">
        <button className="btn">Connect Lens Account</button>
      </div>
    </div>
  );
};
