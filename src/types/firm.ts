export interface Firm {
  id: number;
  name: string;
  license: License;
}

export interface License {
  type: LicenseType;
  start: Date;
  expiration: Date;
}

export enum LicenseType {
  Basic = "Basic",
  Micro = "Micro",
  Standard = "Standard",
}
