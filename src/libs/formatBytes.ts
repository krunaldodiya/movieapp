export default function formatBytes(bytes: number, decimals: number = 2) {
  if (bytes > 0) {
    var k = 1024,
      dm = decimals <= 0 ? 0 : decimals,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return "0 Bytes";
}
