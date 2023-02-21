templates = {
  1: '{"Name":"Fixed Value","DataId":"9","Value":"{% value %}"}',
  2: '{"Name":"{% data || _ %}","DataId":"11","NodeId":"{% node:nodeid %}"}',
  3: '{"Name":"{% data || _ %}","DataId":"17","NodeId":"{% node:nodeid %}","CalculationOrder":"{% nodestep %}"}',
  4: '{"Name":"{% data || _ %}","DataId":"12","EnhancedDataId":"{% enhanceddata:enhanceddataid %}"}',
  5: '{"Name":"{% data || _ %}","DataId":"18","EnhancedDataId":"{% enhanceddata:enhanceddataid %}"},"CalculationOrder":"{% enhanceddatastep %}"',
  6: '{"Name":"{% data || _  %}","DataId":"12","EnhancedDataId":"1","Statistic":"{% performancestatistic %}"}',
  7: '{"Name":"{% data || _ %}","DataId":"{% datatype:dataid %}","PortfolioId":"{% level %}_PortfolioId","SourceGroupId":"19","PortfolioAttribute{% datatype:type %}TypeId":"{% definition %}","AsAtDate":"AsAtDate","ModelRunId":"-2","CurrencyId":"-2","CountryId":"0","AssetClassId":"1"}',
  8: '{"Name":"{% data || _ %}","DataId":"{% datatype:dataid %}","PortfolioId":"{% level %}_PortfolioId","SourceGroupId":"19","PortfolioAttribute{% datatype:type %}TypeId":"{% definition %}","AsAtDate":"AsAtDate","ModelRunId":"-2","CurrencyId":"-2","CountryId":"0","AssetClassId":"1"}',
  9: '{"Name":"{% data || _ %}","DataId":"{% datatype:dataid %}","PortfolioId":"{% level %}_PortfolioId","SourceGroupId":"19","PortfolioAttribute{% datatype:type %}TypeId":"{% definition %}","AsAtDate":"AsAtDate","ModelRunId":"-2","CurrencyId":{% currency:currencyid %},"CountryId":"0","AssetClassId":"1"}',
  10: '{"Name":"{% data || _ %}","DataId":"{% datatype:dataid %}","PortfolioId":"{% level %}_PortfolioId","SourceGroupId":"19","PortfolioAttribute{% datatype:type %}TypeId":"{% definition %}","AsAtDate":"AsAtDate","ModelRunId":"-2","CurrencyId":{% currency:currencyid %},"CountryId":"0","AssetClassId":"1"}',
  11: '{"Name":"{% data || _ %}","DataId":"{% datatype:dataid %}","PortfolioId":"{% level %}_PortfolioId","SourceGroupId":"19","PortfolioAttribute{% datatype:type %}TypeId":"{% definition %}","AsAtDate":"AsAtDate","ModelRunId":"-2","CurrencyId":{% "currencytype" %},"CountryId":"0","AssetClassId":"1"}',
  12: '{"Name":"{% data || _ %}","DataId":"{% datatype:dataid %}","PortfolioId":"{% level %}_PortfolioId","SourceGroupId":"19","PortfolioAttribute{% datatype:type %}TypeId":"{% definition %}","AsAtDate":"AsAtDate","ModelRunId":"-2","CurrencyId":{% "currencytype" %},"CountryId":"0","AssetClassId":"1"}'
};

grammars = { // the possible grammars (see those used below)
    1: ['fixed'], // eventually, this could just be a value, int or between quotations for a string, needs a regex verifier for the errors
    2: ['data','node'],
    3: ['data','node', 'nodestep'],
    4: ['data','enhanceddata'],
    5: ['data','enhanceddata','enhanceddatastep'],
    6: ['data','performancestatistic'],
    7: ['data', 'level', 'datatype', 'key'],
    8: ['data', 'level', 'datatype', 'definition'],
    9: ['data', 'level', 'datatype', 'key', "currency"],
    10: ['data', 'level', 'datatype', 'definition', "currency"],
    11: ['data', 'level', 'datatype', 'key', "currencytype"],
    12: ['data', 'level', 'datatype', 'definition', "currencytype"]
};

// links grammars+template combinations to mappings
argument_mappings = { // a dictionary of dictionaries to hold any arguments that might need mapping for any of the grammar_templates_dict combinations
  "nodeid":{}, // example - translates the arguments associated with node - loaded from api on startup, depends on the model (run model) selected
  "enhanceddataid":{}, // loaded from api on startup, might need self '.' arguments as well
  "dataid": {"text":1, "numeric":2}, 
  "type":{"text":"Text", "numeric":"Value"}, // definition to be loaded from the api
  "currencyid":{}
};

arguments  = {
  node:"-1", // maybe loaded based on the model
  enhanceddata:[],
  performancestatistic:['InformatioRatioDecayWeighted','', 'TrackingErrorDecayWeighted', 'PerformanceHistoryLengthMonths','BenchmarkHistoryLengthMonths', 'ExchangeRateHistoryLengthMonths','5YearTrackingError'],
  datatype:['text','numeric'],
  key:[], // tricky one as the key depends on the datatype
  definition:[], // tricky one as the key depends on the datatype
  currency:[],
  currencytype:[]
}

argument_validations = {
  nodestep:"^[a-z,A-Z]", // any integer
  enhanceddatastep:"^[a-z,A-Z]"
}