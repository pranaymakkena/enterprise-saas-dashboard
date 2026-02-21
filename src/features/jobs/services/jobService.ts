let status = "pending";

export const jobService = {
  async getStatus() {
    await new Promise(r => setTimeout(r, 1000));
    if (status === "pending") status = "processing";
    else if (status === "processing") status = Math.random() > 0.2 ? "completed" : "failed";
    return status;
  }
};
