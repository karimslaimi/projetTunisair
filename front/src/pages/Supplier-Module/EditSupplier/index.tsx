import {FormInput, FormLabel} from "../../../base-components/Form";
import React, {useEffect, useState} from "react";
import Button from "../../../base-components/Button";
import Notification from "../../../base-components/Notification";
import Lucide from "../../../base-components/Lucide";
import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import Toastify from "toastify-js";
import {useNavigate, useParams} from "react-router-dom";
import supplierService from "../../../Services/SupplierService";


function main() {
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        supplierService.getById(id ?? '').then((res) => {
            if (res) {
                reset(res.data);
            }
        })

    }, [id]);
    const schema = yup
        .object({
            title: yup.string().required().min(2),
            email: yup.string().email().required(),
        })
        .required();

    const {
        register, trigger, formState: {errors},
        reset, getValues, setValue

    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const showNotification = () => {
        const failedEl = document
            .querySelectorAll("#failed-notification-content")[0]
            .cloneNode(true) as HTMLElement;
        failedEl.classList.remove("hidden");
        return failedEl;
    }
    const formSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await trigger();

        if (!result) {
            console.log(result);
            console.log(errors);
            let failedEl = showNotification();
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
            let data : FieldValues=getValues();
            supplierService.updateSupplier(id??'',data).then((result: any) => {
                if (result) {
                    alert("Supplier updated successfully");
                    navigate("/supplier");
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
    const restForm = () => {
        reset();
    }


    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Add article</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <span className={"text-danger"}>{message}</span>
                        <form className="validate-form" onSubmit={formSubmit}>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="title"
                                           className="flex flex-col w-full sm:flex-row">Title
                                </FormLabel>
                                <FormInput
                                    {...register("title")}
                                    id="title"
                                    type="text"
                                    placeholder="Enter the supplier name"
                                    onChange={e => setValue("title",e.target.value)}
                                    className={"w-full " + clsx({"border-danger": errors.title})}
                                />
                                {errors.title && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.title.message === "string" &&
                                            errors.title.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="email"
                                           className="flex flex-col w-full sm:flex-row">Email
                                </FormLabel>
                                <FormInput
                                    {...register("email")}
                                    id="email"
                                    type="text"
                                    placeholder="Enter the supplier email"
                                    onChange={e => setValue("email",e.target.value)}
                                    className={"w-full " + clsx({"border-danger": errors.title})}
                                />
                                {errors.email && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.email.message === "string" &&
                                            errors.email.message}
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
                    <div className="font-medium">Adding an article failed!</div>
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
