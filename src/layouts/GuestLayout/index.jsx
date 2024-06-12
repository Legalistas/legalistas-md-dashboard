const GuestLayout = ({ children }) => {
  return (
    <>
      <main className="flex h-screen items-center justify-center">
        <div className="mx-auto mt-21 flex h-full max-w-screen-2xl items-center justify-center p-4 md:p-6 2xl:p-10">
          <div className="flex h-full w-full items-center justify-center">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default GuestLayout;
