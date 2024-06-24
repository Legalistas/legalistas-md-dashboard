const Header = () => {
  return (
    <div className="mx-auto mb-4 w-full">
      <div className="rounded-lg border border-stroke bg-white p-1 shadow-card dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col items-center justify-between space-y-3 p-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-medium text-black dark:text-white">
              Team Manager
            </h3>
          </div>
          <div className="flex w-full flex-shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-x-3 md:space-y-0">
            <button>pruebas</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
