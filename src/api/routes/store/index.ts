import { Router } from "express";

import settingsRoutes from "./settings";

export function attachStoreRoutes(storeRouter: Router) {
    settingsRoutes(storeRouter);
}
