interface NavBarProps {
  children: React.ReactNode
}

const Navbar = ({ children }: NavBarProps) => {

  return (
    <>
      <nav className="border-gray-200 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex w-full justify-end" id="navbar-multi-level">
            { children }
          </div>
        </div>
      </nav>
    </>
  );
}

export { Navbar };
