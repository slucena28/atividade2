const cepInput = document.getElementById("cep");
const form = document.getElementById("formCadastro");

// Buscar endereço pelo CEP
cepInput.addEventListener("blur", () => {
  let cep = cepInput.value.replace(/\D/g, "");

  if (cep.length !== 8) return;

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      document.getElementById("rua").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf;

      salvarDados();
    })
    .catch(() => alert("Erro ao buscar CEP"));
});

// Salvar dados no LocalStorage
function salvarDados() {
  const dados = {
    nome: document.getElementById("nome").value,
    cep: document.getElementById("cep").value,
    rua: document.getElementById("rua").value,
    bairro: document.getElementById("bairro").value,
    cidade: document.getElementById("cidade").value,
    estado: document.getElementById("estado").value
  };

  localStorage.setItem("cadastro", JSON.stringify(dados));
}

// Restaurar dados ao carregar página
function carregarDados() {
  const dados = JSON.parse(localStorage.getItem("cadastro"));

  if (dados) {
    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("cep").value = dados.cep || "";
    document.getElementById("rua").value = dados.rua || "";
    document.getElementById("bairro").value = dados.bairro || "";
    document.getElementById("cidade").value = dados.cidade || "";
    document.getElementById("estado").value = dados.estado || "";
  }
}

// Salvar ao enviar formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();
  salvarDados();
  alert("Dados salvos com sucesso!");
});

// Salvar automaticamente ao digitar
form.addEventListener("input", salvarDados);

// Carregar dados ao abrir página
window.onload = carregarDados;
