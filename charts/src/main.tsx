import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { DateAgeGenderProvider } from './context/filter.tsx'
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <DateAgeGenderProvider>
    <App />
      </DateAgeGenderProvider>

    </QueryClientProvider>
  </StrictMode>,
)
