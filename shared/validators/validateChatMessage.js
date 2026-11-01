const validateChatMessage = (content) => {
  if (
    typeof content !== "string" ||
    content.trim().length === 0 ||
    content.length > 3000
  ) {
    return false;
  }
  return true;
};

export default validateChatMessage;
