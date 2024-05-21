document.addEventListener("DOMContentLoaded", function () {
  $("#inputBirthday").attr("max", getTodayDateString());

  const nameInput = $("#inputName");
  const birthdayInput = $("#inputBirthday");
  const addressInput = $("#inputAddress");
  const phoneInput = $("#inputPhone");
  const aboutInput = $("#inputAbout");

  function getTodayDateString() {
    return new Date().toLocaleString("pt-BR").split(",")[0];
  }

  function clearForm() {
    nameInput.val("");
    birthdayInput.val("");
    addressInput.val("");
    phoneInput.val("");
    aboutInput.val("");
  }

  $("#submit-form").on("click", function () {
    $(".text-danger").text("");
    const name = nameInput.val();
    const birthday = birthdayInput.val();
    const address = addressInput.val();
    const phone = phoneInput.val();
    const about = aboutInput.val();

    const payload = { name, birthday, address, phone, about };
    fetch("/cadastrar-voluntario", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.invalidValues) {
          const invalids = r.invalidValues.split(",");

          invalids.forEach((field) => {
            if (field !== "") {
              const errorFieldName = field + "Error";

              $(`#${errorFieldName}`).text("Campo Obrigatório");
            }
          });
        }

        if (r.ok) {
          alert(r.message);
          clearForm();
        }
      });
  });
});
