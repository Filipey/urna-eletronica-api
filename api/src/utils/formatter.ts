// 10800000 is America/Sao Paulo timezone converted to milliseconds
export function formatDate(ephocDate: number): string {
  const date = new Date(ephocDate - 10800000);

  const day = date.getDay() < 10 ? `0${date.getDay()}` : date.getDay();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  const seconds =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

  return `${day}/${month}/${year} às ${hours}:${minutes}:${seconds}`;
}

export function formatCpf(cpf: string): string {
  cpf = cpf.replace(/[^\d]/g, "");

  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
