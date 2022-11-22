import { Modal } from "@mantine/core"
import Button from "../../../components/Core/Buttons/Button"
import { NavLink } from "react-router-dom"
import { Dispatch, SetStateAction } from "react"
import successIcon from "../../../assets/check.svg"

export interface SuccessLoginProps {
    opened: boolean
    setOpened: Dispatch<SetStateAction<boolean>>
}

const SuccessfulLogin = ({ opened, setOpened }: SuccessLoginProps) => {
    return (
        <div>
            <Modal
                opened={opened}
                centered
                withCloseButton={false}
                onClose={() => setOpened(!opened)}
                closeOnClickOutside={false}
                closeOnEscape={false}
                overlayOpacity={0.55}
                overlayBlur={3}
                sx={{
                    borderRadius: "10px",
                    width: "350px",
                    margin: "0 auto",
                }}
            >
                <div className="flex flex-col items-center">
                    <img src={successIcon} alt="success" className="pt-7"></img>
                    <h1 className="font-extrabold text-[28px] text-[#050001] pt-2">
                        You are all set!
                    </h1>
                    <span className="text-[#0F0D00B2] opacity-70 text-[14px]">
                        Please provide the following information
                    </span>
                    <NavLink to="/login" className="w-[183px] pt-7">
                        <Button
                            variant="primary"
                            style={{
                                backgroundColor: "rgba(254, 215, 10, 1)",
                            }}
                            className="text-black-100 bg-yellow-100 font-bold text-base w-full text-center py-6 rounded-l rounded-tr-2xl rounded-br"
                        >
                            Get In
                        </Button>
                    </NavLink>
                </div>
            </Modal>
        </div>
    )
}

export default SuccessfulLogin
