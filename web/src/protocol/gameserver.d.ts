import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace gameserver. */
export namespace gameserver {

    /** Role enum. */
    enum Role {
        ROLE_OBSERVER = 0,
        ROLE_PLAYER = 1
    }

    /** Properties of a Player. */
    interface IPlayer {

        /** Player id */
        id?: (string|null);

        /** Player name */
        name?: (string|null);
    }

    /** Represents a Player. */
    class Player implements IPlayer {

        /**
         * Constructs a new Player.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IPlayer);

        /** Player id. */
        public id: string;

        /** Player name. */
        public name: string;

        /**
         * Creates a new Player instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Player instance
         */
        public static create(properties?: gameserver.IPlayer): gameserver.Player;

        /**
         * Encodes the specified Player message. Does not implicitly {@link gameserver.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Player message, length delimited. Does not implicitly {@link gameserver.Player.verify|verify} messages.
         * @param message Player message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Player message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.Player;

        /**
         * Decodes a Player message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Player
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.Player;

        /**
         * Verifies a Player message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Player message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Player
         */
        public static fromObject(object: { [k: string]: any }): gameserver.Player;

        /**
         * Creates a plain object from a Player message. Also converts values to other types if specified.
         * @param message Player
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.Player, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Player to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Player
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameMessage. */
    interface IGameMessage {

        /** GameMessage frame */
        frame?: (number|null);

        /** GameMessage gameInit */
        gameInit?: (gameserver.IGameInit|null);

        /** GameMessage playerChange */
        playerChange?: (gameserver.IPlayerChange|null);

        /** GameMessage heartbeat */
        heartbeat?: (gameserver.IHeartbeat|null);

        /** GameMessage passControl */
        passControl?: (gameserver.IPassControl|null);

        /** GameMessage ping */
        ping?: (gameserver.IGamePing|null);

        /** GameMessage kicked */
        kicked?: (gameserver.IKicked|null);

        /** GameMessage gameEvent */
        gameEvent?: (gameserver.IGameEvent|null);

        /** GameMessage replay */
        replay?: (gameserver.IReplay|null);

        /** GameMessage playerList */
        playerList?: (gameserver.IPlayerList|null);
    }

    /** Represents a GameMessage. */
    class GameMessage implements IGameMessage {

        /**
         * Constructs a new GameMessage.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IGameMessage);

        /** GameMessage frame. */
        public frame: number;

        /** GameMessage gameInit. */
        public gameInit?: (gameserver.IGameInit|null);

        /** GameMessage playerChange. */
        public playerChange?: (gameserver.IPlayerChange|null);

        /** GameMessage heartbeat. */
        public heartbeat?: (gameserver.IHeartbeat|null);

        /** GameMessage passControl. */
        public passControl?: (gameserver.IPassControl|null);

        /** GameMessage ping. */
        public ping?: (gameserver.IGamePing|null);

        /** GameMessage kicked. */
        public kicked?: (gameserver.IKicked|null);

        /** GameMessage gameEvent. */
        public gameEvent?: (gameserver.IGameEvent|null);

        /** GameMessage replay. */
        public replay?: (gameserver.IReplay|null);

        /** GameMessage playerList. */
        public playerList?: (gameserver.IPlayerList|null);

        /** GameMessage msg. */
        public msg?: ("gameInit"|"playerChange"|"heartbeat"|"passControl"|"ping"|"kicked"|"gameEvent"|"replay"|"playerList");

        /**
         * Creates a new GameMessage instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameMessage instance
         */
        public static create(properties?: gameserver.IGameMessage): gameserver.GameMessage;

        /**
         * Encodes the specified GameMessage message. Does not implicitly {@link gameserver.GameMessage.verify|verify} messages.
         * @param message GameMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameMessage message, length delimited. Does not implicitly {@link gameserver.GameMessage.verify|verify} messages.
         * @param message GameMessage message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IGameMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameMessage message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.GameMessage;

        /**
         * Decodes a GameMessage message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameMessage
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.GameMessage;

        /**
         * Verifies a GameMessage message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameMessage message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameMessage
         */
        public static fromObject(object: { [k: string]: any }): gameserver.GameMessage;

        /**
         * Creates a plain object from a GameMessage message. Also converts values to other types if specified.
         * @param message GameMessage
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.GameMessage, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameMessage to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameMessage
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Heartbeat. */
    interface IHeartbeat {
    }

    /** Represents a Heartbeat. */
    class Heartbeat implements IHeartbeat {

        /**
         * Constructs a new Heartbeat.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IHeartbeat);

        /**
         * Creates a new Heartbeat instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Heartbeat instance
         */
        public static create(properties?: gameserver.IHeartbeat): gameserver.Heartbeat;

        /**
         * Encodes the specified Heartbeat message. Does not implicitly {@link gameserver.Heartbeat.verify|verify} messages.
         * @param message Heartbeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Heartbeat message, length delimited. Does not implicitly {@link gameserver.Heartbeat.verify|verify} messages.
         * @param message Heartbeat message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IHeartbeat, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Heartbeat message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.Heartbeat;

        /**
         * Decodes a Heartbeat message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Heartbeat
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.Heartbeat;

        /**
         * Verifies a Heartbeat message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Heartbeat message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Heartbeat
         */
        public static fromObject(object: { [k: string]: any }): gameserver.Heartbeat;

