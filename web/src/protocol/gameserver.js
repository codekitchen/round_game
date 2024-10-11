/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const gameserver = $root.gameserver = (() => {

    /**
     * Namespace gameserver.
     * @exports gameserver
     * @namespace
     */
    const gameserver = {};

    /**
     * Role enum.
     * @name gameserver.Role
     * @enum {number}
     * @property {number} ROLE_OBSERVER=0 ROLE_OBSERVER value
     * @property {number} ROLE_PLAYER=1 ROLE_PLAYER value
     */
    gameserver.Role = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "ROLE_OBSERVER"] = 0;
        values[valuesById[1] = "ROLE_PLAYER"] = 1;
        return values;
    })();

    gameserver.GameMessage = (function() {

        /**
         * Properties of a GameMessage.
         * @memberof gameserver
         * @interface IGameMessage
         * @property {number|null} [frame] GameMessage frame
         * @property {gameserver.IGameInit|null} [gameInit] GameMessage gameInit
         * @property {gameserver.IRoleChange|null} [roleChange] GameMessage roleChange
         * @property {gameserver.IHeartbeat|null} [heartbeat] GameMessage heartbeat
         * @property {gameserver.IPassControl|null} [passControl] GameMessage passControl
         * @property {gameserver.IGameEvent|null} [gameEvent] GameMessage gameEvent
         */

        /**
         * Constructs a new GameMessage.
         * @memberof gameserver
         * @classdesc Represents a GameMessage.
         * @implements IGameMessage
         * @constructor
         * @param {gameserver.IGameMessage=} [properties] Properties to set
         */
        function GameMessage(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameMessage frame.
         * @member {number} frame
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.frame = 0;

        /**
         * GameMessage gameInit.
         * @member {gameserver.IGameInit|null|undefined} gameInit
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.gameInit = null;

        /**
         * GameMessage roleChange.
         * @member {gameserver.IRoleChange|null|undefined} roleChange
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.roleChange = null;

        /**
         * GameMessage heartbeat.
         * @member {gameserver.IHeartbeat|null|undefined} heartbeat
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.heartbeat = null;

        /**
         * GameMessage passControl.
         * @member {gameserver.IPassControl|null|undefined} passControl
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.passControl = null;

        /**
         * GameMessage gameEvent.
         * @member {gameserver.IGameEvent|null|undefined} gameEvent
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.gameEvent = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * GameMessage msg.
         * @member {"gameInit"|"roleChange"|"heartbeat"|"passControl"|"gameEvent"|undefined} msg
         * @memberof gameserver.GameMessage
         * @instance
         */
        Object.defineProperty(GameMessage.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["gameInit", "roleChange", "heartbeat", "passControl", "gameEvent"]),
            set: $util.oneOfSetter($oneOfFields)
        });

        /**
         * Creates a new GameMessage instance using the specified properties.
         * @function create
         * @memberof gameserver.GameMessage
         * @static
         * @param {gameserver.IGameMessage=} [properties] Properties to set
         * @returns {gameserver.GameMessage} GameMessage instance
         */
        GameMessage.create = function create(properties) {
            return new GameMessage(properties);
        };

        /**
         * Encodes the specified GameMessage message. Does not implicitly {@link gameserver.GameMessage.verify|verify} messages.
         * @function encode
         * @memberof gameserver.GameMessage
         * @static
         * @param {gameserver.IGameMessage} message GameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMessage.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.frame != null && Object.hasOwnProperty.call(message, "frame"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.frame);
            if (message.gameInit != null && Object.hasOwnProperty.call(message, "gameInit"))
                $root.gameserver.GameInit.encode(message.gameInit, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message.roleChange != null && Object.hasOwnProperty.call(message, "roleChange"))
                $root.gameserver.RoleChange.encode(message.roleChange, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.heartbeat != null && Object.hasOwnProperty.call(message, "heartbeat"))
                $root.gameserver.Heartbeat.encode(message.heartbeat, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.passControl != null && Object.hasOwnProperty.call(message, "passControl"))
                $root.gameserver.PassControl.encode(message.passControl, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.gameEvent != null && Object.hasOwnProperty.call(message, "gameEvent"))
                $root.gameserver.GameEvent.encode(message.gameEvent, writer.uint32(/* id 100, wireType 2 =*/802).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameMessage message, length delimited. Does not implicitly {@link gameserver.GameMessage.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.GameMessage
         * @static
         * @param {gameserver.IGameMessage} message GameMessage message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameMessage.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameMessage message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.GameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.GameMessage} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMessage.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.GameMessage();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.frame = reader.int32();
                        break;
                    }
                case 2: {
                        message.gameInit = $root.gameserver.GameInit.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message.roleChange = $root.gameserver.RoleChange.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.heartbeat = $root.gameserver.Heartbeat.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.passControl = $root.gameserver.PassControl.decode(reader, reader.uint32());
                        break;
                    }
                case 100: {
                        message.gameEvent = $root.gameserver.GameEvent.decode(reader, reader.uint32());
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameMessage message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.GameMessage
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.GameMessage} GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameMessage.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameMessage message.
         * @function verify
         * @memberof gameserver.GameMessage
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameMessage.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            let properties = {};
            if (message.frame != null && message.hasOwnProperty("frame"))
                if (!$util.isInteger(message.frame))
                    return "frame: integer expected";
            if (message.gameInit != null && message.hasOwnProperty("gameInit")) {
                properties.msg = 1;
                {
                    let error = $root.gameserver.GameInit.verify(message.gameInit);
                    if (error)
                        return "gameInit." + error;
                }
            }
            if (message.roleChange != null && message.hasOwnProperty("roleChange")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.RoleChange.verify(message.roleChange);
                    if (error)
                        return "roleChange." + error;
                }
            }
            if (message.heartbeat != null && message.hasOwnProperty("heartbeat")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.Heartbeat.verify(message.heartbeat);
                    if (error)
                        return "heartbeat." + error;
                }
            }
            if (message.passControl != null && message.hasOwnProperty("passControl")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.PassControl.verify(message.passControl);
                    if (error)
                        return "passControl." + error;
                }
            }
            if (message.gameEvent != null && message.hasOwnProperty("gameEvent")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.GameEvent.verify(message.gameEvent);
                    if (error)
                        return "gameEvent." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameMessage message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.GameMessage
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.GameMessage} GameMessage
         */
        GameMessage.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.GameMessage)
                return object;
            let message = new $root.gameserver.GameMessage();
            if (object.frame != null)
                message.frame = object.frame | 0;
            if (object.gameInit != null) {
                if (typeof object.gameInit !== "object")
                    throw TypeError(".gameserver.GameMessage.gameInit: object expected");
                message.gameInit = $root.gameserver.GameInit.fromObject(object.gameInit);
            }
            if (object.roleChange != null) {
                if (typeof object.roleChange !== "object")
                    throw TypeError(".gameserver.GameMessage.roleChange: object expected");
                message.roleChange = $root.gameserver.RoleChange.fromObject(object.roleChange);
            }
            if (object.heartbeat != null) {
                if (typeof object.heartbeat !== "object")
                    throw TypeError(".gameserver.GameMessage.heartbeat: object expected");
                message.heartbeat = $root.gameserver.Heartbeat.fromObject(object.heartbeat);
            }
            if (object.passControl != null) {
                if (typeof object.passControl !== "object")
                    throw TypeError(".gameserver.GameMessage.passControl: object expected");
                message.passControl = $root.gameserver.PassControl.fromObject(object.passControl);
            }
            if (object.gameEvent != null) {
                if (typeof object.gameEvent !== "object")
                    throw TypeError(".gameserver.GameMessage.gameEvent: object expected");
                message.gameEvent = $root.gameserver.GameEvent.fromObject(object.gameEvent);
            }
            return message;
        };

        /**
         * Creates a plain object from a GameMessage message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.GameMessage
         * @static
         * @param {gameserver.GameMessage} message GameMessage
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameMessage.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.frame = 0;
            if (message.frame != null && message.hasOwnProperty("frame"))
                object.frame = message.frame;
            if (message.gameInit != null && message.hasOwnProperty("gameInit")) {
                object.gameInit = $root.gameserver.GameInit.toObject(message.gameInit, options);
                if (options.oneofs)
                    object.msg = "gameInit";
            }
            if (message.roleChange != null && message.hasOwnProperty("roleChange")) {
                object.roleChange = $root.gameserver.RoleChange.toObject(message.roleChange, options);
                if (options.oneofs)
                    object.msg = "roleChange";
            }
            if (message.heartbeat != null && message.hasOwnProperty("heartbeat")) {
                object.heartbeat = $root.gameserver.Heartbeat.toObject(message.heartbeat, options);
                if (options.oneofs)
                    object.msg = "heartbeat";
            }
            if (message.passControl != null && message.hasOwnProperty("passControl")) {
                object.passControl = $root.gameserver.PassControl.toObject(message.passControl, options);
                if (options.oneofs)
                    object.msg = "passControl";
            }
            if (message.gameEvent != null && message.hasOwnProperty("gameEvent")) {
                object.gameEvent = $root.gameserver.GameEvent.toObject(message.gameEvent, options);
                if (options.oneofs)
                    object.msg = "gameEvent";
            }
            return object;
        };

        /**
         * Converts this GameMessage to JSON.
         * @function toJSON
         * @memberof gameserver.GameMessage
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameMessage.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameMessage
         * @function getTypeUrl
         * @memberof gameserver.GameMessage
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameMessage.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.GameMessage";
        };

        return GameMessage;
    })();

    gameserver.Heartbeat = (function() {

        /**
         * Properties of a Heartbeat.
         * @memberof gameserver
         * @interface IHeartbeat
         */

        /**
         * Constructs a new Heartbeat.
         * @memberof gameserver
         * @classdesc Represents a Heartbeat.
         * @implements IHeartbeat
         * @constructor
         * @param {gameserver.IHeartbeat=} [properties] Properties to set
         */
        function Heartbeat(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new Heartbeat instance using the specified properties.
         * @function create
         * @memberof gameserver.Heartbeat
         * @static
         * @param {gameserver.IHeartbeat=} [properties] Properties to set
         * @returns {gameserver.Heartbeat} Heartbeat instance
         */
        Heartbeat.create = function create(properties) {
            return new Heartbeat(properties);
        };

        /**
         * Encodes the specified Heartbeat message. Does not implicitly {@link gameserver.Heartbeat.verify|verify} messages.
         * @function encode
         * @memberof gameserver.Heartbeat
         * @static
         * @param {gameserver.IHeartbeat} message Heartbeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Heartbeat.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link gameserver.Heartbeat.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.Heartbeat
         * @static
         * @param {gameserver.IHeartbeat} message Heartbeat message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Heartbeat.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Heartbeat message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.Heartbeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.Heartbeat} Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Heartbeat.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.Heartbeat();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.Heartbeat
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.Heartbeat} Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Heartbeat.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Heartbeat message.
         * @function verify
         * @memberof gameserver.Heartbeat
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Heartbeat.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.Heartbeat
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.Heartbeat} Heartbeat
         */
        Heartbeat.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.Heartbeat)
                return object;
            return new $root.gameserver.Heartbeat();
        };

        /**
         * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.Heartbeat
         * @static
         * @param {gameserver.Heartbeat} message Heartbeat
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Heartbeat.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this Heartbeat to JSON.
         * @function toJSON
         * @memberof gameserver.Heartbeat
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Heartbeat.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Heartbeat
         * @function getTypeUrl
         * @memberof gameserver.Heartbeat
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Heartbeat.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.Heartbeat";
        };

        return Heartbeat;
    })();

    gameserver.GameInit = (function() {

        /**
         * Properties of a GameInit.
         * @memberof gameserver
         * @interface IGameInit
         * @property {number|null} [seed] GameInit seed
         */

        /**
         * Constructs a new GameInit.
         * @memberof gameserver
         * @classdesc Represents a GameInit.
         * @implements IGameInit
         * @constructor
         * @param {gameserver.IGameInit=} [properties] Properties to set
         */
        function GameInit(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameInit seed.
         * @member {number} seed
         * @memberof gameserver.GameInit
         * @instance
         */
        GameInit.prototype.seed = 0;

        /**
         * Creates a new GameInit instance using the specified properties.
         * @function create
         * @memberof gameserver.GameInit
         * @static
         * @param {gameserver.IGameInit=} [properties] Properties to set
         * @returns {gameserver.GameInit} GameInit instance
         */
        GameInit.create = function create(properties) {
            return new GameInit(properties);
        };

        /**
         * Encodes the specified GameInit message. Does not implicitly {@link gameserver.GameInit.verify|verify} messages.
         * @function encode
         * @memberof gameserver.GameInit
         * @static
         * @param {gameserver.IGameInit} message GameInit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameInit.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.seed);
            return writer;
        };

        /**
         * Encodes the specified GameInit message, length delimited. Does not implicitly {@link gameserver.GameInit.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.GameInit
         * @static
         * @param {gameserver.IGameInit} message GameInit message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameInit.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameInit message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.GameInit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.GameInit} GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameInit.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.GameInit();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.seed = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameInit message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.GameInit
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.GameInit} GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameInit.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameInit message.
         * @function verify
         * @memberof gameserver.GameInit
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameInit.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.seed != null && message.hasOwnProperty("seed"))
                if (!$util.isInteger(message.seed))
                    return "seed: integer expected";
            return null;
        };

        /**
         * Creates a GameInit message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.GameInit
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.GameInit} GameInit
         */
        GameInit.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.GameInit)
                return object;
            let message = new $root.gameserver.GameInit();
            if (object.seed != null)
                message.seed = object.seed | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameInit message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.GameInit
         * @static
         * @param {gameserver.GameInit} message GameInit
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameInit.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.seed = 0;
            if (message.seed != null && message.hasOwnProperty("seed"))
                object.seed = message.seed;
            return object;
        };

        /**
         * Converts this GameInit to JSON.
         * @function toJSON
         * @memberof gameserver.GameInit
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameInit.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameInit
         * @function getTypeUrl
         * @memberof gameserver.GameInit
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameInit.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.GameInit";
        };

        return GameInit;
    })();

    gameserver.RoleChange = (function() {

        /**
         * Properties of a RoleChange.
         * @memberof gameserver
         * @interface IRoleChange
         * @property {gameserver.Role|null} [role] RoleChange role
         */

        /**
         * Constructs a new RoleChange.
         * @memberof gameserver
         * @classdesc Represents a RoleChange.
         * @implements IRoleChange
         * @constructor
         * @param {gameserver.IRoleChange=} [properties] Properties to set
         */
        function RoleChange(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * RoleChange role.
         * @member {gameserver.Role} role
         * @memberof gameserver.RoleChange
         * @instance
         */
        RoleChange.prototype.role = 0;

        /**
         * Creates a new RoleChange instance using the specified properties.
         * @function create
         * @memberof gameserver.RoleChange
         * @static
         * @param {gameserver.IRoleChange=} [properties] Properties to set
         * @returns {gameserver.RoleChange} RoleChange instance
         */
        RoleChange.create = function create(properties) {
            return new RoleChange(properties);
        };

        /**
         * Encodes the specified RoleChange message. Does not implicitly {@link gameserver.RoleChange.verify|verify} messages.
         * @function encode
         * @memberof gameserver.RoleChange
         * @static
         * @param {gameserver.IRoleChange} message RoleChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleChange.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.role != null && Object.hasOwnProperty.call(message, "role"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.role);
            return writer;
        };

        /**
         * Encodes the specified RoleChange message, length delimited. Does not implicitly {@link gameserver.RoleChange.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.RoleChange
         * @static
         * @param {gameserver.IRoleChange} message RoleChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        RoleChange.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a RoleChange message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.RoleChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.RoleChange} RoleChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleChange.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.RoleChange();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.role = reader.int32();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a RoleChange message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.RoleChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.RoleChange} RoleChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        RoleChange.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a RoleChange message.
         * @function verify
         * @memberof gameserver.RoleChange
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        RoleChange.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.role != null && message.hasOwnProperty("role"))
                switch (message.role) {
                default:
                    return "role: enum value expected";
                case 0:
                case 1:
                    break;
                }
            return null;
        };

        /**
         * Creates a RoleChange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.RoleChange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.RoleChange} RoleChange
         */
        RoleChange.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.RoleChange)
                return object;
            let message = new $root.gameserver.RoleChange();
            switch (object.role) {
            default:
                if (typeof object.role === "number") {
                    message.role = object.role;
                    break;
                }
                break;
            case "ROLE_OBSERVER":
            case 0:
                message.role = 0;
                break;
            case "ROLE_PLAYER":
            case 1:
                message.role = 1;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a RoleChange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.RoleChange
         * @static
         * @param {gameserver.RoleChange} message RoleChange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        RoleChange.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.role = options.enums === String ? "ROLE_OBSERVER" : 0;
            if (message.role != null && message.hasOwnProperty("role"))
                object.role = options.enums === String ? $root.gameserver.Role[message.role] === undefined ? message.role : $root.gameserver.Role[message.role] : message.role;
            return object;
        };

        /**
         * Converts this RoleChange to JSON.
         * @function toJSON
         * @memberof gameserver.RoleChange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        RoleChange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for RoleChange
         * @function getTypeUrl
         * @memberof gameserver.RoleChange
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        RoleChange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.RoleChange";
        };

        return RoleChange;
    })();

    gameserver.GameEvent = (function() {

        /**
         * Properties of a GameEvent.
         * @memberof gameserver
         * @interface IGameEvent
         * @property {string|null} [type] GameEvent type
         */

        /**
         * Constructs a new GameEvent.
         * @memberof gameserver
         * @classdesc Represents a GameEvent.
         * @implements IGameEvent
         * @constructor
         * @param {gameserver.IGameEvent=} [properties] Properties to set
         */
        function GameEvent(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameEvent type.
         * @member {string} type
         * @memberof gameserver.GameEvent
         * @instance
         */
        GameEvent.prototype.type = "";

        /**
         * Creates a new GameEvent instance using the specified properties.
         * @function create
         * @memberof gameserver.GameEvent
         * @static
         * @param {gameserver.IGameEvent=} [properties] Properties to set
         * @returns {gameserver.GameEvent} GameEvent instance
         */
        GameEvent.create = function create(properties) {
            return new GameEvent(properties);
        };

        /**
         * Encodes the specified GameEvent message. Does not implicitly {@link gameserver.GameEvent.verify|verify} messages.
         * @function encode
         * @memberof gameserver.GameEvent
         * @static
         * @param {gameserver.IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEvent.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.type);
            return writer;
        };

        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link gameserver.GameEvent.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.GameEvent
         * @static
         * @param {gameserver.IGameEvent} message GameEvent message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameEvent.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.GameEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEvent.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.GameEvent();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.type = reader.string();
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.GameEvent
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.GameEvent} GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameEvent.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameEvent message.
         * @function verify
         * @memberof gameserver.GameEvent
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameEvent.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.type != null && message.hasOwnProperty("type"))
                if (!$util.isString(message.type))
                    return "type: string expected";
            return null;
        };

        /**
         * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.GameEvent
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.GameEvent} GameEvent
         */
        GameEvent.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.GameEvent)
                return object;
            let message = new $root.gameserver.GameEvent();
            if (object.type != null)
                message.type = String(object.type);
            return message;
        };

        /**
         * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.GameEvent
         * @static
         * @param {gameserver.GameEvent} message GameEvent
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameEvent.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.type = "";
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = message.type;
            return object;
        };

        /**
         * Converts this GameEvent to JSON.
         * @function toJSON
         * @memberof gameserver.GameEvent
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameEvent.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GameEvent
         * @function getTypeUrl
         * @memberof gameserver.GameEvent
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GameEvent.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.GameEvent";
        };

        return GameEvent;
    })();

    gameserver.PassControl = (function() {

        /**
         * Properties of a PassControl.
         * @memberof gameserver
         * @interface IPassControl
         */

        /**
         * Constructs a new PassControl.
         * @memberof gameserver
         * @classdesc Represents a PassControl.
         * @implements IPassControl
         * @constructor
         * @param {gameserver.IPassControl=} [properties] Properties to set
         */
        function PassControl(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new PassControl instance using the specified properties.
         * @function create
         * @memberof gameserver.PassControl
         * @static
         * @param {gameserver.IPassControl=} [properties] Properties to set
         * @returns {gameserver.PassControl} PassControl instance
         */
        PassControl.create = function create(properties) {
            return new PassControl(properties);
        };

        /**
         * Encodes the specified PassControl message. Does not implicitly {@link gameserver.PassControl.verify|verify} messages.
         * @function encode
         * @memberof gameserver.PassControl
         * @static
         * @param {gameserver.IPassControl} message PassControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PassControl.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified PassControl message, length delimited. Does not implicitly {@link gameserver.PassControl.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.PassControl
         * @static
         * @param {gameserver.IPassControl} message PassControl message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PassControl.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PassControl message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.PassControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.PassControl} PassControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PassControl.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.PassControl();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a PassControl message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.PassControl
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.PassControl} PassControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PassControl.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PassControl message.
         * @function verify
         * @memberof gameserver.PassControl
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PassControl.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a PassControl message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.PassControl
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.PassControl} PassControl
         */
        PassControl.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.PassControl)
                return object;
            return new $root.gameserver.PassControl();
        };

        /**
         * Creates a plain object from a PassControl message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.PassControl
         * @static
         * @param {gameserver.PassControl} message PassControl
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PassControl.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this PassControl to JSON.
         * @function toJSON
         * @memberof gameserver.PassControl
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PassControl.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PassControl
         * @function getTypeUrl
         * @memberof gameserver.PassControl
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PassControl.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.PassControl";
        };

        return PassControl;
    })();

    return gameserver;
})();

export { $root as default };
