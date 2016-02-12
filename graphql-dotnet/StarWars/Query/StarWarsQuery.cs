using System;
using System.Linq;

using GraphQL.Types;

using StarWars.Data;
using StarWars.Type;

namespace StarWars.Query {
  internal class StarWarsQuery : ObjectGraphType {
    public StarWarsQuery() {
      var data = new StarWarsData();
      Name = "Query";
      Field<CharacterInterface>( "hero", resolve : context => data.GetDroidByIdAsync( "3" ).Result );
      Field <ListGraphType<HumanType>>(
        "humans",
        arguments: new QueryArguments(
            new[] {
              new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "count", Description = "max count to return" },
            } ),
        resolve : context => {
          if ( context.Arguments.ContainsKey( "count" ) && context.Arguments[ "count" ] != null ) {
            var count = context.Argument<int>( "count" );
            if( count < 1 ) {
              throw new ArgumentException( "count must be larger than 0" );
            }
            return data.GetHumans().Result.Take( count );
          }
          return data.GetHumans().Result;
        } );
      Field<ListGraphType<HumanType>>(
        "droids",
        arguments : new QueryArguments(
            new[] {
              new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "count", Description = "max count to return" },
            } ),
        resolve : context => {
          if ( context.Arguments.ContainsKey( "count" ) && context.Arguments["count"] != null ) {
            var count = context.Argument<int>( "count" );
            if ( count < 1 ) {
              throw new ArgumentException( "count must be larger than 0" );
            }
            return data.GetDroids().Result.Take( count );
          }
          return data.GetDroids().Result;
        } );
      Field<HumanType>(
        "human",
        arguments :
          new QueryArguments(
            new[] {
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "id of the human" },
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "name", Description = "name of the human" }
            } ),
        resolve : context => {
          object id = context.Arguments["id"];
          if ( id != null ) {
            return data.GetHumanByIdAsync( (string)context.Arguments["id"] );
          }
          object name = context.Arguments["name"];
          if ( name != null ) {
            return data.GetHumanByNameAsync( (string)name );
          }
          throw new ArgumentException( "Provide id or name argument when querying a human" );
        } );
      Field<DroidType>(
        "droid",
        arguments :
          new QueryArguments(
            new[] {
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "id", Description = "id of the droid" },
              new QueryArgument<NonNullGraphType<StringGraphType>> { Name = "name", Description = "name of the doid" }
            } ),
        resolve : context => {
          object id = context.Arguments["id"];
          if ( id != null ) {
            return data.GetDroidByIdAsync( (string)context.Arguments["id"] );
          }
          object name = context.Arguments["name"];
          if ( name != null ) {
            return data.GetDroidByNameAsync( (string)name );
          }
          throw new ArgumentException( "Provide id or name argument when querying a droid" );
        } );
    }
  }
}