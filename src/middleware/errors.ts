import { Router } from "express";

const router = Router();

router.use((req, res, next) => {
  res.status(404).send("Not Found");
});