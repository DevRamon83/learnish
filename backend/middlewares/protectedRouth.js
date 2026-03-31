import bannedCheck from "./auth/bannedCheck.js";
import tokensValidator from "./auth/tokensValidator.js";
import dataStandard from "./dataStandard.js";

const protectedRouth = [dataStandard, tokensValidator, bannedCheck];

export default protectedRouth;
