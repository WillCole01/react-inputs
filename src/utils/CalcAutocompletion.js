
/*
  notes = code in errors (red) and group changes
  separators => '.(),' -> ignore all when enclosed in quotations
  An example => fixed(verb => takes text or int value)
                group (data (qualifier))
                datatype (verbs => enhanceddata, holding, nodestep, enhanceddatastep, performancestatistic())
                level (product, manager)
                identifier (verb => key, definition) // both should pop up on text entering
                optional true flags
*/
/*
  arguments
  calc
  performance_statistic: 'InformatioRatioDecayWeighted', 'AvgGrossExcessRtnDecayWeightedWithGhostYears', 'TrackingErrorDecayWeighted', 'PerformanceHistoryLengthMonths', 
                          'BenchmarkHistoryLengthMonths', 'ExchangeRateHistoryLengthMonths', '5YearTrackingError';
  enhanceddata: any available in the run's 'getallinputs' -> accessed via api
  nodestep(nodeid, anyvalue)
  enhanceddatastep(nodeid, anyvalue)
  level: product, manager 
  datatype: numeric, text
  key: conditional on the datatype above -> any id from a key value pair dependent on wheter text or numeric (from selection)
  calcs => also characterised by the number of arguments:0, fixednumber, indefinite# => e.g. if 0, then any bracket is an immediate error (e.g. end calculation, 'setvaluetonull')
  NOTE = TO KEEP CONSISTENCY BETWEEN CLASS OBJECTS => GET A PARENT CLASS SO THEY'RE SHARED INSTANCES
  Folder: C:\Users\will2659\OneDrive - Willis Towers Watson\Documents\React\testing
*/ 

    class ErrorList
    {

      constructor (error_array)
      {
        this._error_array = [];
        if(error_array)
        {
          for(const i in error_array)
          {
            let x = {'severity':'', 'message': ''};
            x['severity'] = i[0];
            x['message'] = i[1];
            this._error_array.push(x); 
          }
        }
      };
      
      getLength = () => {
        return this._error_array.length;
      };

      addError = (error_severity, error_message) => {
        const x = [error_severity, error_message];
        this._error_array.push(x);
        return;
      }

      reportErrors = () =>
      {
        var errorsFormatted = '';
        this._error_array.forEach(
          error => {  
                        errorsFormatted += (`severity: ${error['severity']} | message: ${error['message']} \n`);
                    }
        );
        return errorsFormatted;
      };
    };



    class Translator
    {
      constructor(expressions, templates, grammars, args, grammar_templates_dict, argument_mappings, argument_placeholders,argument_placeholder_start='{%',argument_placeholder_end='%}')
      {
        this._expressions = expressions;
        this._templates = templates;
        this._grammars = grammars;
        this._args = args;
        this._grammar_templates_dict = grammar_templates_dict;
        this._argument_mappings = argument_mappings; 
        this._argument_placeholders = argument_placeholders;
        this._argument_placeholder_start = argument_placeholder_start;
        this._argument_placeholder_end = argument_placeholder_end;
      };

      translateExpression = (expression, placeHolderExpression) =>
      {

        if(placeHolderExpression.includes('||'))
        {
          placeholders = placeHolderExpression.split('||').trim();
          placeholderResult = '';

          for(placeholder in placeholders)
          {
              if(placeholder.includes(':'))
              {
                attribute = placeholder.split(':')[1].trim();
                let lookupDict = globals.argument_mappings[attribute];
                placeholderResult = lookupDict[getAttributeArg(expression, attribute)];
              }
              else
              {
                placeholderResult = getAttributeArg(expression, placeHolderExpression);
              }
              if (placeholderResult !== null) return placeholderResult;
          }
        };

        if(placeHolderExpression.includes(':'))
        {
          attribute = placeHolderExpression.split(':')[1].trim();
          let lookupDict = globals.argument_mappings[attribute];
          return(lookupDict[getAttributeArg(expression, attribute)]);
        }
        
        return getAttributeArg(expression, placeHolderExpression);
      };

      // check if all expressions in the expression list can be translated

      expandExpression = (expression, parser=WordParser) => // a dict comtaining the attributes (keys) and the arguments
      {
        // find the grammar based on the expression list
        let attributes = parser.getAttributes(expression);
        let expandTemplate = '';
        let placeholderStartLength = this._argument_placeholder_start.length;
        let placeholderEndLength = this._argument_placeholder_end.length; 

        // get the associated template to expand into
        for(var key in globals.grammars)
        {
          if(attributes == globals.grammars[key])
          {
            expandTemplate = globals.templates[key];
          }
        }
        // for each argument, either place it directly in, or map if necessary BASED ON {% : %} pattern
        let placeholders = getGrammarPlaceholdersArray(expandTemplate);

        // run through and replace the placeholders with the correct args or arg fillers
        for(placeholder in placeholders)
        {
          translatedExpression = translateExpression(expression, placeholder.substring(placeholderStartLength,(placeholder.length - placeholderEndLength)).trim());
          expression = expression.replace(placeholder, translatedExpression);
        }
        
        return expression;

      };
      
    }





    class Lister // returns the autofill list to complete based on a cue: either '(' or '.' or ','signalling a new argument
    { 
      // Must keep some representation of the list due to conditional lists - e.g. key or definition depending on data_type
      constructor(word_parser, args, grammars)
      {
        this._wordParser = word_parser;
        this._args = args;
        this._grammars = grammars;
      };

      getUnique = (lst) =>
      {
        return lst.filter((item, i, ar) => ar.indexOf(item) === i);
      }

      getInitialList = () => 
      {
        let x = [];
        for(let i = 1; i < Object.keys(grammars).length; i++)
        {
          x.push(grammars[i][0])
        }
        return getUnique(x);
      }

      getMatchGrammars = (expression) =>
      {
        // "data.level('product').datatype('numeric')."
        let Attributes = this._wordParser.getAttributes(expression);
        let AttributesLength = Attributes.length;
        let grammarsFiltered = [];

        for(let x = 0; x < this._grammars.length; x++)
        {
          if(Attributes === this._grammars[x].slice(0, AttributesLength))
          {
            grammarsFiltered.push(this._grammars[x]);
          }
        }
      };

      //returns attributes based on '.' as last character // from grammars
      getNextAttribute = (expression, index) => {
        grammarsFiltered = this.getMatchGrammars(expression);
        let dLength = Object.keys(grammarsFiltered).length;
        let tokens = [];

        for( let i = 0; i < dLength; i++ )
        {
          tokens.push(grammarsFiltered[i][index]);
        }
        return tokens;
      };

      // returns the list of attibute args OR even conditional attribute args
      // example get_arguments(attribute='chooser',depends_on= 'Justice League')
      getArguments = (expression, attribute, depends_on = null) => {
        // args[attibute][depends_on]
          if (depends_on)
          {
            let depends_on_arg = this._wordParser.getAttributeArg(expression,depends_on);
            return this._args[attribute]['args'][depends_on_arg];
          }
          else
          {
            return this._args[attribute]['args'];
          }
      };

      getGrammarPlaceholdersArray = (grammar,openingChars='{%', closingChars='%}') =>
      { 
          placeholders = [];
          a = 0;
          let openingCharsLength = openingChars.length, closingCharsLength = closingChars.length;

          while(grammar.indexOf(openingChars, a) != -1)
          { 
            a = grammar.indexOf(openingChars, a);
            b = grammar.indexOf(closingChars, a + openingCharsLength);
            if (a != -1 && b!= - 1)
            {
              placeholders.push(grammar.substring(a,(b + closingCharsLength)));
              a = b + closingCharsLength;
            }
          }
            return placeholders;
      };
  }


  
    // just a bag of helpers for parsing arguments/attributes in expression
    class WordParser
    {
      resetParser = (wordList, validCalcArray, dataget_configurations, argument_list) => {
        if(wordList)  this._wordList = wordList;
        if(validCalcArray) this._validCalcArray = validCalcArray;
        if(dataget_configurations)  this._dataget_configurations = dataget_configurations;
        if(argument_list) this._argument_list = argument_list;
      };
      // internal helper methods //

      checkFormatting = () => 
      {
        let calc_arguments = this._expressionArray.join();
        let enclosure = this.wordList.replace(calc_arguments, '');

        if (enclosure.slice(0,5).toLowerCase() !== 'calc.')
        {
          this._errorList.addError(1, 'expecting expression to start with calc definition');
        }

        const calc_name = enclosure.slice(5,enclosure.indexOf('(')).toLowerCase();
        if (this._validCalcArray.includes(calc_name) === false)
        {
          this._errorList.addError(1, `unknown calculation used: ${calc_name}`);
        }

        if (enclosure[enclosure.length] !== ')')
        {
          this._errorList.addError(1, `no brace enclosing calc arguments \')\'`);
        }
        

        let counter = 0;
        //verifies enclosing curly braces and square brackets

        for(let i = 0; i <= this.wordList.length; i++ )
        {
          // opening and closing braces should always appear between dots, unless it's the calc body args
          if(this.wordList[i] === '(') counter += 1;
          if(this.wordList[i] === ')') counter -= 1;
          if((this.wordList[i] === '.' || i === this.wordList.length) && counter !== 0) errorList.addError(1,'expecting closing \')\' in expressions at index [' + i + '] ');
        }
      };

      generateWordArray = () => { let wordArray = [['']];
                                  for (let i = 0; i < this._expressionArray.length; i++) {
                                    let tokens = this._expressionArray.split('.');
                                    for (let x = 0; x < tokens.length; x++) {
                                      wordArray[i][x] = tokens[x];
                                    }
                                    wordArray.push(['']);
                                  }
                                  return wordArray;
                                };
      
      // example expression
      getAttributes = (expression) =>
      {
        let tokens = [];

        expression.split('.').forEach(
          token => {
              if(token.includes('('))
              {
                tokens.push(token.substring(0, token.indexOf('(')));
              }
              else{
                tokens.push(token);
              }
            }
          )

          return tokens;
      };

      // that('one').is('two').a('three').fake('four').array
      // think of case where there are two or 0 arguments
      getAttributeArg = (expression, attribute_name) =>
      {
        let component = (expression.split('.').filter((x) => x === attribute_name || x.substring(0,x.indexOf('(')) === attribute_name))[0];
                  
        if (component.includes('('))
        {
          return component.split('(')[1].replaceAll('"','').replaceAll("'","").replaceAll(')','');
        }
        else
        {
          return '';
        }
      };

    
      checkWordArray = () => {
        // Must match these to patterns and expressions
        // clean the word array
        let token = ''
        for(let i = 0; i < this.wordArray.length; i++)
        {
          token = this.wordArray[i].indexOf('(') != -1 ? this.wordArray[i].substring(0, this.wordArray[i].indexOf('(')) : this.wordArray[i];
          if(this.getDictionaryWordByIndex(i,this._sequence_configurations).includes(token) === false)
          {
            this._errorList.addError(1,'Sequence error in ' + this.wordArray[i]);
          }


          if(this.getDictionaryWordByIndex(i,this._sequence_configurations).includes(token) === false)
          {
            this._errorList.addError(1,'Sequence error in argument of ' + this.wordArray[i]);
          }
        }
      };

      checkarguments = () => {
        return 0;
      };

      validateExpression = () => {
        if(this.errorList.length > 0) return -1;
        return 1;
      };

      getErrors = () => {
        return this._errorList.errorsFormatted();
      };

    };