        /**
         * Creates a plain object from a Heartbeat message. Also converts values to other types if specified.
         * @param message Heartbeat
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.Heartbeat, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Heartbeat to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Heartbeat
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameInit. */
    interface IGameInit {

        /** GameInit seed */
        seed?: (number|null);

        /** GameInit yourPlayer */
        yourPlayer?: (gameserver.IPlayer|null);
    }

    /** Represents a GameInit. */
    class GameInit implements IGameInit {

        /**
         * Constructs a new GameInit.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IGameInit);

        /** GameInit seed. */
        public seed: number;

        /** GameInit yourPlayer. */
        public yourPlayer?: (gameserver.IPlayer|null);

        /**
         * Creates a new GameInit instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameInit instance
         */
        public static create(properties?: gameserver.IGameInit): gameserver.GameInit;

        /**
         * Encodes the specified GameInit message. Does not implicitly {@link gameserver.GameInit.verify|verify} messages.
         * @param message GameInit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IGameInit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameInit message, length delimited. Does not implicitly {@link gameserver.GameInit.verify|verify} messages.
         * @param message GameInit message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IGameInit, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameInit message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.GameInit;

        /**
         * Decodes a GameInit message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameInit
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.GameInit;

        /**
         * Verifies a GameInit message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameInit message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameInit
         */
        public static fromObject(object: { [k: string]: any }): gameserver.GameInit;

        /**
         * Creates a plain object from a GameInit message. Also converts values to other types if specified.
         * @param message GameInit
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.GameInit, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameInit to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameInit
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerChange. */
    interface IPlayerChange {

        /** PlayerChange player */
        player?: (string|null);
    }

    /** Represents a PlayerChange. */
    class PlayerChange implements IPlayerChange {

        /**
         * Constructs a new PlayerChange.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IPlayerChange);

        /** PlayerChange player. */
        public player: string;

        /**
         * Creates a new PlayerChange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerChange instance
         */
        public static create(properties?: gameserver.IPlayerChange): gameserver.PlayerChange;

        /**
         * Encodes the specified PlayerChange message. Does not implicitly {@link gameserver.PlayerChange.verify|verify} messages.
         * @param message PlayerChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IPlayerChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerChange message, length delimited. Does not implicitly {@link gameserver.PlayerChange.verify|verify} messages.
         * @param message PlayerChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IPlayerChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerChange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.PlayerChange;

        /**
         * Decodes a PlayerChange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.PlayerChange;

        /**
         * Verifies a PlayerChange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerChange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerChange
         */
        public static fromObject(object: { [k: string]: any }): gameserver.PlayerChange;

        /**
         * Creates a plain object from a PlayerChange message. Also converts values to other types if specified.
         * @param message PlayerChange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.PlayerChange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerChange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerChange
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GameEvent. */
    interface IGameEvent {

        /** GameEvent type */
        type?: (string|null);
    }

    /** Represents a GameEvent. */
    class GameEvent implements IGameEvent {

        /**
         * Constructs a new GameEvent.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IGameEvent);

        /** GameEvent type. */
        public type: string;

        /**
         * Creates a new GameEvent instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameEvent instance
         */
        public static create(properties?: gameserver.IGameEvent): gameserver.GameEvent;

        /**
         * Encodes the specified GameEvent message. Does not implicitly {@link gameserver.GameEvent.verify|verify} messages.
         * @param message GameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IGameEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameEvent message, length delimited. Does not implicitly {@link gameserver.GameEvent.verify|verify} messages.
         * @param message GameEvent message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IGameEvent, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameEvent message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.GameEvent;

        /**
         * Decodes a GameEvent message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameEvent
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.GameEvent;

        /**
         * Verifies a GameEvent message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameEvent message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameEvent
         */
        public static fromObject(object: { [k: string]: any }): gameserver.GameEvent;

        /**
         * Creates a plain object from a GameEvent message. Also converts values to other types if specified.
         * @param message GameEvent
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.GameEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameEvent to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GameEvent
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Replay. */
    interface IReplay {

        /** Replay messages */
        messages?: (gameserver.IGameMessage[]|null);
    }

    /** Represents a Replay. */
    class Replay implements IReplay {

        /**
         * Constructs a new Replay.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IReplay);

        /** Replay messages. */
        public messages: gameserver.IGameMessage[];

        /**
         * Creates a new Replay instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Replay instance
         */
        public static create(properties?: gameserver.IReplay): gameserver.Replay;

        /**
         * Encodes the specified Replay message. Does not implicitly {@link gameserver.Replay.verify|verify} messages.
         * @param message Replay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IReplay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Replay message, length delimited. Does not implicitly {@link gameserver.Replay.verify|verify} messages.
         * @param message Replay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IReplay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Replay message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Replay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.Replay;

        /**
         * Decodes a Replay message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Replay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.Replay;

        /**
         * Verifies a Replay message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Replay message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Replay
         */
        public static fromObject(object: { [k: string]: any }): gameserver.Replay;

