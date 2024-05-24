const GuestLayout = ({ children }) => {
  return (
    <>
      <main className="mx-auto mt-21 h-screen max-w-screen-2xl items-center justify-center p-4 md:p-6 2xl:p-10">
        {children}
      </main>
    </>
  );
};

export default GuestLayout;
