import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const { children } = props;

  return (
    <main className="flex justify-center bg-slate-900">
      <div className="layout-container min-w-full max-w-full bg-white md:min-w-[480px] md:max-w-[480px]">
        <div className="h-full w-full overflow-auto">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
