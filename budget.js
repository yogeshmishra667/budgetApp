var budgetController = (function() {

 var Expense = function (id, description, value) {
           this.id = id ;
           this.description = description ;
           this.value = value ;
           /*we should created prototype on expenses object so let do that */
          this.percentage = -1; //part 14
         // store the percentages
 };
    /*  so we're does not just going to add the method "becouse all of the object created throught this expenses prototype will then inheri the method" */
        Expense.prototype.calculatePercentege = function(totalIncome){  //part 14

         if (totalIncome > 0) {
           this.percentage = Math.round((this.value / totalIncome) * 100);
         }else {
           this.percentage = -1 ; 
         }
        
       };
   
       Expense.prototype.getPercentage = function() { //part 14
         return this.percentage ;
         
       };
    
         
      
       

  var Income = function (id, description, value) {
          this.id = id;
          this.description = description;
          this.value = value;
  };

  /* imagine user input 10 income so we would create 10 income object "i think best solution store in a array"  
                               ⚡ allexpenses =[];⭐
                               ⚡ allIncome =[];⭐
                               ⚡total expenses =0⭐

   * simple array variable is a not  best solution so create object big data structure  */    
     var calculateTotal = function(type) { //part 10
        var sum  = 0;
        data.allItems[type].forEach((cur) => {
          sum += sum + cur.value;//value are store in income and expenses
        });
        data.totals[type] = sum ;
     };
       data = {
          allItems: {
            exp: [],
            inc: []
          },
          totals:{
            exp: 0,
            inc: 0 
          }, //part 10
          budget: 0,
          percentage: -1 
          /* percent is -1 becouse is value useally a value that use to say that somthing is non existing so there are no  budget value that total they are can not be percent */
       };

  /* create public object to allow other module to add new items in data structure "when someone call this method they have order can create a new items" */
return{
    addItems: function(type, des, val){ //part 5
     var newitems, ID;
        //create the id
        if (data.allItems[type].length > 0) {
           ID = data.allItems[type][data.allItems[type].length-1].id + 1;
        }else {
          ID = 0;
        }
       

        //add items in the data a structure
        if (type==='exp') {
        newitems = new Expense(ID, des, val);
        }else if (type==='inc') {
          newitems = new Income(ID, des, val);
        } 
          
        //push items in the data structure
        data.allItems[type].push(newitems);
        // return the items
        return newitems ;
     /*becouse then other module & function  going to call this one direct access to the items that you just create */ 
   },

     deteteItems:function(type, id){ //part 13
       var index ;
       /*  for delete any list of item using the ID but " but ID is not orderded like [1,2,3,4]" it is ["1,2,4,6"] if you can delete 3rd items but third elements is 6 it means delete the 6th value solve in this problme creating array and delete value using index */

       var ids = data.allItems[type].map(function(current) {
         return current.id ;
       });
      index = ids.indexOf(id);
      // it return index of the element of the array
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
        //splice use to remove element
      }
     },

      calculateBudget: function(){  //part 10
               // calculate total income and expenses
                 calculateTotal('exp');
                 calculateTotal('inc');
              // calculate the budget income - expenses
                 data.budget = data.totals.inc - data.totals.exp ;
              //calculate the percentage of income they we spent
              if (data.totals.inc > 0) {
                /* becouse if inc is 0 then percent return infinity */
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
              }else{
                data.percentage = -1 ;
              }
                 

      },

       calculatePercenteges: function(){ //part 14
        //in this function calculate the percentage of exepenses

         /* emagine if (a=30) is expenses and expenses and total income is 100 that the persent is 30/100 = 30% */
        data.allItems.exp.forEach(function(cur) {
          cur.calculatePercentege(data.totals.inc);
  
        });
       
        },
        getPercentages: function () {
          var allPerc = data.allItems.exp.map(function(cur) {
             return cur.getPercentage();
          });
          return allPerc ;
        },

       getbBudget: function(){ //part10
         return{
           budget: data.budget,
           totalInc: data.totals.inc,
           totalExp: data.totals.exp ,
           percentage:data.percentage
           //name of property total income is actully store
         };
       },
     testing: function(){
     console.log(data);
  }  

};

})();




