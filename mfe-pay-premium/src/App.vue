<template>
  <div class="mfe2-page">
    <div class="top-row">
      <h2>Pay Premium (MFE 2)</h2>
    </div>

    <div class="details">
      <p><strong>Policy Number:</strong> {{ insuranceDetails.policyNumber }}</p>
      <p><strong>Premium Due:</strong> ${{ insuranceDetails.premiumDue }}</p>
    </div>

    <button class="pay-btn" @click="payPremium">Pay Now</button>
    <p v-if="message" class="pay-result">{{ message }}</p>
  </div>
</template>

<script>
import storeFromContainer from 'container/store';

export default {
  data() {
    return {
      message: ''
    };
  },
  computed: {
    insuranceDetails() {
      return storeFromContainer.state.userInsuranceDetails;
    }
  },
  methods: {
    payPremium() {
      storeFromContainer.dispatch('updateDetails', { premiumDue: 0 });
      this.message = 'Premium Paid!';
    }
  }
};
</script>

<style lang="scss">
.mfe2-page {
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .top-row {
    display: flex;
    align-items: center;
    gap: 1rem;

    .home-link {
      text-decoration: none;
      color: #007bff;
      border: 1px solid #007bff;
      border-radius: 4px;
      padding: 0.4rem 0.6rem;
      font-size: 0.9rem;
      &:hover {
        background: #007bff;
        color: #fff;
      }
    }
    h2 {
      margin: 0;
      color: #444;
      font-weight: 600;
      font-size: 1.3rem;
    }
  }

  .details {
    p {
      margin: 0.25rem 0;
      color: #555;
      strong {
        color: #333;
      }
    }
  }

  .pay-btn {
    align-self: flex-start;
    background-color: #228b22;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background-color: #1a6f1a;
    }
  }

  .pay-result {
    margin: 0;
    color: #333;
    font-style: italic;
  }
}
</style>
