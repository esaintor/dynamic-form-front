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
                }
            }
        });
    });
};
var onclickeditfield = function(e) {
    console.log(e);
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