var uiController = (function() {


   var domValue = {
         inputType: '.add__type',
         inputDesc: '.add__description',
         inputValue: '.add__value',
         inputBtn: '.add__btn',
         incomeContainer: '.income__list',
         expensesContainer: '.expenses__list',
         budgetLabel:'.budget__value', //part11
         incomeLabel: '.budget__income--value',
         exepensesLabel: '.budget__expenses--value',
         percentageLabel: '.budget__expenses--percentage',
         container:'.container',
         expensesPercentLebal: 'item__percentage' 
         //create obect for input type becouse some condition change the class 

       /* some value in a another module this problam i can not access in this module
       for this another module input field for access create public object bottom in module */
   };


  return{
       getInputs: function(){
         return{
         type : document.querySelector(domValue.inputType).value,  // inc and exp
         description : document.querySelector(domValue.inputDesc).value,
         /* parseFloat which convert a string to a floating number so basicllay decimal number */
         value :parseFloat(document.querySelector(domValue.inputValue).value)
        /* all field run in same time but it is can not run becouse i am store in different variable
         if  i am  create object for all value then all field run same time */
       
         };
      },

        addListItesms: function(obj, type){ //part 6
          var html, newHtml, element;  
          //create HTML string with the placeholder text
          if (type === 'inc') {
            element = domValue.incomeContainer;
            html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i><button></div></div></div>';

            /* use % sign for placeHolder text eaiser to find we don't over wright something that we dont want  */

          } else if (type === 'exp') {
            element = domValue.expensesContainer ; 
            html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          }
          
          //replace the placeholder text with some actural data

          /* it replace with the data that we put into the method  "obj.id" becouse remember that id property is the own hold */
         newHtml = html.replace('%id%', obj.id);
         newHtml = newHtml.replace('%description%', obj.description);
         newHtml = newHtml.replace('%value%', obj.value);
          //insert html into the DOM
         document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);


        },

   
         deleteListUItems: function(selecterId){
            var el = document.getElementById(selecterId) ;
            el.parentNode.removeChild(el);
         },


           clearFields: function(){ //part 7
           var fields ,fieldsArr;
            /* the main problem is quearySelecterAll it not return array then you can use loop over it  is return but still diffferint and that is a list list is similler to array but anot a array "then solution is list is convert in a array and they can use slice method it return copy os array
            " */
             fields = document.querySelectorAll(domValue.inputDesc +','+domValue.inputValue);
             /* fields is not a array then you can not use spice method we can use array.prototype and call method  */
            fieldsArr = Array.prototype.slice.call(fields);
            /* itaccept is callback function and recive three argument it automatic  access the event ovject
              1=> current value = value of array is current be a processed 
              2=> index 
              3=> main array*/
            fieldsArr.forEach(currentItem => {
             currentItem.value = "";
            });
            fieldsArr[0].focus();
           },

        displaybudget:function(obj){
          document.querySelector(domValue.budgetLabel).textContent = obj.budget ;
          document.querySelector(domValue.incomeLabel).textContent = obj.totalInc;
          document.querySelector(domValue.exepensesLabel).textContent = obj.totalExp;
          if (obj.percentage > 0) {
            document.querySelector(domValue.percentageLabel).textContent = obj.percentage + '%';
          } else{
            document.querySelector(domValue.percentageLabel).textContent = '---';
          }
          // when your exepenses is 0 then percentage is not -1 its is '---'

        },

        displayPercentages: function(percentages){
           var fields = document.querySelectorAll(domValue.expensesPercentLebal);

           var nodeListForEach = function(list, callback){
             for (var i = 0; i < list.length; i++) {
               callback(list[i], i);
               
             }
           };
           nodeListForEach(fields , function(current, index){

             if (percentages[index] > 0) {
               current.textContent = percentages[index] +'%' ;
             }else{
               current.textContent = '---';
             }        
           });
         },

      getDomStringFunction: function(){
            return domValue;

            /*create this public object becouse want to access another module input field with the help of in this method i can access*/
      }
  };
  
})();




var controller = (function(budgetctrl, uiCtrl) { 
    
    // i am write uiCtrl becouse its access the uiController as a argument

    var setupEventListener = function(){

/* this function created for organized the all eventListener but it want to call a function.! if i am create a IFEE function code executed ot not becouse it's executed automatically then i'm cteate most common way 'public intilization function' which call 'init' see in bottom */

       var dom = uiCtrl.getDomStringFunction();

      document.querySelector(dom.inputBtn).addEventListener('click', ctrlAddItem);
      
      document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        } 

      });
      document.querySelector(dom.container).addEventListener('click',ctrlDeleteItems);
    };
    /* create new function becouse first those step kind of belong together and second becouse will are going to do of all of this again later when we want to delete items so instead of reapeting this code we use dont reapet primciple then create nwe function */



     var updateBudget = function() { 
        //calculate budget           //part 10
         budgetctrl.calculateBudget();
        //return budget 
        var budget = budgetctrl.getbBudget(); //all budget is store in getBudget method
        //display the budget on ui
        //console.log(budget);
        uiCtrl.displaybudget(budget); //part11
        //it's return object from the getBudget method
     };

     var updatePercentages = function () {

       //calculate percentages
      budgetctrl.calculatePercenteges();
      //read persentages for the budget control
      var allp = budgetctrl.getPercentages();
    //update  in UI  the nes percentages
       //console.log(allp);
       uiCtrl.displayPercentages(allp);
  };




     var ctrlAddItem = function() {

    //get the field the input data
    var input = uiCtrl.getInputs();
    //console.log(input);
      if (input.description !=="" && !isNaN(input.value) && input.value > 0) {
        
        //add the items to the budget control
        var newItem = budgetctrl.addItems(input.type, input.description, input.value);
        //add the items to the ui
        uiCtrl.addListItesms(newItem, input.type);
        //clear the all fields
        uiCtrl.clearFields();
        // calculate and update budget
        updateBudget();
      //calculate update percentages
        updatePercentages();
      }
    
    };

    var ctrlDeleteItems = function(event){ //part 12
      var itemId, splitId, type, ID ;
      itemId =(event.target.parentNode.parentNode.parentNode.parentNode.id);
      if (itemId) {
         splitId = (itemId.split('-'));
      //split convert string to array means "inc-0" is convert in ["inc-0"]
      type = splitId[0];
        ID = parseInt(splitId[1]);  // parseInt:Converts A string to an integer.
      }

     // delete item from the data structure
      budgetctrl.deteteItems(type, ID);
     // delete item in the UI
     uiCtrl.deleteListUItems(itemId);
     // update and show new budget
      updateBudget();
    };

   
  

    return{
      /*  */
      init:function(){
        console.log('application start');
        uiCtrl.displaybudget({
          budget: 0,
          totalInc: 0,
          totalExp: 0,
          percentage: -1
         //when you again run the all its automaticlly set the all value is 0
        });
       setupEventListener();
      }  
    };
    
   
})(budgetController, uiController);

controller.init();



          

          