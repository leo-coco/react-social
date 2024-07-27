import { BrowserRouter, Routes, Route } from "react-router-dom"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Layout from "./features/layout/Layout"
import { AlbumsContainer } from "./features/albums/Albums"
import { PostsContainer } from "./features/posts/Posts"

const queryClient = new QueryClient()

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PostsContainer />} /> {/* Default route */}
            <Route path="/albums" element={<AlbumsContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App
