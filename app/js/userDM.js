//var myApp = angular.module('app', ['ngResource']);

var myApp = angular.module('myApp', ['ngResource','ngMockE2E']);

myApp.run(function($httpBackend) {

	var users = {"count":2,"model":[{"username": "Peter", "password": "1234"},{"username": "Mary", "password": "1234"}]};
  

	$httpBackend.whenGET('/user').respond(users); 

});