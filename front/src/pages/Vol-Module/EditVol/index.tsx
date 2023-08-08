import {FormInput, FormLabel} from "../../../base-components/Form";
import React, {useEffect, useState} from "react";
import Button from "../../../base-components/Button";
import volService from "../../../Services/VolService";
import Notification from "../../../base-components/Notification";
import Lucide from "../../../base-components/Lucide";
import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import clsx from "clsx";
import Toastify from "toastify-js";
import {useNavigate, useParams} from "react-router-dom";
import Litepicker from "../../../base-components/Litepicker";


function main() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [date, setDate] = useState('');


    useEffect(() => {
        volService.getById(id ?? '').then((res) => {
            if (res) {
                reset(res.data);
                setDate(getValues('date_vol'));
            }
        })

    }, [id]);


    const schema = yup
        .object({
            num_vol: yup.string().required('Flight number is required'),
            date_vol: yup.date().required('Date of flight is required'),
            origine: yup.string().required('Origin is required'),
            destination: yup.string().required('Destination is required'),
            nombre_passager: yup.number().required('Number of passengers is required'),
            h_depart: yup.string().required('Departure time is required'),
            h_arrive: yup.string().required('Arrival time is required'),
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
            let data : FieldValues=getValues();
            volService.updatevol(id ?? '', data).then((result: any) => {
                if (result) {
                    alert("vol updated successfully");
                    navigate("/vols");
                }
            }).catch((e) => {
                showNotification();
                setMessage(e.response.data.message);
                console.log(e);
                alert("an error occured");
            })
        }

    }

    const handleDateChange = (date: string) => {
        setValue("date_vol", new Date(date));
    }

    const restForm = () => {
        reset();
    }

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Add vol</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <span className={"text-danger"}>{message}</span>
                        <form className="validate-form" onSubmit={formSubmit}>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="num_vol"
                                           className="flex flex-col w-full sm:flex-row">Flight number
                                </FormLabel>
                                <FormInput
                                    {...register("num_vol")}
                                    id="num_vol"
                                    type="text"
                                    placeholder="Enter the flight number"

                                    className={"w-full " + clsx({"border-danger": errors.num_vol})}
                                />
                                {errors.num_vol && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.num_vol.message === "string" &&
                                            errors.num_vol.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="date_vol"
                                           className="flex flex-col w-full sm:flex-row">Flight Date
                                </FormLabel>
                                <Litepicker value={date} onChange={handleDateChange}

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
                                            className={"w-full" + clsx({"border-danger": errors.title})}/>

                                {errors.date_vol && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.date_vol.message === "string" &&
                                            errors.date_vol.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="origine"
                                           className="flex flex-col w-full sm:flex-row">Origine
                                </FormLabel>
                                <FormInput
                                    {...register("origine")}
                                    id="origine"
                                    type="text"
                                    placeholder="Enter the origine"
                                    className={"w-full " + clsx({"border-danger": errors.origine})}
                                />
                                {errors.origine && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.origine.message === "string" &&
                                            errors.origine.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="destination"
                                           className="flex flex-col w-full sm:flex-row">Destination
                                </FormLabel>
                                <FormInput
                                    {...register("destination")}
                                    id="destination"
                                    type="text"
                                    placeholder="Enter the destination"
                                    className={"w-full " + clsx({"border-danger": errors.destination})}
                                />
                                {errors.destination && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.destination.message === "string" &&
                                            errors.destination.message}
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="nombre_passager"
                                           className="flex flex-col w-full sm:flex-row">Number of passangers
                                </FormLabel>
                                <FormInput
                                    {...register("nombre_passager")}
                                    id="nombre_passager"
                                    type="text"
                                    placeholder="Enter the number of passanger"
                                    className={"w-full " + clsx({"border-danger": errors.nombre_passager})}
                                />
                                {errors.nombre_passager && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.nombre_passager.message === "string" &&
                                            errors.nombre_passager.message}
                                    </div>
                                )}
                            </div>


                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="h_depart"
                                           className="flex flex-col w-full sm:flex-row">Heure Départ
                                </FormLabel>
                                <FormInput
                                    {...register("h_depart")}
                                    id="h_depart"
                                    type={"time"}
                                    placeholder="Enter the departure time"
                                    className={"w-full " + clsx({"border-danger": errors.h_depart})}
                                />
                                {errors.h_depart && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.h_depart.message === "string" &&
                                            errors.h_depart.message}
                                    </div>
                                )}
                            </div>


                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="h_arrive"
                                           className="flex flex-col w-full sm:flex-row">Title
                                </FormLabel>
                                <FormInput
                                    {...register("h_arrive")}
                                    id="h_arrive"
                                    type="time"
                                    placeholder="Enter the arrival time"
                                    className={"w-full " + clsx({"border-danger": errors.h_arrive})}
                                />
                                {errors.h_arrive && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.h_arrive.message === "string" &&
                                            errors.h_arrive.message}
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
                    <div className="font-medium">Editing an article failed!</div>
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
