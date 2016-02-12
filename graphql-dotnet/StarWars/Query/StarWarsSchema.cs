using GraphQL.Types;

namespace StarWars.Query {
  internal class StarWarsSchema: Schema {
    public StarWarsSchema() {
      Query = new StarWarsQuery();
    }
  }
}