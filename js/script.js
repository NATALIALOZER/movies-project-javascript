"use strict";
  let listfab = [];
  if (window.location.href.indexOf("pages") === -1) {


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
        addToFavorites();
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
        films_number = content.total_results
        console.log(`На данный момент в базе данных - ${films_number} фильмов.`)
        content = content.results;

        let key;
        for (key in content) {
          listOfMovies.innerHTML = "";
          for (let i = 0; i < records_per_page && i < content.length; i++) {
            if (content[i].poster_path) {
              listOfMovies.innerHTML += `<img class='objectBlock col-5 col-md-12' src='http://image.tmdb.org/t/p/w342${content[i].poster_path}'><div class="details__new-movie-info" id='${content[i].id}' style="display:none"><button class="add-to-favorites btn btn-light">Add to favorite</button><div class="movie-title">${content[i].original_title}</div><div class="movie-ratings"><span class="movie-score"> Score: ${content[i].vote_average} </span><span class="movie-rating"> Rating: ${content[i].adult}</span><span class="movie-release"> Release Date: ${content[i].release_date}</span></div><div class="movie-description-box"><hr><span class="movie-description">${content[i].overview}</span><hr></div></div>`
            } else {
              console.log('NO POSTER')
              listOfMovies.innerHTML += `<img class='objectBlock col-5 col-md-12' src='./images/no-image.jpg'><div class="details__new-movie-info" id='${content[i].id}' style="display:none"><button class="add-to-favorites btn btn-light">Add to favorite</button><div class="movie-title">${content[i].original_title}</div><div class="movie-ratings"><span class="movie-score"> Score: ${content[i].vote_average} </span><span class="movie-rating"> Rating: ${content[i].adult}</span><span class="movie-release"> Release Date: ${content[i].release_date}</span></div><div class="movie-description-box"><hr><span class="movie-description">${content[i].overview}</span><hr></div></div>`
            }
          }
          checkButtonOpacity();
          selectedPage();
        }
      };

      let clickPage = function () {
        document.addEventListener("click", function (e) {
          if (
              e.target.nodeName === "SPAN" &&
              e.target.classList.contains("clickPageNumber")
          ) {
            if (e.target.textContent !== "...") {
              current_page = e.target.textContent;
            }
            changePage(current_page);
            pageNumbers(current_page);
          }
        });
      };

      let firstPage = function () {
        if (current_page !== 1) {
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
        if (current_page !== numPages()) {
          current_page = numPages();
          changePage(current_page);
          pageNumbers(current_page)
        }
      };

      let pageNumbers = function (current_page) {
        let pageNumber = document.getElementById("page_number");
        pageNumber.innerHTML = "";
        let int_current_page = +current_page
        if (numPages() < 3) {
          for (let i = 1; i < numPages(); i++) {
            pageNumber.innerHTML +=
                "<span class='clickPageNumber'>" + i + "</span>";
          }
        } else {
          if (int_current_page <= 2) {
            for (let i = 1; i <= 3; i++) {
              pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
            }
            pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
          }
          if (int_current_page > 2 && int_current_page <= (numPages()) - 2) {

            pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
            for (let i = int_current_page - 1; i <= int_current_page + 1; i++) {
              pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
            }
            pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
          }
          if (int_current_page > numPages() - 2) {
            pageNumber.innerHTML += "<span class='clickPageNumber'>...</span>";
            for (let i = int_current_page - 2; i < numPages() + 1; i++) {
              pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
            }
          }
        }
      }

      let numPages = function () {
        return Math.ceil(films_number / records_per_page);
      };
    }

    let clickPoster = function () {
      let current_poster;
      let current_movie_info;
      let next_poster;
      let next_info;
      let next = document.getElementsByClassName("navigation__next-movie")[0]

      document.addEventListener("click", function (e) {
        if (
            e.target.nodeName === "IMG" &&
            e.target.classList.contains("objectBlock")
        ) {
          current_poster = e.target
          current_movie_info = e.target.nextSibling
          try {
            next_poster = current_poster.nextSibling.nextSibling
            next_info = current_movie_info.nextSibling.nextSibling
            next.style.display = "flex";
          } catch (err) {
            next_poster = 1
            next_info = 1
            next.style.display = "none";
          } finally {
            openDetailsModal(current_poster, current_movie_info);
          }
        }
        if (
            e.target.nodeName === "BUTTON" &&
            e.target.classList.contains("navigation__next-movie")
        ) {
          current_poster = next_poster
          current_movie_info = next_info
          try {
            next_poster = current_poster.nextSibling.nextSibling
            next_info = current_movie_info.nextSibling.nextSibling
            next.style.display = "flex";
          } catch (err) {
            next_poster = 1
            next_info = 1
            next.style.display = "none";
          } finally {
            openDetailsModal(current_poster, current_movie_info)
          }
        }
      });
    }

    let openDetailsModal = function (poster, movie_info) {
      let modal = document.getElementById("details-modal");
      let posterBox = document.getElementById("poster-box");
      let infoBox = document.getElementById("info-box");
      modal.style.display = "flex";
      modal.style.backgroundImage = `linear-gradient( rgba(9, 14, 26, 0.8), rgba(0, 0, 0, 0.5) ), url("${poster.src}")`

      document.body.style.overflow = 'hidden';

      let copyPoster = poster.cloneNode(true);
      while (posterBox.firstChild) {
        posterBox.removeChild(posterBox.firstChild)
      }
      posterBox.appendChild(copyPoster)

      let copyInfo = movie_info.cloneNode(true);
      while (infoBox.firstChild) {
        infoBox.removeChild(infoBox.firstChild)
      }
      copyInfo.style.display = 'flex'
      infoBox.appendChild(copyInfo)
    }

    let closeDetailsModal = function () {
      document.addEventListener("click", function (e) {
        if (
            e.target.nodeName === "BUTTON" &&
            e.target.classList.contains("navigation__back-to-list")
        ) {
          let modal = document.getElementById("details-modal");
          modal.style.display = "none";
          document.body.style.overflow = 'visible';
          // console.log('close')
        }
      });
    }

    let addToFavorites = function () {

      let key = 'Add to Fav'
      document.addEventListener("click", function (e) {
        if (
            e.target.nodeName === "BUTTON" &&
            e.target.classList.contains("add-to-favorites")
        ) {
          let storage = {};
          let target = e.target;
          let id = target.parentElement.id
          let m_title = target.parentElement.getElementsByClassName("movie-title")[0]
          /*console.log(m_title.innerHTML)*/
          let m_description = target.parentElement.getElementsByClassName("movie-description")[0]
          /*console.log(m_description.innerHTML)*/
          let doc = target.parentElement.parentElement.parentElement
          let m_poster = doc.getElementsByClassName("objectBlock")[0]

          if (localStorage.getItem(id) != null){
            alert(`Movie with this id - ${id} already in list` )
            storage['title'] = m_title.innerHTML
            storage['info'] = m_description.innerHTML
            storage['poster'] = m_poster.src


            localStorage.setItem(id, JSON.stringify(storage))
          } else {
            storage['title'] = m_title.innerHTML
            storage['info'] = m_description.innerHTML
            storage['poster'] = m_poster.src

            localStorage.setItem(id, JSON.stringify(storage))
            /*console.log(`Movie was added to Fav list` )*/
          }
          /*localStorage.clear()*/

        }
      });
    }

    let pagination = new Pagination();
    pagination.init();

  }
  if(window.location.href.indexOf("favorites") > -1){
    console.log('------------------On favorite-page')
    const listOfFavorites = document.getElementById("favorite_list");

    for (let i = 0; i < localStorage.length; i++){
      let obj = JSON.parse(localStorage.getItem(localStorage.key(i)))
      let title = obj.title
      let info = obj.info
      let poster = obj.poster
      let newDiv = document.createElement("div");
      newDiv.classList.add("fav-movie-block");
      newDiv.innerHTML = `<img src="${poster}" alt="fav-poster"><div><h1>${title}</h1><p>${info}</p></div>`;
      listOfFavorites.appendChild(newDiv)
      /*console.log(localStorage[x])*/
    }

    /*let title = JSON.parse (localStorage.getItem ('436969'));
    console.log(title);*/

    /*let changeFavPage = function (){
      for (let x in localStorage){
        /!*let regexp = /^[0-9]{6}$/;
        if(x.match(regexp)) {*!/

          /!*let newDiv = document.createElement("h1");
          newDiv.innerHTML = title;
          listOfFavorites.appendChild(newDiv)
          console.log(localStorage[x])*!/
        /!*}*!/
      }
    }*/

    /*changeFavPage()*/
  }

