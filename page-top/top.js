let g_userDevice = "pc";

$(function() {
  if (window.matchMedia("(pointer: coarse)").matches) g_userDevice = "mobile";


  $.get("../components/recommended-menu/recommended-menu.html", function(html) {
    $(".js-main").append(html);

    recommendedMenu_drag();
    recommendedMenu_btnAction();
    recommendedMenu_standbyItem();
  });
});