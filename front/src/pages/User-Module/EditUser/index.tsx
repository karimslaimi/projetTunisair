import {FormInput, FormLabel} from "../../../base-components/Form";
import React, {useState} from "react";
import Button from "../../../base-components/Button";
import userService from "../../../Services/UserService";
import Notification from "../../../base-components/Notification";
import Lucide from "../../../base-components/Lucide";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import Toastify from "toastify-js";
import {useNavigate, useParams} from "react-router-dom";


function main() {
    const {id} = useParams();


    const navigate = useNavigate();
    const schema = yup
        .object({
            password: yup.string().required().min(6),
            confirmPassword: yup.string().required().min(6).oneOf([yup.ref('password'), null], 'Passwords must match'),
        })
        .required();

    const showNotification = () => {
        const failedEl = document
            .querySelectorAll("#failed-notification-content")[0]
            .cloneNode(true) as HTMLElement;
        failedEl.classList.remove("hidden");
        return failedEl;
    }
    const {
        register,
        trigger,
        formState: {errors},
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const formSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await trigger();
        if (!result) {
            const failedEl = showNotification();
            Toastify({
                node: failedEl,
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
            }).showToast();
        } else {
            let data = {
                password: password
            };
            userService.updateUser(id ?? '', data).then((result: any) => {
                console.log(result);
                if (result) {
                    alert("password updated successfully");
                    navigate("/users");
                }
            }).catch((e) => {
                showNotification();
                setMessage(e.response.data.message);
                console.log(e);
                alert("an error occured");
            })
        }

    }


    const [message, setMessage] = useState("");


    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const restForm = () => {
        setPassword("");
        setConfirmPassword("");
    }


    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Edit user password</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <span className={"text-danger"}>{message}</span>
                        <form className="validate-form" onSubmit={formSubmit}>

                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="password"
                                           className="flex flex-col w-full sm:flex-row">Password</FormLabel>
                                <FormInput
                                    {...register("password")}
                                    id="password"
                                    type="password"
                                    placeholder="Enter the password"
                                    aria-describedby="password-input"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    className={"w-full " + clsx({"border-danger": errors.password})}
                                />
                                {errors.password && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.password.message === "string" &&
                                            errors.password.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="password"
                                           className="flex flex-col w-full sm:flex-row">Confirm password</FormLabel>
                                <FormInput
                                    {...register("confirmPassword")}
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm the password"
                                    aria-describedby="password-input"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    className={"w-full " + clsx({"border-danger": errors.confirmPassword})}
                                />
                                {errors.confirmPassword && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.confirmPassword.message === "string" &&
                                            errors.confirmPassword.message}
                                    </div>
                                )}
                            </div>


                            <div className="mt-5 text-right">
                                <Button
                                    type="button"
                                    variant="outline-secondary"
                                    className="w-24 mr-1"
                                    onClick={restForm}
                                >
                                    Reset
                                </Button>
                                <Button type="submit" variant="primary" className="w-24">
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                    {/* END: Form Layout */}
                </div>
            </div>
            {/* BEGIN: Failed Notification Content */}
            <Notification
                id="failed-notification-content"
                className="flex hidden"
            >
                <Lucide icon="XCircle" className="text-danger"/>
                <div className="ml-4 mr-4">
                    <div className="font-medium">Editing failed!</div>
                    <div className="mt-1 text-slate-500">
                        Please check the filled form.
                    </div>
                </div>
            </Notification>
            {/* END: Failed Notification Content */}
        </>
    )
}

export default main;
