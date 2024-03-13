let employees = [];
let recordToEdit = {};

function fetchEmployees() {
    $.ajax({
        method: "GET",
        url: "https://mlsa-learning.azurewebsites.net/api/getAllEmployees",
        success: function (response) {
            let storiesContainer = $(".stories-container");
            employees = response.data;

            storiesContainer.empty();

            response.data.forEach(function (employee) {
                storiesContainer.append(`
            <div class="story">
                <div>
                    <h1>${employee.name}</h1>
                    <p>Age: ${employee.age}</p>
                    <p>ID: ${employee.employee_id}</p>
                </div>
                <div>
                    <button data-id="${employee.employee_id}" class="btn" id="edit">Edit</button>
                    <button data-id="${employee.employee_id}" class="btn danger-btn" id="delete">Delete</button>
                </div>
            </div>
                `);
            });
        },
        error: function () {
            alert("Could not fetch Employees records");
        },
    });
}

function handleSubmit(event) {
    event.preventDefault();

    const name = $("input[name='name']");
    const age = $("input[name='age']");

    $.ajax({
        method: "POST",
        url: "https://mlsa-learning.azurewebsites.net/api/addEmployee",
        data: JSON.stringify({ name: name.val(), age: age.val() }),
        contentType: "application/json",
        success: function (response) {
            if (response.message) {
                name.val("");
                age.val("");
            }
        },
        error: function () {
            alert("Could not insert new employee record");
        },
    });
}

function handleDelete(event) {
    event.preventDefault();

    const id = $(this).attr("data-id");

    $.ajax({
        method: "DELETE",
        url: `https://mlsa-learning.azurewebsites.net/api/deleteEmployee?id=${id}`,
        success: function () {
            fetchEmployees();
        },
        error: function () {
            alert("Could not delete employee record");
        },
    });
}

function handleEdit(event) {
    event.preventDefault();

    $(".insertions").removeClass("show");
    $(".updations").addClass("show");

    const name = $("input[name='name']");
    const age = $("input[name='age']");
    const employeeId = $(this).attr("data-id");

    recordToEdit = employees.find(
        (employee) => employee.employee_id === +employeeId
    );

    name.val(recordToEdit.name);
    age.val(recordToEdit.age);
}

function handleCancelChanges(event) {
    event.preventDefault();

    const name = $("input[name='name']");
    const age = $("input[name='age']");

    name.val("");
    age.val("");

    $(".insertions").addClass("show");
    $(".updations").removeClass("show");
}

function handleEditSubmission(event) {
    event.preventDefault();

    const name = $("input[name='name']");
    const age = $("input[name='age']");

    $.ajax({
        method: "PATCH",
        url: "https://mlsa-learning.azurewebsites.net/api/editEmployee",
        data: JSON.stringify({
            name: name.val(),
            age: age.val(),
            employee_id: recordToEdit.employee_id,
        }),
        contentType: "application/json",
        success: function (response) {
            name.val("");
            age.val("");

            $(".insertions").addClass("show");
            $(".updations").removeClass("show");

            fetchEmployees();
        },
        error: function () {
            alert("Could not update record!");
        },
    });
}

$(document).ready(function () {
    fetchEmployees();

    $("form").on("submit", handleSubmit);
    $("#cancel-changes").on("click", handleCancelChanges);
    $("#edit-submission").on("click", handleEditSubmission);
    $(document).on("click", "#delete", handleDelete);
    $(document).on("click", "#edit", handleEdit);
});
