import { useState } from "react";
import Navbar from "./component/Navbar";
import CompanyDetail from "./pages/ComapanyDetail";
import CompanyList from "./pages/CompanyList";

export default function App() {
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const handleSelectCompany = (company) => {
    setSelectedCompanyId(company._id);
  };

  const handleBack = () => {
    setSelectedCompanyId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {selectedCompanyId ? (
        <CompanyDetail
          companyId={selectedCompanyId}
          onBack={handleBack}
        />
      ) : (
        <CompanyList
          onSelectCompany={handleSelectCompany}
        />
      )}
    </div>
  );
}