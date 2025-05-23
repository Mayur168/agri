import React, { useState, useEffect } from "react";
import ModalForm from "../../Admin/Components/ModelForm";
import Swal from "sweetalert2";
import {
  FaEye,
  FaPlus,
  FaRupeeSign,
  FaUser,
  FaCalendarAlt,
} from "react-icons/fa";
import api from "../../Api/axiosInstance";
import Spinner from "../Spinner/Spinner";
import BackButton from "../Components/BackButton";
import { useLanguage } from "../../contexts/LanguageContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Components/Header";
import { translations } from "../Components/translations/index";

const TakenAmount = () => {
  const { language } = useLanguage();
  const [amounts, setAmounts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [amountHistory, setAmountHistory] = useState([]);
  const [filteredAmountHistory, setFilteredAmountHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    farmer: null,
    taken_amount: "",
    pending_amount: "",
  });
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [farmers, setFarmers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const pageSize = 10;

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

  useEffect(() => {
    setFilteredAmountHistory(amountHistory);
  }, [amountHistory]);

  const fetchAmounts = async (farmerId, page) => {
    setFetchLoading(true);
    try {
      const response = await api.get(
        `/farm/?action=getFarmerAmount&farmer=${farmerId}&page=${page}&page_size=${pageSize}`
      );
      const amountsData = response.data.data || [];
      const totalAmountData = amountsData.reduce(
        (sum, item) => sum + (parseFloat(item.taken_amount) || 0),
        0
      );
      const pendingAmountData = amountsData.reduce(
        (sum, item) => sum + (parseFloat(item.pending_amount) || 0),
        0
      );
      const history = amountsData[0]?.amount_history || [];

      setAmounts(amountsData);
      setTotalAmount(totalAmountData);
      setPendingAmount(pendingAmountData);
      setAmountHistory(history);
      setFilteredAmountHistory(history); // Initialize filtered history
      setTotalPages(response.data.total_pages || 1);
      setHasMore(response.data.has_more || false);
    } catch (error) {
      Swal.fire({
        title: "Notice",
        text:
          error.response?.data?.message ||
          translations[language].noTakenAmounts,
      });
      setAmounts([]);
      setTotalAmount(0);
      setPendingAmount(0);
      setAmountHistory([]);
      setFilteredAmountHistory([]);
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
        pending_amount: 0,
      };

      const response = await api.post("/farm/", payload);
      const updatedData = response.data.data;
      setAmounts([updatedData]);
      setTotalAmount(updatedData.taken_amount || 0);
      setPendingAmount(updatedData.pending_amount || 0);
      setAmountHistory(updatedData.amount_history || []);

      Swal.fire("Success", translations[language].submit, "success");
      setIsModalOpen(false);
      setSelectedAmount(null);
    } catch (error) {
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
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredAmountHistory(
      amountHistory.filter(
        (history) =>
          formatDateForDisplay(history.date).toLowerCase().includes(query) ||
          history.amount.toString().toLowerCase().includes(query)
      )
    );
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

  const formatDateForDisplay = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div
      className="container mt-1 px-0"
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* Header Section */}
      <Header
        title={translations[language].takenamounttitle}
        icon={FaRupeeSign}
      />

      {/* Cards Section */}
      <div className="mt-3">
        <div className="row g-3">
          {/* Taken & Pending Amount Card */}
          <div className="col-12 col-md-6 mx-auto">
            <div className="card shadow-sm border bg-light">
              <div className="card-body d-flex align-items-center justify-content-between">
                {/* Taken Amount Section */}
                <div className="d-flex align-items-center" style={{ flex: 1 }}>
                  <FaRupeeSign className="text-success me-3 fs-3" />
                  <div>
                    <h6 className="card-title mb-1 text-muted">
                      {translations[language].takenAmount}
                    </h6>
                    <p className="mb-0 fs-5 fw-bold text-dark">
                      ₹{totalAmount}
                    </p>
                  </div>
                </div>

                {/* Divider Line */}
                <div
                  style={{
                    width: "1px",
                    backgroundColor: "#ccc",
                    height: "50px",
                    margin: "0 15px",
                  }}
                ></div>

                {/* Pending Amount Section */}
                <div className="d-flex align-items-center" style={{ flex: 1 }}>
                  <FaRupeeSign className="text-success me-3 fs-3" />
                  <div>
                    <h6 className="card-title mb-1 text-muted">
                      {translations[language].pendingAmount}
                    </h6>
                    <p className="mb-0 fs-5 fw-bold text-dark">
                      ₹{pendingAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add Taken Amount Button */}
        <div className="row g-1 mt-2">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body text-center p-2">
                <button
                  className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                  onClick={handleAdd}
                >
                  <FaPlus /> {translations[language].addTakenAmount}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="input-group rounded my-2 container">
        <input
          type="search"
          className="form-control rounded"
          placeholder={translations[language].takenamountsearchPlaceholder}
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Amount History Section */}
      <div
        className="mt-4 pb-3"
        style={{
          height: "calc(100vh - 300px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h3 className="fs-4 fw-bold text-center mb-3">
          {translations[language].amountHistory}
        </h3>
        {fetchLoading ? (
          <div className="text-center">
            <Spinner />
          </div>
        ) : filteredAmountHistory.length > 0 ? (
          <div style={{ flex: 1, overflow: "hidden" }}>
            <table className="table table-bordered table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "50%", textAlign: "center" }}>
                    Date
                  </th>
                  <th scope="col" style={{ width: "50%", textAlign: "center" }}>
                    Amount
                  </th>
                </tr>
              </thead>
            </table>
            <div style={{ maxHeight: "calc(100% - 50px)", overflowY: "auto" }}>
              <table className="table table-bordered table-hover mb-0">
                <tbody>
                  {filteredAmountHistory.map((history, index) => (
                    <tr key={index}>
                      <td style={{ width: "50%", textAlign: "center" }}>
                        {formatDateForDisplay(history.date)}
                      </td>
                      <td style={{ width: "50%", textAlign: "center" }}>
                        ₹{history.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-muted">{translations[language].noTakenAmounts}</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-2">
          <nav>
            <ul className="pagination pagination-sm">
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
                className={`page-item ${
                  !hasMore || fetchLoading ? "disabled" : ""
                }`}
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
      )}

      {/* Modal */}
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

export default TakenAmount;
