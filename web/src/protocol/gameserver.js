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

    gameserver.Player = (function() {

        /**
         * Properties of a Player.
         * @memberof gameserver
         * @interface IPlayer
         * @property {string|null} [id] Player id
         * @property {string|null} [name] Player name
         */

        /**
         * Constructs a new Player.
         * @memberof gameserver
         * @classdesc Represents a Player.
         * @implements IPlayer
         * @constructor
         * @param {gameserver.IPlayer=} [properties] Properties to set
         */
        function Player(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Player id.
         * @member {string} id
         * @memberof gameserver.Player
         * @instance
         */
        Player.prototype.id = "";

        /**
         * Player name.
         * @member {string} name
         * @memberof gameserver.Player
         * @instance
         */
        Player.prototype.name = "";

        /**
         * Creates a new Player instance using the specified properties.
         * @function create
         * @memberof gameserver.Player
         * @static
         * @param {gameserver.IPlayer=} [properties] Properties to set
         * @returns {gameserver.Player} Player instance
         */
        Player.create = function create(properties) {
            return new Player(properties);
        };

        /**
         * Encodes the specified Player message. Does not implicitly {@link gameserver.Player.verify|verify} messages.
         * @function encode
         * @memberof gameserver.Player
         * @static
         * @param {gameserver.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
            return writer;
        };

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link gameserver.Player.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.Player
         * @static
         * @param {gameserver.IPlayer} message Player message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Player.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.Player();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.id = reader.string();
                        break;
                    }
                case 2: {
                        message.name = reader.string();
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
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.Player
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.Player} Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Player.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Player message.
         * @function verify
         * @memberof gameserver.Player
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Player.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                if (!$util.isString(message.id))
                    return "id: string expected";
            if (message.name != null && message.hasOwnProperty("name"))
                if (!$util.isString(message.name))
                    return "name: string expected";
            return null;
        };

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.Player
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.Player} Player
         */
        Player.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.Player)
                return object;
            let message = new $root.gameserver.Player();
            if (object.id != null)
                message.id = String(object.id);
            if (object.name != null)
                message.name = String(object.name);
            return message;
        };

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.Player
         * @static
         * @param {gameserver.Player} message Player
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Player.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.id = "";
                object.name = "";
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = message.id;
            if (message.name != null && message.hasOwnProperty("name"))
                object.name = message.name;
            return object;
        };

        /**
         * Converts this Player to JSON.
         * @function toJSON
         * @memberof gameserver.Player
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Player.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Player
         * @function getTypeUrl
         * @memberof gameserver.Player
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Player.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.Player";
        };

        return Player;
    })();

    gameserver.GameMessage = (function() {

        /**
         * Properties of a GameMessage.
         * @memberof gameserver
         * @interface IGameMessage
         * @property {number|null} [frame] GameMessage frame
         * @property {gameserver.IGameInit|null} [gameInit] GameMessage gameInit
         * @property {gameserver.IPlayerChange|null} [playerChange] GameMessage playerChange
         * @property {gameserver.IHeartbeat|null} [heartbeat] GameMessage heartbeat
         * @property {gameserver.IPassControl|null} [passControl] GameMessage passControl
         * @property {gameserver.IGamePing|null} [ping] GameMessage ping
         * @property {gameserver.IKicked|null} [kicked] GameMessage kicked
         * @property {gameserver.IGameEvent|null} [gameEvent] GameMessage gameEvent
         * @property {gameserver.IPlayerList|null} [playerList] GameMessage playerList
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
         * GameMessage playerChange.
         * @member {gameserver.IPlayerChange|null|undefined} playerChange
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.playerChange = null;

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
         * GameMessage ping.
         * @member {gameserver.IGamePing|null|undefined} ping
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.ping = null;

        /**
         * GameMessage kicked.
         * @member {gameserver.IKicked|null|undefined} kicked
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.kicked = null;

        /**
         * GameMessage gameEvent.
         * @member {gameserver.IGameEvent|null|undefined} gameEvent
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.gameEvent = null;

        /**
         * GameMessage playerList.
         * @member {gameserver.IPlayerList|null|undefined} playerList
         * @memberof gameserver.GameMessage
         * @instance
         */
        GameMessage.prototype.playerList = null;

        // OneOf field names bound to virtual getters and setters
        let $oneOfFields;

        /**
         * GameMessage msg.
         * @member {"gameInit"|"playerChange"|"heartbeat"|"passControl"|"ping"|"kicked"|"gameEvent"|"playerList"|undefined} msg
         * @memberof gameserver.GameMessage
         * @instance
         */
        Object.defineProperty(GameMessage.prototype, "msg", {
            get: $util.oneOfGetter($oneOfFields = ["gameInit", "playerChange", "heartbeat", "passControl", "ping", "kicked", "gameEvent", "playerList"]),
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
            if (message.playerChange != null && Object.hasOwnProperty.call(message, "playerChange"))
                $root.gameserver.PlayerChange.encode(message.playerChange, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.heartbeat != null && Object.hasOwnProperty.call(message, "heartbeat"))
                $root.gameserver.Heartbeat.encode(message.heartbeat, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.passControl != null && Object.hasOwnProperty.call(message, "passControl"))
                $root.gameserver.PassControl.encode(message.passControl, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.ping != null && Object.hasOwnProperty.call(message, "ping"))
                $root.gameserver.GamePing.encode(message.ping, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            if (message.kicked != null && Object.hasOwnProperty.call(message, "kicked"))
                $root.gameserver.Kicked.encode(message.kicked, writer.uint32(/* id 7, wireType 2 =*/58).fork()).ldelim();
            if (message.gameEvent != null && Object.hasOwnProperty.call(message, "gameEvent"))
                $root.gameserver.GameEvent.encode(message.gameEvent, writer.uint32(/* id 100, wireType 2 =*/802).fork()).ldelim();
            if (message.playerList != null && Object.hasOwnProperty.call(message, "playerList"))
                $root.gameserver.PlayerList.encode(message.playerList, writer.uint32(/* id 200, wireType 2 =*/1602).fork()).ldelim();
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
                        message.playerChange = $root.gameserver.PlayerChange.decode(reader, reader.uint32());
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
                case 6: {
                        message.ping = $root.gameserver.GamePing.decode(reader, reader.uint32());
                        break;
                    }
                case 7: {
                        message.kicked = $root.gameserver.Kicked.decode(reader, reader.uint32());
                        break;
                    }
                case 100: {
                        message.gameEvent = $root.gameserver.GameEvent.decode(reader, reader.uint32());
                        break;
                    }
                case 200: {
                        message.playerList = $root.gameserver.PlayerList.decode(reader, reader.uint32());
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
            if (message.playerChange != null && message.hasOwnProperty("playerChange")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.PlayerChange.verify(message.playerChange);
                    if (error)
                        return "playerChange." + error;
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
            if (message.ping != null && message.hasOwnProperty("ping")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.GamePing.verify(message.ping);
                    if (error)
                        return "ping." + error;
                }
            }
            if (message.kicked != null && message.hasOwnProperty("kicked")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.Kicked.verify(message.kicked);
                    if (error)
                        return "kicked." + error;
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
            if (message.playerList != null && message.hasOwnProperty("playerList")) {
                if (properties.msg === 1)
                    return "msg: multiple values";
                properties.msg = 1;
                {
                    let error = $root.gameserver.PlayerList.verify(message.playerList);
                    if (error)
                        return "playerList." + error;
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
            if (object.playerChange != null) {
                if (typeof object.playerChange !== "object")
                    throw TypeError(".gameserver.GameMessage.playerChange: object expected");
                message.playerChange = $root.gameserver.PlayerChange.fromObject(object.playerChange);
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
            if (object.ping != null) {
                if (typeof object.ping !== "object")
                    throw TypeError(".gameserver.GameMessage.ping: object expected");
                message.ping = $root.gameserver.GamePing.fromObject(object.ping);
            }
            if (object.kicked != null) {
                if (typeof object.kicked !== "object")
                    throw TypeError(".gameserver.GameMessage.kicked: object expected");
                message.kicked = $root.gameserver.Kicked.fromObject(object.kicked);
            }
            if (object.gameEvent != null) {
                if (typeof object.gameEvent !== "object")
                    throw TypeError(".gameserver.GameMessage.gameEvent: object expected");
                message.gameEvent = $root.gameserver.GameEvent.fromObject(object.gameEvent);
            }
            if (object.playerList != null) {
                if (typeof object.playerList !== "object")
                    throw TypeError(".gameserver.GameMessage.playerList: object expected");
                message.playerList = $root.gameserver.PlayerList.fromObject(object.playerList);
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
            if (message.playerChange != null && message.hasOwnProperty("playerChange")) {
                object.playerChange = $root.gameserver.PlayerChange.toObject(message.playerChange, options);
                if (options.oneofs)
                    object.msg = "playerChange";
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
            if (message.ping != null && message.hasOwnProperty("ping")) {
                object.ping = $root.gameserver.GamePing.toObject(message.ping, options);
                if (options.oneofs)
                    object.msg = "ping";
            }
            if (message.kicked != null && message.hasOwnProperty("kicked")) {
                object.kicked = $root.gameserver.Kicked.toObject(message.kicked, options);
                if (options.oneofs)
                    object.msg = "kicked";
            }
            if (message.gameEvent != null && message.hasOwnProperty("gameEvent")) {
                object.gameEvent = $root.gameserver.GameEvent.toObject(message.gameEvent, options);
                if (options.oneofs)
                    object.msg = "gameEvent";
            }
            if (message.playerList != null && message.hasOwnProperty("playerList")) {
                object.playerList = $root.gameserver.PlayerList.toObject(message.playerList, options);
                if (options.oneofs)
                    object.msg = "playerList";
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
         * @property {gameserver.IPlayer|null} [yourPlayer] GameInit yourPlayer
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
         * GameInit yourPlayer.
         * @member {gameserver.IPlayer|null|undefined} yourPlayer
         * @memberof gameserver.GameInit
         * @instance
         */
        GameInit.prototype.yourPlayer = null;

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
            if (message.yourPlayer != null && Object.hasOwnProperty.call(message, "yourPlayer"))
                $root.gameserver.Player.encode(message.yourPlayer, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
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
                case 2: {
                        message.yourPlayer = $root.gameserver.Player.decode(reader, reader.uint32());
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
            if (message.yourPlayer != null && message.hasOwnProperty("yourPlayer")) {
                let error = $root.gameserver.Player.verify(message.yourPlayer);
                if (error)
                    return "yourPlayer." + error;
            }
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
            if (object.yourPlayer != null) {
                if (typeof object.yourPlayer !== "object")
                    throw TypeError(".gameserver.GameInit.yourPlayer: object expected");
                message.yourPlayer = $root.gameserver.Player.fromObject(object.yourPlayer);
            }
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
            if (options.defaults) {
                object.seed = 0;
                object.yourPlayer = null;
            }
            if (message.seed != null && message.hasOwnProperty("seed"))
                object.seed = message.seed;
            if (message.yourPlayer != null && message.hasOwnProperty("yourPlayer"))
                object.yourPlayer = $root.gameserver.Player.toObject(message.yourPlayer, options);
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

    gameserver.PlayerChange = (function() {

        /**
         * Properties of a PlayerChange.
         * @memberof gameserver
         * @interface IPlayerChange
         * @property {string|null} [player] PlayerChange player
         */

        /**
         * Constructs a new PlayerChange.
         * @memberof gameserver
         * @classdesc Represents a PlayerChange.
         * @implements IPlayerChange
         * @constructor
         * @param {gameserver.IPlayerChange=} [properties] Properties to set
         */
        function PlayerChange(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerChange player.
         * @member {string} player
         * @memberof gameserver.PlayerChange
         * @instance
         */
        PlayerChange.prototype.player = "";

        /**
         * Creates a new PlayerChange instance using the specified properties.
         * @function create
         * @memberof gameserver.PlayerChange
         * @static
         * @param {gameserver.IPlayerChange=} [properties] Properties to set
         * @returns {gameserver.PlayerChange} PlayerChange instance
         */
        PlayerChange.create = function create(properties) {
            return new PlayerChange(properties);
        };

        /**
         * Encodes the specified PlayerChange message. Does not implicitly {@link gameserver.PlayerChange.verify|verify} messages.
         * @function encode
         * @memberof gameserver.PlayerChange
         * @static
         * @param {gameserver.IPlayerChange} message PlayerChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerChange.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.player != null && Object.hasOwnProperty.call(message, "player"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.player);
            return writer;
        };

        /**
         * Encodes the specified PlayerChange message, length delimited. Does not implicitly {@link gameserver.PlayerChange.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.PlayerChange
         * @static
         * @param {gameserver.IPlayerChange} message PlayerChange message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerChange.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerChange message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.PlayerChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.PlayerChange} PlayerChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerChange.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.PlayerChange();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.player = reader.string();
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
         * Decodes a PlayerChange message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.PlayerChange
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.PlayerChange} PlayerChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerChange.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerChange message.
         * @function verify
         * @memberof gameserver.PlayerChange
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerChange.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.player != null && message.hasOwnProperty("player"))
                if (!$util.isString(message.player))
                    return "player: string expected";
            return null;
        };

        /**
         * Creates a PlayerChange message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.PlayerChange
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.PlayerChange} PlayerChange
         */
        PlayerChange.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.PlayerChange)
                return object;
            let message = new $root.gameserver.PlayerChange();
            if (object.player != null)
                message.player = String(object.player);
            return message;
        };

        /**
         * Creates a plain object from a PlayerChange message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.PlayerChange
         * @static
         * @param {gameserver.PlayerChange} message PlayerChange
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerChange.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.player = "";
            if (message.player != null && message.hasOwnProperty("player"))
                object.player = message.player;
            return object;
        };

        /**
         * Converts this PlayerChange to JSON.
         * @function toJSON
         * @memberof gameserver.PlayerChange
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerChange.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerChange
         * @function getTypeUrl
         * @memberof gameserver.PlayerChange
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerChange.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.PlayerChange";
        };

        return PlayerChange;
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

    gameserver.PlayerList = (function() {

        /**
         * Properties of a PlayerList.
         * @memberof gameserver
         * @interface IPlayerList
         * @property {Array.<gameserver.IPlayer>|null} [players] PlayerList players
         * @property {string|null} [currentPlayerID] PlayerList currentPlayerID
         */

        /**
         * Constructs a new PlayerList.
         * @memberof gameserver
         * @classdesc Represents a PlayerList.
         * @implements IPlayerList
         * @constructor
         * @param {gameserver.IPlayerList=} [properties] Properties to set
         */
        function PlayerList(properties) {
            this.players = [];
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * PlayerList players.
         * @member {Array.<gameserver.IPlayer>} players
         * @memberof gameserver.PlayerList
         * @instance
         */
        PlayerList.prototype.players = $util.emptyArray;

        /**
         * PlayerList currentPlayerID.
         * @member {string} currentPlayerID
         * @memberof gameserver.PlayerList
         * @instance
         */
        PlayerList.prototype.currentPlayerID = "";

        /**
         * Creates a new PlayerList instance using the specified properties.
         * @function create
         * @memberof gameserver.PlayerList
         * @static
         * @param {gameserver.IPlayerList=} [properties] Properties to set
         * @returns {gameserver.PlayerList} PlayerList instance
         */
        PlayerList.create = function create(properties) {
            return new PlayerList(properties);
        };

        /**
         * Encodes the specified PlayerList message. Does not implicitly {@link gameserver.PlayerList.verify|verify} messages.
         * @function encode
         * @memberof gameserver.PlayerList
         * @static
         * @param {gameserver.IPlayerList} message PlayerList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerList.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.players != null && message.players.length)
                for (let i = 0; i < message.players.length; ++i)
                    $root.gameserver.Player.encode(message.players[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.currentPlayerID != null && Object.hasOwnProperty.call(message, "currentPlayerID"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.currentPlayerID);
            return writer;
        };

        /**
         * Encodes the specified PlayerList message, length delimited. Does not implicitly {@link gameserver.PlayerList.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.PlayerList
         * @static
         * @param {gameserver.IPlayerList} message PlayerList message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        PlayerList.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a PlayerList message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.PlayerList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.PlayerList} PlayerList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerList.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.PlayerList();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.players && message.players.length))
                            message.players = [];
                        message.players.push($root.gameserver.Player.decode(reader, reader.uint32()));
                        break;
                    }
                case 2: {
                        message.currentPlayerID = reader.string();
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
         * Decodes a PlayerList message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.PlayerList
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.PlayerList} PlayerList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        PlayerList.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a PlayerList message.
         * @function verify
         * @memberof gameserver.PlayerList
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        PlayerList.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.players != null && message.hasOwnProperty("players")) {
                if (!Array.isArray(message.players))
                    return "players: array expected";
                for (let i = 0; i < message.players.length; ++i) {
                    let error = $root.gameserver.Player.verify(message.players[i]);
                    if (error)
                        return "players." + error;
                }
            }
            if (message.currentPlayerID != null && message.hasOwnProperty("currentPlayerID"))
                if (!$util.isString(message.currentPlayerID))
                    return "currentPlayerID: string expected";
            return null;
        };

        /**
         * Creates a PlayerList message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.PlayerList
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.PlayerList} PlayerList
         */
        PlayerList.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.PlayerList)
                return object;
            let message = new $root.gameserver.PlayerList();
            if (object.players) {
                if (!Array.isArray(object.players))
                    throw TypeError(".gameserver.PlayerList.players: array expected");
                message.players = [];
                for (let i = 0; i < object.players.length; ++i) {
                    if (typeof object.players[i] !== "object")
                        throw TypeError(".gameserver.PlayerList.players: object expected");
                    message.players[i] = $root.gameserver.Player.fromObject(object.players[i]);
                }
            }
            if (object.currentPlayerID != null)
                message.currentPlayerID = String(object.currentPlayerID);
            return message;
        };

        /**
         * Creates a plain object from a PlayerList message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.PlayerList
         * @static
         * @param {gameserver.PlayerList} message PlayerList
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        PlayerList.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.players = [];
            if (options.defaults)
                object.currentPlayerID = "";
            if (message.players && message.players.length) {
                object.players = [];
                for (let j = 0; j < message.players.length; ++j)
                    object.players[j] = $root.gameserver.Player.toObject(message.players[j], options);
            }
            if (message.currentPlayerID != null && message.hasOwnProperty("currentPlayerID"))
                object.currentPlayerID = message.currentPlayerID;
            return object;
        };

        /**
         * Converts this PlayerList to JSON.
         * @function toJSON
         * @memberof gameserver.PlayerList
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        PlayerList.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for PlayerList
         * @function getTypeUrl
         * @memberof gameserver.PlayerList
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        PlayerList.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.PlayerList";
        };

        return PlayerList;
    })();

    gameserver.GamePing = (function() {

        /**
         * Properties of a GamePing.
         * @memberof gameserver
         * @interface IGamePing
         */

        /**
         * Constructs a new GamePing.
         * @memberof gameserver
         * @classdesc Represents a GamePing.
         * @implements IGamePing
         * @constructor
         * @param {gameserver.IGamePing=} [properties] Properties to set
         */
        function GamePing(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new GamePing instance using the specified properties.
         * @function create
         * @memberof gameserver.GamePing
         * @static
         * @param {gameserver.IGamePing=} [properties] Properties to set
         * @returns {gameserver.GamePing} GamePing instance
         */
        GamePing.create = function create(properties) {
            return new GamePing(properties);
        };

        /**
         * Encodes the specified GamePing message. Does not implicitly {@link gameserver.GamePing.verify|verify} messages.
         * @function encode
         * @memberof gameserver.GamePing
         * @static
         * @param {gameserver.IGamePing} message GamePing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePing.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified GamePing message, length delimited. Does not implicitly {@link gameserver.GamePing.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.GamePing
         * @static
         * @param {gameserver.IGamePing} message GamePing message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePing.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GamePing message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.GamePing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.GamePing} GamePing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePing.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.GamePing();
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
         * Decodes a GamePing message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.GamePing
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.GamePing} GamePing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePing.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GamePing message.
         * @function verify
         * @memberof gameserver.GamePing
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GamePing.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a GamePing message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.GamePing
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.GamePing} GamePing
         */
        GamePing.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.GamePing)
                return object;
            return new $root.gameserver.GamePing();
        };

        /**
         * Creates a plain object from a GamePing message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.GamePing
         * @static
         * @param {gameserver.GamePing} message GamePing
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GamePing.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this GamePing to JSON.
         * @function toJSON
         * @memberof gameserver.GamePing
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GamePing.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for GamePing
         * @function getTypeUrl
         * @memberof gameserver.GamePing
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        GamePing.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.GamePing";
        };

        return GamePing;
    })();

    /**
     * KickReason enum.
     * @name gameserver.KickReason
     * @enum {number}
     * @property {number} KICK_REASON_IDLE=0 KICK_REASON_IDLE value
     */
    gameserver.KickReason = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "KICK_REASON_IDLE"] = 0;
        return values;
    })();

    gameserver.Kicked = (function() {

        /**
         * Properties of a Kicked.
         * @memberof gameserver
         * @interface IKicked
         * @property {gameserver.KickReason|null} [reason] Kicked reason
         */

        /**
         * Constructs a new Kicked.
         * @memberof gameserver
         * @classdesc Represents a Kicked.
         * @implements IKicked
         * @constructor
         * @param {gameserver.IKicked=} [properties] Properties to set
         */
        function Kicked(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Kicked reason.
         * @member {gameserver.KickReason} reason
         * @memberof gameserver.Kicked
         * @instance
         */
        Kicked.prototype.reason = 0;

        /**
         * Creates a new Kicked instance using the specified properties.
         * @function create
         * @memberof gameserver.Kicked
         * @static
         * @param {gameserver.IKicked=} [properties] Properties to set
         * @returns {gameserver.Kicked} Kicked instance
         */
        Kicked.create = function create(properties) {
            return new Kicked(properties);
        };

        /**
         * Encodes the specified Kicked message. Does not implicitly {@link gameserver.Kicked.verify|verify} messages.
         * @function encode
         * @memberof gameserver.Kicked
         * @static
         * @param {gameserver.IKicked} message Kicked message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Kicked.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.reason != null && Object.hasOwnProperty.call(message, "reason"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.reason);
            return writer;
        };

        /**
         * Encodes the specified Kicked message, length delimited. Does not implicitly {@link gameserver.Kicked.verify|verify} messages.
         * @function encodeDelimited
         * @memberof gameserver.Kicked
         * @static
         * @param {gameserver.IKicked} message Kicked message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Kicked.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Kicked message from the specified reader or buffer.
         * @function decode
         * @memberof gameserver.Kicked
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {gameserver.Kicked} Kicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Kicked.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.gameserver.Kicked();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.reason = reader.int32();
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
         * Decodes a Kicked message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof gameserver.Kicked
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {gameserver.Kicked} Kicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Kicked.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Kicked message.
         * @function verify
         * @memberof gameserver.Kicked
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Kicked.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.reason != null && message.hasOwnProperty("reason"))
                switch (message.reason) {
                default:
                    return "reason: enum value expected";
                case 0:
                    break;
                }
            return null;
        };

        /**
         * Creates a Kicked message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof gameserver.Kicked
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {gameserver.Kicked} Kicked
         */
        Kicked.fromObject = function fromObject(object) {
            if (object instanceof $root.gameserver.Kicked)
                return object;
            let message = new $root.gameserver.Kicked();
            switch (object.reason) {
            default:
                if (typeof object.reason === "number") {
                    message.reason = object.reason;
                    break;
                }
                break;
            case "KICK_REASON_IDLE":
            case 0:
                message.reason = 0;
                break;
            }
            return message;
        };

        /**
         * Creates a plain object from a Kicked message. Also converts values to other types if specified.
         * @function toObject
         * @memberof gameserver.Kicked
         * @static
         * @param {gameserver.Kicked} message Kicked
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Kicked.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.reason = options.enums === String ? "KICK_REASON_IDLE" : 0;
            if (message.reason != null && message.hasOwnProperty("reason"))
                object.reason = options.enums === String ? $root.gameserver.KickReason[message.reason] === undefined ? message.reason : $root.gameserver.KickReason[message.reason] : message.reason;
            return object;
        };

        /**
         * Converts this Kicked to JSON.
         * @function toJSON
         * @memberof gameserver.Kicked
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Kicked.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for Kicked
         * @function getTypeUrl
         * @memberof gameserver.Kicked
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        Kicked.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/gameserver.Kicked";
        };

        return Kicked;
    })();

    return gameserver;
})();

export { $root as default };
