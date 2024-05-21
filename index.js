import express from "express";

const host = '0.0.0.0'; 
const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("formulario");
});

app.post("/cadastrar-voluntario", (req, res) => {
  const { name, birthday, address, phone, about } = req.body;

  let invalidValues = "";

  if (!name) {
    invalidValues += "name,";
  }
  if (!birthday) {
    invalidValues += "birthday,";
  }
  if (!address) {
    invalidValues += "address,";
  }
  if (!phone) {
    invalidValues += "phone,";
  }
  if (!about) {
    invalidValues += "about,";
  }

  if (invalidValues !== "") {
    res.send({ ok: false, invalidValues });
  }

  res.send({ ok: true, message: "Voluntario cadastrado com sucesso!" });
});

app.listen(port, host, () => {
  console.log(`Server rodando em http://${host}:${port}`);
});

export default app;
