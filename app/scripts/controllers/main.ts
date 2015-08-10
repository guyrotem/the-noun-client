/// <reference path="../../../reference.ts" />
'use strict';

class MainController {
  public searchQuery: string;
  public searchResults: string[];

  private isError: boolean;

  /* @ngInject */
  constructor(private $http: ng.IHttpService, private $log: ng.ILogService) {
    this.searchQuery = '';
  }

  submitSearch() {
    this.searchResults = [];
    this.isError = false;

    let queryParams = {
      q: this.searchQuery
    };

    //this.$http.get('/_api/', {params: queryParams})
    this.$http.post('/_api/', queryParams)
    .then((response: any) => {
        this.$log.debug(response.data);
        this.searchResults = response.data.searchResults;
      })
    .catch((response) => {
        this.isError = true;
        this.$log.debug('failed!');
      });
  }

  getResultsPreview() {
    return this.searchResults;
  }

  isSearchError() {
    return this.isError;
  }
}

angular
  .module('iconsProjectAppInternal')
  .controller('MainController', MainController);
