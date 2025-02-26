import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostWrapper from "./components/PostWrapper";
import Home from "./pages";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/*" element={<PostWrapper />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
};

export default App;
