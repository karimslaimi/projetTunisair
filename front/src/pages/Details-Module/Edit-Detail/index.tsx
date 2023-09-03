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
import Litepicker from "../../../base-components/Litepicker";
import detailsService from "../../../Services/DetailsService";

function main() {
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        detailsService.getById(id??'').then(x=>reset(x.data)).catch(()=>alert("an error occured"));
    }, [id]);

    const schema = yup
        .object({
            numero: yup.string().required().min(2),
            nom: yup.string().required(),
            prenom: yup.string().required(),
            price: yup.number().required(),
            date: yup.date().required(),
            facture: yup.string().default(id),
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
            let data: FieldValues = getValues();
            detailsService.updateDetail(id??'',data).then((result: any) => {
                console.log(result);
                if (result) {
                    alert("Detail updated successfully");
                    navigate("/invoices/details/"+getValues("facture"));
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
    const handleDDateChange = (date: string) => {
        setValue("date", date);
    }

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Edit Detail</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <span className={"text-danger"}>{message}</span>
                        <form className="validate-form" onSubmit={formSubmit}>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="number"
                                           className="flex flex-col w-full sm:flex-row">Number
                                </FormLabel>
                                <FormInput
                                    {...register("numero")}
                                    id="number"
                                    type="text"
                                    placeholder="Enter the number"
                                    className={"w-full " + clsx({"border-danger": errors.numero})}
                                />
                                {errors.numero && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.numero.message === "string" &&
                                            errors.numero.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="prenom"
                                           className="flex flex-col w-full sm:flex-row">First Name
                                </FormLabel>
                                <FormInput
                                    {...register("prenom")}
                                    id="prenom"
                                    type="text"
                                    placeholder="Enter the first name"
                                    className={"w-full " + clsx({"border-danger": errors.prenom})}
                                />
                                {errors.prenom && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.prenom.message === "string" &&
                                            errors.prenom.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="nom"
                                           className="flex flex-col w-full sm:flex-row">Last Name
                                </FormLabel>
                                <FormInput
                                    {...register("nom")}
                                    id="nom"
                                    type="text"
                                    placeholder="Enter the last name"
                                    className={"w-full " + clsx({"border-danger": errors.nom})}
                                />
                                {errors.nom && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.nom.message === "string" &&
                                            errors.nom.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="date"
                                           className="flex flex-col w-full sm:flex-row">Date
                                </FormLabel>
                                <Litepicker value={getValues("date")} onChange={handleDDateChange}

                                            options={{
                                                autoApply: false,
                                                showWeekNumbers: true,
                                                dropdowns: {
                                                    minYear: 1990,
                                                    maxYear: null,
                                                    months: true,
                                                    years: true,
                                                },
                                            }}
                                            className={"w-full" + clsx({"border-danger": errors.date})}/>
                                {errors.date && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.date.message === "string" &&
                                            errors.date.message}
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="price"
                                           className="flex flex-col w-full sm:flex-row">Price
                                </FormLabel>
                                <FormInput
                                    {...register("price")}
                                    id="price"
                                    type="number"
                                    placeholder="Enter the price"
                                    className={"w-full " + clsx({"border-danger": errors.price})}
                                />
                                {errors.price && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.price.message === "string" &&
                                            errors.price.message}
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
                    <div className="font-medium">Updating a detail failed!</div>
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
