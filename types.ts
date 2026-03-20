export enum PlayerStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
  IN_MATCH = 'IN_MATCH',
  SUSPICIOUS = 'SUSPICIOUS',
  BANNED = 'BANNED'
}

export interface Player {
  id: string;
  name: string;
  uid: string;
  hwid: string;
  ping: number;
  status: PlayerStatus;
  kdRatio: number;
  headshotRate: number;
  reports: number;
  lastScreenshotUrl?: string;
  logs: string[];
}

export interface Tournament {
  id: string;
  name: string;
  date: string;
  time: string;
  maxPlayers: number;
  prizePool: string;
  status: 'UPCOMING' | 'LIVE' | 'ENDED';
  players: Player[];
}

export enum GameMode {
  SOLO = 'SOLO',
  DUO = 'DUO',
  SQUAD = 'SQUAD'
}

export enum MapType {
  BERMUDA = 'BERMUDA',
  PURGATORY = 'PURGATORY',
  KALAHARI = 'KALAHARI',
  ALPINE = 'ALPINE'
}