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
$(document).ready(function() {

    console.log(raw.data);
});
var datas = [];

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
    var itemId;
    // var labelText = prompt("Please enter label name:", );
    // if (labelText == null || labelText == "") {
    //     alert("it is empty");
    // } else {
    //     $(e.currentTarget.parentElement.children[2]).text(labelText);
    // }
    // console.log("double click");
    //console.log(e.currentTarget.parentElement.children[3].type);
    if (e.currentTarget.parentElement.lastChild.type == "text") {
        $("#textfield").modal();
        itemId = e.currentTarget.parentElement.lastChild.id;
    }
    if (e.currentTarget.parentElement.lastChild.type == "select-one") {
        $("#dropdown").modal();
        itemId = e.currentTarget.parentElement.lastChild.id;
    }
    if (e.currentTarget.parentElement.lastChild.type == "submit" || e.currentTarget.parentElement.lastChild.type == "button") {
        $("#button").modal();
        itemId = e.currentTarget.parentElement.lastChild.id;
    }
    if (e.currentTarget.parentElement.localName == "form") {
        $("#form").modal();
        itemId = e.currentTarget.parentElement.id;
    }
    console.log(itemId);
    // $(".modal-save").click(function(enter) {
    //     //console.log(e.target.parentElement.parentElement.children[1].children[0].value)
    //     var newvalue = enter.target.parentElement.parentElement.children[1].children[0].value;
    //     //console.log($(e.currentTarget.parentElement.firstElementChild))
    //     $(e.target.parentElement.firstChild).text(newvalue);

    // });
};

function getId(type) {
    var id;
    raw.data.forEach(function(one) {
        if (one.type == type) {
            id = one.id;
        }
    })
    return id;
}
var draggableObject = { revert: "valid" };
var droppableObject = {
    classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
    },
    drop: function(event, ui) {
        if (ui.draggable.context.className.includes("item-draggable")) {
            console.log(event);

            var targetName = event.target.firstChild.innerText;
            var target = event.target.lastChild;
            var item, field;
            var div = document.createElement("div");
            $(div).addClass("ui-sortable-handle field-draggable ui-widget-content addcontrol");
            // add label as first child
            var label = document.createElement("label");
            $(label).text("label");
            $(div).append(label);
            // if it is dropdown
            if (ui.draggable.context.children[0].localName == "select") {
                item = document.createElement("select");
                $(item).addClass("form-control");
                $(div).append(item);
                field = { rowName: "label", rowTypeId: getId("dropdown") };

            }
            // if it is text
            if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "text") {
                item = document.createElement("input");
                $(item).addClass("form-control");
                $(item).attr("type", "text");
                $(div).append(item);
                field = { rowName: "label", rowTypeId: getId("text") };

            }
            // if it is text
            if (ui.draggable.context.children[0].localName == "input" && ui.draggable.context.children[0].type == "date") {
                item = document.createElement("input");
                $(item).addClass("form-control");
                $(item).attr("type", "date");
                $(div).append(item);
                field = { rowName: "label", rowTypeId: getId("date") };

            }
            // if it is textarea
            if (ui.draggable.context.children[0].localName == "textarea") {
                item = document.createElement("textarea");
                $(item).addClass("form-control");
                $(div).append(item);
                field = { rowName: "label", rowTypeId: getId("textarea") };

            }
            datas.forEach(function(object) {
                if (object.tableName == targetName)
                    object.rows.push(field)

            });
            console.log(JSON.stringify(datas));
            // add close button
            var close = document.createElement("span");
            $(close).addClass("closable");
            $(close).text("close")
            $(close).click(onclickclose);
            $(div).append(close);
            // add edit button
            var edit = document.createElement("span");
            $(edit).addClass("editable");
            $(edit).text("edit")
            $(edit).click(onclickedit);
            $(div).append(edit);
            // add field as last child
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
        // var datas = [];
        //console.log($(".form-ui"));
        $(".form-ui").each(function(index, formElement) {
            //console.log($(formElement))
            // var label = $(formElement).context.children[0].innerText;
            // var rows = [];

            // $($(formElement).context.lastElementChild.children).each(function(index, fieldElement) {
            //     console.log($(fieldElement));
            //     var label = $(fieldElement).context.firstElementChild.innerText;
            //     var type, row;
            //     var btRowTextInputDto, btRowTextboxDto, btRowDate, btDropdownDto, btDropdownItemDto = [];
            //     var additional;
            //     if ($(fieldElement).context.lastElementChild.type == "text" && $(fieldElement).context.lastElementChild.localName == "input") {
            //         type = "text";
            //         btRowTextInputDto = { textInputName: "" };
            //         row = { rowName: label, rowTypeId: getId(type), btRowTextInputDto };
            //     }

            //     if ($(fieldElement).context.lastElementChild.localName == "select") {
            //         type = "dropdown";
            //         var value = { value: "item1" };
            //         btDropdownItemDto.push(value);
            //         btDropdownDto = { btDropdownItemDto: btDropdownItemDto };
            //         row = { rowName: label, rowTypeId: getId(type), btDropdownDto };
            //     }

            //     if ($(fieldElement).context.lastElementChild.localName == "textarea") {
            //         type = "textarea";
            //         btRowTextboxDto = { value: "" };
            //         row = { rowName: label, rowTypeId: getId(type), btRowTextboxDto };
            //     }

            //     if ($(fieldElement).context.lastElementChild.type == "date" && $(fieldElement).context.lastElementChild.localName == "input") {
            //         type = "date";
            //         btRowDate = { format: "yyyy-mm-dd" };
            //         row = { rowName: label, rowTypeId: getId(type), btRowDate };
            //     }
            //     rows.push(row);
            // });
            // var form = { tableName: label, rows: rows };
            // datas.push(form);
        });
        // console.log(JSON.stringify(datas));
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
                    var form;
                    var rows = [];
                    var main = $(".main-form")[0].children[1];
                    // build json
                    // jsonform = { id: "form" + (main.children.length + 1) };
                    // jsonobject.push(jsonform);
                    var target = event.target.children[1];
                    var div = document.createElement("form");
                    $(div).addClass("form-ui ui-sortable-handle");
                    $(div).attr("id", "form" + (main.children.length + 1));
                    // add title 
                    var h4 = document.createElement("h4");
                    $(h4).text("form " + (main.children.length + 1));
                    $(div).append($(h4));

                    // add close button
                    var close = document.createElement("span");
                    $(close).addClass("closable-form");
                    $(close).text("close")
                    $(close).click(onclickclose);
                    $(div).append(close);
                    // add edit button
                    var edit = document.createElement("span");
                    $(edit).addClass("editable-form");
                    $(edit).text("edit")
                    $(edit).click(onclickedit);
                    $(div).append(edit);

                    // add sortable div
                    var ul = document.createElement("div");

                    $(ul).addClass(".sortable");
                    $(ul).sortable();
                    $(ul).disableSelection();
                    $(div).append($(ul));
                    $(div).droppable(droppableObject);

                    form = { tableName: "form " + (main.children.length + 1), rows };
                    datas.push(form);


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

    function getFormById(name) {

    }
});