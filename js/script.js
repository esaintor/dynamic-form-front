// var jsonobject = [];
// var jsonform = [];
// var jsonfields = [];
var onclickclose = function(e) {
    console.log(e);
    $(e.currentTarget.parentElement).remove();
    console.log("double click");
};
var onclickedit = function(e) {
    console.log(e);
    var labelText = prompt("Please enter label name:", );
    if (labelText == null || labelText == "") {
        alert("it is empty");
    } else {
        $(e.currentTarget.parentElement.children[2]).text(labelText);
    }
    console.log("double click");
};
var draggableObject = { revert: "valid" };
var droppableObject = {
    classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
    },
    drop: function(event, ui) {
        if (ui.draggable.context.className.includes("item-draggable")) {
            console.log(event);
            var target = event.target.children[1];
            var item;
            var div = document.createElement("div");
            $(div).addClass("ui-sortable-handle field-draggable ui-widget-content addcontrol");
            // if it is dropdown
            if (ui.draggable.context.children[0].localName == "select") {
                item = document.createElement("select");
                $(item).addClass("form-control");
                $(div).append(item);
            }
            // if it is text
            if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "text") {
                item = document.createElement("input");
                $(item).addClass("form-control");
                $(item).attr("type", "text");
                $(div).append(item);
                // add label
                var label = document.createElement("label");
                $(label).text("label");
                $(div).append(label);
            }
            // if it is email
            if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "email") {
                item = document.createElement("input");
                $(item).addClass("form-control");
                $(item).attr("type", "email");
                $(div).append(item);
                // add label
                var label = document.createElement("label");
                $(label).text("label");
                $(div).append(label);
            }
            // if it is password
            if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "password") {
                item = document.createElement("input");
                $(item).addClass("form-control");
                $(item).attr("type", "password");
                $(div).append(item);
                // add label
                var label = document.createElement("label");
                $(label).text("label");
                $(div).append(label);
            }
            if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "submit") {
                item = document.createElement("input");
                $(item).addClass("btn btn-primary");
                $(item).attr("type", "submit");
                $(item).attr("value", "submit");
                $(div).append(item);
            }
            if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "button") {
                item = document.createElement("input");
                $(item).addClass("btn");
                $(item).attr("type", "button");
                $(item).attr("value", "cancel");
                $(div).append(item);
            }
            // add close button
            var close = document.createElement("span");
            $(close).addClass("close");
            $(close).click(onclickclose);
            $(div).append(close);
            // add edit button
            var edit = document.createElement("span");
            $(edit).addClass("edit");
            $(edit).click(onclickedit);
            $(div).append(edit);

            // add field
            $(div).append(item);
            $(target).sortable();
            $(target).disableSelection();
            $(target).append($(div));
        }

    }
};

$(document).ready(function() {

    $("#clear").click(function() {
        $(".form-ui").remove();
    });

    $("#save").click(function() {
        var forms = [];
        //console.log($(".form-ui"));
        $(".form-ui").each(function(index, formElement) {
            //console.log($(formElement))
            var label = $(formElement).context.children[0].innerText;
            var fields = [];

            $($(formElement).context.children[1].children).each(function(index, fieldElement) {
                //console.log($(fieldElement));
                var label = $(fieldElement).context.children[2].innerText;
                var type = $(fieldElement).context.children[3].type;
                var field = { id: index, label: label, type: type };
                fields.push(field);
            });
            var form = { id: index, label: label, fields: fields };
            forms.push(form);
        });
        console.log(JSON.stringify(forms));
    });

    $(function() {
        $(".sortable").sortable();
        $(".sortable").disableSelection();
    });

    $(function() {
        $(".form-draggable").draggable(draggableObject);
        $(".form-droppable").droppable({
            classes: {
                "ui-droppable-active": "ui-state-active",
                "ui-droppable-hover": "ui-state-hover"
            },
            drop: function(event, ui) {
                if (ui.draggable.context.className.includes("form-draggable")) {

                    var main = $(".main-form")[0].children[1];
                    // build json
                    // jsonform = { id: "form" + (main.children.length + 1) };
                    // jsonobject.push(jsonform);
                    var target = event.target.children[1];
                    var div = document.createElement("form");
                    $(div).addClass("form-ui ui-sortable-handle");
                    $(div).attr("id", "form" + (main.children.length + 1));
                    // add title 
                    var h5 = document.createElement("h5");
                    $(h5).text("form " + (main.children.length + 1));
                    $(div).append($(h5));
                    // add sortable div
                    var ul = document.createElement("div");
                    $(ul).addClass(".sortable");
                    $(ul).sortable();
                    $(ul).disableSelection();
                    $(div).append($(ul));
                    $(div).droppable(droppableObject);
                    $(main).append($(div));
                } else {
                    alert("put form object into this field!");
                }
            }
        });
    });

    $(function() {
        $(".item-draggable").draggable(draggableObject);

        $(".form-ui").droppable(droppableObject);
    });


});