const noise = () => {
  return Math.random() * 0.5 + 0.5;
};

const colorDistance = (scale, dest, src) => {
  return (scale * dest + (1 - scale) * src);
};

const processSepia = (binaryData, len) => {
  const newBinaryData = new Uint8ClampedArray(len)
  for (let i = 0; i < len; i += 4) {
    const r = binaryData[i];
    const g = binaryData[i + 1];
    const b = binaryData[i + 2];
    const a = binaryData[i + 3];

    newBinaryData[i] = colorDistance(noise(), (r * 0.393) + (g * 0.769) + (b * 0.189), r);
    newBinaryData[i + 1] = colorDistance(noise(), (r * 0.349) + (g * 0.686) + (b * 0.168), g);
    newBinaryData[i + 2] = colorDistance(noise(), (r * 0.272) + (g * 0.534) + (b * 0.131), b);
    newBinaryData[i + 3] = a;
  }
  return newBinaryData;
};

const addTen = (num) => {
  return num + 10;
}

const nthFib = num => {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return nthFib(num - 1) + nthFib(num - 2);
}

module.exports = { processSepia, addTen, nthFib };
