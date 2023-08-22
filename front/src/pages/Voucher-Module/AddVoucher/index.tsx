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
import contratService from "../../../Services/ContratService";

function main() {
    const {idDelay} = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const [contrat, setContrat] = useState<any>();
    const [volId, setVolId] = useState<string>();
    const [supplier, setSupplier] = useState<string>();
    useEffect(() => {

        contratService.getByRetard(idDelay ?? '').then(x => {
            setSupplier(x.data.fournisseur.title);
            setContrat(x.data);
            setValue("prix",x.data.prix_menu);
            setValue("fournisseur",x.data.fournisseur.title);
        }).catch(() => alert("an error occured"));
        retardService.getById(idDelay ?? '').then(x => {
            if (x) {
                setVolId(x.data.vol.num_vol);
                setValue("vol", x.data.vol.num_vol);
            }
        }).catch(() => alert("an error occured"));

    }, []);

    const schema = yup
        .object({
            nom: yup.string().required("Last Name is required"),
            prenom: yup.string().required("First Name is required"),
            vol: yup.string().default(volId),
            fournisseur: yup.string().default(supplier),
            prix: yup.number().default(contrat?.prix_menu),
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
                setMessage(e.response.data.error);
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
                                <FormInput disabled
                                           id={"vol"}
                                           value={volId}
                                           onChange={(e) => setValue("vol", e)}
                                           placeholder="Select the flight"
                                           className={"w-full " + clsx({"border-danger": errors.vol})}
                                />
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
                                <FormInput
                                    disabled
                                    id={"fournisseur"}
                                    value={supplier}
                                    onChange={(e) => setValue("fournisseur", e)}
                                    placeholder="Select the supplier"
                                    className={"w-full " + clsx({"border-danger": errors.fournisseur})}
                                />
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
                                <FormInput disabled
                                    value={contrat?.prix_menu}
                                    onChange={(e) => setValue("prix", e)}
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
                    <div className="font-medium">Adding a voucher failed!</div>
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
