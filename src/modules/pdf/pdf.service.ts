import { Person, PrismaClient, Vote } from "@prisma/client";
import getStream from "get-stream";
import PDFDocument from "pdfkit";
import { formatCpf, formatDate } from "../../utils/formatter";

type PdfMetadata = {
  person: Person;
  personVotes: Vote[];
  personPicture: string | ArrayBuffer;
  timestamp: string;
};

export class PdfService {
  constructor(private readonly db: PrismaClient) {}

  async generateVoteConfirm(personCpf: string): Promise<Buffer> {
    const metaData = await this.getPdfMetadata(personCpf);

    const doc = new PDFDocument();
    this.drawHeader(doc);
    this.drawContent(doc, metaData);

    doc.end();

    const stream = await getStream.buffer(doc);

    return stream;
  }

  private async getPdfMetadata(personCpf: string): Promise<PdfMetadata> {
    const person = await this.db.person.findUniqueOrThrow({
      where: {
        cpf: personCpf,
      },
    });

    const personVotes = await this.db.person.findUniqueOrThrow({
      where: {
        cpf: personCpf,
      },
      select: {
        votes: true,
      },
    });

    const personPicture = person.picture
      ? await this.fetchImage(person.picture)
      : "No Image provided";

    const timestamp = formatDate(new Date());

    return { person, personPicture, timestamp, personVotes: personVotes.votes };
  }

  private async fetchImage(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    const image = await response.arrayBuffer();

    return image;
  }

  private drawHeader(doc: PDFKit.PDFDocument): void {
    doc
      .font("Times-Roman")
      .fontSize(20)
      .text("Urna Eletrônica API - 1.0.0", 160, 100)
      .fontSize(16)
      .text("Comprovante gerado automaticamente", 150, 120);
  }

  private drawContent(doc: PDFKit.PDFDocument, metaData: PdfMetadata): void {
    const voteHour = formatDate(
      new Date(metaData.personVotes.slice(-1)[0].timestamp * 1000)
    );

    doc
      .fontSize(14)
      .text(`Documento gerado em: ${metaData.timestamp}`, 100, 160)
      .rect(100, 180, 365, 250)
      .stroke("#000")
      .image(metaData.personPicture, 100, 180, {
        width: 100,
        height: 100,
      })
      .fontSize(20)
      .fillColor("red")
      .text("Comprovante de Voto", 240, 200)
      .fontSize(14)
      .fillColor("black")
      .text(metaData.person.name, 240, 220)
      .text(`Nome Completo: ${metaData.person.name}`, 100, 290)
      .text(`CPF: ${formatCpf(metaData.person.cpf)}`)
      .text(`UF: ${metaData.person.uf}`)
      .text(`Votos contabilizados em: ${voteHour}`);
  }
}
