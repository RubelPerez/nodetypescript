import express from 'express';
import * as pdfController from '../controllers/pdf.controller';

const router = express.Router();

router.get("/moviePDF/:id", pdfController.moviePDFController)

export = router;
