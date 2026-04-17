import bannedCheck from "./auth/bannedCheck.js";
import tokensRotation from "./auth/tokensRotation.js";
import tokensValidator from "./auth/tokensValidator.js";
import dataStandard from "./dataStandard.js";

const protectedRouth = [
  dataStandard,
  tokensValidator,
  bannedCheck,
  tokensRotation,
];

export default protectedRouth;
