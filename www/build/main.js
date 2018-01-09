webpackJsonp([0],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_DataService__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailsPage = (function () {
    function DetailsPage(navCtrl, navParams, dataService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        var navItem = this.navParams.get('item');
        if (navItem) {
            this.title = "Edit";
            this.item = navItem;
        }
        else {
            this.title = "New";
            this.item = { 'data': {} };
        }
    }
    DetailsPage.prototype.logForm = function () {
        var item = this.item;
        this.item = { 'data': {} };
        if (item.id) {
            this.dataService.update(item);
            this.navCtrl.pop();
        }
        else {
            this.dataService.save(item);
            this.navCtrl.parent.select(0);
        }
        ;
    };
    DetailsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-details',template:/*ion-inline-start:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/pages/details/details.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <form (ngSubmit)="logForm()">\n        <ion-item>\n            <ion-label color="primary" floating>Name</ion-label>\n            <ion-input type="text" [(ngModel)]="item.data.name" name="name" placeholder=""></ion-input>\n        </ion-item>\n        <button ion-button type="submit" block>Save</button>\n    </form>\n</ion-content>'/*ion-inline-end:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/pages/details/details.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_DataService__["a" /* DataService */]])
    ], DetailsPage);
    return DetailsPage;
}());

//# sourceMappingURL=details.js.map

/***/ }),

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DataService = (function () {
    function DataService() {
        var _this = this;
        this.unwrapList = function (r) {
            var result = [];
            console.log('unwrapList', r);
            for (var i in r) {
                result.push(_this.unwrap(r[i], i));
            }
            return result.reverse();
        };
        this.unwrap = function (obj, id) {
            obj.id = id;
            obj.moment = __WEBPACK_IMPORTED_MODULE_1_moment__(obj.data.created).fromNow();
            return obj;
        };
        this.promiseWrap = function (block) {
            return new Promise(function (resolve, reject) {
                var success = function (r) {
                    resolve(r);
                };
                var fail = function (code, msg) {
                    console.log("error msg" + msg);
                    console.log("error code " + code);
                    reject(msg);
                };
                block(success, fail);
            });
        };
        this.init = function () {
            __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].init({
                "sync_frequency": 10,
                "do_console_log": true,
                "storage_strategy": "dom"
            });
            var datasetId = _this.datasetId;
            var option = _this.option;
            var unwrapList = _this.unwrapList;
            var syncData = _this.syncData;
            return new Promise(function (resolve, reject) {
                var success = function (r) {
                    console.log('success', r);
                    var result = unwrapList(r);
                    syncData.emit(result);
                    // $rootScope.$emit('sync', result);
                    resolve(result);
                };
                var fail = function (error) {
                    console.log("error " + error);
                    console.log("error source " + error.source);
                    console.log("error target " + error.target);
                    reject(error);
                };
                __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].manage(datasetId, option, {}, {}, function () {
                    console.log('dataset ' + datasetId + ' is now managed by sync');
                });
                __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].notify(function (notification) {
                    if ('sync_complete' == notification.code) {
                        console.log('sync_coplete', datasetId);
                        __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].doList(datasetId, success, fail);
                    }
                    else if ('local_update_applied' === notification.code) {
                        console.log('local_update_applied', datasetId);
                        __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].doList(datasetId, success, fail);
                    }
                    else if ('remote_update_failed' === notification.code) {
                        var errorMsg = notification.message ? notification.message.msg ? notification.message.msg : undefined : undefined;
                        fail(errorMsg);
                    }
                });
            });
        };
        this.deleteItem = function (item) {
            var datasetId = _this.datasetId;
            return _this.promiseWrap(function (success, fail) {
                __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].doDelete(datasetId, item.id, success, fail);
            });
        };
        this.getItem = function (id) {
            var datasetId = _this.datasetId;
            var self = _this;
            return _this.promiseWrap(function (success, fail) {
                __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].doRead(datasetId, id, function (r) {
                    success(self.unwrap(r, id));
                }, fail);
            });
        };
        this.update = function (item) {
            var datasetId = _this.datasetId;
            return _this.promiseWrap(function (success, fail) {
                __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].doUpdate(datasetId, item.id, item.data, success, fail);
            });
        };
        this.save = function (item) {
            item.data.created = new Date().getTime();
            var datasetId = _this.datasetId;
            return _this.promiseWrap(function (success, fail) {
                __WEBPACK_IMPORTED_MODULE_2_fh_js_sdk__["sync"].doCreate(datasetId, item.data, success, fail);
            });
        };
        this.syncData = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.datasetId = "ShoppingList";
        this.option = {
            "sync_frequency": 30
        };
    }
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DataService);
    return DataService;
}());

//# sourceMappingURL=DataService.js.map

