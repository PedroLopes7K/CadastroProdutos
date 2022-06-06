let Prodt = document.querySelector('#Produto')
let Prc = document.querySelector('#Preco')
let Qnt = document.querySelector('#Qnt')
let vazio = document.querySelector('.vazio')

let dados = JSON.parse(localStorage.getItem('NameProduct')) || []

function verifyEmptyData() {
  if (dados.length == 0) {
    vazio.classList.remove('empty')
  } else {
    vazio.classList.add('empty')
  }
}
verifyEmptyData()

const AtualizarLocalStorage = () => {
  localStorage.setItem('NameProduct', JSON.stringify(dados))
}

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
    Preco: Number(Prc.value),
    Quantidade: Qnt.value,
    id: parseInt(Math.random() * 3500)
  }
  dados.push(DadosProduto)
  AtualizarLocalStorage()
  verifyEmptyData()
  AddTable(DadosProduto)
}

function AddTable(Dados) {
  const Tbody = document.querySelector('#body')
  const Tr = document.createElement('tr')

  const td1 = document.createElement('td')
  td1.innerHTML = Dados.Produto

  const td2 = document.createElement('td')
  td2.innerHTML = `R$ ${Number(Dados.Preco).toFixed(2).replace('.', ',')}`

  const td3 = document.createElement('td')
  td3.innerHTML = `${Dados.Quantidade} UN`

  const btnDelete = document.createElement('button')
  btnDelete.innerHTML = 'DELETE'
  btnDelete.style.background = 'red'
  const btnUpdate = document.createElement('button')
  btnUpdate.innerHTML = 'UPDATE'
  btnUpdate.style.background = 'dodgerblue'

  const td4 = document.createElement('td')
  td4.classList.add('TD4')
  td4.appendChild(btnDelete)
  td4.appendChild(btnUpdate)
  btnDelete.addEventListener('click', event => {
    event.target.parentElement.remove()
    td1.remove()
    td2.remove()
    td3.remove()
    deleteProduct(Dados.id)
  })
  btnUpdate.addEventListener('click', event => {
    // let allupdates = document.querySelectorAll('#update')
    // allupdates.removeEventListener('click', updateProduct())
    openModal(Dados.id, Dados.Produto)
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

function deleteProduct(id) {
  for (let i = 0; i < dados.length; i++) {
    if (dados[i].id == id) {
      dados.splice(i, 1)
    }
  }
  AtualizarLocalStorage()
  verifyEmptyData()
}

const modal = document.querySelector('.modal')

function openModal(id, produto) {
  modal.classList.remove('none')
  const title = document.getElementById('productChangeName')
  title.innerHTML = `Atualizar ${produto}`
  const buttonUpdate = document.getElementById('update')
  const buttonClose = document.getElementById('close')
  buttonUpdate.addEventListener('click', event => {
    updateProduct(id)
  })
  buttonClose.addEventListener('click', event => {
    buttonUpdate.removeEventListener('click', updateProduct())
    modal.classList.add('none')
  })
  // buttonClose.addEventListener('click', closeModal(buttonUpdate))
  // verifyClick()
}

function updateProduct(productId) {
  // alert(`Atualizar produto com ID ${productId}`)
  const newName = document.getElementById('product').value
  const newPrice = document.getElementById('price').value
  const newAmount = document.getElementById('amount').value
  // if (newName == '' || newPrice == '' || newAmount == '') {
  //   alert('INSIRA TODOS OS DADOS!')
  //   return
  // }

  for (let i = 0; i < dados.length; i++) {
    if (dados[i].id == productId) {
      dados[i].Produto = newName.toUpperCase()
      dados[i].Preco = newPrice
      dados[i].Quantidade = newAmount
    }
  }
  AtualizarLocalStorage()
  modal.classList.add('none')
  location.reload()
}

// function closeModal(btn) {
//   btn.removeEventListener('click', updateProduct())
//   modal.classList.add('none')
// }

// function verifyClick() {
//   setTimeout(() => {
//     document.addEventListener('click', event => {
//       let isClickModal = modal.contains(event.target)
//       if (!isClickModal) {
//         closeModal(buttonUpdate)
//       }
//     })
//   }, 5000)
// }
