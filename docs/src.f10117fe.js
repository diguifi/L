// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/scenes/sceneBase.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Scene =
/** @class */
function () {
  function Scene(context, name, active) {
    this.active = false;
    this.context = context;
    this.name = name;
    this.active = active;
  }

  Scene.prototype.update = function () {};

  return Scene;
}();

exports.default = Scene;
},{}],"src/managers/colorManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function darken(color, amount) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = Math.floor(255 * amount / 100);
  return "#" + subtractLight(color.substring(0, 2), amount) + subtractLight(color.substring(2, 4), amount) + subtractLight(color.substring(4, 6), amount);
}

exports.darken = darken;

function lighten(color, amount) {
  color = color.indexOf("#") >= 0 ? color.substring(1, color.length) : color;
  amount = Math.floor(255 * amount / 100);
  return color = "#" + addLight(color.substring(0, 2), amount) + addLight(color.substring(2, 4), amount) + addLight(color.substring(4, 6), amount);
}

exports.lighten = lighten;

function subtractLight(color, amount) {
  var cc = parseInt(color, 16) - amount;
  var c = cc < 0 ? 0 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : "0" + c.toString(16);
}

function addLight(color, amount) {
  var cc = parseInt(color, 16) + amount;
  var c = cc > 255 ? 255 : cc;
  return c.toString(16).length > 1 ? c.toString(16) : "0" + c.toString(16);
}
},{}],"src/objects/player.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var colorManager_1 = require("../managers/colorManager");

var Player =
/** @class */
function () {
  function Player(params) {
    this.rotation = 0;
    this.inverted = false;
    this.myTurn = false;
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
    this.myTurn = params.myTurn;
  }

  Player.prototype.update = function () {
    this.draw();
  };

  Player.prototype.draw = function () {
    switch (this.rotation) {
      case 0:
        this.context.beginPath();
        if (!this.inverted) this.context.rect(this.x, this.y, this.size, this.size);else this.context.rect(this.x + this.size * 2, this.y, this.size, this.size);
        this.context.rect(this.x + this.size, this.y, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size * 2, this.size, this.size);
        this.context.closePath();
        break;

      case 1:
        this.context.beginPath();
        if (!this.inverted) this.context.rect(this.x + this.size * 2, this.y, this.size, this.size);else this.context.rect(this.x + this.size * 2, this.y + this.size * 2, this.size, this.size);
        this.context.rect(this.x + this.size * 2, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x, this.y + this.size, this.size, this.size);
        this.context.closePath();
        break;

      case 2:
        this.context.beginPath();
        if (!this.inverted) this.context.rect(this.x + this.size * 2, this.y + this.size * 2, this.size, this.size);else this.context.rect(this.x, this.y + this.size * 2, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size * 2, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y, this.size, this.size);
        this.context.closePath();
        break;

      case 3:
        this.context.beginPath();
        if (!this.inverted) this.context.rect(this.x, this.y + this.size * 2, this.size, this.size);else this.context.rect(this.x, this.y, this.size, this.size);
        this.context.rect(this.x, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size, this.y + this.size, this.size, this.size);
        this.context.rect(this.x + this.size * 2, this.y + this.size, this.size, this.size);
        this.context.closePath();
        break;
    }

    if (this.myTurn) this.context.fillStyle = this.color;else this.context.fillStyle = colorManager_1.darken(this.color, 10);
    this.context.fill();
  };

  Player.prototype.rotate = function () {
    if (this.rotation < 3) this.rotation++;else this.rotation = 0;
  };

  Player.prototype.invert = function () {
    this.inverted = !this.inverted;
  };

  Player.prototype.moveRight = function () {
    this.x += this.size;
  };

  Player.prototype.moveLeft = function () {
    this.x -= this.size;
  };

  Player.prototype.moveDown = function () {
    this.y += this.size;
  };

  Player.prototype.moveUp = function () {
    this.y -= this.size;
  };

  return Player;
}();

exports.default = Player;
},{"../managers/colorManager":"src/managers/colorManager.ts"}],"src/objects/coin.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var colorManager_1 = require("../managers/colorManager");

