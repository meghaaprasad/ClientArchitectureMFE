import { createRouter, createWebHistory } from 'vue-router';

const Home = {
  template: '<div><h2>Home Page</h2><p>Welcome to the Insurance Container!</p></div>'
};

const routes = [
  { path: '/', component: Home },
  {
    path: '/check-details',
    component: () => import('checkDetails/CheckDetails')
  },
  {
    path: '/pay-premium',
    component: () => import('payPremium/PayPremium')
  }
];

export default createRouter({
  history: createWebHistory(),
  routes
});
