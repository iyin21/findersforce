import { TelegramClient } from "telegram"
// import { boolean, number } from "yup";

export interface DialogType {
    archived: boolean
    date: Date
    dialog: VirtualClass
    draft: Draft
    entity: VirtualClass
    isChannel: boolean
    isGroup: boolean
    isUser: boolean
    message: VirtualClass
    name: string
    pinned: boolean
    title: string
    unreadCount: number
    unreadMentionsCount: number
    _client: TelegramClient
    // TelegramClient {__version__: '2.14.0', _ALBUMS: Map(0), _exportedSenderPromises: Map(0), _exportedSenderReleaseTimeouts: Map(0), _log: Logger, …}
}

interface VirtualClass {
    CONSTRUCTOR_ID: number
    SUBCLASS_OF_ID: number
    className: string
    classType: string
    draft: null
    flags: number
    folderId: null
    notifySettings: VirtualClass
    androidSound: null
    iosSound: null
    muteUntil: number
    originalArgs: {
        flags: 4
        showPreviews: null
        silent: null
        muteUntil: Date
        iosSound: null
    }
    otherSound: null
    showPreviews: null
    silent: null
    readInboxMaxId: number
    readOutboxMaxId: number
    topMessage: number
    unreadCount: number
    unreadMark: boolean
    unreadMentionsCount: number
    unreadReactionsCount: 0
    message: string
    _sender: {
        firstName: string
        lastName: string
    }
}
interface Draft {
    _client: TelegramClient
    _peer: VirtualClass
    _entity: VirtualClass
    _inputEntity: VirtualClass
    linkPreview: boolean
}
