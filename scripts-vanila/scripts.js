var createListenerExist = false;
var deleteListenerExist = false;
var addNewListenerExist = false;
var productsEventListener = false;
document.addEventListener(
  "DOMContentLoaded",
  function () {
    let loader = document.querySelector(".loader");
    let content = document.querySelector(".content");

    setTimeout(function () {
      fadeOut(loader);
      fadeIn(content, "grid");
      menuButtonCustomers();
      menuButtonProducts();
      menuButtonUsers();
      menuButtonLogo();
      sessionStorage.removeItem("updatedProduct");
      sessionStorage.removeItem("updatedUsers");
    }, 2500);
  },
  false
);

// ********************************** LOGO ********************************** //

function menuButtonLogo() {
  document.querySelector(".imgLogo").addEventListener("click", function () {
    document.querySelector(".customers").style.color = "var(--black)";
    document.querySelector(".products").style.color = "var(--black)";
    document.querySelector(".users").style.color = "var(--black)";

    document.querySelector(".title").innerHTML = "Welcome";

    // hide delete button //
    document.querySelector(".deleteButton").style.display = "none";
    // hide addnew button //
    document.querySelector(".addNewButton").style.display = "none";
    // hide create button //
    document.querySelector(".createButton").style.display = "none";
    // hide arrow button //
    document.querySelector(".arrow-container").style.display = "none";
    // hide form  //
    document.querySelector(".createUserForm").style.display = "none";

    // data calling //
    getWelcome();
  });
}

// ********************************** LOGO-END ********************************** //

// ********************************** CUSTOMERS ********************************** //
function menuButtonCustomers() {
  document.querySelector(".customers").addEventListener("click", function () {
    console.log("customers button");

    document.querySelector(".dataTable").style.display = "block";
    document.querySelector(".products").style.color = "var(--black)";
    document.querySelector(".users").style.color = "var(--black)";
    document.querySelector(".customers").style.color = "var(--blue)";
    document.querySelector(".title").innerHTML = "Customers";

    // hide delete button //
    document.querySelector(".deleteButton").style.display = "none";
    // hide addnew button //
    document.querySelector(".addNewButton").style.display = "none";
    // hide create button //
    document.querySelector(".createButton").style.display = "none";
    // hide create button //
    document.querySelector(".arrow-container").style.display = "none";
    // hide form  //
    document.querySelector(".createUserForm").style.display = "none";

    // data calling //
    getCustomers();
  });
}

function getCustomers() {
  // document.querySelector(".loader-line").style.display = "block";
  document.querySelector(".dataTable").style.display = "none";
  fadeIn(document.querySelector(".loader-line"));
  fadeOut(document.querySelector(".dataTable"));

  //$('.loader-line').css("display", "block");
  //$('.dataTable').css("display", "none")
  fetch("data/customers.json")
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      setTimeout(function () {
        fadeOut(document.querySelector(".loader-line"));
        fadeIn(document.querySelector(".dataTable"));
      }, 1020);
      tableBuilderCustomers(data);
    });
}

function tableBuilderCustomers(data) {
  //$("#tbody").empty();
  document.querySelector("#tbody").innerHTML = "";

  let text = "<tr> <th>CODE</th><th>NAME</th><th>ADDRESS</th></tr>";
  var dataLength = data.length;
  for (let i = 0; i < dataLength; i++) {
    let code = data[i].code;
    let name = data[i].name;
    let address = data[i].address;

    text += `
      <tr class="table-row" >
          <td>${code}</td>
          <td>${name}</td>
          <td>${address}</td>
      </tr>    
      `;
  }

  document.querySelector("#tbody").innerHTML = text;
}

// ********************************** PRODUCTS ********************************** //
function menuButtonProducts() {
  if (!productsEventListener) {
    document.querySelector(".products").addEventListener("click", function () {
      console.log("Products button");

      document.querySelector(".dataTable").style.display = "block";

      document.querySelector(".customers").style.color = "var(--black)";
      document.querySelector(".users").style.color = "var(--black)";

      document.querySelector(".products").style.color = "var(--blue)";

      document.querySelector(".title").innerHTML = "Products";

      // hide delete button //
      document.querySelector(".deleteButton").style.display = "block";
      // hide addnew button //
      document.querySelector(".addNewButton").style.display = "none";
      // hide create button //
      document.querySelector(".createButton").style.display = "none";
      // hide create button //
      document.querySelector(".arrow-container").style.display = "none";
      // hide form  //
      document.querySelector(".createUserForm").style.display = "none";

      // data calling //
      getProducts();
      productsEventListener = true;
    });
  }
}

