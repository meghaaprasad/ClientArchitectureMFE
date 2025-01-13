import { createStore } from 'vuex';

export default createStore({
  state() {
    return {
      userInsuranceDetails: {
        policyNumber: 'POL-123-XYZ',
        premiumDue: 500,
        coverage: 'Basic Coverage'
      }
    };
  },
  mutations: {
    UPDATE_DETAILS(state, payload) {
      state.userInsuranceDetails = { ...state.userInsuranceDetails, ...payload };
    }
  },
  actions: {
    updateDetails({ commit }, payload) {
      commit('UPDATE_DETAILS', payload);
    }
  }
});
