import React from "react";
import { NavLink } from "react-router-dom";
import { TextInput, PasswordInput } from "@mantine/core";
import Button from "./components/button";
import LandingPageText from "./components/landing-page-txt";


const Login = () => {
    return (
        <div className="grid grid-cols-2 text-white h-fit bg-black">
            <LandingPageText />
            <section className="my-8 mr-8 bg-white pt-12 px-16 flex flex-col rounded-lg">
                <h1 className="text-blaq font-extrabold text-4xl pb-2.5">Log In</h1>
                <div>
                    <span className="text-light-black text-lg font-normal">Don't have an account? </span>
                    <a href="" className="text-lg text-state-green font-normal">Request access</a>
                </div>
                <form className="pt-14">
                    <TextInput 
                        placeholder="example@gmail.com"
                        label="Email Address"
                        withAsterisk
                        styles={() => ({
                            innerInput: {
                                color: "rgba(15, 13, 0, 0.8)",  
                                '&::placeholder': {
                                    color: "#E7E7E5",
                                    fontSize: '16px',
                                    lineHeight: '19px'
                                }
                            },
                            input: {
                                marginTop: '10px',
                                border: '1px solid rgba(15, 13, 0, 0.1)',
                                height: '64px',
                                marginBottom: '11px',
                                borderRadius: '10px',
                                paddingLeft: '23px',
                                fontSize: '16px',
                            },
                            label: {
                                color: '#0F0D00',
                                fontSize: '16px',
                                fontWeight: '800'
                            }
                        })}
                    />
                    <PasswordInput
                        placeholder="password"
                        label="Password"
                        withAsterisk
                        radius="md"
                        size="xl"
                        styles={() => ({
                            innerInput: {
                                color: "rgba(15, 13, 0, 0.8)",
                                fontSize: "16px",
                                '&::placeholder': {
                                    color: "rgba(15, 13, 0, 0.3)",
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                }
                            },
                            input: {
                                marginTop: '10px',
                                border: '1px solid rgba(15, 13, 0, 0.1)',
                                height: '64px',
                                marginBottom: '11px',
                                borderRadius: '10px',
                                paddingLeft: '25px'
                            },
                            label: {
                                color: '#0F0D00',
                                fontSize: '16px',
                                fontWeight: '800'
                            }
                        })}
                    />
                    <NavLink to="/profile">
                        <Button buttonText="Enter finders force"/>
                    </NavLink>
                </form>
                <div className="text-end mt-14 pb-32">
                    <span className="text-base font-normal text-fg-black">Forgot password?</span>
                    <NavLink to="/recover-password" className="text-fg-black font-semibold pl-1.5">
                        Recover
                    </NavLink>
                    <div className="flex flex-row-reverse">
                        <hr className="w-[61px] border-t-2 border-orange"/>
                    </div>
                    
                </div>
                
            </section>
        </div>
    );
}

export default Login;