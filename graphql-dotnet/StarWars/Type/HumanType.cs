﻿using GraphQL.Types;

using StarWars.Data;
using StarWars.Entities;

namespace StarWars.Type {
  internal class HumanType : ObjectGraphType {
    public HumanType() {
      var data = new StarWarsData();

      Name = "Human";

      Field<NonNullGraphType<StringGraphType>>( "id", "The id of the human." );
      Field<StringGraphType>( "name", "The name of the human." );
      Field<ListGraphType<CharacterInterface>>(
        "friends", resolve : context => data.GetFriends( context.Source as StarWarsCharacter ) );
      Field<ListGraphType<EpisodeEnum>>( "appearsIn", "Which movie they appear in." );
      Field<StringGraphType>( "homePlanet", "The home planet of the human." );

      Interface<CharacterInterface>();
    }
  }
}