﻿using GraphQL.Types;

using StarWars.Entities;

namespace StarWars.Type {
  internal class CharacterInterface : InterfaceGraphType {
    public CharacterInterface() {
      Name = "Character";
      Field<NonNullGraphType<StringGraphType>>( "id", "The id of the character." );
      Field<StringGraphType>( "name", "The name of the character." );
      Field<ListGraphType<CharacterInterface>>( "friends" );
      Field<ListGraphType<EpisodeEnum>>( "appearsIn", "Which movie they appear in." );

      ResolveType = obj => {
        if ( obj is Human ) {
          return new HumanType();
        }
        return new DroidType();
      };
    }
  }
}