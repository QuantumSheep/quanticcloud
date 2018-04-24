const quanticCloud = angular.module('quanticCloud', []);

const explorerHistory = [];

quanticCloud.controller('Explorer', ($scope, $http) => {
    let isMenuActive = false;
    $scope.currentlocation = window.location.pathname.replace(/\/*explorer\/*/gi, '');

    $scope.explore = (dir, updateHistory = true, e = null) => {
        if(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (dir) {
            console.log(`explorer${dir}`);

            if(updateHistory) {
                history.pushState({
                    "pageTitle": document.title
                }, "", `explorer${dir}`);
    
                explorerHistory.push($scope.currentlocation);
    
                $scope.currentlocation = dir;
            }

            $http.get(`/get/${dir.replace(/\/*explorer\/*/gi, '')}`).then(response => {
                if (Array.isArray(response.data)) {
                    $scope.files = response.data;
                } else {
                    $scope.files = null;
                    $scope.filedata = response.data;
                }
            });
        }
    }

    $scope.explore(window.location.pathname, false);

    $http.get(`/get`).then(response => {
        $scope.tree = response.data;
    });

    document.getElementById("explorer").addEventListener('contextmenu', e => {
        if (isMenuActive) {
            isMenuActive = false;
            document.getElementById("rmenu").classList.add("hide");
        } else {
            isMenuActive = true;
            document.getElementById("rmenu").classList.remove("hide");
            document.getElementById("rmenu").style.top = mouseY(e) + 'px';
            document.getElementById("rmenu").style.left = mouseX(e) + 'px';
        }

        e.preventDefault();
    }, false);

    document.addEventListener('click', e => {
        if (isMenuActive) {
            isMenuActive = false;
            document.getElementById("rmenu").classList.add("hide");

            e.preventDefault();
        }
    }, false);

    function mouseX(evt) {
        if (evt.pageX) {
            return evt.pageX;
        } else if (evt.clientX) {
            return evt.clientX + (document.documentElement.scrollLeft ?
                document.documentElement.scrollLeft :
                document.body.scrollLeft);
        } else {
            return null;
        }
    }

    function mouseY(evt) {
        if (evt.pageY) {
            return evt.pageY;
        } else if (evt.clientY) {
            return evt.clientY + (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop);
        } else {
            return null;
        }
    }
});

window.onpopstate = () => {
    if (explorerHistory[explorerHistory.length - 1] != null) {
        history.go(-1);
    }
};