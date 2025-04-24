import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Main from "./Main";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  );
}
