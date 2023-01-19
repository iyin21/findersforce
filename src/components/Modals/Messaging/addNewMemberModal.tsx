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
    client?: TelegramClient
    chatId?: bigInt.BigInteger
}
const AddNewMembersModal = ({
    opened,
    setOpened,
    client,
    chatId,
}: AddGroupModalProps) => {
    const [contacts, setContacts] = useState<Api.User[]>([])
    const [checkedContact, setCheckedContact] = useState<Api.User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isAddingMember, setIsAddingMember] = useState(false)
    const [search, setSearch] = useState("")
    const [searchParam] = useState(["firstName"])
    useEffect(() => {
        setIsLoading(true)
        const run = async function run() {
            await client?.connect()
            try {
                const result = await client?.invoke(
                    new Api.contacts.GetContacts({
                        //hash: 3457568,
                    })
                )
                // console.log("contact", result) // prints the result
                //@ts-expect-error
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
            setCheckedContact(value)
            

            //setFieldValue("complaintIssue", [...checkedComplaint, value])
        } else {
            setCheckedContact(null)
        }
    }
    const handleUnSelect = () => {
        setCheckedContact(null)
    }
    const handleAddMwmber = async () => {
        setIsAddingMember(true)
        await client?.connect() // This assumes you have already authenticated with .start()
        try {
            const result = await client?.invoke(
                new Api.messages.AddChatUser({
                    //@ts-expect-error
                    chatId: chatId?.value,
                    userId: checkedContact || "",
                    fwdLimit: 5000,
                })
            )
            // console.log("groupresult", result)
            if (result) {
                console.log("groupresult", result)
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
                message: "Member added successfully",
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
                    .toString()
                    .toLowerCase()
                    .indexOf(search.toLowerCase()) > -1
            )
        })
    })
    console.log(checkedContact, "checcked")
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
                        <p className="text-black-50 pl-4">/20000</p>
                    </div>

                    <div className="flex flex-wrap mt-2">
                        {checkedContact && (
                            <div className="rounded-[10px] bg-black-5 flex mr-4 mb-4 items-center">
                                <ProfilePicture
                                    client={client}
                                    data={checkedContact}
                                    showHover
                                    handleUnSelect={() => handleUnSelect()}
                                />
                                <p className="px-2">
                                    {checkedContact.username ||
                                        checkedContact.firstName +
                                            " " +
                                            (checkedContact?.lastName || "")}
                                </p>
                            </div>
                        )}
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
                                //{item.username|| item.firstName+" "+(item?.lastName||"")}
                                id={item.firstName}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => handleChecked(e, item)}
                                checked={checkedContact === item}
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
                            onClick={() => checkedContact && handleAddMwmber()}
                        >
                            {isAddingMember ? "Adding" : "Add"}
                        </p>
                    </div>
                </div>
            )}
        </Modal>
    )
}
export default AddNewMembersModal
