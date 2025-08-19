// LoggingMiddleware/Log.js

async function Log(stack, level, pkg, message, token) {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        stack: stack.toLowerCase(),   // frontend
        level: level.toLowerCase(),   // debug | info | warn | error | fatal
        package: pkg.toLowerCase(),   // api, config, utils, etc.
        message: message
      })
    });

    if (!res.ok) {
      console.error("Logging failed:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    console.log("Log submitted:", data);
    return data;
  } catch (err) {
    console.error("Error sending log:", err);
    return null;
  }
}

export { Log };
