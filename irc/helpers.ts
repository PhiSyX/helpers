export const isChan = (name: string) => /^#[^:]+$/.test(name);
export const isPrivateGroup = (name: string) => /^#:/.test(name);
export const isPrivate = (name: string) => isChan(name) && isPrivateGroup(name);

interface IrcNickAddress {
  ident: string;
  host: string;
  nick: string;
}

/**
 * @param {number} type @returns
 *    @type 0 -> "*!ident@hostname"
 *    @type 1 -> "*!*ident@hostname"
 *    @type 2 -> "*!*@hostname"
 *    @type 3 -> "*!*ident@*.hostname"
 *    @type 4 -> "*!*@*.hostname"
 *    @type 5 -> "nick!ident@hostname"
 *    @type 6 -> "nick!*ident@hostname"
 *    @type 7 -> "nick!*@hostname"
 *    @type 8 -> "nick!*ident@*.hostname"
 *    @type 9 -> "nick!*@*.hostname"
 */
export function $address(
  { nick, ident, host }: IrcNickAddress,
  type: number,
): string {
  let temp = nick + "!" + ident + "@" + host;

  switch (type) {
    case 0:
      temp = temp.replace(/([^!]+)!([~]*[^@]+)@/, "*!$2@");
      break;
    case 1:
      temp = temp.replace(/([^!]+)![~]*([^@]+)@/, "*!*$2@");
      break;
    case 2:
      temp = temp.replace(/([^!]+)![~]*([^@]+)@/, "*!*@");
      break;
    case 3:
      temp = temp
        .replace(/([^!]+)![~]*([^@]+)@/, "*!*$2@")
        .replace(/[@][^.]+(.*)/, "@*$1")
      ;
      break;
    case 4:
      temp = temp
        .replace(/([^!]+)![~]*([^@]+)@/, "*!*@")
        .replace(/[@][^.]+(.*)/, "@*$1")
      ;
      break;
    case 5:
      break;
    case 6:
      temp = temp.replace(/([^!]+)![~]*([^@]+)@/, "$1!*$2@");
      break;
    case 7:
      temp = temp.replace(/([^!]+)![~]*([^@]+)@/, "$1!*@");
      break;
    case 8:
      temp = temp
        .replace(/([^!]+)![~]*([^@]+)@/, "$1!*$2@")
        .replace(/@[^.]+(.*)/, "@*$1");
      break;
    case 9:
      temp = temp
        .replace(/([^!]+)![~]*([^@]+)@/, "$1!*@")
        .replace(/@[^.]+(.*)/, "@*$1")
      ;
      break;

    default:
      throw new Error(`[$address]: le type ${type} n'existe pas`);
  }

  return temp;
}
