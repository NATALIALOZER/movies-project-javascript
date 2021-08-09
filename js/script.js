(function() {
    "use strict";

    function Pagination() {
      
       const objJson = [
          { adName: "adName 1"},
          { adName: "adName 2"},
          { adName: "adName 3"},
          { adName: "adName 4"},
          { adName: "adName 5"},
          { adName: "adName 6"},
          { adName: "adName 7"},
          { adName: "adName 8"},
          { adName: "adName 9"},
          { adName: "adName 10"},
          { adName: "adName 11"},
          { adName: "adName 12"},
          { adName: "adName 13"},
          { adName: "adName 14"},
          { adName: "adName 15"},
          { adName: "adName 16"},
          { adName: "adName 17"},
          { adName: "adName 18"},
          { adName: "adName 19"},
          { adName: "adName 20"},
          { adName: "adName 21"},
          { adName: "adName 22"},
          { adName: "adName 23"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"},
          { adName: "adName n"}
      ];


    //   Получаем button по классу из дом
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
      
      let addEventListeners = function() {
          firstButton.addEventListener('click', firstPage);
          prevButton.addEventListener('click', prevPage);
          nextButton.addEventListener('click', nextPage);
          lastButton.addEventListener('click', lastPage);   
      }
            
      let selectedPage = function() {
          let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber'); 
      }  
      
    //  изменение прозрачности кнопок в зависимости от выбраной странницы
      let checkButtonOpacity = function() {
        current_page == 1 ? firstButton.classList.add('opacity') : firstButton.classList.remove('opacity');
        current_page == 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
        current_page == numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
        current_page == numPages() ? lastButton.classList.add('opacity') : lastButton.classList.remove('opacity');
      }

      let changePage = function(page) {
          const listingTable = document.getElementById('listingTable');

          if (page < 1) {
              page = 1;
          } 
          if (page > (numPages() -1)) {
              page = numPages();
          }
       
          listingTable.innerHTML = "";

          for(var i = (page -1) * records_per_page; i < (page * records_per_page) && i < objJson.length; i++) {
              listingTable.innerHTML += "<div class='objectBlock'>" + objJson[i].adName + "</div>";
          }
          checkButtonOpacity();
          selectedPage();
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

    //   change this function, the last page number should be "..."
      let pageNumbers = function() {
          let pageNumber = document.getElementById('page_number');
              pageNumber.innerHTML = "";
          
          for(let i = 1; i < numPages() + 1; i++) {
              pageNumber.innerHTML += "<span class='clickPageNumber'>" + i + "</span>";
          }
      }

      let numPages = function() {
          return Math.ceil(objJson.length / records_per_page);  
      }
   }
  let pagination = new Pagination();
  pagination.init();
})();
