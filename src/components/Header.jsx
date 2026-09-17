function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold text-white shadow-lg shadow-indigo-200">
            $
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              MoneyTrack
            </h2>

            <p className="text-xs text-slate-400">
              Expense Manager
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              My Account
            </p>

            <p className="text-xs text-slate-400">
              Personal Finance
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-600">
            A
          </div>

        </div>

      </div>
    </header>
  );
}

export default Header;