function getProducts() {
  // document.querySelector(".loader-line").style.display = "block";
  document.querySelector(".dataTable").style.display = "none";
  fadeIn(document.querySelector(".loader-line"));
  fadeOut(document.querySelector(".dataTable"));

  //$('.loader-line').css("display", "block");
  //$('.dataTable').css("display", "none")
  fetch("data/products.json")
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);

      setTimeout(function () {
        fadeOut(document.querySelector(".loader-line"));
        fadeIn(document.querySelector(".dataTable"));
      }, 1020);

      let updatedProductsExist = sessionStorage.getItem("updatedProduct");
      if (updatedProductsExist) {
        updatedProductsExist = JSON.parse(updatedProductsExist);
        console.log("users exist");
        console.log(updatedProductsExist);
        tableBuilderProducts(updatedProductsExist);
        // menuButtonAddNew(updatedUsersExist);
        menuButtonDelete(updatedProductsExist);
      } else {
        console.log("users dont exist ");
        tableBuilderProducts(data);
        //menuButtonAddNew(data);
        menuButtonDelete(data);
      }
      //console.log(updatedUsersExist);

      // tableBuilderProducts(data);
      // menuButtonDelete(data);
    });
}

function menuButtonDelete(data) {
  if (!deleteListenerExist) {
    document
      .querySelector(".deleteButton")
      .addEventListener("click", function del() {
        console.log("Button Delete");
        let arrData = data;
        console.log("edw", arrData);

        var arrOfCheckedValues = [];

        var checkboxes = document.querySelectorAll(
          'input[name="checkbox"]:checked'
        );

        for (var i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked == true) {
            arrOfCheckedValues.push(checkboxes[i].value);
          }
        }

        console.log(checkboxes);
        console.log(arrOfCheckedValues);
        if (arrOfCheckedValues.length < 1) {
          alert("Please choose one product");
        }
        if (arrOfCheckedValues.length > 1) {
          alert("Please choose only one product");
        }

        if (arrOfCheckedValues.length === 1) {
          let deleteValueIndex = arrOfCheckedValues[0];

          var response = confirm(
            "Are you sure you want to delete this product?"
          );
          console.log(response);

          if (response) {
            let deletedAr = arrData.splice(deleteValueIndex, 1);
            console.log("diagrameno adikimeno ", deletedAr[0]);
            console.log("pinakas dedomenwn", arrData);

            let objDeleted = deletedAr[0];
            let objString = JSON.stringify(objDeleted);
            sessionStorage.setItem(`productDeleted`, objString);

            // //storage show//
            // let item = JSON.parse( sessionStorage.getItem('productDeleted'));
            // console.log(item.code);
            // console.log(item.description);

            // fixbug
            sessionStorage.setItem("updatedProduct", JSON.stringify(arrData));

            tableBuilderProducts(arrData);
          } else {
            console.log("delete is canceled");
          }
        }
        deleteListenerExist = true;
      });
  }
}

function tableBuilderProducts(data) {
  document.querySelector("#tbody").innerHTML = "";

  let text = "<tr> <th></th><th>CODE</th><th>DESCRIPTION</th></tr>";
  let productData = data;
  var dataLength = productData.length;

  for (let i = 0; i < dataLength; i++) {
    let code = data[i].code;
    let description = data[i].description;

    text += `
    <tr class="table-row" id="row${i}">
        <td> <input class="deleteCheckbox" name="checkbox" onchange="checkedFunction(this)"  type="checkbox" id="pro${i}" value="${i}" name="Products"></input> </td>
        <td id=productCode${i}>${code}</td>
        <td id=productDescription${i}>${description}</td>
    </tr>    
    `;
  }
  document.querySelector("#tbody").innerHTML = text;
}
// ********************************** PRODUCTS - END ********************************** //

// ********************************** USERS ********************************** //
function menuButtonUsers() {
  document.querySelector(".users").addEventListener("click", function () {
    console.log("Users button");

    document.querySelector(".dataTable").style.display = "block";

    document.querySelector(".customers").style.color = "var(--black)";
    document.querySelector(".users").style.color = "var(--blue)";

    document.querySelector(".products").style.color = "var(--black)";

    document.querySelector(".title").innerHTML = "Users";

    // hide delete button //
    document.querySelector(".deleteButton").style.display = "none";
    // hide addnew button //
    document.querySelector(".addNewButton").style.display = "block";
    // hide create button //
    document.querySelector(".createButton").style.display = "none";
    // hide create button //
    document.querySelector(".arrow-container").style.display = "none";
    // hide form  //
    document.querySelector(".createUserForm").style.display = "none";

    // data calling //
    getUsers();
  });
}

