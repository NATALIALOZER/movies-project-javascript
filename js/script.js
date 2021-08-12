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
      clickPoster();
      closeDetailsModal();
      addEventListeners();
    };

    let addEventListeners = function () {
      firstButton.addEventListener("click", firstPage);
      prevButton.addEventListener("click", prevPage);
      nextButton.addEventListener("click", nextPage);
      lastButton.addEventListener("click", lastPage);
    };

    let selectedPage = function () {
      let page_number = document
        .getElementById("page_number")
        .getElementsByClassName("clickPageNumber");
    };

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

      let response = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${current_page}`
      );
      let content = await response.json();
      content = content.results;
      console.log(content)
      let key;

      for (key in content) {
        listOfMovies.innerHTML = "";
        for (var i = 0; i < records_per_page && i < content.length; i++) {
          if(content[i].poster_path){
            listOfMovies.innerHTML += `<img class='objectBlock col-5 col-md-12' id='${content[i].id}' src='http://image.tmdb.org/t/p/w342${content[i].poster_path}'></img><div style="display:none"><h2>${content[i].original_title}</h2><p>Score: ${content[i].vote_average}</p><p>Rating: ${content[i].adult}</p><p>Release Date: ${content[i].release_date}</p><hr><p>${content[i].overview}</p><hr></div>`
          } else {
            console.log('NO POSTER')
            listOfMovies.innerHTML += `<img class='objectBlock col-5 col-md-12' id='${content[i].id}' src='./images/no-image.jpg'></img><div style="display:none"><h2>${content[i].original_title}</h2><p>Score: ${content[i].vote_average}</p><p>Rating: ${content[i].adult}</p><p>Release Date: ${content[i].release_date}</p><hr><p>${content[i].overview}</p><hr></div>`
          }
        }
        checkButtonOpacity();
        selectedPage();
      }
    };

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
          pageNumbers(current_page);
        }
      });
    };

    let firstPage = function () {
      if (current_page != 1) {
        current_page = 1;
        changePage(current_page);
        pageNumbers(current_page)
      }
    };

    let prevPage = function () {
      if (current_page > 1) {
        current_page--;
        changePage(current_page);
        pageNumbers(current_page)
      }
    };

    let nextPage = function () {
      if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
        pageNumbers(current_page)
      }
    };

    let lastPage = function () {
      if (current_page != numPages()) {
        current_page = numPages();
        changePage(current_page);
        pageNumbers(current_page)
      }
    };

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

    let numPages = function () {
      return Math.ceil(films_number / records_per_page);
    };

    let clickPoster = function () {
      document.addEventListener("click", function (e) {
        if (
          e.target.nodeName == "IMG" &&
          e.target.classList.contains("objectBlock")
        ) {
          // console.log(e.target,e.target.id,e.target.nextSibling)
          openDetailsModal(e.target,e.target.id,e.target.nextSibling);
        }
      });
    }

    let openDetailsModal = function (poster, id, movie_info) {
      var modal = document.getElementById("details-modal");
      let posterBox = document.getElementById("poster-box");
      // var backToListbtn = document.getElementById("back-to-list");
      modal.style.display = "flex";
      // posterBox.innerHTML += нужно как-то расспарсить HTML обьект!!!!!!!!!!!!

      console.log(poster)
    }

    let closeDetailsModal = function () {
      document.addEventListener("click", function (e) {
        if (
          e.target.nodeName == "BUTTON" &&
          e.target.classList.contains("navigation__back-to-list")
        ) {
          let modal = document.getElementById("details-modal");
          modal.style.display = "none";
          console.log('close')
        }
      });
    }


  }
  let pagination = new Pagination();
  pagination.init();
})();
