import state from '@/store/modules/blog/state';
import getters from '@/store/modules/blog/getters';
import actions from '@/store/modules/blog/actions';
import mutations from '@/store/modules/blog/mutations';

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
