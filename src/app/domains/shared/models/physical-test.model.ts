export interface Profile {
  _id?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  full_name?: string;
  profile_picture?: string;
  date_of_birth?: string;
  gender?: string;
  cel_phone?: string;
  levelexp?: string;
  health_history?: string;
  associated_gym?: GymDTO;
  routines?: string[];
  boardId?: string[];
  userId?: userDTO;
}

export interface GymDTO {
  name: string;
  location: string;
}

export interface userDTO {
  username: string;
  email: string;
  _id: string;
}
