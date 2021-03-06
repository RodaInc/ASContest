'use strict';

angular.module('myApp.view2', ['ngRoute','datePicker'])

    .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view2/view2.html',
            controller: 'View2Ctrl'
        });
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }])

    .controller('View2Ctrl', ['$scope', '$http', function ($scope, $http) {

        $scope.clientIP = '';
        $scope.events = [];
        $scope.city = "";
        $scope.country = "";
        $scope.date = "";
        $scope.adults = 1;
        $scope.children = 0;
        $scope.minstay = 1;
        $scope.maxstay = 5;
        $scope.event = "";
        $scope.search = "";
        $scope.parent = {datepickerFrom:'', datepickerTo:''};

        $scope.getEvens = function () {
            $scope.search = "";
            if ($scope.cityName){
                $scope.search = $scope.search + "&city=" + $scope.cityName.replace(" ","-");
            }

            if ($scope.eventName){
                $scope.search = $scope.search + "&band=" + $scope.eventName.replace(" ","-");
            }

            if ($scope.parent.datepickerFrom){
                $scope.start_date = $scope.parent.datepickerFrom.getFullYear() + "-" +
                                    (($scope.parent.datepickerFrom.getMonth() < 10)?"0":"") +
                                    ($scope.parent.datepickerFrom.getMonth()+1) + "-" +
                                    (($scope.parent.datepickerFrom.getDate() < 10)?"0":"") +
                                    $scope.parent.datepickerFrom.getDate();

                $scope.search = $scope.search + "&date_start=" + $scope.start_date;
            }

            if ($scope.parent.datepickerTo){
                $scope.end_date = $scope.parent.datepickerTo.getFullYear() + "-" +
                                (($scope.parent.datepickerTo.getMonth() < 10)?"0":"") +
                                ($scope.parent.datepickerTo.getMonth()+1) + "-" +
                                (($scope.parent.datepickerTo.getDate() < 10)?"0":"") +
                                $scope.parent.datepickerTo.getDate();

                $scope.search = $scope.search + "&date_end=" + $scope.end_date;
            }

            $scope.req = 'http://localhost:4567/events?'
            + $scope.search;

            console.log($scope.req);

            $http.get($scope.req).
                success(function (data, status, headers, config) {

                    $scope.events = data;

                    angular.forEach(data, function (value, key) {
                     //   console.log(value);

                        });
                    });

        };
        // get client IP
        $scope.getIP = function(){
            $http.get('http://jsonip.appspot.com/').
                success(function (data, status, headers, config) {
                    console.log(data.ip);
                    return data.ip;
                });
        };

        //Search for avia tickets request
        $scope.searchTicket = function(){
            var hotelsearch = '';
            if($scope.hotelneed){
                hotelsearch = '&hotelsearch=1';
            } else {
                hotelsearch = '&hotelsearch='
            }
            console.log($scope.maxstay);
            console.log('http://localhost:4567/tickets' +
            '?city=' + $scope.city +
            '&country=' + $scope.country +
            '&date=' + $scope.date +
            '&adults' + $scope.adults +
            '&children' + $scope.children +
            '&minstay' + $scope.minstay +
            '&maxstay' + $scope.maxstay + hotelsearch);

            $http.get('http://localhost:4567/tickets' +
                '?city=' + $scope.city +
                '&country=' + $scope.country +
                '&date=' + $scope.date +
                '&adults=' + $scope.adults +
                '&children=' + $scope.children +
                '&minstay=' + $scope.minstay +
                '&maxstay=' + $scope.maxstay + hotelsearch
            ).
                success(function (data, status, headers, config) {
                    //console.log(data);

                });

        };

        $scope.setBaseData = function (city, country, date) {
            $scope.city = city;
            $scope.country = country;
            $scope.date = date;
            console.log($scope.city);
            console.log($scope.country);
            console.log($scope.date);
        }

        $scope.getMoreInfo = function (url) {
            window.open(url);
        }
    }]);


/*
* current JSON example of event from seatgeek
*
* "{"links":[],"id":2471323,"stats":{"listing_count":0,"average_price":null,"lowest_price":null,"highest_price":null},"title":"Acdc","announce_date":"2015-01-10T00:00:00","score":0.53177,"date_tbd":false,"type":"concert","datetime_local":"2015-06-28T20:00:00","visible_until_utc":"2015-06-28T23:00:00","time_tbd":false,"taxonomies":[{"parent_id":null,"id":2000000,"name":"concert"}],"performers":[{"stats":{"event_count":2},"name":"Acdc","short_name":"Acdc","url":"https://seatgeek.com/acdc-tickets","type":"band","image":"https://chairnerd.global.ssl.fastly.net/images/performers-landscape/acdc-74e564/145510/huge.jpg","home_venue_id":null,"primary":true,"score":0,"images":{"huge":"https://chairnerd.global.ssl.fastly.net/images/performers-landscape/acdc-74e564/145510/huge.jpg"},"slug":"acdc","taxonomies":[{"parent_id":null,"id":2000000,"name":"concert"}],"has_upcoming_events":true,"id":145510}],"url":"https://seatgeek.com/acdc-tickets/glasgow-hampden-park-2015-06-28-8-pm/concert/2471323/","created_at":"2015-01-10T00:00:00","venue":{"city":"Glasgow","name":"Hampden Park","extended_address":"Glasgow, UK","url":"https://seatgeek.com/venues/hampden-park/tickets/","country":"UK","display_location":"Glasgow, UK","links":[],"slug":"hampden-park","state":"Glg","score":0.60772,"postal_code":"G42 9BA","location":{"lat":55.8259,"lon":-4.252},"address":"","timezone":"Europe/London","id":37850},"short_title":"Acdc","datetime_utc":"2015-06-28T19:00:00","datetime_tbd":false}"
*
* */

/*
*  current JSON example of AviaSales response
*
*  {"success": true, "data": {"2015-05-12":{"origin":"IEV","destination":"MUC","price":13256,"transfers":1,"airline":"KL","flight_number":1386,"departure_at":"2015-05-12T14:00:00Z","return_at":"2015-05-15T14:05:00Z","expires_at":"2015-03-26T09:27:20Z"},"2015-05-25":{"origin":"IEV","destination":"MUC","price":13435,"transfers":1,"airline":"KL","flight_number":1386,"departure_at":"2015-05-25T14:00:00Z","return_at":"2015-06-01T20:30:00Z","expires_at":"2015-03-26T14:10:18Z"}}}
*
* */