export interface Exercise {
  // timestamp: any;
  id: string;
  name: string;
  duration?: number;
  calories?: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}
