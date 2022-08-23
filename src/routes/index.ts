import { Router } from "express";
import { startDatafetchingController } from "../controllers";

const router = Router();

router.post("/fetchData", startDatafetchingController);

export default router;
