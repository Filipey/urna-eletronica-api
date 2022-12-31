import { Request, Router } from "express";
import { handle } from "../../middlewares/assert-error";
import { pdfService } from "../../utils/services";

const pdfRouter = Router();

pdfRouter.get(
  "/",
  async (req: Request<object, object, object, { cpf: string }>, res) => {
    const { cpf } = req.query;

    try {
      const stream = await pdfService.generateVoteConfirm(cpf);
      return res
        .writeHead(200, {
          "Content-Length": Buffer.byteLength(stream),
          "Content-Type": "application/pdf",
          "Content-disposition": "attachment;filename=test.pdf",
        })
        .end(stream);
    } catch (error) {
      handle(error, res);
    }
  }
);

export { pdfRouter };
