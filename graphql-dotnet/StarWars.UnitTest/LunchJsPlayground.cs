using System;

using NUnit.Framework;

namespace StarWars.UnitTest {
  [TestFixture]
  public class LunchJsPlayground {
    [SetUp]
    public void SetUp() {
      _api = new Api();
    }

    private Api _api;

    private void Execute( string query, string inputs = null ) {
      string result = _api.Execute( query, inputs );
      Console.WriteLine( JsonHelper.FormatJson( result ) );
    }

    [Test]
    public void Query() {
      const string Q = @"
query q {
  humans( count: 1 ) {
    name
  }
}


";

      Execute( Q );
    }
  }
}