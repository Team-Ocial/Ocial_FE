export interface HistoryItem {
  id: string;
  content: string;
  date?: string;
}

export interface HistoryYear {
  year: string;
  items: HistoryItem[];
}

export interface HistorySection {
  bigYear: string;
  years: HistoryYear[];
}

export interface HistoryData {
  sections: HistorySection[];
}
