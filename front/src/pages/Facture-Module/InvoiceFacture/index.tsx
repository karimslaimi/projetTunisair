import {useEffect, useState} from "react";
import contratService from "../../../Services/ContratService";
import Button from "../../../base-components/Button";
import {DateTime} from "luxon";
import Table from "../../../base-components/Table";
import {useParams} from "react-router-dom";
import factureService from "../../../Services/FactureService";


function Main() {
    const {id} = useParams();
    const [facture, setFacture] = useState<any>();
    const [details, setDetails] = useState<any[]>([]);
    useEffect(() => {
        factureService.getById(id ?? '').then(x => {
            const details = x.data.details;
            setDetails(details)
            setFacture(x.data);

        }).catch(() => alert("an error occured"));
    }, [id]);

    return facture && details ? (
        <>

            {/* BEGIN: Invoice */}
            <div className=" overflow-hidden intro-y box">
                <div className="flex flex-col items-center mt-8 intro-y sm:flex-row no-print">
                    <h2 className="mr-auto text-lg font-medium"></h2>
                    <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
                        <Button variant="primary" className="mr-2 shadow-md" onClick={() => window.print()}>
                            Print
                        </Button>
                    </div>
                </div>
                <div className="text-center border-b border-slate-200/60 dark:border-darkmode-400 sm:text-left">
                    <div className="px-5 py-7 sm:px-20 sm:py-16">
                        <div className="text-3xl font-semibold text-primary">INVOICE</div>
                        <div className="mt-2">
                            Number:<span className="font-medium">#{facture.num_facture}</span>
                        </div>
                        <div className="mt-1">{DateTime.fromISO(facture.date_debut).toFormat('dd/MM/yyyy')} - {DateTime.fromISO(facture.date_fin).toFormat('dd/MM/yyyy')}</div>
                    </div>
                    <div className="flex flex-col px-5 pt-8 pb-8 lg:flex-row sm:px-20 sm:pb-16">
                        <div>
                            <div className="text-base text-slate-500">Supplier Details</div>
                            <div className="mt-2 text-lg font-medium text-primary">
                                {facture.fournisseur.title}
                            </div>
                            <div className="mt-1"> {facture.fournisseur.email}</div>

                        </div>
                        <div className="mt-10 lg:text-right lg:mt-0 lg:ml-auto">
                            <div className="text-base text-slate-500">Payment to</div>
                            <div className="mt-2 text-lg font-medium text-primary">
                                {facture.fournisseur.title}
                            </div>
                            <div className="mt-1">{facture.fournisseur.email}</div>
                        </div>
                    </div>
                </div>
                <div className="px-5 py-10 sm:px-16 sm:py-20">
                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th className="border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                                        DESCRIPTION
                                    </Table.Th>
                                    <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                                        Name
                                    </Table.Th>
                                    <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                                        PRICE
                                    </Table.Th>
                                    <Table.Th className="text-right border-b-2 dark:border-darkmode-400 whitespace-nowrap">
                                        Date
                                    </Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>


                                {details.map((detail) => (

                                    <Table.Tr>
                                        <Table.Td className="border-b dark:border-darkmode-400">
                                            <div className="font-medium whitespace-nowrap">
                                                {detail.numero}
                                            </div>
                                        </Table.Td>
                                        <Table.Td className="w-32 text-right border-b dark:border-darkmode-400">
                                            {detail.nom+"-"+detail.prenom}
                                        </Table.Td>
                                        <Table.Td className="w-32 text-right border-b dark:border-darkmode-400">
                                            {detail.price}
                                        </Table.Td>
                                        <Table.Td className="w-32 font-medium text-right border-b dark:border-darkmode-400">
                                            {DateTime.fromISO(detail.date).toFormat('dd/MM/yyyy')}
                                        </Table.Td>
                                    </Table.Tr>)
                                )}

                            </Table.Tbody>
                        </Table>
                    </div>
                </div>
                <div className="flex flex-col-reverse px-5 pb-8 sm:px-20 sm:pb-16 sm:flex-row">
                    <div className="mt-8 text-center sm:text-left sm:mt-0">
                        <div className="text-base text-slate-500">Bank Transfer</div>
                        <div className="mt-1 text-lg font-medium text-primary">
                            Tunisair
                        </div>

                    </div>
                    <div className="text-center sm:text-right sm:ml-auto">
                        <div className="text-base text-slate-500">Total Amount</div>
                        <div className="mt-2 text-xl font-medium text-primary">
                            {facture.total} tnd
                        </div>
                        <div className="mt-1">Taxes included</div>
                    </div>
                </div>
            </div>
            {/* END: Invoice */}
        </>
    ) : <></>;
}

export default Main;
