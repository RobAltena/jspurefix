import { AsciiParser, FiXmlParser, MsgParser, AsciiChars } from '../buffer'
import { AsciiMsgTransmitter } from './ascii'
import { MsgTransmitter } from './msg-transmitter'
import { FixmlMsgTransmitter } from './fixml'
import { FixDuplex } from './duplex'
import { IJsFixConfig } from '../config'

export class MsgTransport {
  public readonly transmitter: MsgTransmitter
  public readonly receiver: MsgParser

  constructor (public readonly id: number,
               public readonly config: IJsFixConfig,
               public readonly duplex: FixDuplex) {

    const delimiter = config.delimiter
    if (!delimiter) {
      throw new Error(`no delimiter char given.`)
    }
    const description = config.description
    const definitions = config.definitions
    const protocol = description.application.protocol
    switch (protocol) {
      case 'ascii': {
        // let parser replace delimiter with Pipe so fix log does not require
        // expensive replace
        this.transmitter = new AsciiMsgTransmitter(config)
        this.receiver = new AsciiParser(definitions, duplex.readable, delimiter, AsciiChars.Pipe)
        break
      }

      case 'fixml': {
        this.transmitter = new FixmlMsgTransmitter(config)
        this.receiver = new FiXmlParser(config, duplex.readable)
        break
      }

      default: {
        throw new Error(`session Protocol must ascii or fixml. got ${protocol}`)
      }
    }

    // pipe the encoder to say a socket.
    if (duplex.writable) {
      this.transmitter.encodeStream.pipe(duplex.writable)
    }
  }

  public end (): void {
    this.duplex.end()
  }

  public wait (): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.receiver.on('end', () => {
        resolve()
      })
      this.receiver.on('error', (e) => {
        reject(e)
      })
      this.transmitter.on('error', (e) => {
        reject(e)
      })
    })
  }
}
