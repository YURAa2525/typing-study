

// ----------------------------------------------
// screen__frame の clip-path で参照する svg 値の設定
// ----------------------------------------------
function recommendedMenu_setClipSVG() {
  const $screen      = $(".recommended-menu .js-screen");
  const screenWidth  = $screen.width();
  const screenHeight = $screen.height();
  
  // 内周の border-radisu (半径)
  const insideRadius = 3;

  // 外周 (反時計回り) と 内周 (時計回り) を逆方向にすることで、このﾊﾟｽは穴開き扱いになる 
  $(".recommended-menu .js-path").attr(
    "d",
    `M0,0 
     L0,${screenHeight} 
     L${screenWidth},${screenHeight} 
     L${screenWidth},0 
     Z

     M4,4
     L${screenWidth - 4},4 
     L${screenWidth - 4},${screenHeight - 4 - insideRadius}
     A${insideRadius} ${insideRadius} 0 0 1 ${screenWidth - 4 - insideRadius},${screenHeight - 4}
     L${4 + insideRadius},${screenHeight - 4}
     A${insideRadius} ${insideRadius} 0 0 1 4,${screenHeight - 4 -insideRadius} 
     Z`
  );
}


// ----------------------------------------------
// js-drag 上のﾄﾞﾗｯｸﾞで js-recommended-menu を動かす 
// ----------------------------------------------
function recommendedMenu_drag() {
  $(".recommended-menu").on("pointerdown", ".js-drag", function(eDown) {
    const $menu = $(".js-recommended-menu");
    const diffX = eDown.clientX - $menu.position().left;
    const diffY = eDown.clientY - $menu.position().top;

    eDown.target.setPointerCapture(eDown.pointerId);

    $(window).on("pointermove.drag", function(eMove) {
      const moveX = eMove.clientX - diffX;
      const moveY = eMove.clientY - diffY;

      $menu.css({
        "top" : moveY + "px",
        "left": moveX + "px",
      });
    });

    $(window).on("pointerup.drag", function() {
      eDown.target.releasePointerCapture(eDown.pointerId);

      $(window).off(".drag");
    });
  });
}


// ----------------------------------------------
// js-header__btn に紐づく data値 ごとの処理
// ----------------------------------------------
function recommendedMenu_btnAction() {
  $(".recommended-menu").on("pointerdown", ".js-header__btn", function(eDown) {
    const btnType = $(this).data("btn");
    const eDownX  = eDown.clientX;
    const eDownY  = eDown.clientY;

    $(window).on("pointerup.up", function(eUp) {
      if ((eUp.clientX == eDownX) && (eUp.clientY == eDownY)) {
        if (btnType == "scale") {
          $(".js-recommended-menu").toggleClass("is-small");
        }
        else if (btnType == "close") {
          $(".js-recommended-menu").addClass("is-hide");
        }
      }

      $(window).off(".up");
    });    
  });
}