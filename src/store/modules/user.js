const state = {
  createdTime: 0,
  username: "",
  name: "",
  id: 0,
  permission: 2,
  department: "",
  idNumber: "",
};
const mutations = {
  setState: (state, payload) => {
    Object.assign(state, payload);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