        /**
         * Creates a plain object from a Replay message. Also converts values to other types if specified.
         * @param message Replay
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.Replay, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Replay to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Replay
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PassControl. */
    interface IPassControl {
    }

    /** Represents a PassControl. */
    class PassControl implements IPassControl {

        /**
         * Constructs a new PassControl.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IPassControl);

        /**
         * Creates a new PassControl instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PassControl instance
         */
        public static create(properties?: gameserver.IPassControl): gameserver.PassControl;

        /**
         * Encodes the specified PassControl message. Does not implicitly {@link gameserver.PassControl.verify|verify} messages.
         * @param message PassControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IPassControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PassControl message, length delimited. Does not implicitly {@link gameserver.PassControl.verify|verify} messages.
         * @param message PassControl message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IPassControl, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PassControl message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PassControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.PassControl;

        /**
         * Decodes a PassControl message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PassControl
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.PassControl;

        /**
         * Verifies a PassControl message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PassControl message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PassControl
         */
        public static fromObject(object: { [k: string]: any }): gameserver.PassControl;

        /**
         * Creates a plain object from a PassControl message. Also converts values to other types if specified.
         * @param message PassControl
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.PassControl, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PassControl to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PassControl
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a PlayerList. */
    interface IPlayerList {

        /** PlayerList players */
        players?: (gameserver.IPlayer[]|null);

        /** PlayerList currentPlayerID */
        currentPlayerID?: (string|null);
    }

    /** Represents a PlayerList. */
    class PlayerList implements IPlayerList {

        /**
         * Constructs a new PlayerList.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IPlayerList);

        /** PlayerList players. */
        public players: gameserver.IPlayer[];

        /** PlayerList currentPlayerID. */
        public currentPlayerID: string;

        /**
         * Creates a new PlayerList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerList instance
         */
        public static create(properties?: gameserver.IPlayerList): gameserver.PlayerList;

        /**
         * Encodes the specified PlayerList message. Does not implicitly {@link gameserver.PlayerList.verify|verify} messages.
         * @param message PlayerList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IPlayerList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerList message, length delimited. Does not implicitly {@link gameserver.PlayerList.verify|verify} messages.
         * @param message PlayerList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IPlayerList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.PlayerList;

        /**
         * Decodes a PlayerList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.PlayerList;

        /**
         * Verifies a PlayerList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerList
         */
        public static fromObject(object: { [k: string]: any }): gameserver.PlayerList;

        /**
         * Creates a plain object from a PlayerList message. Also converts values to other types if specified.
         * @param message PlayerList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.PlayerList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for PlayerList
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a GamePing. */
    interface IGamePing {
    }

    /** Represents a GamePing. */
    class GamePing implements IGamePing {

        /**
         * Constructs a new GamePing.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IGamePing);

        /**
         * Creates a new GamePing instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GamePing instance
         */
        public static create(properties?: gameserver.IGamePing): gameserver.GamePing;

        /**
         * Encodes the specified GamePing message. Does not implicitly {@link gameserver.GamePing.verify|verify} messages.
         * @param message GamePing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IGamePing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GamePing message, length delimited. Does not implicitly {@link gameserver.GamePing.verify|verify} messages.
         * @param message GamePing message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IGamePing, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GamePing message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GamePing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.GamePing;

        /**
         * Decodes a GamePing message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GamePing
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.GamePing;

        /**
         * Verifies a GamePing message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GamePing message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GamePing
         */
        public static fromObject(object: { [k: string]: any }): gameserver.GamePing;

        /**
         * Creates a plain object from a GamePing message. Also converts values to other types if specified.
         * @param message GamePing
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.GamePing, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GamePing to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for GamePing
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** KickReason enum. */
    enum KickReason {
        KICK_REASON_IDLE = 0
    }

    /** Properties of a Kicked. */
    interface IKicked {

        /** Kicked reason */
        reason?: (gameserver.KickReason|null);
    }

    /** Represents a Kicked. */
    class Kicked implements IKicked {

        /**
         * Constructs a new Kicked.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IKicked);

        /** Kicked reason. */
        public reason: gameserver.KickReason;

        /**
         * Creates a new Kicked instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Kicked instance
         */
        public static create(properties?: gameserver.IKicked): gameserver.Kicked;

        /**
         * Encodes the specified Kicked message. Does not implicitly {@link gameserver.Kicked.verify|verify} messages.
         * @param message Kicked message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IKicked, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Kicked message, length delimited. Does not implicitly {@link gameserver.Kicked.verify|verify} messages.
         * @param message Kicked message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IKicked, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Kicked message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Kicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.Kicked;

        /**
         * Decodes a Kicked message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Kicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.Kicked;

        /**
         * Verifies a Kicked message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Kicked message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Kicked
         */
        public static fromObject(object: { [k: string]: any }): gameserver.Kicked;

        /**
         * Creates a plain object from a Kicked message. Also converts values to other types if specified.
         * @param message Kicked
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.Kicked, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Kicked to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Kicked
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
