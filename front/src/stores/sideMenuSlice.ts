import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";
import {icons} from "../base-components/Lucide";

export interface Menu {
    icon: keyof typeof icons;
    title: string;
    pathname?: string;
    subMenu?: Menu[];
    ignore?: boolean;
}

export interface SideMenuState {
    role: string;
    menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
    role: "admin",
    menu: [
        {
            icon: "Activity",
            pathname: "/admin",
            title: "Dashboard",
        },
        {
            icon: "Users",
            pathname: "/users",
            title: "Users",
        },
        {
            icon: "Menu",
            pathname: "/articles",
            title: "Articles",
        },
        {
            icon: "FileText",
            pathname: "/contract",
            title: "Contracts",
        },
        {
            icon: "Plane",
            pathname: "/vols",
            title: "Vols",
        },
        {
            icon: "AlarmMinus",
            pathname: "/retards",
            title: "Delays",
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
