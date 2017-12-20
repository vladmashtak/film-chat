webpackJsonp([2],{

/***/ "../../../../../src async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../../../../../src async recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"ui two column divided grid\">\r\n  <div class=\"stretched row\">\r\n    <div class=\"column\">\r\n      <div class=\"ui segment\">\r\n        <form class=\"ui form\" [formGroup]=\"tokenForm\" novalidate>\r\n          <div class=\"field\">\r\n            <label>Your</label>\r\n            <input type=\"text\" name=\"YourToken\" formControlName=\"yourToken\" placeholder=\"Token\">\r\n          </div>\r\n          <div class=\"field\">\r\n            <label>Other</label>\r\n            <input type=\"text\" name=\"OtherToken\" formControlName=\"otherToken\" placeholder=\"Token\">\r\n          </div>\r\n          <button class=\"ui button\" [class.primary]=\"user === userState.SENDER\" (click)=\"createPeer(true)\">Create Sender</button>\r\n          <button class=\"ui button\" [class.primary]=\"user === userState.RECEIVER\" (click)=\"createPeer()\">Create Recipient</button>\r\n          <button class=\"ui button\" (click)=\"connect()\">Connect</button>\r\n        </form>\r\n      </div>\r\n    </div>\r\n    <div class=\"column\">\r\n      <div class=\"ui segment\">\r\n        <div class=\"field\">\r\n          <label>Other</label>\r\n          <input type=\"file\" name=\"file\" (change)=\"addFile($event, peer)\">\r\n        </div>\r\n        <video #video controls=\"true\"></video>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_simple_peer__ = __webpack_require__("../../../../simple-peer/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_simple_peer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_simple_peer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserState;
(function (UserState) {
    UserState[UserState["SENDER"] = 0] = "SENDER";
    UserState[UserState["RECEIVER"] = 1] = "RECEIVER";
})(UserState || (UserState = {}));
var AppComponent = (function () {
    function AppComponent(fb) {
        this.fb = fb;
        this.user = null;
        this.userState = UserState;
        this.peer = null;
        this.videoPlayer = null;
        this.mediaSource = new MediaSource();
        this.sourceBuffer = null;
        this.receivedByteArray = new Uint8Array(0);
        this.SIGNAL_EVENT = 'signal';
        this.CONNECT_EVENT = 'connect';
        this.DATA_EVENT = 'data';
        this.STREAM_EVENT = 'stream';
        this.ERROR_EVENT = 'error';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.createForms();
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var video = this.videoElement.nativeElement;
        video.src = URL.createObjectURL(this.mediaSource);
        this.mediaSource.addEventListener('sourceopen', function () {
            _this.sourceBuffer = _this.mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
        });
    };
    AppComponent.prototype.addFile = function (event, peer) {
        var target = event.target || event.srcElement;
        var file = target.files[0];
        var fileReader = new FileReader();
        var chunkSize = 16384;
        var sliceFile = function (offset) {
            fileReader.onload = function (e) {
                peer.send(e.target.result);
                if (file.size > offset + e.target.result.byteLength) {
                    setTimeout(sliceFile, 0, offset + chunkSize);
                }
            };
            var slice = file.slice(offset, offset + chunkSize);
            fileReader.readAsArrayBuffer(slice);
        };
        file.createRea;
        sliceFile(0);
        /*    fileReader.onload = (event: any) => {
              const arrayBuffer = event.target.result;
              const byteArray = new Uint8Array(arrayBuffer);
        
              this.peer.send(byteArray);
              video.src = URL.createObjectURL(new Blob([byteArray]));
            };
        
            fileReader.readAsArrayBuffer(target.files[0]);
            console.log('Video element: ', video.src = URL.createObjectURL(target.files[0]));*/
    };
    AppComponent.prototype.createPeer = function (initiator) {
        if (initiator === void 0) { initiator = false; }
        if (this.peer === null) {
            this.peer = new __WEBPACK_IMPORTED_MODULE_1_simple_peer__({ initiator: initiator, trickle: false, objectMode: true });
            this.user = initiator ? this.userState.SENDER : this.userState.RECEIVER;
            this.handlePeerEvent(this.peer);
        }
    };
    AppComponent.prototype.connect = function () {
        var otherToken = this.tokenForm.value.otherToken;
        if (otherToken.length > 0) {
            var otherId = JSON.parse(otherToken);
            this.peer.signal(otherId);
        }
    };
    AppComponent.prototype.createForms = function () {
        this.tokenForm = this.fb.group({
            yourToken: '',
            otherToken: ''
        });
    };
    AppComponent.prototype.handlePeerEvent = function (peer) {
        var _this = this;
        peer.on(this.SIGNAL_EVENT, function (data) {
            _this.tokenForm.patchValue({
                yourToken: JSON.stringify(data)
            });
        });
        peer.on(this.ERROR_EVENT, function (error) {
            console.log('Error: ', error);
        });
        peer.on(this.CONNECT_EVENT, function () {
            console.log('Peer connect');
        });
        peer.on(this.DATA_EVENT, function (data) {
            console.log('Peer data: ', data);
            /*
                  const receivedByteArray = new Uint8Array(this.receivedByteArray.length + data.length);
                  receivedByteArray.set(this.receivedByteArray);
                  receivedByteArray.set(data, this.receivedByteArray.length);
                  this.receivedByteArray = receivedByteArray;*/
            /*      const url = URL.createObjectURL(new Blob([data]));
                  video.src = url;*/
            /*      this.sourceBuffer.addEventListener('updateend', () => {
                    if (!this.sourceBuffer.updating && this.mediaSource.readyState === 'open') {
                      this.mediaSource.endOfStream();
                      video.play();
                    }
                  });
            
                  this.sourceBuffer.appendBuffer(data);*/
        });
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* ViewChild */])('video'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* ElementRef */]) === "function" && _a || Object)
], AppComponent.prototype, "videoElement", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* ReactiveFormsModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[1]);
//# sourceMappingURL=main.bundle.js.map