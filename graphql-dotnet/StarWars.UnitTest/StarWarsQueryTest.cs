using System;

using NUnit.Framework;

namespace StarWars.UnitTest {
  [TestFixture]
  public class StarWarsQueryTest {
    private Api _api;

    [SetUp]
    public void SetUp() {
      _api = new Api();
    }

    [Test]
    public void NamedQuery() {
      const string Query = @"
query q {
  humans {
    name
  }
}
";
      Execute( Query );
    }

    [Test]
    public void AnonymousQuery() {
      const string Query = @"
{
  droids {
    name
  }
}
";
      Execute( Query );
    }

    [Test]
    public void QueryEntityById() {
      const string Query = @"
query q {
  human( id : ""1"" ) {
    name
  }
}
";
      Execute( Query );
    }


    [Test]
    public void InputCoercion() {
      const string Query = @"
query q {
  human( id : 2 ) { #Id is of type string
    name
  }
}
";
      Execute( Query );
    }


    [Test]
    public void QueryEntityByName() {
      const string Query = @"
query q {
  human( name : ""Vader"" ) {
    name
  }
}
";
      Execute( Query );
    }

    [Test]
    public void ReturnSimpleFields() {
      const string Query = @"
query q {
  human( name : ""Vader"" ) {
    name
    homePlanet
  }
}
";
      Execute( Query );
    }

    [Test]
    public void ReturnEnumFields() {
      const string Query = @"
query q {
  human( name : ""Vader"" ) {
    name
    appearsIn
  }
}
";
      Execute( Query );
    }

    [Test]
    public void ReturnRelatedFields() {
      const string Query = @"
query q {
  human( name : ""Luke"" ) {
    name
    appearsIn
    friends {
      name
    }
  }
}
";
      Execute( Query );
    }

    [Test]
    public void ReturnEmptyRelatedFields() {
      const string Query = @"
query q {
  human( name : ""Vader"" ) {
    name
    appearsIn
    friends {
      name
    }
  }
}
";
      Execute( Query );
    }

    [Test]
    public void Comments() {
      const string Query = @"
query q {
  human( name : ""Vader"" ) {
    name
    appearsIn
    friends { ### bah! Vader has no friends
      name
    }
  }
}
";
      Execute( Query );
    }

    [Test]
    public void CommasAreInsignificant() {
      const string Query = @"
query q {
  human( name : ""Vader"" ) {
    name,
    appearsIn,
    friends {
      name
    }
  }
}
";
      Execute( Query );
    }

    private void Execute( string query, string inputs = null ) {
      var result = _api.Execute( query, inputs );
      Console.WriteLine( query );
      Console.WriteLine( JsonHelper.FormatJson( result ) );
    }

    [Test]
    public void Fragments() {

      const string Query = @"
query q {
  humans {
    ...humanFields
    appearsIn
    friends {
      name
    }
  }
}

fragment humanFields on Human {
  id
  name
}
";
      Execute( Query );
    }

    [Test]
    public void FragmentsOnInterface() {

      const string Query = @"
query q {
  humans {
    ...charFields
    appearsIn
    friends {
      ...charFields
    }
  }
}

fragment charFields on Character {
  id
  name
}
";
      Execute( Query );
    }

    [Test]
    public void Variables() {

      const string Query = @"
query q( $name: String ) {
  human( name: $name ) {
    id
    name
    appearsIn
    friends {
      name
    }
  }
}
";
      const string Inputs = @"
{
  'name': 'Vader'
}";

      Execute( Query, Inputs );
    }

    [Test]
    public void SimpleIntrospection() {

      const string Query = @"
query IntrospectionQuery
        {
            __schema
            {
                queryType { name }
                mutationType { name }
                types {
                  name,
                  description
                }
            }
        }
";

      Execute( Query );
    }

    [Test]
    public void TypeIntrospection() {

      const string Query = @"
query IntrospectionQuery
        {
            __type( name: ""Human"")
            {
                name
                fields {
                  name
                  type {
                    name
                  }
                }
            }
        }
";

      Execute( Query );
    }

    [Test]
    public void FullIntrospection() {

      const string Query = @"
query IntrospectionQuery
        {
            __schema
            {
                queryType { name }
                mutationType { name }
                types( name: ""Episode"" ) {
                  ...FullType
                }
                directives {
                  name
                  description
                  args {
                    ...InputValue
                  }
                  onOperation
                  onFragment
                  onField
                }
            }
        }
        fragment FullType on __Type
        {
          kind
          name
          description
          fields {
            name
            description
            args {
              ...InputValue
            }
            type {
              ...TypeRef
            }
            isDeprecated
            deprecationReason
          }
            inputFields {
              ...InputValue
            }
            interfaces {
              ...TypeRef
            }
            enumValues {
              name
              description
              isDeprecated
              deprecationReason
            }
            possibleTypes {
              ...TypeRef
            }
        }
        fragment InputValue on __InputValue {
          name
          description
          type { ...TypeRef }
          defaultValue
        }
        fragment TypeRef on __Type {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
";

      Execute( Query );
    }

    [Test]
    public void Query() {

      const string Query = @"
query q {
  humans( count: 0 ) {
    id
    name
    appearsIn
    friends {
      name
    }
  }
}
";
      Execute( Query );
    }

    [Test]
    public void Schema() {
      _api.QueryName();
    }

    //query 1 entity
    //inputs
    //set operations
    //errors
    //schema
    //mutations
    //query shorthand
    //arguments, multiple arguments in one field
    //alias
    //fragments, inline fragments, fragments on types
    //variables
    //types and interfaces
    //unions
    //directives
  }
}