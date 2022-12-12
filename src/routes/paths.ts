import { lazy } from "react";

export const Home = lazy(() =>
  import("../pages/Home").then((module) => ({
    default: module.Home,
  }))
);

export const Favorites = lazy(() =>
  import("../pages/Favorites").then((module) => ({
    default: module.Favorites,
  }))
);

export const AdminDashboard = lazy(() =>
  import("../pages/AdminDashboard").then((module) => ({
    default: module.AdminDashboard,
  }))
);

export const GenericNotFound = lazy(() =>
  import("../pages/GenericNotFound").then((module) => ({
    default: module.GenericNotFound,
  }))
);
