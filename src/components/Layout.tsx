type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      {/* header */}
      {/* <header>
        <nav></nav>
      </header> */}

      {/* main */}
      <main className="max-w-[1024px] py-[10vh] mx-auto">{children}</main>

      {/* footer */}
      {/* <footer></footer> */}
    </>
  );
};

export default Layout;
