export type UserRole = 'NURSE' | 'DOCTOR' | 'ADMIN';

export type BabyStatus = 'STABLE' | 'CRITICAL' | 'IMPROVING';

export type AlertType = 'LOW_TEMP' | 'HIGH_TEMP' | 'LOW_WEIGHT' | 'HIGH_WEIGHT' | 'OTHER';

export type AlertStatus = 'ACTIVE' | 'RESOLVED';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Parent {
  id: number;
  name: string;
  phoneNumber: string;
  language: string;
}

export interface Baby {
  id: number;
  name: string;
  gender: 'Male' | 'Female';
  birthWeight: number;
  gestationalAge: number;
  diagnosis: string;
  status: BabyStatus;
  admissionDate: string;
  parentId: number;
  parent?: Parent;
}

export interface ShiftLog {
  id: number;
  babyId: number;
  nurseId: number;
  weight: number;
  temperature: number;
  feedingAmount: number;
  medications: string;
  notes: string;
  createdAt: string;
  baby?: Baby;
  nurse?: User;
}

export interface Alert {
  id: number;
  babyId: number;
  shiftLogId: number;
  type: AlertType;
  message: string;
  status: AlertStatus;
  createdAt: string;
  baby?: Baby;
  shiftLog?: ShiftLog;
}

export interface DischargeChecklist {
  id: number;
  babyId: number;
  stableTemperature: boolean;
  feedingWell: boolean;
  weightGain: boolean;
  noInfectionSigns: boolean;
  completedAt?: string;
}
