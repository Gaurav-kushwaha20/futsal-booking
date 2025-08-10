export const endpoints = {
    auth:{
        refreshtoken:"/auth/refresh",
    },
 userLogin: "/auth/login",
 ownerLogin: "/auth/owner/login",
 userRegister: "/auth/user/register",
 getAllFutsal: "/futsal/get-all",
 owner: {
  futsalList: "/futsal/owner/get",
  createFutsals: "/futsal/register",
  getFutsalsDetails: "futsal/get/",
  updateFutsal: "/futsal/update/",
 },
};

export const apiTags = {
 ownerGetAllFutsals: "owner_get_all_futsals",
};
