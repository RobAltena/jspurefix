import { FixDefinitions, ContainedSimpleField } from '../dictionary'
import { TagPos } from './tag-pos'
import { MsgTag } from '../types/enum'

export enum TagType {
    String = 1,
    Int = 2,
    Float = 3,
    Boolean = 4,
    UtcTimestamp = 5,
    UtcDateOnly = 6,
    UtcTimeOnly = 7,
    LocalDate = 8,
    RawData = 9,
    Length = 10,
    Unknown = 11
}

export class Tags {
  public static readonly BeginString: number = MsgTag.BeginString
  public static readonly BodyLengthTag: number = MsgTag.BodyLength
  public static readonly CheckSumTag: number = MsgTag.CheckSum
  public static readonly MsgTag: number = MsgTag.MsgType

  public tagPos: TagPos[] = new Array(this.startingLength)
  public nextTagPos: number = 0

  constructor (public readonly definitions: FixDefinitions, public readonly startingLength: number = 30 * 1000) {
  }

  public static toJSType (simple: ContainedSimpleField): string {
    switch (simple.definition.tagType) {
      case TagType.String:
        return 'string'

      case TagType.Int:
      case TagType.Float:
      case TagType.Length:
        return 'number'

      case TagType.RawData:
        return 'Buffer'

      case TagType.Boolean:
        return 'boolean'

      case TagType.UtcTimestamp:
      case TagType.UtcDateOnly:
      case TagType.UtcTimeOnly:
      case TagType.LocalDate:
        return 'Date'

      default:
        return 'string'
    }
  }

  public static toType (type: string): TagType {
    if (type === 'Currency') {
      type = 'string'
    }
    type = type || 'string'
    switch (type.toLowerCase()) {
      case 'string':
      case 'char': {
        return TagType.String
      }

      case 'int':
      case 'numingroup':
      case 'seqnum': {
        return TagType.Int
      }

      case 'currency':
      case 'qty':
      case 'percentage':
      case 'amt':
      case 'price':
      case 'priceoffset':
      case 'float': {
        return TagType.Float
      }

      case 'length': {
        return TagType.Length
      }

      case 'boolean': {
        return TagType.Boolean
      }

      case 'utctimestamp': {
        return TagType.UtcTimestamp
      }

      case 'localmktdate': {
        return TagType.LocalDate
      }

      case 'utcdateonly': {
        return TagType.UtcDateOnly
      }

      case 'utctimeonly': {
        return TagType.UtcTimeOnly
      }

      case 'data': {
        return TagType.RawData
      }

      default: {
        return TagType.String
      }
    }
  }

  public clone (): Tags {
    const next: number = this.nextTagPos
    const cloned: Tags = new Tags(this.definitions, next)
    cloned.nextTagPos = next
    for (let i = 0; i < next; ++i) {
      cloned.tagPos[i] = this.tagPos[i].clone()
    }
    return cloned
  }

  public reset (): void {
    this.nextTagPos = 0
  }

  public store (start: number, len: number, tag: number): void {
    const tagPtr: number = this.nextTagPos
    if (tagPtr === this.tagPos.length) {
      this.expand()
    }
    const tp: TagPos = this.tagPos[tagPtr]
    if (tp) {
      tp.assign(tagPtr, tag, start, len)
    } else {
      this.tagPos[tagPtr] = new TagPos(tagPtr, tag, start, len)
    }
    this.nextTagPos++
  }

  private expand (): void {
    const size = this.tagPos.length * 2
    const tagPos = new Array(size)
    for (let i = 0; i < this.tagPos.length; ++i) {
      tagPos[i] = this.tagPos[i]
    }
    this.tagPos = tagPos
  }
}
