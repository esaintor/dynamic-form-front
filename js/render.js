$(document).ready(function() {


    var raw = {
        "responseResultType": "SUCCESS",
        "message": null,
        "recordsTotal": 4,
        "recordsFiltered": null,
        "data": [{
                "id": 0,
                "type": "text"
            },
            {
                "id": 1,
                "type": "textarea"
            },
            {
                "id": 2,
                "type": "date"
            },
            {
                "id": 3,
                "type": "dropdown"
            }
        ]
    };
    var datas = [];

    function getId(tag, type) {
        if (tag == "input" && type == "text")
            type = "text";
        // if it is text
        if (tag == "input" && type == "date")
            type = "date";
        //it it is select
        if (tag == "select")
            type = "dropdown";
        // if it is textarea
        if (tag == "textarea")
            type = "textarea";
        var id;
        raw.data.forEach(function(one) {
            if (one.type == type) {
                id = one.id;
            }
        })
        return id;
    }

    var onclickclose = function(e) {
        datas.forEach(function(deleteObject, index) {
            if (deleteObject.elementId == $(e.target.parentElement).context.id)
                datas.splice(index, 1);
        });
        renderForm();
    };

    var onclickclosefield = function(e) {
        datas.forEach(function(data, dindex) {
            data.rows.forEach(function(row, rindex) {
                console.log(row.elementId);
                console.log($(e.target.parentElement).context.lastChild.id);
                if (row.elementId == ($(e.target.parentElement).context.lastChild.id))
                    (datas[dindex].rows).splice(rindex, 1);
            });
        });
        renderForm();
    };

    var onclickedit = function(e) {
        console.log($(e.target.parentElement).find("h4").get(0).innerText);
        $(document).ready(function() {
            $("#formId").val($(e.target.parentElement).get(0).id);
            $("#formName").val($(e.target.parentElement).find("h4").get(0).innerText);
            $("#formDialog").dialog({
                autoOpen: true,
                modal: true,
                title: 'Form dialog',
                buttons: {
                    'Save': function() {
                        datas.forEach(function(data, index) {
                            if (data.elementId == $("#formId").val())
                                datas[index].tableName = $("#formName").val();
                        });
                        $("#formDialog").dialog("close");
                        renderForm();
                    }
                }
            });
        });
    };
    var onclickeditfield = function(e) {
        console.log($(e.target.parentElement.firstChild).prop("innerText"));
        console.log($(e.target.parentElement.lastChild).prop("localName"));
        var tag = $(e.target.parentElement.lastChild).prop("localName");
        var type = $(e.target.parentElement.lastChild).prop("type")
        $(document).ready(function() {
            type = getId(tag, type);

            switch (type) {
                case 0:
                    var formId = $(e.currentTarget.parentElement.parentElement).get(0).id;
                    var fieldId = $(e.target.parentElement.parentElement.parentElement).find("input").get(0).id;
                    var fieldValue = $(e.target.parentElement).find("label").get(0).innerText;
                    $("#textId").val(fieldId);
                    $("#textName").val(fieldValue);
                    $("#textDialog").dialog({
                        autoOpen: true,
                        modal: true,
                        title: 'Text dialog',
                        buttons: [{
                            text: "Save",
                            "class": "btn btn-primary",
                            click: function() {
                                datas.forEach(function(data, dindex) {
                                    if (data.elementId == formId) {
                                        data.rows.forEach(function(row, rindex) {
                                            if (row.elementId == $("#textId").val()) {
                                                row.rowName = $("#textName").val();
                                                datas[dindex].rows[rindex] = row;
                                            }

                                        });
                                    }
                                });
                                renderForm();
                                $("#textDialog").dialog("close");

                            }
                        }]
                    });
                    break;
                case 1:
                    var formId = $(e.currentTarget.parentElement.parentElement).get(0).id;
                    var fieldId = $(e.target.parentElement.parentElement.parentElement).find("textarea").get(0).id;
                    var fieldValue = $(e.target.parentElement).find("label").get(0).innerText;
                    $("#textareaId").val(fieldId);
                    $("#textareaName").val(fieldValue);
                    $("#textareaDialog").dialog({
                        autoOpen: true,
                        modal: true,
                        title: 'Textarea dialog',
                        buttons: [{
                            text: "Save",
                            "class": "btn btn-primary",
                            click: function() {
                                datas.forEach(function(data, dindex) {
                                    if (data.elementId == formId) {
                                        data.rows.forEach(function(row, rindex) {
                                            if (row.elementId == $("#textareaId").val()) {
                                                row.rowName = $("#textareaName").val();
                                                datas[dindex].rows[rindex] = row;
                                            }

                                        });
                                    }
                                });
                                renderForm();
                                $("#textareaDialog").dialog("close");

                            }
                        }]
                    });
                    break;
                case 2:
                    var formId = $(e.currentTarget.parentElement.parentElement).get(0).id;
                    var fieldId = $(e.target.parentElement.parentElement.parentElement).find("input").get(0).id;
                    var fieldValue = $(e.target.parentElement).find("label").get(0).innerText;
                    $("#dateId").val(fieldId);
                    $("#dateName").val(fieldId);
                    $("#dateDialog").dialog({
                        autoOpen: true,
                        modal: true,
                        title: 'Date dialog',
                        buttons: [{
                            text: "Save",
                            "class": "btn btn-primary",
                            click: function() {
                                datas.forEach(function(data, dindex) {
                                    if (data.elementId == formId) {
                                        data.rows.forEach(function(row, rindex) {
                                            if (row.elementId == $("#dateId").val()) {
                                                row.rowName = $("#dateName").val();
                                                datas[dindex].rows[rindex] = row;
                                            }

                                        });
                                    }
                                });
                                renderForm();
                                $("#dateDialog").dialog("close");

                            }
                        }]
                    });
                    break;
                case 3:
                    console.log($(e.currentTarget.parentElement).find("select").get(0).id);
                    var formId = $(e.currentTarget.parentElement.parentElement).get(0).id;
                    var fieldId = $(e.currentTarget.parentElement).find("select").get(0).id;
                    var fieldValue = $(e.currentTarget.parentElement).find("label").get(0).innerText;
                    console.log(fieldId);
                    datas.forEach(function(data, dindex) {
                        if (data.elementId == formId) {
                            data.rows.forEach(function(row, rindex) {
                                if (row.elementId == fieldId) {
                                    $("#option-list").children().remove();
                                    row.items.forEach(function(item, index) {

                                        var fieldObject = document.createElement("div");
                                        $(fieldObject).addClass("ui-sortable-handle field-draggable ui-widget-content addcontrol");
                                        // add label as first child
                                        var label = document.createElement("label");
                                        $(label).text("option " + index);
                                        $(fieldObject).append(label);
                                        // add input
                                        var value = document.createElement("input");
                                        $(value).addClass("form-control");
                                        $(value).val(item.value)
                                        $(fieldObject).append(value);
                                        $("#option-list").append($(fieldObject));
                                    });
                                }
                            });
                        }
                    });
                    $("#dropdownId").val(fieldId);
                    $("#dropdownName").val(fieldValue);
                    $("#dropdownDialog").dialog({
                        autoOpen: true,
                        modal: true,
                        title: 'Dropdown dialog',
                        buttons: [{
                            text: "Add option",
                            "class": "btn",
                            click: function() {
                                console.log("add");
                                var fieldObject = document.createElement("div");
                                $(fieldObject).addClass("ui-sortable-handle field-draggable ui-widget-content addcontrol");
                                // add label as first child
                                var label = document.createElement("label");
                                $(label).text("option");
                                $(fieldObject).append(label);
                                // add input
                                var value = document.createElement("input");
                                $(value).addClass("form-control");
                                $(fieldObject).append(value);
                                $("#option-list").append($(fieldObject));

                                datas.forEach(function(data, dindex) {
                                    if (data.elementId == formId) {
                                        data.rows.forEach(function(row, rindex) {
                                            if (row.elementId == fieldId) {
                                                row.items.push({ id: row.items.length, value: "option" });
                                                datas[dindex].rows[rindex] = row;
                                            }
                                        });
                                    }
                                });
                            }
                        }, {
                            text: "Save",
                            "class": "btn btn-primary",
                            click: function() {

                                // console.log($(options).find("input").val());
                                datas.forEach(function(data, dindex) {
                                    if (data.elementId == formId) {
                                        data.rows.forEach(function(row, rindex) {
                                            if (row.elementId == $("#dropdownId").val()) {
                                                row.rowName = $("#dropdownName").val();
                                                row.items.forEach(function(item, index) {
                                                    var option = $("#option-list").children().get(index);
                                                    row.items[index] = { id: index, value: $(option).find("input").val() };
                                                });
                                                datas[dindex].rows[rindex] = row;

                                            }
                                        });
                                    }
                                });
                                renderForm();
                                $("#dropdownDialog").dialog("close");

                            }
                        }]

                    });
                    break;
            }

        });
    };
    $("#clear").click(function() {
        datas = [];
        renderForm();
        var target = $("#form-list");
        $(target).addClass("empty");
    });

    $("#save").click(function() {
        console.log(JSON.stringify(datas));
    });

    $(function() {
        $(".item-draggable").draggable(draggableObject);

        $(".form-ui").droppable(droppableObject);
        $(".sortable").sortable();
        $(".sortable").disableSelection();

        $(".form-draggable").draggable(draggableObject);
        $(".form-droppable").droppable({
            classes: {
                "ui-droppable-active": "ui-state-active",
                "ui-droppable-hover": "ui-state-hover"
            },
            drop: function(event, ui) {
                console.log($(ui.draggable).hasClass("form-draggable"));
                if ($(ui.draggable).hasClass("form-draggable")) {
                    var form;
                    var rows = [];
                    form = { tableName: "form", elementId: ("form" + datas.length), rows };
                    datas.push(form);
                    //console.log(JSON.stringify(datas));
                    renderForm();
                } else {
                    alert("put form object into this field!");
                }
            }
        });
    });

    var draggableObject = { revert: "valid" };
    var droppableObject = {
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        },
        drop: function(event, ui) {
            console.log(event.target.id);
            var field;
            if ($(ui.draggable).hasClass("item-draggable")) {
                var targetName = event.target.firstChild.innerText;
                var elementId;
                datas.forEach(function(data) {
                    elementId = "field" + data.rows.length;
                });
                console.log($(ui.draggable).children().get());
                var item = $(ui.draggable).children().get();
                switch (getId($(item).prop("localName"), $(item).prop("type"))) {
                    case 0:
                        field = { rowName: "label", elementId: elementId, rowTypeId: 0 };
                        break;
                    case 1:
                        field = { rowName: "label", elementId: elementId, rowTypeId: 1 };
                        break;
                    case 2:
                        field = { rowName: "label", elementId: elementId, rowTypeId: 2 };
                        break;
                    case 3:
                        field = { rowName: "label", elementId: elementId, rowTypeId: 3, items: [] };
                        break;
                }

                datas.forEach(function(object) {
                    if (object.elementId == event.target.id)
                        object.rows.push(field)
                });
                renderForm();
            }

        }
    };


    function renderForm() {
        var target = $("#form-list");
        $(target).removeClass("empty");
        $(target[0].children).remove();

        datas.forEach(function(data) {
            var target = $("#form-list");
            var form = document.createElement("form");
            $(form).addClass("form-ui ui-sortable-handle");
            $(form).attr("id", data.elementId);
            // add title 
            var h4 = document.createElement("h4");
            $(h4).text(data.tableName);
            $(form).append($(h4));
            // add close button
            var close = document.createElement("span");
            $(close).addClass("closable-form");
            $(close).text("close")
            $(close).click(onclickclose);
            $(form).append(close);
            // add edit button
            var edit = document.createElement("span");
            $(edit).addClass("editable-form");
            $(edit).text("edit")
            $(edit).click(onclickedit);
            $(form).append(edit);
            var ul = document.createElement("div");

            $(ul).addClass(".sortable");
            $(ul).sortable();
            $(ul).disableSelection();
            $(form).append($(ul));
            $(form).droppable(droppableObject);

            data.rows.forEach(function(row) {
                var fieldObject = document.createElement("div");
                $(fieldObject).addClass("ui-sortable-handle field-draggable ui-widget-content addcontrol");
                // add label as first child
                var label = document.createElement("label");
                $(label).text(row.rowName);
                $(fieldObject).append(label);
                var field;
                switch (row.rowTypeId) {
                    case 0:
                        field = document.createElement("input");
                        $(field).addClass("form-control");
                        $(field).attr("type", "text");
                        $(field).attr("id", row.elementId);
                        break;
                    case 1:
                        field = document.createElement("textarea");
                        $(field).addClass("form-control");
                        $(field).attr("id", row.elementId);
                        break;
                    case 2:
                        field = document.createElement("input");
                        $(field).addClass("form-control");
                        $(field).attr("type", "date");
                        $(field).attr("id", row.elementId);
                        break;
                    case 3:
                        field = document.createElement("select");
                        $(field).addClass("form-control");
                        $(field).attr("id", row.elementId);
                        row.items.forEach(function(item, index) {
                            var option = document.createElement("option");
                            $(option).text(item.value);
                            $(option).attr("value", item.value);
                            $(field).append(option);
                        })
                        break;
                }
                $(form).append($(field));
                // add close button
                var close = document.createElement("span");
                $(close).addClass("closable");
                $(close).text("close")
                $(close).click(onclickclosefield);
                $(fieldObject).append($(close));
                // add edit button
                var edit = document.createElement("span");
                $(edit).addClass("editable");
                $(edit).text("edit")
                $(edit).click(onclickeditfield);
                $(fieldObject).append($(edit));
                // add field to form
                $(fieldObject).append($(field));
                $(form).sortable();
                $(form).disableSelection();
                $(form).append(fieldObject);

            });

            $(target).append($(form));

        });
    }

});