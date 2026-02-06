// ----------------------------------------------
// js-drag 上のﾄﾞﾗｯｸﾞで js-recommended-menu を動かす 
// ----------------------------------------------
function recommendedMenu_drag() {
  $(".recommended-menu").on("pointerdown", ".js-drag", function(eDown) {
    const $menu = $(".js-recommended-menu");
    const diffX = eDown.clientX - $menu.position().left;
    const diffY = eDown.clientY - $menu.position().top;

    $(window)
      .on("pointermove.drag", function(eMove) {
        const moveX = eMove.clientX - diffX;
        const moveY = eMove.clientY - diffY;

        $menu.css({
          "top" : moveY + "px",
          "left": moveX + "px",
        });
      })

      .on("pointerup.drag", function() {
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
          $(".js-header__btn[data-btn='scale']").toggleClass("is-square");
        }
        else if (btnType == "close") {
          $(".js-recommended-menu").addClass("is-hide");
        }
      }

      $(window).off(".up");
    });    
  });
}


// ----------------------------------------------
// 
// ----------------------------------------------
function recommendedMenu_standbyItem() {
  let isStand = false;
  
  $(".recommended-menu")
    .on("pointerenter", ".js-pickup-list__item", function() {
      if (g_userDevice == "pc") $(this).addClass("is-stand");

      console.log("bbb");
    })

    .on("pointerleave", ".js-pickup-list__item", function() {
      if (g_userDevice == "pc") $(this).removeClass("is-stand");
    });


  

  // $(".recommended-menu").on("click", ".js-pickup-list__item", function() {
  //   if ($(this).hasClass("is-stand") == false) {
  //     $(".js-pickup-list__item").removeClass("is-stand");
  //     $(this).addClass("is-stand");
  //   }
  //   else {
  //     console.log("aa");
  //   }

  // // pc版はいい感じだけど、スマホ版で、stand判定ではないのに検知してしまう   


  // });
}

// ★ ｲﾍﾞﾝﾄの中にｲﾍﾞﾝﾄを登録 + off() で解除する場合と、
//    ｲﾍﾞﾝﾄの中にｲﾍﾞﾝﾄを登録してはいけない (直近の 61行目 と 65行目) 場合の区別が知りたい