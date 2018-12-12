app.controller('homeController', function ($window, $location, $anchorScroll) {
    var vm = this;
    vm.title = 'Home';

    vm.currentSection = '';


    vm.goToSection = function (hash) {
        vm.currentSection = hash;
        $location.hash(hash);
        $anchorScroll();
    }
});