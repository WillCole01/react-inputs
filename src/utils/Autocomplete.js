var countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba",
"Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia",
"Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde",
"Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus",
"Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands",
"Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada",
"Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel",
"Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania",
"Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
"Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
"Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda",
"Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands",
"Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan",
"Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates",
"United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];


var state = {
    currentValue:'',
    currentExpression:'',
    leftMargin:0,
    symbols: [')','.']
}



function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments, the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    this.currentValue = '';

    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input",  function(e) {
        var a, b, i, val = this.value.substring(state.leftMargin, this.value.length); // need to fix this tomorrow
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        // a = document.getElementById('myInputautocomplete-list')
        a.style.width = getMaximumArrayWidth(countries) + 'ch';
        a.style.left = Math.min(65,state.leftMargin) + 'ex';

        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            // b.setAttribute("class", "list-item-" + i);
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                if (state.currentExpression != '')
                {
                    inp.value = state.currentExpression + this.getElementsByTagName("input")[0].value; // + '.' to be replaced by a lookup function
                }
                else
                {
                    inp.value = this.getElementsByTagName("input")[0].value;
                }

                reviseState(inp,state);
                // state.pastValue = state.currentValue;
                // state.currentValue =  inp.value;
                // state.leftMargin = this.getElementsByTagName("input")[0].value.length;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");

        // reassess the expression, determine the input list
        // console.log(state.currentValue + ' ' + state.leftMargin)
        // console.log(state.currentValue + ' ' + state.leftMargin)

        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          removeActive(x);
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          removeActive(x);
          addActive(x);
        }
        else if (e.keyCode == 190) {
            state.leftMargin = state.currentValue.length + 1;
        } 
        else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) 
                {

                    x[currentFocus].click(); //.click();
                //    this.currentValue = this.getElementsByTagName("input")[0].value;
                    // this.currentValue = this.getElementsByTagName("input")[0].value;
                }
          }
        }

        reviseState(inp, state, e.keyCode); //state.currentValue = getLatestExpressionState(document.getElementById("myInput").value, document.getElementById("myInput").selectionStart);
        
    });


    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
    //   x[currentFocus].classList.add("autocomplete-active");
      x[currentFocus].style.backgroundColor = 'blue';
      x[currentFocus].style.color = 'yellow';

    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].style.backgroundColor = 'white';
        x[i].style.color = 'black';
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  function getMaximumArrayWidth(array)
  {
    longest = array.reduce((r,s) => r.length > s.length ? r : s, 0);
    return longest.length;
  }

  
  function getLastIndexOf(lookupArray, symbols)
  {
    var b = lookupArray.split('').reverse();
    for(i = 0; i < b.length; i++)
    { 
        for(x = 0; x < symbols.length; x++ )
        {
            if(b[i] == symbols[x] )
            { 
                return (b.length - i);
            } 
        }
    }
    return 0;
  }

  function reviseState(inp, state, keycode=0)
  {
        state.currentValue = inp.value.substring(0, inp.selectionStart);

        if(keycode === 190)
        {
          state.leftMargin = state.currentValue.length;
          state.currentExpression = state.currentValue;
        }
        else
        {
          state.leftMargin = getLastIndexOf(state.currentValue,state.symbols);
          state.currentExpression = state.currentValue.substring(0,state.leftMargin);
        }
  }
  
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
  }
  
