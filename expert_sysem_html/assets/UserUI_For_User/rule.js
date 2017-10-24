// IF antecedents THEN consequents, commands
var Rule = function(/* string */ name,
                    /* Array<Array<Antecedent>> */ antecedents,
                    /* Array<Consequent> */ consequents,
                    /* Array<Command> */ commands) {
    checkString(name);
    checkArray(antecedents);
    for (var i = 0; i < antecedents.length; i++) {
        var sub = antecedents[i];
        checkArray(sub);
        // can't check if each element is an antecedent
    }
    checkArray(consequents);
    // can't check if each element is a consequent
    checkArray(commands);
    // can't check if each element is a command
    this.name = name;
    this.antecedents = antecedents;
    this.consequents = consequents;
    this.commands = commands;
};

var Antecedent = {
    // IF SEX = MALE
    // IF SEX = MALE / OTHER
    SingleValue: function(/* string */ name,
                          /* BooleanRelation */ relation,
                          /* Array<Array<string>> */ values) {
        checkString(name);
        BooleanRelation.check(relation);
        this.identifier = Identifier.verify(name);
        this.relation = relation;
        checkArray(values);
        this.values = [];
        for (var i = 0; i < values.length; i++) {
            var sub = values[i];
            checkArray(sub);
            this.values[i] = [];
            for (var j = 0; j < sub.length; j++)
                this.values[i][j] = Identifier.checkValue(this.identifier, sub[j]);
        }
    },
    // IF OBESITY = TRUE
    YesNo: function(/* string */ name,
                    /* BooleanRelation */ relation,
                    /* boolean */ value) {
        checkString(name);
        BooleanRelation.check(relation);
        checkBoolean(value);
        this.identifier = Identifier.verify(name);
        this.relation = relation;
        this.value = value;
    },
    // IF DIAGNOSIS = DEAD
    // IF DIAGNOSIS = DEAD / NEARLY DEAD
    MultipleValue: function(/* string */ name,
                            /* BooleanRelation */ relation,
                            /* Array<Array<string>> */ values) {
        checkString(name);
        BooleanRelation.check(relation);
        this.identifier = Identifier.verify(name);
        this.relation = relation;
        checkArray(values);
        this.values = [];
        for (var i = 0; i < values.length; i++) {
            var sub = values[i];
            checkArray(sub);
            this.values[i] = [];
            for (var j = 0; j < sub.length; j++)
                this.values[i][j] = Identifier.checkValue(this.identifier, sub[j]);
        }
    },
    // IF AGE LT 40
    Numeric: function(/* string */ name,
                      /* NumericRelation */ relation,
                      /* number */ value) {
        checkString(name);
        NumericRelation.check(relation);
        checkNumber(value);
        this.identifier = Identifier.verify(name);
        this.relation = relation;
        this.value = value;
    },
    // Looks up the status of a variable. Either KNOWN or UNKNOWN.
    // IF STATUS(AGE) = KNOWN
    StatusFunction: function(/* string */ name,
                             /* BooleanRelation */ relation,
                             /* StatusValue */ value) {
        checkString(name);
        BooleanRelation.check(relation);
        StatusValue.check(value);
        this.identifier = Identifier.verify(name);
        this.relation = relation;
        this.value = value;
    },
    // Looks up the number of true values for a MLT variable.
    // IF NUMBER(DIAGNOSIS) = 0
    NumberFunction: function(/* string */ name,
                             /* NumericRelation */ relation,
                             /* integer */ value) {
        checkString(name);
        NumericRelation.check(relation);
        checkInteger(value);
        this.identifier = Identifier.verify(name);
        this.relation = relation;
        this.value = value;
    }
};

var Consequent = {
    // THEN DIAGNOSIS = DEAD
    SingleValue: function(/* string */ name,
                          /* string */ value) {
        checkString(name);
        checkString(value);
        this.identifier = Identifier.verify(name);
        this.value = Identifier.checkValue(this.identifier, value);
    },
    // THEN OBESITY = TRUE
    YesNo: function(/* string */ name,
                    /* boolean */ value) {
        checkString(name);
        checkBoolean(value);
        this.identifier = Identifier.verify(name);
        this.value = value;
    },
    // THEN DIAGNOSIS = DEAD
    // THEN DIAGNOSIS = DEAD & NEARLY DEAD
    MultipleValue: function(/* string */ name,
                            /* Array<string> */ values) {
        checkString(name);
        checkArray(values);
        this.identifier = Identifier.verify(name);
        this.values = [];
        for (var i = 0; i < values.length; i++)
            this.values[i] = Identifier.checkValue(this.identifier, values[i]);
    },
    // THEN MONTHS TO LIVE = 3
    Numeric: function(/* string */ name,
                      /* number */ value) {
        checkString(name);
        checkNumber(value);
        this.identifier = Identifier.verify(name);
        this.value = value;
    }
};

var Command = {
    DisplayActions: function() { throw "Invalid command." },
    DisplayInstruction: function() { throw "Invalid command." },
    DisplayCertification: function() { throw "Invalid command." },
    DisplayReferences: function() { throw "Invalid command." },
    DisplayAttachments: function() { throw "Invalid command." },
    DisplayAttributes: function() { throw "Invalid command." },
    DisplayAttributeName: function() { throw "Invalid command." },
    DisplayInferredAttributes: function() { throw "Invalid command." },
    DisplayInputAttributes: function() { throw "Invalid command." },
    DisplayAttributeList: function() { throw "Invalid command." },
    DisplayInferredAttributesList: function() { throw "Invalid command." },
    DisplayKB: function() { throw "Invalid command." },
    DisplayPair: function() { throw "Invalid command." },
    DisplayValueName: function() { throw "Invalid command." },
    DisplayValues: function() { throw "Invalid command." },
    DisplaySynonyms: function() { throw "Invalid command." },
    DisplayValuesAttribute: function() { throw "Invalid command." },
    DisplayValue: function(/* string */ name) {
        checkString(name);
        this.type = CommandType.DisplayValue;
        this.identifier = Identifier.verify(name);
    },
    DisplayCalculation: function() { throw "Invalid command." },
    DisplayAuthorAttachmentAttribute: function() { throw "Invalid command." },
    DisplayAuthorAttachmentPair: function() { throw "Invalid command." },
    DisplayAuthorAttachmentValue: function() { throw "Invalid command." },
    Obtain: function(/* string */ name) {
        checkString(name);
        this.type = CommandType.Obtain;
        this.identifier = Identifier.verify(name);
    },
    Next: function() { throw "Invalid command." },
    Help: function() { throw "Invalid command." },
    Pause: function() { throw "Invalid command." },
    Continue: function() { throw "Invalid command." },
    Clear: function() { throw "Invalid command." },
    Stop: function() { throw "Invalid command." },
    Suspend: function() { throw "Invalid command." },
    Resume: function() { throw "Invalid command." },
    Message: function(/* string */ message) {
        checkString(message);
        this.type = CommandType.Message;
        this.message = message;
    },
    AskFor: function() { throw "Invalid command." },
    Assert: function() { throw "Invalid command." },
    If: function() { throw "Invalid command." },
    Mark: function() { throw "Invalid command." },
    /* rule-base specific */
    DisplayRules: function() { throw "Invalid command." },
    DisplayRule: function() { throw "Invalid command." },
    DisplayRuleAttachment: function() { throw "Invalid command." },
    Justify: function() { throw "Invalid command." }
};
