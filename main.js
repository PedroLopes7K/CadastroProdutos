let Prodt = document.querySelector('#Produto')
let Prc = document.querySelector('#Preco')
let Qnt = document.querySelector('#Qnt')

let dados = JSON.parse(localStorage.getItem('NameProduct')) || []

const AtualizarLocalStorage = () => {
  localStorage.setItem('NameProduct', JSON.stringify(dados))
}

// dados.forEach(item => {
//   AddTable(item)
// })
// for (let i = 0; i < dados.length; i++) {
//   console.log(dados[i].Produto)
// }
for (let i = 0; i < dados.length; i++) {
  AddTable(dados[i])
}

const Button = document.querySelector('Button.Add')
Button.addEventListener('click', () => {
  verify()
})

function verify() {
  if (Prodt.value == '' || Prc.value == '' || Qnt.value == '') {
    alert('INSIRA TODOS OS DADOS!')
    return
  }

  let Product = Prodt.value.toUpperCase()
  for (let i = 0; i < dados.length; i++) {
    if (Product == dados[i].Produto) {
      alert('Produto já Cadastrado!')
      return
    }
  }

  let DadosProduto = {
    Produto: Prodt.value.toUpperCase(),
    preco: Prc.value,
    amount: Qnt.value,
    id: parseInt(Math.random() * 3500)
  }
  dados.push(DadosProduto)
  AtualizarLocalStorage()

  AddTable(DadosProduto)
}

function AddTable(Dados) {
  const Tbody = document.querySelector('#body')
  const Tr = document.createElement('tr')

  const td1 = document.createElement('td')
  td1.innerHTML = Dados.Produto

  const td2 = document.createElement('td')
  td2.innerHTML = `R$ ${Number(Dados.preco).toFixed(2).replace('.', ',')}`

  const td3 = document.createElement('td')
  td3.innerHTML = `${Dados.amount} UN`

  const Btn = document.createElement('button')
  Btn.innerHTML = 'DELETE'
  Btn.style.background = 'red'

  const td4 = document.createElement('td')
  td4.classList.add('TD4')
  td4.appendChild(Btn)
  Btn.addEventListener('click', event => {
    event.target.parentElement.remove()
    td1.remove()
    td2.remove()
    td3.remove()
    DeleteProduct(Dados.id)
  })
  Tr.appendChild(td1)
  Tr.appendChild(td2)
  Tr.appendChild(td3)
  Tr.appendChild(td4)

  Tbody.appendChild(Tr)

  Prodt.value = ''
  Prc.value = ''
  Qnt.value = ''
}

function DeleteProduct(id) {
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].id == id) {
      dados.splice(i, 1)
    }
  }


  AtualizarLocalStorage()
}
