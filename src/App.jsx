import Header from "./components/ui/Header";
import useRouterElement from "./hooks/useRouterElement";

export default function App() {
  const routeElement = useRouterElement();

  return (
    <>
      <Header />
      {routeElement}
    </>
  );
}
