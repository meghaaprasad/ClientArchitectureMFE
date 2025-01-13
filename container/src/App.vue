<template>
  <div class="container-app">
    <header>
      <h1>Welcome to the Insurance Container</h1>
      <p class="tagline">Manage your policies and premiums efficiently</p>
    </header>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/check-details">Check Details (MFE1)</router-link>
      <router-link to="/pay-premium">Pay Premium (MFE2)</router-link>
    </nav>

    <main>
      <!-- This is where we load MFE content -->
      <router-view />
    </main>

    <footer>
      <p>&copy; 2025 My Insurance Company</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ContainerApp'
};
</script>

<style lang="scss">
/* Basic reset / utility */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container-app {
  background: #f0f2f5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

 
  > header,
  > nav,
  > main,
  > footer {
    margin: 0 auto;
    width: 90%;
    max-width: 1024px;
  }
}

header {
  text-align: center;
  padding: 2rem 0 1.5rem;

  h1 {
    color: #333;
    font-size: 2rem;
    margin-bottom: 0.3rem;
  }
  .tagline {
    color: #666;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
}

nav {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 2rem;

  a {
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: #0056b3;
    }
  }
}

main {
  /* The white box that holds the MFE content */
  flex: 1;
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

footer {
  text-align: center;
  color: #888;
  padding: 1.5rem 0;
  p {
    font-size: 0.9rem;
  }
}
</style>
