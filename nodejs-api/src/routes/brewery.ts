import isAuth from "../middleware/is-auth";
import { getBreweries } from "../controllers/brewery";
import { Router } from "express";

const router = Router();

router.get("/", isAuth, getBreweries);

export default router;
