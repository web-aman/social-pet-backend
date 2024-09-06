module.exports = {
    apps: [
      {
        name: 'social-pet-backend',
        script: './index.js', // Your entry file
        instances: 'max', // Or a specific number of instances
        exec_mode: 'cluster', // Run in cluster mode for better performance
        env: {
          NODE_ENV: 'production',
          PORT: 3000,
        },
      },
    ],
  };
  