export function detectFileType(buffer) {
  const uint8Array = new Uint8Array(buffer);

  if (uint8Array.length >= 4) {
    const signature = uint8Array.slice(0, 5).join(" "); //joinすると10進数になる
    switch (signature) {
      case "37 80 68 70 45":
        return "PDF";
      case "80 75 3 4 0":
        return "ZIP";
      case "80 75 5 6 0":
        return "ZIP";
      case "80 75 7 8 0":
        return "ZIP";
      case "71 73 70 56 55": 
       return "GIF";
      case "71 73 70 56 57": 
       return "GIF";
      case "137 80 78 71 13":
          return "PNG";
    }
  }

  return "UNKNOWN";
}