/***/ }),

/***/ 112:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 112;

/***/ }),

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main_main__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__details_details__ = __webpack_require__(100);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_1__main_main__["a" /* MainPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_2__details_details__["a" /* DetailsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/pages/tabs/tabs.html"*/'<ion-tabs>\n    <ion-tab [root]="tab1Root" tabTitle="Items" tabIcon="md-list"></ion-tab>\n    <ion-tab [root]="tab2Root" tabTitle="New" [rootParams]="item" tabIcon="md-add"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__details_details__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_DataService__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MainPage = (function () {
    function MainPage(navCtrl, dataService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.dataService = dataService;
        this.dataService.init();
        this.subscription = this.dataService.syncData.subscribe(function (data) {
            return _this.onDataSync(data);
        });
    }
    MainPage.prototype.onDataSync = function (items) {
        console.log(items);
        this.items = items;
    };
    MainPage.prototype.onItem = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__details_details__["a" /* DetailsPage */], {
            item: item
        });
    };
    MainPage.prototype.removeItem = function (item) {
        this.dataService.deleteItem(item);
    };
    MainPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-main',template:/*ion-inline-start:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/pages/main/main.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Sync Demo\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-card>\n\n        <ion-list>\n            <ion-item-sliding *ngFor="let item of items">\n                <ion-item (click)="onItem(item)">\n                    {{item.data?.name}}\n                    <p>{{item.id}}</p>\n                    <ion-note item-end>\n                        {{item.moment}}\n                    </ion-note>\n                </ion-item>\n                <ion-item-options side="right">\n                    <!-- <button danger (click)="dragAndDrop()" ion-button><ion-icon name="trash"></ion-icon> Delete</button> -->\n                    <button danger (click)="removeItem(item)" ion-button color="danger"><ion-icon name="trash"></ion-icon> Delete</button>\n                </ion-item-options>\n            </ion-item-sliding>\n        </ion-list>\n    </ion-card>\n\n</ion-content>'/*ion-inline-end:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/pages/main/main.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__providers_DataService__["a" /* DataService */]])
    ], MainPage);
    return MainPage;
}());

//# sourceMappingURL=main.js.map

/***/ }),

/***/ 318:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(319);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(342);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_details_details__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_main_main__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_DataService__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// Services

