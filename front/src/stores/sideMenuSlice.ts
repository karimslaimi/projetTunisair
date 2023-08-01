import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

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
      icon: "Activity",
      pathname: "/page-2",
      title: "Page 2",
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;