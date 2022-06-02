"use strict";

let start = document.getElementById("start"),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      depositCheck = document.querySelector('#deposit-check'),
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      accumulatedMonthValue = document.getElementsByClassName('accumulated_month_value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-title[type="text"]'),
      expensesItems = document.querySelectorAll('.expenses-items'),
      incomeItems = document.querySelectorAll('.income-items'),
      additionalExpenses = document.querySelector('.additional_expenses'),
      periodSelect = document.querySelector('.period-select'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
      allInput = document.querySelectorAll('input'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent');





let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    expensesMonth: 0,
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    start: function() {
         if(salaryAmount.value === ''){
            alert('ошибка, поле"Месячный доход", должно быть заполнено');
            return 
        }

        start.style.display = 'none';
        cancel.style.display = 'block';

        document.querySelectorAll('input[type=text]').forEach((item) =>{
            item.disabled = true;
        })
        document.querySelectorAll('.btn_plus').forEach((item) =>{
            item.style.display = 'none';
        })


        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getIncomeMonth();
        this.getAddExpenses();
        this.getAddIncome();  
        this.getBudget();
        this.showResult();
  
    },

    reset: function(){
        this.budget = 0,
        this.budgetDay = 0,
        this.budgetMonth = 0,
        this.income = {},
        this.incomeMonth = 0,
        this.addIncome = [],
        this.expenses = {},
        this.expensesMonth = 0,
        this.addExpenses = [],
        this.deposit = false,
        this.percentDeposit = 0,
        this.moneyDeposit = 0;

        start.style.display = 'block';
        cancel.style.display = 'none';

        document.querySelectorAll('input[type=text]').forEach((item) =>{
            item.disabled = false;
            item.value = ''
        })
        document.querySelectorAll('.btn_plus').forEach((item) =>{
            item.style.display = 'block';
        })

        this.removeInput(incomeItems);
        this.removeInput(expensesItems);
 
    },
    removeInput: (item) =>{
        for(let i = 1; i<item.length; i++){
            item[i].remove();
        }
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(',');
        additionalIncomeValue.value = this.addIncome.join(',');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calclPeriod();
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calclPeriod();
        })
    },

    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem,expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem,incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== ''&& cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function(){
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
        });       
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },
        getExpensesMonth: function(){
        for (let key in this.expenses){
            this.expensesMonth += +this.expenses[key];
        }
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach((item) => {
            let itemValue = item.value.trim();
            if(itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    getInfoDeposit: function(){
        this.deposit = confirm('Есть ли у вас депозит в банке?');
        if(this.deposit){
            this.percentDeposit = prompt('Какой годовой процент?', '10')
            this.moneyDeposit = prompt('Какая сумма заложена?', 100000)
        }
    },

    getIncomeMonth: function() {
        for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
    },
    getBudget: function(){
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);

    },
    getTargetMonth: function() {
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function(){
        if(this.budgetDay > 800){
            return('Высокий уровень дохода');
        }else if (this.budgetDay > 0){
            return ('Низский уровень дохода');
        }else{
            return ('Что-то пошло не так!');
        }
    },
    calclPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
};



start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', (event) => {
    periodAmount.innerHTML = event.target.value;
})

// if(appData.getTargetMonth() > 0){
//     console.log(" " + Math.ceil(appData.getTargetMonth()) + "месяцев");
// }else{
//     console.log("Цель не будет достигнута");
// }

