module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  API_TOKEN: process.env.API_TOKEN || "42545a74-16e3-4982-b0d6-aab2d7ad68ee",
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://pleaseUpdateMe",
  JWT_SECRET: process.env.JWT_SECRET || "590066f6-0db6-4227-8539-d334adad9e65",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "5h"
};
