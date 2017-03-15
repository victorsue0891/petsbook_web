var myApp = new Framework7({
    // Default title for modals
    modalTitle: 'My App',

    // If it is webapp, we can enable hash navigation:
    pushState: true,

    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }
});


/* Initialize views */
var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
})
var anotherView = myApp.addView('.another-view');
