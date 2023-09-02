const importAll = (r: any) => {
  let images: { [key: string]: any } = {};
  r.keys().forEach((item: string, index: number) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

export const weatherIcon = (imageName: string): string | undefined => {
  const allWeatherIcons = importAll(
    require.context("../assets/icons", false, /\.(png)$/)
  );

  const iconsKeys = Object.keys(allWeatherIcons);

  const iconsValues = Object.values(allWeatherIcons);
  const iconIndex = iconsKeys.indexOf(imageName);

  return iconsValues[iconIndex];
};
