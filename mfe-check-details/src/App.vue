<template>
  <div class="mfe1-page">
    <h2>Check Details (MFE 1)</h2>

    <div class="details">
      <p><strong>Policy Number:</strong> {{ insuranceDetails.policyNumber }}</p>
      <p><strong>Premium Due:</strong> ${{ insuranceDetails.premiumDue }}</p>
      <p><strong>Coverage:</strong> {{ insuranceDetails.coverage }}</p>
    </div>

    <button class="worker-button" @click="runWebWorkerTask">Calculate Discount</button>
    <p v-if="workerResult" class="worker-result">Worker Result: {{ workerResult }}</p>

    <div class="coverage-update">
      <label for="cov">Update Coverage:</label>
      <input id="cov" v-model="coverageInput" @input="sanitizeCoverage" />
      <button class="update-btn" @click="updateCoverage">Update Coverage</button>
    </div>
  </div>
</template>

<script>
import storeFromContainer from 'container/store';

export default {
  data() {
    return {
      coverageInput: '',
      workerResult: null,
    };
  },
  computed: {
    insuranceDetails() {
      return storeFromContainer.state.userInsuranceDetails;
    },
  },
  methods: {
    runWebWorkerTask() {
    const worker = new Worker(new URL('./worker.js', import.meta.url));

    // Send the current premium and coverage details to the worker
    worker.postMessage({
      premiumDue: this.insuranceDetails.premiumDue,
      coverage: this.insuranceDetails.coverage,
    });

    // Receive the calculated discount and new premium
    worker.onmessage = (e) => {
      const { originalPremium, discountPercentage, discountedPremium } = e.data;

      this.workerResult = `Original Premium: $${originalPremium}
        Discount: ${discountPercentage}%
        Discounted Premium: $${discountedPremium}`;

      worker.terminate(); // Terminate the worker after completion
    };
  },
    sanitizeCoverage() {
      // Sanitize the input to prevent XSS attacks
      this.coverageInput = this.coverageInput
        .replace(/<script[^>]*?>.*?<\/script>/gi, '')
        .replace(/<[^>]+>/g, '');
    },
    updateCoverage() {
      storeFromContainer.dispatch('updateDetails', {
        coverage: this.coverageInput,
      });
      this.coverageInput = '';
    },
  },
};
</script>

<style lang="scss">
.mfe1-page {
  /* Let .container-app main do the main centering;
     Here we just set a max-width for the MFE's own content. */
  max-width: 600px;
  width: 100%; /* ensure it can shrink if needed */
  display: flex;
  flex-direction: column;
  gap: 1rem; /* spacing between sections */

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

  .worker-button {
    align-self: flex-start;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    color: #fff;
    padding: 0.5rem 0.8rem;
    cursor: pointer;
    transition: background 0.2s;
    &:hover {
      background-color: #0056b3;
    }
  }

  .worker-result {
    margin: 0;
    color: #333;
    font-style: italic;
  }

  .coverage-update {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    label {
      font-weight: 500;
    }
    input {
      padding: 0.4rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 14rem;
    }
    .update-btn {
      background-color: #007bff;
      border: none;
      border-radius: 4px;
      color: #fff;
      padding: 0.5rem 0.8rem;
      cursor: pointer;
      transition: background 0.2s;
      &:hover {
        background-color: #0056b3;
      }
    }
  }
}
</style>
