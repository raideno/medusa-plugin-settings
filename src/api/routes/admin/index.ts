import { Router } from "express";

import settingsRoutes from "./settings";

export function attachAdminRoutes(adminRouter: Router) {
    settingsRoutes(adminRouter);
}
