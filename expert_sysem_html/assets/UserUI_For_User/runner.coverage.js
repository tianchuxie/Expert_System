/**
 * Static runner interface.
 */
var Runner = (function($) {
    $.c(0);
    
    /**
     * Variable namespace used for creating variables.
     */
    var Variable = (function($) {
        $.c(0);
        
        /**
         * Constructor for creating SingleValue variables.
         */
        var SingleValue = (function($) {return function(/* string */ question, /* Array<string> */ possible) {
            $.c(0);
            
            // Check types
            checkString(question);
            checkArray(possible);
            for (var i = 0; i < possible.length; i++) {
                $.c(1);
                checkString(possible[i]);
            }
            
            var value, state = StatusValue.Unknown;
            this.type = DataType.SingleValue;
            this.question = question;
            this.possible = possible;
            
            /**
             * Get the value of this variable.
             */
            this.getValue = (function($) {return function() {
                $.c(0);
                if (state != StatusValue.Known) {
                    $.c(1);
                    throw "Value is not known: " + question;
                }
                $.c(2);
                return value;
            };})($.m("getValue", 3));
            
            /**
             * Get the value of this variable, as a human-readable string.
             */
            this.getValueString = (function($) {return function() {
                $.c(0);
                var v = this.getValue();
                return possible[v];
            };})($.m("getValueString", 1));
            
            /**
             * Set the value of this variable.
             */
            this.setValue = (function($) {return function(i) {
                $.c(0);
                if (state == StatusValue.Known && value != i) {
                    $.c(1);
                    throw "Variable is already known: " + question;
                }
                $.c(2);
                value = i;
                state = StatusValue.Known;
            };})($.m("setValue", 3));
            
            /**
             * Set this variable to "CantKnow" status. This means the inference engine cannot determine a value for it.
             */
            this.setCantKnow = (function($) {return function() {
                $.c(0);
                state = StatusValue.CantKnow;
            };})($.m("setCantKnow", 1));
            
            /**
             * Get the status of this variable. "Known" is the best one because you don't have any more work to do.
             */
            this.status = (function($) {return function() {
                $.c(0);
                return state;
            };})($.m("status", 1));
        };})($.m("SingleValue", 2));
        
        /**
         * Constructor for creating YesNo variables.
         */
        var YesNo = (function($) {return function(/* string */ question) {
            $.c(0);
            
            // Check type
            checkString(question);
            
            var value, state = StatusValue.Unknown;
            this.type = DataType.YesNo;
            this.question = question;
            
            /**
             * Get the value of this variable.
             */
            this.getValue = (function($) {return function() {
                $.c(0);
                if (state != StatusValue.Known) {
                    $.c(1);
                    throw "Value is not known: " + question;
                }
                $.c(2);
                return value;
            };})($.m("getValue", 3));
            
            /**
             * Get the value of this variable, as a human-readable string.
             */
            this.getValueString = (function($) {return function() {
                $.c(0);
                var v = this.getValue();
                return v ? "Yes" : "No";
            };})($.m("getValueString", 1));
            
            /**
             * Set the value of this variable.
             */
            this.setValue = (function($) {return function(v) {
                $.c(0);
                if (state == StatusValue.Known && value != v) {
                    $.c(1);
                    throw "Variable is already known: " + question;
                }
                $.c(2);
                if (v == true) {
                    $.c(3);
                    value = true;
                    state = StatusValue.Known;
                }
                else if (v == false) {
                    $.c(4);
                    value = false;
                    state = StatusValue.Known;
                }
                else {
                    $.c(5);
                    throw "Illegal value " + JSON.stringify(v) + ".";
                }
            };})($.m("setValue", 6));
            
            /**
             * Set this variable to "CantKnow" status. This means the inference engine cannot determine a value for it.
             */
            this.setCantKnow = (function($) {return function() {
                $.c(0);
                state = StatusValue.CantKnow;
            };})($.m("setCantKnow", 1));
            
            /**
             * Get the status of this variable. "Known" is the best one because you don't have any more work to do.
             */
            this.status = (function($) {return function() {
                $.c(0);
                return state;
            };})($.m("status", 1));
        };})($.m("YesNo", 1));
        
        /**
         * Constructor for creating MultipleValue variables.
         */
        var MultipleValue = (function($) {return function(/* string */ question, /* Array<string> */ possible) {
            $.c(0);
            
            // Check types
            checkString(question);
            checkArray(possible);
            for (var i = 0; i < possible.length; i++) {
                $.c(1);
                checkString(possible[i]);
            }
            
            var values = [], state = StatusValue.Unknown;
            this.type = DataType.MultipleValue;
            this.question = question;
            this.possible = possible;
            
            /**
             * Get the values of this variable.
             */
            this.getValues = (function($) {return function() {
                $.c(0);
                if (state != StatusValue.Known) {
                    $.c(1);
                    throw "Variable is not known: " + question;
                }
                $.c(2);
                var concise = [];
                for (var i = 0; i < values.length; i++) {
                    $.c(3);
                    if (values[i]) {
                        $.c(4);
                        concise.push(i);
                    }
                }
                return concise;
            };})($.m("getValues", 5));
            
            /**
             * Get the values of this variable, as human-readable strings.
             */
            this.getValueStrings = (function($) {return function() {
                $.c(0);
                var vs = this.getValues();
                for (var i = 0; i < vs.length; i++) {
                    $.c(1);
                    vs[i] = this.possible[vs[i]];
                }
                return vs;
            };})($.m("getValueStrings", 2));
            
            /**
             * Get the number of values of this variable.
             */
            this.number = (function($) {return function() {
                $.c(0);
                return this.getValues().length;
            };})($.m("number", 1));
            
            /**
             * Set this variable to "Known".
             */
            this.setKnown = (function($) {return function() {
                $.c(0);
                state = StatusValue.Known;
            };})($.m("setKnown", 3));
            
            /**
             * Set a value of this variable.
             */
            this.setValue = (function($) {return function(i) {
                $.c(0);
                values[i] = true;
                state = StatusValue.Known;
            };})($.m("setValue", 1));
            
            /**
             * Set this variable to "CantKnow" status. This means the inference engine cannot determine a value for it.
             */
            this.setCantKnow = (function($) {return function() {
                $.c(0);
                state = StatusValue.CantKnow;
            };})($.m("setCantKnow", 1));
            
            /**
             * Get the status of this variable. "Known" is the best one because you don't have any more work to do.
             */
            this.status = (function($) {return function() {
                $.c(0);
                return state;
            };})($.m("status", 1));
        };})($.m("MultipleValue", 2));
        
        /**
         * Constructor for creating Real variables.
         */
        var Real = (function($) {return function(/* string */ question, /* Array<RealRange> */ ranges) {
            $.c(0);
            
            // Check types
            checkString(question);
            checkArray(ranges);
            
            var value, state = StatusValue.Unknown;
            this.type = DataType.Real;
            this.question = question;
            this.ranges = ranges;
            
            /**
             * Get the value of this variable.
             */
            this.getValue = (function($) {return function() {
                $.c(0);
                if (state != StatusValue.Known) {
                    $.c(1);
                    throw "Value is not known: " + question;
                }
                $.c(2);
                return value;
            };})($.m("getValue", 3));
            
            /**
             * Set the value of this variable.
             */
            this.setValue = (function($) {return function(v) {
                $.c(0);
                if (state == StatusValue.Known && value != v) {
                    $.c(1);
                    throw "Variable is already known: " + question;
                }
                $.c(2);
                checkNumber(v);
                for (var i = 0; i < ranges.length; i++) {
                    $.c(3);
                    if (ranges[i].inRange(v)) {
                        $.c(4);
                        value = v;
                        state = StatusValue.Known;
                        return;
                    }
                }
                $.c(5);
                throw "Variable was not in range.";
            };})($.m("setValue", 6));
            
            /**
             * Set this variable to "CantKnow" status. This means the inference engine cannot determine a value for it.
             */
            this.setCantKnow = (function($) {return function() {
                $.c(0);
                state = StatusValue.CantKnow;
            };})($.m("setCantKnow", 1));
            
            /**
             * Get the status of this variable. "Known" is the best one because you don't have any more work to do.
             */
            this.status = (function($) {return function() {
                $.c(0);
                return state;
            };})($.m("status", 1));
        };})($.m("Real", 1));
        
        /**
         * Constructor for creating Int variables.
         */
        var Int = (function($) {return function(/* string */ question, /* Array<IntRange> */ ranges) {
            $.c(0);
            
            // Check types
            checkString(question);
            checkArray(ranges);
            
            var value, state = StatusValue.Unknown;
            this.type = DataType.Int;
            this.question = question;
            this.ranges = ranges;
            
            /**
             * Get the value of this variable.
             */
            this.getValue = (function($) {return function() {
                $.c(0);
                if (state != StatusValue.Known) {
                    $.c(1);
                    throw "Value is not known: " + question;
                }
                $.c(2);
                return value;
            };})($.m("getValue", 3));
            
            /**
             * Set the value of this variable.
             */
            this.setValue = (function($) {return function(v) {
                $.c(0);
                if (state == StatusValue.Known && value != v) {
                    $.c(1);
                    throw "Variable is already known: " + question;
                }
                $.c(2);
                checkInteger(v);
                var inRange = false;
                for (var i = 0; i < ranges.length; i++) {
                    $.c(3);
                    if (ranges[i].inRange(v)) {
                        $.c(4);
                        value = v;
                        state = StatusValue.Known;
                        return;
                    }
                }
                $.c(5);
                throw "Variable was not in range.";
            };})($.m("setValue", 6));
            
            /**
             * Set this variable to "CantKnow" status. This means the inference engine cannot determine a value for it.
             */
            this.setCantKnow = (function($) {return function() {
                $.c(0);
                state = StatusValue.CantKnow;
            };})($.m("setCantKnow", 1));
            
            /**
             * Get the status of this variable. "Known" is the best one because you don't have any more work to do.
             */
            this.status = (function($) {return function() {
                $.c(0);
                return state;
            };})($.m("status", 1));
        };})($.m("Int", 1));
        
        return {
            
            /**
             * Create a variable based purely on the json information passed in.
             */
            create: (function($) {return function(attribute, identifier) {
                $.c(0);
                switch (attribute.type) {
                    case DataType.SingleValue:
                        $.c(1);
                        return new SingleValue(identifier.question, identifier.values);
                    case DataType.YesNo:
                        $.c(2);
                        return new YesNo(identifier.question);
                    case DataType.MultipleValue:
                        $.c(3);
                        return new MultipleValue(identifier.question, identifier.values);
                    case DataType.Real:
                        $.c(4);
                        var ranges = [];
                        for (var j = 0; j < attribute.ranges.length; j++) {
                            $.c(1);
                            var r = attribute.ranges[j], lower = r.lower, upper = r.upper;
                            ranges.push(new RealRange(lower.value, upper.value, lower.inc, upper.inc));
                        }
                        return new Real(identifier.question, ranges);
                    case DataType.Int:
                        $.c(5);
                        var ranges = [];
                        for (var j = 0; j < attribute.ranges.length; j++) {
                            $.c(1);
                            var r = attribute.ranges[j], lower = r.lower, upper = r.upper;
                            ranges.push(new IntRange(lower.value, upper.value, lower.inc, upper.inc));
                        }
                        return new Int(identifier.question, ranges);
                    default:
                        $.c(6);
                        throw "Illegal DataType '" + type + "'.";
                }
            };})($.m("create", 7))
        };
    })($.m("Variable", 1));
    
    /**
     * Class for a simple queue that wraps arround an array.
     */
    var Queue = (function($) {return function(arr) {
        $.c(0);
        var i = 0;
        
        /**
         * Whether this queue is empty.
         */
        this.isEmpty = (function($) {return function() {
            $.c(0);
            return i >= arr.length;
        };})($.m("isEmpty", 1));
        
        /**
         * Remove the top of this queue.
         */
        this.pop = (function($) {return function() {
            $.c(0);
            return arr[i++];
        };})($.m("pop", 1));
    };})($.m("Queue", 1));
    
    /**
     * Class that holds variables and their values.
     */
    var VariableList = (function($) {return function(identifiers) {
        $.c(0);
        var list = [];
        
        /**
         * Add a variable to this list.
         */
        this.add = (function($) {return function(identifier, variable) {
            $.c(0);
            list[identifier] = variable;
        };})($.m("add", 1));
        
        /**
         * Get a variable from the list, based on the identifier index.
         */
        this.get = (function($) {return function(identifier) {
            $.c(0);
            return list[identifier];
        };})($.m("get", 1));
        
        /**
         * Get the metadata (name, question) associated with this identifier index.
         */
        this.getIdentifier = (function($) {return function(identifier) {
            $.c(0);
            return identifiers[identifier];
        };})($.m("getIdentifier", 1));
        
        /**
         * Set the variable with this identifier index to be known.
         * This should only happen for MultipleValue variables.
         */
        this.setKnown = (function($) {return function(identifier) {
            $.c(0);
            list[identifier].setKnown();
        };})($.m("setKnown", 1));
        
        /**
         * Set the value for the variable with this identifier index, or in the case of a MultipleValue variable, set one of its values.
         */
        this.setValue = (function($) {return function(identifier, value) {
            $.c(0);
            list[identifier].setValue(value);
        };})($.m("setValue", 1));
    };})($.m("VariableList", 1));
    
    /**
     * Whether the system is currently running.
     */
    var running;
    
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
     * Finds a list of rules that modify a given variable name.
     */
    var rulesThatModify = (function($) {return function(/* int */ identifier) {
        $.c(0);
        checkInteger(identifier);
        var modifiers = [];
        for (var i = 0; i < rules.length; i++) {
            $.c(1);
            var rule = rules[i], consequents = rule.consequents;
            for (var j = 0; j < consequents.length; j++) {
                $.c(2);
                if (identifier == consequents[j].identifier) {
                    $.c(3);
                    modifiers.push(rule);
                    break;
                }
            }
        }
        return modifiers;
    };})($.m("rulesThatModify", 4));
    
    /**
     * Evaluates a single antecedent of a statement.
     */
    var evaluateAntecedent = (function($) {return function(antecedent, cb) {
        $.c(0);
        if (antecedent.identifier >= 0) { // Normal antecedent (not a STATUS or NUMBER function call)
            $.c(1);
            var v = vars.get(antecedent.identifier);
            switch (v.type) {
                case DataType.SingleValue:
                    (function($) {
                        $.c(0);
                        var equals = antecedent.relation == BooleanRelation.Equals;
                        obtain(antecedent.identifier, function() {
                            $.c(1);
                            if (v.status() == StatusValue.CantKnow) {
                                $.c(2);
                                cb(false);
                            }
                            else {
                                $.c(3);
                                var value = v.getValue(), ands = antecedent.values, andResult = ands.length > 0;
                                for (var i = 0; i < ands.length; i++) {
                                    $.c(4);
                                    var ors = ands[i], orResult = false;
                                    for (var j = 0; j < ors.length; j++) {
                                        $.c(5)
                                        if (equals == (ors[j] == value)) {
                                            $.c(6)
                                            orResult = true;
                                            break;
                                        }
                                        $.c(7);
                                    }
                                    if (!orResult) {
                                        $.c(8);
                                        andResult = false;
                                        break;
                                    }
                                    $.c(9);
                                }
                                cb(andResult);
                            }
                        });
                    })($.m("SingleValue", 10));
                    return;
                case DataType.YesNo:
                    (function($) {
                        $.c(0);
                        var equals = antecedent.relation == BooleanRelation.Equals;
                        obtain(antecedent.identifier, function() {
                            $.c(1);
                            if (v.status() == StatusValue.CantKnow) {
                                $.c(2);
                                cb(false);
                            }
                            else {
                                $.c(3);
                                var value = v.getValue();
                                if (value == true) {
                                    $.c(4);
                                    cb(equals == (antecedent.value == value));
                                }
                                else if (value == false) {
                                    $.c(5);
                                    cb(equals == (antecedent.value == value));
                                }
                                else {
                                    $.c(6);
                                    throw "Invalid value. " + JSON.stringify(value);
                                }
                            }
                        });
                    })($.m("YesNo", 7));
                    return;
                case DataType.MultipleValue:
                    (function($) {
                        $.c(0);
                        var equals = antecedent.relation == BooleanRelation.Equals;
                        obtain(antecedent.identifier, function() {
                            $.c(1);
                            if (v.status() == StatusValue.CantKnow) {
                                $.c(2);
                                cb(false);
                            }
                            else {
                                $.c(3);
                                var values = v.getValues(), ands = antecedent.values, andResult = ands.length > 0;
                                for (var i = 0; i < ands.length; i++) {
                                    $.c(4);
                                    var ors = ands[i], orResult = false;
                                    for (var j = 0; j < ors.length; j++) {
                                        $.c(5);
                                        if (equals != (values.indexOf(ors[j]) == -1)) {
                                            orResult = true;
                                            break;
                                        }
                                        $.c(6);
                                    }
                                    if (!orResult) {
                                        $.c(7);
                                        andResult = false;
                                        break;
                                    }
                                    $.c(8);
                                }
                                cb(andResult);
                            }
                        });
                    })($.m("MultipleValue", 9));
                    return;
                case DataType.Real:
                case DataType.Int:
                    (function($) {
                        $.c(0);
                        obtain(antecedent.identifier, function() {
                            $.c(1);
                            if (v.status() == StatusValue.CantKnow) {
                                $.c(2);
                                cb(false);
                            }
                            else {
                                $.c(3);
                                var value = v.getValue();
                                switch (antecedent.relation) {
                                    case NumericRelation.Equals:
                                        $.c(4);
                                        cb(value == antecedent.value);
                                        return;
                                    case NumericRelation.NotEqualTo:
                                        $.c(5);
                                        cb(value != antecedent.value);
                                        return;
                                    case NumericRelation.GreaterThan:
                                        $.c(6);
                                        cb(value > antecedent.value);
                                        return;
                                    case NumericRelation.LessThan:
                                        $.c(7);
                                        cb(value < antecedent.value);
                                        return;
                                    case NumericRelation.GreaterThanOrEqualTo:
                                        $.c(8);
                                        cb(value >= antecedent.value);
                                        return;
                                    case NumericRelation.LessThanOrEqualTo:
                                        $.c(9);
                                        cb(value <= antecedent.value);
                                        return;
                                    default:
                                        $.c(10);
                                        throw "Illegal NumericRelation '" + relation + "'.";
                                }
                            }
                        });
                    })($.m("Int/Real", 11));
                    return;
                default:
                    $.c(2);
                    throw "Invalid DataType '" + v.type + "'.";
            }
        }
        else if (antecedent.variable) { // STATUS or NUMBER function call
            $.c(3);
            var v = vars.get(antecedent.variable);
            throw "Unimplemented!!!";
        }
        throw "Illegal Antecedent.";
    };})($.m("evaluateAntecedent", 4));
    
    /**
     * Evaluates a single consequent of a statement.
     */
    var evaluateConsequent = (function($) {return function(consequent) {
        $.c(0);
        checkInteger(consequent.identifier);
        var v = vars.get(consequent.identifier);
        switch (v.type) {
            case DataType.MultipleValue:
                $.c(1);
                vars.setKnown(consequent.identifier);
                for (var i = 0; i < consequent.values.length; i++) {
                    $.c(2);
                    vars.setValue(consequent.identifier, consequent.values[i]);
                }
                return;
            case DataType.SingleValue:
            case DataType.YesNo:
            case DataType.Real:
            case DataType.Int:
                $.c(3);
                vars.setValue(consequent.identifier, consequent.value);
                return;
            default:
                $.c(4);
                throw "Invalid DataType '" + v.type + "'.";
        }
    };})($.m("evaluateConsequent", 5));
    
    /**
     * Evaluate an "OR" array of antecedents.
     * 
     * Notes on logical structure:
     *  - Antecedents are stored in an array of arrays
     *  - The outer array represents an "AND" of its inner arrays
     *  - The inner arrays represent an "OR" of its inner antecedents
     *  - For example, to say (A or B) and (C or D), we construct:
     *        [[A, B], [C, D]]
     *  - This makes "OR" have higher precedence than "AND", which is true in the original KMS system.
     */
    var evaluateOr = (function($) {return function(ors, cb) {
        $.c(0);
        if (ors.isEmpty()) {
            $.c(1);
            cb(false);
            return;
        }
        $.c(2);
        var or = ors.pop();
        evaluateAntecedent(or, function(result) {
            $.c(3);
            if (result) {
                $.c(4);
                cb(true);
                return;
            }
            $.c(5);
            evaluateOr(ors, cb);
        });
    };})($.m("evaluateOr", 6));
    
    /**
     * Evaluate an "AND" array of "OR" arrays.
     * (See evaluateOr for notes on logical structure.)
     */
    var evaluateAnd = (function($) {return function(ands, cb) {
        $.c(0);
        if (ands.isEmpty()) {
            $.c(1);
            cb(true);
            return;
        }
        $.c(2);
        var and = ands.pop();
        evaluateOr(new Queue(and), function(result) {
            $.c(3);
            if (!result) {
                $.c(4);
                cb(false);
                return;
            }
            $.c(5);
            evaluateAnd(ands, cb);
        });
    };})($.m("evaluateAnd", 6));
    
    var evaluateRule = (function($) {return function(rules, cb) {
        $.c(0);
        if (rules.isEmpty()) {
            $.c(1);
            cb();
            return;
        }
        $.c(2);
        var rule = rules.pop();
        if (rule.done) {
            $.c(3);
            cb();
            return;
        }
        $.c(4);
        rule.done = true;
        evaluateAnd(new Queue(rule.antecedents), function(result) {
            $.c(5);
            if (result) {
                $.c(6);
                for (var i = 0; i < rule.consequents.length; i++) {
                    $.c(7);
                    evaluateConsequent(rule.consequents[i]);
                }
                for (var i = 0; i < rule.commands.length; i++) {
                    $.c(8);
                    executeCommand(rule.commands[i]);
                }
            }
            evaluateRule(rules, cb);
        });
    };})($.m("evaluateRule", 9));
    
    var promptForValue = (function($) {return function(v, identifier, q, cb) {
        $.c(0);
        switch (v.type) {
            case DataType.SingleValue:
                $.c(1);
                Prompt.SingleValue(q, v.possible, function(value) {
                    $.c(2);
                    vars.setValue(identifier, value);
                    cb();
                });
                return;
            case DataType.YesNo:
                $.c(3);
                Prompt.YesNo(q, function(yes) {
                    $.c(4);
                    vars.setValue(identifier, yes);
                    cb();
                });
                return;
            case DataType.MultipleValue:
                $.c(5);
                vars.setKnown(identifier);
                Prompt.MultipleValue(q, v.possible, function(values) {
                    $.c(6);
                    for (var i = 0; i < values.length; i++) {
                        $.c(7);
                        vars.setValue(identifier, values[i]);
                    }
                    cb();
                });
                return;
            case DataType.Real:
                $.c(8);
                Prompt.Real(q, v.ranges, function(value) {
                    $.c(9);
                    if (typeof value === "string") {
                        $.c(10);
                        value = parseFloat(value);
                    }
                    vars.setValue(identifier, value);
                    cb();
                });
                return;
            case DataType.Int:
                $.c(11);
                Prompt.Int(q, v.ranges, function(value) {
                    $.c(12);
                    if (typeof value === "string") {
                        $.c(13);
                        value = parseFloat(value);
                    }
                    vars.setValue(identifier, value);
                    cb();
                });
                return;
            default:
                $.c(14);
                throw "Illegal DataType '" + type + "'.";
        }
    };})($.m("promptForValue", 15));
    
    /**
     * Finds the value of the variable with the given identifier.
     */
    var obtain = (function($) {return function(/* int */ identifier, /* function */ cb) {
        $.c(0);
        checkInteger(identifier);
        var v = vars.get(identifier), i = vars.getIdentifier(identifier), q = i.question;
        if (v.status() == StatusValue.Known) {
            $.c(1);
            cb();
            return;
        }
        $.c(2);
        console.log("Obtaining '" + i.name + "'.");
        var modifiers = rulesThatModify(identifier);
        if (modifiers.length > 0) {
            $.c(3);
            evaluateRule(new Queue(modifiers), function() {
                if (v.status() == StatusValue.Known)
                    cb();
                else {
                    console.log("WARNING: Could not determine '" + i.name + "'.");
                    v.setCantKnow();
                    cb();
                }
            });
        }
        else {
            $.c(4);
            promptForValue(v, identifier, q, cb);
        }
    };})($.m("obtain", 5));
    
    /**
     * Executes a single command.
     */
    var executeCommand = (function($) {return function(command, cb) {
        $.c(0);
        switch (command.type) {
            case CommandType.DisplayValue:
                $.c(1);
                var v = vars.get(command.identifier);
                switch (v.type) {
                    case DataType.SingleValue:
                        $.c(2);
                        Display.SingleValue(vars.getIdentifier(command.identifier).name, v.status() != StatusValue.Known ? "UNKNOWN" : v.getValueString(), cb);
                        return;
                    case DataType.YesNo:
                        $.c(3);
                        Display.YesNo(vars.getIdentifier(command.identifier).name, v.status() != StatusValue.Known ? "UNKNOWN" : v.getValueString(), cb);
                        return;
                    case DataType.MultipleValue:
                        $.c(4);
                        if (v.status() != StatusValue.Known)
                            Display.SingleValue(vars.getIdentifier(command.identifier).name, "UNKNOWN", cb);
                        else
                            Display.MultipleValue(vars.getIdentifier(command.identifier).name, v.getValueStrings(), cb);
                        return;
                    case DataType.Real:
                    case DataType.Int:
                        $.c(5);
                        Display.Numeric(vars.getIdentifier(command.identifier).name, v.status() != StatusValue.Known ? "UNKNOWN" : v.getValue(), cb);
                        return;
                    default:
                        $.c(6);
                        throw "Unknown DataType!";
                }
            case CommandType.Message:
                $.c(7);
                Display.Message(command.message, cb);
                return;
            case CommandType.Obtain:
                $.c(8);
                obtain(command.identifier, function() {
                    $.c(9);
                    cb();
                });
                return;
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
            case CommandType.DisplayCalculation:
            case CommandType.DisplayAuthorAttachmentAttribute:
            case CommandType.DisplayAuthorAttachmentPair:
            case CommandType.DisplayAuthorAttachmentValue:
            case CommandType.Next:
            case CommandType.Help:
            case CommandType.Pause:
            case CommandType.Continue:
            case CommandType.Clear:
            case CommandType.Stop:
            case CommandType.Suspend:
            case CommandType.Resume:
            case CommandType.AskFor:
            case CommandType.Assert:
            case CommandType.If:
            case CommandType.Mark:
            case CommandType.DisplayRules:
            case CommandType.DisplayRule:
            case CommandType.DisplayRuleAttachment:
            case CommandType.Justify:
                $.c(10);
                throw "Illegal action.";
        }
    };})($.m("executeCommand", 11));
    
    /**
     * Executes the next action in the queue.
     */
    var doNextAction = (function($) {return function() {
        $.c(0);
        if (actions.isEmpty()) {
            $.c(1);
            stop();
            return;
        }
        $.c(2);
        executeCommand(actions.pop(), doNextAction);
    };})($.m("doNextAction", 3));
    
    /**
     * Stops the expert system.
     */
    var stop = (function($) {return function() {
        $.c(0);
        console.log("Finished.");
        running = false;
        //holder.writeToTextFile();
        Display.Finish();
    };})($.m("stop", 1));
    
    /**
     * Runs the expert system, given the specified knowledge base.
     * @param kb - The knowledge base object (or "hash").
     */
    var run = (function($) {return function(kb) {
        $.c(0);
        if (running) {
            $.c(1);
            throw "System is already running.";
        }
        if (kb) {
            $.c(2);
            // Check validity of the knowledge base.
            checkArray(kb.identifiers);
            checkArray(kb.attributes);
            checkArray(kb.rules);
            checkArray(kb.actions);
            // Set the local variables.
            vars = new VariableList(kb.identifiers);
            for (var i = 0; i < kb.attributes.length; i++) {
                $.c(3);
                var attribute = kb.attributes[i];
                var identifier = kb.identifiers[attribute.identifier];
                vars.add(i, Variable.create(attribute, identifier));
            }
            rules = kb.rules;
            actions = new Queue(kb.actions);
        }
        else if (!(rules && actions)) {
            $.c(4);
            throw "No knowledge base found.";
        }
        $.c(5);
        // Run.
        running = true;
        doNextAction();
    };})($.m("run", 6));
    
    return {
        /**
         * Runs the expert system, parsing a knowledge base from the specified local file.
         * @param id - The id of the input element to load the file from.
         */
        runFile: (function($) {return function(id) {
            $.c(0);
            if (running) {
                $.c(1);
                throw "System is already running.";
            }
            if (typeof window.FileReader !== "function") {
                $.c(2);
                throw "FileReader is not available.";
            }
            var input = document.getElementById(id);
            if (!input) {
                $.c(3);
                throw "Could not find the input element.";
            }
            if (!input.files) {
                $.c(4);
                throw "Input element did not contain a 'files' attribute.";
            }
            var file = input.files[0];
            if (!file) {
                $.c(5);
                throw "Please select a file before clicking 'Load'";
            }
            var fr = new FileReader();
            fr.onload = function(e) {
                $.c(6);
                run(JSON.parse(e.target.result));
            };
            $.c(7);
            fr.readAsText(file);
            $.c(8);
        };})($.m("runFile", 9)),
        
        /**
         * Run the inference engine from the pre-loaded ACS system. Requires "acs.js" to be loaded before calling this function.
         */
        runLocalFile: (function($) {return function(x) {
            $.c(0);
            if(running) {
                $.c(1);
                throw "System is already running.";
            }
            run(JSON.parse(x));
            holder.display();
            holder.display();
        };})($.m("runLocalFile", 2)),
        
        /**
         * Public wrapper for the private run function.
         */
        run: (function($) {return function(x) {
            $.c(0);
            run(x);
        };})($.m("run (public)", 1))
    };
})(COVERAGE.m("Runner", 1));
