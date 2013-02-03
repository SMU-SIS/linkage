//var myApp = angular.module('app', ['ngResource']);

var myApp = angular.module('myApp', ['ngResource','ngMockE2E']);

myApp.run(function($httpBackend) {

	var users = {"count":2,"entities":[{"fullname": "Peter Lim", "username": "Peter", "password": "1234", "role": "manager"},{"fullname": "Mary Ho", "username": "Mary", "password": "1234", "role": "member"}]};
  

	$httpBackend.whenGET('/user').respond(users); 

});