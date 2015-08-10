/// <reference path="../../reference.ts" />
'use strict';

angular.module('iconsProjectAppMocks', ['ngMockE2E'])
  .run(function ($httpBackend) {
    let responseData = {
      urls: []
    };

    //    $httpBackend.whenGET(/^\/_api/)
    //      .respond((method: string, url: string, data, headers) => {
    //        return [200, responseData, {}, 'OK'];
    //      });

    $httpBackend.whenPOST(/^\/_api/)
      .respond((method: string, url: string, data) => {
        var jData = JSON.parse(data);
        responseData.urls = ['http://cdn.sstatic.net/stackoverflow/img/favicon.ico'];
        if (!jData.q) {
          return [200, {urls: []}, {}, 'OK'];
        } else {
          responseData.urls.push('http://www.' + jData.q + '.com/favicon.ico');
          return [200, responseData, {}, 'OK'];
        }
      });

    $httpBackend.whenGET(/.*/).passThrough();
    $httpBackend.whenPOST(/.*/).passThrough();
    $httpBackend.whenPUT(/.*/).passThrough();
    $httpBackend.whenDELETE(/.*/).passThrough();
  });
