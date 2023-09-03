import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {icons} from "../base-components/Lucide";

export interface Menu {
    id: number;
    icon: keyof typeof icons;
    title: string;
    pathname?: string;
    subMenu?: Menu[];
    ignore?: boolean;
    role?: string;
}

export interface SideMenuState {
    menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
    menu: [
        {
            id:0,
            icon: "Activity",
            pathname: "/admin",
            title: "Dashboard",
            role: "ADMIN"
        },
        {
            id:1,
            icon: "Users",
            pathname: "/users",
            title: "Users",
            role: "ADMIN"
        },
        {
            id:2,
            icon: "Box",
            pathname: "/supplier",
            title: "Supplier",
            role: "ADMIN"
        },
        {
            id:3,
            icon: "Menu",
            pathname: "/articles",
            title: "Articles",
            role: "ADMIN"
        },
        {
            id:4,
            icon: "FileText",
            pathname: "/contract",
            title: "Contracts",
            role: "ADMIN,FINANCIER"
        },
        {
            id:5,
            icon: "Plane",
            pathname: "/vols",
            title: "Vols",
            role: "ADMIN,CHEFESCALE",

        },
        {
            id:6,
            icon: "AlarmMinus",
            pathname: "/retards",
            title: "Delays",
            role: "ADMIN,CHEFESCALE,AGENT"
        },
        {
            id: 7,
            icon: "FileBadge",
            pathname: "/invoices",
            title: "Invoices",
            role: "FINANCIER"
        }
    ],
};

export const sideMenuSlice = createSlice({
    name: "sideMenu",
    initialState,
    reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
