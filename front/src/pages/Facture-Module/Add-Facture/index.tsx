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
import {useNavigate} from "react-router-dom";
import Litepicker from "../../../base-components/Litepicker";
import TomSelect from "../../../base-components/TomSelect";
import supplierService from "../../../Services/SupplierService";
import factureService from "../../../Services/FactureService";

function main() {
    const navigate = useNavigate();

    let [suppliers, setSuppliers] = useState<any[]>([]);
    useEffect(() => {
        supplierService.supplierList().then(x => setSuppliers(x)).catch(err => alert("an error occured"));
    }, []);


    const schema = yup
        .object({
            num_facture: yup.string().required().min(2),
            qte: yup.number().required(),
            total: yup.number().required(),
            date_debut: yup.date().required(),
            date_fin: yup.date().required(),
            fournisseur: yup.string().required(),
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
            factureService.addFacture(data).then((result: any) => {
                console.log(result);
                if (result) {
                    alert("Invoice added successfully");
                    navigate("/invoices");
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
        setValue("date_debut", date);
    }
    const handleFDateChange = (date: string) => {
        setValue("date_fin", date);
    }

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Add Invoice</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <span className={"text-danger"}>{message}</span>
                        <form className="validate-form" onSubmit={formSubmit}>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="title"
                                           className="flex flex-col w-full sm:flex-row">Invoice Number
                                </FormLabel>
                                <FormInput
                                    {...register("num_facture")}
                                    id="title"
                                    type="text"
                                    placeholder="Enter the invoice number"
                                    className={"w-full " + clsx({"border-danger": errors.num_facture})}
                                />
                                {errors.num_facture && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.num_facture.message === "string" &&
                                            errors.num_facture.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="menu"
                                           className="flex flex-col w-full sm:flex-row">Quantity
                                </FormLabel>
                                <FormInput
                                    {...register("qte")}
                                    id="menu"
                                    type="number"
                                    placeholder="Enter the quantity"
                                    className={"w-full " + clsx({"border-danger": errors.qte})}
                                />
                                {errors.qte && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.qte.message === "string" &&
                                            errors.qte.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="price"
                                           className="flex flex-col w-full sm:flex-row">Price
                                </FormLabel>
                                <FormInput
                                    {...register("total")}
                                    id="price"
                                    type="number"
                                    placeholder="Enter the price"
                                    className={"w-full " + clsx({"border-danger": errors.total})}
                                />
                                {errors.total && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.total.message === "string" &&
                                            errors.total.message}
                                    </div>
                                )}
                            </div>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="date_debut"
                                           className="flex flex-col w-full sm:flex-row">Starting date
                                </FormLabel>
                                <Litepicker value={getValues("date_debut")} onChange={handleDDateChange}

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
                                            className={"w-full" + clsx({"border-danger": errors.date_debut})}/>
                                {errors.date_debut && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.date_debut.message === "string" &&
                                            errors.date_debut.message}
                                    </div>
                                )}
                            </div>

                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="date_fin"
                                           className="flex flex-col w-full sm:flex-row">Ending date
                                </FormLabel>
                                <Litepicker value={getValues("date_fin")} onChange={handleFDateChange}

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
                                            className={"w-full" + clsx({"border-danger": errors.date_fin})}/>
                                {errors.date_fin && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.date_fin.message === "string" &&
                                            errors.date_fin.message}
                                    </div>
                                )}
                            </div>


                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="supplier"
                                           className="flex flex-col w-full sm:flex-row">Supplier
                                </FormLabel>
                                <TomSelect
                                    value={getValues("fournisseur")}
                                    onChange={(e) => setValue("fournisseur", e)}
                                    placeholder="Select the supplier"
                                    className={"w-full " + clsx({"border-danger": errors.fournisseur})}
                                >
                                    <option>Select supplier</option>
                                    {suppliers.map(option => {
                                        return (
                                            < option
                                                key={option._id}
                                                value={option._id}>
                                                {option.title}
                                            </option>
                                        )
                                    })}
                                </TomSelect>
                                {errors.fournisseur && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.fournisseur.message === "string" &&
                                            errors.fournisseur.message}
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
                    <div className="font-medium">Adding an invoice failed!</div>
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
