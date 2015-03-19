'use strict';

angular.module('myApp.view2', ['ngRoute'])

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
        $scope.getEvens = function () {

            $http.get('http://localhost:4567/events?band=acdc').
                success(function (data, status, headers, config) {
                    //console.log(data);
                    $scope.events = data;
                    angular.forEach(data, function (value, key) {
                        console.log(value);

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
        $scope.searchTicket = function(city, date){

            $http.get('http://localhost:4567/tickets?city=' + city + '&date=' + date).
                success(function (data, status, headers, config) {
                    //console.log(data);

                });

        };
    }]);


/*
* current JSON example of event from seatgeek
*
* "{"links":[],"id":2471323,"stats":{"listing_count":0,"average_price":null,"lowest_price":null,"highest_price":null},"title":"Acdc","announce_date":"2015-01-10T00:00:00","score":0.53177,"date_tbd":false,"type":"concert","datetime_local":"2015-06-28T20:00:00","visible_until_utc":"2015-06-28T23:00:00","time_tbd":false,"taxonomies":[{"parent_id":null,"id":2000000,"name":"concert"}],"performers":[{"stats":{"event_count":2},"name":"Acdc","short_name":"Acdc","url":"https://seatgeek.com/acdc-tickets","type":"band","image":"https://chairnerd.global.ssl.fastly.net/images/performers-landscape/acdc-74e564/145510/huge.jpg","home_venue_id":null,"primary":true,"score":0,"images":{"huge":"https://chairnerd.global.ssl.fastly.net/images/performers-landscape/acdc-74e564/145510/huge.jpg"},"slug":"acdc","taxonomies":[{"parent_id":null,"id":2000000,"name":"concert"}],"has_upcoming_events":true,"id":145510}],"url":"https://seatgeek.com/acdc-tickets/glasgow-hampden-park-2015-06-28-8-pm/concert/2471323/","created_at":"2015-01-10T00:00:00","venue":{"city":"Glasgow","name":"Hampden Park","extended_address":"Glasgow, UK","url":"https://seatgeek.com/venues/hampden-park/tickets/","country":"UK","display_location":"Glasgow, UK","links":[],"slug":"hampden-park","state":"Glg","score":0.60772,"postal_code":"G42 9BA","location":{"lat":55.8259,"lon":-4.252},"address":"","timezone":"Europe/London","id":37850},"short_title":"Acdc","datetime_utc":"2015-06-28T19:00:00","datetime_tbd":false}"
*
* */