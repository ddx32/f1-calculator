import { useEffect } from "react";

import Main from "./Main";
import { useStore } from "./store";

export default function App() {
  const fetchAll = useStore((s) => s.fetchAll);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return <Main />;
}
