$(document).ready(function() {
    // Model implementation
    var Model = function(model) {
        this.name = model.name;
        this.age = model.age;
        this.year = model.year;
        this.examsTaken = model.examsTaken;
        this.changed = false;
        this.takeExam = model.takeExam;
    };

    // Controller implementation
    var Controller = function(controller) {
        this.model = controller.model;
        this.elementId = controller.elementId;
        this.render = controller.render;

        // Invoking render property
        $(this.elementId).append(this.render());
        // Starting timer with interval 100 ms
        var t = this;
        setInterval(function() { t.modelChangeListener(controller); }, 100);
        // Setting required events from the clickHandlers property
        this.setEvents(controller);
    };

    Controller.prototype.modelChangeListener = function(controller) {
        if(this.model.changed) {
            // Invoking render property
            var element = $(this.elementId);
            element.empty();
            element.append(this.render());
            // Setting required events again
            this.setEvents(controller);
            // Changing the flag
            this.model.changed = false;
        }
    };

    Controller.prototype.setEvents = function(controller) {
        for(var id in controller.clickHandlers) {
            $(id).click(function() {
                controller[controller.clickHandlers[id]]();
            });
        }
    };

    var Student = new Model({
        name: 'Piotr',
        age: 22,
        year: 5,
        examsTaken: 2,
        takeExam: function() {
            this.examsTaken++;
            this.changed = true;
        }
    });

    var StudentController = new Controller({
        model: Student,
        elementId: '#student-container',
        render: function() {
            return '<span>' + this.model.name + " " + this.model.examsTaken + " "
                + '</span><button id="student-exams-button">Increase exams taken</button>';
        },
        clickHandlers: {
            '#student-exams-button': 'updateExams'
        },
        updateExams: function() {
            this.model.takeExam();
        }
    });
});
