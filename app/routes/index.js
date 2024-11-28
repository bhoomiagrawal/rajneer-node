const fs = require('fs');
const path = require('path');

const loadRoutes = (app) => {
  const routesPath = path.join(__dirname);
  const registeredRoutes = []; // Array to collect registered routes for logging

  // Read all files in the current directory except index.js
  fs.readdirSync(routesPath).forEach((file) => {
    if (file !== 'index.js' && file.endsWith('.routes.js')) {
      const route = require(path.join(routesPath, file));
      const routePath = `/api/${file.replace('.routes.js', '')}`; // Derive route prefix from file name
      app.use(routePath, route);  // Register the route
      registeredRoutes.push(routePath); // Add to registered routes
      console.log(`- ${routePath} (Loaded)`); // Indicate which route prefix is loaded

    }
  });

//   // Log all registered routes
//   console.log('Registered Routes:');
//   registeredRoutes.forEach((route) => console.log(` - ${route}`));



// Log all registered routes with full URLs
console.log('\nFull Routes:');
app._router.stack.forEach((middleware) => {
  if (middleware.route) { 
    // Routes registered directly on the app
    const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
    console.log(`[${methods}] ${middleware.route.path}`);
  } else if (middleware.name === 'router') { 
    // Routes added as router middleware
    const baseUrl = middleware.regexp
      .toString()
      .replace(/^\/\^\\/, '/')
      .replace(/\\\/\?\(\?=\\\/\|\$\)\/i$/, ''); // Extract base path

      console.log('baseUrl', baseUrl)
    middleware.handle.stack.forEach((handler) => {
      if (handler.route) {
        const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
        const fullPath = baseUrl + handler.route.path;
        console.log(`full api:   [${methods}] ${fullPath}`);
      }
    });
  }
});
};

module.exports = loadRoutes;
