type PathInfo = {
  join: (...str: string[]) => string;
  resolve: (...str: string[]) => string;
};

type TlsOptions = { root: string } & TlsType;

type TlsType = {
  ca: string;
  cert: string;
  key: string;
};

export function httpsOptions(
  { join, resolve }: PathInfo,
  { root, ca, cert, key }: TlsOptions,
): TlsType {
  const certificatesDir = resolve(root);
  return {
    ca: join(certificatesDir, ca),
    cert: join(certificatesDir, cert),
    key: join(certificatesDir, key),
  };
}

export const localHost = "localhost";
export const localPort = 3000;
export const localNetworkHttps = (path: PathInfo) =>
  httpsOptions(path, {
    root: "../~configurations/certificates",
    ca: "CA.cer",
    cert: "localhost.cer",
    key: "localhost.pvk",
  });
