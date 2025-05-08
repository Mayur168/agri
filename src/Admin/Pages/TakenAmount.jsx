import React, { useState, useEffect } from "react";
import ModalForm from "../../Admin/Components/ModelForm";
import Swal from "sweetalert2";
import { FaEye, FaFileAlt, FaPlus, FaRupeeSign, FaUser, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import api from "../../Api/axiosInstance";
import Spinner from "../Spinner/Spinner";
import BackButton from "../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext";

const FarmerAmount = () => {
  const { language } = useLanguage();
  const [amounts, setAmounts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    farmer: null,
    taken_amount: "",
    pending_amount: "",
  });
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [farmers, setFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const pageSize = 10;

  const translations = {
    en: {
      title: "Farmer Amount",
      addTakenAmount: "Add Amount",
      searchPlaceholder: "Search by date...",
      noTakenAmounts: "No amounts found.",
      farmer: "Farmer",
      takenAmount: "Taken Amount",
      pendingAmount: "Pending Amount",
      dateCreated: "Date Created",
      actions: "Actions",
      submit: "Save",
      cancel: "Close",
      view: "View",
      previous: "Previous",
      next: "Next",
      totalAmount: "Total Taken Amount",
    },
    mr: {
      title: "शेतकरी रक्कम",
      addTakenAmount: "रक्कम जोडा",
      searchPlaceholder: "तारखेनुसार शोधा..",
      noTakenAmounts: "कोणताही रक्कम सापडली नाही.",
      farmer: "शेतकरी",
      takenAmount: "घेतलेली रक्कम",
      pendingAmount: "प्रलंबित रक्कम",
      dateCreated: "निर्मिती तारीख",
      actions: "क्रिया",
      submit: "जतन करा",
      cancel: "बंद करा",
      view: "पहा",
      previous: "मागील",
      next: "पुढे",
      totalAmount: "एकूण घेतलेली रक्कम",
    },
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const farmerId = user?.farmer_id;
    const farmerName = user?.first_name || "Unknown Farmer";

    if (!farmerId) {
      Swal.fire("Error", "Farmer ID not found in user data", "error");
      setFetchLoading(false);
      return;
    }

    setFarmers([{ id: farmerId, user: { first_name: farmerName } }]);
    setFormData((prev) => ({ ...prev, farmer: farmerId }));

    fetchAmounts(farmerId, currentPage);
  }, [currentPage]);

  const fetchAmounts = async (farmerId, page) => {
    setFetchLoading(true);
    try {
      const response = await api.get(`/farm/?action=getFarmerAmount&farmer=${farmerId}&page=${page}&page_size=${pageSize}`);
      const amountsData = response.data.data || [];
      const totalAmountData = response.data.total_amount || amountsData.reduce((sum, item) => sum + (parseFloat(item.taken_amount) || 0), 0);
      setAmounts(amountsData);
      setTotalAmount(totalAmountData);
      setTotalPages(response.data.total_pages || 1);
      setHasMore(response.data.has_more || false);
    } catch (error) {
      console.error("Error fetching amounts:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || translations[language].noTakenAmounts,
        "error"
      );
      setAmounts([]);
      setTotalAmount(0);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleAdd = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const farmerId = user?.farmer_id;

    if (!farmerId) {
      Swal.fire("Error", "Farmer ID not found in user data", "error");
      return;
    }

    setFormData({
      farmer: farmerId,
      taken_amount: "",
      pending_amount: "",
    });
    setSelectedAmount({ isAdding: true });
    setIsModalOpen(true);
  };

  const handleView = (amount) => {
    setFormData({
      id: amount.id,
      farmer: formData.farmer,
      taken_amount: amount.taken_amount || "",
      pending_amount: amount.pending_amount || "",
      date_created: amount.date_created || "",
    });
    setSelectedAmount(amount);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostAmount = async () => {
    try {
      const payload = {
        action: "postFarmerAmount",
        farmer: formData.farmer,
        taken_amount: parseFloat(formData.taken_amount) || 0,
        pending_amount: parseFloat(formData.pending_amount) || 0,
      };

      await api.post("/farm/", payload);
      Swal.fire("Success", translations[language].submit, "success");
      fetchAmounts(formData.farmer, currentPage); // Refetch to update totalAmount
      setIsModalOpen(false);
      setSelectedAmount(null);
    } catch (error) {
      console.error("Error posting amount:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to post amount.",
        "error"
      );
    }
  };

  const handleSave = async () => {
    await handlePostAmount();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };

 
  const filteredAmounts = amounts.filter((amount) => {
    const query = searchQuery.toLowerCase();
    const date = amount.date_created?.toLowerCase() || "";
    const takenAmount = amount.taken_amount?.toString() || "";
    const pendingAmount = amount.pending_amount?.toString() || "";
    return (
      date.includes(query) ||
      takenAmount.includes(query) ||
      pendingAmount.includes(query)
    );
  });

  const formatDateForDisplay = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mt-1 px-0">
      <div className="bg-success text-white py-2 rounded px-3 d-flex align-items-center justify-content-between flex-column gap-1">
        <div className="d-flex align-items-center justify-content-between w-100">
          <BackButton className="backbtn fs-4" />
          <h2 className="text-white m-0 flex-grow-1 text-center me-4">
            <FaRupeeSign className="me-2" /> {translations[language].title}
          </h2>
        </div>
        <div className="input-group rounded my-2 container">
          <input
            type="search"
            className="form-control rounded"
            placeholder={translations[language].searchPlaceholder}
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div
        className="card shadow-sm rounded-lg border-0 mt-3"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.5rem",
          padding: "1rem",
          backgroundColor: "rgb(248, 249, 250)",
          borderRadius: "8px",
          border: "1px solid rgb(222, 226, 230)",
        }}
      >
        <div className="d-flex align-items-center">
          <FaMoneyBillWave className="text-success me-2" size={24} />
          <h4 className="fs-5 text-success m-0">
            {translations[language].totalAmount}: ₹{totalAmount}
          </h4>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button
          className="btn btn-success d-flex align-items-center"
          onClick={handleAdd}
        >
          <FaPlus className="me-2" /> {translations[language].addTakenAmount}
        </button>
      </div>

      {fetchLoading ? (
        <div className="text-center mt-3">
          <Spinner />
        </div>
      ) : filteredAmounts.length > 0 ? (
        <div className="mt-3">
          <div className="row g-3">
            {filteredAmounts.map((amount) => (
              <div key={amount.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm rounded-lg border-0 hover:shadow-md transition-shadow">
                  <div className="card-body p-4">
                    <h5 className="card-title text-lg font-bold text-gray-800 mb-3">
                      {farmers.find((f) => f.id === amount.farmer)?.user
                        ?.first_name || "Unknown Farmer"}
                    </h5>
                    <div className="space-y-2">
                      <div className="d-flex align-items-center">
                        <FaUser className="me-2 text-success" />
                        <span className="font-semibold text-gray-700">
                          {translations[language].farmer}:
                        </span>
                        <span className="ml-2 text-gray-600">
                          {farmers.find((f) => f.id === amount.farmer)?.user
                            ?.first_name || amount.farmer}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaRupeeSign className="me-2 text-success" />
                        <span className="font-semibold text-gray-700">
                          {translations[language].takenAmount}:
                        </span>
                        <span className="ml-2 text-gray-600">
                          ₹{amount.taken_amount}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaRupeeSign className="me-2 text-success" />
                        <span className="font-semibold text-gray-700">
                          {translations[language].pendingAmount}:
                        </span>
                        <span className="ml-2 text-gray-600">
                          ₹{amount.pending_amount}
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <FaCalendarAlt className="me-2 text-success" />
                        <span className="font-semibold text-gray-700">
                          {translations[language].dateCreated}:
                        </span>
                        <span className="ml-2 text-gray-600">
                          {formatDateForDisplay(amount.date_created)}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4">
                      <button
                        className="btn btn-success btn-sm flex items-center gap-2 px-2 py-1 rounded-lg"
                        onClick={() => handleView(amount)}
                      >
                        <FaEye className="me-1" /> {translations[language].view}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination pagination-sm flex-wrap">
                <li
                  className={`page-item ${
                    currentPage === 1 || fetchLoading ? "disabled" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevious}
                    disabled={currentPage === 1 || fetchLoading}
                  >
                    « {translations[language].previous}
                  </button>
                </li>
                <li className="page-item active">
                  <span className="page-link bg-success text-white border-0">
                    {currentPage} / {totalPages}
                  </span>
                </li>
                <li
                  className={`page-item ${!hasMore || fetchLoading ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={handleNext}
                    disabled={!hasMore || fetchLoading}
                  >
                    {translations[language].next} »
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-muted">{translations[language].noTakenAmounts}</p>
      )}

      <ModalForm
        isOpen={!!selectedAmount}
        onClose={() => {
          setSelectedAmount(null);
          setIsModalOpen(false);
        }}
        isEditing={selectedAmount?.isAdding || false}
        formData={formData}
        labels={translations}
        handleChange={handleChange}
        handleSave={handleSave}
        language={language}
        formType="takenAmount"
        farmers={farmers}
      />
    </div>
  );
};

export default FarmerAmount;