const { printSchema } = require("graphql");

module.exports = {
  plugin: (schema, documents, config) => {
    return [
      "",
      "export const typeDefs = gql`",
      printSchema(schema),
      "`;",
      "",
    ].join("\n").replace("`", "'");
  },
};
