import express from "express";

const port = 3001;
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

  if (!name) {
    res.send({ ok: false, message: "Nome é obrigatório!" });
    return;
  }
  if (!birthday) {
    res.send({ ok: false, message: "Data de nascimento é obrigatório!" });
    return;
  }
  if (!address) {
    res.send({ ok: false, message: "Endereço é obrigatório!" });
    return;
  }
  if (!phone) {
    res.send({ ok: false, message: "Telefone é obrigatório!" });
    return;
  }
  if (!about) {
    res.send({ ok: false, message: "Sobre é obrigatório!" });
    return;
  }

  res.send({ ok: true, message: "Voluntario cadastrado com sucesso!" });
});

app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});

export default app;
