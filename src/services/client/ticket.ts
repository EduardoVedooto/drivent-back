import TicketOption from "@/entities/TicketOption";

export async function getTicketOptions() {
  const ticketOption = await TicketOption.findAll();
  return ticketOption;
}
