import { IStandardHeader } from './set/standard_header'
import { IParties } from './set/parties'
import { IInstrument } from './set/instrument'
import { IStandardTrailer } from './set/standard_trailer'

/*
****************************************************************
* The quote message is used as the response to a Quote Request *
* message in both indicative, tradeable, and restricted        *
* tradeable quoting markets.                                   *
****************************************************************
*/
export interface IQuote {
  StandardHeader: IStandardHeader
  QuoteReqID?: string// 131
  QuoteID: string// 117
  QuoteResponseLevel?: number// 301
  Parties?: IParties[]
  Account?: string// 1
  TradingSessionID?: string// 336
  Instrument: IInstrument
  BidPx?: number// 132
  OfferPx?: number// 133
  BidSize?: number// 134
  OfferSize?: number// 135
  ValidUntilTime?: Date// 62
  BidSpotRate?: number// 188
  OfferSpotRate?: number// 190
  BidForwardPoints?: number// 189
  OfferForwardPoints?: number// 191
  TransactTime?: Date// 60
  SettlmntTyp?: string// 63
  FutSettDate?: Date// 64
  OrdType?: string// 40
  FutSettDate2?: Date// 193
  OrderQty2?: number// 192
  Currency?: number// 15
  SettlCurrFxRateCalc?: string// 156
  Commission?: number// 12
  CommType?: string// 13
  ExDestination?: string// 100
  Text?: string// 58
  EncodedTextLen?: number// 354
  EncodedText?: Buffer// 355
  StandardTrailer: IStandardTrailer
}