var Coin =
/** @class */
function () {
  function Coin(params) {
    this.selected = false;
    this.active = false;
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
  }

  Coin.prototype.update = function () {
    this.draw();
  };

  Coin.prototype.draw = function () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.size, this.size);
    this.context.closePath();
    if (this.active) this.context.fillStyle = this.color;else this.context.fillStyle = colorManager_1.darken(this.color, 10);
    this.context.fill();
  };

  Coin.prototype.moveRight = function () {
    this.x += this.size;
  };

  Coin.prototype.moveLeft = function () {
    this.x -= this.size;
  };

  Coin.prototype.moveDown = function () {
    this.y += this.size;
  };

  Coin.prototype.moveUp = function () {
    this.y -= this.size;
  };

  return Coin;
}();

exports.default = Coin;
},{"../managers/colorManager":"src/managers/colorManager.ts"}],"src/objects/board.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Board =
/** @class */
function () {
  function Board(params) {
    this.context = params.context;
    this.x = params.x;
    this.y = params.y;
    this.size = params.size;
    this.color = params.color;
  }

  Board.prototype.update = function () {
    this.draw();
  };

  Board.prototype.draw = function () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.size * 4, this.size * 4);
    this.context.closePath();
    this.context.fillStyle = this.color;
    this.context.fill();
  };

  return Board;
}();

exports.default = Board;
},{}],"src/managers/inputManager.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InputManager =
/** @class */
function () {
  function InputManager(gameManager) {
    this.switch = false;
    this.gameManager = gameManager;
    document.onkeydown = this.checkInputs.bind(this);
  }

  InputManager.prototype.checkInputs = function (e) {
    var _this = this;

    e = e || window.event;

    if (!this.gameManager.selectingCoin && !this.gameManager.coinRound) {
      this.gameManager.players.forEach(function (player) {
        if (player.myTurn) {
          if (e.keyCode == '38') {
            player.moveUp();
          } else if (e.keyCode == '40') {
            player.moveDown();
          } else if (e.keyCode == '37') {
            player.moveLeft();
          } else if (e.keyCode == '39') {
            player.moveRight();
          } else if (e.keyCode == '32') {
            player.rotate();
          } else if (e.keyCode == '17') {
            player.invert();
          } else if (e.keyCode == '13') {
            _this.switch = true;
          }
        }
      });
    } else {
      if (!this.gameManager.coinRound) {
        if (e.keyCode == '37') {
          this.gameManager.changeActiveCoin();
        } else if (e.keyCode == '39') {
          this.gameManager.changeActiveCoin();
        } else if (e.keyCode == '13') {
          this.switch = true;
        }
      } else {
        this.gameManager.coins.forEach(function (coin) {
          if (coin.active) {
            if (e.keyCode == '38') {
              coin.moveUp();
            } else if (e.keyCode == '40') {
              coin.moveDown();
            } else if (e.keyCode == '37') {
              coin.moveLeft();
            } else if (e.keyCode == '39') {
              coin.moveRight();
            } else if (e.keyCode == '13') {
              _this.switch = true;
            }
          }
        });
      }
    }

    if (this.switch) {
      this.switch = false;
      this.gameManager.changeGameState();
    }
  };

  return InputManager;
}();

exports.default = InputManager;
},{}],"src/managers/gameManager.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var inputManager_1 = __importDefault(require("./inputManager"));

