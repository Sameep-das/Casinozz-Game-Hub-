const NODE_API = window.CASINOZZ_API || "http://localhost:3000";

let backendReady = false;

window.addEventListener("load", () => {
  const last = Number(localStorage.getItem(LAST_WARMUP_KEY));

  if (!last || Date.now() - last > WARMUP_INTERVAL) {
    localStorage.setItem(LAST_WARMUP_KEY, Date.now());
    warmServer();
  }
});


async function warmServer(maxRetries = 5) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(`${NODE_API}/health`, {
        method: "GET",
        cache: "no-store"
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== "healthy") {
        throw new Error("Service not healthy");
      }

      backendReady = true;
      return true;
    }
    catch (err) {
      const baseDelay = Math.min(1000 * Math.pow(2, attempt), 30000);

      const jitter = Math.random() * 1000;

      const delay = baseDelay + jitter;

      //resolve after delay ms before next attempt
      await new Promise(resolve =>
        setTimeout(resolve, delay)
      );
    }
  }
  console.error("Failed to warm up backend after multiple attempts");
  return false;
}
