import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import CompanyDetail from "./pages/ComapanyDetail";
import CompanyList from "./pages/CompanyList";
import axios from "axios";
import toast from "react-hot-toast";

export default function App() {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleSelectCompany = (company) => {
    setSelectedCompanyId(company._id);
  };

  const handleBack = () => {
    setSelectedCompanyId(null);
  };

  useEffect(() => {
    const serverWakeUp = async () => {
      const toastId = "server-wakeup";
      try {
        toast.loading("Waking up server...", { id: toastId });

        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/health`);

        toast.success("Server is ready", { id: toastId });
      } catch {
        toast.error("Server wake-up failed", { id: toastId });
      }
    };

    serverWakeUp();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {selectedCompanyId ? (
        <CompanyDetail companyId={selectedCompanyId} onBack={handleBack} />
      ) : (
        <CompanyList onSelectCompany={handleSelectCompany} />
      )}
    </div>
  );
}
