$(document).ready(function() {


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

            if ($(ui.draggable).hasClass("item-draggable")) {
                var targetName = event.target.firstChild.innerText;
                var elementId;
                datas.forEach(function(data) {
                    elementId = "field" + data.rows.length;
                });
                console.log($(ui.draggable).children().first());
                var item = $(ui.draggable).children().get(0);
                // if it is text
                if (item.localName == "input" && item.type == "text")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("text") };
                // if it is text
                if (item.localName == "input" && item.type == "date")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("date") };
                //it it is select
                if (item.localName == "select")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("dropdown") };
                // if it is textarea
                if (item.localName == "textarea")
                    field = { rowName: "label", elementId: elementId, rowTypeId: getId("textarea") };

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