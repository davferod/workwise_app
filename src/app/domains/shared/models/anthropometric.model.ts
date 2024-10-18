export interface Anthropometric {
  _id?: string;
  date?: Date;
  height?: number;
  weight?: number;
  bodyMassIndex?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  legCircumference?: number;
  armCircumference?: number;
  userId?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

