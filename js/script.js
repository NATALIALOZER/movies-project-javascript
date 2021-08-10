(function() {
    "use strict";

    function Pagination() {

      const numOfFilms = 1080;
    //  getting buttons from DOM
      const firstButton = document.getElementById('button_first');
      const prevButton = document.getElementById('button_prev');
      const nextButton = document.getElementById('button_next');
      const lastButton = document.getElementById('button_last');
      const clickPageNumber = document.querySelectorAll('.clickPageNumber');
     
     
      let current_page = 1;
      let records_per_page = 20; 
      
      this.init = function() {
          changePage(1);
          pageNumbers();
          selectedPage();
          clickPage();
          addEventListeners();
     }
      
    //catch paggination buttons click
      let addEventListeners = function() {
          firstButton.addEventListener('click', firstPage);
          prevButton.addEventListener('click', prevPage);
          nextButton.addEventListener('click', nextPage);
          lastButton.addEventListener('click', lastPage);   
      }
            
      let selectedPage = function() {
          let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber'); 
      }  
      
    //  change button opacity deppending on choosen page
      let checkButtonOpacity = function() {
        current_page == 1 ? firstButton.classList.add('opacity') : firstButton.classList.remove('opacity');
        current_page == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
        current_page == numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
        current_page == numPages() ? lastButton.classList.add('opacity') : lastButton.classList.remove('opacity');
      }

      let changePage = async function(page) {
        const listingTable = document.getElementById('listingTable');

        if (page < 1) {
            page = 1;
        } 
        if (page > (numPages() -1)) {
            page = numPages();
        }
      
        //reciving data from movie database depending on choosen page
        let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=ebea8cfca72fdff8d2624ad7bbf78e4c&language=en-US&page=${current_page}`)

        let content = await response.json();
        content = content.results

        //recives poster from each object and create img tag and push it to html
        let key;
        
        for (key in content){
          
          listingTable.innerHTML = "";

          for(var i = 0; i < records_per_page && i < content.length; i++) {
            listingTable.innerHTML += `<img class='objectBlock' src='http://image.tmdb.org/t/p/w342${content[i].poster_path}'></div>`;
          }
          checkButtonOpacity();
          selectedPage();
        }
      }

    //   переход на первую, если она не выбрана
      let firstPage = function() {
        if(current_page != 1) {
            current_page=1;
            changePage(current_page);
        }
      }

    //   позволить переход на предыдущую, если это не первая
      let prevPage = function() {
          if(current_page > 1) {
              current_page--;
              changePage(current_page);
          }
      }

    //   позволить переход на следующую, если это не последняя
      let nextPage = function() {
          if(current_page < numPages()) {
              current_page++;
              changePage(current_page);
          } 
      }

    //   переход на последнюю, если она не выбрана
      let lastPage = function() {
        if(current_page != numPages()) {
            current_page=numPages();
            changePage(current_page);
        } 
    }

      let clickPage = function() {
          document.addEventListener('click', function(e) {
              if(e.target.nodeName == "SPAN" && e.target.classList.contains("clickPageNumber")) {
                  current_page = e.target.textContent;
                  changePage(current_page);
              }
          });
      }

    //   need to change this function, the last page number should be "..."
      let pageNumbers = function() {
          let pageNumber = document.getElementById('page_number');
              pageNumber.innerHTML = "";
          
            
          for(let i = 1; i < numPages() + 1; i++) {
              pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
          }
      }

      //calculating num of pages depend on movies numbers and needed amount on the one page
      let numPages = function() {
          return Math.ceil(numOfFilms / records_per_page);  
      }
   }
  let pagination = new Pagination();
  pagination.init();
})();