var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_main_main__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_details_details__["a" /* DetailsPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_main_main__["a" /* MainPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__providers_DataService__["a" /* DataService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(197);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/terry/Gov/rhmap/ionic2-sync-git/ionic2-sync-app/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 395:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 199,
	"./af.js": 199,
	"./ar": 200,
	"./ar-dz": 201,
	"./ar-dz.js": 201,
	"./ar-kw": 202,
	"./ar-kw.js": 202,
	"./ar-ly": 203,
	"./ar-ly.js": 203,
	"./ar-ma": 204,
	"./ar-ma.js": 204,
	"./ar-sa": 205,
	"./ar-sa.js": 205,
	"./ar-tn": 206,
	"./ar-tn.js": 206,
	"./ar.js": 200,
	"./az": 207,
	"./az.js": 207,
	"./be": 208,
	"./be.js": 208,
	"./bg": 209,
	"./bg.js": 209,
	"./bm": 210,
	"./bm.js": 210,
	"./bn": 211,
	"./bn.js": 211,
	"./bo": 212,
	"./bo.js": 212,
	"./br": 213,
	"./br.js": 213,
	"./bs": 214,
	"./bs.js": 214,
	"./ca": 215,
	"./ca.js": 215,
	"./cs": 216,
	"./cs.js": 216,
	"./cv": 217,
	"./cv.js": 217,
	"./cy": 218,
	"./cy.js": 218,
	"./da": 219,
	"./da.js": 219,
	"./de": 220,
	"./de-at": 221,
	"./de-at.js": 221,
	"./de-ch": 222,
	"./de-ch.js": 222,
	"./de.js": 220,
	"./dv": 223,
	"./dv.js": 223,
	"./el": 224,
	"./el.js": 224,
	"./en-au": 225,
	"./en-au.js": 225,
	"./en-ca": 226,
	"./en-ca.js": 226,
	"./en-gb": 227,
	"./en-gb.js": 227,
	"./en-ie": 228,
	"./en-ie.js": 228,
	"./en-nz": 229,
	"./en-nz.js": 229,
	"./eo": 230,
	"./eo.js": 230,
	"./es": 231,
	"./es-do": 232,
	"./es-do.js": 232,
	"./es-us": 233,
	"./es-us.js": 233,
	"./es.js": 231,
	"./et": 234,
	"./et.js": 234,
	"./eu": 235,
	"./eu.js": 235,
	"./fa": 236,
	"./fa.js": 236,
	"./fi": 237,
	"./fi.js": 237,
	"./fo": 238,
	"./fo.js": 238,
	"./fr": 239,
	"./fr-ca": 240,
	"./fr-ca.js": 240,
	"./fr-ch": 241,
	"./fr-ch.js": 241,
	"./fr.js": 239,
	"./fy": 242,
	"./fy.js": 242,
	"./gd": 243,
	"./gd.js": 243,
	"./gl": 244,
	"./gl.js": 244,
	"./gom-latn": 245,
	"./gom-latn.js": 245,
	"./gu": 246,
	"./gu.js": 246,
	"./he": 247,
	"./he.js": 247,
	"./hi": 248,
	"./hi.js": 248,
	"./hr": 249,
	"./hr.js": 249,
	"./hu": 250,
	"./hu.js": 250,
	"./hy-am": 251,
	"./hy-am.js": 251,
	"./id": 252,
	"./id.js": 252,
	"./is": 253,
	"./is.js": 253,
	"./it": 254,
	"./it.js": 254,
	"./ja": 255,
	"./ja.js": 255,
	"./jv": 256,
	"./jv.js": 256,
	"./ka": 257,
	"./ka.js": 257,
	"./kk": 258,
	"./kk.js": 258,
	"./km": 259,
	"./km.js": 259,
	"./kn": 260,
	"./kn.js": 260,
	"./ko": 261,
	"./ko.js": 261,
	"./ky": 262,
	"./ky.js": 262,
	"./lb": 263,
	"./lb.js": 263,
	"./lo": 264,
	"./lo.js": 264,
	"./lt": 265,
	"./lt.js": 265,
	"./lv": 266,
	"./lv.js": 266,
	"./me": 267,
	"./me.js": 267,
	"./mi": 268,
	"./mi.js": 268,
	"./mk": 269,
	"./mk.js": 269,
	"./ml": 270,
	"./ml.js": 270,
	"./mr": 271,
	"./mr.js": 271,
	"./ms": 272,
	"./ms-my": 273,
	"./ms-my.js": 273,
	"./ms.js": 272,
	"./mt": 274,
	"./mt.js": 274,
	"./my": 275,
	"./my.js": 275,
	"./nb": 276,
	"./nb.js": 276,
	"./ne": 277,
	"./ne.js": 277,
	"./nl": 278,
	"./nl-be": 279,
	"./nl-be.js": 279,
	"./nl.js": 278,
	"./nn": 280,
	"./nn.js": 280,
	"./pa-in": 281,
	"./pa-in.js": 281,
	"./pl": 282,
	"./pl.js": 282,
	"./pt": 283,
	"./pt-br": 284,
	"./pt-br.js": 284,
	"./pt.js": 283,
	"./ro": 285,
	"./ro.js": 285,
	"./ru": 286,
	"./ru.js": 286,
	"./sd": 287,
	"./sd.js": 287,
	"./se": 288,
	"./se.js": 288,
	"./si": 289,
	"./si.js": 289,
	"./sk": 290,
	"./sk.js": 290,
	"./sl": 291,
	"./sl.js": 291,
	"./sq": 292,
	"./sq.js": 292,
	"./sr": 293,
	"./sr-cyrl": 294,
	"./sr-cyrl.js": 294,
	"./sr.js": 293,
	"./ss": 295,
	"./ss.js": 295,
	"./sv": 296,
	"./sv.js": 296,
	"./sw": 297,
	"./sw.js": 297,
	"./ta": 298,
	"./ta.js": 298,
	"./te": 299,
	"./te.js": 299,
	"./tet": 300,
	"./tet.js": 300,
	"./th": 301,
	"./th.js": 301,
	"./tl-ph": 302,
	"./tl-ph.js": 302,
	"./tlh": 303,
	"./tlh.js": 303,
	"./tr": 304,
	"./tr.js": 304,
	"./tzl": 305,
	"./tzl.js": 305,
	"./tzm": 306,
	"./tzm-latn": 307,
	"./tzm-latn.js": 307,
	"./tzm.js": 306,
	"./uk": 308,
	"./uk.js": 308,
	"./ur": 309,
	"./ur.js": 309,
	"./uz": 310,
	"./uz-latn": 311,
	"./uz-latn.js": 311,
	"./uz.js": 310,
	"./vi": 312,
	"./vi.js": 312,
	"./x-pseudo": 313,
	"./x-pseudo.js": 313,
	"./yo": 314,
	"./yo.js": 314,
	"./zh-cn": 315,
	"./zh-cn.js": 315,
	"./zh-hk": 316,
	"./zh-hk.js": 316,
	"./zh-tw": 317,
	"./zh-tw.js": 317
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 395;

/***/ })

},[318]);
//# sourceMappingURL=main.js.map