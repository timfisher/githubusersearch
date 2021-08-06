module.exports = {
    projects: {
      app: {
        schema: ["graphql.schema.json"],
        documents: ["src/**/*.{graphql,js,ts,jsx,tsx}"],
        extensions: {
          endpoints: {
            default: {
              url: "https://api.github.com/graphql",
              headers: { Authorization: `Bearer ${process.env.REACT_APP_GITHUB_AUTHTOKEN}` },
            },
          },
        }
      },
    },
  }