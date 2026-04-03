import summaryModel from "../models/summaries";

const misalignmentHandler = async (id) => {
  try {
    await summaryModel.findByIdAndUpdate(id, { misalignment: true });
  } catch (err) {
    console.error("Can't record misalignment in ", id, err);
  }
};

export default misalignmentHandler;
