import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace gameserver. */
export namespace gameserver {

    /** Role enum. */
    enum Role {
        ROLE_OBSERVER = 0,
        ROLE_PLAYER = 1
    }

    /** Properties of a GameMessage. */
    interface IGameMessage {

        /** GameMessage frame */
        frame?: (number|null);

        /** GameMessage gameInit */
        gameInit?: (gameserver.IGameInit|null);

        /** GameMessage roleChange */
        roleChange?: (gameserver.IRoleChange|null);

        /** GameMessage heartbeat */
        heartbeat?: (gameserver.IHeartbeat|null);

        /** GameMessage gameEvent */
        gameEvent?: (gameserver.IGameEvent|null);
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

        /** GameMessage roleChange. */
        public roleChange?: (gameserver.IRoleChange|null);

        /** GameMessage heartbeat. */
        public heartbeat?: (gameserver.IHeartbeat|null);

        /** GameMessage gameEvent. */
        public gameEvent?: (gameserver.IGameEvent|null);

        /** GameMessage msg. */
        public msg?: ("gameInit"|"roleChange"|"heartbeat"|"gameEvent");

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

    /** Properties of a RoleChange. */
    interface IRoleChange {

        /** RoleChange role */
        role?: (gameserver.Role|null);
    }

    /** Represents a RoleChange. */
    class RoleChange implements IRoleChange {

        /**
         * Constructs a new RoleChange.
         * @param [properties] Properties to set
         */
        constructor(properties?: gameserver.IRoleChange);

        /** RoleChange role. */
        public role: gameserver.Role;

        /**
         * Creates a new RoleChange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoleChange instance
         */
        public static create(properties?: gameserver.IRoleChange): gameserver.RoleChange;

        /**
         * Encodes the specified RoleChange message. Does not implicitly {@link gameserver.RoleChange.verify|verify} messages.
         * @param message RoleChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: gameserver.IRoleChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoleChange message, length delimited. Does not implicitly {@link gameserver.RoleChange.verify|verify} messages.
         * @param message RoleChange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: gameserver.IRoleChange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoleChange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoleChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): gameserver.RoleChange;

        /**
         * Decodes a RoleChange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoleChange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): gameserver.RoleChange;

        /**
         * Verifies a RoleChange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoleChange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoleChange
         */
        public static fromObject(object: { [k: string]: any }): gameserver.RoleChange;

        /**
         * Creates a plain object from a RoleChange message. Also converts values to other types if specified.
         * @param message RoleChange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: gameserver.RoleChange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoleChange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for RoleChange
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
}
