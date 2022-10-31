import React from "react";
import { NavLink } from "react-router-dom";
import { PasswordInput } from "@mantine/core";
import LandingPageText from "../../components/landing-page-txt";
import backIcon from "../../assets/backIcon.svg";
import Button from "../../components/button";
import successIcon from "../../assets/success.svg";

const ResetPassword = () => {
    const [passwordChanged, setPasswordChanged] = React.useState(false);

    return (
        <div className="bg-[black] grid grid-cols-2 text-white">
            <LandingPageText />
            <div className="my-8 mr-8 bg-white-100  pt-[90px] px-16 flex flex-col rounded-lg">
                {!passwordChanged ? 
                    (
                        <>
                            <div className="bg-black-10 w-fit h-fit rounded">
                                <NavLink to="/verify-email">
                                    <img 
                                        src={backIcon}
                                        alt="back button"
                                        className="p-2.5" 
                                    />
                                </NavLink>
                            </div>
                            <h1 className="font-extrabold text-black-100 text-[36px] pt-4 m-0">Reset Password</h1>
                            <span className="text-base pt-2.5 text-[#132013] opacity-80 font-normal">Your new password must be different from the old one.</span>
                    
                            <form className="pt-8">
                                <PasswordInput
                                    placeholder="new password"
                                    label="Enter new password"
                                    withAsterisk
                                    required
                                    radius="md"
                                    size="xl"
                                    styles={() => ({
                                        innerInput: {
                                            color: "rgba(15, 13, 0, 0.8)",
                                            fontSize: "16px",
                                            paddingTop: "7px",
                                            backgroundColor: "#FAFAFA",
                                            '&::placeholder': {
                                                color: "rgba(15, 13, 0, 0.3)",
                                                fontSize: '16px',
                                                lineHeight: '19px',
                                            }
                                        },
                                        input: {
                                            border: '1px solid rgba(15, 13, 0, 0.1)',
                                            height: '64px',
                                            marginBottom: '11px',
                                            borderRadius: '10px',
                                            paddingLeft: '25px'
                                        },
                                        label: {
                                            color: '#0500010',
                                            fontSize: '16px',
                                            fontWeight: '800'
                                        }
                                    })}
                                />

                                <PasswordInput
                                    placeholder="new password"
                                    label="Confirm password"
                                    withAsterisk
                                    required
                                    radius="md"
                                    size="xl"
                                    styles={() => ({
                                        innerInput: {
                                            color: "rgba(15, 13, 0, 0.8)",
                                            fontSize: "16px",
                                            paddingTop: "7px",
                                            backgroundColor: "#FAFAFA",
                                            '&::placeholder': {
                                                color: "rgba(15, 13, 0, 0.3)",
                                                fontSize: '16px',
                                                lineHeight: '19px',
                                            }
                                        },
                                        input: {
                                            border: '1px solid rgba(15, 13, 0, 0.1)',
                                            height: '64px',
                                            marginBottom: '32px',
                                            borderRadius: '10px',
                                            paddingLeft: '25px'
                                        },
                                        label: {
                                            color: '#0500010',
                                            fontSize: '16px',
                                            fontWeight: '800',
                                            paddingTop: '20px'
                                        }
                                    })}
                                />
                                
                                
                                <div onClick={e => {
                                        e.preventDefault();
                                        setPasswordChanged(!passwordChanged)
                                    }}>
                                    <Button buttonText="Reset password"/>
                                </div>
                            </form>
                        </>
                    ) : 
                    (
                        <>
                            <h1 className="pt-[60px] text-[36px] font-[800] text-[black]">Password changed</h1>
                            <span className="pt-2 text-[#0F0D00] opacity-60 text-base">Your password has been changed successfully</span>
                            <figure className="self-center mt-8">
                                <img src={successIcon} alt="password successfully changed" />
                            </figure>
                            <NavLink to="/login">
                                <Button buttonText="Back to login"/>
                            </NavLink>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default ResetPassword;