import { EventInput } from "@fullcalendar/angular";

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: "All-day event",
    start: TODAY_STR,
    color: "#EF4444",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