var GameManager =
/** @class */
function () {
  function GameManager(player1, player2, coin1, coin2, board) {
    this.players = [];
    this.coinRound = false;
    this.selectingCoin = false;
    this.coins = [];
    this.players.push(player1);
    this.players.push(player2);
    this.coins.push(coin1);
    this.coins.push(coin2);
    this.board = board;
    this.inputManager = new inputManager_1.default(this);
  }

  GameManager.prototype.activateCoinSelection = function () {
    this.selectingCoin = true;
    this.coins[0].active = true;
  };

  GameManager.prototype.activateCoinRound = function () {
    this.selectingCoin = false;
    this.coinRound = true;
  };

  GameManager.prototype.finishCoinRound = function () {
    this.coinRound = false;
    this.coins[0].active = false;
    this.coins[1].active = false;
  };

  GameManager.prototype.switchTurns = function () {
    this.players[0].myTurn = !this.players[0].myTurn;
    this.players[1].myTurn = !this.players[1].myTurn;
  };

  GameManager.prototype.changeGameState = function () {
    if (!this.coinRound) {
      if (!this.selectingCoin) {
        this.activateCoinSelection();
      } else {
        this.activateCoinRound();
      }
    } else {
      this.finishCoinRound();
      this.switchTurns();
    }
  };

  GameManager.prototype.changeActiveCoin = function () {
    this.coins.forEach(function (coin) {
      coin.active = !coin.active;
    });
  };

  return GameManager;
}();

exports.default = GameManager;
},{"./inputManager":"src/managers/inputManager.ts"}],"src/scenes/gameScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var sceneBase_1 = __importDefault(require("./sceneBase"));

var player_1 = __importDefault(require("../objects/player"));

var coin_1 = __importDefault(require("../objects/coin"));

var board_1 = __importDefault(require("../objects/board"));

var gameManager_1 = __importDefault(require("../managers/gameManager"));

var GameScene =
/** @class */
function (_super) {
  __extends(GameScene, _super);

  function GameScene(params) {
    var _this = _super.call(this, params.context, params.name, params.active) || this;

    _this.slotSize = 50;
    _this.board = new board_1.default({
      context: _this.context,
      x: 0,
      y: 0,
      size: _this.slotSize,
      color: '#7f8c8d'
    });
    _this.player1 = new player_1.default({
      context: _this.context,
      x: _this.slotSize,
      y: 0,
      size: _this.slotSize,
      color: '#3498db',
      myTurn: true
    });
    _this.player2 = new player_1.default({
      context: _this.context,
      x: _this.slotSize,
      y: _this.slotSize,
      size: _this.slotSize,
      color: '#e74c3c',
      myTurn: false
    });

    _this.player2.rotate();

    _this.player2.rotate();

    _this.player2.moveLeft();

    _this.coin1 = new coin_1.default({
      context: _this.context,
      x: 0,
      y: 0,
      size: _this.slotSize,
      color: '#f1c40f'
    });
    _this.coin2 = new coin_1.default({
      context: _this.context,
      x: _this.slotSize * 3,
      y: _this.slotSize * 3,
      size: _this.slotSize,
      color: '#f1c40f'
    });
    _this.gameManager = new gameManager_1.default(_this.player1, _this.player2, _this.coin1, _this.coin2, _this.board);
    return _this;
  }

  GameScene.prototype.update = function () {
    this.board.update();
    this.player1.update();
    this.player2.update();
    this.coin1.update();
    this.coin2.update();
  };

  return GameScene;
}(sceneBase_1.default);

exports.default = GameScene;
},{"./sceneBase":"src/scenes/sceneBase.ts","../objects/player":"src/objects/player.ts","../objects/coin":"src/objects/coin.ts","../objects/board":"src/objects/board.ts","../managers/gameManager":"src/managers/gameManager.ts"}],"src/index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var gameScene_1 = __importDefault(require("./scenes/gameScene"));

var Game =
/** @class */
function () {
  function Game() {
    var _this = this;

    this.scenes = [];
    this.canvas = document.getElementById('gameCanvas');
    this.context = this.canvas.getContext('2d');
    this.scenes.push(new gameScene_1.default({
      context: this.context,
      name: 'game',
      active: true
    }));
    window.requestAnimationFrame(function () {
      return _this.update();
    });
  }

  Game.prototype.update = function () {
    var _this = this;

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.scenes.forEach(function (scene) {
      if (scene.active) scene.update();
    });
    window.requestAnimationFrame(function () {
      return _this.update();
    });
  };

  return Game;
}();

window.onload = function () {
  var game = new Game();
};
},{"./scenes/gameScene":"src/scenes/gameScene.ts"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63129" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.ts"], null)
//# sourceMappingURL=/src.f10117fe.js.map