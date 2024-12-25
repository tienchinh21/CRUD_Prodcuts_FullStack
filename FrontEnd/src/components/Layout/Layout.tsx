import style from "./styles.module.scss";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { wrapLayout, container } = style;
  return (
    <main className={wrapLayout}>
      <div className={container}>{children}</div>
    </main>
  );
};

export default MainLayout;
