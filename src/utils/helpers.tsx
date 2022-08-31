interface Response {
  nameFile: string;
  extension: string;
}

export const extensionName = (name: string): Response => {
  const nameSplit = name.split('.');
  const nameFile = nameSplit[0];
  const extension = nameSplit[nameSplit.length - 1];
  return {
    nameFile,
    extension,
  };
};
