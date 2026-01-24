$(function() {
  $(".js-main").load("../components/recommended-menu/recommended-menu.html", function(_, status) {
    if (status == "error") return;

    recommendedMenu_setClipSVG();
    recommendedMenu_drag();
    recommendedMenu_btnAction();
  });
});