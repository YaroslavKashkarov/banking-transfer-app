// @ts-nocheck
const account1 = {
  owner: "Yaroslav Kashkarov",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  pin: 1111,
  movementsDates: [
    /** I wanna create to the ramdom date in the future*/
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2026-07-08T16:33:06.386Z",
    "2026-07-10T14:43:26.374Z",
    "2026-07-13T18:49:59.371Z",
    "2026-07-14T12:01:20.894Z",
  ]
}

const account2 = {
  owner: "Oksana Kashkarova",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  pin: 2222,
  movementsDates: [
    /** I wanna create to the ramdom date in the future*/
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-07-13T18:49:59.371Z",
    "2026-07-14T12:01:20.894Z",
  ]
}

const account3 = {
  owner: "Daniel Kashkarov",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  pin: 3333,
  movementsDates: [
    /** I wanna create to the ramdom date in the future*/
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-07-13T18:49:59.371Z",
    "2026-07-14T12:01:20.894Z",
  ]
}

const account4 = {
  owner: "Nataliia Petrenko",
  movements: [430, 1000, 700, 50, 90],
  pin: 4444,
  movementsDates: [
    /** I wanna create to the ramdom date in the future*/
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-07-13T18:49:59.371Z",
    "2026-07-14T12:01:20.894Z",
  ]
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector(".welcome")
const labelDate = document.querySelector(".date")
const labelBalance = document.querySelector(".balance__value")
const labelSumIn = document.querySelector(".summary__value--in")
const labelSumOut = document.querySelector(".summary__value--out")
const labelSumInterest = document.querySelector(".summary__value--interest")
const labelTimer = document.querySelector(".timer")

const containerApp = document.querySelector(".app")
const containerMovements = document.querySelector(".movements")

const btnLogin = document.querySelector(".login__btn")
const btnTransfer = document.querySelector(".form__btn--transfer")
const btnLoan = document.querySelector(".form__btn--loan")
const btnClose = document.querySelector(".form__btn--close")
const btnSort = document.querySelector(".btn--sort")

const inputLoginUsername = document.querySelector(".login__input--user")
const inputLoginPin = document.querySelector(".login__input--pin")
const inputTransferTo = document.querySelector(".form__input--to")
const inputTransferAmount = document.querySelector(".form__input--amount")
const inputLoanAmount = document.querySelector(".form__input--loan-amount")
const inputCloseUsername = document.querySelector(".form__input--user")
const inputClosePin = document.querySelector(".form__input--pin")


const formatMovmentDate = (date) => {
  const calcDatePassed = (date1, date2) => {
    return Math.round((date1 - date2) / (1000 * 60 * 60 * 24))
  }

  const daysPassed = calcDatePassed(new Date(), date)
  console.log(daysPassed)

  if(daysPassed === 0) {
    return 'Today'
  }
  if(daysPassed === 1) {
    return 'Yesterday'
  }
  if(daysPassed >= 2 && daysPassed <= 4) {
    return `It has been ${daysPassed} day`
  }
  if(daysPassed <= 7) {
    return `It has been ${daysPassed} days`
  }

  const year = date.getFullYear()
  const mouth = `${date.getMonth() + 1}`.padStart(2, 0)
  const day = `${date.getDate()}`.padStart(2, 0)
  const hours = `${date.getHours()}`.padStart(2, 0)
  const minutes = `${date.getMinutes()}`.padStart(2, 0)
  return `${day}/${mouth}/${year} ${hours}:${minutes}`

}

function displayMovements(acc, sort = false) {
  containerMovements.innerHTML = ''

  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements

  movs.map((value, i) => {
    const type = value > 0 ? "deposit" : "withdrawal"
    const typeMassege = value > 0 ? "deposit" : "withdrawal"
    const date = new Date(acc.movementsDates[i])

    const displayDate = formatMovmentDate(date)

    const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} removal
        </div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${value}$</div>
      </div>`
    containerMovements.insertAdjacentHTML('afterbegin', html)
  })
}

function createLogIn(accs) {
  accs.forEach((acc) => {
    acc.logIn = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("")
  })
}
createLogIn(accounts)

function calcPrintBalance(acc) {
  acc.balance = acc.movements.reduce((acc, value) => {
    return acc + value
  })
  labelBalance.textContent = `${acc.balance}$`
}

function calcDisplaySum(movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumIn.textContent = `${incomes}$`

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0)
  labelSumOut.textContent = `${Math.abs(out)}$`
  labelSumInterest.textContent = `${incomes + out}$`
}

// Update the interface website
function updateUi(acc) {
  displayMovements(acc)
  calcPrintBalance(acc)
  calcDisplaySum(acc.movements)
}

// Timeout session (Timeout & Interval)
const startLogOut = () => {
  let time = 600

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0)
    const second = String(Math.trunc(time % 60)).padStart(2, 0)
    labelTimer.textContent = `${min}:${second}`

    if(time == 0) {
      clearInterval(timer)
      containerApp.style.opacity = 0
    }
    time--
  }

  tick()
  const timer = setInterval(tick, 1000)
  return timer
}

// Button entarence to account
let currentAccount
let timer
btnLogin.addEventListener('click', (e) => {
  e.preventDefault()
  console.log('Login')
  currentAccount = accounts.find((acc) => acc.logIn === inputLoginUsername.value)
  console.log(currentAccount)
  if(currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 100
    inputLoginPin.value = inputLoginUsername.value = ''

    /**Update currently date */
    const local = navigator.language
    const options = {
      year: 'numeric',
      mouth: 'numeric',
      day: 'numeric',
      weekDay: 'short',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'long',
      hour12: false
    }

    labelDate.textContent = Intl.DateTimeFormat(local, options).format(new Date)
    console.log('Pin ok!')

    if(timer) {
      clearInterval(timer)
    }

    timer = startLogOut()
    updateUi(currentAccount)
  }
})

btnTransfer.addEventListener('click', (e) => {
  e.preventDefault()
  const receiveAcc = accounts.find((acc) => acc.logIn === inputTransferTo.value)
  const amount = Number(inputTransferAmount.value)
  console.log(amount, receiveAcc)
  if(
    receiveAcc &&
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiveAcc.logIn !== currentAccount.logIn
  ) {
    currentAccount.movements.push(-amount)
    receiveAcc.movements.push(amount)

    // Added date to movments
    currentAccount.movementsDates.push(new Date().toISOString)

    clearInterval(timer)
    timer = startLogOut()
    updateUi(currentAccount)
    inputTransferTo.value = inputTransferAmount.value = ''
  }
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault()
  if(inputCloseUsername.value === currentAccount.logIn && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex((acc) => {
      return acc.logIn === currentAccount.logIn
    })
    console.log(index)
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
    console.log(accounts)
  }
  inputCloseUsername.value = inputClosePin.value = ''
})

// Addded money to account
btnLoan.addEventListener('click', (e) => {
  e.preventDefault()
  const amount = Number(inputLoanAmount.value)
  if(amount > 0) {
    currentAccount.movements.push(amount)

    // Added date to array movmentsDates
    currentAccount.movementsDates.push(new Date().toISOString())
    // Update timer to transfer money to another accounts
    clearInterval(timer)
    timer = startLogOut()
    updateUi(currentAccount)
  }
  inputLoanAmount.value = ''
})

const overalBalance = accounts.map((acc) => acc.movements).flat().reduce((acc, mov) => acc + mov, 0)
console.log(overalBalance)

let sorted = false

btnSort.addEventListener('click', (e) => {
  e.preventDefault()
  displayMovements(currentAccount, !sorted)
  sorted = !sorted
})

labelBalance.addEventListener('click', () => {
  Array.from(document.querySelectorAll('.movements__value'), (val, i) => {
    return val.innerText = val.textContent.replace('$', ' USD')
  })
})

/**
 * !!! It`s necessary to finished this chunk code in the future !!!
 */
const num = new Number()

const local = navigation.labelBalance
const options = {
  style: 'currency',
  currency: 'USD'
}

const usd = Intl.NumberFormat(local, options).format()