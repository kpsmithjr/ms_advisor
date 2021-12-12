import GradCertType from "./gradCert";

type MsOptionsType = {
  //firstSem: string;
  msTrack: string;
  certs: GradCertType[];
  fullTime: boolean;
  eveningOnly: boolean;
  onlineOnly: boolean;
};

export default MsOptionsType;