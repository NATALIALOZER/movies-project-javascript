(function () {
  "use strict";

  function Pagination() {
    //  getting buttons from DOM
    const firstButton = document.getElementById("button_first");
    const prevButton = document.getElementById("button_prev");
    const nextButton = document.getElementById("button_next");
    const lastButton = document.getElementById("button_last");
    const clickPageNumber = document.querySelectorAll(".clickPageNumber");

    let films_number = 1080;
    let current_page = 1;
    let records_per_page = 20;

    this.init = function () {
      changePage(1);
      pageNumbers(1);
      selectedPage();
      clickPage();
      addEventListeners();
    };

    //catch paggination buttons click
    let addEventListeners = function () {
      firstButton.addEventListener("click", firstPage);
      prevButton.addEventListener("click", prevPage);
      nextButton.addEventListener("click", nextPage);
      lastButton.addEventListener("click", lastPage);
    };

    //recive user click on the selected button  
    let selectedPage = function () {
      let page_number = document
        .getElementById("page_number")
        .getElementsByClassName("clickPageNumber");
    };

    //change button opacity deppending on choosen page
    let checkButtonOpacity = function () {
      current_page == 1
        ? firstButton.classList.add("opacity")
        : firstButton.classList.remove("opacity");
      current_page == 1
        ? prevButton.classList.add("opacity")
        : prevButton.classList.remove("opacity");
      current_page == numPages()
        ? nextButton.classList.add("opacity")
        : nextButton.classList.remove("opacity");
      current_page == numPages()
        ? lastButton.classList.add("opacity")
        : lastButton.classList.remove("opacity");
    };

       
    let changePage = async function (page) {
      const listOfMovies = document.getElementById("listOfMovies");

      if (page < 1) {
        page = 1;
      }
      if (page > numPages() - 1) {
        page = numPages();
      }

      //reciving data from movie database depending on choosen page
      let response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${current_page}`
      );

      let content = await response.json();
      content = content.results;

      //recives poster from each object and create img tag and push it to html
      let key;

      for (key in content) {
        listOfMovies.innerHTML = "";
        

        for (var i = 0; i < records_per_page && i < content.length; i++) {
          if(content[i].poster_path){
            listOfMovies.innerHTML += `<img class='objectBlock' src='http://image.tmdb.org/t/p/w342${content[i].poster_path}'></div>`
          } else {
            console.log('NO POSTER')
            listOfMovies.innerHTML += "<img class='objectBlock' src='./images/no-image.jpg'></div>"
          }
          // console.log('http://image.tmdb.org/t/p/w342$'+content[i].poster_path)
          
        }
        console.log()
        checkButtonOpacity();
        selectedPage();
      }
    };

    //cathc user current page location and call ChangePage function
    let clickPage = function () {
      document.addEventListener("click", function (e) {
        if (
          e.target.nodeName == "SPAN" &&
          e.target.classList.contains("clickPageNumber")
        ) {
          if(e.target.textContent!="..."){
            current_page = e.target.textContent;
          }
          changePage(current_page);
          pageNumbers(current_page)
        }
      });
    };

    //selecting first page
    let firstPage = function () {
      if (current_page != 1) {
        current_page = 1;
        changePage(current_page);
        pageNumbers(current_page)
      }
    };

    //select previous page if it isn`t first
    let prevPage = function () {
      if (current_page > 1) {
        current_page--;
        changePage(current_page);
        pageNumbers(current_page)
      }
    };

    //select next page if isn`t last
    let nextPage = function () {
      if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
        pageNumbers(current_page)
      }
    };

    //select last page 
    let lastPage = function () {
      if (current_page != numPages()) {
        current_page = numPages();
        changePage(current_page);
        pageNumbers(current_page)
      }
    };


    //   generate pages number and add to Span "page_number"
    let pageNumbers = function(current_page){
      let pageNumber = document.getElementById("page_number");
      pageNumber.innerHTML = "";
      let int_current_page = +current_page 
      if (numPages()<3){
        for (let i=1; i<numPages();i++){
          pageNumber.innerHTML +=
          "<span class='clickPageNumber'>" + i + "</span>";
        }
      } else{
        if(int_current_page<=2){
          for(let i=1; i<=3; i++){
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
          }
          pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
        }
        if(int_current_page>2&&int_current_page<=(numPages())-2){
          
          pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
          for (let i = int_current_page-1; i<=int_current_page+1; i++){
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
          }
          pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
        }
        if(int_current_page>numPages()-2){
          pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
          for(let i = int_current_page-2;i<numPages()+1;i++){
            pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
          }
        }
      }
    }

    //calculating num of pages depend on movies numbers and needed amount on the one page
    let numPages = function () {
      return Math.ceil(films_number / records_per_page);
    };
  }
  let pagination = new Pagination();
  pagination.init();
})();
