import {Navigate, useRoutes} from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import {useSelector} from "react-redux";
import Login from "../pages/Login";
import Users from "../pages/User-Module/Users";
import AddUser from "../pages/User-Module/AddUser";
import EditUser from "../pages/User-Module/EditUser";
import Dashboard from "../pages/Dashboard";
import Articles from "../pages/Article-Module/Articles";
import AddArticle from "../pages/Article-Module/AddArticle";
import EditArticle from "../pages/Article-Module/EditArticle";
import Vols from "../pages/Vol-Module/Vols";
import Retard from "../pages/Vol-Module/Retard";
import Contrats from "../pages/Contrat-Module/Contrats";
import AddContrat from "../pages/Contrat-Module/AddContrat";
import EditContrat from "../pages/Contrat-Module/EditContrat";
import Suppliers from "../pages/Supplier-Module/Suppliers";
import AddSupplier from "../pages/Supplier-Module/AddSupplier";
import EditSupplier from "../pages/Supplier-Module/EditSupplier";
import Vouchers from "../pages/Voucher-Module/Vouchers";
import AddVoucher from "../pages/Voucher-Module/AddVoucher";
import EditVoucher from "../pages/Voucher-Module/EditVoucher";
import VerifyVoucher from "../pages/Voucher-Module/VerifyVoucher";
import Invoice from "../pages/Contrat-Module/Invoice";
import Passengers from "../pages/Vol-Module/Passengers";
import VoucherDetail from "../pages/Voucher-Module/VoucherDetail";
import Factures from "../pages/Facture-Module/Factures";
import AddFacture from "../pages/Facture-Module/Add-Facture";
import EditFacture from "../pages/Facture-Module/Edit-Facture";
import Details from "../pages/Details-Module/Details";
import AddDetail from "../pages/Details-Module/Add-Detail";
import EditDetail from "../pages/Details-Module/Edit-Detail";
import InvoiceFacture from "../pages/Facture-Module/InvoiceFacture";


function Router() {
    const isLoggedIn = useSelector((state: any) => state.userData.isAuthenticated);
    const routes = [
        {

            path: "/login",
            element: <Login/>
        },
        {
            path: "/",
            element: isLoggedIn ? <SideMenu/> : <Navigate to="/login"/>,
            children: [
                {
                    path: "/admin",
                    element: <Dashboard/>,
                },
                //region user
                {
                    path: "/users",
                    element: <Users/>,
                },
                {
                    path: "/users/add",
                    element: <AddUser/>,
                },
                {
                    path: "/users/edit/:id",
                    element: <EditUser/>
                },
                //endregion
                //region fournisseur
                {
                    path: "/supplier",
                    element: <Suppliers/>
                },
                {
                    path: "/supplier/add",
                    element: <AddSupplier/>
                },
                {
                    path: "/supplier/edit/:id",
                    element: <EditSupplier/>
                },
                //endregion
                //region Article
                {
                    path: "/articles",
                    element: <Articles/>
                },
                {
                    path: "/articles/add",
                    element: <AddArticle/>
                },
                {
                    path: "/articles/edit/:id",
                    element: <EditArticle/>
                },
                //endregion
                //region Vols
                {
                    path: "/vols",
                    element: <Vols/>
                },
                {
                    path: "/vols/passengers/:id",
                    element: <Passengers/>
                },
                //endregion
                //region retard
                {
                    path: "/retards",
                    element: <Retard/>
                },
                //endregion
                //region contrat
                {
                    path: "/contract",
                    element: <Contrats/>
                },
                {
                    path: "/contract/add",
                    element: <AddContrat/>
                },
                {
                    path: "/contract/edit/:id",
                    element: <EditContrat/>
                },
                //endregion
                //region voucher
                {
                    path: "/voucher/:id",
                    element: <Vouchers/>
                },
                {
                    path: "/voucher/:idDelay/add",
                    element: <AddVoucher/>
                },
                {
                    path: "/voucher/:idDelay/edit/:id",
                    element: <EditVoucher/>
                },
                //endregion

                //region facture
                {
                    path: "/invoices",
                    element: <Factures/>
                },
                {
                    path: "/invoices/add",
                    element: <AddFacture/>
                },
                {
                    path: "/invoices/edit/:id",
                    element: <EditFacture/>
                },

                //endregion

                //region details
                {
                    path: "/invoices/details/:id",
                    element: <Details/>
                },
                {
                    path: "/invoices/details/:id/add",
                    element: <AddDetail/>
                },
                {
                    path: "/invoices/details/edit/:id",
                    element: <EditDetail/>
                },

                //endregion

            ]
        },
        {
            path: "/voucher/detail/:id",
            element: <VoucherDetail/>
        },
        {
            path: "/voucher/verify/:id",
            element: <VerifyVoucher/>
        },
        {
            path: "/contract/invoice/:id",
            element: <Invoice/>
        },
        {
            path: "/invoices/detail/:id",
            element: <InvoiceFacture/>
        },


    ];

    return useRoutes(routes);
}


export default Router;
