import { DateTime } from "luxon";

export interface post {
  id: string;
  title: string;
  created: string;
}

export const today: post = {
  id: "1",
  title: "Today",
  created: DateTime.now().toISO(),
};

export const thisWeek: post = {
  id: "2",
  title: "This Week",
  created: DateTime.now().minus({ days: 5 }).toISO(),
};

export const thisMonth: post = {
  id: "3",
  title: "This Month",
  created: DateTime.now().minus({ week: 3 }).toISO(),
};
