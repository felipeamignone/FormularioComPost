document.addEventListener("DOMContentLoaded", function () {
  $("#inputBirthday").attr("max", getTodayDateString());

  function getTodayDateString() {
    return new Date().toLocaleString("pt-BR").split(",")[0];
  }

  $("#submit-form").on("click", function () {
    $(".text-danger").text("");
    const name = $("#inputName").val();
    const birthday = $("#inputBirthday").val();
    const address = $("#inputAddress").val();
    const phone = $("#inputPhone").val();
    const about = $("#inputAbout").val();

    const payload = { name, birthday, address, phone, about };
    fetch("/cadastrar-voluntario", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((r) => {
        r.ok && window.location.reload();

        if (r.invalidValues) {
          const invalids = r.invalidValues.split(",");

          invalids.forEach((field) => {
            if (field !== "") {
              const errorFieldName = field + "Error";

              $(`#${errorFieldName}`).text("Campo Obrigatório");
            }
          });
        }
      });
  });
});