function getUsers() {
  // document.querySelector(".loader-line").style.display = "block";
  document.querySelector(".dataTable").style.display = "none";
  fadeIn(document.querySelector(".loader-line"));
  fadeOut(document.querySelector(".dataTable"));

  //$('.loader-line').css("display", "block");
  //$('.dataTable').css("display", "none")
  fetch("data/users.json")
    .then((response) => response.json())
    .then(function (data) {
      console.log(data);
      console.log("get users");

      setTimeout(function () {
        fadeOut(document.querySelector(".loader-line"));
        fadeIn(document.querySelector(".dataTable"));
      }, 1020);
      let updatedUsersExist = sessionStorage.getItem("updatedUsers");
      if (updatedUsersExist) {
        updatedUsersExist = JSON.parse(updatedUsersExist);
        console.log("users exist");
        tableBuilderUsers(updatedUsersExist);
        menuButtonAddNew(updatedUsersExist);
      } else {
        console.log("users dont exist ");
        tableBuilderUsers(data);
        menuButtonAddNew(data);
      }
      console.log(updatedUsersExist);
    });
}

function tableBuilderUsers(data) {
  console.log("users builder ");
  document.querySelector("#tbody").innerHTML = "";

  let text = "<tr> <th>CODE</th><th>NAME</th></tr>";
  var dataLength = data.length;
  for (let i = 0; i < dataLength; i++) {
    let code = data[i].code;
    let name = data[i].name;

    text += `
    <tr class="table-row">
        <td>${code}</td>
        <td>${name}</td>
    </tr>    
    `;
  }
  document.querySelector("#tbody").innerHTML = text;
}

function menuButtonAddNew(data) {
  let usersData = data;
  document
    .querySelector(".addNewButton")
    .addEventListener("click", function () {
      console.log("add new function button");

      document.querySelector(".title").innerHTML = "Add new user";
      document.querySelector(".dataTable").style.display = "none";
      document.querySelector(".createUserForm").style.display = "block";
      document.querySelector(".addNewButton").style.display = "none";
      document.querySelector(".createButton").style.display = "block ";
      document.querySelector(".arrow-container").style.display = "block ";

      menuButtonArrow();
      menuButtonCreate(usersData);
    });
}

function menuButtonArrow() {
  document
    .querySelector(".arrow-container")
    .addEventListener("click", function () {
      console.log("pressed back - arrow button");
      document.querySelector(".dataTable").style.display = "block";

      document.querySelector(".customers").style.color = "var(--black)";
      document.querySelector(".products").style.color = "var(--black)";
      document.querySelector(".users").style.color = "var(--blue)";
      document.querySelector(".title").innerHTML = "Users";

      // hide delete button //
      document.querySelector(".deleteButton").style.display = "none";

      // show addnew button //
      document.querySelector(".addNewButton").style.display = "block";

      // hide create button //
      document.querySelector(".createButton").style.display = "none";
      // hide arrow button //
      document.querySelector(".arrow-container").style.display = "none";
      // hide form  //
      document.querySelector(".createUserForm").style.display = "none";
    });
}

function menuButtonCreate(data) {
  console.log("LISTENER : ", createListenerExist);
  let usersData = data;

  if (!createListenerExist) {
    document
      .querySelector(".createButton")
      .addEventListener("click", function create() {
        console.log("menu button create");

        console.log("create button data", usersData);

        let userName = document.querySelector("#userName").value;
        let userCode = document.querySelector("#userCode").value;

        console.log(`username : ${userName.length} usercode : ${userCode}`);

        if (userName.length == 0 || userCode.length == 0) {
          if (userName.length == 0 && userCode.length == 0) {
            alert("All fields are required!");
          } else if (userName.length == 0) {
            alert("Name is required");
          } else if (userCode.length == 0) {
            alert("Code is required");
          }
        } else {
          alert("correct");

          let userObj = {
            code: userCode,
            name: userName,
          };
          usersData.unshift(userObj);

          tableBuilderUsers(usersData);

          document.querySelector(".arrow-container").style.display = "none";
          document.querySelector(".addNewButton").style.display = "block";
          document.querySelector(".createButton").style.display = "none";
          document.querySelector(".dataTable").style.display = "block";
          document.querySelector(".createUserForm").style.display = "none";

          sessionStorage.setItem("updatedUsers", JSON.stringify(usersData));
        }
        createListenerExist = true;
        // remove event listener to stop trigerting m,ultiple times
        //document.querySelector(".createButton").removeEventListener("click", create);
      });
  }
}
// ********************************** USERS - END ********************************** //

// ********************************** UTILITY ********************************** //

function fadeOut(el) {
  el.style.opacity = 1;

  (function fade() {
    if ((el.style.opacity -= 0.1) < 0) {
      el.style.display = "none";
    } else {
      requestAnimationFrame(fade);
    }
  })();
}

function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += 0.1) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}

function getWelcome() {
  document.querySelector("#tbody").innerHTML = "";
}

function checkedFunction(a) {
  if (a.checked) {
    document.querySelector(`#row${a.value}`).style.background = "var(--grey)";
  } else {
    document.querySelector(`#row${a.value}`).style.background = "var(--white)";
  }

  // $(this).val();
  console.log(a.value);
  console.log(a.checked);
  console.log("else lol");
}
// ********************************** UTILITY - END ********************************** //
