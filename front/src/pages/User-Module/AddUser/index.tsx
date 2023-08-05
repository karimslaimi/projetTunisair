import {FormInput, FormLabel} from "../../../base-components/Form";
import TomSelect from "../../../base-components/TomSelect";
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


function main() {

    const schema = yup
        .object({
            username: yup.string().required().min(2),
            email: yup.string().required().email(),
            password: yup.string().required().min(6),
            role: yup.string().required()
        })
        .required();

    const {
        register,
        setValue,
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
            console.log(result);
            console.log(errors);
            const failedEl = document
                .querySelectorAll("#failed-notification-content")[0]
                .cloneNode(true) as HTMLElement;
            failedEl.classList.remove("hidden");
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
                username: username,
                email: email,
                password: password,
                role: role,
            };
            userService.addUser(data).then((result: any) => {
                console.log(result);
                if (result) {
                    alert("user added successfully")
                }
            }).catch((e) => {
                setMessage(e.response.data.message);
                console.log(e);
                alert("an error occured");
            })
        }

    }


    const [message, setMessage] = useState("");

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const restForm = () => {
        setEmail("");
        setUsername("");
        setRole("");
        setPassword("");
    }

    const handleRoleChange = (role: React.SetStateAction<string> | React.SetStateAction<string[]>) => {
        // @ts-ignore
        setRole(role);
        setValue("role", role);
    }


    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Add user</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <span className={"text-danger"}>{message}</span>
                        <form className="validate-form" onSubmit={formSubmit}>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="username"
                                           className="flex flex-col w-full sm:flex-row">Username
                                </FormLabel>
                                <FormInput
                                    {...register("username")}
                                    id="username"
                                    type="text"
                                    placeholder="Enter the username"
                                    onChange={e => setUsername(e.target.value)}
                                    value={username}
                                    className={"w-full " + clsx({"border-danger": errors.username})}
                                />
                                {errors.username && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.username.message === "string" &&
                                            errors.username.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="email"
                                           className="flex flex-col w-full sm:flex-row">Email</FormLabel>
                                <FormInput
                                    {...register("email")}
                                    id="email"
                                    type="email"
                                    placeholder="Enter the email"
                                    aria-describedby="input-group-2"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className={"w-full " + clsx({"border-danger": errors.email})}
                                />
                                {errors.email && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.email.message === "string" &&
                                            errors.email.message}
                                    </div>
                                )}
                            </div>
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
                                <FormLabel htmlFor="role" className="flex flex-col w-full sm:flex-row">Role</FormLabel>
                                <TomSelect
                                    id="role"
                                    value={role}
                                    onChange={e => handleRoleChange(e)}
                                    className={"w-full "}
                                >
                                    <option value="">Select a role</option>
                                    <option value="FINANCIER">Financier</option>
                                    <option value="CHEFESCALE">Chef d’escale</option>
                                    <option value="AGENT">Agent</option>
                                </TomSelect>
                                {errors.role && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.role.message === "string" &&
                                            errors.role.message}
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
                    <div className="font-medium">Registration failed!</div>
                    <div className="mt-1 text-slate-500">
                        Please check the fileld form.
                    </div>
                </div>
            </Notification>
            {/* END: Failed Notification Content */}
        </>
    )
}

export default main;
