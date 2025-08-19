export const endpoints = {
 auth: {
  refreshtoken: '/auth/refresh',
 },
 userLogin: '/auth/login',
 ownerLogin: '/auth/owner/login',
 userRegister: '/auth/user/register',
 getAllFutsal: '/futsal/get-all',
 owner: {
  futsalList: '/futsal/owner/get',
  createFutsals: '/futsal/register',
  getFutsalsDetails: 'futsal/get/',
  updateFutsal: '/futsal/update/',
  deleteFutsal: '/futsal/delete/',
 },
 timeSlot: {
  create: '/time-slot/create/id',
  list: '/time-slot/get-all/futsalid',
  details: '/time-slot/details/id',
  update: '/time-slot/update/id',
  delete: 'time-slot/delete/id',
  getByFutsalId: '/time-slot/get-all/id',
 },
 booking: {
  create: '/booking/create?futsal=id',
 },
};

export const apiTags = {
 ownerGetAllFutsals: 'owner_get_all_futsals',
 get_owner_time_slot: 'get_owner_time_slot',
};
