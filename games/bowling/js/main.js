function CTurnsBoard(t, e, i) {
    var o, n, r, s, a = i,
        l = 1;
    return this._init = function(t, e) {
        o = {
            x: t,
            y: e
        }, n = new createjs.Container, n.x = o.x, n.y = o.y, a.addChild(n), r = new Array;
        var t = 4,
            i = s_oSpriteLibrary.getSprite("turn_board"),
            l = s_oSpriteLibrary.getSprite("last_turn_board");
        n.regY = i.height;
        for (var c = 0; LAUNCH_TURN - 1 > c; c++) r.push(new CTurnBoard(t, 0, i, !1, n)), t += .5 * i.width;
        r.push(new CTurnBoard(t, 0, l, !0, n)), t += .5 * i.width, s = t, r[0].changeState("on")
    }, this.getTurnBoard = function(t) {
        return r[t]
    }, this.getStartPos = function() {
        return o
    }, this.getLastX = function() {
        return s
    }, this.setPosition = function(t, e) {
        n.x = t, n.y = e
    }, this.stateTurnBoard = function(t, e) {
        r[t].changeState(e)
    }, this.scaleFactor = function(t) {
        n.scaleX = n.scaleY = .5 * t / EDGEBOARD_X * (TURNSBOARD_SCALE_F - l) + l
    }, this.unload = function() {
        a.removeChild(n)
    }, this._init(t, e), this
}

function CController() {
    var t, e, i, o, n, r;
    return this._init = function() {
        r = new createjs.Shape, r.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), r.on("mousedown", s_oGame.manageControl, s_oGame), s_oStage.addChild(r), n = new createjs.Container, s_oStage.addChild(n), t = {
            x: CANVAS_WIDTH_HALF + 310,
            y: CANVAS_HEIGHT - EDGEBOARD_Y + 50
        }, e = {
            x: CANVAS_WIDTH_HALF - 310,
            y: CANVAS_HEIGHT - EDGEBOARD_Y + 50
        };
        var s = s_oSpriteLibrary.getSprite("arrow_left");
        i = new CGfxButton(e.x, e.y, s, n), i.addEventListener(ON_MOUSE_DOWN, s_oGame.onLeft, this), i.addEventListener(ON_MOUSE_UP, s_oGame.dirKeyUp, this);
        var a = s_oSpriteLibrary.getSprite("arrow_right");
        o = new CGfxButton(t.x, t.y, a, n), o.addEventListener(ON_MOUSE_DOWN, s_oGame.onRight, this), o.addEventListener(ON_MOUSE_UP, s_oGame.dirKeyUp, this)
    }, this.getStartPositionControlRight = function() {
        return t
    }, this.getStartPositionControlLeft = function() {
        return e
    }, this.setPositionControlRight = function(t, e) {
        o.setPosition(t, e)
    }, this.setPositionControlLeft = function(t, e) {
        i.setPosition(t, e)
    }, this.arrowVisibility = function(t) {
        n.visible = t
    }, this.unload = function() {
        i.unload(), i = null, o.unload(), o = null
    }, this._init(), this
}

function trace(t) {
    console.log(t)
}

function isIOS() {
    for (var t = ["iPad Simulator", "iPhone Simulator", "iPod Simulator", "iPad", "iPhone", "iPod"]; t.length;)
        if (navigator.platform === t.pop()) return s_bIsIphone = !0, !0;
    return s_bIsIphone = !1, !1
}

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler(), window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getSize(t) {
    var e, i = t.toLowerCase(),
        o = window.document,
        n = o.documentElement;
    if (void 0 === window["inner" + t]) e = n["client" + t];
    else if (window["inner" + t] != n["client" + t]) {
        var r = o.createElement("body");
        r.id = "vpw-test-b", r.style.cssText = "overflow:scroll";
        var s = o.createElement("div");
        s.id = "vpw-test-d", s.style.cssText = "position:absolute;top:-1000px", s.innerHTML = "<style>@media(" + i + ":" + n["client" + t] + "px){body#vpw-test-b div#vpw-test-d{" + i + ":7px!important}}</style>", r.appendChild(s), n.insertBefore(r, o.head), e = 7 == s["offset" + t] ? n["client" + t] : window["inner" + t], n.removeChild(r)
    } else e = window["inner" + t];
    return e
}

function getIOSWindowHeight() {
    var t = document.documentElement.clientWidth / window.innerWidth;
    return window.innerHeight * t
}

function getHeightOfIOSToolbars() {
    var t = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return t > 1 ? t : 0
}

function sizeHandler() {
    if (window.scrollTo(0, 1), $("#canvas")) {
        var t, e = !!navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
        t = e ? getIOSWindowHeight() : getSize("Height");
        var i = getSize("Width");
        s_fScaleCanvas = Math.min(t / CANVAS_HEIGHT, i / CANVAS_WIDTH), s_iScaleFactor = s_fScaleCanvas;
        var o = CANVAS_WIDTH * s_iScaleFactor,
            n = CANVAS_HEIGHT * s_iScaleFactor,
            r = 0;
        t > n ? (r = t - n, n += r, o += r * (CANVAS_WIDTH / CANVAS_HEIGHT)) : i > o && (r = i - o, o += r, n += r * (CANVAS_HEIGHT / CANVAS_WIDTH));
        var s = t / 2 - n / 2,
            a = i / 2 - o / 2,
            l = CANVAS_WIDTH / o;
        (-EDGEBOARD_X > a * l || -EDGEBOARD_Y > s * l) && (s_iScaleFactor = Math.min(t / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), i / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), o = CANVAS_WIDTH * s_iScaleFactor, n = CANVAS_HEIGHT * s_iScaleFactor, s = (t - n) / 2, a = (i - o) / 2, l = CANVAS_WIDTH / o), s_fInverseScaling = l, s_iOffsetX = -1 * a * l, s_iOffsetY = -1 * s * l, s >= 0 && (s_iOffsetY = 0), a >= 0 && (s_iOffsetX = 0), null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY), null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY), $("#canvas").css("width", o + "px"), $("#canvas").css("height", n + "px"), 0 > s ? ($("#canvas").css("top", s + "px"), s_iCanvasOffsetHeight = s) : ($("#canvas").css("top", "0px"), s_iCanvasOffsetHeight = 0), $("#canvas").css("left", a + "px"), resizeCanvas3D(), s_iCanvasResizeWidth = o, s_iCanvasResizeHeight = n, s_iCanvasOffsetWidth = a
    }
}

function createBitmap(t, e, i) {
    var o = new createjs.Bitmap(t),
        n = new createjs.Shape;
    return e && i ? n.graphics.beginFill("#fff").drawRect(-e / 2, -i / 2, e, i) : n.graphics.beginFill("#ff0").drawRect(0, 0, t.width, t.height), o.hitArea = n, o
}

function createSprite(t, e, i, o, n, r) {
    if (null !== e) var s = new createjs.Sprite(t, e);
    else var s = new createjs.Sprite(t);
    var a = new createjs.Shape;
    return a.graphics.beginFill("#000000").drawRect(-i, -o, n, r), s.hitArea = a, s
}

function randomFloatBetween(t, e, i) {
    return "undefined" == typeof i && (i = 2), parseFloat(Math.min(t + Math.random() * (e - t), e).toFixed(i))
}

function shuffle(t) {
    for (var e, i, o = t.length; 0 !== o;) i = Math.floor(Math.random() * o), o -= 1, e = t[o], t[o] = t[i], t[i] = e;
    return t
}

function formatTime(t) {
    t /= 1e3;
    var e = Math.floor(t / 60),
        i = t - 60 * e;
    i = parseFloat(i).toFixed(1);
    var o = "";
    return o += 10 > e ? "0" + e + ":" : e + ":", o += 10 > i ? "0" + i : i
}

function degreesToRadians(t) {
    return t * Math.PI / 180
}

function checkRectCollision(t, e) {
    var i, o;
    return i = getBounds(t, .9), o = getBounds(e, .98), calculateIntersection(i, o)
}

function calculateIntersection(t, e) {
    var i, o, n = {},
        r = {};
    return n.cx = t.x + (n.hw = t.width / 2), n.cy = t.y + (n.hh = t.height / 2), r.cx = e.x + (r.hw = e.width / 2), r.cy = e.y + (r.hh = e.height / 2), i = Math.abs(n.cx - r.cx) - (n.hw + r.hw), o = Math.abs(n.cy - r.cy) - (n.hh + r.hh), 0 > i && 0 > o ? (i = Math.min(Math.min(t.width, e.width), -i), o = Math.min(Math.min(t.height, e.height), -o), {
        x: Math.max(t.x, e.x),
        y: Math.max(t.y, e.y),
        width: i,
        height: o,
        rect1: t,
        rect2: e
    }) : null
}

function getBounds(t, e) {
    var i = {
        x: 1 / 0,
        y: 1 / 0,
        width: 0,
        height: 0
    };
    if (t instanceof createjs.Container) {
        i.x2 = -(1 / 0), i.y2 = -(1 / 0);
        var o, n, r = t.children,
            s = r.length;
        for (n = 0; s > n; n++) o = getBounds(r[n], 1), o.x < i.x && (i.x = o.x), o.y < i.y && (i.y = o.y), o.x + o.width > i.x2 && (i.x2 = o.x + o.width), o.y + o.height > i.y2 && (i.y2 = o.y + o.height);
        i.x == 1 / 0 && (i.x = 0), i.y == 1 / 0 && (i.y = 0), i.x2 == 1 / 0 && (i.x2 = 0), i.y2 == 1 / 0 && (i.y2 = 0), i.width = i.x2 - i.x, i.height = i.y2 - i.y, delete i.x2, delete i.y2
    } else {
        var a, l, c, h, u, d = {};
        if (t instanceof createjs.Bitmap) u = t.sourceRect || t.image, d.width = u.width * e, d.height = u.height * e;
        else if (t instanceof createjs.Sprite)
            if (t.spriteSheet._frames && t.spriteSheet._frames[t.currentFrame] && t.spriteSheet._frames[t.currentFrame].image) {
                var p = t.spriteSheet.getFrame(t.currentFrame);
                d.width = p.rect.width, d.height = p.rect.height, d.regX = p.regX, d.regY = p.regY
            } else i.x = t.x || 0, i.y = t.y || 0;
        else i.x = t.x || 0, i.y = t.y || 0;
        d.regX = d.regX || 0, d.width = d.width || 0, d.regY = d.regY || 0, d.height = d.height || 0, i.regX = d.regX, i.regY = d.regY, a = t.localToGlobal(0 - d.regX, 0 - d.regY), l = t.localToGlobal(d.width - d.regX, d.height - d.regY), c = t.localToGlobal(d.width - d.regX, 0 - d.regY), h = t.localToGlobal(0 - d.regX, d.height - d.regY), i.x = Math.min(Math.min(Math.min(a.x, l.x), c.x), h.x), i.y = Math.min(Math.min(Math.min(a.y, l.y), c.y), h.y), i.width = Math.max(Math.max(Math.max(a.x, l.x), c.x), h.x) - i.x, i.height = Math.max(Math.max(Math.max(a.y, l.y), c.y), h.y) - i.y
    }
    return i
}

function NoClickDelay(t) {
    this.element = t, window.Touch && this.element.addEventListener("touchstart", this, !1)
}

function playSound(t, e, i) {
    if (DISABLE_SOUND_MOBILE === !1 || s_bMobile === !1) {
        var o = createjs.Sound.play(t, {
            loop: i,
            volume: e
        });
        return o
    }
    return null
}

function stopSound(t) {
    DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || t.stop()
}

function setVolume(t, e) {
    DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || (t.volume = e)
}

function setMute(t, e) {
    DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || t.setMute(e)
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(t) {
    for (var e = window.location.search.substring(1), i = e.split("&"), o = 0; o < i.length; o++) {
        var n = i[o].split("=");
        if (n[0] == t) return n[1]
    }
}

function rotateVector2D(t, e) {
    var i = e.x * Math.cos(t) + e.y * Math.sin(t),
        o = e.x * -Math.sin(t) + e.y * Math.cos(t);
    return {
        x: i,
        y: o
    }
}

function normalize(t, e) {
    return e > 0 && (t.x /= e, t.y /= e), t
}

function length(t) {
    return Math.sqrt(t.x * t.x + t.y * t.y)
}

function findNearestIntersectingObject(t, e, i, o) {
    var n = CANVAS_RESIZE_WIDTH + 2 * OFFSET_WIDTH,
        r = CANVAS_RESIZE_HEIGHT + 2 * OFFSET_HEIGHT,
        s = new THREE.Raycaster,
        a = new THREE.Vector3;
    a.x = t / n * 2 - 1, a.y = 2 * -(e / r) + 1, a.z = .5, s.setFromCamera(a, i);
    var l = s.intersectObjects(o, !0),
        c = !1;
    return l.length > 0 && (c = l[0]), c
}

function distance(t, e, i, o) {
    var n = t - i,
        r = e - o;
    return Math.sqrt(n * n + r * r)
}

function distance2(t, e, i, o) {
    var n = t - i,
        r = e - o;
    return n * n + r * r
}

function resizeCanvas3D() {
    $("canvas").each(function() {
        "#canvas" != $(this).attr("id") && ($(this).css("width", $("#canvas").css("width")), $(this).css("height", $("#canvas").css("height")), $(this).css("position", $("#canvas").css("position")), $(this).css("left", $("#canvas").css("left")), $(this).css("top", $("#canvas").css("top")))
    })
}

function createOrthoGraphicCamera() {
    var t = new THREE.PerspectiveCamera(FOV, CANVAS_WIDTH / CANVAS_HEIGHT, NEAR, FAR);
    return t.rotation.x = CAMERA_PROPERTIES.rot_x * (Math.PI / 180), t.rotation.y = CAMERA_PROPERTIES.rot_y * (Math.PI / 180), t.rotation.z = CAMERA_PROPERTIES.rot_z * (Math.PI / 180), t.position.set(CAMERA_PROPERTIES.x, CAMERA_PROPERTIES.y, CAMERA_PROPERTIES.z), t.updateProjectionMatrix(), t.updateMatrixWorld(), t
}

function rotateVector2D(t, e) {
    var i = e.x * Math.cos(t) + e.y * Math.sin(t),
        o = e.x * -Math.sin(t) + e.y * Math.cos(t);
    return {
        x: i,
        y: o,
        z: 0
    }
}

function distanceV3(t, e, i, o, n, r) {
    var s = t - o,
        a = e - n,
        l = i - r;
    return Math.sqrt(s * s + a * a + l * l)
}

function distanceV2(t, e) {
    var i = t.x - e.x,
        o = t.y - e.y;
    return Math.sqrt(i * i + o * o)
}

function saveItem(t, e) {
    localStorage.setItem(t, e)
}

function getItem(t) {
    return localStorage.getItem(t)
}

function clearAllItem() {
    localStorage.clear()
}

function CToggle(t, e, i, o, n) {
    var r, s, a, l, c;
    this._init = function(t, e, i, o, n) {
        c = void 0 !== n ? n : s_oStage, s = new Array, a = new Array;
        var h = {
                images: [i],
                frames: {
                    width: i.width / 2,
                    height: i.height,
                    regX: i.width / 2 / 2,
                    regY: i.height / 2
                },
                animations: {
                    state_true: [0],
                    state_false: [1]
                }
            },
            u = new createjs.SpriteSheet(h);
        r = o, l = createSprite(u, "state_" + r, i.width / 2 / 2, i.height / 2, i.width / 2, i.height), l.x = t, l.y = e, l.stop(), s_bMobile || (l.cursor = "pointer"), c.addChild(l), this._initListener()
    }, this.unload = function() {
        l.off("mousedown", this.buttonDown), l.off("pressup", this.buttonRelease), c.removeChild(l)
    }, this._initListener = function() {
        l.on("mousedown", this.buttonDown), l.on("pressup", this.buttonRelease)
    }, this.addEventListener = function(t, e, i) {
        s[t] = e, a[t] = i
    }, this.setCursorType = function(t) {
        l.cursor = t
    }, this.setActive = function(t) {
        r = t, l.gotoAndStop("state_" + r)
    }, this.buttonRelease = function() {
        l.scaleX = 1, l.scaleY = 1, playSound("click", 1, 0), r = !r, l.gotoAndStop("state_" + r), s[ON_MOUSE_UP] && s[ON_MOUSE_UP].call(a[ON_MOUSE_UP], r)
    }, this.buttonDown = function() {
        l.scaleX = .9, l.scaleY = .9, s[ON_MOUSE_DOWN] && s[ON_MOUSE_DOWN].call(a[ON_MOUSE_DOWN])
    }, this.setPosition = function(t, e) {
        l.x = t, l.y = e
    }, this._init(t, e, i, o, n)
}

function CScenario() {
    var t, e, i, o, n, r, s, a, l, c, h, u, d, p, f, m, v, y, g, _;
    if (SHOW_3D_RENDER) var E = new CANNON.Demo;
    this.getDemo = function() {
        return E
    }, this._init = function() {
        g = new Array, _ = new Array, t = SHOW_3D_RENDER ? E.getWorld() : new CANNON.World;
        var r = new CANNON.GSSolver;
        r.iterations = 10, r.tolerance = 1e-4, t.allowSleep = !0, t.gravity.set(0, 0, -(19.52 * STEP_RATE)), t.broadphase = new CANNON.NaiveBroadphase, t.solver = new CANNON.SplitSolver(r, 20, 1e-4), e = new CANNON.Material, i = new CANNON.Material, o = new CANNON.Material, n = new CANNON.Material;
        var s = new CANNON.ContactMaterial(i, o, {
                friction: .1,
                restitution: .1
            }),
            a = new CANNON.ContactMaterial(i, e, {
                friction: .01,
                restitution: .1
            }),
            l = new CANNON.ContactMaterial(i, n, {
                friction: .1,
                restitution: .3
            }),
            c = new CANNON.ContactMaterial(e, n, {
                friction: .2,
                restitution: .3
            }),
            h = new CANNON.ContactMaterial(n, n, {
                friction: .01,
                restitution: .1
            }),
            u = new CANNON.ContactMaterial(n, o, {
                friction: .01,
                restitution: .1
            });
        t.addContactMaterial(s), t.addContactMaterial(a), t.addContactMaterial(l), t.addContactMaterial(c), t.addContactMaterial(h), t.addContactMaterial(u), s_oScenario._createBallBody();
        for (var d = 0; d < PINS_POSITION.length; d++) g[d] = s_oScenario.createPin(PINS_POSITION[d], d, !1);
        s_oScenario.importFBXTrack(), s_oScenario.createWallPins(), s_oScenario.createFloorPins(), s_oScenario.createPinsBinder(), s_oScenario.createWallFloorPins(), s_oScenario.createSideWallTrack(), s_oScenario.createSensorPinFloor(), SHOW_DEPTH_TRACK_MODEL && s_oScenario.createDepthTrack(), PIN_TEST && g.push(s_oScenario.createPin(PINS_PROPERTIES_TEST, -1, !0));
        var p = FLOOR_PINS_SIZE.width + FLOOR_PINS_SIDE_PROPERTIES.width - 2.7,
            f = {
                x: FLOOR_PINS_POSITION.x + p,
                y: FLOOR_PINS_POSITION.y,
                z: FLOOR_PINS_POSITION.z + FLOOR_PINS_SIZE.height - 9
            };
        _.push(s_oScenario.createAFloorSidePins(f, FLOOR_PINS_SIDE_PROPERTIES.rot));
        var m = -FLOOR_PINS_SIZE.width - FLOOR_PINS_SIDE_PROPERTIES.width + 2.7,
            v = {
                x: FLOOR_PINS_POSITION.x + m,
                y: FLOOR_PINS_POSITION.y,
                z: FLOOR_PINS_POSITION.z + FLOOR_PINS_SIZE.height - 9
            };
        _.push(s_oScenario.createAFloorSidePins(v, -FLOOR_PINS_SIDE_PROPERTIES.rot))
    }, this.importFBXTrack = function() {
        var t = new THREE.LoadingManager;
        t.onProgress = function(t, e, i) {
            console.log(t, e, i)
        };
        var e = function(t) {
                if (t.lengthComputable) {
                    var e = t.loaded / t.total * 100;
                    console.log(Math.round(e, 2) + "% downloaded")
                }
            },
            i = function(t) {},
            o = new THREE.FBXLoader(t);
        o.load("models/stage.fbx", function(t) {
            s_oScenario.parseFile(t), t = null, s_oGame.ballPosition(), s_oGame.startPinsPosition()
        }, e, i)
    }, this.parseFile = function(t) {
        for (var e = 0; e < t.children.length; e++) {
            var i = t.children[e];
            console.log("oMesh.name: " + i.name), "floor" === i.name ? (l = s_oScenario._createFieldBody(i, FLOOR), l.addEventListener("collide", function(t) {
                s_oScenario.floorCollision(t)
            })) : "channel_left" === i.name ? (c = s_oScenario._createFieldBody(i, CHANNEL), c.addEventListener("collide", function(t) {
                s_oScenario.channelCollision(t)
            })) : "channel_right" === i.name && (h = s_oScenario._createFieldBody(i, CHANNEL), h.addEventListener("collide", function(t) {
                s_oScenario.channelCollision(t)
            }))
        }
    }, this.createSensorPinFloor = function() {
        var e = new CANNON.Box(new CANNON.Vec3(SENSOR_SIZE.width, SENSOR_SIZE.depth, SENSOR_SIZE.height));
        if (y = new CANNON.Body({
                mass: 0,
                material: o,
                userData: {
                    type: WALL
                }
            }), y.addShape(e), y.addEventListener("collide", function(t) {
                s_oScenario.sensorCollision(t)
            }), y.position.set(SENSOR_POSITION.x, SENSOR_POSITION.y, SENSOR_POSITION.z), t.addBody(y), SHOW_3D_RENDER) {
            var i = new THREE.MeshPhongMaterial({
                color: 5570645,
                specular: 1118481,
                shininess: 50
            });
            E.addVisual(y, i)
        }
    }, this.createAFloorSidePins = function(i, o) {
        var n, r = new CANNON.Box(new CANNON.Vec3(FLOOR_PINS_SIDE_PROPERTIES.width, FLOOR_PINS_SIDE_PROPERTIES.depth, FLOOR_PINS_SIDE_PROPERTIES.height));
        if (n = new CANNON.Body({
                mass: 0,
                material: e,
                userData: {
                    type: PINS_FLOOR
                },
                collisionFilterGroup: PINS_FLOOR,
                collisionFilterMask: PINS
            }), n.addShape(r), n.quaternion.y = o, n.position.set(i.x, i.y, i.z), n.addEventListener("collide", function(t) {
                s_oScenario.sideWallCollision(t)
            }), t.addBody(n), SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var s = new THREE.MeshPhongMaterial({
                color: 34816,
                specular: 1118481,
                shininess: 50
            });
            E.addVisual(n, s)
        }
        return n
    }, this.createDepthTrack = function() {
        var e = new CANNON.Box(new CANNON.Vec3(WALL_TRACK_DEPTH_SIZE.width, WALL_TRACK_DEPTH_SIZE.depth, WALL_TRACK_DEPTH_SIZE.height));
        if (f = new CANNON.Body({
                mass: 0,
                material: o
            }), f.collisionResponse = 0, f.addShape(e), f.position.set(WALL_TRACK_DEPTH_POSITION.x, WALL_TRACK_DEPTH_POSITION.y, WALL_TRACK_DEPTH_POSITION.z), t.addBody(f), SHOW_3D_RENDER) {
            var i = new THREE.MeshPhongMaterial({
                color: 8947712,
                specular: 1118481,
                shininess: 50
            });
            E.addVisual(f, i)
        }
    }, this.createFloorPins = function() {
        var i = new CANNON.Box(new CANNON.Vec3(FLOOR_PINS_SIZE.width, FLOOR_PINS_SIZE.depth, FLOOR_PINS_SIZE.height));
        if (u = new CANNON.Body({
                mass: 0,
                material: e,
                userData: {
                    type: PINS_FLOOR
                },
                collisionFilterGroup: PINS_FLOOR,
                collisionFilterMask: PINS
            }), u.addShape(i), u.position.set(FLOOR_PINS_POSITION.x, FLOOR_PINS_POSITION.y, FLOOR_PINS_POSITION.z), t.addBody(u), SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var o = new THREE.MeshPhongMaterial({
                color: 136,
                specular: 1118481,
                shininess: 50
            });
            E.addVisual(u, o)
        }
    }, this.createWallFloorPins = function() {
        var i = new CANNON.Box(new CANNON.Vec3(FLOOR_WALL_PINS_SIZE.width, FLOOR_WALL_PINS_SIZE.depth, FLOOR_WALL_PINS_SIZE.height));
        if (d = new CANNON.Body({
                mass: 0,
                material: e,
                userData: {
                    type: PINS_FLOOR
                },
                collisionFilterGroup: PINS_FLOOR,
                collisionFilterMask: PINS
            }), d.addShape(i), d.position.set(FLOOR_WALL_PINS_POSITION.x, FLOOR_WALL_PINS_POSITION.y, FLOOR_WALL_PINS_POSITION.z), t.addBody(d), SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var o = new THREE.MeshPhongMaterial({
                color: 8912896,
                specular: 16776960,
                shininess: 10
            });
            E.addVisual(d, o)
        }
    }, this.createPinsBinder = function() {
        var e = new CANNON.Box(new CANNON.Vec3(PINS_BINDER_PROPERTIES.width, PINS_BINDER_PROPERTIES.depth, PINS_BINDER_PROPERTIES.height));
        if (m = new CANNON.Body({
                mass: 0,
                material: o,
                userData: {
                    type: PINS_FLOOR
                },
                collisionFilterGroup: PINS_FLOOR,
                collisionFilterMask: PINS,
                fixedRotation: !0,
                allowSleep: !1,
                sleepTimeLimit: 1
            }), m.addShape(e), m.position.set(PINS_BINDER_POSITION.x, PINS_BINDER_POSITION.y, PINS_BINDER_POSITION.z), t.addBody(m), m.collisionResponse = 0, SHOW_3D_RENDER) {
            var i = new THREE.MeshPhongMaterial({
                color: 5592405,
                specular: 1118481,
                shininess: 50
            });
            E.addVisual(m, i)
        }
    }, this._createFieldBody = function(i, o) {
        var n = this.__extractMeshData(i),
            r = new CANNON.Body({
                mass: 0,
                material: e,
                userData: {
                    type: o
                }
            });
        r.addShape(n);
        var s = new CANNON.Vec3(i.position.x + OFFSET_TRACK_POSITION.x, i.position.y + OFFSET_TRACK_POSITION.y, i.position.z + OFFSET_TRACK_POSITION.z);
        if (r.position.copy(s), t.addBody(r), SHOW_3D_RENDER) {
            var a = new THREE.MeshPhongMaterial({
                color: 14596231,
                specular: 0,
                shininess: 100
            });
            E.addVisual(r, a)
        }
        return r
    }, this.__extractMeshData = function(t) {
        for (var e = t.geometry.faces, i = t.geometry.vertices, o = new Array, n = 0; n < e.length; n++) o[n] = {
            a: e[n].a,
            b: e[n].b,
            c: e[n].c
        };
        for (var r = [], s = [], a = 1, n = 0; n < i.length; n++) r.push(i[n].x * a), r.push(i[n].y * a), r.push(i[n].z * a);
        for (var n = 0; n < e.length; n++) s.push(e[n].a), s.push(e[n].b), s.push(e[n].c);
        return new CANNON.Trimesh(r, s)
    }, this.createPin = function(e, i, o) {
        var r = new CANNON.Cylinder(PIN_PROPERTY.radius_top, PIN_PROPERTY.radius_bottom, PIN_PROPERTY.height, PIN_PROPERTY.segments),
            s = new CANNON.Body({
                mass: PIN_PROPERTY.mass,
                material: n,
                linearDamping: PIN_PROPERTY.linearDamping,
                angularDamping: PIN_PROPERTY.angularDamping,
                userData: {
                    type: PINS,
                    id: i
                },
                collisionFilterGroup: PINS,
                collisionFilterMask: -1,
                allowSleep: !0,
                sleepTimeLimit: 1
            });
        if (s.addShape(r), s.position.set(e.x, e.y, e.z), s.addEventListener("collide", function(t) {
                s_oScenario.pinCollision(t)
            }), t.addBody(s), SHOW_3D_RENDER) {
            var a = new THREE.MeshPhongMaterial({
                    color: 16777215,
                    specular: 1118481,
                    shininess: 100
                }),
                l = E.addVisual(s, a);
            o && CAMERA_TEST_TRANSFORM && !CAMERA_TEST_TRACKBALL && E.createTransformControl(l, s)
        }
        return s
    }, this.createWallPins = function() {
        var e = new CANNON.Box(new CANNON.Vec3(WALL_PINS_SIZE.width, WALL_PINS_SIZE.depth, WALL_PINS_SIZE.height)),
            i = new CANNON.Box(new CANNON.Vec3(SIDE_WALL_PINS_SIZE.width, SIDE_WALL_PINS_SIZE.depth, SIDE_WALL_PINS_SIZE.height)),
            n = new CANNON.Box(new CANNON.Vec3(WALL_PINS_DOWN_SIZE.width, WALL_PINS_DOWN_SIZE.depth, WALL_PINS_DOWN_SIZE.height)),
            r = new CANNON.Box(new CANNON.Vec3(WALL_PINS_FORWARD_SIZE.width, WALL_PINS_FORWARD_SIZE.depth, WALL_PINS_FORWARD_SIZE.height));
        if (p = new CANNON.Body({
                mass: 0,
                material: o,
                userData: {
                    type: WALL
                }
            }), p.addShape(e), p.addShape(i, new CANNON.Vec3(WALL_PINS_SIZE.width, SIDE_WALL_PINS_SIZE.depth, 0)), p.addShape(i, new CANNON.Vec3(-WALL_PINS_SIZE.width, SIDE_WALL_PINS_SIZE.depth, 0)), p.addShape(n, new CANNON.Vec3(0, SIDE_WALL_PINS_SIZE.depth, -SIDE_WALL_PINS_SIZE.height)), p.addShape(r, new CANNON.Vec3(0, 2 * WALL_PINS_DOWN_SIZE.depth, -WALL_PINS_SIZE.height + WALL_PINS_FORWARD_SIZE.height)), p.addShape(n, new CANNON.Vec3(0, SIDE_WALL_PINS_SIZE.depth, .9 * WALL_PINS_SIZE.height)), p.addEventListener("collide", function(t) {
                s_oScenario.wallCollision(t)
            }), p.position.set(WALL_PINS_POSITION.x, WALL_PINS_POSITION.y, WALL_PINS_POSITION.z), t.addBody(p), SHOW_3D_RENDER) {
            var s = new THREE.MeshPhongMaterial({
                color: 3355443,
                specular: 1118481,
                shininess: 50
            });
            E.addVisual(p, s)
        }
    }, this.createSideWallTrack = function() {
        var e = new CANNON.Box(new CANNON.Vec3(WALL_TRACK_SIZE.width, WALL_TRACK_SIZE.depth, WALL_TRACK_SIZE.height)),
            i = new CANNON.Box(new CANNON.Vec3(ROOF_TRACK_SIZE.width, ROOF_TRACK_SIZE.depth, ROOF_TRACK_SIZE.height));
        if (v = new CANNON.Body({
                mass: 0,
                material: o,
                userData: {
                    type: WALL_TRACK
                }
            }), v.addShape(e, new CANNON.Vec3(WALL_TRACK_SIZE.offsetX, 0, 0)), v.addShape(e, new CANNON.Vec3(-WALL_TRACK_SIZE.offsetX, 0, 0)), v.addShape(i, new CANNON.Vec3(0, ROOF_TRACK_SIZE.offsetY, .85 * WALL_TRACK_SIZE.height)), v.position.set(WALL_TRACK_POSITION.x, WALL_TRACK_POSITION.y, WALL_TRACK_POSITION.z), t.addBody(v), SHOW_3D_RENDER && SHOW_PROXY_COLLISION) {
            var n = new THREE.MeshPhongMaterial({
                color: 11184810,
                specular: 16777215,
                shininess: 15
            });
            E.addVisual(v, n)
        }
    }, this._createBallBody = function() {
        r = new CANNON.Sphere(BALL_RADIUS), s = new CANNON.Body({
            mass: BALL_PROPERTY.mass,
            material: i,
            linearDamping: BALL_PROPERTY.linearDamping,
            allowSleep: !1,
            angularDamping: BALL_PROPERTY.angularDamping,
            userData: {
                type: BALL
            }
        });
        var e = new CANNON.Vec3(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z);
        if (s.position.copy(e), s.addEventListener("collide", function(t) {
                s_oScenario.ballCollision(t)
            }), s.addShape(r), t.add(s), SHOW_3D_RENDER) {
            var o = new THREE.MeshPhongMaterial({
                color: 11184810,
                specular: 1118481,
                shininess: 100
            });
            a = E.addVisual(s, o)
        }
    }, this.addImpulse = function(t, e) {
        var i = new CANNON.Vec3(0, 0, BALL_RADIUS),
            o = new CANNON.Vec3(e.x, e.y, e.z);
        t.applyImpulse(o, i)
    }, this.addForce = function(t, e) {
        var i = new CANNON.Vec3(0, 0, 0),
            o = new CANNON.Vec3(e.x, e.y, e.z);
        t.applyForce(o, i)
    }, this.getBodyVelocity = function(t) {
        return t.velocity
    }, this.ballBody = function() {
        return s
    }, this.ballMesh = function() {
        return a
    }, this.ballCollision = function(t) {
        (t.contact.bi.userData.type === BALL && t.contact.bj.userData.type === PINS || t.contact.bj.userData.type === BALL && t.contact.bi.userData.type === PINS) && s_oGame.setPinCollide()
    }, this.getCamera = function() {
        return E.camera()
    }, this.floorCollision = function(t) {
        (t.contact.bi.userData.type === BALL && t.contact.bj.userData.type === FLOOR || t.contact.bj.userData.type === BALL && t.contact.bi.userData.type === FLOOR) && s_oGame.ballHitFloor()
    }, this.channelCollision = function(t) {
        (t.contact.bi.userData.type === BALL && t.contact.bj.userData.type === CHANNEL || t.contact.bj.userData.type === BALL && t.contact.bi.userData.type === CHANNEL) && s_oGame.gutterBall()
    }, this.getPinsBinder = function() {
        return m
    }, this.getPinByID = function(t) {
        return g[t]
    }, this.setElementAngularVelocity = function(t, e) {
        t.angularVelocity.set(e.x, e.y, e.z)
    }, this.setElementVelocity = function(t, e) {
        var i = new CANNON.Vec3(e.x, e.y, e.z);
        t.velocity = i
    }, this.setElementLinearDamping = function(t, e) {
        t.linearDamping = e
    }, this.getTrackBody = function() {
        return l
    }, this.getTrackBodyDepth = function() {
        return f
    }, this.update = function() {
        t.step(PHYSICS_STEP)
    }, this.resetPinsPosition = function() {
        for (var t = 0; t < g.length; t++) g[t].position.set(PINS_POSITION[t].x, PINS_POSITION[t].y, PINS_POSITION[t].z), g[t].quaternion.setFromEuler(0, 0, 0, "XYZ"), g[t].angularVelocity.set(0, 0, 0), g[t].velocity.set(0, 0, 0)
    }, this.getSideFloorPins = function(t) {
        return _[t]
    }, this.pinCollision = function(t) {
        t.contact.bi.userData.type === PINS && t.contact.bj.userData.type === BALL ? s_oGame.pinSoundCollision(t.contact.bi.userData.id) : t.contact.bj.userData.type === PINS && t.contact.bi.userData.type === BALL ? s_oGame.pinSoundCollision(t.contact.bj.userData.id) : t.contact.bj.userData.type === PINS && t.contact.bi.userData.type === PINS && s_oGame.twoPinsSoundCollision(t.contact.bj.userData.id, t.contact.bi.userData.id)
    }, this.sideWallCollision = function(t) {
        s_oGame.setPinDown(t.contact.bj.userData.id, !0, SIDE_PINS_FLOOR)
    }, this.sensorCollision = function(t) {
        t.contact.bj.sleep(), t.contact.bj.userData.type === PINS && s_oGame.setPinDown(t.contact.bj.userData.id, !0, SIDE_PINS_FLOOR)
    }, this.wallCollision = function(t) {
        t.contact.bi.userData.type === BALL && t.contact.bj.userData.type === WALL || t.contact.bj.userData.type === BALL && t.contact.bi.userData.type === WALL ? s_oGame.completeLaunch() : t.contact.bj.userData.type === PINS && t.contact.bi.userData.type === WALL && s_oGame.setPinDown(t.contact.bj.userData.id, !0, WALL)
    }, this.destroyWorld = function() {
        for (var e = t.bodies, i = 0; i < e.length; i++) t.remove(e[i]);
        t = null
    }, s_oScenario = this, SHOW_3D_RENDER ? (E.addScene("bowling", this._init), E.start()) : this._init()
}

function CGfxButton(t, e, i, o) {
    var n, r, s, a, l, c, h, u, d, p, f, m = !1;
    return this._init = function(t, e, i) {
        n = new Array, r = new Array, a = new Array, s = createBitmap(i), s.x = t, s.y = e, l = 1, c = 1, s.regX = i.width / 2, s.regY = i.height / 2, s_bMobile || (s.cursor = "pointer"), f.addChild(s), this._initListener()
    }, this.unload = function() {
        s.off("mousedown", d), s.off("pressup", p), f.removeChild(s)
    }, this.setVisible = function(t) {
        s.visible = t
    }, this.setCursorType = function(t) {
        s.cursor = t
    }, this._initListener = function() {
        d = s.on("mousedown", this.buttonDown), p = s.on("pressup", this.buttonRelease)
    }, this.addEventListener = function(t, e, i) {
        n[t] = e, r[t] = i
    }, this.addEventListenerWithParams = function(t, e, i, o) {
        n[t] = e, r[t] = i, a[t] = o
    }, this.buttonRelease = function() {
        m || (l > 0 ? s.scaleX = 1 : s.scaleX = -1, s.scaleY = 1, playSound("click", 1, 0), n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(r[ON_MOUSE_UP], a[ON_MOUSE_UP]))
    }, this.buttonDown = function() {
        m || (l > 0 ? s.scaleX = .9 : s.scaleX = -.9, s.scaleY = .9, n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(r[ON_MOUSE_DOWN], a[ON_MOUSE_DOWN]))
    }, this.rotation = function(t) {
        s.rotation = t
    }, this.getButton = function() {
        return s
    }, this.setPosition = function(t, e) {
        s.x = t, s.y = e
    }, this.setX = function(t) {
        s.x = t
    }, this.setY = function(t) {
        s.y = t
    }, this.getButtonImage = function() {
        return s
    }, this.block = function(t) {
        m = t, s.scaleX = l, s.scaleY = c
    }, this.setScaleX = function(t) {
        s.scaleX = t, l = t
    }, this.getX = function() {
        return s.x
    }, this.getY = function() {
        return s.y
    }, this.pulseAnimation = function() {
        u = createjs.Tween.get(s).to({
            scaleX: .9 * l,
            scaleY: .9 * c
        }, 850, createjs.Ease.quadOut).to({
            scaleX: l,
            scaleY: c
        }, 650, createjs.Ease.quadIn).call(function() {
            h.pulseAnimation()
        })
    }, this.trebleAnimation = function() {
        u = createjs.Tween.get(s).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            h.trebleAnimation()
        })
    }, this.removeAllTweens = function() {
        createjs.Tween.removeTweens(s)
    }, f = void 0 !== o ? o : s_oStage, this._init(t, e, i), h = this, this
}

function CPinDragger(t, e, i, o) {
    var n, r;
    this._init = function(t, e, i, o) {
        r = o;
        var s = 30 / FPS,
            a = {
                images: [i],
                frames: {
                    width: i.width / 8,
                    height: i.height / 4,
                    regX: i.width / 2 / 8,
                    regY: i.height / 2 / 4
                },
                animations: {
                    up: {
                        frames: [8, 7, 6, 5, 4, 3, 2, 1, 0],
                        speed: s
                    },
                    down: [0, 8, 8, s - .15],
                    throw_pins_0: [0, 8, "throw_pins_1", s],
                    throw_pins_1: [9, 31, 31, s]
                }
            },
            l = new createjs.SpriteSheet(a);
        n = createSprite(l, "run", i.width / 2 / 10, i.height / 2 / 4, i.width / 10, i.height / 6), n.x = t, n.y = e, r.addChild(n)
    }, this.getX = function() {
        return n.x
    }, this.getY = function() {
        return n.y
    }, this.animThrowPins = function() {
        var t = this;
        n.gotoAndPlay("throw_pins_0"), this.onFinishAnimation(function() {
            var e = s_oScenario.getPinsBinder();
            createjs.Tween.get(e.position).to({
                y: PIN_BINDER_TO_Y
            }, 900).call(function() {
                s_oGame.isAwakwePins(!1)
            }), s_oGame.isAwakwePins(!0), n.gotoAndPlay("throw_pins_1"), playSound("binder", 1, 0), n.removeAllEventListeners(), t.onFinishAnimation(function() {
                n.gotoAndStop(31), n.removeAllEventListeners(), createjs.Tween.get(this).wait(500).call(function() {
                    s_oGame.setPinsPhysicsMovement(!1), s_oGame.repositionPins(), s_oGame.resetScene(), createjs.Tween.get(this).wait(200).call(function() {
                        n.gotoAndPlay("down"), t.onFinishAnimation(function() {
                            n.gotoAndStop(8), createjs.Tween.get(this).wait(200).call(function() {
                                n.gotoAndPlay("up"), s_oGame.updatePinsPosition(), n.removeAllEventListeners(), t.onFinishAnimation(function() {
                                    n.visible = !1, s_oGame.setPinsPhysicsMovement(!0), s_oGame.nextStage(), n.removeAllEventListeners()
                                })
                            })
                        })
                    })
                })
            })
        })
    }, this.takeRemainPinsAndRepos = function() {
        var t = this;
        n.gotoAndPlay("down"), t.onFinishAnimation(function() {
            createjs.Tween.get(t).wait(200).call(function() {
                n.gotoAndPlay("up"), s_oGame.setPinsPhysicsMovement(!1), s_oGame.animUpRemainPins(), n.removeAllEventListeners(), t.onFinishAnimation(function() {
                    n.gotoAndPlay("throw_pins_0"), n.removeAllEventListeners(), t.onFinishAnimation(function() {
                        var e = s_oScenario.getPinsBinder();
                        createjs.Tween.get(e.position).to({
                            y: PIN_BINDER_TO_Y
                        }, 900).call(function() {
                            s_oGame.isAwakwePins(!1)
                        }), s_oGame.isAwakwePins(!0), n.gotoAndPlay("throw_pins_1"), playSound("binder", 1, 0), s_oGame.setPinsPhysicsMovement(!0), n.removeAllEventListeners(), t.onFinishAnimation(function() {
                            n.gotoAndStop(31), n.removeAllEventListeners(), createjs.Tween.get(this).wait(500).call(function() {
                                s_oScenario.getPinsBinder().collisionResponse = 0, createjs.Tween.get(this).wait(200).call(function() {
                                    n.gotoAndPlay("down"), s_oGame.setPinsPhysicsMovement(!1), s_oGame.repositionRemainPins(), t.onFinishAnimation(function() {
                                        n.gotoAndStop(8), createjs.Tween.get(this).wait(200).call(function() {
                                            n.gotoAndPlay("up"), n.removeAllEventListeners(), t.onFinishAnimation(function() {
                                                n.visible = !1, s_oScenario.getPinsBinder().position.y = PINS_BINDER_POSITION.y, s_oGame.activeControl(), s_oGame.setPinsPhysicsMovement(!0), n.removeAllEventListeners()
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    }, this.setPosition = function(t, e) {
        n.x = t, n.y = e
    }, this.setVisible = function(t) {
        n.visible = t
    }, this.changeState = function(t) {
        n.gotoAndPlay(t)
    }, this.onFinishAnimation = function(t) {
        n.on("animationend", function() {
            t()
        })
    }, s_oPinBinder = this, this._init(t, e, i, o)
}

function CMenu() {
    var t, e, i, o, n, r, s, a, l;
    this._init = function() {
        o = createBitmap(s_oSpriteLibrary.getSprite("bg_menu")), s_oStage.addChild(o);
        var c = s_oSpriteLibrary.getSprite("but_play");
        if (e = {
                x: CANVAS_WIDTH / 2,
                y: CANVAS_HEIGHT - 340
            }, n = createBitmap(c), n.x = e.x, n.y = e.y, n.regX = .5 * c.width, n.regY = .5 * c.height, s_oStage.addChild(n), r = new createjs.Shape, r.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(e.x - n.regX, e.y - n.regY, 184, 184), r.on("mousedown", this._onMouseDownHitArea, this, !0), r.on("pressup", this._onButPlayRelease, this, !0), r.cursor = "pointer", s_oStage.addChild(r), DISABLE_SOUND_MOBILE === !1 || s_bMobile === !1) {
            var c = s_oSpriteLibrary.getSprite("audio_icon");
            t = {
                x: CANVAS_WIDTH - c.height / 2 - 10,
                y: c.height / 2 + 10
            }, l = new CToggle(t.x, t.y, c, s_bAudioActive), l.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this)
        }
        var h = s_oSpriteLibrary.getSprite("but_info");
        i = {
            x: h.height / 2 + 10,
            y: h.height / 2 + 10
        }, s = new CGfxButton(i.x, i.y, h, s_oStage), s.addEventListener(ON_MOUSE_UP, this._onButInfoRelease, this), a = new createjs.Shape, a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), s_oStage.addChild(a), createjs.Tween.get(a).to({
            alpha: 0
        }, 1e3).call(function() {
            a.visible = !1
        }), this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }, this._onMouseDownHitArea = function() {
        n.scaleX = n.scaleY = .9
    }, this.refreshButtonPos = function(e, o) {
        DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || l.setPosition(t.x - e, o + t.y), s.setPosition(i.x + e, i.y + o)
    }, this.unload = function() {
        r.removeAllEventListeners(), r = null, DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || (l.unload(), l = null), s_oStage.removeAllChildren(), s_oMenu = null
    }, this._onButPlayRelease = function() {
        n.scaleX = n.scaleY = 1, this.unload(), playSound("click", 1, 0), s_oMain.gotoGame()
    }, this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive), s_bAudioActive = !s_bAudioActive
    }, this._onButInfoRelease = function() {
        new CCreditsPanel
    }, s_oMenu = this, this._init()
}

function CTotalScoreBoard(t, e, i, o) {
    var n, r, s, a, l = o;
    return this._init = function(t, e, i) {
        r = new createjs.Container, r.x = t, r.y = e, l.addChild(r), n = createBitmap(i), r.regY = i.height, r.addChild(n), r.addChild(s = this.createText(.5 * i.width, 17, TEXT_TOTAL, 18, "center")), r.addChild(a = this.createText(.5 * i.width, .7 * i.height, "0", 30, "center"))
    }, this.refreshText = function(t) {
        a.text = t
    }, this.createText = function(t, e, i, o, n) {
        var r = new createjs.Text(i, o + "px " + FONT_GAME, "#ffffff");
        return r.textAlign = n, r.textBaseline = "middle", r.x = t, r.y = e, r
    }, this.unload = function() {
        l.removeChild(r)
    }, this.setVisible = function(t) {
        r.visible = t
    }, this._init(t, e, i), this
}

function CTurnBoard(t, e, i, o, n) {
    var r, s, a, l = n;
    return this._init = function(t, e, i, o) {
        s = new createjs.Container, s.x = t, s.y = e, l.addChild(s), a = new Array;
        var n = {
                images: [o],
                frames: {
                    width: o.width / 2,
                    height: o.height,
                    regX: 0,
                    regY: 0
                },
                animations: {
                    on: [0],
                    off: [1]
                }
            },
            c = new createjs.SpriteSheet(n);
        r = createSprite(c, "off", 0, 0, o.width / 2, o.height), s.addChild(r), i ? (s.addChild(a[0] = this.createText(13, 21, "0", 30, "center")), s.addChild(a[1] = this.createText(35, 21, "", 30, "center")), s.addChild(a[2] = this.createText(58, 21, "", 30, "center")), s.addChild(a[3] = this.createText(63, 56, "0", 30, "right"))) : (s.addChild(a[0] = this.createText(19, 21, "0", 30, "center")),
            s.addChild(a[1] = this.createText(54, 21, "", 30, "center")), s.addChild(a[2] = this.createText(63, 56, "0", 30, "right")))
    }, this.changeState = function(t) {
        r.gotoAndStop(t)
    }, this.refreshTextByID = function(t, e) {
        a[t].text = e
    }, this.createText = function(t, e, i, o, n) {
        var r = new createjs.Text(i, o + "px " + FONT_GAME, "#ffffff");
        return r.textAlign = n, r.textBaseline = "middle", r.x = t, r.y = e, r
    }, this.unload = function() {
        l.removeChild(s)
    }, this.setVisible = function(t) {
        s.visible = t
    }, this._init(t, e, o, i), this
}

function CBall(t, e, i, o, n) {
    var r, s, a, l, c, h, u = null,
        d = 36,
        p = null,
        f = !1;
    return this._init = function(t, e, i) {
        h = new createjs.Container, a.addChild(h), r = createBitmap(i), r.x = t, r.y = e, r.regX = .5 * i.width, r.regY = .5 * i.height;
        var o = s_oSpriteLibrary.getSprite("ball_ref");
        s = createBitmap(o), s.x = t, s.y = e, s.regX = .5 * o.width, s.regY = .5 * -o.height + 15, s.alpha = .75;
        var n = s_oSpriteLibrary.getSprite("ball_shadow");
        c = createBitmap(n), c.x = t, c.y = e, c.regX = .5 * n.width, c.regY = .5 * n.height, h.addChild(c, r, s)
    }, this.unload = function() {
        r.removeAllEventListeners(), a.removeChild(r)
    }, this.setVisible = function(t) {
        h.visible = t
    }, this.startPosShadowY = function(t) {
        u = t
    }, this.getStartShadowYPos = function() {
        return u
    }, this.tweenFade = function(t, e, i) {
        p = createjs.Tween.get(h).wait(i).to({
            alpha: t
        }, e).call(function() {
            p = null
        })
    }, this.playSound = function() {
        f || (playSound("ball_crash", 1, 0), f = !0)
    }, this.setPlayedSound = function(t) {
        f = t
    }, this.animFade = function(t) {
        createjs.Tween.get(h).to({
            alpha: t
        }, 250, createjs.Ease.circleOut).call(function() {
            0 === t && (h.visible = !1, h.alpha = 1, s_oGame.resetBallPosition())
        })
    }, this.setPositionShadow = function(t, e) {
        c.x = t, c.y = e
    }, this.setPosition = function(t, e) {
        s.x = r.x = t, s.y = r.y = e
    }, this.getPhysics = function() {
        return l
    }, this.setAngle = function(t) {
        s.rotation = r.rotation = t
    }, this.getX = function() {
        return r.x
    }, this.getY = function() {
        return r.y
    }, this.getStartScale = function() {
        return d
    }, this.scale = function(t) {
        s.scaleX = r.scaleX = t, s.scaleY = r.scaleY = t
    }, this.scaleShadow = function(t) {
        t > .08 ? (c.scaleX = t, c.scaleY = t) : (c.scaleX = .08, c.scaleY = .08)
    }, this.setAlphaByHeight = function(t) {
        c.alpha = t
    }, this.getScale = function() {
        return r.scaleX
    }, this.getObject = function() {
        return h
    }, this.getDepthPos = function() {
        return l.position.y
    }, l = o, a = n, this._init(t, e, i), this
}

function CTrack(t, e, i, o, n) {
    var r, s, a;
    return this._init = function(t, e, i) {
        r = createBitmap(i), r.x = t, r.y = e, s.addChild(r)
    }, this.setPosition = function(t, e) {
        r.x = t, r.y = e
    }, this.getPhysics = function() {
        return a
    }, this.getObject = function() {
        return r
    }, this.getDepthPos = function() {
        return WALL_TRACK_DEPTH_POSITION.y
    }, this.getHeightPos = function() {
        return WALL_TRACK_DEPTH_POSITION.z
    }, a = o, s = n, this._init(t, e, i), this
}

function CTextButton(t, e, i, o, n, r, s) {
    var a, l, c;
    return this._init = function(t, e, i, o, n, r, s) {
        a = new Array, l = new Array;
        var h = createBitmap(i),
            u = Math.ceil(s / 20),
            d = new createjs.Text(o, "bold " + s + "px " + n, "#000000");
        d.textAlign = "center", d.textBaseline = "alphabetic";
        var p = d.getBounds();
        d.x = i.width / 2 + u, d.y = Math.floor(i.height / 2) + p.height / 3 + u;
        var f = new createjs.Text(o, "bold " + s + "px " + n, r);
        f.textAlign = "center", f.textBaseline = "alphabetic";
        var p = f.getBounds();
        f.x = i.width / 2, f.y = Math.floor(i.height / 2) + p.height / 3, c = new createjs.Container, c.x = t, c.y = e, c.regX = i.width / 2, c.regY = i.height / 2, c.addChild(h, d, f), s_bMobile || (c.cursor = "pointer"), s_oStage.addChild(c), this._initListener()
    }, this.unload = function() {
        c.off("mousedown"), c.off("pressup"), s_oStage.removeChild(c)
    }, this.setVisible = function(t) {
        c.visible = t
    }, this._initListener = function() {
        oParent = this, c.on("mousedown", this.buttonDown), c.on("pressup", this.buttonRelease)
    }, this.addEventListener = function(t, e, i) {
        a[t] = e, l[t] = i
    }, this.buttonRelease = function() {
        c.scaleX = 1, c.scaleY = 1, playSound("click", 1, 0), a[ON_MOUSE_UP] && a[ON_MOUSE_UP].call(l[ON_MOUSE_UP])
    }, this.buttonDown = function() {
        c.scaleX = .9, c.scaleY = .9, a[ON_MOUSE_DOWN] && a[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN])
    }, this.setPosition = function(t, e) {
        c.x = t, c.y = e
    }, this.setX = function(t) {
        c.x = t
    }, this.setY = function(t) {
        c.y = t
    }, this.getButtonImage = function() {
        return c
    }, this.getX = function() {
        return c.x
    }, this.getY = function() {
        return c.y
    }, this._init(t, e, i, o, n, r, s), this
}

function CHelpPanel(t, e, i) {
    var o, n, r, s, a, l, c, h, u, d, p, f = !1;
    this._init = function(t, e, i) {
        createjs.Ticker.paused = !1, u = new createjs.Container, u.x = t, u.y = e, s_oStage.addChild(u), h = new createjs.Shape, h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), h.alpha = .7, u.addChild(h), c = createBitmap(i), c.x = CANVAS_WIDTH_HALF, c.y = CANVAS_HEIGHT_HALF - 30, c.regX = .5 * i.width, c.regY = .5 * i.height, u.addChild(c), p = new createjs.Container, p.y = -60, u.addChild(p);
        var n = TEXT_HELP1_PC,
            r = "key_left",
            s = "key_right",
            a = 26,
            l = .7;
        s_bMobile && (n = TEXT_HELP1_MOBILE, r = "arrow_left", s = "arrow_right", l = .5, a = 30), o = new createjs.Text(n, a + "px " + FONT_GAME, TEXT_COLOR), o.textAlign = "center", o.lineWidth = 400, o.x = .5 * CANVAS_WIDTH, o.y = .5 * CANVAS_HEIGHT - 360, u.addChild(o), this.directionControl(r, s, l), this.powerBarControl(), this.effectArrow();
        var f = s_oSpriteLibrary.getSprite("but_continue");
        d = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT_HALF + 400, f, p), d.addEventListener(ON_MOUSE_UP, this._onExitHelp, this), d.pulseAnimation();
        var m = this;
        u.on("pressup", function() {
            m._onExitHelp()
        }), u.cursor = "pointer"
    }, this.directionControl = function(t, e, i) {
        var o = s_oSpriteLibrary.getSprite(t);
        r = createBitmap(o), r.x = CANVAS_WIDTH_HALF - 150, r.y = CANVAS_HEIGHT_HALF - 170, r.regX = .5 * o.width, r.regY = .5 * o.height, r.scaleX = r.scaleY = i, p.addChild(r);
        var a = s_oSpriteLibrary.getSprite(e);
        n = createBitmap(a), n.x = CANVAS_WIDTH_HALF + 150, n.y = CANVAS_HEIGHT_HALF - 170, n.regX = .5 * a.width, n.regY = .5 * a.height, n.scaleX = n.scaleY = i, p.addChild(n);
        var l = s_oSpriteLibrary.getSprite("ball");
        s = createBitmap(l), s.x = CANVAS_WIDTH_HALF, s.y = CANVAS_HEIGHT_HALF - 170, s.regX = .5 * l.width, s.regY = .5 * l.height, p.addChild(s);
        var c = new createjs.Text(TEXT_MOVE, "36px " + FONT_GAME, TEXT_COLOR);
        c.textAlign = "center", c.lineWidth = 300, c.x = .5 * CANVAS_WIDTH, c.y = CANVAS_HEIGHT_HALF - 115, p.addChild(c), this.animArrowControl()
    }, this.powerBarControl = function() {
        a = new CPowerBar(CANVAS_WIDTH_HALF - 135, CANVAS_HEIGHT_HALF - 50, p), a.animateMask(TIME_POWER_BAR)
    }, this.effectArrow = function() {
        var t = s_oSpriteLibrary.getSprite("effect_arrow");
        l = new CEffectArray(CANVAS_WIDTH_HALF + 250, CANVAS_HEIGHT_HALF + 155, t, p), l.animArrow()
    }, this.animArrowControl = function() {
        var t = this;
        r.scaleX = r.scaleY = .8, createjs.Tween.get(s).to({
            x: CANVAS_WIDTH_HALF - 25
        }, 750).call(function() {
            r.scaleX = r.scaleY = 1, n.scaleX = n.scaleY = .8, createjs.Tween.get(s).to({
                x: CANVAS_WIDTH_HALF + 25
            }, 750).call(function() {
                n.scaleX = n.scaleY = 1, t.animArrowControl()
            })
        })
    }, this.unload = function() {
        createjs.Tween.get(u).to({
            alpha: 0
        }, 500, createjs.Ease.cubicIn).call(function() {
            s_oStage.removeChild(u)
        });
        var t = this;
        u.off("pressup", function() {
            t._onExitHelp()
        })
    }, this._onExitHelp = function() {
        f || (f = !0, this.unload(), s_oGame.onExitHelp())
    }, this._init(t, e, i)
}

function TimeSeries(t) {
    t = t || {}, t.resetBoundsInterval = t.resetBoundsInterval || 3e3, t.resetBounds = void 0 === t.resetBounds ? !0 : t.resetBounds, this.options = t, this.data = [], this.label = t.label || "", this.maxDataLength = t.maxDataLength || 1e3, this.dataPool = [], this.maxValue = Number.NaN, this.minValue = Number.NaN, t.resetBounds && (this.boundsTimer = setInterval(function(t) {
        return function() {
            t.resetBounds()
        }
    }(this), t.resetBoundsInterval))
}

function SmoothieChart(t) {
    t = t || {}, t.grid = t.grid || {
        fillStyle: "#000000",
        strokeStyle: "#777777",
        lineWidth: 1,
        millisPerLine: 1e3,
        verticalSections: 2
    }, t.millisPerPixel = t.millisPerPixel || 20, t.fps = t.fps || 50, t.maxValueScale = t.maxValueScale || 1, t.minValue = t.minValue, t.maxValue = t.maxValue, t.labels = t.labels || {
        fillStyle: "#ffffff"
    }, t.interpolation = t.interpolation || "bezier", t.scaleSmoothing = t.scaleSmoothing || .125, t.maxDataSetLength = t.maxDataSetLength || 2, t.timestampFormatter = t.timestampFormatter || null, this.options = t, this.seriesSet = [], this.currentValueRange = 1, this.currentVisMinValue = 0
}

function CEffectArray(t, e, i, o) {
    var n, r, s, a, l, c;
    return this._init = function(t, e, i, o) {
        n = {
            x: t,
            y: e
        }, a = new createjs.Container, a.x = t, a.y = e, l = o, l.addChild(a);
        var s = SPEED_EFFECT_ARROW / FPS,
            h = {
                images: [i],
                frames: {
                    width: i.width / 10,
                    height: i.height / 2,
                    regX: i.width / 2 / 10,
                    regY: i.height / 2 / 2
                },
                animations: {
                    normal: [0, 19, "reverse", s],
                    reverse: {
                        frames: [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                        speed: s
                    }
                }
            },
            u = new createjs.SpriteSheet(h);
        r = createSprite(u, "normal", i.width / 2 / 10, i.height / 2 / 2, i.width / 10, i.height / 2), r.y = -30, c = r.regX = i.width / 2 / 10, this.stopAnimation(), a.addChild(r), this.createTextEffect(i)
    }, this.getX = function() {
        return r.x
    }, this.getY = function() {
        return r.y
    }, this.getStartPos = function() {
        return n
    }, this.playAnimation = function() {
        r.play()
    }, this.stopAnimation = function() {
        r.stop()
    }, this.getStoppedFrame = function() {
        return r.currentFrame * r.scaleX
    }, this.removeAllEventListeners = function() {
        r.removeAllEventListeners()
    }, this.setPosition = function(t, e) {
        a.x = t, a.y = e
    }, this.setVisible = function(t) {
        a.visible = t
    }, this.getScaleX = function() {
        return r.scaleX
    }, this.createTextEffect = function(t) {
        s = new createjs.Text(TEXT_EFFECT, "36px " + FONT_GAME, "#ffffff"), s.textAlign = "center", s.textBaseline = "middle", s.x = 1.6 * -c, s.y = t.height / 4, a.addChild(s)
    }, this.animArrow = function() {
        var t = this;
        r.gotoAndPlay("normal"), this.onFinishAnimation(function() {
            r.gotoAndPlay("reverse"), r.removeAllEventListeners(), t.onFinishAnimation(function() {
                r.scaleX *= -1, -1 === r.scaleX ? r.regX = 2 * -c - 14 : r.regX = c, r.removeAllEventListeners(), t.animArrow()
            })
        })
    }, this.changeState = function(t) {
        var e = this;
        r.gotoAndPlay(t), this.onFinishAnimation(function() {
            e.loopAnimArray()
        })
    }, this.animFade = function(t) {
        createjs.Tween.get(r).to({
            alpha: t
        }, 250, createjs.Ease.circleOut).call(function() {
            0 === t && (a.visible = !1)
        })
    }, this.onFinishAnimation = function(t) {
        r.on("animationend", function() {
            t()
        })
    }, this.unload = function() {
        r.removeAllEventListeners(), l.removeChild(a)
    }, this._init(t, e, i, o), this
}

function CEndPanel(t) {
    var e, i, o, n, r, s, a;
    return this._init = function(t) {
        o = new createjs.Shape, o.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), o.alpha = .7, o.on("click", function() {}), e = createBitmap(t), e.x = CANVAS_WIDTH_HALF, e.y = CANVAS_HEIGHT_HALF + 95, e.regX = .5 * t.width, e.regY = .5 * t.height, o.on("click", function() {}, null, !0), n = new createjs.Text("", "72px " + SECONDARY_FONT, "#fff"), n.x = CANVAS_WIDTH / 2, n.y = CANVAS_HEIGHT / 2 - 50, n.textAlign = "center", n.textBaseline = "alphabetic", n.lineHeight = 60, n.lineWidth = 450, r = new createjs.Text("", "45px " + SECONDARY_FONT, "#fff"), r.x = CANVAS_WIDTH / 2, r.y = CANVAS_HEIGHT / 2 + 30, r.textAlign = "center", r.textBaseline = "alphabetic", r.lineHeight = 60, r.lineWidth = 470, i = new createjs.Container, i.alpha = 0, i.visible = !1, i.addChild(o, e, r, n);
        var l = s_oSpriteLibrary.getSprite("but_restart");
        s = new CGfxButton(CANVAS_WIDTH / 2 + 170, CANVAS_HEIGHT_HALF + 120, l, i);
        var c = s_oSpriteLibrary.getSprite("but_home");
        a = new CGfxButton(CANVAS_WIDTH / 2 - 170, CANVAS_HEIGHT_HALF + 120, c, i), s_oStage.addChild(i)
    }, this.unload = function() {
        o.off("click", function() {}), createjs.Tween.get(i).to({
            alpha: 0
        }, 500).call(function() {
            a.unload(), s.unload(), s_oStage.removeChild(i)
        })
    }, this._initListener = function() {
        a.addEventListener(ON_MOUSE_UP, this._onExit, this), s.addEventListener(ON_MOUSE_UP, this._onRestart, this)
    }, this.show = function(t) {
        n.text = TEXT_GAMEOVER, r.text = TEXT_SCORE + ": " + t, i.visible = !0;
        var e = this;
        createjs.Tween.get(i).to({
            alpha: 1
        }, 500).call(function() {
            e._initListener(), s_iAdsLevel === NUM_LEVEL_FOR_ADS ? ($(s_oMain).trigger("show_interlevel_ad"), s_iAdsLevel = 1) : s_iAdsLevel++
        }), $(s_oMain).trigger("share_event", t), $(s_oMain).trigger("save_score", t)
    }, this._onRestart = function() {
        this.unload(), s_oGame.restartGame()
    }, this._onExit = function() {
        this.unload(), s_oGame.onExit()
    }, this._init(t), this
}

function CPin(t, e, i, o, n) {
    var r, s, a, l, c, h, u, d, p, f = null,
        m = 190,
        v = null,
        y = !1,
        g = !1;
    return this._init = function(t, e, i) {
        h = new createjs.Container, a.addChild(h), s = this.createPin(t, e, i), c = this.createPin(t, e, i), c.scaleY = -1, p = c.regY += PIN_REF_REGY_FACTOR + .5, this.scale(m), d = new CANNON.Vec3, h.addChild(c, s)
    }, this.createPin = function() {
        var o, n = {
                images: [i],
                frames: {
                    width: i.width / 10,
                    height: i.height / 8,
                    regX: i.width / 10 / 2,
                    regY: i.height / 8 / 2
                }
            },
            r = new createjs.SpriteSheet(n);
        return o = createSprite(r, 0, i.width / 10 / 2, i.height / 8 / 2, i.width / 10, i.height / 8), o.stop(), o.x = t, o.y = e, o
    }, this.setStartPos = function(t, e) {
        r = {
            x: t,
            y: e
        }
    }, this.getStartPos = function() {
        return r
    }, this.resetState = function() {
        s.gotoAndStop(0), this.setPosition(r.x, r.y), h.alpha = 1
    }, this.isDownYet = function() {
        return y
    }, this.setDown = function(t) {
        y = t, t && createjs.Tween.get(this).wait(750).call(function() {
            s_oScenario.setElementVelocity(l, {
                x: 0,
                y: 0,
                z: 0
            })
        })
    }, this.animReposition = function(t, e) {
        createjs.Tween.get(s).to({
            y: t
        }, 500), createjs.Tween.get(c).wait(250).to({
            alpha: e
        }, 200)
    }, this.animTake = function(t) {
        createjs.Tween.get(s).to({
            y: t
        }, 500).call(function() {
            h.visible = !1
        }), createjs.Tween.get(c).to({
            alpha: 0
        }, 200)
    }, this.unload = function() {
        a.removeChild(h)
    }, this.startPosShadowY = function(t) {
        f = t
    }, this.getStartShadowYPos = function() {
        return f
    }, this.tweenFade = function(t, e, i) {
        v = createjs.Tween.get(h).wait(i).to({
            alpha: t
        }, e).call(function() {
            v = null
        })
    }, this.playAudio = function() {
        g || (playSound("pin_hitted", 1, 0), g = !0)
    }, this.setPlayedSound = function(t) {
        g = t
    }, this.pinRotation = function() {
        l.quaternion.y = 0, l.quaternion.toEuler(d), l.shapes[0].getAveragePointLocal(d), d.x = Math.round(Math.degrees(2 * d.x)), d.y = Math.round(Math.degrees(2 * d.y)), d.z = Math.round(Math.degrees(2 * d.z)), 0 === d.x ? (s.gotoAndStop(0), c.gotoAndStop(0)) : d.y <= 9 && d.y > 7 || d.y > -9 && d.y < -7 ? d.x >= -2 && d.x <= 3 ? s.gotoAndStop(29) : d.x >= 4 && d.x <= 7 ? s.gotoAndStop(19) : d.x >= 8 && d.x <= 12 ? s.gotoAndStop(9) : d.x >= 13 && d.x <= 15 ? s.gotoAndStop(79) : d.x >= 16 && d.x <= 18 || d.x <= -16 && d.x >= -18 ? s.gotoAndStop(69) : d.x >= -15 && d.x <= -12 ? s.gotoAndStop(59) : d.x >= -11 && d.x <= -6 ? s.gotoAndStop(49) : d.x >= -5 && d.x <= -2 && s.gotoAndStop(39) : d.z >= -3 && d.z <= 3 ? d.y >= -8 && d.y <= 8 ? 0 === d.x ? s.gotoAndStop(0) : 1 === d.x ? s.gotoAndStop(1) : 2 === d.x ? s.gotoAndStop(2) : 3 === d.x ? s.gotoAndStop(3) : 4 === d.x ? s.gotoAndStop(4) : 5 === d.x ? s.gotoAndStop(5) : 6 === d.x ? s.gotoAndStop(6) : 7 === d.x ? s.gotoAndStop(7) : 8 === d.x ? s.gotoAndStop(8) : 9 === d.x ? s.gotoAndStop(9) : -1 === d.x ? s.gotoAndStop(41) : -2 === d.x ? s.gotoAndStop(42) : -3 === d.x ? s.gotoAndStop(43) : -4 === d.x ? s.gotoAndStop(44) : -5 === d.x ? s.gotoAndStop(45) : -6 === d.x ? s.gotoAndStop(46) : -7 === d.x ? s.gotoAndStop(47) : -8 === d.x ? s.gotoAndStop(48) : -9 === d.x && s.gotoAndStop(49) : (d.y <= -8 && d.y >= -18 || d.y <= 18 && d.y >= 11) && (0 === d.x ? s.gotoAndStop(0) : 1 === d.x ? s.gotoAndStop(41) : 2 === d.x ? s.gotoAndStop(42) : 3 === d.x ? s.gotoAndStop(43) : 4 === d.x ? s.gotoAndStop(44) : 5 === d.x ? s.gotoAndStop(45) : 6 === d.x ? s.gotoAndStop(46) : 7 === d.x ? s.gotoAndStop(47) : 8 === d.x ? s.gotoAndStop(48) : 9 === d.x ? s.gotoAndStop(49) : -1 === d.x ? s.gotoAndStop(1) : -2 === d.x ? s.gotoAndStop(2) : -3 === d.x ? s.gotoAndStop(3) : -4 === d.x ? s.gotoAndStop(4) : -5 === d.x ? s.gotoAndStop(5) : -6 === d.x ? s.gotoAndStop(6) : -7 === d.x ? s.gotoAndStop(7) : -8 === d.x ? s.gotoAndStop(8) : -9 === d.x && s.gotoAndStop(9)) : d.z >= 4 && d.z <= 7 ? d.y >= -8 && d.y <= 8 ? 0 === d.x ? s.gotoAndStop(10) : 1 === d.x ? s.gotoAndStop(11) : 2 === d.x ? s.gotoAndStop(12) : 3 === d.x ? s.gotoAndStop(13) : 4 === d.x ? s.gotoAndStop(14) : 5 === d.x ? s.gotoAndStop(15) : 6 === d.x ? s.gotoAndStop(16) : 7 === d.x ? s.gotoAndStop(17) : 8 === d.x ? s.gotoAndStop(18) : 9 === d.x ? s.gotoAndStop(19) : -1 === d.x ? s.gotoAndStop(51) : -2 === d.x ? s.gotoAndStop(52) : -3 === d.x ? s.gotoAndStop(53) : -4 === d.x ? s.gotoAndStop(54) : -5 === d.x ? s.gotoAndStop(55) : -6 === d.x ? s.gotoAndStop(56) : -7 === d.x ? s.gotoAndStop(57) : -8 === d.x ? s.gotoAndStop(58) : -9 === d.x && s.gotoAndStop(59) : (d.y <= -8 && d.y >= -18 || d.y <= 18 && d.y >= 10) && (0 === d.x ? s.gotoAndStop(0) : 1 === d.x ? s.gotoAndStop(31) : 2 === d.x ? s.gotoAndStop(32) : 3 === d.x ? s.gotoAndStop(33) : 4 === d.x ? s.gotoAndStop(34) : 5 === d.x ? s.gotoAndStop(35) : 6 === d.x ? s.gotoAndStop(36) : 7 === d.x ? s.gotoAndStop(37) : 8 === d.x ? s.gotoAndStop(38) : 9 === d.x ? s.gotoAndStop(39) : -1 === d.x ? s.gotoAndStop(71) : -2 === d.x ? s.gotoAndStop(72) : -3 === d.x ? s.gotoAndStop(73) : -4 === d.x ? s.gotoAndStop(74) : -5 === d.x ? s.gotoAndStop(75) : -6 === d.x ? s.gotoAndStop(76) : -7 === d.x ? s.gotoAndStop(77) : -8 === d.x ? s.gotoAndStop(78) : -9 === d.x && s.gotoAndStop(79)) : d.z >= 8 && d.z <= 10 ? 0 === d.x ? s.gotoAndStop(20) : 1 === d.x ? s.gotoAndStop(21) : 2 === d.x ? s.gotoAndStop(22) : 3 === d.x ? s.gotoAndStop(23) : 4 === d.x ? s.gotoAndStop(24) : 5 === d.x ? s.gotoAndStop(25) : 6 === d.x ? s.gotoAndStop(26) : 7 === d.x ? s.gotoAndStop(27) : 8 === d.x ? s.gotoAndStop(28) : 9 === d.x ? s.gotoAndStop(29) : -1 === d.x ? s.gotoAndStop(61) : -2 === d.x ? s.gotoAndStop(62) : -3 === d.x ? s.gotoAndStop(63) : -4 === d.x ? s.gotoAndStop(64) : -5 === d.x ? s.gotoAndStop(65) : -6 === d.x ? s.gotoAndStop(66) : -7 === d.x ? s.gotoAndStop(67) : -8 === d.x ? s.gotoAndStop(68) : -9 === d.x && s.gotoAndStop(69) : d.z <= -4 && d.z >= -7 ? d.y >= -10 && d.y <= 10 ? 0 === d.x ? s.gotoAndStop(70) : 1 === d.x ? s.gotoAndStop(71) : 2 === d.x ? s.gotoAndStop(72) : 3 === d.x ? s.gotoAndStop(73) : 4 === d.x ? s.gotoAndStop(74) : 5 === d.x ? s.gotoAndStop(75) : 6 === d.x ? s.gotoAndStop(76) : 7 === d.x ? s.gotoAndStop(77) : 8 === d.x ? s.gotoAndStop(78) : 9 === d.x ? s.gotoAndStop(79) : -1 === d.x ? s.gotoAndStop(31) : -2 === d.x ? s.gotoAndStop(32) : -3 === d.x ? s.gotoAndStop(33) : -4 === d.x ? s.gotoAndStop(34) : -5 === d.x ? s.gotoAndStop(35) : -6 === d.x ? s.gotoAndStop(36) : -7 === d.x ? s.gotoAndStop(37) : -8 === d.x ? s.gotoAndStop(38) : -9 === d.x && s.gotoAndStop(39) : (d.y <= -11 && d.y >= -18 || d.y <= 18 && d.y >= 11) && (0 === d.x ? s.gotoAndStop(50) : 1 === d.x ? s.gotoAndStop(51) : 2 === d.x ? s.gotoAndStop(52) : 3 === d.x ? s.gotoAndStop(53) : 4 === d.x ? s.gotoAndStop(54) : 5 === d.x ? s.gotoAndStop(55) : 6 === d.x ? s.gotoAndStop(56) : 7 === d.x ? s.gotoAndStop(57) : 8 === d.x ? s.gotoAndStop(58) : 9 === d.x ? s.gotoAndStop(59) : -1 === d.x ? s.gotoAndStop(11) : -2 === d.x ? s.gotoAndStop(12) : -3 === d.x ? s.gotoAndStop(13) : -4 === d.x ? s.gotoAndStop(14) : -5 === d.x ? s.gotoAndStop(15) : -6 === d.x ? s.gotoAndStop(16) : -7 === d.x ? s.gotoAndStop(17) : -8 === d.x ? s.gotoAndStop(18) : -9 === d.x && s.gotoAndStop(19)) : -8 === d.z && (0 === d.x ? s.gotoAndStop(60) : 1 === d.x ? s.gotoAndStop(61) : 2 === d.x ? s.gotoAndStop(62) : 3 === d.x ? s.gotoAndStop(63) : 4 === d.x ? s.gotoAndStop(64) : 5 === d.x ? s.gotoAndStop(65) : 6 === d.x ? s.gotoAndStop(66) : 7 === d.x ? s.gotoAndStop(67) : 8 === d.x ? s.gotoAndStop(68) : 9 === d.x ? s.gotoAndStop(69) : -1 === d.x ? s.gotoAndStop(21) : -2 === d.x ? s.gotoAndStop(22) : -3 === d.x ? s.gotoAndStop(23) : -4 === d.x ? s.gotoAndStop(24) : -5 === d.x ? s.gotoAndStop(25) : -6 === d.x ? s.gotoAndStop(26) : -7 === d.x ? s.gotoAndStop(27) : -8 === d.x ? s.gotoAndStop(28) : -9 === d.x && s.gotoAndStop(29)), c.gotoAndStop(s.currentFrame)
    }, this.getPosRef = function() {
        return u
    }, this.setPosRef = function(t) {
        u = t
    }, this.setRegYRef = function(t) {
        c.regY = t
    }, this.getRegYRef = function() {
        return p
    }, this.setPositionReflection = function(t, e) {
        c.x = t, c.y = e
    }, this.setPosition = function(t, e) {
        s.x = t, s.y = e
    }, this.getPhysics = function() {
        return l
    }, this.setAlpha = function(t) {
        h.alpha = t
    }, this.setAngle = function(t) {
        s.rotation = t
    }, this.setVisible = function(t) {
        h.visible = t
    }, this.setVisibleRef = function(t) {
        c.visible = t
    }, this.getVisible = function() {
        return h.visible
    }, this.isVisibleRef = function() {
        return c.visible
    }, this.getX = function() {
        return s.x
    }, this.getY = function() {
        return s.y
    }, this.getStartScale = function() {
        return m
    }, this.scale = function(t) {
        s.scaleX = t, s.scaleY = t, c.scaleX = t, c.scaleY = -t
    }, this.setAlphaByHeight = function(t) {
        c.alpha = t
    }, this.getAlphaRef = function() {
        return c.alpha
    }, this.getScale = function() {
        return s.scaleX
    }, this.getObject = function() {
        return h
    }, this.getDepthPos = function() {
        return l.position.y
    }, l = o, a = n, this._init(t, e, i), this
}

function CCreditsPanel() {
    var t, e, i, o, n, r, s, a;
    this._init = function() {
        a = new createjs.Container, s_oStage.addChild(a);
        var l = s_oSpriteLibrary.getSprite("msg_box");
        n = new createjs.Shape, n.graphics.beginFill("#000").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), n.alpha = .8, n.on("click", this._onLogoButRelease), n.cursor = "pointer", a.addChild(n), t = createBitmap(l), t.x = CANVAS_WIDTH_HALF, t.y = CANVAS_HEIGHT_HALF + 95, t.regX = .5 * l.width, t.regY = .5 * l.height, a.addChild(t);
        var c = s_oSpriteLibrary.getSprite("but_exit");
        s = {
            x: .5 * CANVAS_WIDTH + 205,
            y: 593
        }, i = new CGfxButton(s.x, s.y, c, a), i.addEventListener(ON_MOUSE_UP, this.unload, this), o = new createjs.Text(TEXT_CREDITS_DEVELOPED, "42px " + SECONDARY_FONT, "#ffffff"), o.textAlign = "center", o.textBaseline = "alphabetic", o.x = CANVAS_WIDTH / 2, o.y = CANVAS_HEIGHT_HALF - 50, a.addChild(o), c = s_oSpriteLibrary.getSprite("logo_ctl"), e = createBitmap(c), e.regX = c.width / 2, e.regY = c.height / 2, e.x = CANVAS_WIDTH / 2, e.y = CANVAS_HEIGHT_HALF + 25, a.addChild(e), r = new createjs.Text(TEXT_LINK1, "42px " + SECONDARY_FONT, "#ffffff"), r.textAlign = "center", r.textBaseline = "alphabetic", r.x = CANVAS_WIDTH / 2, r.y = e.y + 100, a.addChild(r)
    }, this.unload = function() {
        n.off("click", this._onLogoButRelease), i.unload(), i = null, s_oStage.removeChild(a)
    }, this._onLogoButRelease = function() {
        //window.open("", "_blank")
    }, this._init()
}

function CCharacter(t, e, i) {
    var o, n, r = new Array,
        s = i,
        a = 0,
        l = 0;
    return this._init = function(t, e) {
        o = {
            x: t,
            y: e
        }, n = new createjs.Container, n.x = o.x, n.y = o.y, n.regX = 20, s.addChild(n);
        for (var i = 0; NUM_SPRITE_PLAYER > i; i++) r.push(createBitmap(s_oSpriteLibrary.getSprite("player_" + i))), r[i].visible = !1, n.addChild(r[i]);
        r[0].visible = !0
    }, this.setPosition = function(t, e) {
        n.x = t, n.y = e
    }, this.getX = function() {
        return n.x
    }, this.getY = function() {
        return n.y
    }, this.getStartPos = function() {
        return o
    }, this.setVisible = function(t) {
        n.visible = t
    }, this.animFade = function(t) {
        var e = this;
        createjs.Tween.get(n).to({
            alpha: t
        }, 250).call(function() {
            0 === t && (n.visible = !1, e.hideCharacter(NUM_SPRITE_PLAYER - 1), e.viewCharacter(a))
        })
    }, this.viewCharacter = function(t) {
        r[t].visible = !0
    }, this.hideCharacter = function(t) {
        r[t].visible = !1
    }, this.getFrame = function() {
        return a
    }, this.animCharacter = function() {
        if (l++, l >= BUFFER_ANIM_PLAYER) {
            if (this.hideCharacter(a), !(NUM_SPRITE_PLAYER > a + 1)) return this.viewCharacter(a), a = 0, l = 0, !1;
            this.viewCharacter(a + 1), a++, l = 0
        }
        return !0
    }, this._init(t, e), s_oAnimMonitor = this, this
}

function CInterface() {
    var t, e, i, o, n, r, s, a, l, c, h = null,
        u = null;
    return this._init = function() {
        a = new createjs.Container, c = a.y = 161, a.regY = s_oSpriteLibrary.getSprite("monitor_strike_0").height + s_oSpriteLibrary.getSprite("turn_board").height, s_oStage.addChild(a), r = new CTurnsBoard(TURNS_BOARD_POS.x, TURNS_BOARD_POS.y, a);
        var n = s_oSpriteLibrary.getSprite("total_board");
        s = new CTotalScoreBoard(r.getLastX(), TURNS_BOARD_POS.y, n, a), u = new CController;
        var l = s_oSpriteLibrary.getSprite("but_exit");
        if (e = {
                x: CANVAS_WIDTH - l.height / 2 - 10,
                y: l.height / 2 + 10
            }, i = new CGfxButton(e.x, e.y, l), i.addEventListener(ON_MOUSE_UP, this._onExit, this), DISABLE_SOUND_MOBILE === !1 || s_bMobile === !1) {
            var l = s_oSpriteLibrary.getSprite("audio_icon");
            t = {
                x: e.x - l.height - 10,
                y: e.y
            }, o = new CToggle(t.x, t.y, l, s_bAudioActive), o.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this)
        }
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    }, this.refreshButtonPos = function(n, r) {
        if (i.setPosition(e.x - n, r + e.y), DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || o.setPosition(t.x - n, r + t.y), a.x = n, a.y = c - -0.5 * n + 1, a.scaleX = a.scaleY = .5 * n / EDGEBOARD_X * (BOARD_SCALE_F - 1) + 1, s_oGame.refreshPos(n, r), null !== u) {
            var s = u.getStartPositionControlLeft();
            u.setPositionControlLeft(s.x + n, s.y - r);
            var l = u.getStartPositionControlRight();
            u.setPositionControlRight(l.x - n, l.y - r)
        }
    }, this.unload = function() {
        i.unload(), i = null, this.onExitFromHelp(), DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || (o.unload(), o = null), s_oInterface = null
    }, this.getContainerBoard = function() {
        return a
    }, this.onExitFromHelp = function() {
        null !== h && (h.unload(), h = null)
    }, this.createHelpPanel = function() {
        h = new CHelpPanel(0, 0, s_oSpriteLibrary.getSprite("bg_help"))
    }, this.createEndPanel = function(t) {
        l = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box")), l.show(t)
    }, this.resetTurnsBoard = function() {
        r.resetAllTurnBoard()
    }, this.refreshTurnsBoard = function(t, e, i, o, n) {
        var s = r.getTurnBoard(t);
        null !== e && s.refreshTextByID(e - 1, o), n ? s.refreshTextByID(3, i) : s.refreshTextByID(2, i)
    }, this.refresTotalBoard = function(t) {
        s.refreshText(t)
    }, this.setStateTurnBoard = function(t, e) {
        r.stateTurnBoard(t, e)
    }, this._onAudioToggle = function() {
        createjs.Sound.setMute(s_bAudioActive), s_bAudioActive = !s_bAudioActive
    }, this._onExit = function() {
        var t = new CAreYouSurePanel(s_oStage);
        t.show()
    }, this.unloadPause = function() {
        n.unload(), n = null
    }, this.dirArrowsVisibility = function(t) {
        null !== u && u.arrowVisibility(t)
    }, this.onButPauseRelease = function() {
        playSound("click", 1, 0), n = new CPause
    }, s_oInterface = this, this._init(), this
}

function CAnimMonitor(t, e, i) {
    var o, n, r, s, a, l, c = new Array,
        h = new Array,
        u = new Array,
        d = i,
        p = 1,
        f = 0,
        m = 0;
    return this._init = function(t, e) {
        o = {
            x: t,
            y: e
        }, r = new createjs.Container, r.x = o.x, r.y = o.y, d.addChild(r), s = new createjs.Container, r.addChild(s), s.visible = !1, a = new createjs.Container, r.addChild(a), a.visible = !1, l = new createjs.Container, r.addChild(l), l.visible = !1;
        for (var t = 0, e = 0, i = s_oSpriteLibrary.getSprite("pattern_monitor"), p = 0; NUM_SPRITE_MONITOR > p; p++) c.push(createBitmap(s_oSpriteLibrary.getSprite("monitor_strike_" + p))), c[p].visible = !1, s.addChild(c[p]), h.push(createBitmap(s_oSpriteLibrary.getSprite("monitor_spare_" + p))), h[p].visible = !1, a.addChild(h[p]), u.push(createBitmap(s_oSpriteLibrary.getSprite("monitor_gutterball_" + p))), u[p].visible = !1, l.addChild(u[p]);
        c[0].visible = !0, h[0].visible = !0, u[0].visible = !0;
        var f = new createjs.Matrix2D;
        f.a = f.d = .16, n = new createjs.Shape, n.graphics.beginBitmapFill(i, "repeat", f).drawRect(0, 0, 790, 88), n.y = 1, n.alpha = .65, r.addChild(n), r.regY = s_oSpriteLibrary.getSprite("monitor_strike_0").height
    }, this.setPosition = function(t, e) {
        r.x = t, r.y = e
    }, this.getStartPos = function() {
        return o
    }, this.setVisibleMonitorStrike = function(t) {
        s.visible = t
    }, this.setVisibleMonitorSpare = function(t) {
        a.visible = t
    }, this.setVisibleMonitorGutter = function(t) {
        l.visible = t
    }, this.viewMonitor = function(t, e) {
        t[e].visible = !0
    }, this.hideMonitor = function(t, e) {
        t[e].visible = !1
    }, this.getStrikeArray = function() {
        return c
    }, this.getSpareArray = function() {
        return h
    }, this.getGutterArray = function() {
        return u
    }, this.scaleFactor = function(t) {
        r.scaleX = r.scaleY = .5 * t / EDGEBOARD_X * (ANIM_MONITOR_SCALE_F - p) + p
    }, this.disableRunningMonitor = function() {
        s.visible = !1, a.visible = !1, l.visible = !1
    }, this.animMonitor = function(t) {
        if (m += s_iTimeElaps, m > BUFFER_ANIM_MONITOR) {
            if (this.hideMonitor(t, f), !(NUM_SPRITE_MONITOR > f + 1)) return this.disableRunningMonitor(), f = 0, m = 0, this.viewMonitor(t, f), !1;
            this.viewMonitor(t, f + 1), f++, m = 0
        }
        return !0
    }, this._init(t, e), s_oAnimMonitor = this, this
}

function CSemaphore(t, e, i, o) {
    var n, r, s;
    return this._init = function(t, e, i) {
        n = this.createSemaphore(t, e, i), s = this.createSemaphore(t, e, i), s.y += 155, s.scaleY = -.95, s.alpha = .25, r.addChild(n), r.addChildAt(s, 13)
    }, this.createSemaphore = function(t, e, i) {
        var o, n = {
                images: [i],
                frames: {
                    width: i.width / 2,
                    height: i.height,
                    regX: i.width / 2 / 2,
                    regY: i.height / 2
                },
                animations: {
                    green: 1,
                    red: 0
                }
            },
            r = new createjs.SpriteSheet(n);
        return o = createSprite(r, 1, i.width / 2 / 2, i.height / 2, i.width / 2, i.height), o.stop(), o.x = t, o.y = e, o
    }, this.changeState = function(t) {
        n.gotoAndStop(t), s.gotoAndStop(t)
    }, this.unload = function() {
        r.removeChild(n, s)
    }, this.setPositionShadow = function(t, e) {
        s.x = t, s.y = e
    }, this.setPosition = function(t, e) {
        n.x = t, n.y = e
    }, this.setVisible = function(t) {
        n.visible = t, s.visible = t
    }, this.getX = function() {
        return n.x
    }, this.getY = function() {
        return n.y
    }, r = o, this._init(t, e, i), this
}

function CPreloader() {
    var t, e, i, o, n, r, s, a;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this), s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg"), s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png"), s_oSpriteLibrary.loadSprites(), a = new createjs.Container, s_oStage.addChild(a)
    }, this.unload = function() {
        a.removeAllChildren()
    }, this.hide = function() {
        var t = this;
        setTimeout(function() {
            createjs.Tween.get(s).to({
                alpha: 1
            }, 500).call(function() {
                t.unload(), s_oMain.gotoMenu()
            })
        }, 1e3)
    }, this._onImagesLoaded = function() {}, this._onAllImagesLoaded = function() {
        this.attachSprites(), s_oMain.preloaderReady()
    }, this.attachSprites = function() {
        var l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        a.addChild(l);
        var c = s_oSpriteLibrary.getSprite("progress_bar");
        n = createBitmap(c), n.x = CANVAS_WIDTH / 2 - c.width / 2, n.y = CANVAS_HEIGHT - 300, a.addChild(n), t = c.width, e = c.height, r = new createjs.Shape, r.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(n.x, n.y, 1, e), a.addChild(r), n.mask = r, i = new createjs.Text("", "30px " + FONT_GAME, "#fff"), i.x = CANVAS_WIDTH / 2, i.y = CANVAS_HEIGHT - 300, i.textBaseline = "alphabetic", i.textAlign = "center", a.addChild(i), o = new createjs.Text("", "30px " + SECONDARY_FONT, "#fff"), o.x = CANVAS_WIDTH + 200, o.y = CANVAS_HEIGHT + 200, o.textBaseline = "alphabetic", o.textAlign = "center", a.addChild(o), s = new createjs.Shape, s.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), s.alpha = 0, a.addChild(s)
    }, this.refreshLoader = function(s) {
        i.text = s + "%", o.text = s + "%", r.graphics.clear();
        var a = Math.floor(s * t / 100);
        r.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(n.x, n.y, a, e)
    }, this._init()
}

function CMain(t) {
    var e, i, o, n, r, s, a = 0,
        l = 0,
        c = STATE_LOADING;
    this.initContainer = function() {
        var t = document.getElementById("canvas");
        s_oStage = new createjs.Stage(t), createjs.Touch.enable(s_oStage), s_oStage.preventSelection = !1, s_bMobile = jQuery.browser.mobile, s_bMobile === !1 ? (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function(t) {
            return !1
        }), FPS = FPS_DESKTOP, FPS_TIME = 1 / FPS, BUFFER_ANIM_MONITOR = 20 * (FPS / 30), PHYSICS_STEP = 1 / (FPS * STEP_RATE), ROLL_BALL_RATE = 60 / FPS) : BALL_VELOCITY_MULTIPLIER = .8, s_iPrevTime = (new Date).getTime(), createjs.Ticker.addEventListener("tick", this._update), createjs.Ticker.setFPS(FPS), navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0), s_oSpriteLibrary = new CSpriteLibrary, o = new CPreloader, e = !0
    }, this.soundLoaded = function() {
        a++;
        var t = Math.floor(a / l * 100);
        o.refreshLoader(t), a === l && (o.unload(), DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || (s_oSoundTrack = createjs.Sound.play("soundtrack", {
            loop: -1
        })), this.gotoMenu())
    }, this._initSounds = function() {
        createjs.Sound.initializeDefaultPlugins() && (navigator.userAgent.indexOf("Opera") > 0 || navigator.userAgent.indexOf("OPR") > 0 ? (createjs.Sound.alternateExtensions = ["mp3"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/click.ogg", "click"), createjs.Sound.registerSound("./sounds/ball_hitting.ogg", "ball_hitting"), createjs.Sound.registerSound("./sounds/soundtrack.ogg", "soundtrack"), createjs.Sound.registerSound("./sounds/ball_crash.ogg", "ball_crash"), createjs.Sound.registerSound("./sounds/binder.ogg", "binder"), createjs.Sound.registerSound("./sounds/pin_hitted.ogg", "pin_hitted"), createjs.Sound.registerSound("./sounds/gingle_gutterball.ogg", "gingle_gutterball"), createjs.Sound.registerSound("./sounds/gingle_spare.ogg", "gingle_spare"), createjs.Sound.registerSound("./sounds/gingle_strike.ogg", "gingle_strike"), createjs.Sound.registerSound("./sounds/ambience.ogg", "ambience")) : (createjs.Sound.alternateExtensions = ["ogg"], createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundLoaded, this)), createjs.Sound.registerSound("./sounds/click.mp3", "click"), createjs.Sound.registerSound("./sounds/ball_hitting.mp3", "ball_hitting"), createjs.Sound.registerSound("./sounds/soundtrack.mp3", "soundtrack"), createjs.Sound.registerSound("./sounds/ball_crash.mp3", "ball_crash"), createjs.Sound.registerSound("./sounds/binder.mp3", "binder"), createjs.Sound.registerSound("./sounds/pin_hitted.mp3", "pin_hitted"), createjs.Sound.registerSound("./sounds/gingle_gutterball.mp3", "gingle_gutterball"), createjs.Sound.registerSound("./sounds/gingle_spare.mp3", "gingle_spare"), createjs.Sound.registerSound("./sounds/gingle_strike.mp3", "gingle_strike"), createjs.Sound.registerSound("./sounds/ambience.mp3", "ambience")), l += 10)
    }, this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this), s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png"), s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png"), s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg"), s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png"), s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png"), s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png"), s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png"), s_oSpriteLibrary.addSprite("ball", "./sprites/ball.png"), s_oSpriteLibrary.addSprite("but_continue", "./sprites/but_continue.png"), s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png"), s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png"), s_oSpriteLibrary.addSprite("but_info", "./sprites/but_info.png"), s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo_ctl.png"), s_oSpriteLibrary.addSprite("arrow_right", "./sprites/arrow_right.png"), s_oSpriteLibrary.addSprite("arrow_left", "./sprites/arrow_left.png"), s_oSpriteLibrary.addSprite("ball_shadow", "./sprites/ball_shadow.png"), s_oSpriteLibrary.addSprite("pin", "./sprites/pin.png"), s_oSpriteLibrary.addSprite("ball_ref", "./sprites/ball_ref.png"), s_oSpriteLibrary.addSprite("bg_help", "./sprites/bg_help.png"), s_oSpriteLibrary.addSprite("power_bar_bg", "./sprites/power_bar_bg.png"), s_oSpriteLibrary.addSprite("power_bar_fill", "./sprites/power_bar_fill.png"),
            s_oSpriteLibrary.addSprite("power_bar_frame", "./sprites/power_bar_frame.png"), s_oSpriteLibrary.addSprite("effect_arrow", "./sprites/effect_arrow.png"), s_oSpriteLibrary.addSprite("key_left", "./sprites/key_left.png"), s_oSpriteLibrary.addSprite("key_right", "./sprites/key_right.png"), s_oSpriteLibrary.addSprite("turn_board", "./sprites/turn_board.png"), s_oSpriteLibrary.addSprite("bowling_track", "./sprites/bowling_track.png"), s_oSpriteLibrary.addSprite("monitor", "./sprites/monitor.jpg"), s_oSpriteLibrary.addSprite("pattern_monitor", "./sprites/pattern_monitor.png"), s_oSpriteLibrary.addSprite("pin_binder", "./sprites/pin_binder.png"), s_oSpriteLibrary.addSprite("semaphore", "./sprites/semaphore.png"), s_oSpriteLibrary.addSprite("total_board", "./sprites/total_board.png"), s_oSpriteLibrary.addSprite("last_turn_board", "./sprites/last_turn_board.png");
        for (var t = 0; NUM_SPRITE_MONITOR > t; t++) s_oSpriteLibrary.addSprite("monitor_strike_" + t, "./sprites/monitor_strike/monitor_strike_" + t + ".jpg"), s_oSpriteLibrary.addSprite("monitor_spare_" + t, "./sprites/monitor_spare/monitor_spare_" + t + ".jpg"), s_oSpriteLibrary.addSprite("monitor_gutterball_" + t, "./sprites/monitor_gutterball/monitor_gutterball_" + t + ".jpg");
        for (var t = 0; NUM_SPRITE_PLAYER > t; t++) s_oSpriteLibrary.addSprite("player_" + t, "./sprites/player_anim/player_" + t + ".png");
        l += s_oSpriteLibrary.getNumSprites(), s_oSpriteLibrary.loadSprites()
    }, this._onImagesLoaded = function() {
        a++;
        var t = Math.floor(a / l * 100);
        o.refreshLoader(t), a === l && (o.unload(), DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || (s_oSoundTrack = createjs.Sound.play("soundtrack", {
            loop: -1
        })), this.gotoMenu())
    }, this._onAllImagesLoaded = function() {}, this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    }, this.preloaderReady = function() {
        DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || (this._initSounds(), s_oSoundTrack = createjs.Sound.play("soundtrack", {
            loop: -1
        })), this._loadImages(), e = !0
    }, this.gotoMenu = function() {
        n = new CMenu, c = STATE_MENU
    }, this.gotoGame = function() {
        s = new CGame(i), c = STATE_GAME
    }, this.gotoHelp = function() {
        r = new CHelp, c = STATE_HELP
    }, this.stopUpdate = function() {
        e = !1, createjs.Ticker.paused = !0, $("#block_game").css("display", "block")
    }, this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime(), e = !0, createjs.Ticker.paused = !1, $("#block_game").css("display", "none")
    }, this._update = function(t) {
        if (e !== !1) {
            var i = (new Date).getTime();
            s_iTimeElaps = i - s_iPrevTime, s_iCntTime += s_iTimeElaps, s_iCntFps++, s_iPrevTime = i, s_iCntTime >= 1e3 && (s_iCurFps = s_iCntFps, s_iCntTime -= 1e3, s_iCntFps = 0), c === STATE_GAME && s.update(), s_oStage.update(t)
        }
    }, s_oMain = this, i = t, this.initContainer()
}

function CGame(t) {
    function e(t) {
        return C || U !== STATE_PLAY || T || (Y === DIRECTION && (37 === t.keyCode ? (s_oGame.onLeft(), C = !0) : 39 === t.keyCode && (s_oGame.onRight(), C = !0)), 32 === t.keyCode && (s_oGame.manageControl(), C = !0)), t.preventDefault(), !1
    }

    function i(t) {
        return C && U === STATE_PLAY && (Y === DIRECTION && (37 === t.keyCode ? (C = !1, s_oGame.dirKeyUp()) : 39 === t.keyCode && (C = !1, s_oGame.dirKeyUp())), 32 === t.keyCode && (C = !1)), t.preventDefault(), !1
    }
    var o, n, r, s, a, l, c, h, u, d, p, f, m, v, y, g, _, E, w, S, b, x, A, T = !1,
        N = !1,
        R = !1,
        C = !1,
        P = !1,
        I = !1,
        O = !1,
        L = !1,
        M = !1,
        B = !1,
        F = !1,
        H = !1,
        V = !1,
        D = !0,
        z = !1,
        k = !1,
        j = !1,
        W = !1,
        q = 1,
        G = 2,
        X = 0,
        Y = DIRECTION,
        U = STATE_INIT,
        Z = null;
    this._init = function() {
        this.pause(!0), g = 0, _ = 0, E = 0, $(s_oMain).trigger("start_session"), $(s_oMain).trigger("start_level", 1), w = new Array, S = new Array, y = playSound("ambience", 1, -1), this.resetScoreStageArray(), p = new createjs.Container, s_oStage.addChild(p), u = new CScenario, a = new createjs.Shape, a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, 460), p.addChild(a), n = new CTrack(0, 362, s_oSpriteLibrary.getSprite("bowling_track"), u.getTrackBodyDepth(), p), w.push(n), f = new CPowerBar(100, CANVAS_HEIGHT_HALF + 225, s_oStage), f.setVisible(!1);
        var t = s_oSpriteLibrary.getSprite("effect_arrow");
        m = new CEffectArray(CANVAS_WIDTH + 10, CANVAS_HEIGHT_HALF + 430, t, s_oStage), m.setVisible(!1), Z = SHOW_3D_RENDER ? camera : createOrthoGraphicCamera(), u.ballBody().mass = 0;
        for (var v = s_oSpriteLibrary.getSprite("pin"), b = 0; b < PINS_POSITION.length; b++) S[b] = new CPin(0, 0, v, u.getPinByID(b), p), w.push(S[b]), S[b].setPosRef(OFFSET_TRACK_POSITION.z);
        PIN_TEST && (S.push(new CPin(0, 0, v, u.getPinByID(b), p)), w.push(S[S.length - 1]), S[S.length - 1].getPhysics().quaternion.setFromEuler(Math.radians(0), Math.radians(0), Math.radians(0), "XYZ"), S[S.length - 1].getPhysics().mass = 0);
        var x = s_oSpriteLibrary.getSprite("ball");
        d = new CBall(0, 0, x, u.ballBody(), p), d.setVisible(!1), w.push(d), resizeCanvas3D();
        var A = s_oSpriteLibrary.getSprite("pin_binder");
        l = new CPinDragger(397, 470, A, p), l.setVisible(!1), l.changeState("throw_pins_0"), DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || createjs.Tween.get(s_oSoundTrack).to({
            volume: 0
        }, MS_FADE_SOUNDTRACK);
        var T = s_oSpriteLibrary.getSprite("monitor");
        r = createBitmap(T), r.y = 225, p.addChild(r);
        var N = s_oSpriteLibrary.getSprite("semaphore");
        c = new CSemaphore(CANVAS_WIDTH_HALF + 3, 381, N, p), h = new CCharacter(CHARACTER_START_POS.x, CHARACTER_START_POS.y, p), o = new CInterface, s = new CAnimMonitor(0, 291, o.getContainerBoard()), s_bMobile || (document.onkeydown = e, document.onkeyup = i), SHOW_3D_RENDER ? this.onExitHelp() : o.createHelpPanel()
    }, this.resetScoreStageArray = function() {
        b = new Array;
        for (var t = 0; LAUNCH_TURN > t; t++) b[t] = new Array
    }, this.refreshPos = function(t, e) {
        f.setPosition(f.getStartPos().x + t, f.getStartPos().y - e), m.setPosition(m.getStartPos().x - t, m.getStartPos().y - e)
    }, this.startPinsPosition = function() {
        this.updatePinsPosition();
        for (var t = 0; t < S.length; t++) S[t].setStartPos(S[t].getX(), S[t].getY())
    }, this.onMouseDown = function() {
        Y === DIRECTION ? (s_oGame.deactiveEventMouseMove(), s_oGame.activeStateLaunchPower()) : Y === POWER ? (f.removeTweensMask(), s_oGame.activeStateLaunchEffect()) : Y === EFFECT && (s_oGame.launchBall(), Y = DIRECTION)
    }, this.manageControl = function() {
        T || (Y === DIRECTION ? (o.dirArrowsVisibility(!1), O = !1, s_oGame.activeStateLaunchPower()) : Y === POWER ? (f.removeTweensMask(), s_oGame.activeStateLaunchEffect()) : Y === EFFECT && (m.stopAnimation(), m.removeAllEventListeners(), z = !0, N = !1, T = !0, Y = DIRECTION))
    }, this.dirKeyUp = function() {
        O = !1
    }, this.onLeft = function() {
        v = s_oGame.onLeft, O = !0, x = TIME_REFRESH_DIRECTION;
        var t = u.ballBody();
        t.position.x -= DIRECTION_VELOCITY, t.position.x > LIMIT_HAND_RANGE_POS.x ? t.position.x = LIMIT_HAND_RANGE_POS.x : h.setPosition(h.getX() - DIRECTION_CHARACTER_VELOCITY, h.getY())
    }, this.onRight = function() {
        v = s_oGame.onRight, O = !0, x = TIME_REFRESH_DIRECTION;
        var t = u.ballBody();
        t.position.x += DIRECTION_VELOCITY, t.position.x < -LIMIT_HAND_RANGE_POS.x ? t.position.x = -LIMIT_HAND_RANGE_POS.x : h.setPosition(h.getX() + DIRECTION_CHARACTER_VELOCITY, h.getY())
    }, this.sortDepth = function(t, e) {
        null !== t && null !== e && (t.getDepthPos() < e.getDepthPos() ? p.getChildIndex(t.getObject()) > p.getChildIndex(e.getObject()) && p.swapChildren(t.getObject(), e.getObject()) : t.getDepthPos() > e.getDepthPos() && p.getChildIndex(e.getObject()) > p.getChildIndex(t.getObject()) && p.swapChildren(e.getObject(), t.getObject()))
    }, this.onExitHelp = function() {
        this.pause(!1), o.onExitFromHelp()
    }, this.ballPosition = function() {
        var t = u.ballBody(),
            e = this.convert3dPosTo2dScreen(t.position, Z),
            i = e.z * (BALL_SCALE_FACTOR - d.getStartScale()) + d.getStartScale();
        d.setPosition(e.x, e.y), d.scale(i), s_bMobile || this.refreshShadowCast(d, t, i)
    }, this.refreshShadowCast = function(t, e, i) {
        var o = u.getTrackBody();
        if (e.position.z - BALL_RADIUS < o.position.z) return void t.scaleShadow(0);
        var n = {
                x: e.position.x,
                y: e.position.y,
                z: o.position.z
            },
            r = this.convert3dPosTo2dScreen(n, Z),
            s = -(e.position.z - BALL_RADIUS) + o.position.z + 1,
            a = s * i;
        t.scaleShadow(a), t.setAlphaByHeight(s), t.setPositionShadow(r.x, r.y)
    }, this.launchBall = function() {
        d.setVisible(!0);
        var t = f.getMaskValue() / f.getMaskHeight() * 100;
        MIN_LAUNCH_FORCE > t && (t = MIN_LAUNCH_FORCE), s_oGame.addImpulseToBall(-t * FORCE_RATE), s_oGame.addAngularVelocityToBall(m.getStoppedFrame() * EFFECT_POWER_RATE)
    }, this.activeStateLaunchPower = function() {
        Y = POWER, f.setVisible(!0), f.animFade(1), f.animateMask(TIME_POWER_BAR)
    }, this.activeStateLaunchEffect = function() {
        Y = EFFECT, m.animFade(1), m.animArrow(), m.setVisible(!0)
    }, this.addAngularVelocityToBall = function(t) {
        var e = {
            x: 0,
            y: t,
            z: 0
        };
        u.setElementAngularVelocity(u.ballBody(), e)
    }, this.completeLaunch = function() {
        N || (N = !0, R = !0, d.animFade(0), d.playSound(), createjs.Tween.get(this).wait(1500).call(function() {
            h.animFade(0)
        }), A = TIME_RESET_LAUNCH)
    }, this.isAwakwePins = function(t) {
        W = t
    }, this.awakePins = function() {
        if (W)
            for (var t = 0; t < S.length; t++) S[t].getPhysics().position.y > n.getDepthPos() && S[t].isDownYet() ? S[t].getPhysics().wakeUp() : S[t].getPhysics().position.y > n.getDepthPos() && 1 === q && S[t].getPhysics().wakeUp()
    }, this.onStopAllPin = function() {
        var t = this.countPinDown();
        _ += t, this.controlTurnResult(t), f.mask(0), m.animFade(0), f.animFade(0)
    }, this.setPinsPhysicsMovement = function(t) {
        D = t
    }, this.nextStage = function() {
        this.resetScene(), l.setVisible(!1), u.getPinsBinder().collisionResponse = 0, u.getPinsBinder().position.y = PINS_BINDER_POSITION.y, E = 0, this.activeControl()
    }, this.pinBinderAction = function() {
        l.setVisible(!0), u.getPinsBinder().collisionResponse = 1, l.animThrowPins()
    }, this.repositionPins = function() {
        for (var t = 0; t < S.length; t++) S[t].resetState(), S[t].setPosition(S[t].getX(), S[t].getY() - 100), S[t].animReposition(S[t].getStartPos().y, function() {})
    }, this.controlTurnResult = function(t) {
        P ? (this.addSpareScore(t), g += t) : I && (this.addStrikeScore(t), g += t);
        var e;
        e = k ? this.addExtraScore(t) : this.addScoreNormalTurns(t);
        var i = !1;
        g += t, 9 !== X ? (b[X][q - 1] = t, b[X][2] = g) : (b[X][q - 1] = t, b[X][3] = g, i = !0), o.refreshTurnsBoard(X, q, g, e.point, i), e.next ? (this.nextTurn(), _ < S.length && (l.setVisible(!0), l.takeRemainPinsAndRepos(), u.getPinsBinder().collisionResponse = 1, V = !0)) : 9 !== X ? (_ = 0, X++, q = 1, o.setStateTurnBoard(X, "on"), 0 === G && (I = !1)) : this.gameOver(), o.refresTotalBoard(g), E = 0, H = !1, L = !1, j = !1
    }, this.gameOver = function() {
        U = STATE_FINISH, o.createEndPanel(g)
    }, this.addExtraScore = function(t) {
        var e = {
            next: !0,
            point: t
        };
        return t >= S.length ? k ? e = this.strikeResult() : 2 === q && k && (e = this.spareResult()) : t < S.length && (e = this.aritmeticResult(t)), e
    }, this.addScoreNormalTurns = function(t) {
        var e = {
            next: !0,
            point: t
        };
        return _ === S.length ? 1 !== q || k ? 2 !== q || k || (e = this.spareResult()) : e = this.strikeResult() : _ < S.length && 2 === q && (e = this.aritmeticResult(t)), e
    }, this.aritmeticResult = function(t) {
        return this.pinBinderAction(), {
            next: k,
            point: t
        }
    }, this.spareResult = function() {
        var t, e = !1;
        return P = !0, 9 === X && (k = !0, e = !0), this.pinBinderAction(), B = !0, playSound("gingle_spare", 1, 0), s.setVisibleMonitorSpare(!0), t = "/", {
            next: e,
            point: t
        }
    }, this.strikeResult = function() {
        var t, e = !1;
        return G = 2, I = !0, s.setVisibleMonitorStrike(!0), M = !0, playSound("gingle_strike", 1, 0), t = "X", 9 === X && (k = !0, e = !0), this.pinBinderAction(), {
            next: e,
            point: t
        }
    }, this.nextTurn = function() {
        if (k) {
            if (3 === q) return void this.gameOver()
        } else if (9 === X && 2 === q) return void this.gameOver();
        q++
    }, this.addStrikeScore = function(t) {
        9 !== X ? (1 !== X && 10 === b[X - 2][0] && (b[X - 2][2] += t, o.refreshTurnsBoard(X - 2, null, b[X - 2][2], null)), b[X - 1][2] += t, o.refreshTurnsBoard(X - 1, null, b[X - 1][2], null)) : (b[X][3] += t, o.refreshTurnsBoard(X, null, b[X][3], null, !0)), G--
    }, this.addSpareScore = function(t) {
        9 !== X ? (b[X - 1][2] += t, o.refreshTurnsBoard(X - 1, null, b[X - 1][2], null)) : (b[X][3] += t, o.refreshTurnsBoard(X, null, b[X][3], null, !0))
    }, this.activeControl = function() {
        c.changeState("green"), T = !1, o.dirArrowsVisibility(!0), h.setPosition(CHARACTER_START_POS.x, CHARACTER_START_POS.y), h.animFade(1), h.setVisible(!0)
    }, this.countPinDown = function() {
        for (var t = E, e = 0; e < S.length; e++)
            if (!S[e].isDownYet()) {
                var i = new CANNON.Vec3;
                S[e].getPhysics().quaternion.toEuler(i), i.x = Math.ceil(Math.degrees(i.x)), i.y = Math.ceil(Math.degrees(i.y)), i.z = Math.ceil(Math.degrees(i.z)), (i.x > 20 || i.x < -20 || i.y > 20 || i.y < -20 || S[e].getPhysics().position.z < n.getHeightPos()) && (t++, S[e].setDown(!0))
            }
        return t
    }, this.animUpRemainPins = function() {
        for (var t = 0; t < S.length; t++) S[t].isDownYet() || S[t].animTake(S[t].getStartPos().y - 100)
    }, this.repositionRemainPins = function() {
        for (var t = 0; t < S.length; t++)
            if (S[t].isDownYet()) S[t].setVisible(!1);
            else {
                S[t].getPhysics().position.set(PINS_POSITION[t].x, PINS_POSITION[t].y, PINS_POSITION[t].z), S[t].getPhysics().quaternion.setFromEuler(0, 0, 0, "XYZ"), S[t].getPhysics().angularVelocity.set(0, 0, 0), S[t].getPhysics().velocity.set(0, 0, 0), S[t].getPhysics().mass = PIN_PROPERTY.mass, S[t].setPosition(S[t].getStartPos().x, S[t].getStartPos().y - 100), S[t].setPlayedSound(!1);
                var e = this.pinReflection(t, S[t].getPhysics().position);
                S[t].setAlphaByHeight(0), S[t].animReposition(S[t].getStartPos().y, e);
                var i = this.convert3dPosTo2dScreen(S[t].getPhysics().position, Z);
                this.pinScale(t, i), S[t].setVisible(!0), S[t].pinRotation()
            }
        V = !1
    }, this.unload = function() {
        s_oStage.removeAllChildren(), o.unload(), u.destroyWorld(), u = null
    }, this.addImpulseToBall = function(t) {
        if (U === STATE_PLAY) {
            u.ballBody().mass = BALL_MASS;
            var e = 0,
                i = 0,
                o = {
                    x: e,
                    y: t,
                    z: i
                },
                n = u.ballBody();
            u.addImpulse(n, o), u.setElementAngularVelocity(n, {
                x: 0,
                y: 0,
                z: 0
            }), T = !0, c.changeState("red")
        }
    }, this.pause = function(t) {
        U = t ? STATE_PAUSE : STATE_PLAY, createjs.Ticker.paused = t
    }, this.setPinDown = function(t, e, i) {
        S[t].isDownYet() === e || V || (i !== WALL || S[t].isDownYet() ? i === SIDE_PINS_FLOOR && S[t].setPosRef(u.getSideFloorPins(0).position.z) : S[t].setVisibleRef(!1), S[t].setDown(e), e ? E++ : E--)
    }, this.onExit = function() {
        this.unload(), $(s_oMain).trigger("end_level"), $(s_oMain).trigger("show_interlevel_ad"), $(s_oMain).trigger("end_session"), DISABLE_SOUND_MOBILE !== !1 && s_bMobile !== !1 || (createjs.Tween.get(s_oSoundTrack).to({
            volume: 1
        }, MS_FADE_SOUNDTRACK), y.destroy()), s_oMain.gotoMenu()
    }, this.restartGame = function() {
        this.resetValues(), this.resetScene(), U = STATE_PLAY, $(s_oMain).trigger("restart_level", 1)
    }, this.resetValues = function() {
        X = 0, g = 0, _ = 0, E = 0, q = 1, T = !1, N = !1, R = !1, C = !1, P = !1, I = !1, O = !1, L = !1, M = !1, j = !1, B = !1, F = !1, H = !1, V = !1, D = !0, z = !1, k = !1, this.resetScoreStageArray();
        for (var t = 0; LAUNCH_TURN - 1 > t; t++)
            for (var e = 0; 2 > e; e++) 0 === e ? o.refreshTurnsBoard(t, e + 1, g, 0, !1) : o.refreshTurnsBoard(t, e + 1, g, "", !1), o.setStateTurnBoard(t, "off");
        for (var e = 0; 3 > e; e++) 0 === e ? o.refreshTurnsBoard(LAUNCH_TURN - 1, e + 1, g, 0, !0) : o.refreshTurnsBoard(LAUNCH_TURN - 1, e + 1, g, "", !0), o.setStateTurnBoard(LAUNCH_TURN - 1, "off");
        o.setStateTurnBoard(0, "on"), o.refresTotalBoard(0)
    }, this.resetBallPosition = function() {
        var t = u.ballBody();
        t.mass = 0, t.position.set(POSITION_BALL.x, POSITION_BALL.y, POSITION_BALL.z), u.setElementVelocity(t, {
            x: 0,
            y: 0,
            z: 0
        }), u.setElementAngularVelocity(t, {
            x: 0,
            y: 0,
            z: 0
        }), d.setPlayedSound(!1)
    }, this._updateInit = function() {
        u.update(), this._updateBall2DPosition(), U = STATE_PLAY
    }, this.convert2dScreenPosTo3d = function(t, e) {
        var i = s_iCanvasResizeWidth,
            o = s_iCanvasResizeHeight,
            n = new THREE.Vector3(t.x / i * 2 - 1, 2 * -(t.y / o) + 1, -1);
        n.unproject(Z), n.sub(Z.position), n.normalize();
        var r = e.position.y;
        return n.multiply(new THREE.Vector3(r, 1, r)), n
    }, this.convert3dPosTo2dScreen = function(t, e) {
        var i = new THREE.Vector3(t.x, t.y, t.z),
            o = i.project(e),
            n = .5 * Math.floor(s_iCanvasResizeWidth),
            r = .5 * Math.floor(s_iCanvasResizeHeight);
        return o.x = (o.x * n + n) * s_fInverseScaling, o.y = (-(o.y * r) + r) * s_fInverseScaling, o
    }, this.resetScene = function() {
        this.resetPinsPosition(), this.resetBallPosition()
    }, this.resetPinsPosition = function() {
        for (var t = 0; t < S.length; t++) {
            var e = S[t].getPhysics();
            e.position.set(PINS_POSITION[t].x, PINS_POSITION[t].y, PINS_POSITION[t].z), e.quaternion.setFromEuler(0, 0, 0, "XYZ"), e.angularVelocity.set(0, 0, 0), e.velocity.set(0, 0, 0), e.collisionResponse = 1, e.mass = PIN_PROPERTY.mass, S[t].setPosRef(u.getTrackBody().position.z);
            var i = this.convert3dPosTo2dScreen(e.position, Z);
            this.pinScale(t, i), S[t].setDown(!1), S[t].setVisible(!0), S[t].setPlayedSound(!1), S[t].setVisibleRef(!0)
        }
    }, this._onEnd = function() {
        this.onExit()
    }, this.swapChildrenIndex = function() {
        for (var t = 0; t < w.length - 1; t++)
            for (var e = t + 1; e < w.length; e++) w[t].getObject().visible && w[e].getObject().visible && this.sortDepth(w[t], w[e])
    }, this.updatePinsPosition = function() {
        for (var t = 0; t < S.length; t++)
            if (S[t].getVisible()) {
                var e = this.pinPosition(t);
                this.pinScale(t, e);
                S[t].isVisibleRef && this.pinReflection(t, S[t].getPhysics().position), this.pinFade(t), PIN_TEST || S[t].pinRotation()
            }
    }, this.pinFade = function(t) {
        if (S[t].getPhysics().position.y < n.getDepthPos()) {
            var e = 1 - (S[t].getPhysics().position.y - n.getDepthPos()) * (FADE_PIN_FACTOR - n.getDepthPos());
            S[t].setAlpha(e)
        }
    }, this.pinScale = function(t, e) {
        var i = e.z * (PIN_SCALE_FACTOR - S[t].getStartScale()) + S[t].getStartScale();
        return S[t].scale(i), i
    }, this.pinReflection = function(t, e) {
        if (e.y < n.getDepthPos()) return s = 0, void S[t].setAlphaByHeight(s);
        var i = {
                x: e.x,
                y: e.y,
                z: S[t].getPosRef()
            },
            o = this.convert3dPosTo2dScreen(i, Z),
            r = e.z + u.getTrackBody().position.z,
            s = r * (PIN_ALPHA_FACTOR - 1) + 1;
        s > PINS_REFLECTION_LIMIT && (s = PINS_REFLECTION_LIMIT);
        var a = r * (PIN_REF_REGY_FACTOR - S[t].getRegYRef()) + S[t].getRegYRef();
        return S[t].setRegYRef(a), S[t].setAlphaByHeight(s), S[t].setPositionReflection(o.x, o.y), s
    }, this.setPinCollide = function() {
        L = !0
    }, this.pinPosition = function(t) {
        var e = S[t].getPhysics(),
            i = this.convert3dPosTo2dScreen(e.position, Z);
        return S[t].setPosition(i.x, i.y), i
    }, this.movementKeyDown = function() {
        O && (0 > x ? (x = TIME_REFRESH_DIRECTION, v()) : x -= FPS_TIME)
    }, this.pinsMovementDetect = function() {
        if (R) {
            for (var t = S.length, e = 0; e < S.length; e++) {
                var i = S[e].getPhysics().velocity;
                Math.abs(i.x) < MIN_VELOCITY_PINS && Math.abs(i.y) < MIN_VELOCITY_PINS && (s_oScenario.setElementVelocity(S[e].getPhysics(), {
                    x: 0,
                    y: 0,
                    z: 0
                }), t--)
            }
            0 === t ? (this.onStopAllPin(), R = !1) : 0 > A ? (this.stopAllPin(), this.onStopAllPin(), R = !1) : A -= FPS_TIME
        }
    }, this.gutterBall = function() {
        H || L || (F = !0, s.setVisibleMonitorGutter(!0), H = !0, playSound("gingle_gutterball", 1, 0))
    }, this.stopAllPin = function() {
        for (var t = 0; t < S.length; t++) s_oScenario.setElementVelocity(S[t].getPhysics(), {
            x: 0,
            y: 0,
            z: 0
        })
    }, this.pinTest = function() {
        S[S.length - 1].pinRotation(), console.log(S[S.length - 1].getPhysics().position)
    }, this.animMonitor = function() {
        M ? M = s.animMonitor(s.getStrikeArray()) : B ? B = s.animMonitor(s.getSpareArray()) : F && (F = s.animMonitor(s.getGutterArray()), F || this.completeLaunch())
    }, this.pinSoundCollision = function(t) {
        S[t].playAudio()
    }, this.twoPinsSoundCollision = function(t, e) {
        createjs.Tween.get(this).wait(Math.floor(50 * Math.random())).call(function() {
            S[t].playAudio()
        }), createjs.Tween.get(this).wait(Math.floor(50 * Math.random())).call(function() {
            S[e].playAudio()
        })
    }, this.ballHitFloor = function() {
        j || (j = !0, playSound("ball_hitting", 1, 0))
    }, this.channelForceApply = function() {
        H && u.ballBody().velocity.y > MIN_FORCE_BALL_GUTTER && u.ballBody().applyForce({
            x: 0,
            y: -100,
            z: 0
        }, new CANNON.Vec3(0, 0, 0))
    }, this.characterAnimation = function() {
        z && (z = h.animCharacter(), 24 === h.getFrame() && this.launchBall())
    }, this._updatePlay = function() {
        for (var t = 0; PHYSICS_ACCURACY > t; t++) u.update(), this.awakePins();
        this._updateBall2DPosition(), D && this.updatePinsPosition(), this.swapChildrenIndex(), this.movementKeyDown(), this.pinsMovementDetect(), this.channelForceApply(), this.characterAnimation(), PIN_TEST && this.pinTest(), this.animMonitor()
    }, this.update = function() {
        switch (U) {
            case STATE_INIT:
                this._updateInit();
                break;
            case STATE_PLAY:
                this._updatePlay();
                break;
            case STATE_FINISH:
                u.update(), this.animMonitor(), D && this.updatePinsPosition();
                break;
            case STATE_PAUSE:
        }
    }, this._updateBall2DPosition = function() {
        this.ballPosition(), Z.updateProjectionMatrix(), Z.updateMatrixWorld()
    }, s_oGame = this, TIME_POWER_BAR = t.time_power_bar, SPEED_EFFECT_ARROW = t.speed_effect_arrow, NUM_LEVEL_FOR_ADS = t.num_levels_for_ads, this._init()
}

function CPowerBar(t, e, i) {
    var o, n, r, s, a, l, c, h, u, d;
    return this._init = function(t, e) {
        n = {
            x: t,
            y: e
        }, o = new createjs.Container, o.x = t, o.y = e, d.addChild(o);
        var i = s_oSpriteLibrary.getSprite("power_bar_bg");
        s = createBitmap(i), s.regX = .5 * i.width, s.regY = i.height, o.addChild(s), a = createBitmap(s_oSpriteLibrary.getSprite("power_bar_fill")), a.regX = .5 * i.width, a.regY = i.height, o.addChild(a), c = i.width, h = i.height, r = new createjs.Shape, r.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(s.x, s.y, c, 0), r.regX = .5 * c, r.regY = h, o.addChild(r);
        var u = s_oSpriteLibrary.getSprite("power_bar_frame");
        l = createBitmap(u), l.regX = .5 * u.width, l.regY = u.height, o.addChild(l), o.scaleY = -1, a.mask = r, this.createTextPower()
    }, this.unload = function() {
        d.removeChild(o)
    }, this.setVisible = function(t) {
        o.visible = t
    }, this.createTextPower = function() {
        u = new createjs.Text(TEXT_POWER, "36px " + FONT_GAME, "#ffffff"), u.textAlign = "center", u.textBaseline = "middle", u.y = -h - 50, u.scaleY = -1, o.addChild(u)
    }, this.setPosition = function(t, e) {
        o.x = t, o.y = e
    }, this.setX = function(t) {
        o.x = t
    }, this.setY = function(t) {
        o.y = t
    }, this.getX = function() {
        return o.x
    }, this.getY = function() {
        return o.y
    }, this.getStartPos = function() {
        return n
    }, this.removeTweensMask = function() {
        createjs.Tween.removeTweens(r.graphics.command)
    }, this.removeTweensContainer = function() {
        createjs.Tween.removeTweens(o)
    }, this.animFade = function(t) {
        createjs.Tween.get(o).to({
            alpha: t
        }, 250, createjs.Ease.circleOut).call(function() {
            0 === t && (o.visible = !1)
        })
    }, this.getMaskValue = function() {
        return r.graphics.command.h
    }, this.getMaskHeight = function() {
        return h
    }, this.getAngle = function() {
        return o.rotation
    }, this.mask = function(t) {
        r.graphics.clear();
        var e = Math.floor(t * h / 100);
        r.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(s.x, s.y, c, e)
    }, this.animateMask = function(t) {
        var e = this;
        createjs.Tween.get(r.graphics.command).to({
            h: h
        }, t, createjs.Ease.cubicIn).call(function() {
            createjs.Tween.get(r.graphics.command).to({
                h: 0
            }, t, createjs.Ease.cubicOut).call(function() {
                e.animateMask(t)
            })
        })
    }, this.animateRotation = function(t) {
        var e = this;
        createjs.Tween.get(o).to({
            rotation: MAX_EFFECT_ANGLE
        }, t, createjs.Ease.cubicInOut).call(function() {
            createjs.Tween.get(o).to({
                rotation: -MAX_EFFECT_ANGLE
            }, t, createjs.Ease.cubicInOut).call(function() {
                e.animateRotation(t)
            })
        })
    }, d = i, this._init(t, e), this
}

function CAreYouSurePanel(t) {
    var e, i, o, n, r, s, a;
    this._init = function() {
        r = new createjs.Container, r.alpha = 0, s.addChild(r), a = new createjs.Shape, a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), a.alpha = .5, a.on("click", function() {}), r.addChild(a);
        var t = s_oSpriteLibrary.getSprite("msg_box");
        e = createBitmap(t), e.x = CANVAS_WIDTH_HALF, e.y = CANVAS_HEIGHT_HALF + 100, e.regX = .5 * t.width, e.regY = .5 * t.height, r.addChild(e), i = new createjs.Text(TEXT_ARE_SURE, "50px " + FONT_GAME, "#ffffff"), i.x = CANVAS_WIDTH / 2, i.y = CANVAS_HEIGHT_HALF - 50, i.textAlign = "center", i.textBaseline = "middle", r.addChild(i), o = new CGfxButton(CANVAS_WIDTH / 2 + 180, .5 * CANVAS_HEIGHT + 120, s_oSpriteLibrary.getSprite("but_yes"), r), o.addEventListener(ON_MOUSE_UP, this._onButYes, this), n = new CGfxButton(CANVAS_WIDTH / 2 - 180, .5 * CANVAS_HEIGHT + 120, s_oSpriteLibrary.getSprite("but_no"), r), n.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    }, this.show = function() {
        createjs.Tween.get(r).to({
            alpha: 1
        }, 150, createjs.quartOut).call(function() {
            s_oGame.pause(!0)
        })
    }, this.unload = function() {
        createjs.Tween.get(r).to({
            alpha: 0
        }, 150, createjs.quartOut).call(function() {
            s.removeChild(r, a)
        })
    }, this._onButYes = function() {
        createjs.Ticker.paused = !1, this.unload(), s_oGame.onExit(), a.removeAllEventListeners()
    }, this._onButNo = function() {
        s_oGame.pause(!1), this.unload(), r.visible = !1, a.removeAllEventListeners()
    }, s = t, this._init()
}

function CSpriteLibrary() {
    var t, e, i, o, n, r;
    this.init = function(s, a, l) {
        e = 0, i = 0, o = s, n = a, r = l, t = {}
    }, this.addSprite = function(i, o) {
        t.hasOwnProperty(i) || (t[i] = {
            szPath: o,
            oSprite: new Image
        }, e++)
    }, this.getSprite = function(e) {
        return t.hasOwnProperty(e) ? t[e].oSprite : null
    }, this._onSpritesLoaded = function() {
        n.call(r)
    }, this._onSpriteLoaded = function() {
        o.call(r), ++i == e && this._onSpritesLoaded()
    }, this.loadSprites = function() {
        for (var e in t) t[e].oSprite.oSpriteLibrary = this, t[e].oSprite.onload = function() {
            this.oSpriteLibrary._onSpriteLoaded()
        }, t[e].oSprite.src = t[e].szPath
    }, this.getNumSprites = function() {
        return e
    }
}! function() {
    "use strict";
    var t = function(t) {
        THREE.MeshBasicMaterial.call(this), this.depthTest = !1, this.depthWrite = !1, this.side = THREE.FrontSide, this.transparent = !0, this.setValues(t), this.oldColor = this.color.clone(), this.oldOpacity = this.opacity, this.highlight = function(t) {
            t ? (this.color.setRGB(1, 1, 0), this.opacity = 1) : (this.color.copy(this.oldColor), this.opacity = this.oldOpacity)
        }
    };
    t.prototype = Object.create(THREE.MeshBasicMaterial.prototype), t.prototype.constructor = t;
    var e = function(t) {
        THREE.LineBasicMaterial.call(this), this.depthTest = !1, this.depthWrite = !1, this.transparent = !0, this.linewidth = 1, this.setValues(t), this.oldColor = this.color.clone(), this.oldOpacity = this.opacity, this.highlight = function(t) {
            t ? (this.color.setRGB(1, 1, 0), this.opacity = 1) : (this.color.copy(this.oldColor), this.opacity = this.oldOpacity)
        }
    };
    e.prototype = Object.create(THREE.LineBasicMaterial.prototype), e.prototype.constructor = e;
    var i = new t({
        visible: !1,
        transparent: !1
    });
    THREE.TransformGizmo = function() {
        this.init = function() {
            THREE.Object3D.call(this), this.handles = new THREE.Object3D, this.pickers = new THREE.Object3D, this.planes = new THREE.Object3D, this.add(this.handles), this.add(this.pickers), this.add(this.planes);
            var t = new THREE.PlaneBufferGeometry(50, 50, 2, 2),
                e = new THREE.MeshBasicMaterial({
                    visible: !1,
                    side: THREE.DoubleSide
                }),
                i = {
                    XY: new THREE.Mesh(t, e),
                    YZ: new THREE.Mesh(t, e),
                    XZ: new THREE.Mesh(t, e),
                    XYZE: new THREE.Mesh(t, e)
                };
            this.activePlane = i.XYZE, i.YZ.rotation.set(0, Math.PI / 2, 0), i.XZ.rotation.set(-Math.PI / 2, 0, 0);
            for (var o in i) i[o].name = o, this.planes.add(i[o]), this.planes[o] = i[o];
            var n = function(t, e) {
                for (var i in t)
                    for (o = t[i].length; o--;) {
                        var n = t[i][o][0],
                            r = t[i][o][1],
                            s = t[i][o][2];
                        n.name = i, r && n.position.set(r[0], r[1], r[2]), s && n.rotation.set(s[0], s[1], s[2]), e.add(n)
                    }
            };
            n(this.handleGizmos, this.handles), n(this.pickerGizmos, this.pickers), this.traverse(function(t) {
                if (t instanceof THREE.Mesh) {
                    t.updateMatrix();
                    var e = t.geometry.clone();
                    e.applyMatrix(t.matrix), t.geometry = e, t.position.set(0, 0, 0), t.rotation.set(0, 0, 0), t.scale.set(1, 1, 1)
                }
            })
        }, this.highlight = function(t) {
            this.traverse(function(e) {
                e.material && e.material.highlight && (e.name === t ? e.material.highlight(!0) : e.material.highlight(!1))
            })
        }
    }, THREE.TransformGizmo.prototype = Object.create(THREE.Object3D.prototype), THREE.TransformGizmo.prototype.constructor = THREE.TransformGizmo, THREE.TransformGizmo.prototype.update = function(t, e) {
        var i = new THREE.Vector3(0, 0, 0),
            o = new THREE.Vector3(0, 1, 0),
            n = new THREE.Matrix4;
        this.traverse(function(r) {
            -1 !== r.name.search("E") ? r.quaternion.setFromRotationMatrix(n.lookAt(e, i, o)) : -1 === r.name.search("X") && -1 === r.name.search("Y") && -1 === r.name.search("Z") || r.quaternion.setFromEuler(t)
        })
    }, THREE.TransformGizmoTranslate = function() {
        THREE.TransformGizmo.call(this);
        var o = new THREE.Geometry,
            n = new THREE.Mesh(new THREE.CylinderGeometry(0, .05, .2, 12, 1, !1));
        n.position.y = .5, n.updateMatrix(), o.merge(n.geometry, n.matrix);
        var r = new THREE.BufferGeometry;
        r.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 1, 0, 0], 3));
        var s = new THREE.BufferGeometry;
        s.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 1, 0], 3));
        var a = new THREE.BufferGeometry;
        a.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 0, 1], 3)), this.handleGizmos = {
            X: [
                [new THREE.Mesh(o, new t({
                        color: 16711680
                    })), [.5, 0, 0],
                    [0, 0, -Math.PI / 2]
                ],
                [new THREE.Line(r, new e({
                    color: 16711680
                }))]
            ],
            Y: [
                [new THREE.Mesh(o, new t({
                    color: 65280
                })), [0, .5, 0]],
                [new THREE.Line(s, new e({
                    color: 65280
                }))]
            ],
            Z: [
                [new THREE.Mesh(o, new t({
                        color: 255
                    })), [0, 0, .5],
                    [Math.PI / 2, 0, 0]
                ],
                [new THREE.Line(a, new e({
                    color: 255
                }))]
            ],
            XYZ: [
                [new THREE.Mesh(new THREE.OctahedronGeometry(.1, 0), new t({
                        color: 16777215,
                        opacity: .25
                    })), [0, 0, 0],
                    [0, 0, 0]
                ]
            ],
            XY: [
                [new THREE.Mesh(new THREE.PlaneBufferGeometry(.29, .29), new t({
                    color: 16776960,
                    opacity: .25
                })), [.15, .15, 0]]
            ],
            YZ: [
                [new THREE.Mesh(new THREE.PlaneBufferGeometry(.29, .29), new t({
                        color: 65535,
                        opacity: .25
                    })), [0, .15, .15],
                    [0, Math.PI / 2, 0]
                ]
            ],
            XZ: [
                [new THREE.Mesh(new THREE.PlaneBufferGeometry(.29, .29), new t({
                        color: 16711935,
                        opacity: .25
                    })), [.15, 0, .15],
                    [-Math.PI / 2, 0, 0]
                ]
            ]
        }, this.pickerGizmos = {
            X: [
                [new THREE.Mesh(new THREE.CylinderBufferGeometry(.2, 0, 1, 4, 1, !1), i), [.6, 0, 0],
                    [0, 0, -Math.PI / 2]
                ]
            ],
            Y: [
                [new THREE.Mesh(new THREE.CylinderBufferGeometry(.2, 0, 1, 4, 1, !1), i), [0, .6, 0]]
            ],
            Z: [
                [new THREE.Mesh(new THREE.CylinderBufferGeometry(.2, 0, 1, 4, 1, !1), i), [0, 0, .6],
                    [Math.PI / 2, 0, 0]
                ]
            ],
            XYZ: [
                [new THREE.Mesh(new THREE.OctahedronGeometry(.2, 0), i)]
            ],
            XY: [
                [new THREE.Mesh(new THREE.PlaneBufferGeometry(.4, .4), i), [.2, .2, 0]]
            ],
            YZ: [
                [new THREE.Mesh(new THREE.PlaneBufferGeometry(.4, .4), i), [0, .2, .2],
                    [0, Math.PI / 2, 0]
                ]
            ],
            XZ: [
                [new THREE.Mesh(new THREE.PlaneBufferGeometry(.4, .4), i), [.2, 0, .2],
                    [-Math.PI / 2, 0, 0]
                ]
            ]
        }, this.setActivePlane = function(t, e) {
            var i = new THREE.Matrix4;
            e.applyMatrix4(i.getInverse(i.extractRotation(this.planes.XY.matrixWorld))), "X" === t && (this.activePlane = this.planes.XY, Math.abs(e.y) > Math.abs(e.z) && (this.activePlane = this.planes.XZ)), "Y" === t && (this.activePlane = this.planes.XY, Math.abs(e.x) > Math.abs(e.z) && (this.activePlane = this.planes.YZ)), "Z" === t && (this.activePlane = this.planes.XZ, Math.abs(e.x) > Math.abs(e.y) && (this.activePlane = this.planes.YZ)), "XYZ" === t && (this.activePlane = this.planes.XYZE), "XY" === t && (this.activePlane = this.planes.XY), "YZ" === t && (this.activePlane = this.planes.YZ), "XZ" === t && (this.activePlane = this.planes.XZ)
        }, this.init()
    }, THREE.TransformGizmoTranslate.prototype = Object.create(THREE.TransformGizmo.prototype), THREE.TransformGizmoTranslate.prototype.constructor = THREE.TransformGizmoTranslate, THREE.TransformGizmoRotate = function() {
        THREE.TransformGizmo.call(this);
        var t = function(t, e, i) {
            var o = new THREE.BufferGeometry,
                n = [];
            i = i ? i : 1;
            for (var r = 0; 64 * i >= r; ++r) "x" === e && n.push(0, Math.cos(r / 32 * Math.PI) * t, Math.sin(r / 32 * Math.PI) * t), "y" === e && n.push(Math.cos(r / 32 * Math.PI) * t, 0, Math.sin(r / 32 * Math.PI) * t), "z" === e && n.push(Math.sin(r / 32 * Math.PI) * t, Math.cos(r / 32 * Math.PI) * t, 0);
            return o.addAttribute("position", new THREE.Float32Attribute(n, 3)), o
        };
        this.handleGizmos = {
            X: [
                [new THREE.Line(new t(1, "x", .5), new e({
                    color: 16711680
                }))]
            ],
            Y: [
                [new THREE.Line(new t(1, "y", .5), new e({
                    color: 65280
                }))]
            ],
            Z: [
                [new THREE.Line(new t(1, "z", .5), new e({
                    color: 255
                }))]
            ],
            E: [
                [new THREE.Line(new t(1.25, "z", 1), new e({
                    color: 13421568
                }))]
            ],
            XYZE: [
                [new THREE.Line(new t(1, "z", 1), new e({
                    color: 7895160
                }))]
            ]
        }, this.pickerGizmos = {
            X: [
                [new THREE.Mesh(new THREE.TorusBufferGeometry(1, .12, 4, 12, Math.PI), i), [0, 0, 0],
                    [0, -Math.PI / 2, -Math.PI / 2]
                ]
            ],
            Y: [
                [new THREE.Mesh(new THREE.TorusBufferGeometry(1, .12, 4, 12, Math.PI), i), [0, 0, 0],
                    [Math.PI / 2, 0, 0]
                ]
            ],
            Z: [
                [new THREE.Mesh(new THREE.TorusBufferGeometry(1, .12, 4, 12, Math.PI), i), [0, 0, 0],
                    [0, 0, -Math.PI / 2]
                ]
            ],
            E: [
                [new THREE.Mesh(new THREE.TorusBufferGeometry(1.25, .12, 2, 24), i)]
            ],
            XYZE: [
                [new THREE.Mesh(new THREE.Geometry)]
            ]
        }, this.setActivePlane = function(t) {
            "E" === t && (this.activePlane = this.planes.XYZE), "X" === t && (this.activePlane = this.planes.YZ), "Y" === t && (this.activePlane = this.planes.XZ), "Z" === t && (this.activePlane = this.planes.XY)
        }, this.update = function(t, e) {
            THREE.TransformGizmo.prototype.update.apply(this, arguments);
            var i = ({
                    handles: this.handles,
                    pickers: this.pickers
                }, new THREE.Matrix4),
                o = new THREE.Euler(0, 0, 1),
                n = new THREE.Quaternion,
                r = new THREE.Vector3(1, 0, 0),
                s = new THREE.Vector3(0, 1, 0),
                a = new THREE.Vector3(0, 0, 1),
                l = new THREE.Quaternion,
                c = new THREE.Quaternion,
                h = new THREE.Quaternion,
                u = e.clone();
            o.copy(this.planes.XY.rotation), n.setFromEuler(o), i.makeRotationFromQuaternion(n).getInverse(i), u.applyMatrix4(i), this.traverse(function(t) {
                n.setFromEuler(o), "X" === t.name && (l.setFromAxisAngle(r, Math.atan2(-u.y, u.z)), n.multiplyQuaternions(n, l), t.quaternion.copy(n)), "Y" === t.name && (c.setFromAxisAngle(s, Math.atan2(u.x, u.z)), n.multiplyQuaternions(n, c), t.quaternion.copy(n)), "Z" === t.name && (h.setFromAxisAngle(a, Math.atan2(u.y, u.x)), n.multiplyQuaternions(n, h), t.quaternion.copy(n))
            })
        }, this.init()
    }, THREE.TransformGizmoRotate.prototype = Object.create(THREE.TransformGizmo.prototype), THREE.TransformGizmoRotate.prototype.constructor = THREE.TransformGizmoRotate, THREE.TransformGizmoScale = function() {
        THREE.TransformGizmo.call(this);
        var o = new THREE.Geometry,
            n = new THREE.Mesh(new THREE.BoxGeometry(.125, .125, .125));
        n.position.y = .5, n.updateMatrix(), o.merge(n.geometry, n.matrix);
        var r = new THREE.BufferGeometry;
        r.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 1, 0, 0], 3));
        var s = new THREE.BufferGeometry;
        s.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 1, 0], 3));
        var a = new THREE.BufferGeometry;
        a.addAttribute("position", new THREE.Float32Attribute([0, 0, 0, 0, 0, 1], 3)), this.handleGizmos = {
            X: [
                [new THREE.Mesh(o, new t({
                        color: 16711680
                    })), [.5, 0, 0],
                    [0, 0, -Math.PI / 2]
                ],
                [new THREE.Line(r, new e({
                    color: 16711680
                }))]
            ],
            Y: [
                [new THREE.Mesh(o, new t({
                    color: 65280
                })), [0, .5, 0]],
                [new THREE.Line(s, new e({
                    color: 65280
                }))]
            ],
            Z: [
                [new THREE.Mesh(o, new t({
                        color: 255
                    })), [0, 0, .5],
                    [Math.PI / 2, 0, 0]
                ],
                [new THREE.Line(a, new e({
                    color: 255
                }))]
            ],
            XYZ: [
                [new THREE.Mesh(new THREE.BoxBufferGeometry(.125, .125, .125), new t({
                    color: 16777215,
                    opacity: .25
                }))]
            ]
        }, this.pickerGizmos = {
            X: [
                [new THREE.Mesh(new THREE.CylinderBufferGeometry(.2, 0, 1, 4, 1, !1), i), [.6, 0, 0],
                    [0, 0, -Math.PI / 2]
                ]
            ],
            Y: [
                [new THREE.Mesh(new THREE.CylinderBufferGeometry(.2, 0, 1, 4, 1, !1), i), [0, .6, 0]]
            ],
            Z: [
                [new THREE.Mesh(new THREE.CylinderBufferGeometry(.2, 0, 1, 4, 1, !1), i), [0, 0, .6],
                    [Math.PI / 2, 0, 0]
                ]
            ],
            XYZ: [
                [new THREE.Mesh(new THREE.BoxBufferGeometry(.4, .4, .4), i)]
            ]
        }, this.setActivePlane = function(t, e) {
            var i = new THREE.Matrix4;
            e.applyMatrix4(i.getInverse(i.extractRotation(this.planes.XY.matrixWorld))), "X" === t && (this.activePlane = this.planes.XY, Math.abs(e.y) > Math.abs(e.z) && (this.activePlane = this.planes.XZ)), "Y" === t && (this.activePlane = this.planes.XY, Math.abs(e.x) > Math.abs(e.z) && (this.activePlane = this.planes.YZ)), "Z" === t && (this.activePlane = this.planes.XZ, Math.abs(e.x) > Math.abs(e.y) && (this.activePlane = this.planes.YZ)), "XYZ" === t && (this.activePlane = this.planes.XYZE)
        }, this.init()
    }, THREE.TransformGizmoScale.prototype = Object.create(THREE.TransformGizmo.prototype), THREE.TransformGizmoScale.prototype.constructor = THREE.TransformGizmoScale, THREE.TransformControls = function(t, e) {
        function i(t) {
            if (void 0 !== a.object && c !== !0 && (void 0 === t.button || 0 === t.button)) {
                var e = t.changedTouches ? t.changedTouches[0] : t,
                    i = s(e, h[l].pickers.children),
                    o = null;
                i && (o = i.object.name, t.preventDefault()), a.axis !== o && (a.axis = o, a.update(), a.dispatchEvent(p))
            }
        }

        function o(t) {
            if (void 0 !== a.object && c !== !0 && (void 0 === t.button || 0 === t.button)) {
                var e = t.changedTouches ? t.changedTouches[0] : t;
                if (0 === e.button || void 0 === e.button) {
                    var i = s(e, h[l].pickers.children);
                    if (i) {
                        t.preventDefault(), t.stopPropagation(), a.dispatchEvent(f), a.axis = i.object.name, a.update(), A.copy(G).sub(j).normalize(), h[l].setActivePlane(a.axis, A);
                        var o = s(e, [h[l].activePlane]);
                        o && (H.copy(a.object.position), V.copy(a.object.scale), D.extractRotation(a.object.matrix), q.extractRotation(a.object.matrixWorld), z.extractRotation(a.object.parent.matrixWorld), k.setFromMatrixScale(T.getInverse(a.object.parent.matrixWorld)), E.copy(o.point))
                    }
                }
                c = !0
            }
        }

        function n(t) {
            if (void 0 !== a.object && null !== a.axis && c !== !1 && (void 0 === t.button || 0 === t.button)) {
                var e = t.changedTouches ? t.changedTouches[0] : t,
                    i = s(e, [h[l].activePlane]);
                i !== !1 && (t.preventDefault(), t.stopPropagation(), _.copy(i.point), "translate" === l ? (_.sub(E), _.multiply(k), "local" === a.space && (_.applyMatrix4(T.getInverse(q)), -1 === a.axis.search("X") && (_.x = 0), -1 === a.axis.search("Y") && (_.y = 0), -1 === a.axis.search("Z") && (_.z = 0), _.applyMatrix4(D), a.object.position.copy(H), a.object.position.add(_), a.body.position.copy(a.object.position)), "world" !== a.space && -1 === a.axis.search("XYZ") || (-1 === a.axis.search("X") && (_.x = 0), -1 === a.axis.search("Y") && (_.y = 0), -1 === a.axis.search("Z") && (_.z = 0), _.applyMatrix4(T.getInverse(z)), a.object.position.copy(H), a.object.position.add(_), a.body.position.copy(a.object.position)), null !== a.translationSnap && ("local" === a.space && a.object.position.applyMatrix4(T.getInverse(q)), -1 !== a.axis.search("X") && (a.object.position.x = Math.round(a.object.position.x / a.translationSnap) * a.translationSnap), -1 !== a.axis.search("Y") && (a.object.position.y = Math.round(a.object.position.y / a.translationSnap) * a.translationSnap), -1 !== a.axis.search("Z") && (a.object.position.z = Math.round(a.object.position.z / a.translationSnap) * a.translationSnap), "local" === a.space && a.object.position.applyMatrix4(q))) : "scale" === l ? (_.sub(E), _.multiply(k), "local" === a.space && ("XYZ" === a.axis ? (b = 1 + _.y / Math.max(V.x, V.y, V.z), a.object.scale.x = V.x * b, a.object.scale.y = V.y * b, a.object.scale.z = V.z * b) : (_.applyMatrix4(T.getInverse(q)), "X" === a.axis && (a.object.scale.x = V.x * (1 + _.x / V.x)), "Y" === a.axis && (a.object.scale.y = V.y * (1 + _.y / V.y)), "Z" === a.axis && (a.object.scale.z = V.z * (1 + _.z / V.z))))) : "rotate" === l && (_.sub(j), _.multiply(k), N.copy(E).sub(j), N.multiply(k), "E" === a.axis ? (_.applyMatrix4(T.getInverse(x)), N.applyMatrix4(T.getInverse(x)), w.set(Math.atan2(_.z, _.y), Math.atan2(_.x, _.z), Math.atan2(_.y, _.x)), S.set(Math.atan2(N.z, N.y), Math.atan2(N.x, N.z), Math.atan2(N.y, N.x)), R.setFromRotationMatrix(T.getInverse(z)), F.setFromAxisAngle(A, w.z - S.z), O.setFromRotationMatrix(q), R.multiplyQuaternions(R, F), R.multiplyQuaternions(R, O), a.object.quaternion.copy(R), a.body.quaternion.copy(R)) : "XYZE" === a.axis ? (F.setFromEuler(_.clone().cross(N).normalize()), R.setFromRotationMatrix(T.getInverse(z)), L.setFromAxisAngle(F, -_.clone().angleTo(N)), O.setFromRotationMatrix(q), R.multiplyQuaternions(R, L), R.multiplyQuaternions(R, O), a.object.quaternion.copy(R), a.body.quaternion.copy(R)) : "local" === a.space ? (_.applyMatrix4(T.getInverse(q)), N.applyMatrix4(T.getInverse(q)), w.set(Math.atan2(_.z, _.y), Math.atan2(_.x, _.z), Math.atan2(_.y, _.x)), S.set(Math.atan2(N.z, N.y), Math.atan2(N.x, N.z), Math.atan2(N.y, N.x)), O.setFromRotationMatrix(D), null !== a.rotationSnap ? (L.setFromAxisAngle(C, Math.round((w.x - S.x) / a.rotationSnap) * a.rotationSnap), M.setFromAxisAngle(P, Math.round((w.y - S.y) / a.rotationSnap) * a.rotationSnap), B.setFromAxisAngle(I, Math.round((w.z - S.z) / a.rotationSnap) * a.rotationSnap)) : (L.setFromAxisAngle(C, w.x - S.x), M.setFromAxisAngle(P, w.y - S.y), B.setFromAxisAngle(I, w.z - S.z)), "X" === a.axis && O.multiplyQuaternions(O, L), "Y" === a.axis && O.multiplyQuaternions(O, M), "Z" === a.axis && O.multiplyQuaternions(O, B), a.object.quaternion.copy(O), a.body.quaternion.copy(O)) : "world" === a.space && (w.set(Math.atan2(_.z, _.y), Math.atan2(_.x, _.z), Math.atan2(_.y, _.x)), S.set(Math.atan2(N.z, N.y), Math.atan2(N.x, N.z), Math.atan2(N.y, N.x)), R.setFromRotationMatrix(T.getInverse(z)), null !== a.rotationSnap ? (L.setFromAxisAngle(C, Math.round((w.x - S.x) / a.rotationSnap) * a.rotationSnap), M.setFromAxisAngle(P, Math.round((w.y - S.y) / a.rotationSnap) * a.rotationSnap), B.setFromAxisAngle(I, Math.round((w.z - S.z) / a.rotationSnap) * a.rotationSnap)) : (L.setFromAxisAngle(C, w.x - S.x), M.setFromAxisAngle(P, w.y - S.y), B.setFromAxisAngle(I, w.z - S.z)), O.setFromRotationMatrix(q), "X" === a.axis && R.multiplyQuaternions(R, L), "Y" === a.axis && R.multiplyQuaternions(R, M), "Z" === a.axis && R.multiplyQuaternions(R, B), R.multiplyQuaternions(R, O), a.object.quaternion.copy(R), a.body.quaternion.copy(R))), a.update(), a.dispatchEvent(p), a.dispatchEvent(v))
            }
        }

        function r(t) {
            t.preventDefault(), void 0 !== t.button && 0 !== t.button || (c && null !== a.axis && (m.mode = l, a.dispatchEvent(m)), c = !1, t instanceof TouchEvent ? (a.axis = null, a.update(), a.dispatchEvent(p)) : i(t))
        }

        function s(i, o) {
            var n = e.getBoundingClientRect(),
                r = (i.clientX - n.left) / n.width,
                s = (i.clientY - n.top) / n.height;
            g.set(2 * r - 1, -(2 * s) + 1), y.setFromCamera(g, t);
            var a = y.intersectObjects(o, !0);
            return a[0] ? a[0] : !1
        }
        THREE.Object3D.call(this), e = void 0 !== e ? e : document, this.body = void 0, this.object = void 0, this.visible = !1, this.translationSnap = null, this.rotationSnap = null, this.space = "world", this.size = 1, this.axis = null;
        var a = this,
            l = "translate",
            c = !1,
            h = {
                translate: new THREE.TransformGizmoTranslate,
                rotate: new THREE.TransformGizmoRotate,
                scale: new THREE.TransformGizmoScale
            };
        for (var u in h) {
            var d = h[u];
            d.visible = u === l, this.add(d)
        }
        var p = {
                type: "change"
            },
            f = {
                type: "mouseDown"
            },
            m = {
                type: "mouseUp",
                mode: l
            },
            v = {
                type: "objectChange"
            },
            y = new THREE.Raycaster,
            g = new THREE.Vector2,
            _ = new THREE.Vector3,
            E = new THREE.Vector3,
            w = new THREE.Vector3,
            S = new THREE.Vector3,
            b = 1,
            x = new THREE.Matrix4,
            A = new THREE.Vector3,
            T = new THREE.Matrix4,
            N = new THREE.Vector3,
            R = new THREE.Quaternion,
            C = new THREE.Vector3(1, 0, 0),
            P = new THREE.Vector3(0, 1, 0),
            I = new THREE.Vector3(0, 0, 1),
            O = new THREE.Quaternion,
            L = new THREE.Quaternion,
            M = new THREE.Quaternion,
            B = new THREE.Quaternion,
            F = new THREE.Quaternion,
            H = new THREE.Vector3,
            V = new THREE.Vector3,
            D = new THREE.Matrix4,
            z = new THREE.Matrix4,
            k = new THREE.Vector3,
            j = new THREE.Vector3,
            W = new THREE.Euler,
            q = new THREE.Matrix4,
            G = new THREE.Vector3,
            X = new THREE.Euler;
        e.addEventListener("mousedown", o, !1), e.addEventListener("touchstart", o, !1), e.addEventListener("mousemove", i, !1), e.addEventListener("touchmove", i, !1), e.addEventListener("mousemove", n, !1), e.addEventListener("touchmove", n, !1), e.addEventListener("mouseup", r, !1), e.addEventListener("mouseout", r, !1), e.addEventListener("touchend", r, !1), e.addEventListener("touchcancel", r, !1), e.addEventListener("touchleave", r, !1), this.dispose = function() {
            e.removeEventListener("mousedown", o), e.removeEventListener("touchstart", o), e.removeEventListener("mousemove", i), e.removeEventListener("touchmove", i), e.removeEventListener("mousemove", n), e.removeEventListener("touchmove", n), e.removeEventListener("mouseup", r), e.removeEventListener("mouseout", r), e.removeEventListener("touchend", r), e.removeEventListener("touchcancel", r), e.removeEventListener("touchleave", r)
        }, this.attach = function(t, e) {
            this.body = e, this.object = t, this.visible = !0, this.update()
        }, this.detach = function() {
            this.body = void 0, this.object = void 0, this.visible = !1, this.axis = null
        }, this.getMode = function() {
            return l
        }, this.setMode = function(t) {
            l = t ? t : l, "scale" === l && (a.space = "local");
            for (var e in h) h[e].visible = e === l;
            this.update(), a.dispatchEvent(p)
        }, this.setTranslationSnap = function(t) {
            a.translationSnap = t
        }, this.setRotationSnap = function(t) {
            a.rotationSnap = t
        }, this.setSize = function(t) {
            a.size = t, this.update(), a.dispatchEvent(p)
        }, this.setSpace = function(t) {
            a.space = t, this.update(), a.dispatchEvent(p)
        }, this.update = function() {
            void 0 !== a.object && (a.object.updateMatrixWorld(), j.setFromMatrixPosition(a.object.matrixWorld), W.setFromRotationMatrix(T.extractRotation(a.object.matrixWorld)), t.updateMatrixWorld(), G.setFromMatrixPosition(t.matrixWorld), X.setFromRotationMatrix(T.extractRotation(t.matrixWorld)), b = j.distanceTo(G) / 6 * a.size, this.position.copy(j), this.scale.set(b, b, b), A.copy(G).sub(j).normalize(), "local" === a.space ? h[l].update(W, A) : "world" === a.space && h[l].update(new THREE.Euler, A), h[l].highlight(a.axis))
        }
    }, THREE.TransformControls.prototype = Object.create(THREE.Object3D.prototype), THREE.TransformControls.prototype.constructor = THREE.TransformControls
}(), ! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define, 1) {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.CANNON = t()
    } else define([], t)
}(function() {
    return function t(e, i, o) {
        function n(s, a) {
            if (!i[s]) {
                if (!e[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(s, !0);
                    if (r) return r(s, !0);
                    throw new Error("Cannot find module '" + s + "'")
                }
                var c = i[s] = {
                    exports: {}
                };
                e[s][0].call(c.exports, function(t) {
                    var i = e[s][1][t];
                    return n(i ? i : t)
                }, c, c.exports, t, e, i, o)
            }
            return i[s].exports
        }
        for (var r = "function" == typeof require && require, s = 0; s < o.length; s++) n(o[s]);
        return n
    }({
        1: [function(t, e, i) {
            e.exports = {
                name: "cannon",
                version: "0.6.2",
                description: "A lightweight 3D physics engine written in JavaScript.",
                homepage: "https://github.com/schteppe/cannon.js",
                author: "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
                keywords: ["cannon.js", "cannon", "physics", "engine", "3d"],
                main: "./build/cannon.js",
                engines: {
                    node: "*"
                },
                repository: {
                    type: "git",
                    url: "https://github.com/schteppe/cannon.js.git"
                },
                bugs: {
                    url: "https://github.com/schteppe/cannon.js/issues"
                },
                licenses: [{
                    type: "MIT"
                }],
                devDependencies: {
                    jshint: "latest",
                    "uglify-js": "latest",
                    nodeunit: "^0.9.0",
                    grunt: "~0.4.0",
                    "grunt-contrib-jshint": "~0.1.1",
                    "grunt-contrib-nodeunit": "^0.4.1",
                    "grunt-contrib-concat": "~0.1.3",
                    "grunt-contrib-uglify": "^0.5.1",
                    "grunt-browserify": "^2.1.4",
                    "grunt-contrib-yuidoc": "^0.5.2",
                    browserify: "*"
                },
                dependencies: {}
            }
        }, {}],
        2: [function(t, e, i) {
            e.exports = {
                version: t("../package.json").version,
                AABB: t("./collision/AABB"),
                ArrayCollisionMatrix: t("./collision/ArrayCollisionMatrix"),
                Body: t("./objects/Body"),
                Box: t("./shapes/Box"),
                Broadphase: t("./collision/Broadphase"),
                Constraint: t("./constraints/Constraint"),
                ContactEquation: t("./equations/ContactEquation"),
                Narrowphase: t("./world/Narrowphase"),
                ConeTwistConstraint: t("./constraints/ConeTwistConstraint"),
                ContactMaterial: t("./material/ContactMaterial"),
                ConvexPolyhedron: t("./shapes/ConvexPolyhedron"),
                Cylinder: t("./shapes/Cylinder"),
                DistanceConstraint: t("./constraints/DistanceConstraint"),
                Equation: t("./equations/Equation"),
                EventTarget: t("./utils/EventTarget"),
                FrictionEquation: t("./equations/FrictionEquation"),
                GSSolver: t("./solver/GSSolver"),
                GridBroadphase: t("./collision/GridBroadphase"),
                Heightfield: t("./shapes/Heightfield"),
                HingeConstraint: t("./constraints/HingeConstraint"),
                LockConstraint: t("./constraints/LockConstraint"),
                Mat3: t("./math/Mat3"),
                Material: t("./material/Material"),
                NaiveBroadphase: t("./collision/NaiveBroadphase"),
                ObjectCollisionMatrix: t("./collision/ObjectCollisionMatrix"),
                Pool: t("./utils/Pool"),
                Particle: t("./shapes/Particle"),
                Plane: t("./shapes/Plane"),
                PointToPointConstraint: t("./constraints/PointToPointConstraint"),
                Quaternion: t("./math/Quaternion"),
                Ray: t("./collision/Ray"),
                RaycastVehicle: t("./objects/RaycastVehicle"),
                RaycastResult: t("./collision/RaycastResult"),
                RigidVehicle: t("./objects/RigidVehicle"),
                RotationalEquation: t("./equations/RotationalEquation"),
                RotationalMotorEquation: t("./equations/RotationalMotorEquation"),
                SAPBroadphase: t("./collision/SAPBroadphase"),
                SPHSystem: t("./objects/SPHSystem"),
                Shape: t("./shapes/Shape"),
                Solver: t("./solver/Solver"),
                Sphere: t("./shapes/Sphere"),
                SplitSolver: t("./solver/SplitSolver"),
                Spring: t("./objects/Spring"),
                Trimesh: t("./shapes/Trimesh"),
                Vec3: t("./math/Vec3"),
                Vec3Pool: t("./utils/Vec3Pool"),
                World: t("./world/World")
            }
        }, {
            "../package.json": 1,
            "./collision/AABB": 3,
            "./collision/ArrayCollisionMatrix": 4,
            "./collision/Broadphase": 5,
            "./collision/GridBroadphase": 6,
            "./collision/NaiveBroadphase": 7,
            "./collision/ObjectCollisionMatrix": 8,
            "./collision/Ray": 9,
            "./collision/RaycastResult": 10,
            "./collision/SAPBroadphase": 11,
            "./constraints/ConeTwistConstraint": 12,
            "./constraints/Constraint": 13,
            "./constraints/DistanceConstraint": 14,
            "./constraints/HingeConstraint": 15,
            "./constraints/LockConstraint": 16,
            "./constraints/PointToPointConstraint": 17,
            "./equations/ContactEquation": 19,
            "./equations/Equation": 20,
            "./equations/FrictionEquation": 21,
            "./equations/RotationalEquation": 22,
            "./equations/RotationalMotorEquation": 23,
            "./material/ContactMaterial": 24,
            "./material/Material": 25,
            "./math/Mat3": 27,
            "./math/Quaternion": 28,
            "./math/Vec3": 30,
            "./objects/Body": 31,
            "./objects/RaycastVehicle": 32,
            "./objects/RigidVehicle": 33,
            "./objects/SPHSystem": 34,
            "./objects/Spring": 35,
            "./shapes/Box": 37,
            "./shapes/ConvexPolyhedron": 38,
            "./shapes/Cylinder": 39,
            "./shapes/Heightfield": 40,
            "./shapes/Particle": 41,
            "./shapes/Plane": 42,
            "./shapes/Shape": 43,
            "./shapes/Sphere": 44,
            "./shapes/Trimesh": 45,
            "./solver/GSSolver": 46,
            "./solver/Solver": 47,
            "./solver/SplitSolver": 48,
            "./utils/EventTarget": 49,
            "./utils/Pool": 51,
            "./utils/Vec3Pool": 54,
            "./world/Narrowphase": 55,
            "./world/World": 56
        }],
        3: [function(t, e, i) {
            function o(t) {
                t = t || {}, this.lowerBound = new n, t.lowerBound && this.lowerBound.copy(t.lowerBound), this.upperBound = new n, t.upperBound && this.upperBound.copy(t.upperBound)
            }
            var n = t("../math/Vec3");
            t("../utils/Utils");
            e.exports = o;
            var r = new n;
            o.prototype.setFromPoints = function(t, e, i, o) {
                var n = this.lowerBound,
                    s = this.upperBound,
                    a = i;
                n.copy(t[0]), a && a.vmult(n, n), s.copy(n);
                for (var l = 1; l < t.length; l++) {
                    var c = t[l];
                    a && (a.vmult(c, r), c = r), c.x > s.x && (s.x = c.x), c.x < n.x && (n.x = c.x), c.y > s.y && (s.y = c.y), c.y < n.y && (n.y = c.y), c.z > s.z && (s.z = c.z), c.z < n.z && (n.z = c.z)
                }
                return e && (e.vadd(n, n), e.vadd(s, s)), o && (n.x -= o, n.y -= o, n.z -= o, s.x += o, s.y += o, s.z += o), this
            }, o.prototype.copy = function(t) {
                return this.lowerBound.copy(t.lowerBound), this.upperBound.copy(t.upperBound), this
            }, o.prototype.clone = function() {
                return (new o).copy(this)
            }, o.prototype.extend = function(t) {
                var e = t.lowerBound.x;
                this.lowerBound.x > e && (this.lowerBound.x = e);
                var i = t.upperBound.x;
                this.upperBound.x < i && (this.upperBound.x = i);
                var e = t.lowerBound.y;
                this.lowerBound.y > e && (this.lowerBound.y = e);
                var i = t.upperBound.y;
                this.upperBound.y < i && (this.upperBound.y = i);
                var e = t.lowerBound.z;
                this.lowerBound.z > e && (this.lowerBound.z = e);
                var i = t.upperBound.z;
                this.upperBound.z < i && (this.upperBound.z = i)
            }, o.prototype.overlaps = function(t) {
                var e = this.lowerBound,
                    i = this.upperBound,
                    o = t.lowerBound,
                    n = t.upperBound;
                return (o.x <= i.x && i.x <= n.x || e.x <= n.x && n.x <= i.x) && (o.y <= i.y && i.y <= n.y || e.y <= n.y && n.y <= i.y) && (o.z <= i.z && i.z <= n.z || e.z <= n.z && n.z <= i.z)
            }, o.prototype.contains = function(t) {
                var e = this.lowerBound,
                    i = this.upperBound,
                    o = t.lowerBound,
                    n = t.upperBound;
                return e.x <= o.x && i.x >= n.x && e.y <= o.y && i.y >= n.y && e.z <= o.z && i.z >= n.z
            }, o.prototype.getCorners = function(t, e, i, o, n, r, s, a) {
                var l = this.lowerBound,
                    c = this.upperBound;
                t.copy(l), e.set(c.x, l.y, l.z), i.set(c.x, c.y, l.z), o.set(l.x, c.y, c.z), n.set(c.x, l.y, l.z), r.set(l.x, c.y, l.z), s.set(l.x, l.y, c.z), a.copy(c)
            };
            var s = [new n, new n, new n, new n, new n, new n, new n, new n];
            o.prototype.toLocalFrame = function(t, e) {
                var i = s,
                    o = i[0],
                    n = i[1],
                    r = i[2],
                    a = i[3],
                    l = i[4],
                    c = i[5],
                    h = i[6],
                    u = i[7];
                this.getCorners(o, n, r, a, l, c, h, u);
                for (var d = 0; 8 !== d; d++) {
                    var p = i[d];
                    t.pointToLocal(p, p)
                }
                return e.setFromPoints(i)
            }, o.prototype.toWorldFrame = function(t, e) {
                var i = s,
                    o = i[0],
                    n = i[1],
                    r = i[2],
                    a = i[3],
                    l = i[4],
                    c = i[5],
                    h = i[6],
                    u = i[7];
                this.getCorners(o, n, r, a, l, c, h, u);
                for (var d = 0; 8 !== d; d++) {
                    var p = i[d];
                    t.pointToWorld(p, p)
                }
                return e.setFromPoints(i)
            }
        }, {
            "../math/Vec3": 30,
            "../utils/Utils": 53
        }],
        4: [function(t, e, i) {
            function o() {
                this.matrix = []
            }
            e.exports = o, o.prototype.get = function(t, e) {
                if (t = t.index, e = e.index, e > t) {
                    var i = e;
                    e = t, t = i
                }
                return this.matrix[(t * (t + 1) >> 1) + e - 1]
            }, o.prototype.set = function(t, e, i) {
                if (t = t.index, e = e.index, e > t) {
                    var o = e;
                    e = t, t = o
                }
                this.matrix[(t * (t + 1) >> 1) + e - 1] = i ? 1 : 0
            }, o.prototype.reset = function() {
                for (var t = 0, e = this.matrix.length; t !== e; t++) this.matrix[t] = 0
            }, o.prototype.setNumObjects = function(t) {
                this.matrix.length = t * (t - 1) >> 1
            }
        }, {}],
        5: [function(t, e, i) {
            function o() {
                this.world = null, this.useBoundingBoxes = !1, this.dirty = !0
            }
            var n = t("../objects/Body"),
                r = t("../math/Vec3"),
                s = t("../math/Quaternion");
            t("../shapes/Shape"), t("../shapes/Plane");
            e.exports = o, o.prototype.collisionPairs = function(t, e, i) {
                throw new Error("collisionPairs not implemented for this BroadPhase class!")
            };
            var a = n.STATIC | n.KINEMATIC;
            o.prototype.needBroadphaseCollision = function(t, e) {
                return 0 === (t.collisionFilterGroup & e.collisionFilterMask) || 0 === (e.collisionFilterGroup & t.collisionFilterMask) ? !1 : 0 === (t.type & a) && t.sleepState !== n.SLEEPING || 0 === (e.type & a) && e.sleepState !== n.SLEEPING
            }, o.prototype.intersectionTest = function(t, e, i, o) {
                this.useBoundingBoxes ? this.doBoundingBoxBroadphase(t, e, i, o) : this.doBoundingSphereBroadphase(t, e, i, o)
            };
            var l = new r;
            new r, new s, new r;
            o.prototype.doBoundingSphereBroadphase = function(t, e, i, o) {
                var n = l;
                e.position.vsub(t.position, n);
                var r = Math.pow(t.boundingRadius + e.boundingRadius, 2),
                    s = n.norm2();
                r > s && (i.push(t), o.push(e))
            }, o.prototype.doBoundingBoxBroadphase = function(t, e, i, o) {
                t.aabbNeedsUpdate && t.computeAABB(), e.aabbNeedsUpdate && e.computeAABB(), t.aabb.overlaps(e.aabb) && (i.push(t), o.push(e))
            };
            var c = {
                    keys: []
                },
                h = [],
                u = [];
            o.prototype.makePairsUnique = function(t, e) {
                for (var i = c, o = h, n = u, r = t.length, s = 0; s !== r; s++) o[s] = t[s], n[s] = e[s];
                t.length = 0, e.length = 0;
                for (var s = 0; s !== r; s++) {
                    var a = o[s].id,
                        l = n[s].id,
                        d = l > a ? a + "," + l : l + "," + a;
                    i[d] = s, i.keys.push(d)
                }
                for (var s = 0; s !== i.keys.length; s++) {
                    var d = i.keys.pop(),
                        p = i[d];
                    t.push(o[p]), e.push(n[p]), delete i[d]
                }
            }, o.prototype.setWorld = function(t) {};
            var d = new r;
            o.boundingSphereCheck = function(t, e) {
                var i = d;
                return t.position.vsub(e.position, i), Math.pow(t.shape.boundingSphereRadius + e.shape.boundingSphereRadius, 2) > i.norm2()
            }, o.prototype.aabbQuery = function(t, e, i) {
                return console.warn(".aabbQuery is not implemented in this Broadphase subclass."), []
            }
        }, {
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "../objects/Body": 31,
            "../shapes/Plane": 42,
            "../shapes/Shape": 43
        }],
        6: [function(t, e, i) {
            function o(t, e, i, o, s) {
                n.apply(this), this.nx = i || 10, this.ny = o || 10, this.nz = s || 10, this.aabbMin = t || new r(100, 100, 100), this.aabbMax = e || new r(-100, -100, -100);
                var a = this.nx * this.ny * this.nz;
                if (0 >= a) throw "GridBroadphase: Each dimension's n must be >0";
                this.bins = [], this.binLengths = [], this.bins.length = a, this.binLengths.length = a;
                for (var l = 0; a > l; l++) this.bins[l] = [], this.binLengths[l] = 0
            }
            e.exports = o;
            var n = t("./Broadphase"),
                r = t("../math/Vec3"),
                s = t("../shapes/Shape");
            o.prototype = new n, o.prototype.constructor = o;
            var a = new r;
            new r;
            o.prototype.collisionPairs = function(t, e, i) {
                function o(t, e, i, o, n, r, s) {
                    var a = (t - _) * S | 0,
                        l = (e - E) * b | 0,
                        c = (i - w) * x | 0,
                        v = F((o - _) * S),
                        y = F((n - E) * b),
                        g = F((r - w) * x);
                    0 > a ? a = 0 : a >= h && (a = h - 1), 0 > l ? l = 0 : l >= u && (l = u - 1), 0 > c ? c = 0 : c >= d && (c = d - 1), 0 > v ? v = 0 : v >= h && (v = h - 1), 0 > y ? y = 0 : y >= u && (y = u - 1), 0 > g ? g = 0 : g >= d && (g = d - 1), a *= p, l *= f, c *= m, v *= p, y *= f, g *= m;
                    for (var A = a; v >= A; A += p)
                        for (var T = l; y >= T; T += f)
                            for (var N = c; g >= N; N += m) {
                                var R = A + T + N;
                                O[R][L[R]++] = s
                            }
                }
                for (var n = t.numObjects(), r = t.bodies, l = this.aabbMax, c = this.aabbMin, h = this.nx, u = this.ny, d = this.nz, p = u * d, f = d, m = 1, v = l.x, y = l.y, g = l.z, _ = c.x, E = c.y, w = c.z, S = h / (v - _), b = u / (y - E), x = d / (g - w), A = (v - _) / h, T = (y - E) / u, N = (g - w) / d, R = .5 * Math.sqrt(A * A + T * T + N * N), C = s.types, P = C.SPHERE, I = C.PLANE, O = (C.BOX, C.COMPOUND, C.CONVEXPOLYHEDRON, this.bins), L = this.binLengths, M = this.bins.length, B = 0; B !== M; B++) L[B] = 0;
                for (var F = Math.ceil, c = Math.min, l = Math.max, B = 0; B !== n; B++) {
                    var H = r[B],
                        V = H.shape;
                    switch (V.type) {
                        case P:
                            var D = H.position.x,
                                z = H.position.y,
                                k = H.position.z,
                                j = V.radius;
                            o(D - j, z - j, k - j, D + j, z + j, k + j, H);
                            break;
                        case I:
                            V.worldNormalNeedsUpdate && V.computeWorldNormal(H.quaternion);
                            var W = V.worldNormal,
                                q = _ + .5 * A - H.position.x,
                                G = E + .5 * T - H.position.y,
                                X = w + .5 * N - H.position.z,
                                Y = a;
                            Y.set(q, G, X);
                            for (var U = 0, Z = 0; U !== h; U++, Z += p, Y.y = G, Y.x += A)
                                for (var K = 0, Q = 0; K !== u; K++, Q += f, Y.z = X, Y.y += T)
                                    for (var $ = 0, J = 0; $ !== d; $++, J += m, Y.z += N)
                                        if (Y.dot(W) < R) {
                                            var tt = Z + Q + J;
                                            O[tt][L[tt]++] = H
                                        }
                            break;
                        default:
                            H.aabbNeedsUpdate && H.computeAABB(), o(H.aabb.lowerBound.x, H.aabb.lowerBound.y, H.aabb.lowerBound.z, H.aabb.upperBound.x, H.aabb.upperBound.y, H.aabb.upperBound.z, H)
                    }
                }
                for (var B = 0; B !== M; B++) {
                    var et = L[B];
                    if (et > 1)
                        for (var it = O[B], U = 0; U !== et; U++)
                            for (var H = it[U], K = 0; K !== U; K++) {
                                var ot = it[K];
                                this.needBroadphaseCollision(H, ot) && this.intersectionTest(H, ot, e, i)
                            }
                }
                this.makePairsUnique(e, i)
            }
        }, {
            "../math/Vec3": 30,
            "../shapes/Shape": 43,
            "./Broadphase": 5
        }],
        7: [function(t, e, i) {
            function o() {
                n.apply(this)
            }
            e.exports = o;
            var n = t("./Broadphase"),
                r = t("./AABB");
            o.prototype = new n, o.prototype.constructor = o, o.prototype.collisionPairs = function(t, e, i) {
                var o, n, r, s, a = t.bodies,
                    l = a.length;
                for (o = 0; o !== l; o++)
                    for (n = 0; n !== o; n++) r = a[o], s = a[n], this.needBroadphaseCollision(r, s) && this.intersectionTest(r, s, e, i)
            };
            new r;
            o.prototype.aabbQuery = function(t, e, i) {
                i = i || [];
                for (var o = 0; o < t.bodies.length; o++) {
                    var n = t.bodies[o];
                    n.aabbNeedsUpdate && n.computeAABB(), n.aabb.overlaps(e) && i.push(n)
                }
                return i
            }
        }, {
            "./AABB": 3,
            "./Broadphase": 5
        }],
        8: [function(t, e, i) {
            function o() {
                this.matrix = {}
            }
            e.exports = o, o.prototype.get = function(t, e) {
                if (t = t.id, e = e.id, e > t) {
                    var i = e;
                    e = t, t = i
                }
                return t + "-" + e in this.matrix
            }, o.prototype.set = function(t, e, i) {
                if (t = t.id, e = e.id, e > t) {
                    var o = e;
                    e = t, t = o
                }
                i ? this.matrix[t + "-" + e] = !0 : delete this.matrix[t + "-" + e]
            }, o.prototype.reset = function() {
                this.matrix = {}
            }, o.prototype.setNumObjects = function(t) {}
        }, {}],
        9: [function(t, e, i) {
            function o(t, e) {
                this.from = t ? t.clone() : new s, this.to = e ? e.clone() : new s, this._direction = new s, this.precision = 1e-4, this.checkCollisionResponse = !0, this.skipBackfaces = !1, this.collisionFilterMask = -1, this.collisionFilterGroup = -1, this.mode = o.ANY, this.result = new c, this.hasHit = !1, this.callback = function(t) {}
            }

            function n(t, e, i, o) {
                o.vsub(e, B), i.vsub(e, f), t.vsub(e, m);
                var n, r, s = B.dot(B),
                    a = B.dot(f),
                    l = B.dot(m),
                    c = f.dot(f),
                    h = f.dot(m);
                return (n = c * l - a * h) >= 0 && (r = s * h - a * l) >= 0 && s * c - a * a > n + r
            }

            function r(t, e, i) {
                i.vsub(t, B);
                var o = B.dot(e);
                e.mult(o, F), F.vadd(t, F);
                var n = i.distanceTo(F);
                return n
            }
            e.exports = o;
            var s = t("../math/Vec3"),
                a = t("../math/Quaternion"),
                l = t("../math/Transform"),
                c = (t("../shapes/ConvexPolyhedron"), t("../shapes/Box"), t("../collision/RaycastResult")),
                h = t("../shapes/Shape"),
                u = t("../collision/AABB");
            o.prototype.constructor = o, o.CLOSEST = 1, o.ANY = 2, o.ALL = 4;
            var d = new u,
                p = [];
            o.prototype.intersectWorld = function(t, e) {
                return this.mode = e.mode || o.ANY, this.result = e.result || new c, this.skipBackfaces = !!e.skipBackfaces, this.collisionFilterMask = "undefined" != typeof e.collisionFilterMask ? e.collisionFilterMask : -1, this.collisionFilterGroup = "undefined" != typeof e.collisionFilterGroup ? e.collisionFilterGroup : -1, e.from && this.from.copy(e.from), e.to && this.to.copy(e.to), this.callback = e.callback || function() {}, this.hasHit = !1, this.result.reset(), this._updateDirection(), this.getAABB(d), p.length = 0, t.broadphase.aabbQuery(t, d, p), this.intersectBodies(p), this.hasHit
            };
            var f = new s,
                m = new s;
            o.pointInTriangle = n;
            var v = new s,
                y = new a;
            o.prototype.intersectBody = function(t, e) {
                e && (this.result = e, this._updateDirection());
                var i = this.checkCollisionResponse;
                if ((!i || t.collisionResponse) && 0 !== (this.collisionFilterGroup & t.collisionFilterMask) && 0 !== (t.collisionFilterGroup & this.collisionFilterMask))
                    for (var o = v, n = y, r = 0, s = t.shapes.length; s > r; r++) {
                        var a = t.shapes[r];
                        if ((!i || a.collisionResponse) && (t.quaternion.mult(t.shapeOrientations[r], n), t.quaternion.vmult(t.shapeOffsets[r], o), o.vadd(t.position, o), this.intersectShape(a, n, o, t), this.result._shouldStop)) break
                    }
            }, o.prototype.intersectBodies = function(t, e) {
                e && (this.result = e, this._updateDirection());
                for (var i = 0, o = t.length; !this.result._shouldStop && o > i; i++) this.intersectBody(t[i])
            }, o.prototype._updateDirection = function() {
                this.to.vsub(this.from, this._direction), this._direction.normalize()
            }, o.prototype.intersectShape = function(t, e, i, o) {
                var n = this.from,
                    s = r(n, this._direction, i);
                if (!(s > t.boundingSphereRadius)) {
                    var a = this[t.type];
                    a && a.call(this, t, e, i, o)
                }
            };
            var g = (new s, new s, new s),
                _ = new s,
                E = new s,
                w = new s;
            new s, new c;
            o.prototype.intersectBox = function(t, e, i, o) {
                return this.intersectConvex(t.convexPolyhedronRepresentation, e, i, o)
            }, o.prototype[h.types.BOX] = o.prototype.intersectBox, o.prototype.intersectPlane = function(t, e, i, o) {
                var n = this.from,
                    r = this.to,
                    a = this._direction,
                    l = new s(0, 0, 1);
                e.vmult(l, l);
                var c = new s;
                n.vsub(i, c);
                var h = c.dot(l);
                r.vsub(i, c);
                var u = c.dot(l);
                if (!(h * u > 0 || n.distanceTo(r) < h)) {
                    var d = l.dot(a);
                    if (!(Math.abs(d) < this.precision)) {
                        var p = new s,
                            f = new s,
                            m = new s;
                        n.vsub(i, p);
                        var v = -l.dot(p) / d;
                        a.scale(v, f), n.vadd(f, m), this.reportIntersection(l, m, t, o, -1)
                    }
                }
            }, o.prototype[h.types.PLANE] = o.prototype.intersectPlane, o.prototype.getAABB = function(t) {
                var e = this.to,
                    i = this.from;
                t.lowerBound.x = Math.min(e.x, i.x), t.lowerBound.y = Math.min(e.y, i.y), t.lowerBound.z = Math.min(e.z, i.z), t.upperBound.x = Math.max(e.x, i.x), t.upperBound.y = Math.max(e.y, i.y), t.upperBound.z = Math.max(e.z, i.z)
            };
            var S = {
                faceList: [0]
            };
            o.prototype.intersectHeightfield = function(t, e, i, n) {
                var r = (t.data, t.elementSize, new s),
                    a = new o(this.from, this.to);
                l.pointToLocalFrame(i, e, a.from, a.from), l.pointToLocalFrame(i, e, a.to, a.to);
                var c = [],
                    h = null,
                    u = null,
                    d = null,
                    p = null,
                    f = t.getIndexOfPosition(a.from.x, a.from.y, c, !1);
                if (f && (h = c[0], u = c[1], d = c[0], p = c[1]), f = t.getIndexOfPosition(a.to.x, a.to.y, c, !1), f && ((null === h || c[0] < h) && (h = c[0]), (null === d || c[0] > d) && (d = c[0]), (null === u || c[1] < u) && (u = c[1]), (null === p || c[1] > p) && (p = c[1])), null !== h) {
                    var m = [];
                    t.getRectMinMax(h, u, d, p, m);
                    for (var v = (m[0], m[1], h); d >= v; v++)
                        for (var y = u; p >= y; y++) {
                            if (this.result._shouldStop) return;
                            if (t.getConvexTrianglePillar(v, y, !1), l.pointToWorldFrame(i, e, t.pillarOffset, r), this.intersectConvex(t.pillarConvex, e, r, n, S), this.result._shouldStop) return;
                            t.getConvexTrianglePillar(v, y, !0), l.pointToWorldFrame(i, e, t.pillarOffset, r), this.intersectConvex(t.pillarConvex, e, r, n, S)
                        }
                }
            }, o.prototype[h.types.HEIGHTFIELD] = o.prototype.intersectHeightfield;
            var b = new s,
                x = new s;
            o.prototype.intersectSphere = function(t, e, i, o) {
                var n = this.from,
                    r = this.to,
                    s = t.radius,
                    a = Math.pow(r.x - n.x, 2) + Math.pow(r.y - n.y, 2) + Math.pow(r.z - n.z, 2),
                    l = 2 * ((r.x - n.x) * (n.x - i.x) + (r.y - n.y) * (n.y - i.y) + (r.z - n.z) * (n.z - i.z)),
                    c = Math.pow(n.x - i.x, 2) + Math.pow(n.y - i.y, 2) + Math.pow(n.z - i.z, 2) - Math.pow(s, 2),
                    h = Math.pow(l, 2) - 4 * a * c,
                    u = b,
                    d = x;
                if (!(0 > h))
                    if (0 === h) n.lerp(r, h, u), u.vsub(i, d), d.normalize(), this.reportIntersection(d, u, t, o, -1);
                    else {
                        var p = (-l - Math.sqrt(h)) / (2 * a),
                            f = (-l + Math.sqrt(h)) / (2 * a);
                        if (p >= 0 && 1 >= p && (n.lerp(r, p, u), u.vsub(i, d), d.normalize(), this.reportIntersection(d, u, t, o, -1)), this.result._shouldStop) return;
                        f >= 0 && 1 >= f && (n.lerp(r, f, u), u.vsub(i, d), d.normalize(), this.reportIntersection(d, u, t, o, -1))
                    }
            }, o.prototype[h.types.SPHERE] = o.prototype.intersectSphere;
            var A = new s,
                T = (new s, new s, new s);
            o.prototype.intersectConvex = function(t, e, i, o, r) {
                for (var s = A, a = T, l = r && r.faceList || null, c = t.faces, h = t.vertices, u = t.faceNormals, d = this._direction, p = this.from, f = this.to, m = p.distanceTo(f), v = l ? l.length : c.length, y = this.result, S = 0; !y._shouldStop && v > S; S++) {
                    var b = l ? l[S] : S,
                        x = c[b],
                        N = u[b],
                        R = e,
                        C = i;
                    a.copy(h[x[0]]), R.vmult(a, a), a.vadd(C, a), a.vsub(p, a), R.vmult(N, s);
                    var P = d.dot(s);
                    if (!(Math.abs(P) < this.precision)) {
                        var I = s.dot(a) / P;
                        if (!(0 > I)) {
                            d.mult(I, g), g.vadd(p, g), _.copy(h[x[0]]), R.vmult(_, _), C.vadd(_, _);
                            for (var O = 1; !y._shouldStop && O < x.length - 1; O++) {
                                E.copy(h[x[O]]), w.copy(h[x[O + 1]]), R.vmult(E, E), R.vmult(w, w), C.vadd(E, E), C.vadd(w, w);
                                var L = g.distanceTo(p);
                                !n(g, _, E, w) && !n(g, E, _, w) || L > m || this.reportIntersection(s, g, t, o, b)
                            }
                        }
                    }
                }
            }, o.prototype[h.types.CONVEXPOLYHEDRON] = o.prototype.intersectConvex;
            var N = new s,
                R = new s,
                C = new s,
                P = new s,
                I = new s,
                O = new s,
                L = (new u, []),
                M = new l;
            o.prototype.intersectTrimesh = function(t, e, i, o, r) {
                var s = N,
                    a = L,
                    c = M,
                    h = T,
                    u = R,
                    d = C,
                    p = P,
                    f = O,
                    m = I,
                    v = (r && r.faceList || null, t.indices),
                    y = (t.vertices, t.faceNormals, this.from),
                    S = this.to,
                    b = this._direction;
                c.position.copy(i), c.quaternion.copy(e), l.vectorToLocalFrame(i, e, b, u), l.pointToLocalFrame(i, e, y, d), l.pointToLocalFrame(i, e, S, p);
                var x = d.distanceSquared(p);
                t.tree.rayQuery(this, c, a);
                for (var A = 0, B = a.length; !this.result._shouldStop && A !== B; A++) {
                    var F = a[A];
                    t.getNormal(F, s), t.getVertex(v[3 * F], _), _.vsub(d, h);
                    var H = u.dot(s),
                        V = s.dot(h) / H;
                    if (!(0 > V)) {
                        u.scale(V, g), g.vadd(d, g), t.getVertex(v[3 * F + 1], E), t.getVertex(v[3 * F + 2], w);
                        var D = g.distanceSquared(d);
                        !n(g, E, _, w) && !n(g, _, E, w) || D > x || (l.vectorToWorldFrame(e, s, m), l.pointToWorldFrame(i, e, g, f), this.reportIntersection(m, f, t, o, F))
                    }
                }
                a.length = 0
            }, o.prototype[h.types.TRIMESH] = o.prototype.intersectTrimesh, o.prototype.reportIntersection = function(t, e, i, n, r) {
                var s = this.from,
                    a = this.to,
                    l = s.distanceTo(e),
                    c = this.result;
                if (!(this.skipBackfaces && t.dot(this._direction) > 0)) switch (c.hitFaceIndex = "undefined" != typeof r ? r : -1, this.mode) {
                    case o.ALL:
                        this.hasHit = !0, c.set(s, a, t, e, i, n, l), c.hasHit = !0, this.callback(c);
                        break;
                    case o.CLOSEST:
                        (l < c.distance || !c.hasHit) && (this.hasHit = !0, c.hasHit = !0, c.set(s, a, t, e, i, n, l));
                        break;
                    case o.ANY:
                        this.hasHit = !0, c.hasHit = !0, c.set(s, a, t, e, i, n, l), c._shouldStop = !0
                }
            };
            var B = new s,
                F = new s
        }, {
            "../collision/AABB": 3,
            "../collision/RaycastResult": 10,
            "../math/Quaternion": 28,
            "../math/Transform": 29,
            "../math/Vec3": 30,
            "../shapes/Box": 37,
            "../shapes/ConvexPolyhedron": 38,
            "../shapes/Shape": 43
        }],
        10: [function(t, e, i) {
            function o() {
                this.rayFromWorld = new n, this.rayToWorld = new n, this.hitNormalWorld = new n, this.hitPointWorld = new n, this.hasHit = !1, this.shape = null, this.body = null, this.hitFaceIndex = -1, this.distance = -1, this._shouldStop = !1
            }
            var n = t("../math/Vec3");
            e.exports = o, o.prototype.reset = function() {
                this.rayFromWorld.setZero(), this.rayToWorld.setZero(), this.hitNormalWorld.setZero(), this.hitPointWorld.setZero(), this.hasHit = !1, this.shape = null, this.body = null, this.hitFaceIndex = -1, this.distance = -1, this._shouldStop = !1
            }, o.prototype.abort = function() {
                this._shouldStop = !0
            }, o.prototype.set = function(t, e, i, o, n, r, s) {
                this.rayFromWorld.copy(t), this.rayToWorld.copy(e), this.hitNormalWorld.copy(i), this.hitPointWorld.copy(o), this.shape = n, this.body = r, this.distance = s
            }
        }, {
            "../math/Vec3": 30
        }],
        11: [function(t, e, i) {
            function o(t) {
                n.apply(this), this.axisList = [], this.world = null, this.axisIndex = 0;
                var e = this.axisList;
                this._addBodyHandler = function(t) {
                    e.push(t.body)
                }, this._removeBodyHandler = function(t) {
                    var i = e.indexOf(t.body); - 1 !== i && e.splice(i, 1)
                }, t && this.setWorld(t)
            }
            var n = (t("../shapes/Shape"), t("../collision/Broadphase"));
            e.exports = o, o.prototype = new n, o.prototype.setWorld = function(t) {
                this.axisList.length = 0;
                for (var e = 0; e < t.bodies.length; e++) this.axisList.push(t.bodies[e]);
                t.removeEventListener("addBody", this._addBodyHandler), t.removeEventListener("removeBody", this._removeBodyHandler), t.addEventListener("addBody", this._addBodyHandler), t.addEventListener("removeBody", this._removeBodyHandler), this.world = t, this.dirty = !0
            }, o.insertionSortX = function(t) {
                for (var e = 1, i = t.length; i > e; e++) {
                    for (var o = t[e], n = e - 1; n >= 0 && !(t[n].aabb.lowerBound.x <= o.aabb.lowerBound.x); n--) t[n + 1] = t[n];
                    t[n + 1] = o
                }
                return t
            }, o.insertionSortY = function(t) {
                for (var e = 1, i = t.length; i > e; e++) {
                    for (var o = t[e], n = e - 1; n >= 0 && !(t[n].aabb.lowerBound.y <= o.aabb.lowerBound.y); n--) t[n + 1] = t[n];
                    t[n + 1] = o
                }
                return t
            }, o.insertionSortZ = function(t) {
                for (var e = 1, i = t.length; i > e; e++) {
                    for (var o = t[e], n = e - 1; n >= 0 && !(t[n].aabb.lowerBound.z <= o.aabb.lowerBound.z); n--) t[n + 1] = t[n];
                    t[n + 1] = o
                }
                return t
            }, o.prototype.collisionPairs = function(t, e, i) {
                var n, r, s = this.axisList,
                    a = s.length,
                    l = this.axisIndex;
                for (this.dirty && (this.sortList(), this.dirty = !1), n = 0; n !== a; n++) {
                    var c = s[n];
                    for (r = n + 1; a > r; r++) {
                        var h = s[r];
                        if (this.needBroadphaseCollision(c, h)) {
                            if (!o.checkBounds(c, h, l)) break;
                            this.intersectionTest(c, h, e, i)
                        }
                    }
                }
            }, o.prototype.sortList = function() {
                for (var t = this.axisList, e = this.axisIndex, i = t.length, n = 0; n !== i; n++) {
                    var r = t[n];
                    r.aabbNeedsUpdate && r.computeAABB()
                }
                0 === e ? o.insertionSortX(t) : 1 === e ? o.insertionSortY(t) : 2 === e && o.insertionSortZ(t)
            }, o.checkBounds = function(t, e, i) {
                var o, n;
                0 === i ? (o = t.position.x, n = e.position.x) : 1 === i ? (o = t.position.y, n = e.position.y) : 2 === i && (o = t.position.z, n = e.position.z);
                var r = t.boundingRadius,
                    s = e.boundingRadius,
                    a = o + r,
                    l = n - s;
                return a > l
            }, o.prototype.autoDetectAxis = function() {
                for (var t = 0, e = 0, i = 0, o = 0, n = 0, r = 0, s = this.axisList, a = s.length, l = 1 / a, c = 0; c !== a; c++) {
                    var h = s[c],
                        u = h.position.x;
                    t += u, e += u * u;
                    var d = h.position.y;
                    i += d, o += d * d;
                    var p = h.position.z;
                    n += p, r += p * p
                }
                var f = e - t * t * l,
                    m = o - i * i * l,
                    v = r - n * n * l;
                f > m ? f > v ? this.axisIndex = 0 : this.axisIndex = 2 : m > v ? this.axisIndex = 1 : this.axisIndex = 2
            }, o.prototype.aabbQuery = function(t, e, i) {
                i = i || [], this.dirty && (this.sortList(), this.dirty = !1);
                var o = this.axisIndex,
                    n = "x";
                1 === o && (n = "y"), 2 === o && (n = "z");
                for (var r = this.axisList, s = (e.lowerBound[n], e.upperBound[n], 0); s < r.length; s++) {
                    var a = r[s];
                    a.aabbNeedsUpdate && a.computeAABB(), a.aabb.overlaps(e) && i.push(a)
                }
                return i
            }
        }, {
            "../collision/Broadphase": 5,
            "../shapes/Shape": 43
        }],
        12: [function(t, e, i) {
            function o(t, e, i) {
                i = i || {};
                var o = "undefined" != typeof i.maxForce ? i.maxForce : 1e6,
                    l = i.pivotA ? i.pivotA.clone() : new a,
                    c = i.pivotB ? i.pivotB.clone() : new a;
                this.axisA = i.axisA ? i.axisA.clone() : new a, this.axisB = i.axisB ? i.axisB.clone() : new a, n.call(this, t, l, e, c, o), this.collideConnected = !!i.collideConnected, this.angle = "undefined" != typeof i.angle ? i.angle : 0;
                var h = this.coneEquation = new r(t, e, i),
                    u = this.twistEquation = new s(t, e, i);
                this.twistAngle = "undefined" != typeof i.twistAngle ? i.twistAngle : 0, h.maxForce = 0, h.minForce = -o, u.maxForce = 0, u.minForce = -o, this.equations.push(h, u)
            }
            e.exports = o;
            var n = (t("./Constraint"), t("./PointToPointConstraint")),
                r = t("../equations/ConeEquation"),
                s = t("../equations/RotationalEquation"),
                a = (t("../equations/ContactEquation"), t("../math/Vec3"));
            o.prototype = new n, o.constructor = o;
            new a, new a;
            o.prototype.update = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    i = this.coneEquation,
                    o = this.twistEquation;
                n.prototype.update.call(this), t.vectorToWorldFrame(this.axisA, i.axisA), e.vectorToWorldFrame(this.axisB, i.axisB), this.axisA.tangents(o.axisA, o.axisA), t.vectorToWorldFrame(o.axisA, o.axisA), this.axisB.tangents(o.axisB, o.axisB), e.vectorToWorldFrame(o.axisB, o.axisB), i.angle = this.angle, o.maxAngle = this.twistAngle
            }
        }, {
            "../equations/ConeEquation": 18,
            "../equations/ContactEquation": 19,
            "../equations/RotationalEquation": 22,
            "../math/Vec3": 30,
            "./Constraint": 13,
            "./PointToPointConstraint": 17
        }],
        13: [function(t, e, i) {
            function o(t, e, i) {
                i = n.defaults(i, {
                    collideConnected: !0,
                    wakeUpBodies: !0
                }), this.equations = [], this.bodyA = t, this.bodyB = e, this.id = o.idCounter++, this.collideConnected = i.collideConnected, i.wakeUpBodies && (t && t.wakeUp(), e && e.wakeUp())
            }
            e.exports = o;
            var n = t("../utils/Utils");
            o.prototype.update = function() {
                throw new Error("method update() not implmemented in this Constraint subclass!")
            }, o.prototype.enable = function() {
                for (var t = this.equations, e = 0; e < t.length; e++) t[e].enabled = !0
            }, o.prototype.disable = function() {
                for (var t = this.equations, e = 0; e < t.length; e++) t[e].enabled = !1
            }, o.idCounter = 0
        }, {
            "../utils/Utils": 53
        }],
        14: [function(t, e, i) {
            function o(t, e, i, o) {
                n.call(this, t, e), "undefined" == typeof i && (i = t.position.distanceTo(e.position)), "undefined" == typeof o && (o = 1e6), this.distance = i;
                var s = this.distanceEquation = new r(t, e);
                this.equations.push(s), s.minForce = -o, s.maxForce = o
            }
            e.exports = o;
            var n = t("./Constraint"),
                r = t("../equations/ContactEquation");
            o.prototype = new n, o.prototype.update = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    i = this.distanceEquation,
                    o = .5 * this.distance,
                    n = i.ni;
                e.position.vsub(t.position, n), n.normalize(), n.mult(o, i.ri), n.mult(-o, i.rj)
            }
        }, {
            "../equations/ContactEquation": 19,
            "./Constraint": 13
        }],
        15: [function(t, e, i) {
            function o(t, e, i) {
                i = i || {};
                var o = "undefined" != typeof i.maxForce ? i.maxForce : 1e6,
                    l = i.pivotA ? i.pivotA.clone() : new a,
                    c = i.pivotB ? i.pivotB.clone() : new a;
                n.call(this, t, l, e, c, o);
                var h = this.axisA = i.axisA ? i.axisA.clone() : new a(1, 0, 0);
                h.normalize();
                var u = this.axisB = i.axisB ? i.axisB.clone() : new a(1, 0, 0);
                u.normalize();
                var d = this.rotationalEquation1 = new r(t, e, i),
                    p = this.rotationalEquation2 = new r(t, e, i),
                    f = this.motorEquation = new s(t, e, o);
                f.enabled = !1, this.equations.push(d, p, f)
            }
            e.exports = o;
            var n = (t("./Constraint"), t("./PointToPointConstraint")),
                r = t("../equations/RotationalEquation"),
                s = t("../equations/RotationalMotorEquation"),
                a = (t("../equations/ContactEquation"), t("../math/Vec3"));
            o.prototype = new n, o.constructor = o, o.prototype.enableMotor = function() {
                this.motorEquation.enabled = !0
            }, o.prototype.disableMotor = function() {
                this.motorEquation.enabled = !1
            }, o.prototype.setMotorSpeed = function(t) {
                this.motorEquation.targetVelocity = t
            }, o.prototype.setMotorMaxForce = function(t) {
                this.motorEquation.maxForce = t, this.motorEquation.minForce = -t
            };
            var l = new a,
                c = new a;
            o.prototype.update = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    i = this.motorEquation,
                    o = this.rotationalEquation1,
                    r = this.rotationalEquation2,
                    s = l,
                    a = c,
                    h = this.axisA,
                    u = this.axisB;
                n.prototype.update.call(this), t.quaternion.vmult(h, s), e.quaternion.vmult(u, a), s.tangents(o.axisA, r.axisA), o.axisB.copy(a), r.axisB.copy(a), this.motorEquation.enabled && (t.quaternion.vmult(this.axisA, i.axisA), e.quaternion.vmult(this.axisB, i.axisB))
            }
        }, {
            "../equations/ContactEquation": 19,
            "../equations/RotationalEquation": 22,
            "../equations/RotationalMotorEquation": 23,
            "../math/Vec3": 30,
            "./Constraint": 13,
            "./PointToPointConstraint": 17
        }],
        16: [function(t, e, i) {
            function o(t, e, i) {
                i = i || {};
                var o = "undefined" != typeof i.maxForce ? i.maxForce : 1e6,
                    a = new s,
                    l = new s,
                    c = new s;
                t.position.vadd(e.position, c), c.scale(.5, c), e.pointToLocalFrame(c, l), t.pointToLocalFrame(c, a), n.call(this, t, a, e, l, o);
                var h = this.rotationalEquation1 = new r(t, e, i),
                    u = this.rotationalEquation2 = new r(t, e, i),
                    d = this.rotationalEquation3 = new r(t, e, i);
                this.equations.push(h, u, d)
            }
            e.exports = o;
            var n = (t("./Constraint"), t("./PointToPointConstraint")),
                r = t("../equations/RotationalEquation"),
                s = (t("../equations/RotationalMotorEquation"), t("../equations/ContactEquation"), t("../math/Vec3"));
            o.prototype = new n, o.constructor = o;
            new s, new s;
            o.prototype.update = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    i = (this.motorEquation, this.rotationalEquation1),
                    o = this.rotationalEquation2,
                    r = this.rotationalEquation3;
                n.prototype.update.call(this), t.vectorToWorldFrame(s.UNIT_X, i.axisA), e.vectorToWorldFrame(s.UNIT_Y, i.axisB), t.vectorToWorldFrame(s.UNIT_Y, o.axisA), e.vectorToWorldFrame(s.UNIT_Z, o.axisB), t.vectorToWorldFrame(s.UNIT_Z, r.axisA), e.vectorToWorldFrame(s.UNIT_X, r.axisB)
            }
        }, {
            "../equations/ContactEquation": 19,
            "../equations/RotationalEquation": 22,
            "../equations/RotationalMotorEquation": 23,
            "../math/Vec3": 30,
            "./Constraint": 13,
            "./PointToPointConstraint": 17
        }],
        17: [function(t, e, i) {
            function o(t, e, i, o, a) {
                n.call(this, t, i), a = "undefined" != typeof a ? a : 1e6, this.pivotA = e ? e.clone() : new s, this.pivotB = o ? o.clone() : new s;
                var l = this.equationX = new r(t, i),
                    c = this.equationY = new r(t, i),
                    h = this.equationZ = new r(t, i);
                this.equations.push(l, c, h), l.minForce = c.minForce = h.minForce = -a, l.maxForce = c.maxForce = h.maxForce = a, l.ni.set(1, 0, 0), c.ni.set(0, 1, 0), h.ni.set(0, 0, 1)
            }
            e.exports = o;
            var n = t("./Constraint"),
                r = t("../equations/ContactEquation"),
                s = t("../math/Vec3");
            o.prototype = new n, o.prototype.update = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    i = this.equationX,
                    o = this.equationY,
                    n = this.equationZ;
                t.quaternion.vmult(this.pivotA, i.ri), e.quaternion.vmult(this.pivotB, i.rj), o.ri.copy(i.ri), o.rj.copy(i.rj), n.ri.copy(i.ri), n.rj.copy(i.rj)
            }
        }, {
            "../equations/ContactEquation": 19,
            "../math/Vec3": 30,
            "./Constraint": 13
        }],
        18: [function(t, e, i) {
            function o(t, e, i) {
                i = i || {};
                var o = "undefined" != typeof i.maxForce ? i.maxForce : 1e6;
                r.call(this, t, e, -o, o), this.axisA = i.axisA ? i.axisA.clone() : new n(1, 0, 0), this.axisB = i.axisB ? i.axisB.clone() : new n(0, 1, 0), this.angle = "undefined" != typeof i.angle ? i.angle : 0
            }
            e.exports = o;
            var n = t("../math/Vec3"),
                r = (t("../math/Mat3"), t("./Equation"));
            o.prototype = new r, o.prototype.constructor = o;
            var s = new n,
                a = new n;
            o.prototype.computeB = function(t) {
                var e = this.a,
                    i = this.b,
                    o = this.axisA,
                    n = this.axisB,
                    r = s,
                    l = a,
                    c = this.jacobianElementA,
                    h = this.jacobianElementB;
                o.cross(n, r), n.cross(o, l), c.rotational.copy(l), h.rotational.copy(r);
                var u = Math.cos(this.angle) - o.dot(n),
                    d = this.computeGW(),
                    p = this.computeGiMf(),
                    f = -u * e - d * i - t * p;
                return f
            }
        }, {
            "../math/Mat3": 27,
            "../math/Vec3": 30,
            "./Equation": 20
        }],
        19: [function(t, e, i) {
            function o(t, e, i) {
                i = "undefined" != typeof i ? i : 1e6, n.call(this, t, e, 0, i), this.restitution = 0, this.ri = new r, this.rj = new r, this.ni = new r
            }
            e.exports = o;
            var n = t("./Equation"),
                r = t("../math/Vec3");
            t("../math/Mat3");
            o.prototype = new n, o.prototype.constructor = o;
            var s = new r,
                a = new r,
                l = new r;
            o.prototype.computeB = function(t) {
                var e = this.a,
                    i = this.b,
                    o = this.bi,
                    n = this.bj,
                    r = this.ri,
                    c = this.rj,
                    h = s,
                    u = a,
                    d = o.velocity,
                    p = o.angularVelocity,
                    f = (o.force, o.torque, n.velocity),
                    m = n.angularVelocity,
                    v = (n.force, n.torque, l),
                    y = this.jacobianElementA,
                    g = this.jacobianElementB,
                    _ = this.ni;
                r.cross(_, h), c.cross(_, u), _.negate(y.spatial), h.negate(y.rotational), g.spatial.copy(_), g.rotational.copy(u), v.copy(n.position), v.vadd(c, v), v.vsub(o.position, v), v.vsub(r, v);
                var E = _.dot(v),
                    w = this.restitution + 1,
                    S = w * f.dot(_) - w * d.dot(_) + m.dot(u) - p.dot(h),
                    b = this.computeGiMf(),
                    x = -E * e - S * i - t * b;
                return x
            };
            var c = new r,
                h = new r,
                u = new r,
                d = new r,
                p = new r;
            o.prototype.getImpactVelocityAlongNormal = function() {
                var t = c,
                    e = h,
                    i = u,
                    o = d,
                    n = p;
                return this.bi.position.vadd(this.ri, i), this.bj.position.vadd(this.rj, o), this.bi.getVelocityAtWorldPoint(i, t), this.bj.getVelocityAtWorldPoint(o, e), t.vsub(e, n), this.ni.dot(n)
            }
        }, {
            "../math/Mat3": 27,
            "../math/Vec3": 30,
            "./Equation": 20
        }],
        20: [function(t, e, i) {
            function o(t, e, i, r) {
                this.id = o.id++, this.minForce = "undefined" == typeof i ? -1e6 : i, this.maxForce = "undefined" == typeof r ? 1e6 : r, this.bi = t, this.bj = e, this.a = 0, this.b = 0, this.eps = 0, this.jacobianElementA = new n, this.jacobianElementB = new n, this.enabled = !0, this.setSpookParams(1e7, 4, 1 / 60)
            }
            e.exports = o;
            var n = t("../math/JacobianElement"),
                r = t("../math/Vec3");
            o.prototype.constructor = o, o.id = 0, o.prototype.setSpookParams = function(t, e, i) {
                var o = e,
                    n = t,
                    r = i;
                this.a = 4 / (r * (1 + 4 * o)), this.b = 4 * o / (1 + 4 * o), this.eps = 4 / (r * r * n * (1 + 4 * o))
            }, o.prototype.computeB = function(t, e, i) {
                var o = this.computeGW(),
                    n = this.computeGq(),
                    r = this.computeGiMf();
                return -n * t - o * e - r * i
            }, o.prototype.computeGq = function() {
                var t = this.jacobianElementA,
                    e = this.jacobianElementB,
                    i = this.bi,
                    o = this.bj,
                    n = i.position,
                    r = o.position;
                return t.spatial.dot(n) + e.spatial.dot(r)
            };
            var s = new r;
            o.prototype.computeGW = function() {
                var t = this.jacobianElementA,
                    e = this.jacobianElementB,
                    i = this.bi,
                    o = this.bj,
                    n = i.velocity,
                    r = o.velocity,
                    a = i.angularVelocity || s,
                    l = o.angularVelocity || s;
                return t.multiplyVectors(n, a) + e.multiplyVectors(r, l)
            }, o.prototype.computeGWlambda = function() {
                var t = this.jacobianElementA,
                    e = this.jacobianElementB,
                    i = this.bi,
                    o = this.bj,
                    n = i.vlambda,
                    r = o.vlambda,
                    a = i.wlambda || s,
                    l = o.wlambda || s;
                return t.multiplyVectors(n, a) + e.multiplyVectors(r, l)
            };
            var a = new r,
                l = new r,
                c = new r,
                h = new r;
            o.prototype.computeGiMf = function() {
                var t = this.jacobianElementA,
                    e = this.jacobianElementB,
                    i = this.bi,
                    o = this.bj,
                    n = i.force,
                    r = i.torque,
                    s = o.force,
                    u = o.torque,
                    d = i.invMassSolve,
                    p = o.invMassSolve;
                return i.invInertiaWorldSolve ? i.invInertiaWorldSolve.vmult(r, c) : c.set(0, 0, 0), o.invInertiaWorldSolve ? o.invInertiaWorldSolve.vmult(u, h) : h.set(0, 0, 0), n.mult(d, a), s.mult(p, l), t.multiplyVectors(a, c) + e.multiplyVectors(l, h)
            };
            var u = new r;
            o.prototype.computeGiMGt = function() {
                var t = this.jacobianElementA,
                    e = this.jacobianElementB,
                    i = this.bi,
                    o = this.bj,
                    n = i.invMassSolve,
                    r = o.invMassSolve,
                    s = i.invInertiaWorldSolve,
                    a = o.invInertiaWorldSolve,
                    l = n + r;
                return s && (s.vmult(t.rotational, u), l += u.dot(t.rotational)), a && (a.vmult(e.rotational, u), l += u.dot(e.rotational)), l
            };
            var d = new r;
            new r, new r, new r, new r, new r;
            o.prototype.addToWlambda = function(t) {
                var e = this.jacobianElementA,
                    i = this.jacobianElementB,
                    o = this.bi,
                    n = this.bj,
                    r = d;
                e.spatial.mult(o.invMassSolve * t, r), o.vlambda.vadd(r, o.vlambda), i.spatial.mult(n.invMassSolve * t, r), n.vlambda.vadd(r, n.vlambda), o.invInertiaWorldSolve && (o.invInertiaWorldSolve.vmult(e.rotational, r), r.mult(t, r), o.wlambda.vadd(r, o.wlambda)), n.invInertiaWorldSolve && (n.invInertiaWorldSolve.vmult(i.rotational, r), r.mult(t, r), n.wlambda.vadd(r, n.wlambda))
            }, o.prototype.computeC = function() {
                return this.computeGiMGt() + this.eps
            }
        }, {
            "../math/JacobianElement": 26,
            "../math/Vec3": 30
        }],
        21: [function(t, e, i) {
            function o(t, e, i) {
                n.call(this, t, e, -i, i), this.ri = new r, this.rj = new r, this.t = new r
            }
            e.exports = o;
            var n = t("./Equation"),
                r = t("../math/Vec3");
            t("../math/Mat3");
            o.prototype = new n, o.prototype.constructor = o;
            var s = new r,
                a = new r;
            o.prototype.computeB = function(t) {
                var e = (this.a, this.b),
                    i = (this.bi, this.bj, this.ri),
                    o = this.rj,
                    n = s,
                    r = a,
                    l = this.t;
                i.cross(l, n), o.cross(l, r);
                var c = this.jacobianElementA,
                    h = this.jacobianElementB;
                l.negate(c.spatial), n.negate(c.rotational), h.spatial.copy(l), h.rotational.copy(r);
                var u = this.computeGW(),
                    d = this.computeGiMf(),
                    p = -u * e - t * d;
                return p
            }
        }, {
            "../math/Mat3": 27,
            "../math/Vec3": 30,
            "./Equation": 20
        }],
        22: [function(t, e, i) {
            function o(t, e, i) {
                i = i || {};
                var o = "undefined" != typeof i.maxForce ? i.maxForce : 1e6;
                r.call(this, t, e, -o, o), this.axisA = i.axisA ? i.axisA.clone() : new n(1, 0, 0), this.axisB = i.axisB ? i.axisB.clone() : new n(0, 1, 0), this.maxAngle = Math.PI / 2
            }
            e.exports = o;
            var n = t("../math/Vec3"),
                r = (t("../math/Mat3"), t("./Equation"));
            o.prototype = new r, o.prototype.constructor = o;
            var s = new n,
                a = new n;
            o.prototype.computeB = function(t) {
                var e = this.a,
                    i = this.b,
                    o = this.axisA,
                    n = this.axisB,
                    r = s,
                    l = a,
                    c = this.jacobianElementA,
                    h = this.jacobianElementB;
                o.cross(n, r), n.cross(o, l), c.rotational.copy(l), h.rotational.copy(r);
                var u = Math.cos(this.maxAngle) - o.dot(n),
                    d = this.computeGW(),
                    p = this.computeGiMf(),
                    f = -u * e - d * i - t * p;
                return f
            }
        }, {
            "../math/Mat3": 27,
            "../math/Vec3": 30,
            "./Equation": 20
        }],
        23: [function(t, e, i) {
            function o(t, e, i) {
                i = "undefined" != typeof i ? i : 1e6, r.call(this, t, e, -i, i), this.axisA = new n, this.axisB = new n, this.targetVelocity = 0
            }
            e.exports = o;
            var n = t("../math/Vec3"),
                r = (t("../math/Mat3"), t("./Equation"));
            o.prototype = new r, o.prototype.constructor = o, o.prototype.computeB = function(t) {
                var e = (this.a, this.b),
                    i = (this.bi, this.bj, this.axisA),
                    o = this.axisB,
                    n = this.jacobianElementA,
                    r = this.jacobianElementB;
                n.rotational.copy(i), o.negate(r.rotational);
                var s = this.computeGW() - this.targetVelocity,
                    a = this.computeGiMf(),
                    l = -s * e - t * a;
                return l
            }
        }, {
            "../math/Mat3": 27,
            "../math/Vec3": 30,
            "./Equation": 20
        }],
        24: [function(t, e, i) {
            function o(t, e, i) {
                i = n.defaults(i, {
                    friction: .3,
                    restitution: .3,
                    contactEquationStiffness: 1e7,
                    contactEquationRelaxation: 3,
                    frictionEquationStiffness: 1e7,
                    frictionEquationRelaxation: 3
                }), this.id = o.idCounter++, this.materials = [t, e], this.friction = i.friction, this.restitution = i.restitution, this.contactEquationStiffness = i.contactEquationStiffness, this.contactEquationRelaxation = i.contactEquationRelaxation, this.frictionEquationStiffness = i.frictionEquationStiffness, this.frictionEquationRelaxation = i.frictionEquationRelaxation
            }
            var n = t("../utils/Utils");
            e.exports = o, o.idCounter = 0
        }, {
            "../utils/Utils": 53
        }],
        25: [function(t, e, i) {
            function o(t) {
                var e = "";
                t = t || {}, "string" == typeof t ? (e = t, t = {}) : "object" == typeof t && (e = ""), this.name = e, this.id = o.idCounter++, this.friction = "undefined" != typeof t.friction ? t.friction : -1, this.restitution = "undefined" != typeof t.restitution ? t.restitution : -1
            }
            e.exports = o, o.idCounter = 0
        }, {}],
        26: [function(t, e, i) {
            function o() {
                this.spatial = new n, this.rotational = new n
            }
            e.exports = o;
            var n = t("./Vec3");
            o.prototype.multiplyElement = function(t) {
                return t.spatial.dot(this.spatial) + t.rotational.dot(this.rotational)
            }, o.prototype.multiplyVectors = function(t, e) {
                return t.dot(this.spatial) + e.dot(this.rotational)
            }
        }, {
            "./Vec3": 30
        }],
        27: [function(t, e, i) {
            function o(t) {
                t ? this.elements = t : this.elements = [0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            e.exports = o;
            var n = t("./Vec3");
            o.prototype.identity = function() {
                var t = this.elements;
                t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1
            }, o.prototype.setZero = function() {
                var t = this.elements;
                t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 0
            }, o.prototype.setTrace = function(t) {
                var e = this.elements;
                e[0] = t.x, e[4] = t.y, e[8] = t.z
            }, o.prototype.getTrace = function(t) {
                var t = t || new n,
                    e = this.elements;
                t.x = e[0], t.y = e[4], t.z = e[8]
            }, o.prototype.vmult = function(t, e) {
                e = e || new n;
                var i = this.elements,
                    o = t.x,
                    r = t.y,
                    s = t.z;
                return e.x = i[0] * o + i[1] * r + i[2] * s, e.y = i[3] * o + i[4] * r + i[5] * s, e.z = i[6] * o + i[7] * r + i[8] * s, e
            }, o.prototype.smult = function(t) {
                for (var e = 0; e < this.elements.length; e++) this.elements[e] *= t
            }, o.prototype.mmult = function(t, e) {
                for (var i = e || new o, n = 0; 3 > n; n++)
                    for (var r = 0; 3 > r; r++) {
                        for (var s = 0, a = 0; 3 > a; a++) s += t.elements[n + 3 * a] * this.elements[a + 3 * r];
                        i.elements[n + 3 * r] = s
                    }
                return i
            }, o.prototype.scale = function(t, e) {
                e = e || new o;
                for (var i = this.elements, n = e.elements, r = 0; 3 !== r; r++) n[3 * r + 0] = t.x * i[3 * r + 0], n[3 * r + 1] = t.y * i[3 * r + 1], n[3 * r + 2] = t.z * i[3 * r + 2];
                return e
            }, o.prototype.solve = function(t, e) {
                e = e || new n;
                for (var i = 3, o = 4, r = [], s = 0; i * o > s; s++) r.push(0);
                var s, a;
                for (s = 0; 3 > s; s++)
                    for (a = 0; 3 > a; a++) r[s + o * a] = this.elements[s + 3 * a];
                r[3] = t.x, r[7] = t.y, r[11] = t.z;
                var l, c, h = 3,
                    u = h,
                    d = 4;
                do {
                    if (s = u - h, 0 === r[s + o * s])
                        for (a = s + 1; u > a; a++)
                            if (0 !== r[s + o * a]) {
                                l = d;
                                do c = d - l, r[c + o * s] += r[c + o * a]; while (--l);
                                break
                            }
                    if (0 !== r[s + o * s])
                        for (a = s + 1; u > a; a++) {
                            var p = r[s + o * a] / r[s + o * s];
                            l = d;
                            do c = d - l, r[c + o * a] = s >= c ? 0 : r[c + o * a] - r[c + o * s] * p; while (--l)
                        }
                } while (--h);
                if (e.z = r[2 * o + 3] / r[2 * o + 2], e.y = (r[1 * o + 3] - r[1 * o + 2] * e.z) / r[1 * o + 1], e.x = (r[0 * o + 3] - r[0 * o + 2] * e.z - r[0 * o + 1] * e.y) / r[0 * o + 0], isNaN(e.x) || isNaN(e.y) || isNaN(e.z) || e.x === 1 / 0 || e.y === 1 / 0 || e.z === 1 / 0) throw "Could not solve equation! Got x=[" + e.toString() + "], b=[" + t.toString() + "], A=[" + this.toString() + "]";
                return e
            }, o.prototype.e = function(t, e, i) {
                return void 0 === i ? this.elements[e + 3 * t] : void(this.elements[e + 3 * t] = i)
            }, o.prototype.copy = function(t) {
                for (var e = 0; e < t.elements.length; e++) this.elements[e] = t.elements[e];
                return this
            }, o.prototype.toString = function() {
                for (var t = "", e = ",", i = 0; 9 > i; i++) t += this.elements[i] + e;
                return t
            }, o.prototype.reverse = function(t) {
                t = t || new o;
                for (var e = 3, i = 6, n = [], r = 0; e * i > r; r++) n.push(0);
                var r, s;
                for (r = 0; 3 > r; r++)
                    for (s = 0; 3 > s; s++) n[r + i * s] = this.elements[r + 3 * s];
                n[3] = 1, n[9] = 0, n[15] = 0, n[4] = 0, n[10] = 1, n[16] = 0, n[5] = 0, n[11] = 0, n[17] = 1;
                var a, l, c = 3,
                    h = c,
                    u = i;
                do {
                    if (r = h - c, 0 === n[r + i * r])
                        for (s = r + 1; h > s; s++)
                            if (0 !== n[r + i * s]) {
                                a = u;
                                do l = u - a, n[l + i * r] += n[l + i * s]; while (--a);
                                break
                            }
                    if (0 !== n[r + i * r])
                        for (s = r + 1; h > s; s++) {
                            var d = n[r + i * s] / n[r + i * r];
                            a = u;
                            do l = u - a, n[l + i * s] = r >= l ? 0 : n[l + i * s] - n[l + i * r] * d; while (--a)
                        }
                } while (--c);
                r = 2;
                do {
                    s = r - 1;
                    do {
                        var d = n[r + i * s] / n[r + i * r];
                        a = i;
                        do l = i - a, n[l + i * s] = n[l + i * s] - n[l + i * r] * d; while (--a)
                    } while (s--)
                } while (--r);
                r = 2;
                do {
                    var d = 1 / n[r + i * r];
                    a = i;
                    do l = i - a, n[l + i * r] = n[l + i * r] * d; while (--a)
                } while (r--);
                r = 2;
                do {
                    s = 2;
                    do {
                        if (l = n[e + s + i * r], isNaN(l) || l === 1 / 0) throw "Could not reverse! A=[" + this.toString() + "]";
                        t.e(r, s, l)
                    } while (s--)
                } while (r--);
                return t
            }, o.prototype.setRotationFromQuaternion = function(t) {
                var e = t.x,
                    i = t.y,
                    o = t.z,
                    n = t.w,
                    r = e + e,
                    s = i + i,
                    a = o + o,
                    l = e * r,
                    c = e * s,
                    h = e * a,
                    u = i * s,
                    d = i * a,
                    p = o * a,
                    f = n * r,
                    m = n * s,
                    v = n * a,
                    y = this.elements;
                return y[0] = 1 - (u + p), y[1] = c - v, y[2] = h + m, y[3] = c + v, y[4] = 1 - (l + p), y[5] = d - f, y[6] = h - m, y[7] = d + f, y[8] = 1 - (l + u), this
            }, o.prototype.transpose = function(t) {
                t = t || new o;
                for (var e = t.elements, i = this.elements, n = 0; 3 !== n; n++)
                    for (var r = 0; 3 !== r; r++) e[3 * n + r] = i[3 * r + n];
                return t
            }
        }, {
            "./Vec3": 30
        }],
        28: [function(t, e, i) {
            function o(t, e, i, o) {
                this.x = void 0 !== t ? t : 0, this.y = void 0 !== e ? e : 0, this.z = void 0 !== i ? i : 0, this.w = void 0 !== o ? o : 1
            }
            e.exports = o;
            var n = t("./Vec3");
            o.prototype.set = function(t, e, i, o) {
                this.x = t, this.y = e, this.z = i, this.w = o
            }, o.prototype.toString = function() {
                return this.x + "," + this.y + "," + this.z + "," + this.w
            }, o.prototype.toArray = function() {
                return [this.x, this.y, this.z, this.w]
            }, o.prototype.setFromAxisAngle = function(t, e) {
                var i = Math.sin(.5 * e);
                this.x = t.x * i, this.y = t.y * i, this.z = t.z * i, this.w = Math.cos(.5 * e)
            }, o.prototype.toAxisAngle = function(t) {
                t = t || new n, this.normalize();
                var e = 2 * Math.acos(this.w),
                    i = Math.sqrt(1 - this.w * this.w);
                return .001 > i ? (t.x = this.x, t.y = this.y, t.z = this.z) : (t.x = this.x / i, t.y = this.y / i, t.z = this.z / i), [t, e]
            };
            var r = new n,
                s = new n;
            o.prototype.setFromVectors = function(t, e) {
                if (t.isAntiparallelTo(e)) {
                    var i = r,
                        o = s;
                    t.tangents(i, o), this.setFromAxisAngle(i, Math.PI)
                } else {
                    var n = t.cross(e);
                    this.x = n.x, this.y = n.y, this.z = n.z, this.w = Math.sqrt(Math.pow(t.norm(), 2) * Math.pow(e.norm(), 2)) + t.dot(e), this.normalize()
                }
            };
            var a = new n,
                l = new n,
                c = new n;
            o.prototype.mult = function(t, e) {
                e = e || new o;
                var i = this.w,
                    n = a,
                    r = l,
                    s = c;
                return n.set(this.x, this.y, this.z), r.set(t.x, t.y, t.z), e.w = i * t.w - n.dot(r), n.cross(r, s), e.x = i * r.x + t.w * n.x + s.x, e.y = i * r.y + t.w * n.y + s.y, e.z = i * r.z + t.w * n.z + s.z, e
            }, o.prototype.inverse = function(t) {
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = this.w;
                t = t || new o, this.conjugate(t);
                var s = 1 / (e * e + i * i + n * n + r * r);
                return t.x *= s, t.y *= s, t.z *= s, t.w *= s, t
            }, o.prototype.conjugate = function(t) {
                return t = t || new o, t.x = -this.x, t.y = -this.y, t.z = -this.z, t.w = this.w, t
            }, o.prototype.normalize = function() {
                var t = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
                0 === t ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0) : (t = 1 / t, this.x *= t, this.y *= t, this.z *= t, this.w *= t)
            }, o.prototype.normalizeFast = function() {
                var t = (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2;
                0 === t ? (this.x = 0, this.y = 0, this.z = 0, this.w = 0) : (this.x *= t, this.y *= t, this.z *= t, this.w *= t)
            }, o.prototype.vmult = function(t, e) {
                e = e || new n;
                var i = t.x,
                    o = t.y,
                    r = t.z,
                    s = this.x,
                    a = this.y,
                    l = this.z,
                    c = this.w,
                    h = c * i + a * r - l * o,
                    u = c * o + l * i - s * r,
                    d = c * r + s * o - a * i,
                    p = -s * i - a * o - l * r;
                return e.x = h * c + p * -s + u * -l - d * -a, e.y = u * c + p * -a + d * -s - h * -l, e.z = d * c + p * -l + h * -a - u * -s, e
            }, o.prototype.copy = function(t) {
                return this.x = t.x, this.y = t.y, this.z = t.z, this.w = t.w, this
            }, o.prototype.toEuler = function(t, e) {
                e = e || "YZX";
                var i, o, n, r = this.x,
                    s = this.y,
                    a = this.z,
                    l = this.w;
                switch (e) {
                    case "YZX":
                        var c = r * s + a * l;
                        if (c > .499 && (i = 2 * Math.atan2(r, l), o = Math.PI / 2, n = 0), -.499 > c && (i = -2 * Math.atan2(r, l), o = -Math.PI / 2, n = 0), isNaN(i)) {
                            var h = r * r,
                                u = s * s,
                                d = a * a;
                            i = Math.atan2(2 * s * l - 2 * r * a, 1 - 2 * u - 2 * d), o = Math.asin(2 * c), n = Math.atan2(2 * r * l - 2 * s * a, 1 - 2 * h - 2 * d)
                        }
                        break;
                    default:
                        throw new Error("Euler order " + e + " not supported yet.")
                }
                t.y = i, t.z = o, t.x = n
            }, o.prototype.setFromEuler = function(t, e, i, o) {
                o = o || "XYZ";
                var n = Math.cos(t / 2),
                    r = Math.cos(e / 2),
                    s = Math.cos(i / 2),
                    a = Math.sin(t / 2),
                    l = Math.sin(e / 2),
                    c = Math.sin(i / 2);
                return "XYZ" === o ? (this.x = a * r * s + n * l * c, this.y = n * l * s - a * r * c, this.z = n * r * c + a * l * s, this.w = n * r * s - a * l * c) : "YXZ" === o ? (this.x = a * r * s + n * l * c, this.y = n * l * s - a * r * c, this.z = n * r * c - a * l * s, this.w = n * r * s + a * l * c) : "ZXY" === o ? (this.x = a * r * s - n * l * c, this.y = n * l * s + a * r * c, this.z = n * r * c + a * l * s, this.w = n * r * s - a * l * c) : "ZYX" === o ? (this.x = a * r * s - n * l * c, this.y = n * l * s + a * r * c, this.z = n * r * c - a * l * s, this.w = n * r * s + a * l * c) : "YZX" === o ? (this.x = a * r * s + n * l * c, this.y = n * l * s + a * r * c, this.z = n * r * c - a * l * s, this.w = n * r * s - a * l * c) : "XZY" === o && (this.x = a * r * s - n * l * c, this.y = n * l * s - a * r * c, this.z = n * r * c + a * l * s, this.w = n * r * s + a * l * c), this
            }, o.prototype.clone = function() {
                return new o(this.x, this.y, this.z, this.w)
            }
        }, {
            "./Vec3": 30
        }],
        29: [function(t, e, i) {
            function o(t) {
                t = t || {}, this.position = new n, t.position && this.position.copy(t.position), this.quaternion = new r, t.quaternion && this.quaternion.copy(t.quaternion)
            }
            var n = t("./Vec3"),
                r = t("./Quaternion");
            e.exports = o;
            var s = new r;
            o.pointToLocalFrame = function(t, e, i, o) {
                var o = o || new n;
                return i.vsub(t, o), e.conjugate(s), s.vmult(o, o), o
            }, o.prototype.pointToLocal = function(t, e) {
                return o.pointToLocalFrame(this.position, this.quaternion, t, e)
            }, o.pointToWorldFrame = function(t, e, i, o) {
                var o = o || new n;
                return e.vmult(i, o), o.vadd(t, o), o
            }, o.prototype.pointToWorld = function(t, e) {
                return o.pointToWorldFrame(this.position, this.quaternion, t, e)
            }, o.prototype.vectorToWorldFrame = function(t, e) {
                var e = e || new n;
                return this.quaternion.vmult(t, e), e
            }, o.vectorToWorldFrame = function(t, e, i) {
                return t.vmult(e, i), i
            }, o.vectorToLocalFrame = function(t, e, i, o) {
                var o = o || new n;
                return e.w *= -1, e.vmult(i, o), e.w *= -1, o
            }
        }, {
            "./Quaternion": 28,
            "./Vec3": 30
        }],
        30: [function(t, e, i) {
            function o(t, e, i) {
                this.x = t || 0, this.y = e || 0, this.z = i || 0
            }
            e.exports = o;
            var n = t("./Mat3");
            o.ZERO = new o(0, 0, 0), o.UNIT_X = new o(1, 0, 0), o.UNIT_Y = new o(0, 1, 0), o.UNIT_Z = new o(0, 0, 1), o.prototype.cross = function(t, e) {
                var i = t.x,
                    n = t.y,
                    r = t.z,
                    s = this.x,
                    a = this.y,
                    l = this.z;
                return e = e || new o, e.x = a * r - l * n, e.y = l * i - s * r, e.z = s * n - a * i, e
            }, o.prototype.set = function(t, e, i) {
                return this.x = t, this.y = e, this.z = i, this
            }, o.prototype.setZero = function() {
                this.x = this.y = this.z = 0
            }, o.prototype.vadd = function(t, e) {
                return e ? (e.x = t.x + this.x, e.y = t.y + this.y, e.z = t.z + this.z, void 0) : new o(this.x + t.x, this.y + t.y, this.z + t.z)
            }, o.prototype.vsub = function(t, e) {
                return e ? (e.x = this.x - t.x, e.y = this.y - t.y, e.z = this.z - t.z, void 0) : new o(this.x - t.x, this.y - t.y, this.z - t.z)
            }, o.prototype.crossmat = function() {
                return new n([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0])
            }, o.prototype.normalize = function() {
                var t = this.x,
                    e = this.y,
                    i = this.z,
                    o = Math.sqrt(t * t + e * e + i * i);
                if (o > 0) {
                    var n = 1 / o;
                    this.x *= n, this.y *= n, this.z *= n
                } else this.x = 0, this.y = 0, this.z = 0;
                return o
            }, o.prototype.unit = function(t) {
                t = t || new o;
                var e = this.x,
                    i = this.y,
                    n = this.z,
                    r = Math.sqrt(e * e + i * i + n * n);
                return r > 0 ? (r = 1 / r, t.x = e * r, t.y = i * r, t.z = n * r) : (t.x = 1, t.y = 0, t.z = 0), t
            }, o.prototype.norm = function() {
                var t = this.x,
                    e = this.y,
                    i = this.z;
                return Math.sqrt(t * t + e * e + i * i)
            }, o.prototype.length = o.prototype.norm, o.prototype.norm2 = function() {
                return this.dot(this)
            }, o.prototype.lengthSquared = o.prototype.norm2, o.prototype.distanceTo = function(t) {
                var e = this.x,
                    i = this.y,
                    o = this.z,
                    n = t.x,
                    r = t.y,
                    s = t.z;
                return Math.sqrt((n - e) * (n - e) + (r - i) * (r - i) + (s - o) * (s - o))
            }, o.prototype.distanceSquared = function(t) {
                var e = this.x,
                    i = this.y,
                    o = this.z,
                    n = t.x,
                    r = t.y,
                    s = t.z;
                return (n - e) * (n - e) + (r - i) * (r - i) + (s - o) * (s - o)
            }, o.prototype.mult = function(t, e) {
                e = e || new o;
                var i = this.x,
                    n = this.y,
                    r = this.z;
                return e.x = t * i, e.y = t * n, e.z = t * r, e
            }, o.prototype.scale = o.prototype.mult, o.prototype.dot = function(t) {
                return this.x * t.x + this.y * t.y + this.z * t.z
            }, o.prototype.isZero = function() {
                return 0 === this.x && 0 === this.y && 0 === this.z
            }, o.prototype.negate = function(t) {
                return t = t || new o, t.x = -this.x, t.y = -this.y, t.z = -this.z, t
            };
            var r = new o,
                s = new o;
            o.prototype.tangents = function(t, e) {
                var i = this.norm();
                if (i > 0) {
                    var o = r,
                        n = 1 / i;
                    o.set(this.x * n, this.y * n, this.z * n);
                    var a = s;
                    Math.abs(o.x) < .9 ? (a.set(1, 0, 0), o.cross(a, t)) : (a.set(0, 1, 0), o.cross(a, t)), o.cross(t, e)
                } else t.set(1, 0, 0), e.set(0, 1, 0)
            }, o.prototype.toString = function() {
                return this.x + "," + this.y + "," + this.z
            }, o.prototype.toArray = function() {
                return [this.x, this.y, this.z]
            }, o.prototype.copy = function(t) {
                return this.x = t.x, this.y = t.y, this.z = t.z, this
            }, o.prototype.lerp = function(t, e, i) {
                var o = this.x,
                    n = this.y,
                    r = this.z;
                i.x = o + (t.x - o) * e, i.y = n + (t.y - n) * e, i.z = r + (t.z - r) * e
            }, o.prototype.almostEquals = function(t, e) {
                return void 0 === e && (e = 1e-6), !(Math.abs(this.x - t.x) > e || Math.abs(this.y - t.y) > e || Math.abs(this.z - t.z) > e)
            }, o.prototype.almostZero = function(t) {
                return void 0 === t && (t = 1e-6), !(Math.abs(this.x) > t || Math.abs(this.y) > t || Math.abs(this.z) > t)
            };
            var a = new o;
            o.prototype.isAntiparallelTo = function(t, e) {
                return this.negate(a), a.almostEquals(t, e)
            }, o.prototype.clone = function() {
                return new o(this.x, this.y, this.z)
            }
        }, {
            "./Mat3": 27
        }],
        31: [function(t, e, i) {
            function o(t) {
                t = t || {}, n.apply(this), this.id = o.idCounter++, this.world = null, this.preStep = null, this.postStep = null, this.vlambda = new r, this.collisionFilterGroup = "number" == typeof t.collisionFilterGroup ? t.collisionFilterGroup : 1, this.collisionFilterMask = "number" == typeof t.collisionFilterMask ? t.collisionFilterMask : 1, this.collisionResponse = !0, this.position = new r, t.position && this.position.copy(t.position), this.previousPosition = new r, this.initPosition = new r, this.velocity = new r, t.velocity && this.velocity.copy(t.velocity), this.initVelocity = new r, this.force = new r;
                var e = "number" == typeof t.mass ? t.mass : 0;
                this.mass = e, this.invMass = e > 0 ? 1 / e : 0, this.material = t.material || null, this.linearDamping = "number" == typeof t.linearDamping ? t.linearDamping : .01, this.type = 0 >= e ? o.STATIC : o.DYNAMIC, typeof t.type == typeof o.STATIC && (this.type = t.type), this.allowSleep = "undefined" != typeof t.allowSleep ? t.allowSleep : !0, this.sleepState = 0, this.sleepSpeedLimit = "undefined" != typeof t.sleepSpeedLimit ? t.sleepSpeedLimit : .1, this.sleepTimeLimit = "undefined" != typeof t.sleepTimeLimit ? t.sleepTimeLimit : 1, this.timeLastSleepy = 0, this._wakeUpAfterNarrowphase = !1, this.torque = new r, this.quaternion = new a, t.quaternion && this.quaternion.copy(t.quaternion), this.initQuaternion = new a, this.angularVelocity = new r, t.angularVelocity && this.angularVelocity.copy(t.angularVelocity), this.initAngularVelocity = new r, this.interpolatedPosition = new r, this.interpolatedQuaternion = new a, this.shapes = [], this.shapeOffsets = [], this.shapeOrientations = [], this.inertia = new r, this.invInertia = new r, this.invInertiaWorld = new s, this.invMassSolve = 0, this.invInertiaSolve = new r, this.invInertiaWorldSolve = new s, this.fixedRotation = "undefined" != typeof t.fixedRotation ? t.fixedRotation : !1, this.angularDamping = "undefined" != typeof t.angularDamping ? t.angularDamping : .01, this.userData = "undefined" != typeof t.userData ? t.userData : null, this.aabb = new l, this.aabbNeedsUpdate = !0, this.wlambda = new r, t.shape && this.addShape(t.shape), this.updateMassProperties()
            }
            e.exports = o;
            var n = t("../utils/EventTarget"),
                r = (t("../shapes/Shape"), t("../math/Vec3")),
                s = t("../math/Mat3"),
                a = t("../math/Quaternion"),
                l = (t("../material/Material"), t("../collision/AABB")),
                c = t("../shapes/Box");
            o.prototype = new n, o.prototype.constructor = o, o.DYNAMIC = 1, o.STATIC = 2, o.KINEMATIC = 4, o.AWAKE = 0, o.SLEEPY = 1, o.SLEEPING = 2, o.idCounter = 0, o.prototype.wakeUp = function() {
                var t = this.sleepState;
                this.sleepState = 0, t === o.SLEEPING && this.dispatchEvent({
                    type: "wakeup"
                })
            }, o.prototype.sleep = function() {
                this.sleepState = o.SLEEPING, this.velocity.set(0, 0, 0), this.angularVelocity.set(0, 0, 0)
            }, o.sleepyEvent = {
                type: "sleepy"
            }, o.sleepEvent = {
                type: "sleep"
            }, o.prototype.sleepTick = function(t) {
                if (this.allowSleep) {
                    var e = this.sleepState,
                        i = this.velocity.norm2() + this.angularVelocity.norm2(),
                        n = Math.pow(this.sleepSpeedLimit, 2);
                    e === o.AWAKE && n > i ? (this.sleepState = o.SLEEPY, this.timeLastSleepy = t, this.dispatchEvent(o.sleepyEvent)) : e === o.SLEEPY && i > n ? this.wakeUp() : e === o.SLEEPY && t - this.timeLastSleepy > this.sleepTimeLimit && (this.sleep(), this.dispatchEvent(o.sleepEvent))
                }
            }, o.prototype.updateSolveMassProperties = function() {
                this.sleepState === o.SLEEPING || this.type === o.KINEMATIC ? (this.invMassSolve = 0, this.invInertiaSolve.setZero(), this.invInertiaWorldSolve.setZero()) : (this.invMassSolve = this.invMass, this.invInertiaSolve.copy(this.invInertia), this.invInertiaWorldSolve.copy(this.invInertiaWorld))
            }, o.prototype.pointToLocalFrame = function(t, e) {
                var e = e || new r;
                return t.vsub(this.position, e), this.quaternion.conjugate().vmult(e, e), e
            }, o.prototype.vectorToLocalFrame = function(t, e) {
                var e = e || new r;
                return this.quaternion.conjugate().vmult(t, e), e
            }, o.prototype.pointToWorldFrame = function(t, e) {
                var e = e || new r;
                return this.quaternion.vmult(t, e), e.vadd(this.position, e), e
            }, o.prototype.vectorToWorldFrame = function(t, e) {
                var e = e || new r;
                return this.quaternion.vmult(t, e), e
            };
            var h = new r,
                u = new a;
            o.prototype.addShape = function(t, e, i) {
                var o = new r,
                    n = new a;
                return e && o.copy(e), i && n.copy(i), this.shapes.push(t), this.shapeOffsets.push(o), this.shapeOrientations.push(n), this.updateMassProperties(), this.updateBoundingRadius(), this.aabbNeedsUpdate = !0, this
            }, o.prototype.updateBoundingRadius = function() {
                for (var t = this.shapes, e = this.shapeOffsets, i = t.length, o = 0, n = 0; n !== i; n++) {
                    var r = t[n];
                    r.updateBoundingSphereRadius();
                    var s = e[n].norm(),
                        a = r.boundingSphereRadius;
                    s + a > o && (o = s + a)
                }
                this.boundingRadius = o
            };
            var d = new l;
            o.prototype.computeAABB = function() {
                for (var t = this.shapes, e = this.shapeOffsets, i = this.shapeOrientations, o = t.length, n = h, r = u, s = this.quaternion, a = this.aabb, l = d, c = 0; c !== o; c++) {
                    var p = t[c];
                    i[c].mult(s, r), r.vmult(e[c], n), n.vadd(this.position, n), p.calculateWorldAABB(n, r, l.lowerBound, l.upperBound), 0 === c ? a.copy(l) : a.extend(l)
                }
                this.aabbNeedsUpdate = !1
            };
            var p = new s,
                f = new s;
            new s;
            o.prototype.updateInertiaWorld = function(t) {
                var e = this.invInertia;
                if (e.x !== e.y || e.y !== e.z || t) {
                    var i = p,
                        o = f;
                    i.setRotationFromQuaternion(this.quaternion), i.transpose(o), i.scale(e, i), i.mmult(o, this.invInertiaWorld)
                } else;
            };
            var m = new r,
                v = new r;
            o.prototype.applyForce = function(t, e) {
                if (this.type === o.DYNAMIC) {
                    var i = m;
                    e.vsub(this.position, i);
                    var n = v;
                    i.cross(t, n), this.force.vadd(t, this.force), this.torque.vadd(n, this.torque)
                }
            };
            var y = new r,
                g = new r;
            o.prototype.applyLocalForce = function(t, e) {
                if (this.type === o.DYNAMIC) {
                    var i = y,
                        n = g;
                    this.vectorToWorldFrame(t, i), this.pointToWorldFrame(e, n), this.applyForce(i, n)
                }
            };
            var _ = new r,
                E = new r,
                w = new r;
            o.prototype.applyImpulse = function(t, e) {
                if (this.type === o.DYNAMIC) {
                    var i = _;
                    e.vsub(this.position, i);
                    var n = E;
                    n.copy(t), n.mult(this.invMass, n), this.velocity.vadd(n, this.velocity);
                    var r = w;
                    i.cross(t, r), this.invInertiaWorld.vmult(r, r), this.angularVelocity.vadd(r, this.angularVelocity)
                }
            };
            var S = new r,
                b = new r;
            o.prototype.applyLocalImpulse = function(t, e) {
                if (this.type === o.DYNAMIC) {
                    var i = S,
                        n = b;
                    this.vectorToWorldFrame(t, i), this.pointToWorldFrame(e, n), this.applyImpulse(i, n)
                }
            };
            var x = new r;
            o.prototype.updateMassProperties = function() {
                var t = x;
                this.invMass = this.mass > 0 ? 1 / this.mass : 0;
                var e = this.inertia,
                    i = this.fixedRotation;
                this.computeAABB(), t.set((this.aabb.upperBound.x - this.aabb.lowerBound.x) / 2, (this.aabb.upperBound.y - this.aabb.lowerBound.y) / 2, (this.aabb.upperBound.z - this.aabb.lowerBound.z) / 2),
                    c.calculateInertia(t, this.mass, e), this.invInertia.set(e.x > 0 && !i ? 1 / e.x : 0, e.y > 0 && !i ? 1 / e.y : 0, e.z > 0 && !i ? 1 / e.z : 0), this.updateInertiaWorld(!0)
            }, o.prototype.getVelocityAtWorldPoint = function(t, e) {
                var i = new r;
                return t.vsub(this.position, i), this.angularVelocity.cross(i, e), this.velocity.vadd(e, e), e
            }
        }, {
            "../collision/AABB": 3,
            "../material/Material": 25,
            "../math/Mat3": 27,
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "../shapes/Box": 37,
            "../shapes/Shape": 43,
            "../utils/EventTarget": 49
        }],
        32: [function(t, e, i) {
            function o(t) {
                this.chassisBody = t.chassisBody, this.wheelInfos = [], this.sliding = !1, this.world = null, this.indexRightAxis = "undefined" != typeof t.indexRightAxis ? t.indexRightAxis : 1, this.indexForwardAxis = "undefined" != typeof t.indexForwardAxis ? t.indexForwardAxis : 0, this.indexUpAxis = "undefined" != typeof t.indexUpAxis ? t.indexUpAxis : 2
            }

            function n(t, e, i, o, n) {
                var s = 0,
                    a = i,
                    l = w,
                    c = S,
                    h = b;
                t.getVelocityAtWorldPoint(a, l), e.getVelocityAtWorldPoint(a, c), l.vsub(c, h);
                var u = o.dot(h),
                    d = r(t, i, o),
                    p = r(e, i, o),
                    f = 1,
                    m = f / (d + p);
                return s = -u * m, s > n && (s = n), -n > s && (s = -n), s
            }

            function r(t, e, i) {
                var o = x,
                    n = A,
                    r = T,
                    s = N;
                return e.vsub(t.position, o), o.cross(i, n), t.invInertiaWorld.vmult(n, s), s.cross(o, r), t.invMass + i.dot(r)
            }

            function s(t, e, i, o, n, r) {
                var s = n.norm2();
                if (s > 1.1) return 0;
                var a = R,
                    l = C,
                    c = P;
                t.getVelocityAtWorldPoint(e, a), i.getVelocityAtWorldPoint(o, l), a.vsub(l, c);
                var h = n.dot(c),
                    u = .2,
                    d = 1 / (t.invMass + i.invMass),
                    r = -u * h * d;
                return r
            }
            var a = (t("./Body"), t("../math/Vec3")),
                l = t("../math/Quaternion"),
                c = (t("../collision/RaycastResult"), t("../collision/Ray")),
                h = t("../objects/WheelInfo");
            e.exports = o;
            var u = (new a, new a, new a, new a),
                d = new a,
                p = new a;
            new c;
            o.prototype.addWheel = function(t) {
                t = t || {};
                var e = new h(t),
                    i = this.wheelInfos.length;
                return this.wheelInfos.push(e), i
            }, o.prototype.setSteeringValue = function(t, e) {
                var i = this.wheelInfos[e];
                i.steering = t
            };
            new a;
            o.prototype.applyEngineForce = function(t, e) {
                this.wheelInfos[e].engineForce = t
            }, o.prototype.setBrake = function(t, e) {
                this.wheelInfos[e].brake = t
            }, o.prototype.addToWorld = function(t) {
                this.constraints;
                t.add(this.chassisBody);
                var e = this;
                this.preStepCallback = function() {
                    e.updateVehicle(t.dt)
                }, t.addEventListener("preStep", this.preStepCallback), this.world = t
            }, o.prototype.getVehicleAxisWorld = function(t, e) {
                e.set(0 === t ? 1 : 0, 1 === t ? 1 : 0, 2 === t ? 1 : 0), this.chassisBody.vectorToWorldFrame(e, e)
            }, o.prototype.updateVehicle = function(t) {
                for (var e = this.wheelInfos, i = e.length, o = this.chassisBody, n = 0; i > n; n++) this.updateWheelTransform(n);
                this.currentVehicleSpeedKmHour = 3.6 * o.velocity.norm();
                var r = new a;
                this.getVehicleAxisWorld(this.indexForwardAxis, r), r.dot(o.velocity) < 0 && (this.currentVehicleSpeedKmHour *= -1);
                for (var n = 0; i > n; n++) this.castRay(e[n]);
                this.updateSuspension(t);
                for (var s = new a, l = new a, n = 0; i > n; n++) {
                    var c = e[n],
                        h = c.suspensionForce;
                    h > c.maxSuspensionForce && (h = c.maxSuspensionForce), c.raycastResult.hitNormalWorld.scale(h * t, s), c.raycastResult.hitPointWorld.vsub(o.position, l), o.applyImpulse(s, c.raycastResult.hitPointWorld)
                }
                this.updateFriction(t);
                var u = new a,
                    d = new a,
                    p = new a;
                for (n = 0; i > n; n++) {
                    var c = e[n];
                    o.getVelocityAtWorldPoint(c.chassisConnectionPointWorld, p);
                    var f = 1;
                    switch (this.indexUpAxis) {
                        case 1:
                            f = -1
                    }
                    if (c.isInContact) {
                        this.getVehicleAxisWorld(this.indexForwardAxis, d);
                        var m = d.dot(c.raycastResult.hitNormalWorld);
                        c.raycastResult.hitNormalWorld.scale(m, u), d.vsub(u, d);
                        var v = d.dot(p);
                        c.deltaRotation = f * v * t / c.radius
                    }!c.sliding && c.isInContact || 0 === c.engineForce || !c.useCustomSlidingRotationalSpeed || (c.deltaRotation = (c.engineForce > 0 ? 1 : -1) * c.customSlidingRotationalSpeed * t), Math.abs(c.brake) > Math.abs(c.engineForce) && (c.deltaRotation = 0), c.rotation += c.deltaRotation, c.deltaRotation *= .99
                }
            }, o.prototype.updateSuspension = function(t) {
                for (var e = this.chassisBody, i = e.mass, o = this.wheelInfos, n = o.length, r = 0; n > r; r++) {
                    var s = o[r];
                    if (s.isInContact) {
                        var a, l = s.suspensionRestLength,
                            c = s.suspensionLength,
                            h = l - c;
                        a = s.suspensionStiffness * h * s.clippedInvContactDotSuspension;
                        var u, d = s.suspensionRelativeVelocity;
                        u = 0 > d ? s.dampingCompression : s.dampingRelaxation, a -= u * d, s.suspensionForce = a * i, s.suspensionForce < 0 && (s.suspensionForce = 0)
                    } else s.suspensionForce = 0
                }
            }, o.prototype.removeFromWorld = function(t) {
                this.constraints;
                t.remove(this.chassisBody), t.removeEventListener("preStep", this.preStepCallback), this.world = null
            };
            var f = new a,
                m = new a;
            o.prototype.castRay = function(t) {
                var e = f,
                    i = m;
                this.updateWheelTransformWorld(t);
                var o = this.chassisBody,
                    n = -1,
                    r = t.suspensionRestLength + t.radius;
                t.directionWorld.scale(r, e);
                var s = t.chassisConnectionPointWorld;
                s.vadd(e, i);
                var l = t.raycastResult;
                l.reset();
                var c = o.collisionResponse;
                o.collisionResponse = !1, this.world.rayTest(s, i, l), o.collisionResponse = c;
                var h = l.body;
                if (t.raycastResult.groundObject = 0, h) {
                    n = l.distance, t.raycastResult.hitNormalWorld = l.hitNormalWorld, t.isInContact = !0;
                    var u = l.distance;
                    t.suspensionLength = u - t.radius;
                    var d = t.suspensionRestLength - t.maxSuspensionTravel,
                        p = t.suspensionRestLength + t.maxSuspensionTravel;
                    t.suspensionLength < d && (t.suspensionLength = d), t.suspensionLength > p && (t.suspensionLength = p, t.raycastResult.reset());
                    var v = t.raycastResult.hitNormalWorld.dot(t.directionWorld),
                        y = new a;
                    o.getVelocityAtWorldPoint(t.raycastResult.hitPointWorld, y);
                    var g = t.raycastResult.hitNormalWorld.dot(y);
                    if (v >= -.1) t.suspensionRelativeVelocity = 0, t.clippedInvContactDotSuspension = 10;
                    else {
                        var _ = -1 / v;
                        t.suspensionRelativeVelocity = g * _, t.clippedInvContactDotSuspension = _
                    }
                } else t.suspensionLength = t.suspensionRestLength + 0 * t.maxSuspensionTravel, t.suspensionRelativeVelocity = 0, t.directionWorld.scale(-1, t.raycastResult.hitNormalWorld), t.clippedInvContactDotSuspension = 1;
                return n
            }, o.prototype.updateWheelTransformWorld = function(t) {
                t.isInContact = !1;
                var e = this.chassisBody;
                e.pointToWorldFrame(t.chassisConnectionPointLocal, t.chassisConnectionPointWorld), e.vectorToWorldFrame(t.directionLocal, t.directionWorld), e.vectorToWorldFrame(t.axleLocal, t.axleWorld)
            }, o.prototype.updateWheelTransform = function(t) {
                var e = u,
                    i = d,
                    o = p,
                    n = this.wheelInfos[t];
                this.updateWheelTransformWorld(n), n.directionLocal.scale(-1, e), i.copy(n.axleLocal), e.cross(i, o), o.normalize(), i.normalize();
                var r = n.steering,
                    s = new l;
                s.setFromAxisAngle(e, r);
                var a = new l;
                a.setFromAxisAngle(i, n.rotation);
                var c = n.worldTransform.quaternion;
                this.chassisBody.quaternion.mult(s, c), c.mult(a, c), c.normalize();
                var h = n.worldTransform.position;
                h.copy(n.directionWorld), h.scale(n.suspensionLength, h), h.vadd(n.chassisConnectionPointWorld, h)
            };
            var v = [new a(1, 0, 0), new a(0, 1, 0), new a(0, 0, 1)];
            o.prototype.getWheelTransformWorld = function(t) {
                return this.wheelInfos[t].worldTransform
            };
            var y = new a,
                g = [],
                _ = [],
                E = 1;
            o.prototype.updateFriction = function(t) {
                for (var e = y, i = this.wheelInfos, o = i.length, r = this.chassisBody, l = _, c = g, h = 0, u = 0; o > u; u++) {
                    var d = i[u],
                        p = d.raycastResult.body;
                    p && h++, d.sideImpulse = 0, d.forwardImpulse = 0, l[u] || (l[u] = new a), c[u] || (c[u] = new a)
                }
                for (var u = 0; o > u; u++) {
                    var d = i[u],
                        p = d.raycastResult.body;
                    if (p) {
                        var f = c[u],
                            m = this.getWheelTransformWorld(u);
                        m.vectorToWorldFrame(v[this.indexRightAxis], f);
                        var w = d.raycastResult.hitNormalWorld,
                            S = f.dot(w);
                        w.scale(S, e), f.vsub(e, f), f.normalize(), w.cross(f, l[u]), l[u].normalize(), d.sideImpulse = s(r, d.raycastResult.hitPointWorld, p, d.raycastResult.hitPointWorld, f), d.sideImpulse *= E
                    }
                }
                var b = 1,
                    x = .5;
                this.sliding = !1;
                for (var u = 0; o > u; u++) {
                    var d = i[u],
                        p = d.raycastResult.body,
                        A = 0;
                    if (d.slipInfo = 1, p) {
                        var T = 0,
                            N = d.brake ? d.brake : T;
                        A = n(r, p, d.raycastResult.hitPointWorld, l[u], N), A += d.engineForce * t;
                        var R = N / A;
                        d.slipInfo *= R
                    }
                    if (d.forwardImpulse = 0, d.skidInfo = 1, p) {
                        d.skidInfo = 1;
                        var C = d.suspensionForce * t * d.frictionSlip,
                            P = C,
                            I = C * P;
                        d.forwardImpulse = A;
                        var O = d.forwardImpulse * x,
                            L = d.sideImpulse * b,
                            M = O * O + L * L;
                        if (d.sliding = !1, M > I) {
                            this.sliding = !0, d.sliding = !0;
                            var R = C / Math.sqrt(M);
                            d.skidInfo *= R
                        }
                    }
                }
                if (this.sliding)
                    for (var u = 0; o > u; u++) {
                        var d = i[u];
                        0 !== d.sideImpulse && d.skidInfo < 1 && (d.forwardImpulse *= d.skidInfo, d.sideImpulse *= d.skidInfo)
                    }
                for (var u = 0; o > u; u++) {
                    var d = i[u],
                        B = new a;
                    if (B.copy(d.raycastResult.hitPointWorld), 0 !== d.forwardImpulse) {
                        var F = new a;
                        l[u].scale(d.forwardImpulse, F), r.applyImpulse(F, B)
                    }
                    if (0 !== d.sideImpulse) {
                        var p = d.raycastResult.body,
                            H = new a;
                        H.copy(d.raycastResult.hitPointWorld);
                        var V = new a;
                        c[u].scale(d.sideImpulse, V), r.pointToLocalFrame(B, B), B["xyz" [this.indexUpAxis]] *= d.rollInfluence, r.pointToWorldFrame(B, B), r.applyImpulse(V, B), V.scale(-1, V), p.applyImpulse(V, H)
                    }
                }
            };
            var w = new a,
                S = new a,
                b = new a,
                x = new a,
                A = new a,
                T = new a,
                N = new a,
                R = new a,
                C = new a,
                P = new a
        }, {
            "../collision/Ray": 9,
            "../collision/RaycastResult": 10,
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "../objects/WheelInfo": 36,
            "./Body": 31
        }],
        33: [function(t, e, i) {
            function o(t) {
                if (this.wheelBodies = [], this.coordinateSystem = "undefined" == typeof t.coordinateSystem ? new a(1, 2, 3) : t.coordinateSystem.clone(), this.chassisBody = t.chassisBody, !this.chassisBody) {
                    var e = new s(new a(5, 2, .5));
                    this.chassisBody = new n(1, e)
                }
                this.constraints = [], this.wheelAxes = [], this.wheelForces = []
            }
            var n = t("./Body"),
                r = t("../shapes/Sphere"),
                s = t("../shapes/Box"),
                a = t("../math/Vec3"),
                l = t("../constraints/HingeConstraint");
            e.exports = o, o.prototype.addWheel = function(t) {
                t = t || {};
                var e = t.body;
                e || (e = new n(1, new r(1.2))), this.wheelBodies.push(e), this.wheelForces.push(0);
                var i = (new a, "undefined" != typeof t.position ? t.position.clone() : new a),
                    o = new a;
                this.chassisBody.pointToWorldFrame(i, o), e.position.set(o.x, o.y, o.z);
                var s = "undefined" != typeof t.axis ? t.axis.clone() : new a(0, 1, 0);
                this.wheelAxes.push(s);
                var c = new l(this.chassisBody, e, {
                    pivotA: i,
                    axisA: s,
                    pivotB: a.ZERO,
                    axisB: s,
                    collideConnected: !1
                });
                return this.constraints.push(c), this.wheelBodies.length - 1
            }, o.prototype.setSteeringValue = function(t, e) {
                var i = this.wheelAxes[e],
                    o = Math.cos(t),
                    n = Math.sin(t),
                    r = i.x,
                    s = i.y;
                this.constraints[e].axisA.set(o * r - n * s, n * r + o * s, 0)
            }, o.prototype.setMotorSpeed = function(t, e) {
                var i = this.constraints[e];
                i.enableMotor(), i.motorTargetVelocity = t
            }, o.prototype.disableMotor = function(t) {
                var e = this.constraints[t];
                e.disableMotor()
            };
            var c = new a;
            o.prototype.setWheelForce = function(t, e) {
                this.wheelForces[e] = t
            }, o.prototype.applyWheelForce = function(t, e) {
                var i = this.wheelAxes[e],
                    o = this.wheelBodies[e],
                    n = o.torque;
                i.scale(t, c), o.vectorToWorldFrame(c, c), n.vadd(c, n)
            }, o.prototype.addToWorld = function(t) {
                for (var e = this.constraints, i = this.wheelBodies.concat([this.chassisBody]), o = 0; o < i.length; o++) t.add(i[o]);
                for (var o = 0; o < e.length; o++) t.addConstraint(e[o]);
                t.addEventListener("preStep", this._update.bind(this))
            }, o.prototype._update = function() {
                for (var t = this.wheelForces, e = 0; e < t.length; e++) this.applyWheelForce(t[e], e)
            }, o.prototype.removeFromWorld = function(t) {
                for (var e = this.constraints, i = this.wheelBodies.concat([this.chassisBody]), o = 0; o < i.length; o++) t.remove(i[o]);
                for (var o = 0; o < e.length; o++) t.removeConstraint(e[o])
            };
            var h = new a;
            o.prototype.getWheelSpeed = function(t) {
                var e = this.wheelAxes[t],
                    i = this.wheelBodies[t],
                    o = i.angularVelocity;
                return this.chassisBody.vectorToWorldFrame(e, h), o.dot(h)
            }
        }, {
            "../constraints/HingeConstraint": 15,
            "../math/Vec3": 30,
            "../shapes/Box": 37,
            "../shapes/Sphere": 44,
            "./Body": 31
        }],
        34: [function(t, e, i) {
            function o() {
                this.particles = [], this.density = 1, this.smoothingRadius = 1, this.speedOfSound = 1, this.viscosity = .01, this.eps = 1e-6, this.pressures = [], this.densities = [], this.neighbors = []
            }
            e.exports = o;
            var n = (t("../shapes/Shape"), t("../math/Vec3"));
            t("../math/Quaternion"), t("../shapes/Particle"), t("../objects/Body"), t("../material/Material");
            o.prototype.add = function(t) {
                this.particles.push(t), this.neighbors.length < this.particles.length && this.neighbors.push([])
            }, o.prototype.remove = function(t) {
                var e = this.particles.indexOf(t); - 1 !== e && (this.particles.splice(e, 1), this.neighbors.length > this.particles.length && this.neighbors.pop())
            };
            var r = new n;
            o.prototype.getNeighbors = function(t, e) {
                for (var i = this.particles.length, o = t.id, n = this.smoothingRadius * this.smoothingRadius, s = r, a = 0; a !== i; a++) {
                    var l = this.particles[a];
                    l.position.vsub(t.position, s), o !== l.id && s.norm2() < n && e.push(l)
                }
            };
            var s = new n,
                a = new n,
                l = new n,
                c = new n,
                h = new n,
                u = new n;
            o.prototype.update = function() {
                for (var t = this.particles.length, e = s, i = this.speedOfSound, o = this.eps, n = 0; n !== t; n++) {
                    var r = this.particles[n],
                        d = this.neighbors[n];
                    d.length = 0, this.getNeighbors(r, d), d.push(this.particles[n]);
                    for (var p = d.length, f = 0, m = 0; m !== p; m++) {
                        r.position.vsub(d[m].position, e);
                        var v = e.norm(),
                            y = this.w(v);
                        f += d[m].mass * y
                    }
                    this.densities[n] = f, this.pressures[n] = i * i * (this.densities[n] - this.density)
                }
                for (var g = a, _ = l, E = c, w = h, S = u, n = 0; n !== t; n++) {
                    var b = this.particles[n];
                    g.set(0, 0, 0), _.set(0, 0, 0);
                    for (var x, A, d = this.neighbors[n], p = d.length, m = 0; m !== p; m++) {
                        var T = d[m];
                        b.position.vsub(T.position, w);
                        var N = w.norm();
                        x = -T.mass * (this.pressures[n] / (this.densities[n] * this.densities[n] + o) + this.pressures[m] / (this.densities[m] * this.densities[m] + o)), this.gradw(w, E), E.mult(x, E), g.vadd(E, g), T.velocity.vsub(b.velocity, S), S.mult(1 / (1e-4 + this.densities[n] * this.densities[m]) * this.viscosity * T.mass, S), A = this.nablaw(N), S.mult(A, S), _.vadd(S, _)
                    }
                    _.mult(b.mass, _), g.mult(b.mass, g), b.force.vadd(_, b.force), b.force.vadd(g, b.force)
                }
            }, o.prototype.w = function(t) {
                var e = this.smoothingRadius;
                return 315 / (64 * Math.PI * Math.pow(e, 9)) * Math.pow(e * e - t * t, 3)
            }, o.prototype.gradw = function(t, e) {
                var i = t.norm(),
                    o = this.smoothingRadius;
                t.mult(945 / (32 * Math.PI * Math.pow(o, 9)) * Math.pow(o * o - i * i, 2), e)
            }, o.prototype.nablaw = function(t) {
                var e = this.smoothingRadius,
                    i = 945 / (32 * Math.PI * Math.pow(e, 9)) * (e * e - t * t) * (7 * t * t - 3 * e * e);
                return i
            }
        }, {
            "../material/Material": 25,
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "../objects/Body": 31,
            "../shapes/Particle": 41,
            "../shapes/Shape": 43
        }],
        35: [function(t, e, i) {
            function o(t, e, i) {
                i = i || {}, this.restLength = "number" == typeof i.restLength ? i.restLength : 1, this.stiffness = i.stiffness || 100, this.damping = i.damping || 1, this.bodyA = t, this.bodyB = e, this.localAnchorA = new n, this.localAnchorB = new n, i.localAnchorA && this.localAnchorA.copy(i.localAnchorA), i.localAnchorB && this.localAnchorB.copy(i.localAnchorB), i.worldAnchorA && this.setWorldAnchorA(i.worldAnchorA), i.worldAnchorB && this.setWorldAnchorB(i.worldAnchorB)
            }
            var n = t("../math/Vec3");
            e.exports = o, o.prototype.setWorldAnchorA = function(t) {
                this.bodyA.pointToLocalFrame(t, this.localAnchorA)
            }, o.prototype.setWorldAnchorB = function(t) {
                this.bodyB.pointToLocalFrame(t, this.localAnchorB)
            }, o.prototype.getWorldAnchorA = function(t) {
                this.bodyA.pointToWorldFrame(this.localAnchorA, t)
            }, o.prototype.getWorldAnchorB = function(t) {
                this.bodyB.pointToWorldFrame(this.localAnchorB, t)
            };
            var r = new n,
                s = new n,
                a = new n,
                l = new n,
                c = new n,
                h = new n,
                u = new n,
                d = new n,
                p = new n,
                f = new n,
                m = new n;
            o.prototype.applyForce = function() {
                var t = this.stiffness,
                    e = this.damping,
                    i = this.restLength,
                    o = this.bodyA,
                    n = this.bodyB,
                    v = r,
                    y = s,
                    g = a,
                    _ = l,
                    E = m,
                    w = c,
                    S = h,
                    b = u,
                    x = d,
                    A = p,
                    T = f;
                this.getWorldAnchorA(w), this.getWorldAnchorB(S), w.vsub(o.position, b), S.vsub(n.position, x), S.vsub(w, v);
                var N = v.norm();
                y.copy(v), y.normalize(), n.velocity.vsub(o.velocity, g), n.angularVelocity.cross(x, E), g.vadd(E, g), o.angularVelocity.cross(b, E), g.vsub(E, g), y.mult(-t * (N - i) - e * g.dot(y), _), o.force.vsub(_, o.force), n.force.vadd(_, n.force), b.cross(_, A), x.cross(_, T), o.torque.vsub(A, o.torque), n.torque.vadd(T, n.torque)
            }
        }, {
            "../math/Vec3": 30
        }],
        36: [function(t, e, i) {
            function o(t) {
                t = a.defaults(t, {
                    chassisConnectionPointLocal: new n,
                    chassisConnectionPointWorld: new n,
                    directionLocal: new n,
                    directionWorld: new n,
                    axleLocal: new n,
                    axleWorld: new n,
                    suspensionRestLength: 1,
                    suspensionMaxLength: 2,
                    radius: 1,
                    suspensionStiffness: 100,
                    dampingCompression: 10,
                    dampingRelaxation: 10,
                    frictionSlip: 1e4,
                    steering: 0,
                    rotation: 0,
                    deltaRotation: 0,
                    rollInfluence: .01,
                    maxSuspensionForce: Number.MAX_VALUE,
                    isFrontWheel: !0,
                    clippedInvContactDotSuspension: 1,
                    suspensionRelativeVelocity: 0,
                    suspensionForce: 0,
                    skidInfo: 0,
                    suspensionLength: 0,
                    maxSuspensionTravel: 1,
                    useCustomSlidingRotationalSpeed: !1,
                    customSlidingRotationalSpeed: -.1
                }), this.maxSuspensionTravel = t.maxSuspensionTravel, this.customSlidingRotationalSpeed = t.customSlidingRotationalSpeed, this.useCustomSlidingRotationalSpeed = t.useCustomSlidingRotationalSpeed, this.sliding = !1, this.chassisConnectionPointLocal = t.chassisConnectionPointLocal.clone(), this.chassisConnectionPointWorld = t.chassisConnectionPointWorld.clone(), this.directionLocal = t.directionLocal.clone(), this.directionWorld = t.directionWorld.clone(), this.axleLocal = t.axleLocal.clone(), this.axleWorld = t.axleWorld.clone(), this.suspensionRestLength = t.suspensionRestLength, this.suspensionMaxLength = t.suspensionMaxLength, this.radius = t.radius, this.suspensionStiffness = t.suspensionStiffness, this.dampingCompression = t.dampingCompression, this.dampingRelaxation = t.dampingRelaxation, this.frictionSlip = t.frictionSlip, this.steering = 0, this.rotation = 0, this.deltaRotation = 0, this.rollInfluence = t.rollInfluence, this.maxSuspensionForce = t.maxSuspensionForce, this.engineForce = 0, this.brake = 0, this.isFrontWheel = t.isFrontWheel, this.clippedInvContactDotSuspension = 1, this.suspensionRelativeVelocity = 0, this.suspensionForce = 0, this.skidInfo = 0, this.suspensionLength = 0, this.sideImpulse = 0, this.forwardImpulse = 0, this.raycastResult = new s, this.worldTransform = new r, this.isInContact = !1
            }
            var n = t("../math/Vec3"),
                r = t("../math/Transform"),
                s = t("../collision/RaycastResult"),
                a = t("../utils/Utils");
            e.exports = o;
            var l = new n,
                c = new n,
                l = new n;
            o.prototype.updateWheel = function(t) {
                var e = this.raycastResult;
                if (this.isInContact) {
                    var i = e.hitNormalWorld.dot(e.directionWorld);
                    e.hitPointWorld.vsub(t.position, c), t.getVelocityAtWorldPoint(c, l);
                    var o = e.hitNormalWorld.dot(l);
                    if (i >= -.1) this.suspensionRelativeVelocity = 0, this.clippedInvContactDotSuspension = 10;
                    else {
                        var n = -1 / i;
                        this.suspensionRelativeVelocity = o * n, this.clippedInvContactDotSuspension = n
                    }
                } else e.suspensionLength = this.suspensionRestLength, this.suspensionRelativeVelocity = 0, e.directionWorld.scale(-1, e.hitNormalWorld), this.clippedInvContactDotSuspension = 1
            }
        }, {
            "../collision/RaycastResult": 10,
            "../math/Transform": 29,
            "../math/Vec3": 30,
            "../utils/Utils": 53
        }],
        37: [function(t, e, i) {
            function o(t) {
                n.call(this), this.type = n.types.BOX, this.halfExtents = t, this.convexPolyhedronRepresentation = null, this.updateConvexPolyhedronRepresentation(), this.updateBoundingSphereRadius()
            }
            e.exports = o;
            var n = t("./Shape"),
                r = t("../math/Vec3"),
                s = t("./ConvexPolyhedron");
            o.prototype = new n, o.prototype.constructor = o, o.prototype.updateConvexPolyhedronRepresentation = function() {
                var t = this.halfExtents.x,
                    e = this.halfExtents.y,
                    i = this.halfExtents.z,
                    o = r,
                    n = [new o(-t, -e, -i), new o(t, -e, -i), new o(t, e, -i), new o(-t, e, -i), new o(-t, -e, i), new o(t, -e, i), new o(t, e, i), new o(-t, e, i)],
                    a = [
                        [3, 2, 1, 0],
                        [4, 5, 6, 7],
                        [5, 4, 0, 1],
                        [2, 3, 7, 6],
                        [0, 4, 7, 3],
                        [1, 2, 6, 5]
                    ],
                    l = ([new o(0, 0, 1), new o(0, 1, 0), new o(1, 0, 0)], new s(n, a));
                this.convexPolyhedronRepresentation = l, l.material = this.material
            }, o.prototype.calculateLocalInertia = function(t, e) {
                return e = e || new r, o.calculateInertia(this.halfExtents, t, e), e
            }, o.calculateInertia = function(t, e, i) {
                var o = t;
                i.x = 1 / 12 * e * (2 * o.y * 2 * o.y + 2 * o.z * 2 * o.z), i.y = 1 / 12 * e * (2 * o.x * 2 * o.x + 2 * o.z * 2 * o.z), i.z = 1 / 12 * e * (2 * o.y * 2 * o.y + 2 * o.x * 2 * o.x)
            }, o.prototype.getSideNormals = function(t, e) {
                var i = t,
                    o = this.halfExtents;
                if (i[0].set(o.x, 0, 0), i[1].set(0, o.y, 0), i[2].set(0, 0, o.z), i[3].set(-o.x, 0, 0), i[4].set(0, -o.y, 0), i[5].set(0, 0, -o.z), void 0 !== e)
                    for (var n = 0; n !== i.length; n++) e.vmult(i[n], i[n]);
                return i
            }, o.prototype.volume = function() {
                return 8 * this.halfExtents.x * this.halfExtents.y * this.halfExtents.z
            }, o.prototype.updateBoundingSphereRadius = function() {
                this.boundingSphereRadius = this.halfExtents.norm()
            };
            var a = new r;
            new r;
            o.prototype.forEachWorldCorner = function(t, e, i) {
                for (var o = this.halfExtents, n = [
                        [o.x, o.y, o.z],
                        [-o.x, o.y, o.z],
                        [-o.x, -o.y, o.z],
                        [-o.x, -o.y, -o.z],
                        [o.x, -o.y, -o.z],
                        [o.x, o.y, -o.z],
                        [-o.x, o.y, -o.z],
                        [o.x, -o.y, o.z]
                    ], r = 0; r < n.length; r++) a.set(n[r][0], n[r][1], n[r][2]), e.vmult(a, a), t.vadd(a, a), i(a.x, a.y, a.z)
            };
            var l = [new r, new r, new r, new r, new r, new r, new r, new r];
            o.prototype.calculateWorldAABB = function(t, e, i, o) {
                var n = this.halfExtents;
                l[0].set(n.x, n.y, n.z), l[1].set(-n.x, n.y, n.z), l[2].set(-n.x, -n.y, n.z), l[3].set(-n.x, -n.y, -n.z), l[4].set(n.x, -n.y, -n.z), l[5].set(n.x, n.y, -n.z), l[6].set(-n.x, n.y, -n.z), l[7].set(n.x, -n.y, n.z);
                var r = l[0];
                e.vmult(r, r), t.vadd(r, r), o.copy(r), i.copy(r);
                for (var s = 1; 8 > s; s++) {
                    var r = l[s];
                    e.vmult(r, r), t.vadd(r, r);
                    var a = r.x,
                        c = r.y,
                        h = r.z;
                    a > o.x && (o.x = a), c > o.y && (o.y = c), h > o.z && (o.z = h), a < i.x && (i.x = a), c < i.y && (i.y = c), h < i.z && (i.z = h)
                }
            }
        }, {
            "../math/Vec3": 30,
            "./ConvexPolyhedron": 38,
            "./Shape": 43
        }],
        38: [function(t, e, i) {
            function o(t, e, i) {
                n.call(this), this.type = n.types.CONVEXPOLYHEDRON, this.vertices = t || [], this.worldVertices = [], this.worldVerticesNeedsUpdate = !0, this.faces = e || [], this.faceNormals = [], this.computeNormals(), this.worldFaceNormalsNeedsUpdate = !0, this.worldFaceNormals = [], this.uniqueEdges = [], this.uniqueAxes = i ? i.slice() : null, this.computeEdges(), this.updateBoundingSphereRadius()
            }
            e.exports = o;
            var n = t("./Shape"),
                r = t("../math/Vec3"),
                s = (t("../math/Quaternion"), t("../math/Transform"));
            o.prototype = new n, o.prototype.constructor = o;
            var a = new r;
            o.prototype.computeEdges = function() {
                var t = this.faces,
                    e = this.vertices,
                    i = (e.length, this.uniqueEdges);
                i.length = 0;
                for (var o = a, n = 0; n !== t.length; n++)
                    for (var r = t[n], s = r.length, l = 0; l !== s; l++) {
                        var c = (l + 1) % s;
                        e[r[l]].vsub(e[r[c]], o), o.normalize();
                        for (var h = !1, u = 0; u !== i.length; u++)
                            if (i[u].almostEquals(o) || i[u].almostEquals(o)) {
                                h = !0;
                                break
                            }
                        h || i.push(o.clone())
                    }
            }, o.prototype.computeNormals = function() {
                this.faceNormals.length = this.faces.length;
                for (var t = 0; t < this.faces.length; t++) {
                    for (var e = 0; e < this.faces[t].length; e++)
                        if (!this.vertices[this.faces[t][e]]) throw new Error("Vertex " + this.faces[t][e] + " not found!");
                    var i = this.faceNormals[t] || new r;
                    this.getFaceNormal(t, i), i.negate(i), this.faceNormals[t] = i;
                    var o = this.vertices[this.faces[t][0]];
                    if (i.dot(o) < 0) {
                        console.error(".faceNormals[" + t + "] = Vec3(" + i.toString() + ") looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.");
                        for (var e = 0; e < this.faces[t].length; e++) console.warn(".vertices[" + this.faces[t][e] + "] = Vec3(" + this.vertices[this.faces[t][e]].toString() + ")")
                    }
                }
            };
            var l = new r,
                c = new r;
            o.computeNormal = function(t, e, i, o) {
                e.vsub(t, c), i.vsub(e, l), l.cross(c, o), o.isZero() || o.normalize()
            }, o.prototype.getFaceNormal = function(t, e) {
                var i = this.faces[t],
                    n = this.vertices[i[0]],
                    r = this.vertices[i[1]],
                    s = this.vertices[i[2]];
                return o.computeNormal(n, r, s, e)
            };
            var h = new r;
            o.prototype.clipAgainstHull = function(t, e, i, o, n, s, a, l, c) {
                for (var u = h, d = -1, p = -Number.MAX_VALUE, f = 0; f < i.faces.length; f++) {
                    u.copy(i.faceNormals[f]), n.vmult(u, u);
                    var m = u.dot(s);
                    m > p && (p = m, d = f)
                }
                for (var v = [], y = i.faces[d], g = y.length, _ = 0; g > _; _++) {
                    var E = i.vertices[y[_]],
                        w = new r;
                    w.copy(E), n.vmult(w, w), o.vadd(w, w), v.push(w)
                }
                d >= 0 && this.clipFaceAgainstHull(s, t, e, v, a, l, c)
            };
            var u = new r,
                d = new r,
                p = new r,
                f = new r,
                m = new r,
                v = new r;
            o.prototype.findSeparatingAxis = function(t, e, i, o, n, r, s, a) {
                var l = u,
                    c = d,
                    h = p,
                    y = f,
                    g = m,
                    _ = v,
                    E = Number.MAX_VALUE,
                    w = this,
                    S = 0;
                if (w.uniqueAxes)
                    for (var b = 0; b !== w.uniqueAxes.length; b++) {
                        i.vmult(w.uniqueAxes[b], l);
                        var x = w.testSepAxis(l, t, e, i, o, n);
                        if (x === !1) return !1;
                        E > x && (E = x, r.copy(l))
                    } else
                        for (var A = s ? s.length : w.faces.length, b = 0; A > b; b++) {
                            var T = s ? s[b] : b;
                            l.copy(w.faceNormals[T]), i.vmult(l, l);
                            var x = w.testSepAxis(l, t, e, i, o, n);
                            if (x === !1) return !1;
                            E > x && (E = x, r.copy(l))
                        }
                if (t.uniqueAxes)
                    for (var b = 0; b !== t.uniqueAxes.length; b++) {
                        n.vmult(t.uniqueAxes[b], c), S++;
                        var x = w.testSepAxis(c, t, e, i, o, n);
                        if (x === !1) return !1;
                        E > x && (E = x, r.copy(c))
                    } else
                        for (var N = a ? a.length : t.faces.length, b = 0; N > b; b++) {
                            var T = a ? a[b] : b;
                            c.copy(t.faceNormals[T]), n.vmult(c, c), S++;
                            var x = w.testSepAxis(c, t, e, i, o, n);
                            if (x === !1) return !1;
                            E > x && (E = x, r.copy(c))
                        }
                for (var R = 0; R !== w.uniqueEdges.length; R++) {
                    i.vmult(w.uniqueEdges[R], y);
                    for (var C = 0; C !== t.uniqueEdges.length; C++)
                        if (n.vmult(t.uniqueEdges[C], g), y.cross(g, _), !_.almostZero()) {
                            _.normalize();
                            var P = w.testSepAxis(_, t, e, i, o, n);
                            if (P === !1) return !1;
                            E > P && (E = P, r.copy(_))
                        }
                }
                return o.vsub(e, h), h.dot(r) > 0 && r.negate(r), !0
            };
            var y = [],
                g = [];
            o.prototype.testSepAxis = function(t, e, i, n, r, s) {
                var a = this;
                o.project(a, t, i, n, y), o.project(e, t, r, s, g);
                var l = y[0],
                    c = y[1],
                    h = g[0],
                    u = g[1];
                if (u > l || c > h) return !1;
                var d = l - u,
                    p = h - c,
                    f = p > d ? d : p;
                return f
            };
            var _ = new r,
                E = new r;
            o.prototype.calculateLocalInertia = function(t, e) {
                this.computeLocalAABB(_, E);
                var i = E.x - _.x,
                    o = E.y - _.y,
                    n = E.z - _.z;
                e.x = 1 / 12 * t * (2 * o * 2 * o + 2 * n * 2 * n), e.y = 1 / 12 * t * (2 * i * 2 * i + 2 * n * 2 * n), e.z = 1 / 12 * t * (2 * o * 2 * o + 2 * i * 2 * i)
            }, o.prototype.getPlaneConstantOfFace = function(t) {
                var e = this.faces[t],
                    i = this.faceNormals[t],
                    o = this.vertices[e[0]],
                    n = -i.dot(o);
                return n
            };
            var w = new r,
                S = new r,
                b = new r,
                x = new r,
                A = new r,
                T = new r,
                N = new r,
                R = new r;
            o.prototype.clipFaceAgainstHull = function(t, e, i, o, n, r, s) {
                for (var a = w, l = S, c = b, h = x, u = A, d = T, p = N, f = R, m = this, v = [], y = o, g = v, _ = -1, E = Number.MAX_VALUE, C = 0; C < m.faces.length; C++) {
                    a.copy(m.faceNormals[C]), i.vmult(a, a);
                    var P = a.dot(t);
                    E > P && (E = P, _ = C)
                }
                if (!(0 > _)) {
                    var I = m.faces[_];
                    I.connectedFaces = [];
                    for (var O = 0; O < m.faces.length; O++)
                        for (var L = 0; L < m.faces[O].length; L++) - 1 !== I.indexOf(m.faces[O][L]) && O !== _ && -1 === I.connectedFaces.indexOf(O) && I.connectedFaces.push(O);
                    for (var M = (y.length, I.length), B = 0; M > B; B++) {
                        var F = m.vertices[I[B]],
                            H = m.vertices[I[(B + 1) % M]];
                        F.vsub(H, l), c.copy(l), i.vmult(c, c), e.vadd(c, c), h.copy(this.faceNormals[_]), i.vmult(h, h), e.vadd(h, h), c.cross(h, u), u.negate(u), d.copy(F), i.vmult(d, d), e.vadd(d, d);
                        var V, D = (-d.dot(u), I.connectedFaces[B]);
                        p.copy(this.faceNormals[D]);
                        var z = this.getPlaneConstantOfFace(D);
                        f.copy(p), i.vmult(f, f);
                        var V = z - f.dot(e);
                        for (this.clipFaceAgainstPlane(y, g, f, V); y.length;) y.shift();
                        for (; g.length;) y.push(g.shift())
                    }
                    p.copy(this.faceNormals[_]);
                    var z = this.getPlaneConstantOfFace(_);
                    f.copy(p), i.vmult(f, f);
                    for (var V = z - f.dot(e), O = 0; O < y.length; O++) {
                        var k = f.dot(y[O]) + V;
                        if (n >= k && (console.log("clamped: depth=" + k + " to minDist=" + (n + "")), k = n), r >= k) {
                            var j = y[O];
                            if (0 >= k) {
                                var W = {
                                    point: j,
                                    normal: f,
                                    depth: k
                                };
                                s.push(W)
                            }
                        }
                    }
                }
            }, o.prototype.clipFaceAgainstPlane = function(t, e, i, o) {
                var n, s, a = t.length;
                if (2 > a) return e;
                var l = t[t.length - 1],
                    c = t[0];
                n = i.dot(l) + o;
                for (var h = 0; a > h; h++) {
                    if (c = t[h], s = i.dot(c) + o, 0 > n)
                        if (0 > s) {
                            var u = new r;
                            u.copy(c), e.push(u)
                        } else {
                            var u = new r;
                            l.lerp(c, n / (n - s), u), e.push(u)
                        }
                    else if (0 > s) {
                        var u = new r;
                        l.lerp(c, n / (n - s), u), e.push(u), e.push(c)
                    }
                    l = c, n = s
                }
                return e
            }, o.prototype.computeWorldVertices = function(t, e) {
                for (var i = this.vertices.length; this.worldVertices.length < i;) this.worldVertices.push(new r);
                for (var o = this.vertices, n = this.worldVertices, s = 0; s !== i; s++) e.vmult(o[s], n[s]), t.vadd(n[s], n[s]);
                this.worldVerticesNeedsUpdate = !1
            };
            new r;
            o.prototype.computeLocalAABB = function(t, e) {
                var i = this.vertices.length,
                    o = this.vertices;
                t.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE), e.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                for (var n = 0; i > n; n++) {
                    var r = o[n];
                    r.x < t.x ? t.x = r.x : r.x > e.x && (e.x = r.x), r.y < t.y ? t.y = r.y : r.y > e.y && (e.y = r.y), r.z < t.z ? t.z = r.z : r.z > e.z && (e.z = r.z)
                }
            }, o.prototype.computeWorldFaceNormals = function(t) {
                for (var e = this.faceNormals.length; this.worldFaceNormals.length < e;) this.worldFaceNormals.push(new r);
                for (var i = this.faceNormals, o = this.worldFaceNormals, n = 0; n !== e; n++) t.vmult(i[n], o[n]);
                this.worldFaceNormalsNeedsUpdate = !1
            }, o.prototype.updateBoundingSphereRadius = function() {
                for (var t = 0, e = this.vertices, i = 0, o = e.length; i !== o; i++) {
                    var n = e[i].norm2();
                    n > t && (t = n)
                }
                this.boundingSphereRadius = Math.sqrt(t)
            };
            var C = new r;
            o.prototype.calculateWorldAABB = function(t, e, i, o) {
                for (var n, r, s, a, l, c, h = this.vertices.length, u = this.vertices, d = 0; h > d; d++) {
                    C.copy(u[d]), e.vmult(C, C), t.vadd(C, C);
                    var p = C;
                    p.x < n || void 0 === n ? n = p.x : (p.x > a || void 0 === a) && (a = p.x), p.y < r || void 0 === r ? r = p.y : (p.y > l || void 0 === l) && (l = p.y), p.z < s || void 0 === s ? s = p.z : (p.z > c || void 0 === c) && (c = p.z)
                }
                i.set(n, r, s), o.set(a, l, c)
            }, o.prototype.volume = function() {
                return 4 * Math.PI * this.boundingSphereRadius / 3
            }, o.prototype.getAveragePointLocal = function(t) {
                t = t || new r;
                for (var e = this.vertices.length, i = this.vertices, o = 0; e > o; o++) t.vadd(i[o], t);
                return t.mult(1 / e, t), t
            }, o.prototype.transformAllPoints = function(t, e) {
                var i = this.vertices.length,
                    o = this.vertices;
                if (e) {
                    for (var n = 0; i > n; n++) {
                        var r = o[n];
                        e.vmult(r, r)
                    }
                    for (var n = 0; n < this.faceNormals.length; n++) {
                        var r = this.faceNormals[n];
                        e.vmult(r, r)
                    }
                }
                if (t)
                    for (var n = 0; i > n; n++) {
                        var r = o[n];
                        r.vadd(t, r)
                    }
            };
            var P = new r,
                I = new r,
                O = new r;
            o.prototype.pointIsInside = function(t) {
                var e = this.vertices.length,
                    i = this.vertices,
                    o = this.faces,
                    n = this.faceNormals,
                    r = null,
                    s = this.faces.length,
                    a = P;
                this.getAveragePointLocal(a);
                for (var l = 0; s > l; l++) {
                    var e = (this.faces[l].length, n[l]),
                        c = i[o[l][0]],
                        h = I;
                    t.vsub(c, h);
                    var u = e.dot(h),
                        d = O;
                    a.vsub(c, d);
                    var p = e.dot(d);
                    if (0 > u && p > 0 || u > 0 && 0 > p) return !1
                }
                return r ? 1 : -1
            };
            var L = (new r, new r),
                M = new r;
            o.project = function(t, e, i, o, n) {
                var r = t.vertices.length,
                    a = L,
                    l = 0,
                    c = 0,
                    h = M,
                    u = t.vertices;
                h.setZero(), s.vectorToLocalFrame(i, o, e, a), s.pointToLocalFrame(i, o, h, h);
                var d = h.dot(a);
                c = l = u[0].dot(a);
                for (var p = 1; r > p; p++) {
                    var f = u[p].dot(a);
                    f > l && (l = f), c > f && (c = f)
                }
                if (c -= d, l -= d, c > l) {
                    var m = c;
                    c = l, l = m
                }
                n[0] = l, n[1] = c
            }
        }, {
            "../math/Quaternion": 28,
            "../math/Transform": 29,
            "../math/Vec3": 30,
            "./Shape": 43
        }],
        39: [function(t, e, i) {
            function o(t, e, i, o) {
                var a = o,
                    l = [],
                    c = [],
                    h = [],
                    u = [],
                    d = [],
                    p = Math.cos,
                    f = Math.sin;
                l.push(new r(e * p(0), e * f(0), .5 * -i)), u.push(0), l.push(new r(t * p(0), t * f(0), .5 * i)), d.push(1);
                for (var m = 0; a > m; m++) {
                    var v = 2 * Math.PI / a * (m + 1),
                        y = 2 * Math.PI / a * (m + .5);
                    a - 1 > m ? (l.push(new r(e * p(v), e * f(v), .5 * -i)), u.push(2 * m + 2), l.push(new r(t * p(v), t * f(v), .5 * i)), d.push(2 * m + 3), h.push([2 * m + 2, 2 * m + 3, 2 * m + 1, 2 * m])) : h.push([0, 1, 2 * m + 1, 2 * m]), (a % 2 === 1 || a / 2 > m) && c.push(new r(p(y), f(y), 0))
                }
                h.push(d), c.push(new r(0, 0, 1));
                for (var g = [], m = 0; m < u.length; m++) g.push(u[u.length - m - 1]);
                h.push(g), this.type = n.types.CONVEXPOLYHEDRON, s.call(this, l, h, c)
            }
            e.exports = o;
            var n = t("./Shape"),
                r = t("../math/Vec3"),
                s = (t("../math/Quaternion"), t("./ConvexPolyhedron"));
            o.prototype = new s
        }, {
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "./ConvexPolyhedron": 38,
            "./Shape": 43
        }],
        40: [function(t, e, i) {
            function o(t, e) {
                e = a.defaults(e, {
                    maxValue: null,
                    minValue: null,
                    elementSize: 1
                }), this.data = t, this.maxValue = e.maxValue, this.minValue = e.minValue, this.elementSize = e.elementSize, null === e.minValue && this.updateMinValue(), null === e.maxValue && this.updateMaxValue(), this.cacheEnabled = !0, n.call(this), this.pillarConvex = new r, this.pillarOffset = new s, this.type = n.types.HEIGHTFIELD, this.updateBoundingSphereRadius(), this._cachedPillars = {}
            }
            var n = t("./Shape"),
                r = t("./ConvexPolyhedron"),
                s = t("../math/Vec3"),
                a = t("../utils/Utils");
            e.exports = o, o.prototype = new n, o.prototype.update = function() {
                this._cachedPillars = {}
            }, o.prototype.updateMinValue = function() {
                for (var t = this.data, e = t[0][0], i = 0; i !== t.length; i++)
                    for (var o = 0; o !== t[i].length; o++) {
                        var n = t[i][o];
                        e > n && (e = n)
                    }
                this.minValue = e
            }, o.prototype.updateMaxValue = function() {
                for (var t = this.data, e = t[0][0], i = 0; i !== t.length; i++)
                    for (var o = 0; o !== t[i].length; o++) {
                        var n = t[i][o];
                        n > e && (e = n)
                    }
                this.maxValue = e
            }, o.prototype.setHeightValueAtIndex = function(t, e, i) {
                var o = this.data;
                o[t][e] = i, this.clearCachedConvexTrianglePillar(t, e, !1), t > 0 && (this.clearCachedConvexTrianglePillar(t - 1, e, !0), this.clearCachedConvexTrianglePillar(t - 1, e, !1)), e > 0 && (this.clearCachedConvexTrianglePillar(t, e - 1, !0), this.clearCachedConvexTrianglePillar(t, e - 1, !1)), e > 0 && t > 0 && this.clearCachedConvexTrianglePillar(t - 1, e - 1, !0)
            }, o.prototype.getRectMinMax = function(t, e, i, o, n) {
                n = n || [];
                for (var r = this.data, s = this.minValue, a = t; i >= a; a++)
                    for (var l = e; o >= l; l++) {
                        var c = r[a][l];
                        c > s && (s = c)
                    }
                n[0] = this.minValue, n[1] = s
            }, o.prototype.getIndexOfPosition = function(t, e, i, o) {
                var n = this.elementSize,
                    r = this.data,
                    s = Math.floor(t / n),
                    a = Math.floor(e / n);
                return i[0] = s, i[1] = a, o && (0 > s && (s = 0), 0 > a && (a = 0), s >= r.length - 1 && (s = r.length - 1), a >= r[0].length - 1 && (a = r[0].length - 1)), !(0 > s || 0 > a || s >= r.length - 1 || a >= r[0].length - 1)
            }, o.prototype.getHeightAt = function(t, e, i) {
                var o = [];
                this.getIndexOfPosition(t, e, o, i);
                var n = [];
                return this.getRectMinMax(o[0], o[1] + 1, o[0], o[1] + 1, n), (n[0] + n[1]) / 2
            }, o.prototype.getCacheConvexTrianglePillarKey = function(t, e, i) {
                return t + "_" + e + "_" + (i ? 1 : 0)
            }, o.prototype.getCachedConvexTrianglePillar = function(t, e, i) {
                return this._cachedPillars[this.getCacheConvexTrianglePillarKey(t, e, i)]
            }, o.prototype.setCachedConvexTrianglePillar = function(t, e, i, o, n) {
                this._cachedPillars[this.getCacheConvexTrianglePillarKey(t, e, i)] = {
                    convex: o,
                    offset: n
                }
            }, o.prototype.clearCachedConvexTrianglePillar = function(t, e, i) {
                delete this._cachedPillars[this.getCacheConvexTrianglePillarKey(t, e, i)]
            }, o.prototype.getConvexTrianglePillar = function(t, e, i) {
                var o = this.pillarConvex,
                    n = this.pillarOffset;
                if (this.cacheEnabled) {
                    var a = this.getCachedConvexTrianglePillar(t, e, i);
                    if (a) return this.pillarConvex = a.convex, void(this.pillarOffset = a.offset);
                    o = new r, n = new s, this.pillarConvex = o, this.pillarOffset = n
                }
                var a = this.data,
                    l = this.elementSize,
                    c = o.faces;
                o.vertices.length = 6;
                for (var h = 0; 6 > h; h++) o.vertices[h] || (o.vertices[h] = new s);
                c.length = 5;
                for (var h = 0; 5 > h; h++) c[h] || (c[h] = []);
                var u = o.vertices,
                    d = (Math.min(a[t][e], a[t + 1][e], a[t][e + 1], a[t + 1][e + 1]) - this.minValue) / 2 + this.minValue;
                i ? (n.set((t + .75) * l, (e + .75) * l, d), u[0].set(.25 * l, .25 * l, a[t + 1][e + 1] - d), u[1].set(-.75 * l, .25 * l, a[t][e + 1] - d),
                    u[2].set(.25 * l, -.75 * l, a[t + 1][e] - d), u[3].set(.25 * l, .25 * l, -d - 1), u[4].set(-.75 * l, .25 * l, -d - 1), u[5].set(.25 * l, -.75 * l, -d - 1), c[0][0] = 0, c[0][1] = 1, c[0][2] = 2, c[1][0] = 5, c[1][1] = 4, c[1][2] = 3, c[2][0] = 2, c[2][1] = 5, c[2][2] = 3, c[2][3] = 0, c[3][0] = 3, c[3][1] = 4, c[3][2] = 1, c[3][3] = 0, c[4][0] = 1, c[4][1] = 4, c[4][2] = 5, c[4][3] = 2) : (n.set((t + .25) * l, (e + .25) * l, d), u[0].set(-.25 * l, -.25 * l, a[t][e] - d), u[1].set(.75 * l, -.25 * l, a[t + 1][e] - d), u[2].set(-.25 * l, .75 * l, a[t][e + 1] - d), u[3].set(-.25 * l, -.25 * l, -d - 1), u[4].set(.75 * l, -.25 * l, -d - 1), u[5].set(-.25 * l, .75 * l, -d - 1), c[0][0] = 0, c[0][1] = 1, c[0][2] = 2, c[1][0] = 5, c[1][1] = 4, c[1][2] = 3, c[2][0] = 0, c[2][1] = 2, c[2][2] = 5, c[2][3] = 3, c[3][0] = 1, c[3][1] = 0, c[3][2] = 3, c[3][3] = 4, c[4][0] = 4, c[4][1] = 5, c[4][2] = 2, c[4][3] = 1), o.computeNormals(), o.computeEdges(), o.updateBoundingSphereRadius(), this.setCachedConvexTrianglePillar(t, e, i, o, n)
            }, o.prototype.calculateLocalInertia = function(t, e) {
                return e = e || new s, e.set(0, 0, 0), e
            }, o.prototype.volume = function() {
                return Number.MAX_VALUE
            }, o.prototype.calculateWorldAABB = function(t, e, i, o) {
                i.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE), o.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE)
            }, o.prototype.updateBoundingSphereRadius = function() {
                var t = this.data,
                    e = this.elementSize;
                this.boundingSphereRadius = new s(t.length * e, t[0].length * e, Math.max(Math.abs(this.maxValue), Math.abs(this.minValue))).norm()
            }
        }, {
            "../math/Vec3": 30,
            "../utils/Utils": 53,
            "./ConvexPolyhedron": 38,
            "./Shape": 43
        }],
        41: [function(t, e, i) {
            function o() {
                n.call(this), this.type = n.types.PARTICLE
            }
            e.exports = o;
            var n = t("./Shape"),
                r = t("../math/Vec3");
            o.prototype = new n, o.prototype.constructor = o, o.prototype.calculateLocalInertia = function(t, e) {
                return e = e || new r, e.set(0, 0, 0), e
            }, o.prototype.volume = function() {
                return 0
            }, o.prototype.updateBoundingSphereRadius = function() {
                this.boundingSphereRadius = 0
            }, o.prototype.calculateWorldAABB = function(t, e, i, o) {
                i.copy(t), o.copy(t)
            }
        }, {
            "../math/Vec3": 30,
            "./Shape": 43
        }],
        42: [function(t, e, i) {
            function o() {
                n.call(this), this.type = n.types.PLANE, this.worldNormal = new r, this.worldNormalNeedsUpdate = !0, this.boundingSphereRadius = Number.MAX_VALUE
            }
            e.exports = o;
            var n = t("./Shape"),
                r = t("../math/Vec3");
            o.prototype = new n, o.prototype.constructor = o, o.prototype.computeWorldNormal = function(t) {
                var e = this.worldNormal;
                e.set(0, 0, 1), t.vmult(e, e), this.worldNormalNeedsUpdate = !1
            }, o.prototype.calculateLocalInertia = function(t, e) {
                return e = e || new r
            }, o.prototype.volume = function() {
                return Number.MAX_VALUE
            };
            var s = new r;
            o.prototype.calculateWorldAABB = function(t, e, i, o) {
                s.set(0, 0, 1), e.vmult(s, s);
                var n = Number.MAX_VALUE;
                i.set(-n, -n, -n), o.set(n, n, n), 1 === s.x && (o.x = t.x), 1 === s.y && (o.y = t.y), 1 === s.z && (o.z = t.z), -1 === s.x && (i.x = t.x), -1 === s.y && (i.y = t.y), -1 === s.z && (i.z = t.z)
            }, o.prototype.updateBoundingSphereRadius = function() {
                this.boundingSphereRadius = Number.MAX_VALUE
            }
        }, {
            "../math/Vec3": 30,
            "./Shape": 43
        }],
        43: [function(t, e, i) {
            function o() {
                this.id = o.idCounter++, this.type = 0, this.boundingSphereRadius = 0, this.collisionResponse = !0, this.material = null
            }
            e.exports = o;
            var o = t("./Shape");
            t("../math/Vec3"), t("../math/Quaternion"), t("../material/Material");
            o.prototype.constructor = o, o.prototype.updateBoundingSphereRadius = function() {
                throw "computeBoundingSphereRadius() not implemented for shape type " + this.type
            }, o.prototype.volume = function() {
                throw "volume() not implemented for shape type " + this.type
            }, o.prototype.calculateLocalInertia = function(t, e) {
                throw "calculateLocalInertia() not implemented for shape type " + this.type
            }, o.idCounter = 0, o.types = {
                SPHERE: 1,
                PLANE: 2,
                BOX: 4,
                COMPOUND: 8,
                CONVEXPOLYHEDRON: 16,
                HEIGHTFIELD: 32,
                PARTICLE: 64,
                CYLINDER: 128,
                TRIMESH: 256
            }
        }, {
            "../material/Material": 25,
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "./Shape": 43
        }],
        44: [function(t, e, i) {
            function o(t) {
                if (n.call(this), this.radius = void 0 !== t ? Number(t) : 1, this.type = n.types.SPHERE, this.radius < 0) throw new Error("The sphere radius cannot be negative.");
                this.updateBoundingSphereRadius()
            }
            e.exports = o;
            var n = t("./Shape"),
                r = t("../math/Vec3");
            o.prototype = new n, o.prototype.constructor = o, o.prototype.calculateLocalInertia = function(t, e) {
                e = e || new r;
                var i = 2 * t * this.radius * this.radius / 5;
                return e.x = i, e.y = i, e.z = i, e
            }, o.prototype.volume = function() {
                return 4 * Math.PI * this.radius / 3
            }, o.prototype.updateBoundingSphereRadius = function() {
                this.boundingSphereRadius = this.radius
            }, o.prototype.calculateWorldAABB = function(t, e, i, o) {
                for (var n = this.radius, r = ["x", "y", "z"], s = 0; s < r.length; s++) {
                    var a = r[s];
                    i[a] = t[a] - n, o[a] = t[a] + n
                }
            }
        }, {
            "../math/Vec3": 30,
            "./Shape": 43
        }],
        45: [function(t, e, i) {
            function o(t, e) {
                n.call(this), this.type = n.types.TRIMESH, this.vertices = new Float32Array(t), this.indices = new Int16Array(e), this.normals = new Float32Array(e.length), this.aabb = new a, this.edges = null, this.scale = new r(1, 1, 1), this.tree = new l, this.updateEdges(), this.updateNormals(), this.updateAABB(), this.updateBoundingSphereRadius(), this.updateTree()
            }
            e.exports = o;
            var n = t("./Shape"),
                r = t("../math/Vec3"),
                s = (t("../math/Quaternion"), t("../math/Transform")),
                a = t("../collision/AABB"),
                l = t("../utils/Octree");
            o.prototype = new n, o.prototype.constructor = o;
            var c = new r;
            o.prototype.updateTree = function() {
                var t = this.tree;
                t.reset(), t.aabb.copy(this.aabb);
                var e = this.scale;
                t.aabb.lowerBound.x *= 1 / e.x, t.aabb.lowerBound.y *= 1 / e.y, t.aabb.lowerBound.z *= 1 / e.z, t.aabb.upperBound.x *= 1 / e.x, t.aabb.upperBound.y *= 1 / e.y, t.aabb.upperBound.z *= 1 / e.z;
                for (var i = new a, o = new r, n = new r, s = new r, l = [o, n, s], c = 0; c < this.indices.length / 3; c++) {
                    var h = 3 * c;
                    this._getUnscaledVertex(this.indices[h], o), this._getUnscaledVertex(this.indices[h + 1], n), this._getUnscaledVertex(this.indices[h + 2], s), i.setFromPoints(l), t.insert(i, c)
                }
                t.removeEmptyNodes()
            };
            var h = new a;
            o.prototype.getTrianglesInAABB = function(t, e) {
                h.copy(t);
                var i = this.scale,
                    o = i.x,
                    n = i.y,
                    r = i.z,
                    s = h.lowerBound,
                    a = h.upperBound;
                return s.x /= o, s.y /= n, s.z /= r, a.x /= o, a.y /= n, a.z /= r, this.tree.aabbQuery(h, e)
            }, o.prototype.setScale = function(t) {
                var e = this.scale.x === this.scale.y === this.scale.z,
                    i = t.x === t.y === t.z;
                e && i || this.updateNormals(), this.scale.copy(t), this.updateAABB(), this.updateBoundingSphereRadius()
            }, o.prototype.updateNormals = function() {
                for (var t = c, e = this.normals, i = 0; i < this.indices.length / 3; i++) {
                    var n = 3 * i,
                        r = this.indices[n],
                        s = this.indices[n + 1],
                        a = this.indices[n + 2];
                    this.getVertex(r, m), this.getVertex(s, v), this.getVertex(a, y), o.computeNormal(v, m, y, t), e[n] = t.x, e[n + 1] = t.y, e[n + 2] = t.z
                }
            }, o.prototype.updateEdges = function() {
                for (var t = {}, e = function(e, i) {
                        var o = r > n ? n + "_" + r : r + "_" + n;
                        t[o] = !0
                    }, i = 0; i < this.indices.length / 3; i++) {
                    var o = 3 * i,
                        n = this.indices[o],
                        r = this.indices[o + 1],
                        s = this.indices[o + 2];
                    e(n, r), e(r, s), e(s, n)
                }
                var a = Object.keys(t);
                this.edges = new Int16Array(2 * a.length);
                for (var i = 0; i < a.length; i++) {
                    var l = a[i].split("_");
                    this.edges[2 * i] = parseInt(l[0], 10), this.edges[2 * i + 1] = parseInt(l[1], 10)
                }
            }, o.prototype.getEdgeVertex = function(t, e, i) {
                var o = this.edges[2 * t + (e ? 1 : 0)];
                this.getVertex(o, i)
            };
            var u = new r,
                d = new r;
            o.prototype.getEdgeVector = function(t, e) {
                var i = u,
                    o = d;
                this.getEdgeVertex(t, 0, i), this.getEdgeVertex(t, 1, o), o.vsub(i, e)
            };
            var p = new r,
                f = new r;
            o.computeNormal = function(t, e, i, o) {
                e.vsub(t, f), i.vsub(e, p), p.cross(f, o), o.isZero() || o.normalize()
            };
            var m = new r,
                v = new r,
                y = new r;
            o.prototype.getVertex = function(t, e) {
                var i = this.scale;
                return this._getUnscaledVertex(t, e), e.x *= i.x, e.y *= i.y, e.z *= i.z, e
            }, o.prototype._getUnscaledVertex = function(t, e) {
                var i = 3 * t,
                    o = this.vertices;
                return e.set(o[i], o[i + 1], o[i + 2])
            }, o.prototype.getWorldVertex = function(t, e, i, o) {
                return this.getVertex(t, o), s.pointToWorldFrame(e, i, o, o), o
            }, o.prototype.getTriangleVertices = function(t, e, i, o) {
                var n = 3 * t;
                this.getVertex(this.indices[n], e), this.getVertex(this.indices[n + 1], i), this.getVertex(this.indices[n + 2], o)
            }, o.prototype.getNormal = function(t, e) {
                var i = 3 * t;
                return e.set(this.normals[i], this.normals[i + 1], this.normals[i + 2])
            };
            var g = new a;
            o.prototype.calculateLocalInertia = function(t, e) {
                this.computeLocalAABB(g);
                var i = g.upperBound.x - g.lowerBound.x,
                    o = g.upperBound.y - g.lowerBound.y,
                    n = g.upperBound.z - g.lowerBound.z;
                return e.set(1 / 12 * t * (2 * o * 2 * o + 2 * n * 2 * n), 1 / 12 * t * (2 * i * 2 * i + 2 * n * 2 * n), 1 / 12 * t * (2 * o * 2 * o + 2 * i * 2 * i))
            };
            var _ = new r;
            o.prototype.computeLocalAABB = function(t) {
                var e = t.lowerBound,
                    i = t.upperBound,
                    o = this.vertices.length,
                    n = (this.vertices, _);
                this.getVertex(0, n), e.copy(n), i.copy(n);
                for (var r = 0; r !== o; r++) this.getVertex(r, n), n.x < e.x ? e.x = n.x : n.x > i.x && (i.x = n.x), n.y < e.y ? e.y = n.y : n.y > i.y && (i.y = n.y), n.z < e.z ? e.z = n.z : n.z > i.z && (i.z = n.z)
            }, o.prototype.updateAABB = function() {
                this.computeLocalAABB(this.aabb)
            }, o.prototype.updateBoundingSphereRadius = function() {
                for (var t = 0, e = this.vertices, i = new r, o = 0, n = e.length / 3; o !== n; o++) {
                    this.getVertex(o, i);
                    var s = i.norm2();
                    s > t && (t = s)
                }
                this.boundingSphereRadius = Math.sqrt(t)
            };
            var E = (new r, new s),
                w = new a;
            o.prototype.calculateWorldAABB = function(t, e, i, o) {
                var n = E,
                    r = w;
                n.position = t, n.quaternion = e, this.aabb.toWorldFrame(n, r), i.copy(r.lowerBound), o.copy(r.upperBound)
            }, o.prototype.volume = function() {
                return 4 * Math.PI * this.boundingSphereRadius / 3
            }, o.createTorus = function(t, e, i, n, r) {
                t = t || 1, e = e || .5, i = i || 8, n = n || 6, r = r || 2 * Math.PI;
                for (var s = [], a = [], l = 0; i >= l; l++)
                    for (var c = 0; n >= c; c++) {
                        var h = c / n * r,
                            u = l / i * Math.PI * 2,
                            d = (t + e * Math.cos(u)) * Math.cos(h),
                            p = (t + e * Math.cos(u)) * Math.sin(h),
                            f = e * Math.sin(u);
                        s.push(d, p, f)
                    }
                for (var l = 1; i >= l; l++)
                    for (var c = 1; n >= c; c++) {
                        var m = (n + 1) * l + c - 1,
                            v = (n + 1) * (l - 1) + c - 1,
                            y = (n + 1) * (l - 1) + c,
                            g = (n + 1) * l + c;
                        a.push(m, v, g), a.push(v, y, g)
                    }
                return new o(s, a)
            }
        }, {
            "../collision/AABB": 3,
            "../math/Quaternion": 28,
            "../math/Transform": 29,
            "../math/Vec3": 30,
            "../utils/Octree": 50,
            "./Shape": 43
        }],
        46: [function(t, e, i) {
            function o() {
                n.call(this), this.iterations = 10, this.tolerance = 1e-7
            }
            e.exports = o;
            var n = (t("../math/Vec3"), t("../math/Quaternion"), t("./Solver"));
            o.prototype = new n;
            var r = [],
                s = [],
                a = [];
            o.prototype.solve = function(t, e) {
                var i, o, n, l, c, h, u = 0,
                    d = this.iterations,
                    p = this.tolerance * this.tolerance,
                    f = this.equations,
                    m = f.length,
                    v = e.bodies,
                    y = v.length,
                    g = t;
                if (0 !== m)
                    for (var _ = 0; _ !== y; _++) v[_].updateSolveMassProperties();
                var E = s,
                    w = a,
                    S = r;
                E.length = m, w.length = m, S.length = m;
                for (var _ = 0; _ !== m; _++) {
                    var b = f[_];
                    S[_] = 0, w[_] = b.computeB(g), E[_] = 1 / b.computeC()
                }
                if (0 !== m) {
                    for (var _ = 0; _ !== y; _++) {
                        var x = v[_],
                            A = x.vlambda,
                            T = x.wlambda;
                        A.set(0, 0, 0), T && T.set(0, 0, 0)
                    }
                    for (u = 0; u !== d; u++) {
                        l = 0;
                        for (var N = 0; N !== m; N++) {
                            var b = f[N];
                            i = w[N], o = E[N], h = S[N], c = b.computeGWlambda(), n = o * (i - c - b.eps * h), h + n < b.minForce ? n = b.minForce - h : h + n > b.maxForce && (n = b.maxForce - h), S[N] += n, l += n > 0 ? n : -n, b.addToWlambda(n)
                        }
                        if (p > l * l) break
                    }
                    for (var _ = 0; _ !== y; _++) {
                        var x = v[_],
                            R = x.velocity,
                            C = x.angularVelocity;
                        R.vadd(x.vlambda, R), C && C.vadd(x.wlambda, C)
                    }
                }
                return u
            }
        }, {
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "./Solver": 47
        }],
        47: [function(t, e, i) {
            function o() {
                this.equations = []
            }
            e.exports = o, o.prototype.solve = function(t, e) {
                return 0
            }, o.prototype.addEquation = function(t) {
                t.enabled && this.equations.push(t)
            }, o.prototype.removeEquation = function(t) {
                var e = this.equations,
                    i = e.indexOf(t); - 1 !== i && e.splice(i, 1)
            }, o.prototype.removeAllEquations = function() {
                this.equations.length = 0
            }
        }, {}],
        48: [function(t, e, i) {
            function o(t, e, i) {
                for (l.call(this), this.iterations = e, this.tolerance = i, this.subsolver = t, this.nodes = [], this.nodePool = []; this.nodePool.length < 128;) this.nodePool.push(this.createNode())
            }

            function n(t) {
                for (var e = t.length, i = 0; i !== e; i++) {
                    var o = t[i];
                    if (!(o.visited || o.body.type & p)) return o
                }
                return !1
            }

            function r(t, e, i, o) {
                for (f.push(t), t.visited = !0, e(t, i, o); f.length;)
                    for (var r, s = f.pop(); r = n(s.children);) r.visited = !0, e(r, i, o), f.push(r)
            }

            function s(t, e, i) {
                e.push(t.body);
                for (var o = t.eqs.length, n = 0; n !== o; n++) {
                    var r = t.eqs[n]; - 1 === i.indexOf(r) && i.push(r)
                }
            }

            function a(t, e) {
                return e.id - t.id
            }
            e.exports = o;
            var l = (t("../math/Vec3"), t("../math/Quaternion"), t("./Solver")),
                c = t("../objects/Body");
            o.prototype = new l;
            var h = [],
                u = [],
                d = {
                    bodies: []
                },
                p = c.STATIC,
                f = [];
            o.prototype.createNode = function() {
                return {
                    body: null,
                    children: [],
                    eqs: [],
                    visited: !1
                }
            }, o.prototype.solve = function(t, e) {
                for (var i = h, o = this.nodePool, l = e.bodies, c = this.equations, p = c.length, f = l.length, m = this.subsolver; o.length < f;) o.push(this.createNode());
                i.length = f;
                for (var v = 0; f > v; v++) i[v] = o[v];
                for (var v = 0; v !== f; v++) {
                    var y = i[v];
                    y.body = l[v], y.children.length = 0, y.eqs.length = 0, y.visited = !1
                }
                for (var g = 0; g !== p; g++) {
                    var _ = c[g],
                        v = l.indexOf(_.bi),
                        E = l.indexOf(_.bj),
                        w = i[v],
                        S = i[E];
                    w.children.push(S), w.eqs.push(_), S.children.push(w), S.eqs.push(_)
                }
                var b, x = 0,
                    A = u;
                m.tolerance = this.tolerance, m.iterations = this.iterations;
                for (var T = d; b = n(i);) {
                    A.length = 0, T.bodies.length = 0, r(b, s, T.bodies, A);
                    var N = A.length;
                    A = A.sort(a);
                    for (var v = 0; v !== N; v++) m.addEquation(A[v]);
                    m.solve(t, T);
                    m.removeAllEquations(), x++
                }
                return x
            }
        }, {
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "../objects/Body": 31,
            "./Solver": 47
        }],
        49: [function(t, e, i) {
            var o = function() {};
            e.exports = o, o.prototype = {
                constructor: o,
                addEventListener: function(t, e) {
                    void 0 === this._listeners && (this._listeners = {});
                    var i = this._listeners;
                    return void 0 === i[t] && (i[t] = []), -1 === i[t].indexOf(e) && i[t].push(e), this
                },
                hasEventListener: function(t, e) {
                    if (void 0 === this._listeners) return !1;
                    var i = this._listeners;
                    return void 0 !== i[t] && -1 !== i[t].indexOf(e)
                },
                removeEventListener: function(t, e) {
                    if (void 0 === this._listeners) return this;
                    var i = this._listeners;
                    if (void 0 === i[t]) return this;
                    var o = i[t].indexOf(e);
                    return -1 !== o && i[t].splice(o, 1), this
                },
                dispatchEvent: function(t) {
                    if (void 0 === this._listeners) return this;
                    var e = this._listeners,
                        i = e[t.type];
                    if (void 0 !== i) {
                        t.target = this;
                        for (var o = 0, n = i.length; n > o; o++) i[o].call(this, t)
                    }
                    return this
                }
            }
        }, {}],
        50: [function(t, e, i) {
            function o(t) {
                t = t || {}, this.root = t.root || null, this.aabb = t.aabb ? t.aabb.clone() : new r, this.data = [], this.children = []
            }

            function n(t, e) {
                e = e || {}, e.root = null, e.aabb = t, o.call(this, e), this.maxDepth = "undefined" != typeof e.maxDepth ? e.maxDepth : 8
            }
            var r = t("../collision/AABB"),
                s = t("../math/Vec3");
            e.exports = n, n.prototype = new o, o.prototype.reset = function(t, e) {
                this.children.length = this.data.length = 0
            }, o.prototype.insert = function(t, e, i) {
                var o = this.data;
                if (i = i || 0, !this.aabb.contains(t)) return !1;
                var n = this.children;
                if (i < (this.maxDepth || this.root.maxDepth)) {
                    var r = !1;
                    n.length || (this.subdivide(), r = !0);
                    for (var s = 0; 8 !== s; s++)
                        if (n[s].insert(t, e, i + 1)) return !0;
                    r && (n.length = 0)
                }
                return o.push(e), !0
            };
            var a = new s;
            o.prototype.subdivide = function() {
                var t = this.aabb,
                    e = t.lowerBound,
                    i = t.upperBound,
                    n = this.children;
                n.push(new o({
                    aabb: new r({
                        lowerBound: new s(0, 0, 0)
                    })
                }), new o({
                    aabb: new r({
                        lowerBound: new s(1, 0, 0)
                    })
                }), new o({
                    aabb: new r({
                        lowerBound: new s(1, 1, 0)
                    })
                }), new o({
                    aabb: new r({
                        lowerBound: new s(1, 1, 1)
                    })
                }), new o({
                    aabb: new r({
                        lowerBound: new s(0, 1, 1)
                    })
                }), new o({
                    aabb: new r({
                        lowerBound: new s(0, 0, 1)
                    })
                }), new o({
                    aabb: new r({
                        lowerBound: new s(1, 0, 1)
                    })
                }), new o({
                    aabb: new r({
                        lowerBound: new s(0, 1, 0)
                    })
                })), i.vsub(e, a), a.scale(.5, a);
                for (var l = this.root || this, c = 0; 8 !== c; c++) {
                    var h = n[c];
                    h.root = l;
                    var u = h.aabb.lowerBound;
                    u.x *= a.x, u.y *= a.y, u.z *= a.z, u.vadd(e, u), u.vadd(a, h.aabb.upperBound)
                }
            }, o.prototype.aabbQuery = function(t, e) {
                for (var i = (this.data, this.children, [this]); i.length;) {
                    var o = i.pop();
                    o.aabb.overlaps(t) && Array.prototype.push.apply(e, o.data), Array.prototype.push.apply(i, o.children)
                }
                return e
            };
            var l = new r;
            o.prototype.rayQuery = function(t, e, i) {
                return t.getAABB(l), l.toLocalFrame(e, l), this.aabbQuery(l, i), i
            }, o.prototype.removeEmptyNodes = function() {
                for (var t = [this]; t.length;) {
                    for (var e = t.pop(), i = e.children.length - 1; i >= 0; i--) e.children[i].data.length || e.children.splice(i, 1);
                    Array.prototype.push.apply(t, e.children)
                }
            }
        }, {
            "../collision/AABB": 3,
            "../math/Vec3": 30
        }],
        51: [function(t, e, i) {
            function o() {
                this.objects = [], this.type = Object
            }
            e.exports = o, o.prototype.release = function() {
                for (var t = arguments.length, e = 0; e !== t; e++) this.objects.push(arguments[e])
            }, o.prototype.get = function() {
                return 0 === this.objects.length ? this.constructObject() : this.objects.pop()
            }, o.prototype.constructObject = function() {
                throw new Error("constructObject() not implemented in this Pool subclass yet!")
            }
        }, {}],
        52: [function(t, e, i) {
            function o() {
                this.data = {
                    keys: []
                }
            }
            e.exports = o, o.prototype.get = function(t, e) {
                if (t > e) {
                    var i = e;
                    e = t, t = i
                }
                return this.data[t + "-" + e]
            }, o.prototype.set = function(t, e, i) {
                if (t > e) {
                    var o = e;
                    e = t, t = o
                }
                var n = t + "-" + e;
                this.get(t, e) || this.data.keys.push(n), this.data[n] = i
            }, o.prototype.reset = function() {
                for (var t = this.data, e = t.keys; e.length > 0;) {
                    var i = e.pop();
                    delete t[i]
                }
            }
        }, {}],
        53: [function(t, e, i) {
            function o() {}
            e.exports = o, o.defaults = function(t, e) {
                t = t || {};
                for (var i in e) i in t || (t[i] = e[i]);
                return t
            }
        }, {}],
        54: [function(t, e, i) {
            function o() {
                r.call(this), this.type = n
            }
            e.exports = o;
            var n = t("../math/Vec3"),
                r = t("./Pool");
            o.prototype = new r, o.prototype.constructObject = function() {
                return new n
            }
        }, {
            "../math/Vec3": 30,
            "./Pool": 51
        }],
        55: [function(t, e, i) {
            function o(t) {
                this.contactPointPool = [], this.frictionEquationPool = [], this.result = [], this.frictionResult = [], this.v3pool = new u, this.world = t, this.currentContactMaterial = null, this.enableFrictionReduction = !1
            }

            function n(t, e, i) {
                for (var o = null, n = t.length, r = 0; r !== n; r++) {
                    var s = t[r],
                        a = k;
                    t[(r + 1) % n].vsub(s, a);
                    var l = j;
                    a.cross(e, l);
                    var c = W;
                    i.vsub(s, c);
                    var h = l.dot(c);
                    if (!(null === o || h > 0 && o === !0 || 0 >= h && o === !1)) return !1;
                    null === o && (o = h > 0)
                }
                return !0
            }
            e.exports = o;
            var r = t("../collision/AABB"),
                s = t("../shapes/Shape"),
                a = t("../collision/Ray"),
                l = t("../math/Vec3"),
                c = t("../math/Transform"),
                h = (t("../shapes/ConvexPolyhedron"), t("../math/Quaternion")),
                u = (t("../solver/Solver"), t("../utils/Vec3Pool")),
                d = t("../equations/ContactEquation"),
                p = t("../equations/FrictionEquation");
            o.prototype.createContactEquation = function(t, e, i, o, n, r) {
                var s;
                this.contactPointPool.length ? (s = this.contactPointPool.pop(), s.bi = t, s.bj = e) : s = new d(t, e), s.enabled = t.collisionResponse && e.collisionResponse && i.collisionResponse && o.collisionResponse;
                var a = this.currentContactMaterial;
                s.restitution = a.restitution, s.setSpookParams(a.contactEquationStiffness, a.contactEquationRelaxation, this.world.dt);
                var l = i.material || t.material,
                    c = o.material || e.material;
                return l && c && l.restitution >= 0 && c.restitution >= 0 && (s.restitution = l.restitution * c.restitution), s.si = n || i, s.sj = r || o, s
            }, o.prototype.createFrictionEquationsFromContact = function(t, e) {
                var i = t.bi,
                    o = t.bj,
                    n = t.si,
                    r = t.sj,
                    s = this.world,
                    a = this.currentContactMaterial,
                    l = a.friction,
                    c = n.material || i.material,
                    h = r.material || o.material;
                if (c && h && c.friction >= 0 && h.friction >= 0 && (l = c.friction * h.friction), l > 0) {
                    var u = l * s.gravity.length(),
                        d = i.invMass + o.invMass;
                    d > 0 && (d = 1 / d);
                    var f = this.frictionEquationPool,
                        m = f.length ? f.pop() : new p(i, o, u * d),
                        v = f.length ? f.pop() : new p(i, o, u * d);
                    return m.bi = v.bi = i, m.bj = v.bj = o, m.minForce = v.minForce = -u * d, m.maxForce = v.maxForce = u * d, m.ri.copy(t.ri), m.rj.copy(t.rj), v.ri.copy(t.ri), v.rj.copy(t.rj), t.ni.tangents(m.t, v.t), m.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, s.dt), v.setSpookParams(a.frictionEquationStiffness, a.frictionEquationRelaxation, s.dt), m.enabled = v.enabled = t.enabled, e.push(m, v), !0
                }
                return !1
            };
            var f = new l,
                m = new l,
                v = new l;
            o.prototype.createFrictionFromAverage = function(t) {
                var e = this.result[this.result.length - 1];
                if (this.createFrictionEquationsFromContact(e, this.frictionResult) && 1 !== t) {
                    var i = this.frictionResult[this.frictionResult.length - 2],
                        o = this.frictionResult[this.frictionResult.length - 1];
                    f.setZero(), m.setZero(), v.setZero();
                    for (var n = e.bi, r = (e.bj, 0); r !== t; r++) e = this.result[this.result.length - 1 - r], e.bodyA !== n ? (f.vadd(e.ni, f), m.vadd(e.ri, m), v.vadd(e.rj, v)) : (f.vsub(e.ni, f), m.vadd(e.rj, m), v.vadd(e.ri, v));
                    var s = 1 / t;
                    m.scale(s, i.ri), v.scale(s, i.rj), o.ri.copy(i.ri), o.rj.copy(i.rj), f.normalize(), f.tangents(i.t, o.t)
                }
            };
            var y = new l,
                g = new l,
                _ = new h,
                E = new h;
            o.prototype.getContacts = function(t, e, i, o, n, r, s) {
                this.contactPointPool = n, this.frictionEquationPool = s, this.result = o, this.frictionResult = r;
                for (var a = _, l = E, c = y, h = g, u = 0, d = t.length; u !== d; u++) {
                    var p = t[u],
                        f = e[u],
                        m = null;
                    p.material && f.material && (m = i.getContactMaterial(p.material, f.material) || null);
                    for (var v = 0; v < p.shapes.length; v++) {
                        p.quaternion.mult(p.shapeOrientations[v], a), p.quaternion.vmult(p.shapeOffsets[v], c), c.vadd(p.position, c);
                        for (var w = p.shapes[v], S = 0; S < f.shapes.length; S++) {
                            f.quaternion.mult(f.shapeOrientations[S], l), f.quaternion.vmult(f.shapeOffsets[S], h), h.vadd(f.position, h);
                            var b = f.shapes[S];
                            if (!(c.distanceTo(h) > w.boundingSphereRadius + b.boundingSphereRadius)) {
                                var x = null;
                                w.material && b.material && (x = i.getContactMaterial(w.material, b.material) || null), this.currentContactMaterial = x || m || i.defaultContactMaterial;
                                var A = this[w.type | b.type];
                                A && (w.type < b.type ? A.call(this, w, b, c, h, a, l, p, f, w, b) : A.call(this, b, w, h, c, l, a, f, p, w, b))
                            }
                        }
                    }
                }
            };
            o.prototype[s.types.BOX | s.types.BOX] = o.prototype.boxBox = function(t, e, i, o, n, r, s, a) {
                t.convexPolyhedronRepresentation.material = t.material, e.convexPolyhedronRepresentation.material = e.material, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.convexConvex(t.convexPolyhedronRepresentation, e.convexPolyhedronRepresentation, i, o, n, r, s, a, t, e)
            }, o.prototype[s.types.BOX | s.types.CONVEXPOLYHEDRON] = o.prototype.boxConvex = function(t, e, i, o, n, r, s, a) {
                t.convexPolyhedronRepresentation.material = t.material, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, this.convexConvex(t.convexPolyhedronRepresentation, e, i, o, n, r, s, a, t, e)
            }, o.prototype[s.types.BOX | s.types.PARTICLE] = o.prototype.boxParticle = function(t, e, i, o, n, r, s, a) {
                t.convexPolyhedronRepresentation.material = t.material, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, this.convexParticle(t.convexPolyhedronRepresentation, e, i, o, n, r, s, a, t, e)
            }, o.prototype[s.types.SPHERE] = o.prototype.sphereSphere = function(t, e, i, o, n, r, s, a) {
                var l = this.createContactEquation(s, a, t, e);
                o.vsub(i, l.ni), l.ni.normalize(), l.ri.copy(l.ni), l.rj.copy(l.ni), l.ri.mult(t.radius, l.ri), l.rj.mult(-e.radius, l.rj), l.ri.vadd(i, l.ri), l.ri.vsub(s.position, l.ri), l.rj.vadd(o, l.rj), l.rj.vsub(a.position, l.rj), this.result.push(l), this.createFrictionEquationsFromContact(l, this.frictionResult)
            };
            var w = new l,
                S = new l,
                b = new l;
            o.prototype[s.types.PLANE | s.types.TRIMESH] = o.prototype.planeTrimesh = function(t, e, i, o, n, r, s, a) {
                var h = new l,
                    u = w;
                u.set(0, 0, 1), n.vmult(u, u);
                for (var d = 0; d < e.vertices.length / 3; d++) {
                    e.getVertex(d, h);
                    var p = new l;
                    p.copy(h), c.pointToWorldFrame(o, r, p, h);
                    var f = S;
                    h.vsub(i, f);
                    var m = u.dot(f);
                    if (0 >= m) {
                        var v = this.createContactEquation(s, a, t, e);
                        v.ni.copy(u);
                        var y = b;
                        u.scale(f.dot(u), y), h.vsub(y, y), v.ri.copy(y), v.ri.vsub(s.position, v.ri), v.rj.copy(h), v.rj.vsub(a.position, v.rj), this.result.push(v), this.createFrictionEquationsFromContact(v, this.frictionResult)
                    }
                }
            };
            var x = new l,
                A = new l,
                T = (new l, new l),
                N = new l,
                R = new l,
                C = new l,
                P = new l,
                I = new l,
                O = new l,
                L = new l,
                M = new l,
                B = new l,
                F = new l,
                H = new r,
                V = [];
            o.prototype[s.types.SPHERE | s.types.TRIMESH] = o.prototype.sphereTrimesh = function(t, e, i, o, n, r, s, l) {
                var h = R,
                    u = C,
                    d = P,
                    p = I,
                    f = O,
                    m = L,
                    v = H,
                    y = N,
                    g = A,
                    _ = V;
                c.pointToLocalFrame(o, r, i, f);
                var E = t.radius;
                v.lowerBound.set(f.x - E, f.y - E, f.z - E), v.upperBound.set(f.x + E, f.y + E, f.z + E), e.getTrianglesInAABB(v, _);
                for (var w = T, S = t.radius * t.radius, b = 0; b < _.length; b++)
                    for (var D = 0; 3 > D; D++)
                        if (e.getVertex(e.indices[3 * _[b] + D], w), w.vsub(f, g), g.norm2() <= S) {
                            y.copy(w), c.pointToWorldFrame(o, r, y, w), w.vsub(i, g);
                            var z = this.createContactEquation(s, l, t, e);
                            z.ni.copy(g), z.ni.normalize(), z.ri.copy(z.ni), z.ri.scale(t.radius, z.ri), z.ri.vadd(i, z.ri), z.ri.vsub(s.position, z.ri), z.rj.copy(w), z.rj.vsub(l.position, z.rj), this.result.push(z), this.createFrictionEquationsFromContact(z, this.frictionResult)
                        }
                for (var b = 0; b < _.length; b++)
                    for (var D = 0; 3 > D; D++) {
                        e.getVertex(e.indices[3 * _[b] + D], h), e.getVertex(e.indices[3 * _[b] + (D + 1) % 3], u), u.vsub(h, d), f.vsub(u, m);
                        var k = m.dot(d);
                        f.vsub(h, m);
                        var j = m.dot(d);
                        if (j > 0 && 0 > k) {
                            f.vsub(h, m), p.copy(d), p.normalize(), j = m.dot(p), p.scale(j, m), m.vadd(h, m);
                            var W = m.distanceTo(f);
                            if (W < t.radius) {
                                var z = this.createContactEquation(s, l, t, e);
                                m.vsub(f, z.ni), z.ni.normalize(), z.ni.scale(t.radius, z.ri), c.pointToWorldFrame(o, r, m, m), m.vsub(l.position, z.rj), c.vectorToWorldFrame(r, z.ni, z.ni), c.vectorToWorldFrame(r, z.ri, z.ri), this.result.push(z), this.createFrictionEquationsFromContact(z, this.frictionResult)
                            }
                        }
                    }
                for (var q = M, G = B, X = F, Y = x, b = 0, U = _.length; b !== U; b++) {
                    e.getTriangleVertices(_[b], q, G, X), e.getNormal(_[b], Y), f.vsub(q, m);
                    var W = m.dot(Y);
                    if (Y.scale(W, m), f.vsub(m, m), W = m.distanceTo(f), a.pointInTriangle(m, q, G, X) && W < t.radius) {
                        var z = this.createContactEquation(s, l, t, e);
                        m.vsub(f, z.ni), z.ni.normalize(), z.ni.scale(t.radius, z.ri), c.pointToWorldFrame(o, r, m, m), m.vsub(l.position, z.rj), c.vectorToWorldFrame(r, z.ni, z.ni), c.vectorToWorldFrame(r, z.ri, z.ri), this.result.push(z), this.createFrictionEquationsFromContact(z, this.frictionResult)
                    }
                }
                _.length = 0
            };
            var D = new l,
                z = new l;
            o.prototype[s.types.SPHERE | s.types.PLANE] = o.prototype.spherePlane = function(t, e, i, o, n, r, s, a) {
                var l = this.createContactEquation(s, a, t, e);
                if (l.ni.set(0, 0, 1), r.vmult(l.ni, l.ni), l.ni.negate(l.ni), l.ni.normalize(), l.ni.mult(t.radius, l.ri), i.vsub(o, D), l.ni.mult(l.ni.dot(D), z), D.vsub(z, l.rj), -D.dot(l.ni) <= t.radius) {
                    var c = l.ri,
                        h = l.rj;
                    c.vadd(i, c), c.vsub(s.position, c), h.vadd(o, h), h.vsub(a.position, h), this.result.push(l), this.createFrictionEquationsFromContact(l, this.frictionResult)
                }
            };
            var k = new l,
                j = new l,
                W = new l,
                q = new l,
                G = new l,
                X = new l,
                Y = new l,
                U = [new l, new l, new l, new l, new l, new l],
                Z = new l,
                K = new l,
                Q = new l,
                $ = new l;
            o.prototype[s.types.SPHERE | s.types.BOX] = o.prototype.sphereBox = function(t, e, i, o, n, r, s, a) {
                var l = this.v3pool,
                    c = U;
                i.vsub(o, q), e.getSideNormals(c, r);
                for (var h = t.radius, u = !1, d = K, p = Q, f = $, m = null, v = 0, y = 0, g = 0, _ = null, E = 0, w = c.length; E !== w && u === !1; E++) {
                    var S = G;
                    S.copy(c[E]);
                    var b = S.norm();
                    S.normalize();
                    var x = q.dot(S);
                    if (b + h > x && x > 0) {
                        var A = X,
                            T = Y;
                        A.copy(c[(E + 1) % 3]), T.copy(c[(E + 2) % 3]);
                        var N = A.norm(),
                            R = T.norm();
                        A.normalize(), T.normalize();
                        var C = q.dot(A),
                            P = q.dot(T);
                        if (N > C && C > -N && R > P && P > -R) {
                            var I = Math.abs(x - b - h);
                            (null === _ || _ > I) && (_ = I, y = C, g = P, m = b, d.copy(S), p.copy(A), f.copy(T), v++)
                        }
                    }
                }
                if (v) {
                    u = !0;
                    var O = this.createContactEquation(s, a, t, e);
                    d.mult(-h, O.ri), O.ni.copy(d), O.ni.negate(O.ni), d.mult(m, d), p.mult(y, p), d.vadd(p, d), f.mult(g, f), d.vadd(f, O.rj), O.ri.vadd(i, O.ri), O.ri.vsub(s.position, O.ri), O.rj.vadd(o, O.rj), O.rj.vsub(a.position, O.rj), this.result.push(O), this.createFrictionEquationsFromContact(O, this.frictionResult)
                }
                for (var L = l.get(), M = Z, B = 0; 2 !== B && !u; B++)
                    for (var F = 0; 2 !== F && !u; F++)
                        for (var H = 0; 2 !== H && !u; H++)
                            if (L.set(0, 0, 0), B ? L.vadd(c[0], L) : L.vsub(c[0], L), F ? L.vadd(c[1], L) : L.vsub(c[1], L), H ? L.vadd(c[2], L) : L.vsub(c[2], L), o.vadd(L, M), M.vsub(i, M), M.norm2() < h * h) {
                                u = !0;
                                var O = this.createContactEquation(s, a, t, e);
                                O.ri.copy(M), O.ri.normalize(), O.ni.copy(O.ri), O.ri.mult(h, O.ri), O.rj.copy(L), O.ri.vadd(i, O.ri), O.ri.vsub(s.position, O.ri), O.rj.vadd(o, O.rj), O.rj.vsub(a.position, O.rj), this.result.push(O), this.createFrictionEquationsFromContact(O, this.frictionResult)
                            }
                l.release(L), L = null;
                for (var V = l.get(), D = l.get(), O = l.get(), z = l.get(), I = l.get(), k = c.length, B = 0; B !== k && !u; B++)
                    for (var F = 0; F !== k && !u; F++)
                        if (B % 3 !== F % 3) {
                            c[F].cross(c[B], V), V.normalize(), c[B].vadd(c[F], D), O.copy(i), O.vsub(D, O), O.vsub(o, O);
                            var j = O.dot(V);
                            V.mult(j, z);
                            for (var H = 0; H === B % 3 || H === F % 3;) H++;
                            I.copy(i), I.vsub(z, I), I.vsub(D, I), I.vsub(o, I);
                            var W = Math.abs(j),
                                J = I.norm();
                            if (W < c[H].norm() && h > J) {
                                u = !0;
                                var tt = this.createContactEquation(s, a, t, e);
                                D.vadd(z, tt.rj), tt.rj.copy(tt.rj), I.negate(tt.ni), tt.ni.normalize(), tt.ri.copy(tt.rj), tt.ri.vadd(o, tt.ri), tt.ri.vsub(i, tt.ri), tt.ri.normalize(), tt.ri.mult(h, tt.ri), tt.ri.vadd(i, tt.ri), tt.ri.vsub(s.position, tt.ri), tt.rj.vadd(o, tt.rj), tt.rj.vsub(a.position, tt.rj), this.result.push(tt), this.createFrictionEquationsFromContact(tt, this.frictionResult)
                            }
                        }
                l.release(V, D, O, z, I)
            };
            var J = new l,
                tt = new l,
                et = new l,
                it = new l,
                ot = new l,
                nt = new l,
                rt = new l,
                st = new l,
                at = new l,
                lt = new l;
            o.prototype[s.types.SPHERE | s.types.CONVEXPOLYHEDRON] = o.prototype.sphereConvex = function(t, e, i, o, r, s, a, l) {
                var c = this.v3pool;
                i.vsub(o, J);
                for (var h = e.faceNormals, u = e.faces, d = e.vertices, p = t.radius, f = 0; f !== d.length; f++) {
                    var m = d[f],
                        v = ot;
                    s.vmult(m, v), o.vadd(v, v);
                    var y = it;
                    if (v.vsub(i, y), y.norm2() < p * p) {
                        _ = !0;
                        var g = this.createContactEquation(a, l, t, e);
                        return g.ri.copy(y), g.ri.normalize(), g.ni.copy(g.ri), g.ri.mult(p, g.ri), v.vsub(o, g.rj), g.ri.vadd(i, g.ri), g.ri.vsub(a.position, g.ri), g.rj.vadd(o, g.rj), g.rj.vsub(l.position, g.rj), this.result.push(g), void this.createFrictionEquationsFromContact(g, this.frictionResult)
                    }
                }
                for (var _ = !1, f = 0, E = u.length; f !== E && _ === !1; f++) {
                    var w = h[f],
                        S = u[f],
                        b = nt;
                    s.vmult(w, b);
                    var x = rt;
                    s.vmult(d[S[0]], x), x.vadd(o, x);
                    var A = st;
                    b.mult(-p, A), i.vadd(A, A);
                    var T = at;
                    A.vsub(x, T);
                    var N = T.dot(b),
                        R = lt;
                    if (i.vsub(x, R), 0 > N && R.dot(b) > 0) {
                        for (var C = [], P = 0, I = S.length; P !== I; P++) {
                            var O = c.get();
                            s.vmult(d[S[P]], O), o.vadd(O, O), C.push(O)
                        }
                        if (n(C, b, i)) {
                            _ = !0;
                            var g = this.createContactEquation(a, l, t, e);
                            b.mult(-p, g.ri), b.negate(g.ni);
                            var L = c.get();
                            b.mult(-N, L);
                            var M = c.get();
                            b.mult(-p, M), i.vsub(o, g.rj), g.rj.vadd(M, g.rj), g.rj.vadd(L, g.rj), g.rj.vadd(o, g.rj), g.rj.vsub(l.position, g.rj), g.ri.vadd(i, g.ri), g.ri.vsub(a.position, g.ri), c.release(L), c.release(M), this.result.push(g), this.createFrictionEquationsFromContact(g, this.frictionResult);
                            for (var P = 0, B = C.length; P !== B; P++) c.release(C[P]);
                            return
                        }
                        for (var P = 0; P !== S.length; P++) {
                            var F = c.get(),
                                H = c.get();
                            s.vmult(d[S[(P + 1) % S.length]], F), s.vmult(d[S[(P + 2) % S.length]], H), o.vadd(F, F), o.vadd(H, H);
                            var V = tt;
                            H.vsub(F, V);
                            var D = et;
                            V.unit(D);
                            var z = c.get(),
                                k = c.get();
                            i.vsub(F, k);
                            var j = k.dot(D);
                            D.mult(j, z), z.vadd(F, z);
                            var W = c.get();
                            if (z.vsub(i, W), j > 0 && j * j < V.norm2() && W.norm2() < p * p) {
                                var g = this.createContactEquation(a, l, t, e);
                                z.vsub(o, g.rj), z.vsub(i, g.ni), g.ni.normalize(), g.ni.mult(p, g.ri), g.rj.vadd(o, g.rj), g.rj.vsub(l.position, g.rj), g.ri.vadd(i, g.ri), g.ri.vsub(a.position, g.ri), this.result.push(g), this.createFrictionEquationsFromContact(g, this.frictionResult);
                                for (var P = 0, B = C.length; P !== B; P++) c.release(C[P]);
                                return c.release(F), c.release(H), c.release(z), c.release(W), void c.release(k)
                            }
                            c.release(F), c.release(H), c.release(z), c.release(W), c.release(k)
                        }
                        for (var P = 0, B = C.length; P !== B; P++) c.release(C[P])
                    }
                }
            };
            new l, new l;
            o.prototype[s.types.PLANE | s.types.BOX] = o.prototype.planeBox = function(t, e, i, o, n, r, s, a) {
                e.convexPolyhedronRepresentation.material = e.material, e.convexPolyhedronRepresentation.collisionResponse = e.collisionResponse, this.planeConvex(t, e.convexPolyhedronRepresentation, i, o, n, r, s, a)
            };
            var ct = new l,
                ht = new l,
                ut = new l,
                dt = new l;
            o.prototype[s.types.PLANE | s.types.CONVEXPOLYHEDRON] = o.prototype.planeConvex = function(t, e, i, o, n, r, s, a) {
                var l = ct,
                    c = ht;
                c.set(0, 0, 1), n.vmult(c, c);
                for (var h = 0, u = ut, d = 0; d !== e.vertices.length; d++) {
                    l.copy(e.vertices[d]), r.vmult(l, l), o.vadd(l, l), l.vsub(i, u);
                    var p = c.dot(u);
                    if (0 >= p) {
                        var f = this.createContactEquation(s, a, t, e),
                            m = dt;
                        c.mult(c.dot(u), m), l.vsub(m, m), m.vsub(i, f.ri), f.ni.copy(c), l.vsub(o, f.rj), f.ri.vadd(i, f.ri), f.ri.vsub(s.position, f.ri), f.rj.vadd(o, f.rj), f.rj.vsub(a.position, f.rj), this.result.push(f), h++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(f, this.frictionResult)
                    }
                }
                this.enableFrictionReduction && h && this.createFrictionFromAverage(h)
            };
            var pt = new l,
                ft = new l;
            o.prototype[s.types.CONVEXPOLYHEDRON] = o.prototype.convexConvex = function(t, e, i, o, n, r, s, a, l, c, h, u) {
                var d = pt;
                if (!(i.distanceTo(o) > t.boundingSphereRadius + e.boundingSphereRadius) && t.findSeparatingAxis(e, i, n, o, r, d, h, u)) {
                    var p = [],
                        f = ft;
                    t.clipAgainstHull(i, n, e, o, r, d, -100, 100, p);
                    for (var m = 0, v = 0; v !== p.length; v++) {
                        var y = this.createContactEquation(s, a, t, e, l, c),
                            g = y.ri,
                            _ = y.rj;
                        d.negate(y.ni), p[v].normal.negate(f), f.mult(p[v].depth, f), p[v].point.vadd(f, g), _.copy(p[v].point), g.vsub(i, g), _.vsub(o, _), g.vadd(i, g), g.vsub(s.position, g), _.vadd(o, _), _.vsub(a.position, _), this.result.push(y), m++, this.enableFrictionReduction || this.createFrictionEquationsFromContact(y, this.frictionResult)
                    }
                    this.enableFrictionReduction && m && this.createFrictionFromAverage(m)
                }
            };
            var mt = new l,
                vt = new l,
                yt = new l;
            o.prototype[s.types.PLANE | s.types.PARTICLE] = o.prototype.planeParticle = function(t, e, i, o, n, r, s, a) {
                var l = mt;
                l.set(0, 0, 1), s.quaternion.vmult(l, l);
                var c = vt;
                o.vsub(s.position, c);
                var h = l.dot(c);
                if (0 >= h) {
                    var u = this.createContactEquation(a, s, e, t);
                    u.ni.copy(l), u.ni.negate(u.ni), u.ri.set(0, 0, 0);
                    var d = yt;
                    l.mult(l.dot(o), d), o.vsub(d, d), u.rj.copy(d), this.result.push(u), this.createFrictionEquationsFromContact(u, this.frictionResult)
                }
            };
            var gt = new l;
            o.prototype[s.types.PARTICLE | s.types.SPHERE] = o.prototype.sphereParticle = function(t, e, i, o, n, r, s, a) {
                var l = gt;
                l.set(0, 0, 1), o.vsub(i, l);
                var c = l.norm2();
                if (c <= t.radius * t.radius) {
                    var h = this.createContactEquation(a, s, e, t);
                    l.normalize(), h.rj.copy(l), h.rj.mult(t.radius, h.rj), h.ni.copy(l), h.ni.negate(h.ni), h.ri.set(0, 0, 0), this.result.push(h), this.createFrictionEquationsFromContact(h, this.frictionResult)
                }
            };
            var _t = new h,
                Et = new l,
                wt = (new l, new l),
                St = new l,
                bt = new l;
            o.prototype[s.types.PARTICLE | s.types.CONVEXPOLYHEDRON] = o.prototype.convexParticle = function(t, e, i, o, n, r, s, a) {
                var l = -1,
                    c = wt,
                    h = bt,
                    u = null,
                    d = 0,
                    p = Et;
                if (p.copy(o), p.vsub(i, p), n.conjugate(_t), _t.vmult(p, p), t.pointIsInside(p)) {
                    t.worldVerticesNeedsUpdate && t.computeWorldVertices(i, n), t.worldFaceNormalsNeedsUpdate && t.computeWorldFaceNormals(n);
                    for (var f = 0, m = t.faces.length; f !== m; f++) {
                        var v = [t.worldVertices[t.faces[f][0]]],
                            y = t.worldFaceNormals[f];
                        o.vsub(v[0], St);
                        var g = -y.dot(St);
                        (null === u || Math.abs(g) < Math.abs(u)) && (u = g, l = f, c.copy(y), d++)
                    }
                    if (-1 !== l) {
                        var _ = this.createContactEquation(a, s, e, t);
                        c.mult(u, h), h.vadd(o, h), h.vsub(i, h), _.rj.copy(h), c.negate(_.ni), _.ri.set(0, 0, 0);
                        var E = _.ri,
                            w = _.rj;
                        E.vadd(o, E), E.vsub(a.position, E), w.vadd(i, w), w.vsub(s.position, w), this.result.push(_), this.createFrictionEquationsFromContact(_, this.frictionResult)
                    } else console.warn("Point found inside convex, but did not find penetrating face!")
                }
            }, o.prototype[s.types.BOX | s.types.HEIGHTFIELD] = o.prototype.boxHeightfield = function(t, e, i, o, n, r, s, a) {
                t.convexPolyhedronRepresentation.material = t.material, t.convexPolyhedronRepresentation.collisionResponse = t.collisionResponse, this.convexHeightfield(t.convexPolyhedronRepresentation, e, i, o, n, r, s, a)
            };
            var xt = new l,
                At = new l,
                Tt = [0];
            o.prototype[s.types.CONVEXPOLYHEDRON | s.types.HEIGHTFIELD] = o.prototype.convexHeightfield = function(t, e, i, o, n, r, s, a) {
                var l = e.data,
                    h = e.elementSize,
                    u = t.boundingSphereRadius,
                    d = At,
                    p = Tt,
                    f = xt;
                c.pointToLocalFrame(o, r, i, f);
                var m = Math.floor((f.x - u) / h) - 1,
                    v = Math.ceil((f.x + u) / h) + 1,
                    y = Math.floor((f.y - u) / h) - 1,
                    g = Math.ceil((f.y + u) / h) + 1;
                if (!(0 > v || 0 > g || m > l.length || y > l[0].length)) {
                    0 > m && (m = 0), 0 > v && (v = 0), 0 > y && (y = 0), 0 > g && (g = 0), m >= l.length && (m = l.length - 1), v >= l.length && (v = l.length - 1), g >= l[0].length && (g = l[0].length - 1), y >= l[0].length && (y = l[0].length - 1);
                    var _ = [];
                    e.getRectMinMax(m, y, v, g, _);
                    var E = _[0],
                        w = _[1];
                    if (!(f.z - u > w || f.z + u < E))
                        for (var S = m; v > S; S++)
                            for (var b = y; g > b; b++) e.getConvexTrianglePillar(S, b, !1), c.pointToWorldFrame(o, r, e.pillarOffset, d), i.distanceTo(d) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && this.convexConvex(t, e.pillarConvex, i, d, n, r, s, a, null, null, p, null), e.getConvexTrianglePillar(S, b, !0), c.pointToWorldFrame(o, r, e.pillarOffset, d), i.distanceTo(d) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && this.convexConvex(t, e.pillarConvex, i, d, n, r, s, a, null, null, p, null)
                }
            };
            var Nt = new l,
                Rt = new l;
            o.prototype[s.types.SPHERE | s.types.HEIGHTFIELD] = o.prototype.sphereHeightfield = function(t, e, i, o, n, r, s, a) {
                var l = e.data,
                    h = t.radius,
                    u = e.elementSize,
                    d = Rt,
                    p = Nt;
                c.pointToLocalFrame(o, r, i, p);
                var f = Math.floor((p.x - h) / u) - 1,
                    m = Math.ceil((p.x + h) / u) + 1,
                    v = Math.floor((p.y - h) / u) - 1,
                    y = Math.ceil((p.y + h) / u) + 1;
                if (!(0 > m || 0 > y || f > l.length || y > l[0].length)) {
                    0 > f && (f = 0), 0 > m && (m = 0), 0 > v && (v = 0), 0 > y && (y = 0), f >= l.length && (f = l.length - 1), m >= l.length && (m = l.length - 1), y >= l[0].length && (y = l[0].length - 1), v >= l[0].length && (v = l[0].length - 1);
                    var g = [];
                    e.getRectMinMax(f, v, m, y, g);
                    var _ = g[0],
                        E = g[1];
                    if (!(p.z - h > E || p.z + h < _))
                        for (var w = this.result, S = f; m > S; S++)
                            for (var b = v; y > b; b++) {
                                var x = w.length;
                                e.getConvexTrianglePillar(S, b, !1), c.pointToWorldFrame(o, r, e.pillarOffset, d), i.distanceTo(d) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && this.sphereConvex(t, e.pillarConvex, i, d, n, r, s, a), e.getConvexTrianglePillar(S, b, !0), c.pointToWorldFrame(o, r, e.pillarOffset, d), i.distanceTo(d) < e.pillarConvex.boundingSphereRadius + t.boundingSphereRadius && this.sphereConvex(t, e.pillarConvex, i, d, n, r, s, a);
                                var A = w.length - x;
                                if (A > 2) return
                            }
                }
            }
        }, {
            "../collision/AABB": 3,
            "../collision/Ray": 9,
            "../equations/ContactEquation": 19,
            "../equations/FrictionEquation": 21,
            "../math/Quaternion": 28,
            "../math/Transform": 29,
            "../math/Vec3": 30,
            "../shapes/ConvexPolyhedron": 38,
            "../shapes/Shape": 43,
            "../solver/Solver": 47,
            "../utils/Vec3Pool": 54
        }],
        56: [function(t, e, i) {
            function o() {
                c.apply(this), this.dt = -1, this.allowSleep = !1, this.contacts = [], this.frictionEquations = [], this.quatNormalizeSkip = 0, this.quatNormalizeFast = !1, this.time = 0, this.stepnumber = 0, this.default_dt = 1 / 60, this.nextId = 0, this.gravity = new r, this.broadphase = new g, this.bodies = [], this.solver = new a, this.constraints = [], this.narrowphase = new l(this), this.collisionMatrix = new h, this.collisionMatrixPrevious = new h, this.materials = [], this.contactmaterials = [], this.contactMaterialTable = new f, this.defaultMaterial = new u("default"), this.defaultContactMaterial = new d(this.defaultMaterial, this.defaultMaterial, {
                    friction: .3,
                    restitution: 0
                }), this.doProfiling = !1, this.profile = {
                    solve: 0,
                    makeContactConstraints: 0,
                    broadphase: 0,
                    integrate: 0,
                    narrowphase: 0
                }, this.subsystems = [], this.addBodyEvent = {
                    type: "addBody",
                    body: null
                }, this.removeBodyEvent = {
                    type: "removeBody",
                    body: null
                }
            }
            e.exports = o;
            var n = t("../shapes/Shape"),
                r = t("../math/Vec3"),
                s = t("../math/Quaternion"),
                a = t("../solver/GSSolver"),
                l = (t("../utils/Vec3Pool"), t("../equations/ContactEquation"), t("../equations/FrictionEquation"), t("./Narrowphase")),
                c = t("../utils/EventTarget"),
                h = t("../collision/ArrayCollisionMatrix"),
                u = t("../material/Material"),
                d = t("../material/ContactMaterial"),
                p = t("../objects/Body"),
                f = t("../utils/TupleDictionary"),
                m = t("../collision/RaycastResult"),
                v = t("../collision/AABB"),
                y = t("../collision/Ray"),
                g = t("../collision/NaiveBroadphase");
            o.prototype = new c;
            var _ = (new v, new y);
            if (o.prototype.getContactMaterial = function(t, e) {
                    return this.contactMaterialTable.get(t.id, e.id)
                }, o.prototype.numObjects = function() {
                    return this.bodies.length
                }, o.prototype.collisionMatrixTick = function() {
                    var t = this.collisionMatrixPrevious;
                    this.collisionMatrixPrevious = this.collisionMatrix, this.collisionMatrix = t, this.collisionMatrix.reset()
                }, o.prototype.add = o.prototype.addBody = function(t) {
                    -1 === this.bodies.indexOf(t) && (t.index = this.bodies.length, this.bodies.push(t), t.world = this, t.initPosition.copy(t.position), t.initVelocity.copy(t.velocity), t.timeLastSleepy = this.time, t instanceof p && (t.initAngularVelocity.copy(t.angularVelocity), t.initQuaternion.copy(t.quaternion)), this.collisionMatrix.setNumObjects(this.bodies.length), this.addBodyEvent.body = t, this.dispatchEvent(this.addBodyEvent))
                }, o.prototype.addConstraint = function(t) {
                    this.constraints.push(t)
                }, o.prototype.removeConstraint = function(t) {
                    var e = this.constraints.indexOf(t); - 1 !== e && this.constraints.splice(e, 1)
                }, o.prototype.rayTest = function(t, e, i) {
                    i instanceof m ? this.raycastClosest(t, e, {
                        skipBackfaces: !0
                    }, i) : this.raycastAll(t, e, {
                        skipBackfaces: !0
                    }, i)
                }, o.prototype.raycastAll = function(t, e, i, o) {
                    return i.mode = y.ALL, i.from = t, i.to = e, i.callback = o, _.intersectWorld(this, i)
                }, o.prototype.raycastAny = function(t, e, i, o) {
                    return i.mode = y.ANY, i.from = t, i.to = e, i.result = o, _.intersectWorld(this, i)
                }, o.prototype.raycastClosest = function(t, e, i, o) {
                    return i.mode = y.CLOSEST, i.from = t, i.to = e, i.result = o, _.intersectWorld(this, i)
                }, o.prototype.remove = function(t) {
                    t.world = null;
                    var e = this.bodies.length - 1,
                        i = this.bodies,
                        o = i.indexOf(t);
                    if (-1 !== o) {
                        i.splice(o, 1);
                        for (var n = 0; n !== i.length; n++) i[n].index = n;
                        this.collisionMatrix.setNumObjects(e), this.removeBodyEvent.body = t, this.dispatchEvent(this.removeBodyEvent)
                    }
                }, o.prototype.removeBody = o.prototype.remove, o.prototype.addMaterial = function(t) {
                    this.materials.push(t)
                }, o.prototype.addContactMaterial = function(t) {
                    this.contactmaterials.push(t), this.contactMaterialTable.set(t.materials[0].id, t.materials[1].id, t)
                }, "undefined" == typeof performance && (performance = {}), !performance.now) {
                var E = Date.now();
                performance.timing && performance.timing.navigationStart && (E = performance.timing.navigationStart), performance.now = function() {
                    return Date.now() - E
                }
            }
            var w = new r;
            o.prototype.step = function(t, e, i) {
                if (i = i || 10, e = e || 0, 0 === e) this.internalStep(t), this.time += t;
                else {
                    var o = Math.floor((this.time + e) / t) - Math.floor(this.time / t);
                    o = Math.min(o, i);
                    for (var n = performance.now(), r = 0; r !== o && (this.internalStep(t), !(performance.now() - n > 1e3 * t)); r++);
                    this.time += e;
                    for (var s = this.time % t, a = s / t, l = w, c = this.bodies, h = 0; h !== c.length; h++) {
                        var u = c[h];
                        u.type !== p.STATIC && u.sleepState !== p.SLEEPING ? (u.position.vsub(u.previousPosition, l), l.scale(a, l), u.position.vadd(l, u.interpolatedPosition)) : (u.interpolatedPosition.copy(u.position), u.interpolatedQuaternion.copy(u.quaternion))
                    }
                }
            };
            var S = {
                    type: "postStep"
                },
                b = {
                    type: "preStep"
                },
                x = {
                    type: "collide",
                    body: null,
                    contact: null
                },
                A = [],
                T = [],
                N = [],
                R = [],
                C = (new r, new r, new r, new r, new r, new r, new r, new r, new r, new s, new s),
                P = new s,
                I = new r;
            o.prototype.internalStep = function(t) {
                this.dt = t;
                var e, i = this.contacts,
                    o = N,
                    r = R,
                    s = this.numObjects(),
                    a = this.bodies,
                    l = this.solver,
                    c = this.gravity,
                    h = this.doProfiling,
                    u = this.profile,
                    d = p.DYNAMIC,
                    f = this.constraints,
                    m = T,
                    v = (c.norm(), c.x),
                    y = c.y,
                    g = c.z,
                    _ = 0;
                for (h && (e = performance.now()), _ = 0; _ !== s; _++) {
                    var E = a[_];
                    if (E.type & d) {
                        var w = E.force,
                            O = E.mass;
                        w.x += O * v, w.y += O * y, w.z += O * g
                    }
                }
                for (var _ = 0, L = this.subsystems.length; _ !== L; _++) this.subsystems[_].update();
                h && (e = performance.now()), o.length = 0, r.length = 0, this.broadphase.collisionPairs(this, o, r), h && (u.broadphase = performance.now() - e);
                var M = f.length;
                for (_ = 0; _ !== M; _++) {
                    var B = f[_];
                    if (!B.collideConnected)
                        for (var F = o.length - 1; F >= 0; F -= 1)(B.bodyA === o[F] && B.bodyB === r[F] || B.bodyB === o[F] && B.bodyA === r[F]) && (o.splice(F, 1), r.splice(F, 1))
                }
                this.collisionMatrixTick(), h && (e = performance.now());
                var H = A,
                    V = i.length;
                for (_ = 0; _ !== V; _++) H.push(i[_]);
                i.length = 0;
                var D = this.frictionEquations.length;
                for (_ = 0; _ !== D; _++) m.push(this.frictionEquations[_]);
                this.frictionEquations.length = 0, this.narrowphase.getContacts(o, r, this, i, H, this.frictionEquations, m), h && (u.narrowphase = performance.now() - e), h && (e = performance.now());
                for (var _ = 0; _ < this.frictionEquations.length; _++) l.addEquation(this.frictionEquations[_]);
                for (var z = i.length, k = 0; k !== z; k++) {
                    var j, B = i[k],
                        E = B.bi,
                        W = B.bj;
                    B.si, B.sj;
                    j = E.material && W.material ? this.getContactMaterial(E.material, W.material) || this.defaultContactMaterial : this.defaultContactMaterial;
                    var q = j.friction;
                    if (E.material && W.material && (E.material.friction >= 0 && W.material.friction >= 0 && (q = E.material.friction * W.material.friction), E.material.restitution >= 0 && W.material.restitution >= 0 && (B.restitution = E.material.restitution * W.material.restitution)), l.addEquation(B), E.allowSleep && E.type === p.DYNAMIC && E.sleepState === p.SLEEPING && W.sleepState === p.AWAKE && W.type !== p.STATIC) {
                        var G = W.velocity.norm2() + W.angularVelocity.norm2(),
                            X = Math.pow(W.sleepSpeedLimit, 2);
                        G >= 2 * X && (E._wakeUpAfterNarrowphase = !0)
                    }
                    if (W.allowSleep && W.type === p.DYNAMIC && W.sleepState === p.SLEEPING && E.sleepState === p.AWAKE && E.type !== p.STATIC) {
                        var Y = E.velocity.norm2() + E.angularVelocity.norm2(),
                            U = Math.pow(E.sleepSpeedLimit, 2);
                        Y >= 2 * U && (W._wakeUpAfterNarrowphase = !0)
                    }
                    this.collisionMatrix.set(E, W, !0), this.collisionMatrixPrevious.get(E, W) || (x.body = W, x.contact = B, E.dispatchEvent(x), x.body = E, W.dispatchEvent(x))
                }
                for (h && (u.makeContactConstraints = performance.now() - e, e = performance.now()), _ = 0; _ !== s; _++) {
                    var E = a[_];
                    E._wakeUpAfterNarrowphase && (E.wakeUp(), E._wakeUpAfterNarrowphase = !1)
                }
                var M = f.length;
                for (_ = 0; _ !== M; _++) {
                    var B = f[_];
                    B.update();
                    for (var F = 0, Z = B.equations.length; F !== Z; F++) {
                        var K = B.equations[F];
                        l.addEquation(K)
                    }
                }
                l.solve(t, this), h && (u.solve = performance.now() - e), l.removeAllEquations();
                var Q = Math.pow;
                for (_ = 0; _ !== s; _++) {
                    var E = a[_];
                    if (E.type & d) {
                        var $ = Q(1 - E.linearDamping, t),
                            J = E.velocity;
                        J.mult($, J);
                        var tt = E.angularVelocity;
                        if (tt) {
                            var et = Q(1 - E.angularDamping, t);
                            tt.mult(et, tt)
                        }
                    }
                }
                for (this.dispatchEvent(b), _ = 0; _ !== s; _++) {
                    var E = a[_];
                    E.preStep && E.preStep.call(E)
                }
                h && (e = performance.now());
                var it = C,
                    ot = P,
                    nt = this.stepnumber,
                    rt = p.DYNAMIC | p.KINEMATIC,
                    st = nt % (this.quatNormalizeSkip + 1) === 0,
                    at = this.quatNormalizeFast,
                    lt = .5 * t;
                n.types.PLANE, n.types.CONVEXPOLYHEDRON;
                for (_ = 0; _ !== s; _++) {
                    var ct = a[_],
                        ht = ct.force,
                        ut = ct.torque;
                    if (ct.type & rt && ct.sleepState !== p.SLEEPING) {
                        var dt = ct.velocity,
                            pt = ct.angularVelocity,
                            ft = ct.position,
                            mt = ct.quaternion,
                            vt = ct.invMass,
                            yt = ct.invInertiaWorld;
                        dt.x += ht.x * vt * t, dt.y += ht.y * vt * t, dt.z += ht.z * vt * t, ct.angularVelocity && (yt.vmult(ut, I), I.mult(t, I), I.vadd(pt, pt)), ft.x += dt.x * t, ft.y += dt.y * t, ft.z += dt.z * t, ct.angularVelocity && (it.set(pt.x, pt.y, pt.z, 0), it.mult(mt, ot), mt.x += lt * ot.x, mt.y += lt * ot.y, mt.z += lt * ot.z, mt.w += lt * ot.w, st && (at ? mt.normalizeFast() : mt.normalize())), ct.aabb && (ct.aabbNeedsUpdate = !0), ct.updateInertiaWorld && ct.updateInertiaWorld()
                    }
                }
                for (this.clearForces(), this.broadphase.dirty = !0, h && (u.integrate = performance.now() - e), this.time += t, this.stepnumber += 1, this.dispatchEvent(S), _ = 0; _ !== s; _++) {
                    var E = a[_],
                        gt = E.postStep;
                    gt && gt.call(E)
                }
                if (this.allowSleep)
                    for (_ = 0; _ !== s; _++) a[_].sleepTick(this.time)
            }, o.prototype.clearForces = function() {
                for (var t = this.bodies, e = t.length, i = 0; i !== e; i++) {
                    var o = t[i];
                    o.force, o.torque;
                    o.force.set(0, 0, 0), o.torque.set(0, 0, 0)
                }
            }
        }, {
            "../collision/AABB": 3,
            "../collision/ArrayCollisionMatrix": 4,
            "../collision/NaiveBroadphase": 7,
            "../collision/Ray": 9,
            "../collision/RaycastResult": 10,
            "../equations/ContactEquation": 19,
            "../equations/FrictionEquation": 21,
            "../material/ContactMaterial": 24,
            "../material/Material": 25,
            "../math/Quaternion": 28,
            "../math/Vec3": 30,
            "../objects/Body": 31,
            "../shapes/Shape": 43,
            "../solver/GSSolver": 46,
            "../utils/EventTarget": 49,
            "../utils/TupleDictionary": 52,
            "../utils/Vec3Pool": 54,
            "./Narrowphase": 55
        }]
    }, {}, [2])(2)
});
var s_iOffsetX = 0,
    s_iOffsetY = 0,
    s_fInverseScaling = 0,
    s_fScaleCanvas = 0;
! function(t) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))
}(navigator.userAgent || navigator.vendor || window.opera), $(window).resize(function() {
        sizeHandler()
    }), window.addEventListener("orientationchange", onOrientationChange), NoClickDelay.prototype = {
        handleEvent: function(t) {
            switch (t.type) {
                case "touchstart":
                    this.onTouchStart(t);
                    break;
                case "touchmove":
                    this.onTouchMove(t);
                    break;
                case "touchend":
                    this.onTouchEnd(t)
            }
        },
        onTouchStart: function(t) {
            t.preventDefault(), this.moved = !1, this.element.addEventListener("touchmove", this, !1), this.element.addEventListener("touchend", this, !1)
        },
        onTouchMove: function(t) {
            this.moved = !0
        },
        onTouchEnd: function(t) {
            if (this.element.removeEventListener("touchmove", this, !1), this.element.removeEventListener("touchend", this, !1), !this.moved) {
                var e = document.elementFromPoint(t.changedTouches[0].clientX, t.changedTouches[0].clientY);
                3 == e.nodeType && (e = e.parentNode);
                var i = document.createEvent("MouseEvents");
                i.initEvent("click", !0, !0), e.dispatchEvent(i)
            }
        }
    },
    function() {
        function t(t) {
            var i = "visible",
                o = "hidden",
                n = {
                    focus: i,
                    focusin: i,
                    pageshow: i,
                    blur: o,
                    focusout: o,
                    pagehide: o
                };
            t = t || window.event, t.type in n ? document.body.className = n[t.type] : (document.body.className = this[e] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
        }
        var e = "hidden";
        e in document ? document.addEventListener("visibilitychange", t) : (e = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", t) : (e = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", t) : (e = "msHidden") in document ? document.addEventListener("msvisibilitychange", t) : "onfocusin" in document ? document.onfocusin = document.onfocusout = t : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = t
    }(), Math.radians = function(t) {
        return t * Math.PI / 180
    }, Math.degrees = function(t) {
        return t * (180 / Math.PI)
    };
var CANVAS_WIDTH = 790,
    CANVAS_HEIGHT = 1410,
    CANVAS_WIDTH_HALF = .5 * CANVAS_WIDTH,
    CANVAS_HEIGHT_HALF = .5 * CANVAS_HEIGHT,
    EDGEBOARD_X = 150,
    EDGEBOARD_Y = 212,
    DISABLE_SOUND_MOBILE = !1,
    FONT_GAME = "Arial",
    SECONDARY_FONT = "blackplotanregular",
    MS_FADE_SOUNDTRACK = 750,
    FPS = 30,
    FPS_DESKTOP = 60,
    FPS_TIME = 1 / FPS,
    ROLL_BALL_RATE = 60 / FPS,
    TIME_REFRESH_DIRECTION = .05,
    TIME_RESET_LAUNCH = 3,
    DIRECTION_VELOCITY = -2,
    DIRECTION_CHARACTER_VELOCITY = 6,
    LAUNCH_TURN = 10,
    TURNS_BOARD_POS = {
        x: 0,
        y: 362
    },
    NUM_SPRITE_MONITOR = 52,
    NUM_SPRITE_PLAYER = 36,
    CHARACTER_START_POS = {
        x: 40,
        y: 702
    },
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    ON_TWEEN_ENDED = 6,
    ON_BUT_NO_DOWN = 7,
    ON_BUT_YES_DOWN = 8,
    STEP_RATE = 1,
    TEXT_SIZE = [80, 100, 130],
    TEXT_EXCELLENT_COLOR = ["#fff", "#5d96fe"],
    TEXT_COLOR = "#ffffff",
    TEXT_COLOR_STROKE = "#000000",
    TIME_INTERVAL_STROBE = .2,
    PHYSICS_ACCURACY = 3,
    BALL_VELOCITY_MULTIPLIER = 1,
    PHYSICS_STEP = 1 / (FPS * STEP_RATE),
    STATE_INIT = 0,
    STATE_PLAY = 1,
    STATE_FINISH = 2,
    STATE_PAUSE = 3,
    TIME_REFRESH_POSITION, MONITOR_STRIKE = 0,
    MONITOR_SPARE = 1,
    MONITOR_GUTTER = 2,
    BALL_MASS = 49,
    BALL_RADIUS = 12.5,
    BALL = 0,
    PINS = 1,
    WALL = 2,
    FLOOR = 3,
    CHANNEL = 4,
    PINS_FLOOR = 4,
    WALL_TRACK = 5,
    SIDE_PINS_FLOOR = 6,
    BALL_LINEAR_DAMPING = 0,
    OFFSET_BALL_POS_X = 10,
    OBJECT, MIN_BALL_VEL_ROTATION = .1,
    FOV = 40,
    INTERVAL_SHOOT = 1,
    DIRECTION = 0,
    POWER = 1,
    EFFECT = 2,
    EFFECT_POWER_RATE = -(.4 * STEP_RATE),
    MIN_FORCE_BALL_GUTTER = -30,
    MAX_EFFECT_ANGLE = 45,
    MONITOR_WAIT_TIME = 1,
    LIMIT_HAND_RANGE_POS = {
        x: 35.2
    },
    POSITION_BALL = {
        x: 0,
        y: 900,
        z: -7 + BALL_RADIUS
    },
    GOAL_LINE_POS = {
        x: 0,
        y: 31,
        z: -2.7
    },
    HAND_KEEPER_SIZE = {
        width: 1.8,
        depth: .5,
        height: 1.5
    },
    WALL_PINS_SIZE = {
        width: 80,
        depth: 1,
        height: 150
    },
    WALL_PINS_DOWN_SIZE = {
        width: 80,
        depth: 100,
        height: 1
    },
    WALL_PINS_FORWARD_SIZE = {
        width: 80,
        depth: 2,
        height: 77
    },
    WALL_PINS_POSITION = {
        x: 0,
        y: -1105,
        z: -27
    },
    WALL_TRACK_POSITION = {
        x: 0,
        y: 0,
        z: 20
    },
    WALL_TRACK_SIZE = {
        width: 1,
        depth: 905,
        height: 100,
        offsetX: 82
    },
    ROOF_TRACK_SIZE = {
        width: 82,
        depth: 70,
        height: 1,
        offsetY: -835
    },
    SIDE_WALL_PINS_SIZE = {
        width: 1,
        depth: 100,
        height: 150
    },
    FLOOR_PINS_SIZE = {
        width: 53,
        depth: 875,
        height: 20
    },
    FLOOR_WALL_PINS_SIZE = {
        width: 80,
        depth: 1,
        height: 100
    },
    FLOOR_WALL_PINS_POSITION = {
        x: 0,
        y: -765,
        z: 20
    },
    FLOOR_PINS_POSITION = {
        x: 0,
        y: -39,
        z: -29
    },
    PINS_BINDER_PROPERTIES = {
        width: 75,
        depth: 2,
        height: 25
    },
    PINS_BINDER_POSITION = {
        x: 0,
        y: -750,
        z: 10
    },
    SENSOR_POSITION = {
        x: 0,
        y: -1005,
        z: -175
    },
    SENSOR_SIZE = {
        width: 75,
        depth: 95,
        height: 1
    },
    WALL_TRACK_DEPTH_SIZE = {
        width: 100,
        depth: 1,
        height: 100
    },
    WALL_TRACK_DEPTH_POSITION = {
        x: 0,
        y: -914,
        z: 0
    },
    FLOOR_PINS_SIDE_PROPERTIES = {
        width: 15,
        depth: FLOOR_PINS_SIZE.depth,
        height: 1,
        rot: Math.radians(0)
    },
    PIN_PROPERTY = {
        radius_top: 8,
        radius_bottom: 7,
        height: 50,
        segments: 7,
        mass: 2.52015625,
        linearDamping: .01,
        angularDamping: .5
    },
    PIN_DIAMETER = 2 * PIN_PROPERTY.radius_top,
    BALL_PROPERTY = {
        mass: BALL_MASS,
        linearDamping: 0,
        angularDamping: .05
    },
    OFFSET_TRACK_POSITION = {
        x: 0,
        y: 0,
        z: -9
    },
    PINS_POSITION_Z = OFFSET_TRACK_POSITION.z + .5 * PIN_PROPERTY.height,
    FIRST_PIN_POSITION = -810,
    DISTANCE_PIN_OFFSET = .75,
    MIN_VELOCITY_PINS = .1,
    DISTANCE_PIN_Y = -5,
    PIN_BINDER_TO_Y = -950,
    PINS_POSITION = [{
        x: 0,
        y: FIRST_PIN_POSITION,
        z: PINS_POSITION_Z
    }, {
        x: PIN_DIAMETER * DISTANCE_PIN_OFFSET,
        y: FIRST_PIN_POSITION + DISTANCE_PIN_Y - PIN_DIAMETER,
        z: PINS_POSITION_Z
    }, {
        x: -PIN_DIAMETER * DISTANCE_PIN_OFFSET,
        y: FIRST_PIN_POSITION + DISTANCE_PIN_Y - PIN_DIAMETER,
        z: PINS_POSITION_Z
    }, {
        x: -PIN_DIAMETER * DISTANCE_PIN_OFFSET * 2,
        y: FIRST_PIN_POSITION + 2 * (DISTANCE_PIN_Y - PIN_DIAMETER),
        z: PINS_POSITION_Z
    }, {
        x: 0,
        y: FIRST_PIN_POSITION + 2 * (DISTANCE_PIN_Y - PIN_DIAMETER),
        z: PINS_POSITION_Z
    }, {
        x: PIN_DIAMETER * DISTANCE_PIN_OFFSET * 2,
        y: FIRST_PIN_POSITION + 2 * (DISTANCE_PIN_Y - PIN_DIAMETER),
        z: PINS_POSITION_Z
    }, {
        x: PIN_DIAMETER * DISTANCE_PIN_OFFSET * 3,
        y: FIRST_PIN_POSITION + 3 * (DISTANCE_PIN_Y - PIN_DIAMETER),
        z: PINS_POSITION_Z
    }, {
        x: PIN_DIAMETER * DISTANCE_PIN_OFFSET,
        y: FIRST_PIN_POSITION + 3 * (DISTANCE_PIN_Y - PIN_DIAMETER),
        z: PINS_POSITION_Z
    }, {
        x: -PIN_DIAMETER * DISTANCE_PIN_OFFSET,
        y: FIRST_PIN_POSITION + 3 * (DISTANCE_PIN_Y - PIN_DIAMETER),
        z: PINS_POSITION_Z
    }, {
        x: -PIN_DIAMETER * DISTANCE_PIN_OFFSET * 3,
        y: FIRST_PIN_POSITION + 3 * (DISTANCE_PIN_Y - PIN_DIAMETER),
        z: PINS_POSITION_Z
    }],
    OFFSET_FIELD_Y = 35,
    OFFSET_FIELD_X = 35,
    MAX_LAUNCH_FORCE = 100 * BALL_MASS * 2,
    MIN_LAUNCH_FORCE = .8 * BALL_MASS,
    FORCE_RATE = 2.5 * BALL_MASS,
    PINS_REFLECTION_LIMIT = .35,
    BALL_SCALE_FACTOR = .14,
    PIN_ALPHA_FACTOR = .9,
    PIN_SCALE_FACTOR = .3,
    SHADOW_SCALE_FACTOR = 18.5,
    FADE_PIN_FACTOR = WALL_TRACK_DEPTH_POSITION.y - .01,
    BOARD_SCALE_F = .25,
    PIN_REF_REGY_FACTOR = 20,
    BUFFER_ANIM_MONITOR = 20 * (FPS / 30),
    BUFFER_ANIM_PLAYER = FPS / 20,
    SHOW_3D_RENDER = !1,
    SHOW_DEPTH_TRACK_MODEL = !1,
    CAMERA_TEST_TRACKBALL = !0,
    CAMERA_TEST_TRANSFORM = !1,
    PIN_TEST = !1,
    SHOW_PROXY_COLLISION = !1,
    CAMERA_TEST_LOOK_AT = {
        x: 0,
        y: -500,
        z: -100
    },
    OPACITY_INTENSITY_3D = 1,
    PINS_PROPERTIES_TEST = {
        x: 0,
        y: 250,
        z: PINS_POSITION_Z + 20
    },
    BALL_Z_FORCE_RANGE = {
        min: 3,
        max: 10
    },
    CAMERA_PROPERTIES = {
        x: 0,
        y: 1500,
        z: 300,
        rot_x: 105,
        rot_y: 180,
        rot_z: 0
    },
    NEAR = 10,
    FAR = 4e3,
    s_oScenario, s_oPinBinder, s_oMenu = null;
TimeSeries.prototype.resetBounds = function() {
    this.maxValue = Number.NaN, this.minValue = Number.NaN;
    for (var t = 0; t < this.data.length; t++) this.maxValue = isNaN(this.maxValue) ? this.data[t][1] : Math.max(this.maxValue, this.data[t][1]), this.minValue = isNaN(this.minValue) ? this.data[t][1] : Math.min(this.minValue, this.data[t][1])
}, TimeSeries.prototype.append = function(t, e) {
    this.lastTimeStamp = t;
    var i = this.dataPool.length ? this.dataPool.pop() : [t, e];
    for (i[0] = t, i[1] = e, this.data.push(i), this.maxValue = isNaN(this.maxValue) ? e : Math.max(this.maxValue, e), this.minValue = isNaN(this.minValue) ? e : Math.min(this.minValue, e); this.data.length > this.maxDataLength;) this.dataPool.push(this.data.shift())
}, SmoothieChart.prototype.addTimeSeries = function(t, e) {
    this.seriesSet.push({
        timeSeries: t,
        options: e || {}
    })
}, SmoothieChart.prototype.removeTimeSeries = function(t) {
    this.seriesSet.splice(this.seriesSet.indexOf(t), 1)
}, SmoothieChart.prototype.streamTo = function(t, e) {
    var i = this;
    this.render_on_tick = function() {
        var e = i.seriesSet[0].timeSeries;
        e.data;
        i.render(t, e.lastTimeStamp)
    }, this.start()
}, SmoothieChart.prototype.start = function() {
    this.timer || (this.timer = setInterval(this.render_on_tick, 1e3 / this.options.fps))
}, SmoothieChart.prototype.stop = function() {
    this.timer && (clearInterval(this.timer), this.timer = void 0)
}, SmoothieChart.timeFormatter = function(t) {
    function e(t) {
        return (10 > t ? "0" : "") + t
    }
    return e(t.getHours()) + ":" + e(t.getMinutes()) + ":" + e(t.getSeconds())
}, SmoothieChart.prototype.render = function(t, e) {
    var i = t.getContext("2d"),
        o = this.options,
        n = {
            top: 0,
            left: 0,
            width: t.clientWidth,
            height: t.clientHeight
        };
    if (i.save(), e -= e % o.millisPerPixel, i.translate(n.left, n.top), i.beginPath(), i.rect(0, 0, n.width, n.height), i.clip(), i.save(), i.fillStyle = o.grid.fillStyle, i.clearRect(0, 0, n.width, n.height), i.fillRect(0, 0, n.width, n.height), i.restore(), i.save(), i.lineWidth = o.grid.lineWidth || 1, i.strokeStyle = o.grid.strokeStyle || "#ffffff", o.grid.millisPerLine > 0)
        for (var r = e - e % o.grid.millisPerLine; r >= e - n.width * o.millisPerPixel; r -= o.grid.millisPerLine) {
            i.beginPath();
            var s = Math.round(n.width - (e - r) / o.millisPerPixel);
            if (i.moveTo(s, 0), i.lineTo(s, n.height), i.stroke(), o.timestampFormatter) {
                var a = new Date(r),
                    l = o.timestampFormatter(a),
                    c = i.measureText(l).width / 2 + i.measureText(I).width + 4;
                s < n.width - c && (i.fillStyle = o.labels.fillStyle, i.fillText(l, s - i.measureText(l).width / 2, n.height - 2))
            }
            i.closePath()
        }
    for (var h = 1; h < o.grid.verticalSections; h++) {
        var u = Math.round(h * n.height / o.grid.verticalSections);
        i.beginPath(), i.moveTo(0, u), i.lineTo(n.width, u), i.stroke(), i.closePath()
    }
    i.beginPath(), i.strokeRect(0, 0, n.width, n.height), i.closePath(), i.restore();
    for (var d = Number.NaN, p = Number.NaN, f = 0; f < this.seriesSet.length; f++) {
        var m = this.seriesSet[f].timeSeries;
        isNaN(m.maxValue) || (d = isNaN(d) ? m.maxValue : Math.max(d, m.maxValue)), isNaN(m.minValue) || (p = isNaN(p) ? m.minValue : Math.min(p, m.minValue))
    }
    if (isNaN(d) && isNaN(p)) return void i.restore();
    null != o.maxValue ? d = o.maxValue : d *= o.maxValueScale, null != o.minValue && (p = o.minValue);
    var v = d - p;
    this.currentValueRange += o.scaleSmoothing * (v - this.currentValueRange), this.currentVisMinValue += o.scaleSmoothing * (p - this.currentVisMinValue);
    for (var y = this.currentValueRange, g = this.currentVisMinValue, f = 0; f < this.seriesSet.length; f++) {
        i.save();
        for (var m = this.seriesSet[f].timeSeries, _ = m.data, E = this.seriesSet[f].options; _.length >= o.maxDataSetLength && _[1][0] < e - n.width * o.millisPerPixel;) _.splice(0, 1);
        i.lineWidth = E.lineWidth || 1, i.fillStyle = E.fillStyle, i.strokeStyle = E.strokeStyle || "#ffffff", i.beginPath();
        for (var w = 0, S = 0, b = 0, x = 0; x < _.length; x++) {
            var A = Math.round(n.width - (e - _[x][0]) / o.millisPerPixel),
                T = _[x][1],
                N = T - g,
                R = n.height - (y ? Math.round(N / y * n.height) : 0),
                C = Math.max(Math.min(R, n.height - 1), 1);
            if (0 == x) w = A, i.moveTo(A, C);
            else switch (o.interpolation) {
                case "line":
                    i.lineTo(A, C);
                    break;
                case "bezier":
                default:
                    i.bezierCurveTo(Math.round((S + A) / 2), b, Math.round(S + A) / 2, C, A, C)
            }
            S = A, b = C
        }
        _.length > 0 && E.fillStyle && (i.lineTo(n.width + E.lineWidth + 1, b), i.lineTo(n.width + E.lineWidth + 1, n.height + E.lineWidth + 1), i.lineTo(w, n.height + E.lineWidth), i.fill()), i.stroke(), i.closePath(), i.restore()
    }
    if (!o.labels.disabled) {
        o.labelOffsetY || (o.labelOffsetY = 0), i.fillStyle = o.labels.fillStyle;
        var P = parseFloat(d).toFixed(2),
            I = parseFloat(p).toFixed(2);
        i.fillText(P, n.width - i.measureText(P).width - 2, 10), i.fillText(I, n.width - i.measureText(I).width - 2, n.height - 2);
        for (var x = 0; x < this.seriesSet.length; x++) {
            var m = this.seriesSet[x].timeSeries,
                O = m.label;
            i.fillStyle = m.options.fillStyle || "rgb(255,255,255)", O && i.fillText(O, 2, 10 * (x + 1) + o.labelOffsetY)
        }
    }
    i.restore()
}, CANNON = CANNON || {};
var camera, scene, renderer, controls = null,
    s_oRender;
CANNON.Demo = function(t) {
    function e() {
        M.restart(), M.hideCached(), B.restart(), B.hideCached(), D.restart(), D.hideCached(), k.restart(), k.hideCached()
    }

    function i() {
        if (A) {
            for (var t in A.__controllers) A.__controllers[t].updateDisplay();
            for (var e in A.__folders)
                for (var t in A.__folders[e].__controllers) A.__folders[e].__controllers[t].updateDisplay()
        }
    }

    function o(t) {
        function e(t, i) {
            t.material && (t.material = i);
            for (var o = 0; o < t.children.length; o++) e(t.children[o], i)
        }
        if (-1 === U.indexOf(t)) throw new Error("Render mode " + t + " not found!");
        switch (t) {
            case "solid":
                g.currentMaterial = I, q.intensity = 1, G.color.setHex(2236962);
                break;
            case "wireframe":
                g.currentMaterial = O, q.intensity = 0, G.color.setHex(16777215)
        }
        for (var i = 0; i < b.length; i++) e(b[i], g.currentMaterial);
        E.rendermode = t
    }

    function n(t, e) {
        if ("string" != typeof t) throw new Error("1st argument of Demo.addScene(title,initfunc) must be a string!");
        if ("function" != typeof e) throw new Error("2nd argument of Demo.addScene(title,initfunc) must be a function!");
        x.push(e);
        var i = x.length - 1;
        R[t] = function() {
            f(i)
        }, _.add(R, t)
    }

    function r() {
        for (var t = S.length, e = 0; t > e; e++) {
            var i = S[e];
            i.position.copy(i.initPosition), i.velocity.copy(i.initVelocity), i.initAngularVelocity && (i.angularVelocity.copy(i.initAngularVelocity), i.quaternion.copy(i.initQuaternion))
        }
    }

    function s(t) {
        0 === t.x && (t.x = 1e-6), 0 === t.y && (t.y = 1e-6), 0 === t.z && (t.z = 1e-6)
    }

    function a() {
        for (var t = S.length, e = 0; t > e; e++) {
            var i = S[e],
                o = b[e];
            o.position.copy(i.position), i.quaternion && o.quaternion.copy(i.quaternion)
        }
        if (M.restart(), E.contacts)
            for (var n = 0; n < W.contacts.length; n++)
                for (var r = 0; 2 > r; r++) {
                    var a = M.request(),
                        l = W.contacts[n],
                        i = 0 === r ? l.bi : l.bj,
                        c = 0 === r ? l.ri : l.rj;
                    a.position.set(i.position.x + c.x, i.position.y + c.y, i.position.z + c.z)
                }
        if (M.hideCached(), B.restart(), E.cm2contact)
            for (var n = 0; n < W.contacts.length; n++)
                for (var r = 0; 2 > r; r++) {
                    var h = B.request(),
                        l = W.contacts[n],
                        i = 0 === r ? l.bi : l.bj,
                        c = 0 === r ? l.ri : l.rj;
                    h.scale.set(c.x, c.y, c.z), s(h.scale), h.position.copy(i.position)
                }
        if (B.hideCached(), D.restart(), z.restart(), E.constraints) {
            for (var n = 0; n < W.constraints.length; n++) {
                var l = W.constraints[n];
                if (l instanceof CANNON.DistanceConstraint) {
                    var u, d = l.equations.normal,
                        p = d.bi,
                        f = d.bj,
                        h = D.request(),
                        e = p.id;
                    f.id;
                    u = f.position ? f.position : f, h.scale.set(u.x - p.position.x, u.y - p.position.y, u.z - p.position.z), s(h.scale), h.position.copy(p.position)
                }
            }
            for (var n = 0; n < W.constraints.length; n++) {
                var l = W.constraints[n];
                if (l instanceof CANNON.PointToPointConstraint) {
                    var m = l.equations.normal,
                        p = m.bi,
                        f = m.bj,
                        v = z.request(),
                        y = z.request(),
                        g = z.request(),
                        e = p.id;
                    f.id;
                    v.scale.set(m.ri.x, m.ri.y, m.ri.z), y.scale.set(m.rj.x, m.rj.y, m.rj.z), g.scale.set(-m.penetrationVec.x, -m.penetrationVec.y, -m.penetrationVec.z), s(v.scale), s(y.scale), s(g.scale), v.position.copy(p.position), y.position.copy(f.position), m.bj.position.vadd(m.rj, g.position)
                }
            }
        }
        if (z.hideCached(), D.hideCached(), k.restart(), E.normals)
            for (var n = 0; n < W.contacts.length; n++) {
                var l = W.contacts[n],
                    p = l.bi,
                    f = l.bj,
                    h = k.request(),
                    e = p.id,
                    m = (f.id, l.ni),
                    i = p;
                h.scale.set(m.x, m.y, m.z), s(h.scale), h.position.copy(i.position), l.ri.vadd(h.position, h.position)
            }
        if (k.hideCached(), j.restart(), E.axes)
            for (var p = 0; p < S.length; p++) {
                var i = S[p],
                    a = j.request();
                a.position.copy(i.position), i.quaternion && a.quaternion.copy(i.quaternion)
            }
        if (j.hideCached(), V.restart(), E.aabbs)
            for (var e = 0; e < S.length; e++) {
                var i = S[e];
                if (i.computeAABB && (i.aabbNeedsUpdate && i.computeAABB(), isFinite(i.aabb.lowerBound.x) && isFinite(i.aabb.lowerBound.y) && isFinite(i.aabb.lowerBound.z) && isFinite(i.aabb.upperBound.x) && isFinite(i.aabb.upperBound.y) && isFinite(i.aabb.upperBound.z) && i.aabb.lowerBound.x - i.aabb.upperBound.x != 0 && i.aabb.lowerBound.y - i.aabb.upperBound.y != 0 && i.aabb.lowerBound.z - i.aabb.upperBound.z != 0)) {
                    var a = V.request();
                    a.scale.set(i.aabb.lowerBound.x - i.aabb.upperBound.x, i.aabb.lowerBound.y - i.aabb.upperBound.y, i.aabb.lowerBound.z - i.aabb.upperBound.z), a.position.set(.5 * (i.aabb.lowerBound.x + i.aabb.upperBound.x), .5 * (i.aabb.lowerBound.y + i.aabb.upperBound.y), .5 * (i.aabb.lowerBound.z + i.aabb.upperBound.z))
                }
            }
        V.hideCached()
    }

    function l() {
        Z = document.createElement("div"), document.body.appendChild(Z), CAMERA_TEST_TRACKBALL ? (NEAR = 5, camera = new THREE.PerspectiveCamera(45, J / tt, NEAR, FAR), camera.lookAt(new THREE.Vector3(CAMERA_TEST_LOOK_AT.x, CAMERA_TEST_LOOK_AT.y, CAMERA_TEST_LOOK_AT.z)), camera.position.set(0, 500, 500), camera.up.set(0, 0, 1)) : camera = createOrthoGraphicCamera(), scene = g.scene = new THREE.Scene, scene.fog = new THREE.Fog(8306926, .5 * FAR, FAR), G = new THREE.AmbientLight(4473924), scene.add(G), q = new THREE.DirectionalLight(16777164, 1), q.position.set(180, 0, 180), q.target.position.set(0, 0, 0), q.castShadow = !0, q.shadow.camera.near = 10, q.shadow.camera.far = 100, q.shadow.camera.fov = 30, q.shadowMapBias = .0139, q.shadowMapDarkness = .1, q.shadow.mapSize.width = K, q.shadow.mapSize.height = Q, scene.add(q), scene.add(camera), renderer = SHOW_3D_RENDER ? new THREE.WebGLRenderer({
            clearColor: 0,
            clearAlpha: .5,
            antialias: !0,
            alpha: !0
        }) : new THREE.CanvasRenderer({
            clearColor: 0,
            clearAlpha: .5,
            antialias: !1,
            alpha: !0
        }), renderer.setSize(J, tt), renderer.domElement.style.position = "relative", renderer.domElement.style.top = $ + "px", renderer.domElement.style.opacity = OPACITY_INTENSITY_3D, Z.appendChild(renderer.domElement), Y = document.createElement("div"), Y.style.position = "absolute", Y.style.top = "10px", Y.style.width = "100%", Y.style.textAlign = "center", Y.innerHTML = '<a href="http://github.com/schteppe/cannon.js">cannon.js</a> - javascript 3d physics', Z.appendChild(Y), document.addEventListener("mousemove", u), window.addEventListener("resize", d), renderer.setClearColor(scene.fog.color, 1), renderer.autoClear = !1, N = document.createElement("canvas"), N.width = J, N.height = tt, N.style.opacity = .5, N.style.position = "absolute", N.style.top = "0px", N.style.zIndex = 90, Z.appendChild(N), T = new SmoothieChart({
            labelOffsetY: 50,
            maxDataSetLength: 100,
            millisPerPixel: 2,
            grid: {
                strokeStyle: "none",
                fillStyle: "none",
                lineWidth: 1,
                millisPerLine: 250,
                verticalSections: 6
            },
            labels: {
                fillStyle: "rgb(180, 180, 180)"
            }
        }), T.streamTo(N);
        var t = {},
            e = [
                [255, 0, 0],
                [0, 255, 0],
                [0, 0, 255],
                [255, 255, 0],
                [255, 0, 255],
                [0, 255, 255]
            ],
            i = 0;
        for (var n in W.profile) {
            var r = e[i % e.length];
            t[n] = new TimeSeries({
                label: n,
                fillStyle: "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")",
                maxDataLength: 500
            }), i++
        }
        W.addEventListener("postStep", function(e) {
            for (var i in W.profile) t[i].append(1e3 * W.time, W.profile[i])
        });
        var i = 0;
        for (var n in W.profile) {
            var r = e[i % e.length];
            T.addTimeSeries(t[n], {
                strokeStyle: "rgb(" + r[0] + "," + r[1] + "," + r[2] + ")",
                lineWidth: 2
            }), i++
        }
        if (W.doProfiling = !1, T.stop(), N.style.display = "none", X = new Stats, X.domElement.style.position = "absolute", X.domElement.style.top = "0px", X.domElement.style.zIndex = 100, Z.appendChild(X.domElement),
            void 0 != window.dat) {
            A = new dat.GUI, A.domElement.parentNode.style.zIndex = 120;
            var s = A.addFolder("Rendering");
            s.add(E, "rendermode", {
                Solid: "solid",
                Wireframe: "wireframe"
            }).onChange(function(t) {
                o(t)
            }), s.add(E, "contacts"), s.add(E, "cm2contact"), s.add(E, "normals"), s.add(E, "constraints"), s.add(E, "axes"), s.add(E, "particleSize").min(0).max(1).onChange(function(t) {
                for (var e = 0; e < b.length; e++) S[e] instanceof CANNON.Particle && b[e].scale.set(t, t, t)
            }), s.add(E, "shadows").onChange(function(t) {
                t ? renderer.shadowMapAutoUpdate = !0 : (renderer.shadowMapAutoUpdate = !1, renderer.clearTarget(q.shadowMap))
            }), s.add(E, "aabbs"), s.add(E, "profiling").onChange(function(t) {
                t ? (W.doProfiling = !0, T.start(), N.style.display = "block") : (W.doProfiling = !1, T.stop(), N.style.display = "none")
            });
            var a = A.addFolder("World");
            a.add(E, "paused").onChange(function(t) {}), a.add(E, "stepFrequency", 60, 600).step(60);
            var l = 100;
            a.add(E, "gx", -l, l).onChange(function(t) {
                isNaN(t) || W.gravity.set(t, E.gy, E.gz)
            }), a.add(E, "gy", -l, l).onChange(function(t) {
                isNaN(t) || W.gravity.set(E.gx, t, E.gz)
            }), a.add(E, "gz", -l, l).onChange(function(t) {
                isNaN(t) || W.gravity.set(E.gx, E.gy, t)
            }), a.add(E, "quatNormalizeSkip", 0, 50).step(1).onChange(function(t) {
                isNaN(t) || (W.quatNormalizeSkip = t)
            }), a.add(E, "quatNormalizeFast").onChange(function(t) {
                W.quatNormalizeFast = !!t
            });
            var c = A.addFolder("Solver");
            c.add(E, "iterations", 1, 50).step(1).onChange(function(t) {
                W.solver.iterations = t
            }), c.add(E, "k", 10, 1e7).onChange(function(t) {
                g.setGlobalSpookParams(E.k, E.d, 1 / E.stepFrequency)
            }), c.add(E, "d", 0, 20).step(.1).onChange(function(t) {
                g.setGlobalSpookParams(E.k, E.d, 1 / E.stepFrequency)
            }), c.add(E, "tolerance", 0, 10).step(.01).onChange(function(t) {
                W.solver.tolerance = t
            }), _ = A.addFolder("Scenes"), _.open()
        }
        if (CAMERA_TEST_TRACKBALL) {
            controls = new THREE.TrackballControls(camera, renderer.domElement), controls.rotateSpeed = 1, controls.zoomSpeed = 1.2, controls.panSpeed = .2, controls.noZoom = !1, controls.noPan = !1, controls.staticMoving = !1, controls.dynamicDampingFactor = .3;
            var h = 100;
            controls.minDistance = 0, controls.maxDistance = 1e3 * h, controls.keys = [65, 83, 68], controls.screen.width = J, controls.screen.height = tt
        }
    }

    function c() {
        requestAnimationFrame(c), E.paused || (a(), h()), p(), X.update()
    }

    function h() {}

    function u(t) {
        mouseX = t.clientX - et, mouseY = t.clientY - it
    }

    function d(t) {
        J = s_iCanvasResizeWidth + 2 * s_iCanvasOffsetWidth, tt = s_iCanvasResizeHeight + 2 * s_iCanvasOffsetHeight, CAMERA_TEST_TRACKBALL && (controls.screen.width = J, controls.screen.height = tt)
    }

    function p() {
        (CAMERA_TEST_TRACKBALL || CAMERA_TEST_TRANSFORM && null !== controls) && controls.update(), renderer.clear(), renderer.render(g.scene, camera)
    }

    function f(t) {
        g.dispatchEvent({
            type: "destroy"
        }), E.paused = !1, i(), v(t)
    }

    function m() {
        v(0)
    }

    function v(t) {
        for (var o = b.length, n = 0; o > n; n++) {
            W.remove(S.pop());
            var r = b.pop();
            g.scene.remove(r)
        }
        for (; W.constraints.length;) W.removeConstraint(W.constraints[0]);
        x[t](), E.iterations = W.solver.iterations, E.gx = W.gravity.x + 0, E.gy = W.gravity.y + 0, E.gz = W.gravity.z + 0, E.quatNormalizeSkip = W.quatNormalizeSkip, E.quatNormalizeFast = W.quatNormalizeFast, i(), e()
    }

    function y(t) {
        var e = [],
            i = [];
        this.request = function() {
            return e.length ? geo = e.pop() : geo = t(), scene.add(geo), i.push(geo), geo
        }, this.restart = function() {
            for (; i.length;) e.push(i.pop())
        }, this.hideCached = function() {
            for (var t = 0; t < e.length; t++) scene.remove(e[t])
        }
    }
    var g = this;
    this.addScene = n, this.restartCurrentScene = r, this.changeScene = f, this.start = m;
    var _, E = this.settings = {
        stepFrequency: 60,
        quatNormalizeSkip: 2,
        quatNormalizeFast: !0,
        gx: 0,
        gy: 0,
        gz: 0,
        iterations: 3,
        tolerance: 1e-4,
        k: 1e6,
        d: 3,
        scene: 0,
        paused: !1,
        rendermode: "solid",
        constraints: !1,
        contacts: !1,
        cm2contact: !1,
        normals: !1,
        axes: !1,
        particleSize: .1,
        shadows: !1,
        aabbs: !1,
        profiling: !1,
        maxSubSteps: 3
    };
    t = t || {};
    for (var w in t) w in E && (E[w] = t[w]);
    if (E.stepFrequency % 60 !== 0) throw new Error("stepFrequency must be a multiple of 60.");
    var S = this.bodies = [],
        b = this.visuals = [],
        x = [],
        A = null,
        T = null,
        N = null,
        R = {},
        C = new THREE.SphereGeometry(.1, 6, 6),
        P = (this.particleGeo = new THREE.SphereGeometry(1, 16, 8), 11184810),
        I = new THREE.MeshPhongMaterial({
            color: P,
            specular: 1118481,
            shininess: 50
        }),
        O = new THREE.MeshLambertMaterial({
            color: 16777215,
            wireframe: !0
        });
    this.currentMaterial = I;
    var L = new THREE.MeshPhongMaterial({
            color: 16711680
        }),
        M = (this.particleMaterial = new THREE.MeshLambertMaterial({
            color: 16711680
        }), new y(function() {
            return new THREE.Mesh(C, L)
        })),
        B = new y(function() {
            var t = new THREE.Geometry;
            return t.vertices.push(new THREE.Vector3(0, 0, 0)), t.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(t, new THREE.LineBasicMaterial({
                color: 16711680
            }))
        }),
        F = new THREE.BoxGeometry(1, 1, 1),
        H = new THREE.MeshBasicMaterial({
            color: P,
            wireframe: !0
        }),
        V = new y(function() {
            return new THREE.Mesh(F, H)
        }),
        D = new y(function() {
            var t = new THREE.Geometry;
            return t.vertices.push(new THREE.Vector3(0, 0, 0)), t.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(t, new THREE.LineBasicMaterial({
                color: 16711680
            }))
        }),
        z = new y(function() {
            var t = new THREE.Geometry;
            return t.vertices.push(new THREE.Vector3(0, 0, 0)), t.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(t, new THREE.LineBasicMaterial({
                color: 16711680
            }))
        }),
        k = new y(function() {
            var t = new THREE.Geometry;
            return t.vertices.push(new THREE.Vector3(0, 0, 0)), t.vertices.push(new THREE.Vector3(1, 1, 1)), new THREE.Line(t, new THREE.LineBasicMaterial({
                color: 65280
            }))
        }),
        j = new y(function() {
            var t = new THREE.Object3D,
                e = new THREE.Vector3(0, 0, 0),
                i = new THREE.Geometry,
                o = new THREE.Geometry,
                n = new THREE.Geometry;
            i.vertices.push(e), o.vertices.push(e), n.vertices.push(e), i.vertices.push(new THREE.Vector3(1, 0, 0)), o.vertices.push(new THREE.Vector3(0, 1, 0)), n.vertices.push(new THREE.Vector3(0, 0, 1));
            var r = new THREE.Line(i, new THREE.LineBasicMaterial({
                    color: 16711680
                })),
                s = new THREE.Line(o, new THREE.LineBasicMaterial({
                    color: 65280
                })),
                a = new THREE.Line(n, new THREE.LineBasicMaterial({
                    color: 255
                }));
            return t.add(r), t.add(s), t.add(a), t
        }),
        W = this.world = new CANNON.World;
    W.broadphase = new CANNON.NaiveBroadphase;
    var q, G, X, Y, U = ["solid", "wireframe"];
    Detector.webgl || Detector.addGetWebGLMessage();
    var Z, K = 1024,
        Q = 1024,
        $ = 0,
        J = s_iCanvasResizeWidth + s_iCanvasOffsetWidth,
        tt = s_iCanvasResizeHeight + s_iCanvasOffsetHeight,
        et = J / 2,
        it = tt / 2;
    l(), c();
    s_oRender = p, document.addEventListener("keypress", function(t) {
        if (t.keyCode) switch (t.keyCode) {
            case 32:
                r();
                break;
            case 104:
                "none" == X.domElement.style.display ? (X.domElement.style.display = "block", Y.style.display = "block") : (X.domElement.style.display = "none", Y.style.display = "none");
                break;
            case 97:
                E.aabbs = !E.aabbs, i();
                break;
            case 99:
                E.constraints = !E.constraints, i();
                break;
            case 112:
                E.paused = !E.paused, i();
                break;
            case 115:
                var e = 1 / E.stepFrequency;
                W.step(e), a();
                break;
            case 109:
                var n = U.indexOf(E.rendermode);
                n++, n %= U.length, o(U[n]), i();
                break;
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
                x.length > t.keyCode - 49 && !document.activeElement.localName.match(/input/) && f(t.keyCode - 49)
        }
    })
}, CANNON.Demo.prototype = new CANNON.EventTarget, CANNON.Demo.constructor = CANNON.Demo, CANNON.Demo.prototype.setGlobalSpookParams = function(t, e, i) {
    for (var o = this.world, n = 0; n < o.constraints.length; n++)
        for (var r = o.constraints[n], s = 0; s < r.equations.length; s++) {
            var a = r.equations[s];
            a.setSpookParams(t, e, i)
        }
    for (var n = 0; n < o.contactmaterials.length; n++) {
        var l = o.contactmaterials[n];
        l.contactEquationStiffness = t, l.frictionEquationStiffness = t, l.contactEquationRelaxation = e, l.frictionEquationRelaxation = e
    }
    o.defaultContactMaterial.contactEquationStiffness = t, o.defaultContactMaterial.frictionEquationStiffness = t, o.defaultContactMaterial.contactEquationRelaxation = e, o.defaultContactMaterial.frictionEquationRelaxation = e
}, CANNON.Demo.prototype.createTransformControl = function(t, e) {
    controls = new THREE.TransformControls(camera, renderer.domElement), scene.add(t), controls.attach(t, e), scene.add(controls), console.log("CREATE"), window.addEventListener("keydown", function(t) {
        switch (t.keyCode) {
            case 81:
                controls.setSpace("local" === controls.space ? "world" : "local");
                break;
            case 17:
                controls.setTranslationSnap(100), controls.setRotationSnap(THREE.Math.degToRad(15));
                break;
            case 87:
                controls.setMode("translate");
                break;
            case 69:
                controls.setMode("rotate");
                break;
            case 82:
                controls.setMode("scale");
                break;
            case 187:
            case 107:
                controls.setSize(controls.size + .1);
                break;
            case 189:
            case 109:
                controls.setSize(Math.max(controls.size - .1, .1))
        }
    }), window.addEventListener("keyup", function(t) {
        switch (t.keyCode) {
            case 17:
                controls.setTranslationSnap(null), controls.setRotationSnap(null)
        }
    })
}, CANNON.Demo.prototype.getWorld = function() {
    return this.world
}, CANNON.Demo.prototype.addVisual = function(t, e) {
    var i;
    this.settings;
    return t instanceof CANNON.Body && (i = this.shape2mesh(t, e)), i && (this.bodies.push(t), this.visuals.push(i), t.visualref = i, t.visualref.visualId = this.bodies.length - 1, this.scene.add(i)), i
}, CANNON.Demo.prototype.addVisuals = function(t) {
    for (var e = 0; e < t.length; e++) this.addVisual(t[e])
}, CANNON.Demo.prototype.removeVisual = function(t) {
    if (t.visualref) {
        for (var e = this.bodies, i = this.visuals, o = [], n = [], r = e.length, s = 0; r > s; s++) o.unshift(e.pop()), n.unshift(i.pop());
        for (var a = t.visualref.visualId, l = 0; l < o.length; l++)
            if (l !== a) {
                var s = l > a ? l - 1 : l;
                e[s] = o[l], i[s] = n[l], e[s].visualref = o[l].visualref, e[s].visualref.visualId = s
            }
        t.visualref.visualId = null, this.scene.remove(t.visualref), t.visualref = null
    }
}, CANNON.Demo.prototype.removeAllVisuals = function() {
    for (; this.bodies.length;) this.removeVisual(this.bodies[0])
}, CANNON.Demo.prototype.shape2mesh = function(t, e) {
    for (var i = ("wireframe" === this.settings.renderMode, new THREE.Object3D), o = 0; o < t.shapes.length; o++) {
        var n, r = t.shapes[o];
        switch (r.type) {
            case CANNON.Shape.types.SPHERE:
                var s = new THREE.SphereGeometry(r.radius, 8, 8);
                n = void 0 === e ? new THREE.Mesh(s, this.currentMaterial) : new THREE.Mesh(s, e), n.castShadow = !0;
                break;
            case CANNON.Shape.types.PARTICLE:
                n = new THREE.Mesh(this.particleGeo, this.particleMaterial);
                var a = this.settings;
                n.scale.set(a.particleSize, a.particleSize, a.particleSize);
                break;
            case CANNON.Shape.types.PLANE:
                var l = new THREE.PlaneGeometry(10, 10, 4, 4);
                n = new THREE.Object3D;
                var c, h = new THREE.Object3D;
                c = void 0 === e ? new THREE.Mesh(l, this.currentMaterial) : new THREE.Mesh(l, e), c.scale.set(100, 100, 100), h.add(c), c.castShadow = !1, c.receiveShadow = !0, n.add(h);
                break;
            case CANNON.Shape.types.BOX:
                var u = new THREE.BoxGeometry(2 * r.halfExtents.x, 2 * r.halfExtents.y, 2 * r.halfExtents.z);
                n = void 0 === e ? new THREE.Mesh(u, this.currentMaterial) : new THREE.Mesh(u, e);
                break;
            case CANNON.Shape.types.CONVEXPOLYHEDRON:
                for (var d = new THREE.Geometry, p = 0; p < r.vertices.length; p++) {
                    var f = r.vertices[p];
                    d.vertices.push(new THREE.Vector3(f.x, f.y, f.z))
                }
                for (var p = 0; p < r.faces.length; p++)
                    for (var m = r.faces[p], v = m[0], y = 1; y < m.length - 1; y++) {
                        var g = m[y],
                            _ = m[y + 1];
                        d.faces.push(new THREE.Face3(v, g, _))
                    }
                d.computeBoundingSphere(), d.computeFaceNormals(), n = void 0 === e ? new THREE.Mesh(d, this.currentMaterial) : new THREE.Mesh(d, e);
                break;
            case CANNON.Shape.types.HEIGHTFIELD:
                for (var l = new THREE.Geometry, E = new CANNON.Vec3, w = new CANNON.Vec3, S = new CANNON.Vec3, b = 0; b < r.data.length - 1; b++)
                    for (var x = 0; x < r.data[b].length - 1; x++)
                        for (var A = 0; 2 > A; A++) {
                            r.getConvexTrianglePillar(b, x, 0 === A), E.copy(r.pillarConvex.vertices[0]), w.copy(r.pillarConvex.vertices[1]), S.copy(r.pillarConvex.vertices[2]), E.vadd(r.pillarOffset, E), w.vadd(r.pillarOffset, w), S.vadd(r.pillarOffset, S), l.vertices.push(new THREE.Vector3(E.x, E.y, E.z), new THREE.Vector3(w.x, w.y, w.z), new THREE.Vector3(S.x, S.y, S.z));
                            var p = l.vertices.length - 3;
                            l.faces.push(new THREE.Face3(p, p + 1, p + 2))
                        }
                l.computeBoundingSphere(), l.computeFaceNormals(), n = void 0 === e ? new THREE.Mesh(l, this.currentMaterial) : new THREE.Mesh(l, e);
                break;
            case CANNON.Shape.types.TRIMESH:
                for (var l = new THREE.Geometry, E = new CANNON.Vec3, w = new CANNON.Vec3, S = new CANNON.Vec3, p = 0; p < r.indices.length / 3; p++) {
                    r.getTriangleVertices(p, E, w, S), l.vertices.push(new THREE.Vector3(E.x, E.y, E.z), new THREE.Vector3(w.x, w.y, w.z), new THREE.Vector3(S.x, S.y, S.z));
                    var y = l.vertices.length - 3;
                    l.faces.push(new THREE.Face3(y, y + 1, y + 2))
                }
                l.computeBoundingSphere(), l.computeFaceNormals(), n = void 0 === e ? new THREE.Mesh(l, this.currentMaterial) : new THREE.Mesh(l, e);
                break;
            default:
                throw "Visual type not recognized: " + r.type
        }
        if (n.receiveShadow = !0, n.castShadow = !0, n.children)
            for (var p = 0; p < n.children.length; p++)
                if (n.children[p].castShadow = !0, n.children[p].receiveShadow = !0, n.children[p])
                    for (var y = 0; y < n.children[p].length; y++) n.children[p].children[y].castShadow = !0, n.children[p].children[y].receiveShadow = !0;
        var T = t.shapeOffsets[o],
            N = t.shapeOrientations[o];
        n.position.set(T.x, T.y, T.z), n.quaternion.set(N.x, N.y, N.z, N.w), i.add(n)
    }
    return this.camera = function() {
        return camera
    }, this.getScene = function() {
        return scene
    }, i
};
var s_oAnimMonitor = null,
    s_oInterface = null,
    s_oAnimMonitor = null;
THREE.TrackballControls = function(t, e) {
    function i(t) {
        u.enabled !== !1 && (window.removeEventListener("keydown", i), v = m, m === d.NONE && (t.keyCode !== u.keys[d.ROTATE] || u.noRotate ? t.keyCode !== u.keys[d.ZOOM] || u.noZoom ? t.keyCode !== u.keys[d.PAN] || u.noPan || (m = d.PAN) : m = d.ZOOM : m = d.ROTATE))
    }

    function o(t) {
        u.enabled !== !1 && (m = v, window.addEventListener("keydown", i, !1))
    }

    function n(t) {
        u.enabled !== !1 && (t.preventDefault(), t.stopPropagation(), m === d.NONE && (m = t.button), m !== d.ROTATE || u.noRotate ? m !== d.ZOOM || u.noZoom ? m !== d.PAN || u.noPan || (x.copy(C(t.pageX, t.pageY)), A.copy(x)) : (E.copy(C(t.pageX, t.pageY)), w.copy(E)) : (g.copy(P(t.pageX, t.pageY)), _.copy(g)), document.addEventListener("mousemove", r, !1), document.addEventListener("mouseup", s, !1), u.dispatchEvent(N))
    }

    function r(t) {
        u.enabled !== !1 && (t.preventDefault(), t.stopPropagation(), m !== d.ROTATE || u.noRotate ? m !== d.ZOOM || u.noZoom ? m !== d.PAN || u.noPan || A.copy(C(t.pageX, t.pageY)) : w.copy(C(t.pageX, t.pageY)) : _.copy(P(t.pageX, t.pageY)))
    }

    function s(t) {
        u.enabled !== !1 && (t.preventDefault(), t.stopPropagation(), m = d.NONE, document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", s), u.dispatchEvent(R))
    }

    function a(t) {
        if (u.enabled !== !1) {
            t.preventDefault(), t.stopPropagation();
            var e = 0;
            t.wheelDelta ? e = t.wheelDelta / 40 : t.detail && (e = -t.detail / 3), E.y += .01 * e, u.dispatchEvent(N), u.dispatchEvent(R)
        }
    }

    function l(t) {
        if (u.enabled !== !1) {
            switch (t.touches.length) {
                case 1:
                    m = d.TOUCH_ROTATE, g.copy(P(t.touches[0].pageX, t.touches[0].pageY)), _.copy(g);
                    break;
                case 2:
                    m = d.TOUCH_ZOOM_PAN;
                    var e = t.touches[0].pageX - t.touches[1].pageX,
                        i = t.touches[0].pageY - t.touches[1].pageY;
                    b = S = Math.sqrt(e * e + i * i);
                    var o = (t.touches[0].pageX + t.touches[1].pageX) / 2,
                        n = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                    x.copy(C(o, n)), A.copy(x);
                    break;
                default:
                    m = d.NONE
            }
            u.dispatchEvent(N)
        }
    }

    function c(t) {
        if (u.enabled !== !1) switch (t.preventDefault(), t.stopPropagation(), t.touches.length) {
            case 1:
                _.copy(P(t.touches[0].pageX, t.touches[0].pageY));
                break;
            case 2:
                var e = t.touches[0].pageX - t.touches[1].pageX,
                    i = t.touches[0].pageY - t.touches[1].pageY;
                b = Math.sqrt(e * e + i * i);
                var o = (t.touches[0].pageX + t.touches[1].pageX) / 2,
                    n = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                A.copy(C(o, n));
                break;
            default:
                m = d.NONE
        }
    }

    function h(t) {
        if (u.enabled !== !1) {
            switch (t.touches.length) {
                case 1:
                    _.copy(P(t.touches[0].pageX, t.touches[0].pageY)), g.copy(_);
                    break;
                case 2:
                    S = b = 0;
                    var e = (t.touches[0].pageX + t.touches[1].pageX) / 2,
                        i = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                    A.copy(C(e, i)), x.copy(A)
            }
            m = d.NONE, u.dispatchEvent(R)
        }
    }
    var u = this,
        d = {
            NONE: -1,
            ROTATE: 0,
            ZOOM: 1,
            PAN: 2,
            TOUCH_ROTATE: 3,
            TOUCH_ZOOM_PAN: 4
        };
    this.object = t, this.domElement = void 0 !== e ? e : document, this.enabled = !0, this.screen = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    }, this.rotateSpeed = 1, this.zoomSpeed = 1.2, this.panSpeed = .3, this.noRotate = !1, this.noZoom = !1, this.noPan = !1, this.noRoll = !1, this.staticMoving = !1, this.dynamicDampingFactor = .2, this.minDistance = 0, this.maxDistance = 1 / 0, this.keys = [65, 83, 68], this.target = new THREE.Vector3;
    var p = 1e-6,
        f = new THREE.Vector3,
        m = d.NONE,
        v = d.NONE,
        y = new THREE.Vector3,
        g = new THREE.Vector3,
        _ = new THREE.Vector3,
        E = new THREE.Vector2,
        w = new THREE.Vector2,
        S = 0,
        b = 0,
        x = new THREE.Vector2,
        A = new THREE.Vector2;
    this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.up0 = this.object.up.clone();
    var T = {
            type: "change"
        },
        N = {
            type: "start"
        },
        R = {
            type: "end"
        };
    this.handleResize = function() {
        if (this.domElement === document) this.screen.left = 0, this.screen.top = 0, this.screen.width = window.innerWidth, this.screen.height = window.innerHeight;
        else {
            var t = this.domElement.getBoundingClientRect(),
                e = this.domElement.ownerDocument.documentElement;
            this.screen.left = t.left + window.pageXOffset - e.clientLeft, this.screen.top = t.top + window.pageYOffset - e.clientTop, this.screen.width = t.width, this.screen.height = t.height
        }
    }, this.handleEvent = function(t) {
        "function" == typeof this[t.type] && this[t.type](t)
    };
    var C = function() {
            var t = new THREE.Vector2;
            return function(e, i) {
                return t.set((e - u.screen.left) / u.screen.width, (i - u.screen.top) / u.screen.height), t
            }
        }(),
        P = function() {
            var t = new THREE.Vector3,
                e = new THREE.Vector3,
                i = new THREE.Vector3;
            return function(o, n) {
                i.set((o - .5 * u.screen.width - u.screen.left) / (.5 * u.screen.width), (.5 * u.screen.height + u.screen.top - n) / (.5 * u.screen.height), 0);
                var r = i.length();
                return u.noRoll ? r < Math.SQRT1_2 ? i.z = Math.sqrt(1 - r * r) : i.z = .5 / r : r > 1 ? i.normalize() : i.z = Math.sqrt(1 - r * r), y.copy(u.object.position).sub(u.target), t.copy(u.object.up).setLength(i.y), t.add(e.copy(u.object.up).cross(y).setLength(i.x)), t.add(y.setLength(i.z)), t
            }
        }();
    this.rotateCamera = function() {
        var t = new THREE.Vector3,
            e = new THREE.Quaternion;
        return function() {
            var i = Math.acos(g.dot(_) / g.length() / _.length());
            i && (t.crossVectors(g, _).normalize(), i *= u.rotateSpeed, e.setFromAxisAngle(t, -i), y.applyQuaternion(e), u.object.up.applyQuaternion(e), _.applyQuaternion(e), u.staticMoving ? g.copy(_) : (e.setFromAxisAngle(t, i * (u.dynamicDampingFactor - 1)), g.applyQuaternion(e)))
        }
    }(), this.zoomCamera = function() {
        if (m === d.TOUCH_ZOOM_PAN) {
            var t = S / b;
            S = b, y.multiplyScalar(t)
        } else {
            var t = 1 + (w.y - E.y) * u.zoomSpeed;
            1 !== t && t > 0 && (y.multiplyScalar(t), u.staticMoving ? E.copy(w) : E.y += (w.y - E.y) * this.dynamicDampingFactor)
        }
    }, this.panCamera = function() {
        var t = new THREE.Vector2,
            e = new THREE.Vector3,
            i = new THREE.Vector3;
        return function() {
            t.copy(A).sub(x), t.lengthSq() && (t.multiplyScalar(y.length() * u.panSpeed), i.copy(y).cross(u.object.up).setLength(t.x), i.add(e.copy(u.object.up).setLength(t.y)), u.object.position.add(i), u.target.add(i), u.staticMoving ? x.copy(A) : x.add(t.subVectors(A, x).multiplyScalar(u.dynamicDampingFactor)))
        }
    }(), this.checkDistances = function() {
        u.noZoom && u.noPan || (y.lengthSq() > u.maxDistance * u.maxDistance && u.object.position.addVectors(u.target, y.setLength(u.maxDistance)), y.lengthSq() < u.minDistance * u.minDistance && u.object.position.addVectors(u.target, y.setLength(u.minDistance)))
    }, this.update = function() {
        y.subVectors(u.object.position, u.target), u.noRotate || u.rotateCamera(), u.noZoom || u.zoomCamera(), u.noPan || u.panCamera(), u.object.position.addVectors(u.target, y), u.checkDistances(), u.object.lookAt(u.target), f.distanceToSquared(u.object.position) > p && (u.dispatchEvent(T), f.copy(u.object.position))
    }, this.reset = function() {
        m = d.NONE, v = d.NONE, u.target.copy(u.target0), u.object.position.copy(u.position0), u.object.up.copy(u.up0), y.subVectors(u.object.position, u.target), u.object.lookAt(u.target), u.dispatchEvent(T), f.copy(u.object.position)
    }, this.domElement.addEventListener("contextmenu", function(t) {
        t.preventDefault()
    }, !1), this.domElement.addEventListener("mousedown", n, !1), this.domElement.addEventListener("mousewheel", a, !1), this.domElement.addEventListener("DOMMouseScroll", a, !1), this.domElement.addEventListener("touchstart", l, !1), this.domElement.addEventListener("touchend", h, !1), this.domElement.addEventListener("touchmove", c, !1), window.addEventListener("keydown", i, !1), window.addEventListener("keyup", o, !1), this.handleResize(), this.update()
}, THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype);
var dat = dat || {};
dat.gui = dat.gui || {}, dat.utils = dat.utils || {}, dat.controllers = dat.controllers || {}, dat.dom = dat.dom || {}, dat.color = dat.color || {}, dat.utils.css = function() {
    return {
        load: function(t, e) {
            e = e || document;
            var i = e.createElement("link");
            i.type = "text/css", i.rel = "stylesheet", i.href = t, e.getElementsByTagName("head")[0].appendChild(i)
        },
        inject: function(t, e) {
            e = e || document;
            var i = document.createElement("style");
            i.type = "text/css", i.innerHTML = t, e.getElementsByTagName("head")[0].appendChild(i)
        }
    }
}(), dat.utils.common = function() {
    var t = Array.prototype.forEach,
        e = Array.prototype.slice;
    return {
        BREAK: {},
        extend: function(t) {
            return this.each(e.call(arguments, 1), function(e) {
                for (var i in e) this.isUndefined(e[i]) || (t[i] = e[i])
            }, this), t
        },
        defaults: function(t) {
            return this.each(e.call(arguments, 1), function(e) {
                for (var i in e) this.isUndefined(t[i]) && (t[i] = e[i])
            }, this), t
        },
        compose: function() {
            var t = e.call(arguments);
            return function() {
                for (var i = e.call(arguments), o = t.length - 1; o >= 0; o--) i = [t[o].apply(this, i)];
                return i[0]
            }
        },
        each: function(e, i, o) {
            if (t && e.forEach === t) e.forEach(i, o);
            else if (e.length === e.length + 0) {
                for (var n = 0, r = e.length; r > n; n++)
                    if (n in e && i.call(o, e[n], n) === this.BREAK) return
            } else
                for (var n in e)
                    if (i.call(o, e[n], n) === this.BREAK) return
        },
        defer: function(t) {
            setTimeout(t, 0)
        },
        toArray: function(t) {
            return t.toArray ? t.toArray() : e.call(t)
        },
        isUndefined: function(t) {
            return void 0 === t
        },
        isNull: function(t) {
            return null === t
        },
        isNaN: function(t) {
            return t !== t
        },
        isArray: Array.isArray || function(t) {
            return t.constructor === Array
        },
        isObject: function(t) {
            return t === Object(t)
        },
        isNumber: function(t) {
            return t === t + 0
        },
        isString: function(t) {
            return t === t + ""
        },
        isBoolean: function(t) {
            return t === !1 || t === !0
        },
        isFunction: function(t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }
    }
}(), dat.controllers.Controller = function(t) {
    var e = function(t, e) {
        this.initialValue = t[e], this.domElement = document.createElement("div"), this.object = t, this.property = e, this.__onChange = void 0, this.__onFinishChange = void 0
    };
    return t.extend(e.prototype, {
        onChange: function(t) {
            return this.__onChange = t, this
        },
        onFinishChange: function(t) {
            return this.__onFinishChange = t, this
        },
        setValue: function(t) {
            return this.object[this.property] = t, this.__onChange && this.__onChange.call(this, t), this.updateDisplay(), this
        },
        getValue: function() {
            return this.object[this.property]
        },
        updateDisplay: function() {
            return this
        },
        isModified: function() {
            return this.initialValue !== this.getValue()
        }
    }), e
}(dat.utils.common), dat.dom.dom = function(t) {
    function e(e) {
        if ("0" === e || t.isUndefined(e)) return 0;
        var i = e.match(n);
        return t.isNull(i) ? 0 : parseFloat(i[1])
    }
    var i = {
            HTMLEvents: ["change"],
            MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
            KeyboardEvents: ["keydown"]
        },
        o = {};
    t.each(i, function(e, i) {
        t.each(e, function(t) {
            o[t] = i
        })
    });
    var n = /(\d+(\.\d+)?)px/,
        r = {
            makeSelectable: function(t, e) {
                void 0 !== t && void 0 !== t.style && (t.onselectstart = e ? function() {
                    return !1
                } : function() {}, t.style.MozUserSelect = e ? "auto" : "none", t.style.KhtmlUserSelect = e ? "auto" : "none", t.unselectable = e ? "on" : "off")
            },
            makeFullscreen: function(e, i, o) {
                t.isUndefined(i) && (i = !0), t.isUndefined(o) && (o = !0), e.style.position = "absolute", i && (e.style.left = 0, e.style.right = 0), o && (e.style.top = 0, e.style.bottom = 0)
            },
            fakeEvent: function(e, i, n, r) {
                n = n || {};
                var s = o[i];
                if (!s) throw new Error("Event type " + i + " not supported.");
                var a = document.createEvent(s);
                switch (s) {
                    case "MouseEvents":
                        var l = n.x || n.clientX || 0,
                            c = n.y || n.clientY || 0;
                        a.initMouseEvent(i, n.bubbles || !1, n.cancelable || !0, window, n.clickCount || 1, 0, 0, l, c, !1, !1, !1, !1, 0, null);
                        break;
                    case "KeyboardEvents":
                        var h = a.initKeyboardEvent || a.initKeyEvent;
                        t.defaults(n, {
                            cancelable: !0,
                            ctrlKey: !1,
                            altKey: !1,
                            shiftKey: !1,
                            metaKey: !1,
                            keyCode: void 0,
                            charCode: void 0
                        }), h(i, n.bubbles || !1, n.cancelable, window, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, n.keyCode, n.charCode);
                        break;
                    default:
                        a.initEvent(i, n.bubbles || !1, n.cancelable || !0)
                }
                t.defaults(a, r), e.dispatchEvent(a)
            },
            bind: function(t, e, i, o) {
                return o = o || !1, t.addEventListener ? t.addEventListener(e, i, o) : t.attachEvent && t.attachEvent("on" + e, i), r
            },
            unbind: function(t, e, i, o) {
                return o = o || !1, t.removeEventListener ? t.removeEventListener(e, i, o) : t.detachEvent && t.detachEvent("on" + e, i), r
            },
            addClass: function(t, e) {
                if (void 0 === t.className) t.className = e;
                else if (t.className !== e) {
                    var i = t.className.split(/ +/); - 1 == i.indexOf(e) && (i.push(e), t.className = i.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
                }
                return r
            },
            removeClass: function(t, e) {
                if (e)
                    if (void 0 === t.className);
                    else if (t.className === e) t.removeAttribute("class");
                else {
                    var i = t.className.split(/ +/),
                        o = i.indexOf(e); - 1 != o && (i.splice(o, 1), t.className = i.join(" "))
                } else t.className = void 0;
                return r
            },
            hasClass: function(t, e) {
                return new RegExp("(?:^|\\s+)" + e + "(?:\\s+|$)").test(t.className) || !1
            },
            getWidth: function(t) {
                var i = getComputedStyle(t);
                return e(i["border-left-width"]) + e(i["border-right-width"]) + e(i["padding-left"]) + e(i["padding-right"]) + e(i.width)
            },
            getHeight: function(t) {
                var i = getComputedStyle(t);
                return e(i["border-top-width"]) + e(i["border-bottom-width"]) + e(i["padding-top"]) + e(i["padding-bottom"]) + e(i.height)
            },
            getOffset: function(t) {
                var e = {
                    left: 0,
                    top: 0
                };
                if (t.offsetParent)
                    do e.left += t.offsetLeft, e.top += t.offsetTop; while (t = t.offsetParent);
                return e
            },
            isActive: function(t) {
                return t === document.activeElement && (t.type || t.href)
            }
        };
    return r
}(dat.utils.common), dat.controllers.OptionController = function(t, e, i) {
    var o = function(t, n, r) {
        o.superclass.call(this, t, n);
        var s = this;
        if (this.__select = document.createElement("select"), i.isArray(r)) {
            var a = {};
            i.each(r, function(t) {
                a[t] = t
            }), r = a
        }
        i.each(r, function(t, e) {
            var i = document.createElement("option");
            i.innerHTML = e, i.setAttribute("value", t), s.__select.appendChild(i)
        }), this.updateDisplay(), e.bind(this.__select, "change", function() {
            var t = this.options[this.selectedIndex].value;
            s.setValue(t)
        }), this.domElement.appendChild(this.__select)
    };
    return o.superclass = t, i.extend(o.prototype, t.prototype, {
        setValue: function(t) {
            var e = o.superclass.prototype.setValue.call(this, t);
            return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), e
        },
        updateDisplay: function() {
            return this.__select.value = this.getValue(), o.superclass.prototype.updateDisplay.call(this)
        }
    }), o
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.NumberController = function(t, e) {
    function i(t) {
        return t = t.toString(), t.indexOf(".") > -1 ? t.length - t.indexOf(".") - 1 : 0
    }
    var o = function(t, n, r) {
        o.superclass.call(this, t, n), r = r || {}, this.__min = r.min, this.__max = r.max, this.__step = r.step, e.isUndefined(this.__step) ? 0 == this.initialValue ? this.__impliedStep = 1 : this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10 : this.__impliedStep = this.__step, this.__precision = i(this.__impliedStep)
    };
    return o.superclass = t, e.extend(o.prototype, t.prototype, {
        setValue: function(t) {
            return void 0 !== this.__min && t < this.__min ? t = this.__min : void 0 !== this.__max && t > this.__max && (t = this.__max), void 0 !== this.__step && t % this.__step != 0 && (t = Math.round(t / this.__step) * this.__step), o.superclass.prototype.setValue.call(this, t)
        },
        min: function(t) {
            return this.__min = t, this
        },
        max: function(t) {
            return this.__max = t, this
        },
        step: function(t) {
            return this.__step = t, this
        }
    }), o
}(dat.controllers.Controller, dat.utils.common), dat.controllers.NumberControllerBox = function(t, e, i) {
    function o(t, e) {
        var i = Math.pow(10, e);
        return Math.round(t * i) / i
    }
    var n = function(t, o, r) {
        function s() {
            var t = parseFloat(d.__input.value);
            i.isNaN(t) || d.setValue(t)
        }

        function a() {
            s(), d.__onFinishChange && d.__onFinishChange.call(d, d.getValue())
        }

        function l(t) {
            e.bind(window, "mousemove", c), e.bind(window, "mouseup", h), u = t.clientY
        }

        function c(t) {
            var e = u - t.clientY;
            d.setValue(d.getValue() + e * d.__impliedStep), u = t.clientY
        }

        function h() {
            e.unbind(window, "mousemove", c), e.unbind(window, "mouseup", h)
        }
        this.__truncationSuspended = !1, n.superclass.call(this, t, o, r);
        var u, d = this;
        this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), e.bind(this.__input, "change", s), e.bind(this.__input, "blur", a), e.bind(this.__input, "mousedown", l), e.bind(this.__input, "keydown", function(t) {
            13 === t.keyCode && (d.__truncationSuspended = !0, this.blur(), d.__truncationSuspended = !1)
        }), this.updateDisplay(), this.domElement.appendChild(this.__input)
    };
    return n.superclass = t, i.extend(n.prototype, t.prototype, {
        updateDisplay: function() {
            return this.__input.value = this.__truncationSuspended ? this.getValue() : o(this.getValue(), this.__precision), n.superclass.prototype.updateDisplay.call(this)
        }
    }), n
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.common), dat.controllers.NumberControllerSlider = function(t, e, i, o, n) {
    function r(t, e, i, o, n) {
        return o + (n - o) * ((t - e) / (i - e))
    }
    var s = function(t, i, o, n, a) {
        function l(t) {
            e.bind(window, "mousemove", c), e.bind(window, "mouseup", h), c(t)
        }

        function c(t) {
            t.preventDefault();
            var i = e.getOffset(u.__background),
                o = e.getWidth(u.__background);
            return u.setValue(r(t.clientX, i.left, i.left + o, u.__min, u.__max)), !1
        }

        function h() {
            e.unbind(window, "mousemove", c), e.unbind(window, "mouseup", h), u.__onFinishChange && u.__onFinishChange.call(u, u.getValue())
        }
        s.superclass.call(this, t, i, {
            min: o,
            max: n,
            step: a
        });
        var u = this;
        this.__background = document.createElement("div"), this.__foreground = document.createElement("div"), e.bind(this.__background, "mousedown", l), e.addClass(this.__background, "slider"), e.addClass(this.__foreground, "slider-fg"), this.updateDisplay(), this.__background.appendChild(this.__foreground), this.domElement.appendChild(this.__background)
    };
    return s.superclass = t, s.useDefaultStyles = function() {
        i.inject(n)
    }, o.extend(s.prototype, t.prototype, {
        updateDisplay: function() {
            var t = (this.getValue() - this.__min) / (this.__max - this.__min);
            return this.__foreground.style.width = 100 * t + "%", s.superclass.prototype.updateDisplay.call(this)
        }
    }), s
}(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, ".slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}"), dat.controllers.FunctionController = function(t, e, i) {
    var o = function(t, i, n) {
        o.superclass.call(this, t, i);
        var r = this;
        this.__button = document.createElement("div"), this.__button.innerHTML = void 0 === n ? "Fire" : n, e.bind(this.__button, "click", function(t) {
            return t.preventDefault(), r.fire(), !1
        }), e.addClass(this.__button, "button"), this.domElement.appendChild(this.__button)
    };
    return o.superclass = t, i.extend(o.prototype, t.prototype, {
        fire: function() {
            this.__onChange && this.__onChange.call(this), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.getValue().call(this.object)
        }
    }), o
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.BooleanController = function(t, e, i) {
    var o = function(t, i) {
        function n() {
            r.setValue(!r.__prev)
        }
        o.superclass.call(this, t, i);
        var r = this;
        this.__prev = this.getValue(), this.__checkbox = document.createElement("input"), this.__checkbox.setAttribute("type", "checkbox"), e.bind(this.__checkbox, "change", n, !1), this.domElement.appendChild(this.__checkbox), this.updateDisplay()
    };
    return o.superclass = t, i.extend(o.prototype, t.prototype, {
        setValue: function(t) {
            var e = o.superclass.prototype.setValue.call(this, t);
            return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), e
        },
        updateDisplay: function() {
            return this.getValue() === !0 ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1, o.superclass.prototype.updateDisplay.call(this)
        }
    }), o
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.color.toString = function(t) {
    return function(e) {
        if (1 == e.a || t.isUndefined(e.a)) {
            for (var i = e.hex.toString(16); i.length < 6;) i = "0" + i;
            return "#" + i
        }
        return "rgba(" + Math.round(e.r) + "," + Math.round(e.g) + "," + Math.round(e.b) + "," + e.a + ")"
    }
}(dat.utils.common), dat.color.interpret = function(t, e) {
    var i, o, n = function() {
            o = !1;
            var t = arguments.length > 1 ? e.toArray(arguments) : arguments[0];
            return e.each(r, function(n) {
                return n.litmus(t) ? (e.each(n.conversions, function(n, r) {
                    return i = n.read(t), o === !1 && i !== !1 ? (o = i, i.conversionName = r, i.conversion = n, e.BREAK) : void 0
                }), e.BREAK) : void 0
            }), o
        },
        r = [{
            litmus: e.isString,
            conversions: {
                THREE_CHAR_HEX: {
                    read: function(t) {
                        var e = t.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                        return null === e ? !1 : {
                            space: "HEX",
                            hex: parseInt("0x" + e[1].toString() + e[1].toString() + e[2].toString() + e[2].toString() + e[3].toString() + e[3].toString())
                        }
                    },
                    write: t
                },
                SIX_CHAR_HEX: {
                    read: function(t) {
                        var e = t.match(/^#([A-F0-9]{6})$/i);
                        return null === e ? !1 : {
                            space: "HEX",
                            hex: parseInt("0x" + e[1].toString())
                        }
                    },
                    write: t
                },
                CSS_RGB: {
                    read: function(t) {
                        var e = t.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                        return null === e ? !1 : {
                            space: "RGB",
                            r: parseFloat(e[1]),
                            g: parseFloat(e[2]),
                            b: parseFloat(e[3])
                        }
                    },
                    write: t
                },
                CSS_RGBA: {
                    read: function(t) {
                        var e = t.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
                        return null === e ? !1 : {
                            space: "RGB",
                            r: parseFloat(e[1]),
                            g: parseFloat(e[2]),
                            b: parseFloat(e[3]),
                            a: parseFloat(e[4])
                        }
                    },
                    write: t
                }
            }
        }, {
            litmus: e.isNumber,
            conversions: {
                HEX: {
                    read: function(t) {
                        return {
                            space: "HEX",
                            hex: t,
                            conversionName: "HEX"
                        }
                    },
                    write: function(t) {
                        return t.hex
                    }
                }
            }
        }, {
            litmus: e.isArray,
            conversions: {
                RGB_ARRAY: {
                    read: function(t) {
                        return 3 != t.length ? !1 : {
                            space: "RGB",
                            r: t[0],
                            g: t[1],
                            b: t[2]
                        }
                    },
                    write: function(t) {
                        return [t.r, t.g, t.b]
                    }
                },
                RGBA_ARRAY: {
                    read: function(t) {
                        return 4 != t.length ? !1 : {
                            space: "RGB",
                            r: t[0],
                            g: t[1],
                            b: t[2],
                            a: t[3]
                        }
                    },
                    write: function(t) {
                        return [t.r, t.g, t.b, t.a]
                    }
                }
            }
        }, {
            litmus: e.isObject,
            conversions: {
                RGBA_OBJ: {
                    read: function(t) {
                        return e.isNumber(t.r) && e.isNumber(t.g) && e.isNumber(t.b) && e.isNumber(t.a) ? {
                            space: "RGB",
                            r: t.r,
                            g: t.g,
                            b: t.b,
                            a: t.a
                        } : !1
                    },
                    write: function(t) {
                        return {
                            r: t.r,
                            g: t.g,
                            b: t.b,
                            a: t.a
                        }
                    }
                },
                RGB_OBJ: {
                    read: function(t) {
                        return e.isNumber(t.r) && e.isNumber(t.g) && e.isNumber(t.b) ? {
                            space: "RGB",
                            r: t.r,
                            g: t.g,
                            b: t.b
                        } : !1
                    },
                    write: function(t) {
                        return {
                            r: t.r,
                            g: t.g,
                            b: t.b
                        }
                    }
                },
                HSVA_OBJ: {
                    read: function(t) {
                        return e.isNumber(t.h) && e.isNumber(t.s) && e.isNumber(t.v) && e.isNumber(t.a) ? {
                            space: "HSV",
                            h: t.h,
                            s: t.s,
                            v: t.v,
                            a: t.a
                        } : !1
                    },
                    write: function(t) {
                        return {
                            h: t.h,
                            s: t.s,
                            v: t.v,
                            a: t.a
                        }
                    }
                },
                HSV_OBJ: {
                    read: function(t) {
                        return e.isNumber(t.h) && e.isNumber(t.s) && e.isNumber(t.v) ? {
                            space: "HSV",
                            h: t.h,
                            s: t.s,
                            v: t.v
                        } : !1
                    },
                    write: function(t) {
                        return {
                            h: t.h,
                            s: t.s,
                            v: t.v
                        }
                    }
                }
            }
        }];
    return n
}(dat.color.toString, dat.utils.common), dat.GUI = dat.gui.GUI = function(t, e, i, o, n, r, s, a, l, c, h, u, d, p, f) {
    function m(t, e, i, r) {
        if (void 0 === e[i]) throw new Error("Object " + e + ' has no property "' + i + '"');
        var s;
        if (r.color) s = new h(e, i);
        else {
            var a = [e, i].concat(r.factoryArgs);
            s = o.apply(t, a)
        }
        r.before instanceof n && (r.before = r.before.__li), g(t, s), p.addClass(s.domElement, "c");
        var l = document.createElement("span");
        p.addClass(l, "property-name"), l.innerHTML = s.property;
        var c = document.createElement("div");
        c.appendChild(l), c.appendChild(s.domElement);
        var u = v(t, c, r.before);
        return p.addClass(u, V.CLASS_CONTROLLER_ROW), p.addClass(u, typeof s.getValue()), y(t, u, s), t.__controllers.push(s), s
    }

    function v(t, e, i) {
        var o = document.createElement("li");
        return e && o.appendChild(e), i ? t.__ul.insertBefore(o, params.before) : t.__ul.appendChild(o), t.onResize(), o
    }

    function y(t, e, i) {
        if (i.__li = e, i.__gui = t, f.extend(i, {
                options: function(e) {
                    return arguments.length > 1 ? (i.remove(), m(t, i.object, i.property, {
                        before: i.__li.nextElementSibling,
                        factoryArgs: [f.toArray(arguments)]
                    })) : f.isArray(e) || f.isObject(e) ? (i.remove(), m(t, i.object, i.property, {
                        before: i.__li.nextElementSibling,
                        factoryArgs: [e]
                    })) : void 0
                },
                name: function(t) {
                    return i.__li.firstElementChild.firstElementChild.innerHTML = t, i
                },
                listen: function() {
                    return i.__gui.listen(i), i
                },
                remove: function() {
                    return i.__gui.remove(i), i
                }
            }), i instanceof l) {
            var o = new a(i.object, i.property, {
                min: i.__min,
                max: i.__max,
                step: i.__step
            });
            f.each(["updateDisplay", "onChange", "onFinishChange"], function(t) {
                var e = i[t],
                    n = o[t];
                i[t] = o[t] = function() {
                    var t = Array.prototype.slice.call(arguments);
                    return e.apply(i, t), n.apply(o, t)
                }
            }), p.addClass(e, "has-slider"), i.domElement.insertBefore(o.domElement, i.domElement.firstElementChild)
        } else if (i instanceof a) {
            var n = function(e) {
                return f.isNumber(i.__min) && f.isNumber(i.__max) ? (i.remove(), m(t, i.object, i.property, {
                    before: i.__li.nextElementSibling,
                    factoryArgs: [i.__min, i.__max, i.__step]
                })) : e
            };
            i.min = f.compose(n, i.min), i.max = f.compose(n, i.max)
        } else i instanceof r ? (p.bind(e, "click", function() {
            p.fakeEvent(i.__checkbox, "click")
        }), p.bind(i.__checkbox, "click", function(t) {
            t.stopPropagation()
        })) : i instanceof s ? (p.bind(e, "click", function() {
            p.fakeEvent(i.__button, "click")
        }), p.bind(e, "mouseover", function() {
            p.addClass(i.__button, "hover")
        }), p.bind(e, "mouseout", function() {
            p.removeClass(i.__button, "hover")
        })) : i instanceof h && (p.addClass(e, "color"), i.updateDisplay = f.compose(function(t) {
            return e.style.borderLeftColor = i.__color.toString(), t
        }, i.updateDisplay), i.updateDisplay());
        i.setValue = f.compose(function(e) {
            return t.getRoot().__preset_select && i.isModified() && T(t.getRoot(), !0), e
        }, i.setValue)
    }

    function g(t, e) {
        var i = t.getRoot(),
            o = i.__rememberedObjects.indexOf(e.object);
        if (-1 != o) {
            var n = i.__rememberedObjectIndecesToControllers[o];
            if (void 0 === n && (n = {}, i.__rememberedObjectIndecesToControllers[o] = n), n[e.property] = e, i.load && i.load.remembered) {
                var r, s = i.load.remembered;
                if (s[t.preset]) r = s[t.preset];
                else {
                    if (!s[L]) return;
                    r = s[L]
                }
                if (r[o] && void 0 !== r[o][e.property]) {
                    var a = r[o][e.property];
                    e.initialValue = a, e.setValue(a)
                }
            }
        }
    }

    function _(t, e) {
        return document.location.href + "." + e
    }

    function E(t) {
        function e() {
            c.style.display = t.useLocalStorage ? "block" : "none"
        }
        var i = t.__save_row = document.createElement("li");
        p.addClass(t.domElement, "has-save"), t.__ul.insertBefore(i, t.__ul.firstChild), p.addClass(i, "save-row");
        var o = document.createElement("span");
        o.innerHTML = "&nbsp;", p.addClass(o, "button gears");
        var n = document.createElement("span");
        n.innerHTML = "Save", p.addClass(n, "button"), p.addClass(n, "save");
        var r = document.createElement("span");
        r.innerHTML = "New", p.addClass(r, "button"), p.addClass(r, "save-as");
        var s = document.createElement("span");
        s.innerHTML = "Revert", p.addClass(s, "button"), p.addClass(s, "revert");
        var a = t.__preset_select = document.createElement("select");
        if (t.load && t.load.remembered ? f.each(t.load.remembered, function(e, i) {
                x(t, i, i == t.preset)
            }) : x(t, L, !1), p.bind(a, "change", function() {
                for (var e = 0; e < t.__preset_select.length; e++) t.__preset_select[e].innerHTML = t.__preset_select[e].value;
                t.preset = this.value
            }), i.appendChild(a), i.appendChild(o), i.appendChild(n), i.appendChild(r), i.appendChild(s), M) {
            var l = document.getElementById("dg-save-locally"),
                c = document.getElementById("dg-local-explain");
            l.style.display = "block";
            var h = document.getElementById("dg-local-storage");
            "true" === localStorage.getItem(_(t, "isLocal")) && h.setAttribute("checked", "checked"), e(), p.bind(h, "change", function() {
                t.useLocalStorage = !t.useLocalStorage, e()
            })
        }
        var u = document.getElementById("dg-new-constructor");
        p.bind(u, "keydown", function(t) {
            !t.metaKey || 67 !== t.which && 67 != t.keyCode || R.hide()
        }), p.bind(o, "click", function() {
            u.innerHTML = JSON.stringify(t.getSaveObject(), void 0, 2), R.show(), u.focus(), u.select()
        }), p.bind(n, "click", function() {
            t.save()
        }), p.bind(r, "click", function() {
            var e = prompt("Enter a new preset name.");
            e && t.saveAs(e)
        }), p.bind(s, "click", function() {
            t.revert()
        })
    }

    function w(t) {
        function e(e) {
            return e.preventDefault(), n = e.clientX, p.addClass(t.__closeButton, V.CLASS_DRAG), p.bind(window, "mousemove", i), p.bind(window, "mouseup", o), !1
        }

        function i(e) {
            return e.preventDefault(), t.width += n - e.clientX, t.onResize(), n = e.clientX, !1
        }

        function o() {
            p.removeClass(t.__closeButton, V.CLASS_DRAG), p.unbind(window, "mousemove", i), p.unbind(window, "mouseup", o)
        }
        t.__resize_handle = document.createElement("div"), f.extend(t.__resize_handle.style, {
            width: "6px",
            marginLeft: "-3px",
            height: "200px",
            cursor: "ew-resize",
            position: "absolute"
        });
        var n;
        p.bind(t.__resize_handle, "mousedown", e), p.bind(t.__closeButton, "mousedown", e), t.domElement.insertBefore(t.__resize_handle, t.domElement.firstElementChild)
    }

    function S(t, e) {
        t.domElement.style.width = e + "px", t.__save_row && t.autoPlace && (t.__save_row.style.width = e + "px"), t.__closeButton && (t.__closeButton.style.width = e + "px")
    }

    function b(t, e) {
        var i = {};
        return f.each(t.__rememberedObjects, function(o, n) {
            var r = {},
                s = t.__rememberedObjectIndecesToControllers[n];
            f.each(s, function(t, i) {
                r[i] = e ? t.initialValue : t.getValue()
            }), i[n] = r
        }), i
    }

    function x(t, e, i) {
        var o = document.createElement("option");
        o.innerHTML = e, o.value = e, t.__preset_select.appendChild(o), i && (t.__preset_select.selectedIndex = t.__preset_select.length - 1)
    }

    function A(t) {
        for (var e = 0; e < t.__preset_select.length; e++) t.__preset_select[e].value == t.preset && (t.__preset_select.selectedIndex = e)
    }

    function T(t, e) {
        var i = t.__preset_select[t.__preset_select.selectedIndex];
        e ? i.innerHTML = i.value + "*" : i.innerHTML = i.value
    }

    function N(t) {
        0 != t.length && u(function() {
            N(t)
        }), f.each(t, function(t) {
            t.updateDisplay()
        })
    }
    t.inject(i);
    var R, C, P = "dg",
        I = 72,
        O = 20,
        L = "Default",
        M = function() {
            try {
                return "localStorage" in window && null !== window.localStorage
            } catch (t) {
                return !1
            }
        }(),
        B = !0,
        F = !1,
        H = [],
        V = function(t) {
            function e() {
                localStorage.setItem(_(o, "gui"), JSON.stringify(o.getSaveObject()))
            }

            function i() {
                var t = o.getRoot();
                t.width += 1, f.defer(function() {
                    t.width -= 1
                })
            }
            var o = this;
            this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), p.addClass(this.domElement, P), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], t = t || {}, t = f.defaults(t, {
                autoPlace: !0,
                width: V.DEFAULT_WIDTH
            }), t = f.defaults(t, {
                resizable: t.autoPlace,
                hideable: t.autoPlace
            }), f.isUndefined(t.load) ? t.load = {
                preset: L
            } : t.preset && (t.load.preset = t.preset), f.isUndefined(t.parent) && t.hideable && H.push(this), t.resizable = f.isUndefined(t.parent) && t.resizable, t.autoPlace && f.isUndefined(t.scrollable) && (t.scrollable = !0);
            var n = M && "true" === localStorage.getItem(_(this, "isLocal"));
            if (Object.defineProperties(this, {
                    parent: {
                        get: function() {
                            return t.parent
                        }
                    },
                    scrollable: {
                        get: function() {
                            return t.scrollable
                        }
                    },
                    autoPlace: {
                        get: function() {
                            return t.autoPlace
                        }
                    },
                    preset: {
                        get: function() {
                            return o.parent ? o.getRoot().preset : t.load.preset
                        },
                        set: function(e) {
                            o.parent ? o.getRoot().preset = e : t.load.preset = e, A(this), o.revert()
                        }
                    },
                    width: {
                        get: function() {
                            return t.width
                        },
                        set: function(e) {
                            t.width = e, S(o, e)
                        }
                    },
                    name: {
                        get: function() {
                            return t.name
                        },
                        set: function(e) {
                            t.name = e, s && (s.innerHTML = t.name)
                        }
                    },
                    closed: {
                        get: function() {
                            return t.closed
                        },
                        set: function(e) {
                            t.closed = e, t.closed ? p.addClass(o.__ul, V.CLASS_CLOSED) : p.removeClass(o.__ul, V.CLASS_CLOSED), this.onResize(), o.__closeButton && (o.__closeButton.innerHTML = e ? V.TEXT_OPEN : V.TEXT_CLOSED)
                        }
                    },
                    load: {
                        get: function() {
                            return t.load
                        }
                    },
                    useLocalStorage: {
                        get: function() {
                            return n
                        },
                        set: function(t) {
                            M && (n = t, t ? p.bind(window, "unload", e) : p.unbind(window, "unload", e), localStorage.setItem(_(o, "isLocal"), t))
                        }
                    }
                }), f.isUndefined(t.parent)) {
                if (t.closed = !1, p.addClass(this.domElement, V.CLASS_MAIN), p.makeSelectable(this.domElement, !1), M && n) {
                    o.useLocalStorage = !0;
                    var r = localStorage.getItem(_(this, "gui"));
                    r && (t.load = JSON.parse(r))
                }
                this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = V.TEXT_CLOSED, p.addClass(this.__closeButton, V.CLASS_CLOSE_BUTTON), this.domElement.appendChild(this.__closeButton), p.bind(this.__closeButton, "click", function() {
                    o.closed = !o.closed
                })
            } else {
                void 0 === t.closed && (t.closed = !0);
                var s = document.createTextNode(t.name);
                p.addClass(s, "controller-name");
                var a = v(o, s),
                    l = function(t) {
                        return t.preventDefault(), o.closed = !o.closed, !1
                    };
                p.addClass(this.__ul, V.CLASS_CLOSED), p.addClass(a, "title"), p.bind(a, "click", l), t.closed || (this.closed = !1)
            }
            t.autoPlace && (f.isUndefined(t.parent) && (B && (C = document.createElement("div"), p.addClass(C, P), p.addClass(C, V.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(C), B = !1), C.appendChild(this.domElement), p.addClass(this.domElement, V.CLASS_AUTO_PLACE)), this.parent || S(o, t.width)), p.bind(window, "resize", function() {
                o.onResize()
            }), p.bind(this.__ul, "webkitTransitionEnd", function() {
                o.onResize()
            }), p.bind(this.__ul, "transitionend", function() {
                o.onResize()
            }), p.bind(this.__ul, "oTransitionEnd", function() {
                o.onResize()
            }), this.onResize(), t.resizable && w(this);
            o.getRoot();
            t.parent || i()
        };
    return V.toggleHide = function() {
        F = !F, f.each(H, function(t) {
            t.domElement.style.zIndex = F ? -999 : 999, t.domElement.style.opacity = F ? 0 : 1
        })
    }, V.CLASS_AUTO_PLACE = "a", V.CLASS_AUTO_PLACE_CONTAINER = "ac", V.CLASS_MAIN = "main", V.CLASS_CONTROLLER_ROW = "cr", V.CLASS_TOO_TALL = "taller-than-window", V.CLASS_CLOSED = "closed", V.CLASS_CLOSE_BUTTON = "close-button", V.CLASS_DRAG = "drag", V.DEFAULT_WIDTH = 245, V.TEXT_CLOSED = "Close Controls", V.TEXT_OPEN = "Open Controls", p.bind(window, "keydown", function(t) {
        "text" === document.activeElement.type || t.which !== I && t.keyCode != I || V.toggleHide()
    }, !1), f.extend(V.prototype, {
        add: function(t, e) {
            return m(this, t, e, {
                factoryArgs: Array.prototype.slice.call(arguments, 2)
            })
        },
        addColor: function(t, e) {
            return m(this, t, e, {
                color: !0
            })
        },
        remove: function(t) {
            this.__ul.removeChild(t.__li), this.__controllers.slice(this.__controllers.indexOf(t), 1);
            var e = this;
            f.defer(function() {
                e.onResize()
            })
        },
        destroy: function() {
            this.autoPlace && C.removeChild(this.domElement)
        },
        addFolder: function(t) {
            if (void 0 !== this.__folders[t]) throw new Error('You already have a folder in this GUI by the name "' + t + '"');
            var e = {
                name: t,
                parent: this
            };
            e.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[t] && (e.closed = this.load.folders[t].closed, e.load = this.load.folders[t]);
            var i = new V(e);
            this.__folders[t] = i;
            var o = v(this, i.domElement);
            return p.addClass(o, "folder"), i
        },
        open: function() {
            this.closed = !1
        },
        close: function() {
            this.closed = !0
        },
        onResize: function() {
            var t = this.getRoot();
            if (t.scrollable) {
                var e = p.getOffset(t.__ul).top,
                    i = 0;
                f.each(t.__ul.childNodes, function(e) {
                    t.autoPlace && e === t.__save_row || (i += p.getHeight(e))
                }), window.innerHeight - e - O < i ? (p.addClass(t.domElement, V.CLASS_TOO_TALL), t.__ul.style.height = window.innerHeight - e - O + "px") : (p.removeClass(t.domElement, V.CLASS_TOO_TALL), t.__ul.style.height = "auto")
            }
            t.__resize_handle && f.defer(function() {
                t.__resize_handle.style.height = t.__ul.offsetHeight + "px"
            }), t.__closeButton && (t.__closeButton.style.width = t.width + "px")
        },
        remember: function() {
            if (f.isUndefined(R) && (R = new d, R.domElement.innerHTML = e), this.parent) throw new Error("You can only call remember on a top level GUI.");
            var t = this;
            f.each(Array.prototype.slice.call(arguments), function(e) {
                0 == t.__rememberedObjects.length && E(t), -1 == t.__rememberedObjects.indexOf(e) && t.__rememberedObjects.push(e)
            }), this.autoPlace && S(this, this.width)
        },
        getRoot: function() {
            for (var t = this; t.parent;) t = t.parent;
            return t
        },
        getSaveObject: function() {
            var t = this.load;
            return t.closed = this.closed, this.__rememberedObjects.length > 0 && (t.preset = this.preset, t.remembered || (t.remembered = {}), t.remembered[this.preset] = b(this)), t.folders = {}, f.each(this.__folders, function(e, i) {
                t.folders[i] = e.getSaveObject()
            }), t
        },
        save: function() {
            this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = b(this), T(this, !1)
        },
        saveAs: function(t) {
            this.load.remembered || (this.load.remembered = {}, this.load.remembered[L] = b(this, !0)), this.load.remembered[t] = b(this), this.preset = t, x(this, t, !0)
        },
        revert: function(t) {
            f.each(this.__controllers, function(e) {
                this.getRoot().load.remembered ? g(t || this.getRoot(), e) : e.setValue(e.initialValue)
            }, this), f.each(this.__folders, function(t) {
                t.revert(t)
            }), t || T(this.getRoot(), !1)
        },
        listen: function(t) {
            var e = 0 == this.__listening.length;
            this.__listening.push(t), e && N(this.__listening)
        }
    }), V
}(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity 0.1s linear;-o-transition:opacity 0.1s linear;-moz-transition:opacity 0.1s linear;transition:opacity 0.1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save ul{margin-top:27px}.dg.a.has-save ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height 0.1s ease-out;-o-transition:height 0.1s ease-out;-moz-transition:height 0.1s ease-out;transition:height 0.1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li > *{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}\n", dat.controllers.factory = function(t, e, i, o, n, r, s) {
    return function(a, l) {
        var c = a[l];
        return s.isArray(arguments[2]) || s.isObject(arguments[2]) ? new t(a, l, arguments[2]) : s.isNumber(c) ? s.isNumber(arguments[2]) && s.isNumber(arguments[3]) ? new i(a, l, arguments[2], arguments[3]) : new e(a, l, {
            min: arguments[2],
            max: arguments[3]
        }) : s.isString(c) ? new o(a, l) : s.isFunction(c) ? new n(a, l, "") : s.isBoolean(c) ? new r(a, l) : void 0
    }
}(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = function(t, e, i) {
    var o = function(t, i) {
        function n() {
            s.setValue(s.__input.value)
        }

        function r() {
            s.__onFinishChange && s.__onFinishChange.call(s, s.getValue())
        }
        o.superclass.call(this, t, i);
        var s = this;
        this.__input = document.createElement("input"), this.__input.setAttribute("type", "text"), e.bind(this.__input, "keyup", n), e.bind(this.__input, "change", n), e.bind(this.__input, "blur", r), e.bind(this.__input, "keydown", function(t) {
            13 === t.keyCode && this.blur()
        }), this.updateDisplay(), this.domElement.appendChild(this.__input)
    };
    return o.superclass = t, i.extend(o.prototype, t.prototype, {
        updateDisplay: function() {
            return e.isActive(this.__input) || (this.__input.value = this.getValue()), o.superclass.prototype.updateDisplay.call(this)
        }
    }), o
}(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = function(t, e, i, o, n) {
    function r(t, e, i, o) {
        t.style.background = "", n.each(l, function(n) {
            t.style.cssText += "background: " + n + "linear-gradient(" + e + ", " + i + " 0%, " + o + " 100%); "
        })
    }

    function s(t) {
        t.style.background = "", t.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", t.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", t.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", t.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", t.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
    }
    var a = function(t, l) {
        function c(t) {
            p(t), e.bind(window, "mousemove", p), e.bind(window, "mouseup", h)
        }

        function h() {
            e.unbind(window, "mousemove", p), e.unbind(window, "mouseup", h)
        }

        function u() {
            var t = o(this.value);
            t !== !1 ? (m.__color.__state = t, m.setValue(m.__color.toOriginal())) : this.value = m.__color.toString()
        }

        function d() {
            e.unbind(window, "mousemove", f), e.unbind(window, "mouseup", d)
        }

        function p(t) {
            t.preventDefault();
            var i = e.getWidth(m.__saturation_field),
                o = e.getOffset(m.__saturation_field),
                n = (t.clientX - o.left + document.body.scrollLeft) / i,
                r = 1 - (t.clientY - o.top + document.body.scrollTop) / i;
            return r > 1 ? r = 1 : 0 > r && (r = 0), n > 1 ? n = 1 : 0 > n && (n = 0), m.__color.v = r, m.__color.s = n, m.setValue(m.__color.toOriginal()), !1
        }

        function f(t) {
            t.preventDefault();
            var i = e.getHeight(m.__hue_field),
                o = e.getOffset(m.__hue_field),
                n = 1 - (t.clientY - o.top + document.body.scrollTop) / i;
            return n > 1 ? n = 1 : 0 > n && (n = 0), m.__color.h = 360 * n, m.setValue(m.__color.toOriginal()), !1
        }
        a.superclass.call(this, t, l), this.__color = new i(this.getValue()), this.__temp = new i(0);
        var m = this;
        this.domElement = document.createElement("div"), e.makeSelectable(this.domElement, !1), this.__selector = document.createElement("div"), this.__selector.className = "selector", this.__saturation_field = document.createElement("div"), this.__saturation_field.className = "saturation-field", this.__field_knob = document.createElement("div"), this.__field_knob.className = "field-knob", this.__field_knob_border = "2px solid ", this.__hue_knob = document.createElement("div"), this.__hue_knob.className = "hue-knob", this.__hue_field = document.createElement("div"), this.__hue_field.className = "hue-field", this.__input = document.createElement("input"), this.__input.type = "text", this.__input_textShadow = "0 1px 1px ", e.bind(this.__input, "keydown", function(t) {
            13 === t.keyCode && u.call(this)
        }), e.bind(this.__input, "blur", u), e.bind(this.__selector, "mousedown", function(t) {
            e.addClass(this, "drag").bind(window, "mouseup", function(t) {
                e.removeClass(m.__selector, "drag")
            })
        });
        var v = document.createElement("div");
        n.extend(this.__selector.style, {
            width: "122px",
            height: "102px",
            padding: "3px",
            backgroundColor: "#222",
            boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
        }), n.extend(this.__field_knob.style, {
            position: "absolute",
            width: "12px",
            height: "12px",
            border: this.__field_knob_border + (this.__color.v < .5 ? "#fff" : "#000"),
            boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
            borderRadius: "12px",
            zIndex: 1
        }), n.extend(this.__hue_knob.style, {
            position: "absolute",
            width: "15px",
            height: "2px",
            borderRight: "4px solid #fff",
            zIndex: 1
        }), n.extend(this.__saturation_field.style, {
            width: "100px",
            height: "100px",
            border: "1px solid #555",
            marginRight: "3px",
            display: "inline-block",
            cursor: "pointer"
        }), n.extend(v.style, {
            width: "100%",
            height: "100%",
            background: "none"
        }), r(v, "top", "rgba(0,0,0,0)", "#000"), n.extend(this.__hue_field.style, {
            width: "15px",
            height: "100px",
            display: "inline-block",
            border: "1px solid #555",
            cursor: "ns-resize"
        }), s(this.__hue_field), n.extend(this.__input.style, {
            outline: "none",
            textAlign: "center",
            color: "#fff",
            border: 0,
            fontWeight: "bold",
            textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
        }), e.bind(this.__saturation_field, "mousedown", c), e.bind(this.__field_knob, "mousedown", c), e.bind(this.__hue_field, "mousedown", function(t) {
            f(t), e.bind(window, "mousemove", f), e.bind(window, "mouseup", d)
        }), this.__saturation_field.appendChild(v), this.__selector.appendChild(this.__field_knob), this.__selector.appendChild(this.__saturation_field), this.__selector.appendChild(this.__hue_field), this.__hue_field.appendChild(this.__hue_knob), this.domElement.appendChild(this.__input), this.domElement.appendChild(this.__selector), this.updateDisplay()
    };
    a.superclass = t, n.extend(a.prototype, t.prototype, {
        updateDisplay: function() {
            var t = o(this.getValue());
            if (t !== !1) {
                var e = !1;
                n.each(i.COMPONENTS, function(i) {
                    return n.isUndefined(t[i]) || n.isUndefined(this.__color.__state[i]) || t[i] === this.__color.__state[i] ? void 0 : (e = !0, {})
                }, this), e && n.extend(this.__color.__state, t)
            }
            n.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
            var s = this.__color.v < .5 || this.__color.s > .5 ? 255 : 0,
                a = 255 - s;
            n.extend(this.__field_knob.style, {
                marginLeft: 100 * this.__color.s - 7 + "px",
                marginTop: 100 * (1 - this.__color.v) - 7 + "px",
                backgroundColor: this.__temp.toString(),
                border: this.__field_knob_border + "rgb(" + s + "," + s + "," + s + ")"
            }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, r(this.__saturation_field, "left", "#fff", this.__temp.toString()), n.extend(this.__input.style, {
                backgroundColor: this.__input.value = this.__color.toString(),
                color: "rgb(" + s + "," + s + "," + s + ")",
                textShadow: this.__input_textShadow + "rgba(" + a + "," + a + "," + a + ",.7)"
            })
        }
    });
    var l = ["-moz-", "-o-", "-webkit-", "-ms-", ""];
    return a
}(dat.controllers.Controller, dat.dom.dom, dat.color.Color = function(t, e, i, o) {
    function n(t, e, i) {
        Object.defineProperty(t, e, {
            get: function() {
                return "RGB" === this.__state.space ? this.__state[e] : (s(this, e, i), this.__state[e])
            },
            set: function(t) {
                "RGB" !== this.__state.space && (s(this, e, i), this.__state.space = "RGB"), this.__state[e] = t
            }
        })
    }

    function r(t, e) {
        Object.defineProperty(t, e, {
            get: function() {
                return "HSV" === this.__state.space ? this.__state[e] : (a(this), this.__state[e])
            },
            set: function(t) {
                "HSV" !== this.__state.space && (a(this), this.__state.space = "HSV"), this.__state[e] = t
            }
        })
    }

    function s(t, i, n) {
        if ("HEX" === t.__state.space) t.__state[i] = e.component_from_hex(t.__state.hex, n);
        else {
            if ("HSV" !== t.__state.space) throw "Corrupted color state";
            o.extend(t.__state, e.hsv_to_rgb(t.__state.h, t.__state.s, t.__state.v))
        }
    }

    function a(t) {
        var i = e.rgb_to_hsv(t.r, t.g, t.b);
        o.extend(t.__state, {
            s: i.s,
            v: i.v
        }), o.isNaN(i.h) ? o.isUndefined(t.__state.h) && (t.__state.h = 0) : t.__state.h = i.h
    }
    var l = function() {
        if (this.__state = t.apply(this, arguments), this.__state === !1) throw "Failed to interpret color arguments";
        this.__state.a = this.__state.a || 1
    };
    return l.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], o.extend(l.prototype, {
        toString: function() {
            return i(this)
        },
        toOriginal: function() {
            return this.__state.conversion.write(this)
        }
    }), n(l.prototype, "r", 2), n(l.prototype, "g", 1), n(l.prototype, "b", 0), r(l.prototype, "h"), r(l.prototype, "s"), r(l.prototype, "v"), Object.defineProperty(l.prototype, "a", {
        get: function() {
            return this.__state.a
        },
        set: function(t) {
            this.__state.a = t
        }
    }), Object.defineProperty(l.prototype, "hex", {
        get: function() {
            return "HEX" !== !this.__state.space && (this.__state.hex = e.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex
        },
        set: function(t) {
            this.__state.space = "HEX", this.__state.hex = t
        }
    }), l
}(dat.color.interpret, dat.color.math = function() {
    var t;
    return {
        hsv_to_rgb: function(t, e, i) {
            var o = Math.floor(t / 60) % 6,
                n = t / 60 - Math.floor(t / 60),
                r = i * (1 - e),
                s = i * (1 - n * e),
                a = i * (1 - (1 - n) * e),
                l = [
                    [i, a, r],
                    [s, i, r],
                    [r, i, a],
                    [r, s, i],
                    [a, r, i],
                    [i, r, s]
                ][o];
            return {
                r: 255 * l[0],
                g: 255 * l[1],
                b: 255 * l[2]
            }
        },
        rgb_to_hsv: function(t, e, i) {
            var o, n, r = Math.min(t, e, i),
                s = Math.max(t, e, i),
                a = s - r;
            return 0 == s ? {
                h: NaN,
                s: 0,
                v: 0
            } : (n = a / s, o = t == s ? (e - i) / a : e == s ? 2 + (i - t) / a : 4 + (t - e) / a, o /= 6, 0 > o && (o += 1), {
                h: 360 * o,
                s: n,
                v: s / 255
            })
        },
        rgb_to_hex: function(t, e, i) {
            var o = this.hex_with_component(0, 2, t);
            return o = this.hex_with_component(o, 1, e), o = this.hex_with_component(o, 0, i)
        },
        component_from_hex: function(t, e) {
            return t >> 8 * e & 255
        },
        hex_with_component: function(e, i, o) {
            return o << (t = 8 * i) | e & ~(255 << t)
        }
    }
}(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = function() {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
        window.setTimeout(t, 1e3 / 60)
    }
}(), dat.dom.CenteredDiv = function(t, e) {
    var i = function() {
        this.backgroundElement = document.createElement("div"), e.extend(this.backgroundElement.style, {
            backgroundColor: "rgba(0,0,0,0.8)",
            top: 0,
            left: 0,
            display: "none",
            zIndex: "1000",
            opacity: 0,
            WebkitTransition: "opacity 0.2s linear"
        }), t.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), e.extend(this.domElement.style, {
            position: "fixed",
            display: "none",
            zIndex: "1001",
            opacity: 0,
            WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
        }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
        var i = this;
        t.bind(this.backgroundElement, "click", function() {
            i.hide()
        })
    };
    return i.prototype.show = function() {
        var t = this;
        this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), e.defer(function() {
            t.backgroundElement.style.opacity = 1, t.domElement.style.opacity = 1, t.domElement.style.webkitTransform = "scale(1)"
        })
    }, i.prototype.hide = function() {
        var e = this,
            i = function() {
                e.domElement.style.display = "none", e.backgroundElement.style.display = "none", t.unbind(e.domElement, "webkitTransitionEnd", i), t.unbind(e.domElement, "transitionend", i), t.unbind(e.domElement, "oTransitionEnd", i)
            };
        t.bind(this.domElement, "webkitTransitionEnd", i), t.bind(this.domElement, "transitionend", i), t.bind(this.domElement, "oTransitionEnd", i), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)";
    }, i.prototype.layout = function() {
        this.domElement.style.left = window.innerWidth / 2 - t.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - t.getHeight(this.domElement) / 2 + "px"
    }, i
}(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_iCanvasResizeHeight, s_iCanvasResizeWidth, s_iCanvasOffsetHeight, s_iCanvasOffsetWidth, s_iAdsLevel = 1,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack, s_oGame;
TEXT_GAMEOVER = "GAME OVER", TEXT_SCORE = "TOTAL SCORE", TEXT_HELP1_PC = "PRESS SPACE BAR TO SWITCH", TEXT_HELP1_MOBILE = "TOUCH DISPLAY TO SWITCH", TEXT_POWER = "POWER", TEXT_EFFECT = "EFFECT", TEXT_TOTAL = "TOTAL", TEXT_ARE_SURE = "ARE YOU SURE?", TEXT_CREDITS_DEVELOPED = "DEVELOPED BY", TEXT_LINK1 = "WWW.CODETHISLAB.COM", TEXT_MOVE = "MOVE", TEXT_SHARE_IMAGE = "200x200.jpg", TEXT_SHARE_TITLE = "Congratulations!", TEXT_SHARE_MSG1 = "You collected <strong>", TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!", TEXT_SHARE_SHARE1 = "My score is ", TEXT_SHARE_SHARE2 = " points! Can you do better?", Detector = {
        canvas: !!window.CanvasRenderingContext2D,
        webgl: function() {
            try {
                return !!window.WebGLRenderingContext && !!document.createElement("canvas").getContext("experimental-webgl")
            } catch (t) {
                return !1
            }
        }(),
        workers: !!window.Worker,
        fileapi: window.File && window.FileReader && window.FileList && window.Blob,
        getWebGLErrorMessage: function() {
            var t = document.createElement("div");
            return t.id = "webgl-error-message", t.style.fontFamily = "monospace", t.style.fontSize = "13px", t.style.fontWeight = "normal", t.style.textAlign = "center", t.style.background = "#fff", t.style.color = "#000", t.style.padding = "1.5em", t.style.width = "400px", t.style.margin = "5em auto 0", this.webgl || (t.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n") : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n")), t
        },
        addGetWebGLMessage: function(t) {
            var e, i, o;
            t = t || {}, e = void 0 !== t.parent ? t.parent : document.body, i = void 0 !== t.id ? t.id : "oldie", o = Detector.getWebGLErrorMessage(), o.id = i, e.appendChild(o)
        }
    },
    function() {
        function t() {}

        function e() {}

        function i() {}

        function o() {
            this.skinIndices = [], this.skinWeights = [], this.matrices = []
        }

        function n() {
            this.hierarchy = []
        }

        function r() {
            this.node = null, this.name = null, this.id = null, this.vertices = [], this.indices = [], this.normals = [], this.uvs = [], this.bones = [], this.skins = null
        }

        function s() {
            this.uv = null, this.map = null, this.ref = null, this.node = null, this.index = null
        }

        function a() {
            this.normal = null, this.map = null, this.ref = null, this.node = null, this.index = null
        }

        function l() {
            this.version = null, this.id = null, this.internalId = null, this.times = null, this.values = null, this.attrFlag = null, this.attrData = null
        }

        function c() {
            this.id = null, this.attr = null, this.attrX = !1, this.attrY = !1, this.attrZ = !1, this.internalId = null, this.containerInternalId = null, this.containerBoneId = null, this.curveIdx = null, this.curves = []
        }

        function h() {
            this.curves = {}, this.length = 0, this.fps = 30, this.frames = 0
        }

        function u() {
            this.textures = [], this.perGeoMap = {}
        }

        function d() {
            this.fileName = "", this.name = "", this.id = null, this.parentIds = []
        }

        function p(t, e, i) {
            for (var o = [], n = 0; n < e.length; ++n)
                for (var r = 0; i > r; ++r) o.push(t[e[n] * i + r]);
            return o
        }

        function f(t, e, i) {
            for (var o = {}, n = [], r = 0, s = 0; s < e.length; ++s)
                if (!(e[s] in o)) {
                    o[e[s]] = {};
                    for (var a = 0; i > a; ++a) o[e[s]][a] = t[s * i + a];
                    r = r < e[s] ? e[s] : r
                }
            try {
                for (s = 0; r >= s; s++)
                    for (var l = 0; i > l; l++) n.push(o[s][l])
            } catch (c) {}
            return n
        }
        THREE.FBXLoader = function(t, e) {
            THREE.Loader.call(this, t), this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager, this.textureLoader = null, this.textureBasePath = null
        }, THREE.FBXLoader.prototype = Object.create(THREE.Loader.prototype), THREE.FBXLoader.prototype.constructor = THREE.FBXLoader, THREE.FBXLoader.prototype.load = function(t, e, i, o) {
            var n = this,
                r = new THREE.XHRLoader(n.manager);
            r.load(t, function(i) {
                n.isFbxFormatASCII(i) ? n.isFbxVersionSupported(i) ? (n.textureBasePath = n.extractUrlBase(t), e(n.parse(i))) : console.warn("FBXLoader: !!! FBX Version below 7 not supported !!!") : console.warn("FBXLoader: !!! FBX Binary format not supported !!!")
            }, i, o)
        }, THREE.FBXLoader.prototype.setCrossOrigin = function(t) {
            this.crossOrigin = t
        }, THREE.FBXLoader.prototype.isFbxFormatASCII = function(t) {
            CORRECT = ["K", "a", "y", "d", "a", "r", "a", "\\", "F", "B", "X", "\\", "B", "i", "n", "a", "r", "y", "\\", "\\"];
            for (var e = 0, i = function(i) {
                    var o = t[i - 1];
                    return t = t.slice(e + i), e++, o
                }, o = 0; o < CORRECT.length; ++o)
                if (num = i(1), num == CORRECT[o]) return !1;
            return !0
        }, THREE.FBXLoader.prototype.isFbxVersionSupported = function(t) {
            var e = /FBXVersion: (\d+)/;
            if (match = t.match(e), match) {
                var i = parseInt(match[1]);
                return console.log("FBXLoader: FBX version " + i), i >= 7e3
            }
            return !1
        }, THREE.FBXLoader.prototype.parse = function(t) {
            var i = this;
            console.time("FBXLoader"), console.time("FBXLoader: TextParser");
            var r = (new e).parse(t);
            console.timeEnd("FBXLoader: TextParser"), console.time("FBXLoader: ObjectParser"), i.hierarchy = (new n).parseHierarchy(r), i.weights = (new o).parse(r, i.hierarchy), i.animations = (new h).parse(r, i.hierarchy), i.textures = (new u).parse(r, i.hierarchy), console.timeEnd("FBXLoader: ObjectParser"), console.time("FBXLoader: GeometryParser"), geometries = this.parseGeometries(r), console.timeEnd("FBXLoader: GeometryParser");
            for (var s = new THREE.Group, a = 0; a < geometries.length; ++a) void 0 !== geometries[a] && s.add(geometries[a]);
            return console.timeEnd("FBXLoader"), s
        }, THREE.FBXLoader.prototype.parseGeometries = function(t) {
            if (!("Geometry" in t.Objects.subNodes)) return [];
            var e = 0;
            for (var i in t.Objects.subNodes.Geometry) i.match(/^\d+$/) && e++;
            var o = [];
            if (e > 0)
                for (i in t.Objects.subNodes.Geometry) "Mesh" === t.Objects.subNodes.Geometry[i].attrType && o.push(this.parseGeometry(t.Objects.subNodes.Geometry[i], t));
            else o.push(this.parseGeometry(t.Objects.subNodes.Geometry, t));
            return o
        }, THREE.FBXLoader.prototype.parseGeometry = function(t, e) {
            geo = (new r).parse(t), geo.addBones(this.hierarchy.hierarchy);
            var i = new THREE.BufferGeometry;
            i.name = geo.name, i.addAttribute("position", new THREE.BufferAttribute(new Float32Array(geo.vertices), 3)), void 0 !== geo.normals && geo.normals.length > 0 && i.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(geo.normals), 3)), void 0 !== geo.uvs && geo.uvs.length > 0 && i.addAttribute("uv", new THREE.BufferAttribute(new Float32Array(geo.uvs), 2)), void 0 !== geo.indices && geo.indices.length > 65535 ? i.setIndex(new THREE.BufferAttribute(new Uint32Array(geo.indices), 1)) : void 0 !== geo.indices && i.setIndex(new THREE.BufferAttribute(new Uint16Array(geo.indices), 1)), i.verticesNeedUpdate = !0, i.computeBoundingSphere(), i.computeBoundingBox();
            var o, n = this.textures.getById(e.searchConnectionParent(geo.id));
            void 0 !== n && n.length > 0 && (null === this.textureLoader && (this.textureLoader = new THREE.TextureLoader), o = this.textureLoader.load(this.textureBasePath + "/" + n[0].fileName));
            var s;
            s = void 0 !== o ? new THREE.MeshBasicMaterial({
                map: o
            }) : new THREE.MeshBasicMaterial({
                color: 3342591
            }), i = (new THREE.Geometry).fromBufferGeometry(i), i.bones = geo.bones, i.skinIndices = this.weights.skinIndices, i.skinWeights = this.weights.skinWeights;
            var a = null;
            if (void 0 === geo.bones || void 0 === geo.skins || void 0 === this.animations || 0 === this.animations.length) {
                a = new THREE.Mesh(i, s);
                for (var l = e.Connections.properties.connections, c = e.Objects.subNodes.Model, h = 0; h < l.length; h++)
                    if (l[h][0] === t.id) {
                        if (a.name = c[l[h][1]].attrName, c[l[h][1]].properties.Lcl_Translation) {
                            for (var u = c[l[h][1]].properties.Lcl_Translation.value.split(","), h = 0; h < u.length; h++) u[h] = parseFloat(u[h]);
                            a.position.x = u[0], a.position.y = u[1], a.position.z = u[2]
                        }
                        break
                    }
            } else s.skinning = !0, a = new THREE.SkinnedMesh(i, s), this.addAnimation(a, this.weights.matrices, this.animations);
            return a
        }, THREE.FBXLoader.prototype.addAnimation = function(t, e, i) {
            for (var o = {
                    name: "animationtest",
                    fps: 30,
                    length: i.length,
                    hierarchy: []
                }, n = 0; n < t.geometry.bones.length; ++n) {
                var r = t.geometry.bones[n].name;
                r = r.replace(/.*:/, ""), o.hierarchy.push({
                    parent: t.geometry.bones[n].parent,
                    name: r,
                    keys: []
                })
            }
            var s = function(t, e) {
                    if (void 0 === t) return !1;
                    var i;
                    switch (e) {
                        case "S":
                            if (void 0 === t.S) return !1;
                            i = t.S;
                            break;
                        case "R":
                            if (void 0 === t.R) return !1;
                            i = t.R;
                            break;
                        case "T":
                            if (void 0 === t.T) return !1;
                            i = t.T
                    }
                    return void 0 === i.curves.x ? !1 : void 0 === i.curves.y ? !1 : void 0 !== i.curves.z
                },
                a = function(t, e) {
                    var i = l(t.curves.x, e),
                        o = l(t.curves.y, e),
                        n = l(t.curves.z, e);
                    return i && o && n
                },
                l = function(t, e) {
                    var i = t.values[e];
                    return void 0 !== i
                },
                c = function(t, e) {
                    var o = {};
                    if (o.time = frame / i.fps, o.pos = e.pos, o.rot = e.rotq, o.scl = e.scl, void 0 === t) return o;
                    try {
                        if (s(t, "T") && a(t.T, frame)) {
                            var n = new THREE.Vector3(t.T.curves.x.values[frame], t.T.curves.y.values[frame], t.T.curves.z.values[frame]);
                            o.pos = [n.x, n.y, n.z]
                        } else delete o.pos;
                        if (s(t, "R") && a(t.R, frame)) {
                            var r = degToRad(t.R.curves.x.values[frame]),
                                l = degToRad(t.R.curves.y.values[frame]),
                                c = degToRad(t.R.curves.z.values[frame]),
                                h = new THREE.Vector3(r, l, c),
                                u = quatFromVec(h.x, h.y, h.z);
                            o.rot = [u.x, u.y, u.z, u.w]
                        } else delete o.rot;
                        if (s(t, "S") && a(t.S, frame)) {
                            var d = new THREE.Vector3(t.S.curves.x.values[frame], t.S.curves.y.values[frame], t.S.curves.z.values[frame]);
                            o.scl = [d.x, d.y, d.z]
                        } else delete o.scl
                    } catch (p) {
                        console.log(e), console.log(p)
                    }
                    return o
                },
                h = t.geometry.bones;
            for (frame = 0; frame < i.frames; frame++)
                for (n = 0; n < h.length; n++)
                    for (var u = h[n], d = i.curves[n], p = 0; p < o.hierarchy.length; p++) o.hierarchy[p].name === u.name && o.hierarchy[p].keys.push(c(d, u));
            void 0 === t.geometry.animations && (t.geometry.animations = []), t.geometry.animations.push(THREE.AnimationClip.parseAnimation(o, t.geometry.bones))
        }, THREE.FBXLoader.prototype.parseMaterials = function(t) {
            if (!("Material" in t.subNodes)) return [];
            var e = 0;
            for (var i in t.subNodes.Materials) i.match(/^\d+$/) && e++;
            var o = [];
            if (e > 0)
                for (i in t.subNodes.Material) o.push(parseMaterial(t.subNodes.Material[i]));
            else o.push(parseMaterial(t.subNodes.Material));
            return o
        }, THREE.FBXLoader.prototype.parseMaterial = function(t) {}, THREE.FBXLoader.prototype.loadFile = function(t, e, i, o, n) {
            var r = new THREE.XHRLoader(this.manager);
            r.setResponseType(n);
            var s = r.load(t, function(t) {
                e(t)
            }, i, o);
            return s
        }, THREE.FBXLoader.prototype.loadFileAsBuffer = function(t, e, i, o) {
            this.loadFile(t, onLoad, i, o, "arraybuffer")
        }, THREE.FBXLoader.prototype.loadFileAsText = function(t, e, i, o) {
            this.loadFile(t, e, i, o, "text")
        }, t.prototype.add = function(t, e) {
            this[t] = e
        }, t.prototype.searchConnectionParent = function(t) {
            if (void 0 === this.__cache_search_connection_parent && (this.__cache_search_connection_parent = []), void 0 !== this.__cache_search_connection_parent[t]) return this.__cache_search_connection_parent[t];
            this.__cache_search_connection_parent[t] = [];
            for (var e = this.Connections.properties.connections, i = [], o = 0; o < e.length; ++o)
                if (e[o][0] == t) {
                    var n = 0 === e[o][1] ? -1 : e[o][1];
                    i.push(n)
                }
            return i.length > 0 ? (this.__cache_search_connection_parent[t] = this.__cache_search_connection_parent[t].concat(i), i) : (this.__cache_search_connection_parent[t] = [-1], [-1])
        }, t.prototype.searchConnectionChildren = function(t) {
            if (void 0 === this.__cache_search_connection_children && (this.__cache_search_connection_children = []), void 0 !== this.__cache_search_connection_children[t]) return this.__cache_search_connection_children[t];
            this.__cache_search_connection_children[t] = [];
            for (var e = this.Connections.properties.connections, i = [], o = 0; o < e.length; ++o) e[o][1] == t && i.push(0 === e[o][0] ? -1 : e[o][0]);
            return i.length > 0 ? (this.__cache_search_connection_children[t] = this.__cache_search_connection_children[t].concat(i), i) : (this.__cache_search_connection_children[t] = [-1], [-1])
        }, t.prototype.searchConnectionType = function(t, e) {
            var i = t + "," + e;
            if (void 0 === this.__cache_search_connection_type && (this.__cache_search_connection_type = ""), void 0 !== this.__cache_search_connection_type[i]) return this.__cache_search_connection_type[i];
            this.__cache_search_connection_type[i] = "";
            for (var o = this.Connections.properties.connections, n = 0; n < o.length; ++n)
                if (o[n][0] == t && o[n][1] == e) return this.__cache_search_connection_type[i] = o[n][2], o[n][2];
            return this.__cache_search_connection_type[t] = null, null
        }, e.prototype = {
            getPrevNode: function() {
                return this.nodeStack[this.currentIndent - 2]
            },
            getCurrentNode: function() {
                return this.nodeStack[this.currentIndent - 1]
            },
            getCurrentProp: function() {
                return this.currentProp
            },
            pushStack: function(t) {
                this.nodeStack.push(t), this.currentIndent += 1
            },
            popStack: function() {
                this.nodeStack.pop(), this.currentIndent -= 1
            },
            setCurrentProp: function(t, e) {
                this.currentProp = t, this.currentPropName = e
            },
            parse: function(e) {
                this.currentIndent = 0, this.allNodes = new t, this.nodeStack = [], this.currentProp = [], this.currentPropName = "";
                var i = e.split("\n");
                for (var o in i) {
                    var n = i[o];
                    if (!n.match(/^[\s\t]*;/) && !n.match(/^[\s\t]*$/)) {
                        var r = new RegExp("^\\t{" + this.currentIndent + "}(\\w+):(.*){", "");
                        if (match = n.match(r), match) {
                            var s = match[1].trim().replace(/^"/, "").replace(/"$/, ""),
                                a = match[2].split(",").map(function(t) {
                                    return t.trim().replace(/^"/, "").replace(/"$/, "")
                                });
                            this.parseNodeBegin(n, s, a || null)
                        } else {
                            var l = new RegExp("^\\t{" + this.currentIndent + "}(\\w+):[\\s\\t\\r\\n](.*)");
                            if (match = n.match(l), match) {
                                var c = match[1].replace(/^"/, "").replace(/"$/, "").trim(),
                                    h = match[2].replace(/^"/, "").replace(/"$/, "").trim();
                                this.parseNodeProperty(n, c, h)
                            } else {
                                var u = new RegExp("^\\t{" + (this.currentIndent - 1) + "}}");
                                n.match(u) ? this.nodeEnd() : n.match(/^[^\s\t}]/) && this.parseNodePropertyContinued(n)
                            }
                        }
                    }
                }
                return this.allNodes
            },
            parseNodeBegin: function(t, e, i) {
                var o = {
                        name: e,
                        properties: {},
                        subNodes: {}
                    },
                    n = this.parseNodeAttr(i),
                    r = this.getCurrentNode();
                if (0 === this.currentIndent) this.allNodes.add(e, o);
                else if (e in r.subNodes) {
                    var s = r.subNodes[e];
                    this.isFlattenNode(r.subNodes[e]) && ("" === n.id ? (r.subNodes[e] = [], r.subNodes[e].push(s)) : (r.subNodes[e] = {}, r.subNodes[e][s.id] = s)), "" === n.id ? r.subNodes[e].push(o) : r.subNodes[e][n.id] = o
                } else r.subNodes[e] = o;
                i && (o.id = n.id, o.attrName = n.name, o.attrType = n.type), this.pushStack(o)
            },
            parseNodeAttr: function(t) {
                var e = t[0];
                "" !== t[0] && (e = parseInt(t[0]), isNaN(e) && (e = t[0]));
                var i, o;
                return t.length > 1 && (i = t[1].replace(/^(\w+)::/, ""), o = t[2]), {
                    id: e,
                    name: i || "",
                    type: o || ""
                }
            },
            parseNodeProperty: function(t, e, i) {
                var o = this.getCurrentNode(),
                    n = o.name;
                if (void 0 !== n) {
                    var r = n.match(/Properties(\d)+/);
                    if (r) return void this.parseNodeSpecialProperty(t, e, i)
                }
                if ("C" == e) {
                    var s = i.split(",").slice(1),
                        a = parseInt(s[0]),
                        l = parseInt(s[1]),
                        c = i.split(",").slice(3);
                    e = "connections", i = [a, l], i = i.concat(c), void 0 === o.properties[e] && (o.properties[e] = [])
                }
                if ("Node" == e) {
                    var h = parseInt(i);
                    o.properties.id = h, o.id = h
                }
                e in o.properties ? Array.isArray(o.properties[e]) ? o.properties[e].push(i) : o.properties[e] += i : Array.isArray(o.properties[e]) ? o.properties[e].push(i) : o.properties[e] = i, this.setCurrentProp(o.properties, e)
            },
            parseNodePropertyContinued: function(t) {
                this.currentProp[this.currentPropName] += t
            },
            parseNodeSpecialProperty: function(t, e, i) {
                var o = i.split('",').map(function(t) {
                        return t.trim().replace(/^\"/, "").replace(/\s/, "_")
                    }),
                    n = o[0],
                    r = o[1],
                    s = o[2],
                    a = o[3],
                    l = o[4];
                switch (r) {
                    case "int":
                        l = parseInt(l);
                        break;
                    case "double":
                        l = parseFloat(l);
                        break;
                    case "ColorRGB":
                    case "Vector3D":
                        var c = l.split(",");
                        l = new THREE.Vector3(c[0], c[1], c[2])
                }
                this.getPrevNode().properties[n] = {
                    type: r,
                    type2: s,
                    flag: a,
                    value: l
                }, this.setCurrentProp(this.getPrevNode().properties, n)
            },
            nodeEnd: function(t) {
                this.popStack()
            },
            isFlattenNode: function(t) {
                return "subNodes" in t && "properties" in t
            }
        }, i.prototype = {}, o.prototype.parseCluster = function(t, e, i) {
            var o = t.searchConnectionParent(e),
                n = toInt(i.subNodes.Indexes.properties.a.split(",")),
                r = toFloat(i.subNodes.Weights.properties.a.split(",")),
                s = toMat44(toFloat(i.subNodes.Transform.properties.a.split(","))),
                a = toMat44(toFloat(i.subNodes.TransformLink.properties.a.split(",")));
            return {
                parent: o,
                id: parseInt(e),
                indices: n,
                weights: r,
                transform: s,
                transformlink: a,
                linkMode: i.properties.Mode
            }
        }, o.prototype.parse = function(t, e) {
            this.skinIndices = [], this.skinWeights = [], this.matrices = [];
            var i = t.Objects.subNodes.Deformer,
                o = {};
            for (var n in i)
                if ("Cluster" === i[n].attrType) {
                    if (!("Indexes" in i[n].subNodes)) continue;
                    var r = this.parseCluster(t, n, i[n]),
                        s = t.searchConnectionChildren(r.id)[0];
                    o[s] = r
                }
            for (var a = [], l = e.hierarchy, c = 0; c < l.length; ++c) {
                var h = l[c].internalId;
                if (void 0 !== o[h]) {
                    var u = o[h];
                    this.matrices.push(u.transform);
                    for (var d = 0; d < u.indices.length; ++d) {
                        void 0 === a[u.indices[d]] && (a[u.indices[d]] = {}, a[u.indices[d]].joint = [], a[u.indices[d]].weight = []);
                        var p = t.searchConnectionChildren(u.id);
                        p.length > 1 && console.warn("FBXLoader: node " + u.id + " have many weight kids: " + p), a[u.indices[d]].joint.push(e.getBoneIdfromInternalId(t, p[0])), a[u.indices[d]].weight.push(u.weights[d])
                    }
                } else this.matrices.push(new THREE.Matrix4)
            }
            for (var f = 0; f < a.length; f++) {
                var m = new THREE.Vector4(a[f].joint[0] ? a[f].joint[0] : 0, a[f].joint[1] ? a[f].joint[1] : 0, a[f].joint[2] ? a[f].joint[2] : 0, a[f].joint[3] ? a[f].joint[3] : 0),
                    v = new THREE.Vector4(a[f].weight[0] ? a[f].weight[0] : 0, a[f].weight[1] ? a[f].weight[1] : 0, a[f].weight[2] ? a[f].weight[2] : 0, a[f].weight[3] ? a[f].weight[3] : 0);
                this.skinIndices.push(m), this.skinWeights.push(v)
            }
            return this
        }, n.prototype.parseHierarchy = function(t) {
            var e = t.Objects,
                i = e.subNodes.Model,
                o = [];
            for (var n in i) void 0 !== i[n].attrType && o.push(i[n]);
            this.hierarchy = [];
            for (var r = 0; r < o.length; ++r) {
                var s = o[r],
                    a = t.searchConnectionParent(s.id)[0],
                    l = [0, 0, 0],
                    c = [0, 0, 0, 1],
                    h = [1, 1, 1];
                if ("Lcl_Translation" in s.properties && (l = toFloat(s.properties.Lcl_Translation.value.split(","))), "Lcl_Rotation" in s.properties) {
                    c = toRad(toFloat(s.properties.Lcl_Rotation.value.split(",")));
                    var u = new THREE.Quaternion;
                    u.setFromEuler(new THREE.Euler(c[0], c[1], c[2], "ZYX")), c = [u.x, u.y, u.z, u.w]
                }
                "Lcl_Scaling" in s.properties && (h = toFloat(s.properties.Lcl_Scaling.value.split(",")));
                var d = s.attrName;
                d = d.replace(/:/, ""), d = d.replace(/_/, ""), d = d.replace(/-/, ""), this.hierarchy.push({
                    parent: a,
                    name: d,
                    pos: l,
                    rotq: c,
                    scl: h,
                    internalId: s.id
                })
            }
            return this.reindexParentId(), this.restoreBindPose(t), this
        }, n.prototype.reindexParentId = function() {
            for (var t = 0; t < this.hierarchy.length; t++)
                for (var e = 0; e < this.hierarchy.length; ++e)
                    if (this.hierarchy[t].parent == this.hierarchy[e].internalId) {
                        this.hierarchy[t].parent = e;
                        break
                    }
        }, n.prototype.restoreBindPose = function(t) {
            var e = t.Objects.subNodes.Pose;
            if (void 0 !== e) {
                for (var i = e.subNodes.PoseNode, o = {}, n = {}, r = 0; r < i.length; ++r) {
                    var s = toMat44(i[r].subNodes.Matrix.properties.a.split(",")),
                        a = toMat44(i[r].subNodes.Matrix.properties.a.split(","));
                    o[i[r].id] = s, n[i[r].id] = a
                }
                for (var l = 0; l < this.hierarchy.length; ++l) {
                    var c = this.hierarchy[l],
                        h = c.internalId;
                    if (void 0 !== n[h]) {
                        for (var u, d = new THREE.Vector3(0, 0, 0), p = new THREE.Quaternion, f = new THREE.Vector3(1, 1, 1), m = t.searchConnectionParent(h), v = 0; v < m.length; ++v)
                            if (this.isBoneNode(m[v])) {
                                u = m[v];
                                break
                            }
                        if (void 0 !== u && void 0 !== o[u]) {
                            var y = new THREE.Matrix4;
                            y.getInverse(n[u]), y.multiply(o[h]), o[h] = y
                        }
                        o[h].decompose(d, p, f), c.pos = [d.x, d.y, d.z], c.rotq = [p.x, p.y, p.z, p.w], c.scl = [f.x, f.y, f.z]
                    }
                }
            }
        }, n.prototype.searchRealId = function(t) {
            for (var e = 0; e < this.hierarchy.length; e++)
                if (t == this.hierarchy[e].internalId) return e;
            return -1
        }, n.prototype.getByInternalId = function(t) {
            for (var e = 0; e < this.hierarchy.length; e++)
                if (t == this.hierarchy[e].internalId) return this.hierarchy[e];
            return null
        }, n.prototype.isBoneNode = function(t) {
            for (var e = 0; e < this.hierarchy.length; ++e)
                if (t === this.hierarchy[e].internalId) return !0;
            return !1
        }, n.prototype.getBoneIdfromInternalId = function(t, e) {
            if (void 0 === t.__cache_get_boneid_from_internalid && (t.__cache_get_boneid_from_internalid = []), void 0 !== t.__cache_get_boneid_from_internalid[e]) return t.__cache_get_boneid_from_internalid[e];
            for (var i = 0; i < this.hierarchy.length; ++i)
                if (this.hierarchy[i].internalId == e) {
                    return t.__cache_get_boneid_from_internalid[e] = i, i
                }
            return -1
        }, r.prototype.parse = function(t) {
            return this.node = t, this.name = t.attrName, this.id = t.id, this.vertices = this.getVertices(), void 0 === this.vertices ? void console.log("FBXLoader: Geometry.parse(): pass" + this.node.id) : (this.indices = this.getPolygonVertexIndices(), this.uvs = (new s).parse(this.node, this), this.normals = (new a).parse(this.node, this), this.getPolygonTopologyMax() > 3 && (this.indices = this.convertPolyIndicesToTri(this.indices, this.getPolygonTopologyArray())), this)
        }, r.prototype.getVertices = function() {
            if (this.node.__cache_vertices) return this.node.__cache_vertices;
            if (void 0 === this.node.subNodes.Vertices) return console.warn("this.node: " + this.node.attrName + "(" + this.node.id + ") does not have Vertices"), this.node.__cache_vertices = void 0, null;
            var t = this.node.subNodes.Vertices.properties.a,
                e = t.split(",").map(function(t) {
                    return parseFloat(t)
                });
            return this.node.__cache_vertices = e, this.node.__cache_vertices
        }, r.prototype.getPolygonVertexIndices = function() {
            if (this.node.__cache_indices && this.node.__cache_poly_topology_max) return this.node.__cache_indices;
            if (void 0 === this.node.subNodes) return console.error("this.node.subNodes undefined"), void console.log(this.node);
            if (void 0 === this.node.subNodes.PolygonVertexIndex) return console.warn("this.node: " + this.node.attrName + "(" + this.node.id + ") does not have PolygonVertexIndex "), void(this.node.__cache_indices = void 0);
            for (var t = this.node.subNodes.PolygonVertexIndex.properties.a, e = t.split(","), i = 1, o = null, n = [], r = 0; r < e.length; ++r) {
                var s = parseInt(e[r]);
                0 > s ? (i > o && (o = i), e[r] = -1 ^ s, n.push(i), i = 1) : (e[r] = s, i++)
            }
            return null === o && (console.warn("FBXLoader: topology N not found: " + this.node.attrName), console.warn(this.node), o = 3), this.node.__cache_poly_topology_max = o, this.node.__cache_poly_topology_arr = n, this.node.__cache_indices = e, this.node.__cache_indices
        }, r.prototype.getPolygonTopologyMax = function() {
            return this.node.__cache_indices && this.node.__cache_poly_topology_max ? this.node.__cache_poly_topology_max : (this.getPolygonVertexIndices(this.node), this.node.__cache_poly_topology_max)
        }, r.prototype.getPolygonTopologyArray = function() {
            return this.node.__cache_indices && this.node.__cache_poly_topology_max ? this.node.__cache_poly_topology_arr : (this.getPolygonVertexIndices(this.node), this.node.__cache_poly_topology_arr)
        }, r.prototype.convertPolyIndicesToTri = function(t, e) {
            for (var i = [], o = 0, n = 0, r = 0; o < t.length;) {
                r = e[n];
                for (var s = 0; r - 3 >= s; s++) i.push(t[o]), i.push(t[o + (r - 2 - s)]), i.push(t[o + (r - 1 - s)]);
                n++, o += r
            }
            return i
        }, r.prototype.addBones = function(t) {
            this.bones = t
        }, s.prototype.getUV = function(t) {
            return this.node && this.uv && this.map && this.ref ? this.uv : this._parseText(t)
        }, s.prototype.getMap = function(t) {
            return this.node && this.uv && this.map && this.ref ? this.map : (this._parseText(t), this.map)
        }, s.prototype.getRef = function(t) {
            return this.node && this.uv && this.map && this.ref ? this.ref : (this._parseText(t), this.ref)
        }, s.prototype.getIndex = function(t) {
            return this.node && this.uv && this.map && this.ref ? this.index : (this._parseText(t), this.index)
        }, s.prototype.getNode = function(t) {
            return null !== this.node ? this.node : (this.node = t.subNodes.LayerElementUV, this.node)
        }, s.prototype._parseText = function(t) {
            var e = this.getNode(t);
            if (void 0 === e) return [];
            var i = 0,
                o = "";
            for (var n in e) n.match(/^\d+$/) && (i++, o = n);
            i > 0 && (console.warn("multi uv not supported"), e = e[n]);
            var r = e.subNodes.UVIndex.properties.a,
                s = e.subNodes.UV.properties.a,
                a = e.properties.MappingInformationType,
                l = e.properties.ReferenceInformationType;
            return this.uv = toFloat(s.split(",")), this.index = toInt(r.split(",")), this.map = a, this.ref = l, this.uv
        }, s.prototype.parse = function(t, e) {
            this.uvNode = this.getNode(t), this.uv = this.getUV(t);
            var i = this.getMap(t),
                o = this.getRef(t),
                n = this.getIndex(t),
                r = e.getPolygonTopologyArray();
            switch (i) {
                case "ByPolygonVertex":
                    switch (o) {
                        case "Direct":
                            this.uv = this.parseUV_ByPolygonVertex_Direct(this.uv, n, r, 2);
                            break;
                        case "IndexToDirect":
                            this.uv = this.parseUV_ByPolygonVertex_IndexToDirect(this.uv, n)
                    }
                    this.uv = f(this.uv, e.getPolygonVertexIndices(t), 2);
                    break;
                case "ByPolygon":
                    switch (o) {
                        case "Direct":
                            this.uv = this.parseUV_ByPolygon_Direct();
                            break;
                        case "IndexToDirect":
                            this.uv = this.parseUV_ByPolygon_IndexToDirect()
                    }
            }
            return this.uv
        }, s.prototype.parseUV_ByPolygonVertex_Direct = function(t, e, i, o) {
            return parse_Data_ByPolygonVertex_Direct(t, e, i, o)
        }, s.prototype.parseUV_ByPolygonVertex_IndexToDirect = function(t, e) {
            return p(t, e, 2)
        }, s.prototype.parseUV_ByPolygon_Direct = function(t) {
            return console.warn("not implemented"), t
        }, s.prototype.parseUV_ByPolygon_IndexToDirect = function(t) {
            return console.warn("not implemented"), t
        }, s.prototype.parseUV_ByVertex_Direct = function(t) {
            return console.warn("not implemented"), t
        }, a.prototype.getNormal = function(t) {
            return this.node && this.normal && this.map && this.ref ? this.normal : (this._parseText(t), this.normal)
        }, a.prototype.getMap = function(t) {
            return this.node && this.normal && this.map && this.ref ? this.map : (this._parseText(t), this.map)
        }, a.prototype.getRef = function(t) {
            return this.node && this.normal && this.map && this.ref ? this.ref : (this._parseText(t), this.ref)
        }, a.prototype.getNode = function(t) {
            return this.node ? this.node : (this.node = t.subNodes.LayerElementNormal, this.node)
        }, a.prototype._parseText = function(t) {
            var e = this.getNode(t);
            if (void 0 === e) return void console.warn("node: " + t.attrName + "(" + t.id + ") does not have LayerElementNormal");
            var i = e.properties.MappingInformationType,
                o = e.properties.ReferenceInformationType,
                n = e.subNodes.Normals.properties.a;
            this.normal = toFloat(n.split(",")), this.map = i, this.ref = o
        }, a.prototype.parse = function(t, e) {
            var i = this.getNormal(t),
                o = (this.getNode(t), this.getMap(t)),
                n = this.getRef(t),
                r = e.getPolygonVertexIndices(t),
                s = e.getPolygonTopologyArray(t);
            switch (o) {
                case "ByPolygonVertex":
                    switch (n) {
                        case "Direct":
                            i = this.parseNormal_ByPolygonVertex_Direct(i, r, s, 3);
                            break;
                        case "IndexToDirect":
                            i = this.parseNormal_ByPolygonVertex_IndexToDirect()
                    }
                    break;
                case "ByPolygon":
                    switch (n) {
                        case "Direct":
                            i = this.parseNormal_ByPolygon_Direct();
                            break;
                        case "IndexToDirect":
                            i = this.parseNormal_ByPolygon_IndexToDirect()
                    }
            }
            return i
        }, a.prototype.parseNormal_ByPolygonVertex_Direct = function(t, e, i, o) {
            return parse_Data_ByPolygonVertex_Direct(t, e, i, o)
        }, a.prototype.parseNormal_ByPolygonVertex_IndexToDirect = function(t) {
            return console.warn("not implemented"), t
        }, a.prototype.parseNormal_ByPolygon_Direct = function(t) {
            return console.warn("not implemented"), t
        }, a.prototype.parseNormal_ByPolygon_IndexToDirect = function(t) {
            return console.warn("not implemented"), t
        }, a.prototype.parseNormal_ByVertex_Direct = function(t) {
            return console.warn("not implemented"), t
        }, l.prototype.fromNode = function(t) {
            return this.id = t.id, this.internalId = t.id, this.times = t.subNodes.KeyTime.properties.a, this.values = t.subNodes.KeyValueFloat.properties.a, this.attrFlag = t.subNodes.KeyAttrFlags.properties.a, this.attrData = t.subNodes.KeyAttrDataFloat.properties.a, this.times = toFloat(this.times.split(",")), this.values = toFloat(this.values.split(",")), this.attrData = toFloat(this.attrData.split(",")), this.attrFlag = toInt(this.attrFlag.split(",")), this.times = this.times.map(function(t) {
                return m(t)
            }), this
        }, l.prototype.getLength = function() {
            return this.times[this.times.length - 1]
        }, c.prototype.fromNode = function(t, e, i) {
            if (this.id = e.id, this.attr = e.attrName, this.internalId = e.id, !this.attr.match(/S|R|T/)) return null;
            for (var o in e.properties) o.match(/X/) && (this.attrX = !0), o.match(/Y/) && (this.attrY = !0), o.match(/Z/) && (this.attrZ = !0);
            this.containerIndices = t.searchConnectionParent(this.id), this.curveIdx = t.searchConnectionChildren(this.id);
            for (var n = this.containerIndices.length - 1; n >= 0; --n) {
                var r = i.searchRealId(this.containerIndices[n]);
                if (r >= 0 && (this.containerBoneId = r, this.containerId = this.containerIndices[n]), r >= 0) break
            }
            return this
        }, c.prototype.setCurve = function(t) {
            this.curves.push(t)
        }, h.prototype.parse = function(t, e) {
            var i = t.Objects.subNodes.AnimationCurveNode,
                o = t.Objects.subNodes.AnimationCurve,
                n = [];
            for (var r in i)
                if (r.match(/\d+/)) {
                    var s = (new c).fromNode(t, i[r], e);
                    n.push(s)
                }
            for (var a = {}, h = 0; h < n.length; ++h) null !== n[h] && (a[n[h].id] = n[h]);
            var u = [],
                d = 0;
            for (r in o)
                if (r.match(/\d+/)) {
                    var p = (new l).fromNode(o[r]);
                    u.push(p), d = p.getLength() ? p.getLength() : d;
                    var f = t.searchConnectionParent(p.id)[0],
                        m = t.searchConnectionType(p.id, f);
                    m.match(/X/) && (m = "x"), m.match(/Y/) && (m = "y"), m.match(/Z/) && (m = "z"), a[f].curves[m] = p
                }
            for (var v in a) {
                var y = a[v].containerBoneId;
                void 0 === this.curves[y] && (this.curves[y] = {}), this.curves[y][a[v].attr] = a[v]
            }
            return this.length = d, this.frames = this.length * this.fps, this
        }, u.prototype.add = function(t) {
            void 0 === this.textures && (this.textures = []), this.textures.push(t);
            for (var e = 0; e < t.parentIds.length; ++e) void 0 === this.perGeoMap[t.parentIds[e]] && (this.perGeoMap[t.parentIds[e]] = []), this.perGeoMap[t.parentIds[e]].push(this.textures[this.textures.length - 1])
        }, u.prototype.parse = function(t, e) {
            var i = t.Objects.subNodes.Texture;
            for (var o in i) {
                var n = (new d).parse(i[o], t);
                this.add(n)
            }
            return this
        }, u.prototype.getById = function(t) {
            return this.perGeoMap[t]
        }, d.prototype.parse = function(t, e) {
            return this.id = t.id, this.name = t.attrName, this.fileName = this.parseFileName(t.properties.FileName), this.parentIds = this.searchParents(this.id, e), this
        }, d.prototype.parseFileName = function(t) {
            if (void 0 === t) return "";
            var e = t.split(/[\\\/]/);
            return e.length > 0 ? e[e.length - 1] : t
        }, d.prototype.searchParents = function(t, e) {
            var i = e.searchConnectionParent(t);
            return i
        }, parse_Data_ByPolygonVertex_Direct = function(t, e, i, o) {
            for (var n = [], r = 0, s = 0; s < e.length; ++s) {
                n[e[s]] = [];
                for (var a = 0; o > a; ++a) n[e[s]][a] = t[r + a];
                r += o
            }
            for (var l = [], c = 0; c < n.length; ++c)
                if (void 0 !== n[c])
                    for (var h = 0; o > h; ++h) void 0 !== n[c][h] && l.push(n[c][h]);
            return l
        };
        var m = function(t) {
            return t / 46186158e3
        };
        degToRad = function(t) {
            return t * Math.PI / 180
        }, radToDeg = function(t) {
            return 180 * t / Math.PI
        }, quatFromVec = function(t, e, i) {
            var o = new THREE.Euler(t, e, i, "ZYX"),
                n = new THREE.Quaternion;
            return n.setFromEuler(o), n
        }, toInt = function(t) {
            return t.map(function(t) {
                return parseInt(t)
            })
        }, toFloat = function(t) {
            return t.map(function(t) {
                return parseFloat(t)
            })
        }, toRad = function(t) {
            return t.map(function(t) {
                return degToRad(t)
            })
        }, toMat44 = function(t) {
            var e = new THREE.Matrix4;
            return e.set(t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]), e
        }
    }();