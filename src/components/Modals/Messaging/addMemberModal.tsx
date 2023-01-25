import { Modal } from "@mantine/core"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import Checkbox from "../../Core/Checkbox/checkbox"
import { TelegramClient, Api } from "telegram"
import { showNotification } from "@mantine/notifications"
import ProfilePicture from "./profilePicture"
import Input from "../../Core/Input/Input"
import { AiOutlineSearch } from "react-icons/ai"

export interface AddGroupModalProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
    client: TelegramClient
    groupName: string
    groupPhoto: File | null
}
const AddMembersModal = ({
    opened,
    setOpened,
    client,
    groupName,
    groupPhoto,
}: AddGroupModalProps) => {
    const [contacts, setContacts] = useState<Api.User[]>([])
    const [checkedContact, setCheckedContact] = useState<Api.User[]>([])
    const [userIds, setUserIds] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isCreatingGroup, setIsCreatingGroup] = useState(false)
    const [search, setSearch] = useState("")
    const [searchParam] = useState(["firstName"])
    useEffect(() => {
        setIsLoading(true)
        const run = async function run() {
            await client.connect()
            try {
                const result = await client.invoke(
                    new Api.contacts.GetContacts({
                        // hash: 3457568,
                    })
                )
                // console.log("contact", result) // prints the result
                // @ts-expect-error
                setContacts(result?.users)
            } finally {
                setIsLoading(false)
            }
        }
        run()
    }, [])
    const handleChecked = (
        e: React.ChangeEvent<HTMLInputElement>,
        value: Api.User
    ) => {
        const isChecked = e.target.checked
        if (isChecked) {
            setCheckedContact([...checkedContact, value])
            if (value.phone) {
                setUserIds([...userIds, value.phone])
            }

            // setFieldValue("complaintIssue", [...checkedComplaint, value])
        } else {
            setCheckedContact(checkedContact.filter((item) => item !== value))
            setUserIds(userIds.filter((item) => item !== value.phone))
        }
    }
    const handleUnSelect = (value: Api.User) => {
        setCheckedContact(checkedContact.filter((item) => item !== value))
        setUserIds(userIds.filter((item) => item !== value.phone))
    }
    const handleCreateGroup = async () => {
        setIsCreatingGroup(true)
        await client.connect() // This assumes you have already authenticated with .start()
        try {
            const result = await client.invoke(
                new Api.messages.CreateChat({
                    users: checkedContact,
                    title: groupName,
                })
            )
            // console.log("groupresult", result)
            if (result && groupPhoto) {
                const result2 = await client.invoke(
                    new Api.messages.EditChatPhoto({
                        // @ts-expect-error
                        chatId: result.chats[0].id,
                        // @ts-expect-error
                        photo: await client.uploadFile({
                            file: groupPhoto,
                            workers: 1,
                        }),
                    })
                )
                if (result2) {
                    setIsCreatingGroup(false)
                }
            } else {
                setOpened(false)
            }
        } catch (err: any) {
            showNotification({
                title: "Error",
                message:
                    err.errorMessage || "An error occured, please try again",
                color: "red",
            })
        } finally {
            showNotification({
                title: "Success",
                message: "Group created successfully",
                color: "green",
            })

            setOpened(false)
        }
    }
    const searchedData = contacts.filter((item: Api.User) => {
        return searchParam.some((newItem) => {
            return (
                // @ts-expect-error
                item[newItem as keyof Api.User]
                    ?.toString()
                    ?.toLowerCase()
                    ?.indexOf(search.toLowerCase()) > -1
            )
        })
    })
    return (
        <Modal
            opened={opened}
            withCloseButton={false}
            onClose={() => setOpened(false)}
            size="md"
            centered
        >
            {isLoading ? (
                <div>
                    <p
                        className="h-40 flex justify-center items-center w-full col-span-full"
                        data-testid="load"
                    >
                        Loading contacts...
                    </p>
                </div>
            ) : (
                <div className="">
                    <div className="flex font-bold text-2lg items-center">
                        <h5 className="">Add members</h5>
                        <p className="text-black-50 pl-4">
                            {checkedContact.length}/20000
                        </p>
                    </div>

                    <div className="flex flex-wrap mt-2">
                        {checkedContact.map((item, index) => (
                            <div
                                className="rounded-[10px] bg-black-5 flex mr-4 mb-4 items-center"
                                key={index}
                            >
                                <ProfilePicture
                                    client={client}
                                    data={item}
                                    showHover
                                    handleUnSelect={() => handleUnSelect(item)}
                                />
                                <p className="px-2">
                                    {item.username ||
                                        item.firstName +
                                            " " +
                                            (item?.lastName || "")}
                                </p>
                            </div>
                        ))}
                    </div>
                    <Input
                        control=""
                        prefixIcon={
                            <AiOutlineSearch
                                color="rgba(15, 13, 0, 0.4)"
                                size="16px"
                            />
                        }
                        className="w-full outline-none border-none input bg-transparent  md:h-8"
                        placeholder="Search"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearch(e.target.value)
                        }
                    />

                    <hr className="text-black-20  mb-4" />
                    <div className="h-[350px] overflow-y-auto">
                        {searchedData.map((item, index) => (
                            <Checkbox
                                key={index}
                                value={
                                    item.firstName +
                                    " " +
                                    (item?.lastName || "")
                                }
                                label={
                                    <div
                                        className="rounded-[10px] flex  items-center"
                                        key={index}
                                    >
                                        <ProfilePicture
                                            client={client}
                                            data={item}
                                        />
                                        <p className="px-2">
                                            {item.firstName +
                                                " " +
                                                (item?.lastName || "")}
                                        </p>
                                    </div>
                                }
                                // {item.username|| item.firstName+" "+(item?.lastName||"")}
                                id={item.firstName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChecked(e, item)}
                                checked={checkedContact.includes(item)}
                            />
                        ))}
                    </div>
                    <hr className="text-black-20 mt-4 mb-4" />
                    <div className="flex justify-end text-blue-90">
                        <p
                            className="cursor-pointer"
                            onClick={() => setOpened(false)}
                        >
                            Cancel
                        </p>
                        <p
                            className="pl-8 cursor-pointer"
                            onClick={() =>
                                checkedContact.length > 0 && handleCreateGroup()
                            }
                        >
                            {isCreatingGroup ? "Creating" : "Create"}
                        </p>
                    </div>
                </div>
            )}
        </Modal>
    )
}
export default AddMembersModal
