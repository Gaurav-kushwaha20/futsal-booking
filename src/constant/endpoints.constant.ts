export const endpoints = {
 userLogin: "/auth/user/login",
 ownerLogin: "/auth/owner/login",
 userRegister: "/auth/user/register",
 getAllFutsal: "/futsal/get-all",
 owner: {
  futsalList: "/futsal/get",
  createFutsals: "/futsal/register",
  getFutsalsDetails: "futsal/get/",
  updateFutsal: "/futsal/update/",
  deleteFutsal: "/futsal/delete/",
 },
};

export const apiTags = {
 ownerGetAllFutsals: "owner_get_all_futsals",
};
