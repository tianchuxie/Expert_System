/**
 * Static runner interface.
 */
var Runner = (function() {
    /**
     * Variable namespace used for creating variables.
     */
    var Variable = (function() {
        function SingleValue(/* string */ question, /* Array<string> */ possible) {
            checkString(question);
            checkArray(possible);
            for (var i = 0; i < possible.length; i++)
                checkString(possible[i]);
            var value, known;
            this.type = DataType.SingleValue;
            this.question = question;
            this.possible = possible;
            this.getValue = function() {
                if (!known)
                    throw "Value is not known.";
                return value;
            };
            this.setKnown = function() {
                known = true;
            };
            this.setValue = function(i) {
                //console.log("Setting value for '" + question + "' to '" + this.possible[i] + "'.");
                if (known)
                    throw "Variable is already known.";
                value = i;
                known = true;
            };
            this.status = function() {
                return known ? StatusValue.Known : StatusValue.Unknown;
            };
            this.log = function() {
                console.log(question + (known ? ": known" : ": unknown"));
                if (known)
                    console.log(" - " + possible[value]);
            };
        };
        function YesNo(/* string */ question) {
            checkString(question);
            var value, known;
            this.type = DataType.YesNo;
            this.question = question;
            this.getValue = function() {
                if (!known)
                    throw "Value is not known.";
                return value;
            };
            this.setKnown = function() {
                known = true;
            };
            this.setValue = function(v) {
                //console.log("Setting value for '" + question + "' to '" + v + "'.");
                if (known)
                    throw "Variable is already known.";
                if (v == true) {
                    value = true;
                    known = true;
                }
                else if (v == false) {
                    value = false;
                    known = true;
                }
                else
                    throw "Illegal value " + JSON.stringify(v) + ". Possible: " + JSON.stringify(this.possible);
            };
            this.status = function() {
                return known ? StatusValue.Known : StatusValue.Unknown;
            };
            this.log = function() {
                console.log(question + (known ? ": known" : ": unknown"));
                if (known)
                    console.log(" - " + value);
            };
        };
        function MultipleValue(/* string */ question, /* Array<string> */ possible) {
            checkString(question);
            checkArray(possible);
            for (var i = 0; i < possible.length; i++)
                checkString(possible[i]);
            var values = [], known, count = 0;
            this.type = DataType.MultipleValue;
            this.question = question;
            this.possible = possible;
            this.getValues = function() {
                if (!known)
                    throw "Values are not known. " + JSON.stringify(values);
                var concise = [];
                for (var i = 0; i < values.length; i++)
                    if (values[i])
                        concise.push(i);
                return concise;
            };
            this.getValueStrings = function() {
                var vs = this.getValues();
                for (var i = 0; i < vs.length; i++)
                    vs[i] = this.possible[vs[i]];
                return vs;
            };
            this.number = function() {
                return count;
            };
            this.setKnown = function() {
                //console.log("Setting known for '" + question + "' to 'true'.");
                known = true;
            };
            this.setValue = function(i) {
                //console.log("Setting value for '" + question + "' to '" + this.possible[i] + "'.");
                values[i] = true;
                known = true;
                count++;
            };
            this.status = function() {
                return known ? StatusValue.Known : StatusValue.Unknown;
            };
            this.log = function() {
                console.log(question + (known ? ": known" : ": unknown"));
                if (known) {
                    var vs = this.getValues();
                    for (var i = 0; i < vs.length; i++)
                        console.log(" - " + vs[i] + ": " + this.possible[vs[i]]);
                }
            };
        };
        function Real(/* string */ question, /* Array<RealRange> */ ranges) {
            checkString(question);
            checkArray(ranges);
            var value, known;
            this.type = DataType.Real;
            this.question = question;
            this.ranges = ranges;
            this.getValue = function() {
                if (!known)
                    throw "Value is not known.";
                return value;
            };
            this.setKnown = function() {
                known = true;
            };
            this.setValue = function(v) {
                //console.log("Setting value for '" + question + "' to '" + v + "'.");
                if (known)
                    throw "Variable is already known.";
                checkNumber(v);
                var inRange = false;
                for (var range in ranges)
                    if (range.inRange(v)) {
                        value = v;
                        known = true;
                        return;
                    }
            };
            this.status = function() {
                return known ? StatusValue.Known : StatusValue.Unknown;
            };
            this.log = function() {
                console.log(question + (known ? ": known" : ": unknown"));
                if (known)
                    console.log(" - " + value);
            };
        };
        function Int(/* string */ question, /* Array<IntRange> */ ranges) {
            checkString(question);
            checkArray(ranges);
            var value, known;
            this.type = DataType.Int;
            this.question = question;
            this.ranges = ranges;
            this.getValue = function() {
                if (!known)
                    throw "Value is not known.";
                return value;
            };
            this.setKnown = function() {
                known = true;
            };
            this.setValue = function(v) {
                //console.log("Setting value for '" + question + "' to '" + v + "'.");
                if (known)
                    throw "Variable is already known.";
                checkInteger(v);
                var inRange = false;
                for (var i = 0; i < ranges.length; i++)
                    if (ranges[i].inRange(v)) {
                        value = v;
                        known = true;
                        return;
                    }
            };
            this.status = function() {
                return known ? StatusValue.Known : StatusValue.Unknown;
            };
            this.log = function() {
                console.log(question + (known ? ": known" : ": unknown"));
                if (known)
                    console.log(" - " + value);
            };
        }
        return {
            /**
             * Create a variable based purely on the json information passed in.
             */
            create: function(attribute, identifier) {
                switch (attribute.type) {
                    case DataType.SingleValue:
                        return new SingleValue(identifier.question, identifier.values);
                    case DataType.YesNo:
                        return new YesNo(identifier.question);
                    case DataType.MultipleValue:
                        return new MultipleValue(identifier.question, identifier.values);
                    case DataType.Real:
                        var ranges = [];
                        for (var j = 0; j < attribute.ranges.length; j++) {
                            var r = attribute.ranges[j], lower = r.lower, upper = r.upper;
                            ranges.push(new RealRange(lower.value, upper.value, lower.inc, upper.inc));
                        }
                        return new Real(identifier.question, ranges);
                    case DataType.Int:
                        var ranges = [];
                        for (var j = 0; j < attribute.ranges.length; j++) {
                            var r = attribute.ranges[j], lower = r.lower, upper = r.upper;
                            ranges.push(new IntRange(lower.value, upper.value, lower.inc, upper.inc));
                        }
                        return new Int(identifier.question, ranges);
                    default:
                        throw "Illegal DataType '" + type + "'.";
                }
            }
        };
    })();
    
    /**
     * Class for a simple queue that wraps arround an array.
     */
    var Queue = function(arr) {
        var i = 0;
        this.isEmpty = function() {
            return i >= arr.length;
        };
        this.pop = function() {
            return arr[i++];
        };
        this.reset = function() {
            i = 0;
        };
    };
    
    /**
     * Class for a simple linked list structure that only allows pushing and popping.
     */
    var LinkedList = function() {
        var head, tail;
        this.pop = function() {
            var temp = head.data;
            head = head.next;
            return temp;
        };
        this.push = function(data) {
            if (tail)
                tail = tail.next = { data: data };
            else
                head = tail = { data: data };
        };
        this.reset = function() {
            head = tail = null;
        };
    };
    
    /**
     * Class that holds variables and their values.
     */
    var VariableList = function(identifiers) {
        var list = [];
        this.add = function(identifier, variable) {
            list[identifier] = variable;
        };
        this.get = function(identifier) {
            return list[identifier];
        };
        this.getIdentifier = function(identifier) {
            return identifiers[identifier];
        };
        this.setKnown = function(identifier) {
            list[identifier].setKnown();
        };
        this.setValue = function(identifier, value) {
            list[identifier].setValue(value);
        };
        this.status = function(identifier) {
            return list[identifier].status();
        };
        this.reset = function() {
            for (var i = 0; i < list.length; i++)
                if (list[i])
                    list[i].reset();
        };
        this.logAll = function() {
            for (var i = 0; i < list.length; i++)
                list[i].log();
        };
    };
    
    /**
     * Whether the system is currently running.
     */
    var running;
    
    /**
     * Whether the system is currently expecting an answer.
     */
    var expectingAnswer = false;
    
    /**
     * The function to call when an answer is given.
     */
    var answerCallback;
    
    /**
     * A list to hold all of the variables.
     */
    var vars;
    
    /**
     * An array to hold the current rules.
     */
    var rules;
    
    /**
     * A Queue to hold the current actions.
     */
    var actions;
    
    /**
     * A DOM element to write the log to.
     */
    var logDiv;
    
    /**
     * Finds a list of rules that modify a given variable name.
     */
    function rulesThatModify(/* int */ identifier) {
        checkInteger(identifier);
        var modifiers = [];
        for (var i = 0; i < rules.length; i++) {
            var rule = rules[i], consequents = rule.consequents;
            for (var j = 0; j < consequents.length; j++)
                if (identifier == consequents[j].identifier) {
                    modifiers.push(rule);
                    break;
                }
        }
        return modifiers;
    }
    
    /**
     * Evaluates a single antecedent of a statement.
     */
    function evaluateAntecedent(antecedent, cb) {
        if (antecedent.identifier >= 0) {
            var v = vars.get(antecedent.identifier);
            switch (v.type) {
                case DataType.SingleValue:
                    var equals = antecedent.relation == BooleanRelation.Equals;
                    obtain(antecedent.identifier, function() {
                        var value = v.getValue(), ands = antecedent.values, andResult = ands.length > 0;
                        for (var i = 0; i < ands.length; i++) {
                            var ors = ands[i], orResult = false;
                            for (var j = 0; j < ors.length; j++)
                                if (equals == (ors[j] == value)) {
                                    orResult = true;
                                    break;
                                }
                            if (!orResult) {
                                andResult = false;
                                break;
                            }
                        }
                        cb(andResult);
                    });
                    return;
                case DataType.YesNo:
                    var equals = antecedent.relation == BooleanRelation.Equals;
                    obtain(antecedent.identifier, function() {
                        var value = v.getValue();
                        if (value == true)
                            cb(equals == (antecedent.value == value));
                        else if (value == false)
                            cb(equals == (antecedent.value == value));
                        else
                            throw "Invalid value. " + JSON.stringify(value);
                    });
                    return;
                case DataType.MultipleValue:
                    var equals = antecedent.relation == BooleanRelation.Equals;
                    obtain(antecedent.identifier, function() {
                        var values = v.getValues(), ands = antecedent.values, andResult = ands.length > 0;
                        for (var i = 0; i < ands.length; i++) {
                            var ors = ands[i], orResult = false;
                            for (var j = 0; j < ors.length; j++)
                                if (equals != (values.indexOf(ors[j]) == -1)) {
                                    orResult = true;
                                    break;
                                }
                            if (!orResult) {
                                andResult = false;
                                break;
                            }
                        }
                        cb(andResult);
                    });
                    return;
                case DataType.Real:
                case DataType.Int:
                    obtain(antecedent.identifier, function() {
                        var value = v.getValue();
                        switch (antecedent.relation) {
                            case NumericRelation.Equals:
                                cb(value == antecedent.value);
                                return;
                            case NumericRelation.NotEqualTo:
                                cb(value != antecedent.value);
                                return;
                            case NumericRelation.GreaterThan:
                                cb(value > antecedent.value);
                                return;
                            case NumericRelation.LessThan:
                                cb(value < antecedent.value);
                                return;
                            case NumericRelation.GreaterThanOrEqualTo:
                                cb(value >= antecedent.value);
                                return;
                            case NumericRelation.LessThanOrEqualTo:
                                cb(value <= antecedent.value);
                                return;
                            default:
                                throw "Illegal NumericRelation '" + relation + "'.";
                        }
                    });
                    return;
                default:
                    throw "Invalid DataType '" + v.type + "'.";
            }
        }
        else if (antecedent.variable) { // STATUS or NUMBER function call
            var v = vars.get(antecedent.variable);
            // TODO
        }
        throw "Illegal Antecedent.";
    }
    
    /**
     * Evaluates a single consequent of a statement.
     */
    function evaluateConsequent(consequent) {
        if (!consequent.identifier)
            throw "Illegal Consequent.";
        var v = vars.get(consequent.identifier);
        switch (v.type) {
            case DataType.SingleValue:
                vars.setValue(consequent.identifier, consequent.value);
                return;
            case DataType.YesNo:
                vars.setValue(consequent.identifier, consequent.present);
                return;
            case DataType.MultipleValue:
                for (var i = 0; i < consequent.values.length; i++)
                    vars.setValue(consequent.identifier, consequent.values[i]);
                return;
            case DataType.Real:
            case DataType.Int:
                vars.setValue(consequent.identifier, consequent.value);
                return;
            default:
                throw "Invalid DataType '" + v.type + "'.";
        }
    }
    
    function evaluateOr(ors, cb) {
        if (ors.isEmpty()) {
            cb(false);
            return;
        }
        var or = ors.pop();
        evaluateAntecedent(or, function(result) {
            if (result) {
                cb(true);
                return;
            }
            evaluateOr(ors, cb);
        });
    }
    
    function evaluateAnd(ands, cb) {
        if (ands.isEmpty()) {
            cb(true);
            return;
        }
        var and = ands.pop();
        evaluateOr(new Queue(and), function(result) {
            if (!result) {
                cb(false);
                return;
            }
            evaluateAnd(ands, cb);
        });
    }
    
    function evaluateRule(rules, cb) {
        if (rules.isEmpty()) {
            cb();
            return;
        }
        var rule = rules.pop();
        evaluateAnd(new Queue(rule.antecedents), function(result) {
            if (result) {
                for (var i = 0; i < rule.consequents.length; i++)
                    evaluateConsequent(rule.consequents[i]);
                for (var i = 0; i < rule.commands.length; i++)
                    executeCommand(rule.commands[i]);
            }
            evaluateRule(rules, cb);
        });
    }
    
    /**
     * Finds the value of the variable with the given identifier.
     */
    function obtain(/* int */ identifier, /* function */ cb) {
        var v = vars.get(identifier), i = vars.getIdentifier(identifier), q = i.question;
        if (v.status() == StatusValue.Known)
            cb();
        else {
            console.log("Obtaining '" + i.name + "'.");
            var modifiers = rulesThatModify(identifier);
            if (modifiers.length > 0)
                evaluateRule(new Queue(modifiers), cb);
            else
                switch (v.type) {
                    case DataType.SingleValue:
                        Prompt.SingleValue(q, v.possible, function(value) {
                            vars.setValue(identifier, value);
                            cb();
                        });
                        return;
                    case DataType.YesNo:
                        Prompt.YesNo(q, function(yes) {
                            vars.setValue(identifier, yes);
                            cb();
                        });
                        return;
                    case DataType.MultipleValue:
                        vars.setKnown(identifier);
                        Prompt.MultipleValue(q, v.possible, function(values) {
                            for (var i = 0; i < values.length; i++)
                                vars.setValue(identifier, values[i]);
                            cb();
                        });
                        return;
                    case DataType.Real:
                        Prompt.Real(q, v.ranges, function(value) {
                            vars.setValue(identifier, value);
                            cb();
                        });
                        return;
                    case DataType.Int:
                        Prompt.Int(q, v.ranges, function(value) {
                            vars.setValue(identifier, value);
                            cb();
                        });
                        return;
                    default:
                        throw "Illegal DataType '" + type + "'.";
                }
        }
    }
    
    /**
     * Executes a single command.
     */
    function executeCommand(command, cb) {
        switch (command.type) {
            case CommandType.DisplayActions:
            case CommandType.DisplayInstruction:
            case CommandType.DisplayCertification:
            case CommandType.DisplayReferences:
            case CommandType.DisplayAttachments:
            case CommandType.DisplayAttributes:
            case CommandType.DisplayAttributeName:
            case CommandType.DisplayInferredAttributes:
            case CommandType.DisplayInputAttributes:
            case CommandType.DisplayAttributeList:
            case CommandType.DisplayInferredAttributesList:
            case CommandType.DisplayKB:
            case CommandType.DisplayPair:
            case CommandType.DisplayValueName:
            case CommandType.DisplayValues:
            case CommandType.DisplaySynonyms:
            case CommandType.DisplayValuesAttribute:
                throw "Illegal action.";
            case CommandType.DisplayValue:
                var v = vars.get(command.identifier);
                if (logDiv)
                    logDiv.innerHTML += "\n" + vars.getIdentifier(command.identifier).name + " = " + (v.status() == StatusValue.Known ? v.getValueStrings ? JSON.stringify(v.getValueStrings()) : v.getValue() : "UNKNOWN") + "\n";
                if (cb)
                    cb();
                return;
            case CommandType.DisplayCalculation:
            case CommandType.DisplayAuthorAttachmentAttribute:
            case CommandType.DisplayAuthorAttachmentPair:
            case CommandType.DisplayAuthorAttachmentValue:
                throw "Illegal action.";
            case CommandType.Obtain:
                obtain(command.identifier, function() {
                    vars.setKnown(command.identifier);
                    cb();
                });
                return;
            case CommandType.Next:
            case CommandType.Help:
            case CommandType.Pause:
            case CommandType.Continue:
            case CommandType.Clear:
            case CommandType.Stop:
            case CommandType.Suspend:
            case CommandType.Resume:
                throw "Illegal action.";
            case CommandType.Message:
                if (logDiv)
                    for (var i = 0; i < command.lines.length; i++)
                        logDiv.innerHTML += command.lines[i] + "\n";
                if (cb)
                    cb();
                return;
            case CommandType.AskFor:
            case CommandType.Assert:
            case CommandType.If:
            case CommandType.Mark:
            case CommandType.DisplayRules:
            case CommandType.DisplayRule:
            case CommandType.DisplayRuleAttachment:
            case CommandType.Justify:
                throw "Illegal action.";
        }
    }
    
    /**
     * Executes the next action in the queue.
     */
    function doNextAction() {
        if (actions.isEmpty()) {
            stop();
            return;
        }
        executeCommand(actions.pop(), doNextAction);
    }
    
    /**
     * Stops the expert system.
     */
    function stop() {
        console.log("Exiting.");
        running = false;
        //vars.logAll();
    }
    
    /**
     * Runs the expert system, given the specified knowledge base.
     * @param kb - The knowledge base object.
     */
    function run(kb) {
        if (running)
            throw "System is already running.";
        if (kb) {
            // Check validity of the knowledge base.
            checkArray(kb.identifiers);
            checkArray(kb.attributes);
            checkArray(kb.rules);
            checkArray(kb.actions);
            // Set the local variables.
            logDiv = document.getElementById("logDiv");
            vars = new VariableList(kb.identifiers);
            for (var i = 0; i < kb.attributes.length; i++) {
                var attribute = kb.attributes[i];
                var identifier = kb.identifiers[attribute.identifier];
                vars.add(i, Variable.create(attribute, identifier));
            }
            rules = kb.rules;
            actions = new Queue(kb.actions);
        }
        else if (!(rules && actions))
            throw "No knowledge base found.";
        // Run.
        running = true;
        doNextAction();
    }
    
    return {
        /**
         * Runs the expert system, parsing a knowledge base from the specified local file.
         * @param id - The id of the input element to load the file from.
         */
        runFile: function(id) {
            if (running)
                throw "System is already running.";
            if (typeof window.FileReader !== "function")
                throw "FileReader is not available.";
            var input = document.getElementById(id);
            if (!input)
                throw "Could not find the input element.";
            if (!input.files)
                throw "Input element did not contain a 'files' attribute.";
            var file = input.files[0];
            if (!file)
                throw "Please select a file before clicking 'Load'";
            var fr = new FileReader();
            fr.onload = function(e) {
                run(JSON.parse(e.target.result));
            };
            fr.readAsText(file);
        },
        runLocalFile: function(){
            if(running)
                throw "System is already running.";
            
            //console.log(data);
            run(data);
        },
        run: function(x) {
            run(x);
        },
        /**
         * Runs the last expert system again.
         */
        runAgain: function() {
            actions.reset();
            run();
        }
    };
})();
