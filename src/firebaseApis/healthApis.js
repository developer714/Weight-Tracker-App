import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export const checkHealthConnection = httpsCallable(
  functions,
  "checkHealthConnection"
);

export const getAllMedicines = httpsCallable(functions, "getAllMedicines");

export const getUserWeights = httpsCallable(functions, "getUserWeights");

export const mutationUserWeights = httpsCallable(
  functions,
  "mutationUserWeights"
);

export const getUserShots = httpsCallable(functions, "getUserShots");

export const getOptionalShotInfo = httpsCallable(
  functions,
  "getOptionalShotInfo"
);

export const createOrUpdateShotsInfo = httpsCallable(
  functions,
  "createOrUpdateShotsInfo"
);

export const mutationShotsInfoTimes = httpsCallable(
  functions,
  "mutationShotsInfoTimes"
);
