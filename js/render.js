$(document).ready(function() {

    // rowTypeId --- 0 = input text, 1 = text area, 2 = date, 3 dropdown
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

    function getId(type) {
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
        //console.log(JSON.stringify(datas))
        renderForm();
    };
    var onclickedit = function(e) {
        console.log(e);
    };
    var onclickclosefield = function(e) {
        datas.forEach(function(data, dindex) {
            data.rows.forEach(function(row, rindex) {
                console.log(row.elementId);
                console.log($(e.target.parentElement).context.lastChild.id);
                if (row.elementId == ($(e.target.parentElement).context.lastChild.id))
                    (datas[dindex].rows).splice(rindex, 1);
                //console.log(datas[dindex].rows[rindex]);
            });
        });
        //console.log(JSON.stringify(datas));
        renderForm(0);
    };
    var onclickeditfield = function(e) {
        console.log(e);
    };
    $("#clear").click(function() {
        datas = [];
        renderForm();
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
                if (ui.draggable.context.className.includes("form-draggable")) {
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
            if (ui.draggable.context.className.includes("item-draggable")) {
                var targetName = event.target.firstChild.innerText;
                var elementId;
                datas.forEach(function(data) {
                    elementId = "field" + data.rows.length;
                });
                // it it is select
                if (ui.draggable.context.children[0].localName == "select")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("dropdown") };
                // if it is text
                if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "text")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("text") };
                // if it is text
                if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "date")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("date") };
                // if it is textarea
                if (ui.draggable.context.children[0].localName == "textarea")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("textarea") };

                datas.forEach(function(object) {
                    if (object.tableName == targetName)
                        object.rows.push(field)
                });
                renderForm();
            }

        }
    };


    function renderForm() {
        var target = $("#form-list");
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
                $(label).text("label");
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


                $(fieldObject).append($(field));
                $(form).sortable();
                $(form).disableSelection();
                $(form).append(fieldObject);

            });

            $(target).append($(form));

        });
    }

    function renderField(form, data) {
        data.rows.forEach(function(row) {
            var fieldObject = document.createElement("div");
            $(fieldObject).addClass("ui-sortable-handle field-draggable ui-widget-content addcontrol");
            // add label as first child
            var label = document.createElement("label");
            $(label).text("label");
            $(fieldObject).append(label);
            var field;
            switch (row.rowTypeId) {
                case 0:
                    field = document.createElement("input");
                    $(field).addClass("form-control");
                    $(field).attr("type", "text");
                    $(field).attr("id", row.elementId);
                    $(form).append(field);
                    break;
                case 1:
                    field = document.createElement("textarea");
                    $(field).addClass("form-control");
                    $(field).attr("id", row.elementId);
                    $(form).append(field);
                    break;
                case 2:
                    field = document.createElement("input");
                    $(field).addClass("form-control");
                    $(field).attr("type", "date");
                    $(field).attr("id", row.elementId);
                    $(form).append(field);
                    break;
                case 3:
                    field = document.createElement("select");
                    $(field).addClass("form-control");
                    $(field).attr("id", row.elementId);
                    $(form).append(field);
                    break;
            }
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


            $(fieldObject).append($(field));
            $(form).sortable();
            $(form).disableSelection();
            $(form).append(fieldObject);

        });
        return $(form);
    }
});