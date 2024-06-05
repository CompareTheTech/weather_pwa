import PWABadge from './PWABadge.tsx';
import { HomePage } from './pages/Home/Home.tsx';
import { Layout } from './components/Layout/Layout.tsx';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SearchPage from "@/pages/Search/Search.tsx";
import SettingsPage from "@/pages/Settings/Settings.tsx";
import NextSevenDaysPage from "@/pages/NextSevenDays/NextSevenDays.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="nextSevenDays" element={<NextSevenDaysPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <PWABadge />
    </>
  );
}

export default App;
