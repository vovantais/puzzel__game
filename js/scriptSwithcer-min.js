const select_feild=document.querySelector(".selection"),choose_field_btn=document.querySelector(".choose-field"),fieldSelection=document.getElementById("fieldSelection"),dices=document.querySelectorAll(".dice"),game_board=document.querySelector(".game-board");if(size=localStorage.getItem("SIZE"),choose_field_btn.addEventListener("click",e=>{e.preventDefault();let s=select_feild.options[select_feild.selectedIndex].value;"3x3"!==s&&"4x4"!==s&&"5x5"!==s||(localStorage.setItem("SIZE",s),location.href="")}),"3x3"===size){const e=document.createElement("script");e.src="./js/script3x3-min.js",fieldSelection.append(e),game_board.classList.add("small"),makeSmallField()}else if("5x5"===size){game_board.classList.remove("small");const e=document.createElement("script");e.src="./js/script5x5-min.js",fieldSelection.append(e),game_board.classList.add("big"),makeBigField()}else{(game_board.classList.contains("small")||game_board.classList.contains("big"))&&(game_board.classList.remove("small"),game_board.classList.remove("big")),claerField();const e=document.createElement("script");e.src="./js/script4x4-min.js",fieldSelection.append(e)}function makeSmallField(){for(let e=0;e<dices.length;e++)dices[e].classList.contains("field-big")&&dices[e].classList.remove("field-big"),e<=8&&dices[e].classList.add("field-small"),e>=9&&dices[e].classList.add("hidden")}function makeBigField(){for(let e=0;e<dices.length;e++)(dices[e].classList.contains("field-small")||dices[e].classList.contains("hidden")||dices[e].classList.contains("big"))&&(dices[e].classList.remove("field-small"),dices[e].classList.remove("hidden"),dices[e].classList.remove("big"))}function claerField(){for(let e=0;e<dices.length;e++)(dices[e].classList.contains("field-small")||dices[e].classList.contains("hidden")||dices[e].classList.contains("field-big"))&&(dices[e].classList.remove("field-small"),dices[e].classList.remove("hidden"),dices[e].classList.remove("field-big"))}