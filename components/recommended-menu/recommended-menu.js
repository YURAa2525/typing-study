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
// js-pickup-list__item に is-stand 状態を付与 / 既に is-stand 状態であればﾍﾟｰｼﾞ移動
// ----------------------------------------------
function recommendedMenu_standbyItem() {
  $(".recommended-menu")
    .on("pointerenter", ".js-pickup-list__item", function() {
      if (g_userDevice == "pc") $(this).addClass("is-stand");
    })

    .on("pointerleave", ".js-pickup-list__item", function() {
      if (g_userDevice == "pc") $(this).removeClass("is-stand");
    });


  $(document).on("click", function(eClick) {
    if ($(eClick.target).closest(".js-pickup-list__item").length) {
      const $el = $(eClick.target).closest(".js-pickup-list__item");
      
      if ($el.hasClass("is-stand") == false) {
        $(".js-pickup-list__item").removeClass("is-stand");
        $el.addClass("is-stand");
      }
      else {
        console.log("ﾍﾟｰｼﾞ移動");
      }
    }
    else {
      $(".js-pickup-list__item").removeClass("is-stand");
    }
  });
}