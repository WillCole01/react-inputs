export const AutocompleteData = {
    "AutocompleteData": [{
            "grammars": [{
                    "Id": 1,
                    "Value": ["fixed"]
                }, {
                    "Id": 2,
                    "Value": ["data", "node"]
                }, {
                    "Id": 3,
                    "Value": ["data", "node", "nodestep"]
                }, {
                    "Id": 4,
                    "Value": ["data", "enhanceddata"]
                }, {
                    "Id": 5,
                    "Value": ["data", "enhanceddata", "enhanceddatastep"]
                }, {
                    "Id": 6,
                    "Value": ["data", "performancestatistic"]
                }, {
                    "Id": 7,
                    "Value": ["data", "level", "datatype", "key"]
                }, {
                    "Id": 8,
                    "Value": ["data", "level", "datatype", "definition"]
                }, {
                    "Id": 9,
                    "Value": ["data", "level", "datatype", "key"]
                }, {
                    "Id": 10,
                    "Value": ["data", "level", "datatype", "definition"]
                }, {
                    "Id": 11,
                    "Value": ["data", "level", "datatype", "key"]
                }, {
                    "Id": 12,
                    "Value": ["data", "level", "datatype", "definition"]
                }
            ]
        }, {
            "argument_mappings": [{
                    "Name": "nodeid",
                    "Value": {}
                }, {
                    "Name": "enhanceddataid",
                    "Value": {}
                }, {
                    "Name": "dataid",
                    "Value": {
                        "text": 1
                    }
                }, {
                    "Name": "type",
                    "Value": {
                        "text": "Text"
                    }
                }, {
                    "Name": "currencyid",
                    "Value": "{}"
                }
            ]
        }, {
            "templates": [{
                    "Name": "Fixed Value",
                    "DataId": "9",
                    "Value": "{% value %}"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "11",
                    "NodeId": "{% node:nodeid %}"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "17",
                    "NodeId": "{% node:nodeid %}",
                    "CalculationOrder": "{% nodestep %}"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "12",
                    "EnhancedDataId": "{% enhanceddata:enhanceddataid %}"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "18",
                    "EnhancedDataId": "{% enhanceddata:enhanceddataid %}"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "12",
                    "EnhancedDataId": "1",
                    "Statistic": "{% performancestatistic %}"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "{% datatype:dataid %}",
                    "PortfolioId": "{% level %}_PortfolioId",
                    "SourceGroupId": "19",
                    "PortfolioAttribute{% datatype:type %}TypeId": "{% definition %}",
                    "AsAtDate": "AsAtDate",
                    "ModelRunId": "-2",
                    "CurrencyId": "-2",
                    "CountryId": "0",
                    "AssetClassId": "1"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "{% datatype:dataid %}",
                    "PortfolioId": "{% level %}_PortfolioId",
                    "SourceGroupId": "19",
                    "PortfolioAttribute{% datatype:type %}TypeId": "{% definition %}",
                    "AsAtDate": "AsAtDate",
                    "ModelRunId": "-2",
                    "CurrencyId": "-2",
                    "CountryId": "0",
                    "AssetClassId": "1"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "{% datatype:dataid %}",
                    "PortfolioId": "{% level %}_PortfolioId",
                    "SourceGroupId": "19",
                    "PortfolioAttribute{% datatype:type %}TypeId": "{% definition %}",
                    "AsAtDate": "AsAtDate",
                    "ModelRunId": "-2",
                    "CurrencyId": "{% currency: currencyid %}",
                    "CountryId": "0",
                    "AssetClassId": "1"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "{% datatype:dataid %}",
                    "PortfolioId": "{% level %}_PortfolioId",
                    "SourceGroupId": "19",
                    "PortfolioAttribute{% datatype:type %}TypeId": "{% definition %}",
                    "AsAtDate": "AsAtDate",
                    "ModelRunId": "-2",
                    "CurrencyId": "{% currency: currencyid %}",
                    "CountryId": "0",
                    "AssetClassId": "1"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "{% datatype:dataid %}",
                    "PortfolioId": "{% level %}_PortfolioId",
                    "SourceGroupId": "19",
                    "PortfolioAttribute": "{% datatype:type %}TypeId: {% definition %}",
                    "AsAtDate": "AsAtDate",
                    "ModelRunId": "-2",
                    "CurrencyId": "{% currencytype %}",
                    "CountryId": "0",
                    "AssetClassId": "1"
                }, {
                    "Name": "{% data || _ %}",
                    "DataId": "{% datatype:dataid %}",
                    "PortfolioId": "{% level %}_PortfolioId",
                    "SourceGroupId": "19",
                    "PortfolioAttribute{% datatype:type %}TypeId": "{% definition %}",
                    "AsAtDate": "AsAtDate",
                    "ModelRunId": "-2",
                    "CurrencyId": "{ % currencytype % }",
                    "CountryId": "0",
                    "AssetClassId": "1"
                }
            ]
        }, {
            "args": {
                "node": "-1",
                "enhanceddata": [],
                "performancestatistic": ["InformatioRatioDecayWeighted", "AvgGrossExcessRtnDecayWeightedWithGhostYears", "TrackingErrorDecayWeighted", "PerformanceHistoryLengthMonths", "BenchmarkHistoryLengthMonths", "ExchangeRateHistoryLengthMonths", "5YearTrackingError"],
                "datatype": ["text", "numeric"],
                "key": [],
                "definition": [],
                "currency": [],
                "currencytype": []
            }
        }, {
            "argument_validations": {
                "nodestep": "^[a-z,A-Z]",
                "enhanceddatastep": "^[a-z,A-Z]"
            }
        }
    ]
}