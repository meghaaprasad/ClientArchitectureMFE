onmessage = function (e) {
  const { premiumDue, coverage } = e.data;

  let discount = 0;

  // Calculate discount percentage based on coverage type
  if (coverage.toLowerCase() === 'basic coverage') {
    discount = 5; // 5% discount for basic coverage
  } else if (coverage.toLowerCase() === 'standard coverage') {
    discount = 10; // 10% discount for standard coverage
  } else if (coverage.toLowerCase() === 'premium coverage') {
    discount = 15; // 15% discount for premium coverage
  }

  // Calculate the discounted premium
  const discountedPremium = premiumDue - (premiumDue * discount) / 100;

  // Return the result to the main thread
  setTimeout(() => {
    postMessage({
      originalPremium: premiumDue,
      discountPercentage: discount,
      discountedPremium: discountedPremium.toFixed(2),
    });
  }, 1000); 
};
