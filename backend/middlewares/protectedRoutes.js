import bannedCheck from "./auth/bannedCheck.js";
import tokensRotation from "./auth/tokensRotation.js";
import tokensValidator from "./auth/tokensValidator.js";
import dataStandard from "./dataStandard.js";

const protectedRoutes = [
  dataStandard,
  tokensValidator,
  bannedCheck,
  tokensRotation,
];

export default protectedRoutes;
