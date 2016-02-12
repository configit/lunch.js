using System.Collections.Generic;

using GraphQL;
using GraphQL.Http;

using StarWars.Query;

namespace StarWars {
  public class Api {
    private readonly StarWarsSchema _starWarsSchema;
    private readonly DocumentExecuter _executer;
    private readonly DocumentWriter _writer;

    public Api() {
      _starWarsSchema = new StarWarsSchema();
      _executer = new DocumentExecuter();
      _writer = new DocumentWriter();
    }

    public string Execute( string query, string inputs = null ) {
      Inputs asInputs = inputs != null ? inputs.ToInputs() : null;
      ExecutionResult result = _executer.ExecuteAsync( _starWarsSchema, null, query, null, asInputs ).Result;
      return _writer.Write( result );
    }

    public string QueryName() {
      return _starWarsSchema.Query.Name;
    }
  }
}