import apiClient from "../api/apiClient";

export const programService = {
  /**
   * Fetch all programs from LMS API
   * Endpoint: GET /api/programs
   */
  async getAllPrograms() {
    try {
      const response = await apiClient.get("/programs");
      const data = response.data;

      let list = [];
      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.data)) {
        list = data.data;
      } else if (Array.isArray(data?.programs)) {
        list = data.programs;
      }

      return list;
    } catch (error) {
      console.error("Error fetching programs:", error);
      throw programService.formatError(error);
    }
  },

  /**
   * Register for a selected program
   * Endpoint: POST /api/programs/:programId/register
   * Body: { name, email, phone }
   */
  async register(programId, payload) {
    try {
      const response = await apiClient.post(`/programs/${programId}/register`, {
        name: payload.name?.trim(),
        email: payload.email?.trim(),
        phone: payload.phone?.trim(),
      });

      return response.data;
    } catch (error) {
      console.error("Error submitting registration:", error);
      throw programService.formatError(error);
    }
  },

  /**
   * Helper to format backend & network errors into a consistent structure
   */
  formatError(error) {
    if (!error.response) {
      // Network error or timeout
      return {
        status: 0,
        isNetworkError: true,
        message:
          "We couldn't connect to the server. Please check your internet connection and try again.",
      };
    }

    const status = error.response.status;
    const data = error.response.data || {};
    const backendMessage = data.message || data.error || "";

    const isDuplicate =
      status === 409 ||
      (status === 400 &&
        typeof backendMessage === "string" &&
        backendMessage.toLowerCase().includes("already registered"));

    const isNotFound = status === 404;
    const isServerError = status >= 500;

    let userFriendlyMessage = "Please check your information and try again.";

    if (isDuplicate) {
      userFriendlyMessage =
        "Our records show that this email is already registered for this program. Please check your email for further program information.";
    } else if (isNotFound) {
      userFriendlyMessage =
        "This program is no longer available. Please refresh the page and select another program.";
    } else if (isServerError) {
      userFriendlyMessage =
        "Something went wrong on our side. Please try again in a moment.";
    } else if (backendMessage) {
      userFriendlyMessage = backendMessage;
    }

    return {
      status,
      backendMessage,
      message: userFriendlyMessage,
      isDuplicate,
      isNotFound,
      isServerError,
      isValidationError: status === 400 && !isDuplicate,
      isNetworkError: false,
    };
  },
};

export default programService;
