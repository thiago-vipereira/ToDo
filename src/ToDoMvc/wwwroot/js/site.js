// Write your JavaScript code.
$(document).ready(function () {
    $('#add-item-button').on('click', addItem());
    $('.done-checkbox').on('click', markDone);
});

function addItem() {
    //$('#add-item-error').hide();
    var $newTitle = $('#add-item-title').val();
    var $newDueAt = $('#add-item-due-at').val();

    return function () {  //TERMINAR
        postError.hide();
        $.post(
            '/ToDo/AddItem', {
                title: $newTitle.val(),
                dueAt: $newDueAt.val()
            },
            () => window.location = '/ToDo'
        ).fail(postError.onError);
    };
}

var postError = (
    function () {
        var $itemError = $('# add-item-error');
        function erroOnPost(data) {
            var error = data.statusText;
            if (data.responseJSON) {
                var key = Object.keys(data.responseJSON)[0];
                error = data.responseJSON[key];
            }
            $itemError.text(error).show();
        }

        return {
            hide: () => $itemError.hide(),
            onError: erroOnPost
        }
    }
)();

function markDone(evt) {
    evt.target.disable = true;

    postError.hide();
    $.post('/toDo/MarkDone',
        { id: evt.target.name },
        function () {
            var row = evt.target.parentElement.parentElement;
            row.classList.add('done');
        }
    ).fail(postError.onError);
}