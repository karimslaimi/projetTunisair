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
import TomSelect from "../../../base-components/TomSelect";
import volService from "../../../Services/VolService";
import supplierService from "../../../Services/SupplierService";
import voucherService from "../../../Services/VoucherService";
import retardService from "../../../Services/RetardService";

function main() {
    const {idDelay} = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [vols, setVols] = useState<any[]>([]);
    const [suppliers, setSuppliers] = useState<any[]>([]);
    const [retard, setRetard] = useState<any>();
    const [volId, setVolId] = useState<string>();
    useEffect(() => {
        volService.volList().then(x => setVols(x))
            .catch((error) => {
                alert("an error occured");
                console.log(error)
            });
        supplierService.supplierList().then(x => setSuppliers(x)).catch(err => alert("an error occured"));
        retardService.getById(idDelay ?? '').then(x => {
            if (x) {
                setRetard(x.data);
                setVolId(x.data.vol.num_vol);
                setValue("vol",x.data.vol.num_vol);
            }
        }).catch(() => alert("an error occured"));

    }, []);

    const schema = yup
        .object({
            nom: yup.string().required("Last Name is required"),
            prenom: yup.string().required("First Name is required"),
            vol: yup.string().default(volId),
            fournisseur: yup.string().required("Supplier"),
            prix: yup.number().required("Price is required"),
            retard: yup.string().default(idDelay),
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
        debugger;
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
            setValue("retard", idDelay);
            let data: FieldValues = getValues();

            voucherService.createVoucher(data).then((result: any) => {
                if (result) {
                    alert("Voucher added successfully");
                    navigate(`/voucher/${idDelay}`);
                }
            }).catch((e) => {
                showNotification();
                setMessage(e.response.data.message);
                console.log(e);
                alert("an error occured");
            })
        }

    }


    const restForm = () => {
        reset();
    }

    return (
        <>
            <div className="flex items-center mt-8 intro-y">
                <h2 className="mr-auto text-lg font-medium">Add Voucher</h2>
            </div>
            <div className="grid grid-cols-12 gap-2 mt-5">
                <div className="col-span-12 intro-y lg:col-span-6">
                    {/* BEGIN: Form Layout */}
                    <div className="p-5 intro-y box">
                        <span className={"text-danger"}>{message}</span>
                        <form className="validate-form" onSubmit={formSubmit}>
                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="prenom"
                                           className="flex flex-col w-full sm:flex-row">First Name
                                </FormLabel>
                                <FormInput
                                    {...register("prenom")}
                                    id="prenom"
                                    type="text"
                                    placeholder="Enter the First name"

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
                                <FormLabel htmlFor="vol"
                                           className="flex flex-col w-full sm:flex-row">Flight
                                </FormLabel>
                                <TomSelect disabled
                                    id={"vol"}
                                    value={volId}
                                    onChange={(e) => setValue("vol", e)}
                                    placeholder="Select the flight"
                                    className={"w-full " + clsx({"border-danger": errors.vol})}
                                >
                                    <option>Select Flight</option>
                                    {vols.map(option => {
                                        return (
                                            < option
                                                key={option.num_vol}
                                                value={option.num_vol}>
                                                {option.num_vol}
                                            </option>
                                        )
                                    })}
                                </TomSelect>
                                {errors.vol && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.vol.message === "string" &&
                                            errors.vol.message}
                                    </div>
                                )}
                            </div>


                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="fournisseur"
                                           className="flex flex-col w-full sm:flex-row">Supplier
                                </FormLabel>
                                <TomSelect
                                    id={"fournisseur"}
                                    value={getValues("fournisseur")}
                                    onChange={(e) => setValue("fournisseur", e)}
                                    placeholder="Select the flight"
                                    className={"w-full " + clsx({"border-danger": errors.fournisseur})}
                                >
                                    <option>Select Suppliers</option>
                                    {suppliers.map(option => {
                                        return (
                                            < option
                                                key={option.title}
                                                value={option.title}>
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

                            <div className="mt-3 input-form">
                                <FormLabel htmlFor="price"
                                           className="flex flex-col w-full sm:flex-row">Price
                                </FormLabel>
                                <FormInput
                                    {...register("prix")}
                                    id="price"
                                    type="number"
                                    placeholder="Enter the price"
                                    className={"w-full " + clsx({"border-danger": errors.prix})}
                                />
                                {errors.prix && (
                                    <div className="mt-2 text-danger">
                                        {typeof errors.prix.message === "string" &&
                                            errors.prix.message}
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
