import { IStandardHeader } from './set/standard_header'
import { IStandardTrailer } from './set/standard_trailer'

/*
**************************************************************
* The new order message type is used by institutions wishing *
* to electronically submit securities and forex orders to a  *
* broker for execution.                                      *
**************************************************************
*/
export interface IOrderSingle {
  StandardHeader: IStandardHeader
  ClOrdID: string// 11
  ClientID?: string// 109
  ExecBroker?: string// 76
  Account?: string// 1
  SettlmntTyp?: string// 63
  FutSettDate?: string// 64
  HandlInst: string// 21
  ExecInst?: string// 18
  MinQty?: number// 110
  MaxFloor?: number// 111
  ExDestination?: string// 100
  ProcessCode?: string// 81
  Symbol: string// 55
  SymbolSfx?: string// 65
  SecurityID?: string// 48
  IDSource?: string// 22
  SecurityType?: string// 167
  MaturityMonthYear?: string// 200
  MaturityDay?: string// 205
  PutOrCall?: number// 201
  StrikePrice?: number// 202
  OptAttribute?: string// 206
  SecurityExchange?: string// 207
  Issuer?: string// 106
  SecurityDesc?: string// 107
  PrevClosePx?: number// 140
  Side: string// 54
  LocateReqd?: string// 114
  OrderQty?: number// 38
  CashOrderQty?: number// 152
  OrdType: string// 40
  Price?: number// 44
  StopPx?: number// 99
  Currency?: string// 15
  IOIid?: string// 23
  QuoteID?: string// 117
  TimeInForce?: string// 59
  ExpireTime?: string// 126
  Commission?: number// 12
  CommType?: string// 13
  Rule80A?: string// 47
  ForexReq?: string// 121
  SettlCurrency?: string// 120
  Text?: string// 58
  FutSettDate2?: string// 193
  OrderQty2?: number// 192
  OpenClose?: string// 77
  CoveredOrUncovered?: number// 203
  CustomerOrFirm?: number// 204
  MaxShow?: number// 210
  PegDifference?: number// 211
  StandardTrailer: IStandardTrailer
}
