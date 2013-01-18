'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Testing PWC', function() {

  describe('Home', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/home.html');
    });


    it('should render Lydia from the Angularjs controller', function() {
      expect(element('h4').text()).
        toMatch("Hello Lydia, welcome to LinkAge. ");
      //pause();
    });

  });

  describe('Projects', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/projects.html');
    });


    it('should render FYP in first table row', function() {
      expect(element('.proj:nth-child(2) td:nth-child(2)').text()).
        toMatch("FYP");
      //pause();
    });

    it('should render PWC in second table row', function() {
      expect(element(':nth-child(4) td:nth-child(2)').text()).
        toMatch("PWC");
    });

  });


  describe('Message', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/message.html');
    });


    it('should render Lydia as first name in the table', function() {
      expect(element('tr:nth-child(1) td').text()).
        toMatch("Lydia");
        //pause();
    });

  });

  describe('Add Project', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/add_project.html');
    });


    it('should ...', function() {
      //expect(element('tr:nth-child(1) td').text()).
      //  toMatch("Lydia");
      //pause();
    });

  });

  describe('Data Analysis', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/dataAnalysis.html');
    });


    it('should .....', function() {
      //expect(element('tr:nth-child(1) td').text()).
      //  toMatch("Lydia");
      //pause();
    });

  });

  describe('Report', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/report.html');
    });


    it('should .....', function() {
      //expect(element('tr:nth-child(1) td').text()).
      //  toMatch("Lydia");
      //pause();
    });

  });

  describe('Skillset', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/skillset.html');
    });


    it('should .....', function() {
      //expect(element('tr:nth-child(1) td').text()).
      //  toMatch("Lydia");
    });

  });

  describe('Trending', function() {

    beforeEach(function() {
      browser().navigateTo('../../app/trending.html');
    });


    it('should .....', function() {
      //expect(element('tr:nth-child(1) td').text()).
      //  toMatch("Lydia");
      //pause();
    });

  });

});
